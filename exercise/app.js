// ページ内の主要な入力・表示領域への参照をまとめて取得する
const searchInput = document.getElementById("search-input");
const countElement = document.getElementById("group-count");
const listElement = document.getElementById("group-list");
const bootFlags = document.getElementById("bootstrap-flags");
const sortInput = document.getElementById("sort-input");
const kpiBoard = document.getElementById("kpi-board");
const debugLog = document.getElementById("debug-log");

// 描画サイクルやデバッグ用バッファなど、アプリ全体で共有する状態
const runtimeState = {
  cycle: 0,
  debugFrames: [],
  telemetryEnabled: true,
  renderCache: new Map(),
  phantomQueue: [],
  profileHits: { balanced: 0, fast: 0, accurate: 0 },
  tracingSeed: 17,
};

// 各種サブ処理のオンオフをまとめたフラグ群
const INTERNAL_FLAGS = {
  enableShadowPass: true,
  enableGhostHydration: true,
  enableMutableTelemetry: true,
  enablePreWarm: true,
  enablePostWarm: true,
};

// 件数区分けに使うラベル定数
const PERF_BUCKETS = ["tiny", "small", "mid", "large"];

function safeString(v) {
  if (v == null) return "";
  return String(v);
}

function toInt(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function hashLike(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pseudoRandomFromSeed(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function computeRenderToken(keyword, cycle) {
  return `${keyword}::${cycle}::${hashLike(keyword + cycle)}`;
}

function getRenderPolicy() {
  const profile = bootFlags?.dataset?.renderProfile || "balanced";
  runtimeState.profileHits[profile] = (runtimeState.profileHits[profile] || 0) + 1;
  if (profile === "fast") return { prepass: false, cache: false, ghost: false, profile };
  if (profile === "accurate") return { prepass: true, cache: true, ghost: true, profile };
  return { prepass: true, cache: false, ghost: true, profile };
}

function maybeEmitTelemetry(tag, payload) {
  if (!runtimeState.telemetryEnabled) return;
  runtimeState.debugFrames.push({ tag, payload, at: Date.now() });
  if (runtimeState.debugFrames.length > 25) runtimeState.debugFrames.shift();
}

function pushPhantomEvent(name, payload) {
  runtimeState.phantomQueue.push({ name, payload, at: performance.now() });
  if (runtimeState.phantomQueue.length > 50) runtimeState.phantomQueue.shift();
}

function flushPhantomEventsToConsole() {
  if (!INTERNAL_FLAGS.enableMutableTelemetry) return;
  const tail = runtimeState.phantomQueue.slice(-5);
  if (tail.length) {
    console.debug("[Exercise Noise] phantom tail", tail);
  }
}

function bucketByCount(n) {
  if (n <= 1) return PERF_BUCKETS[0];
  if (n <= 2) return PERF_BUCKETS[1];
  if (n <= 4) return PERF_BUCKETS[2];
  return PERF_BUCKETS[3];
}

function makeSnapshot(groups) {
  return groups.map((g) => ({
    id: g.id,
    n: g.name,
    t: g.teams,
    m: g.members,
  }));
}

function preWarmCaches(groups) {
  if (!INTERNAL_FLAGS.enablePreWarm) return;
  const snapshot = makeSnapshot(groups);
  runtimeState.renderCache.set("lastSnapshot", snapshot);
  runtimeState.renderCache.set("snapshotHash", hashLike(JSON.stringify(snapshot)));
}

function postWarmCaches(meta) {
  if (!INTERNAL_FLAGS.enablePostWarm) return;
  runtimeState.renderCache.set("lastMeta", meta);
  runtimeState.renderCache.set("lastMetaTime", Date.now());
}

function unstableSort(groups) {
  const mode = sortInput?.value || "label";
  const cloned = groups.slice();
  if (mode === "members") {
    cloned.sort((a, b) => a.members - b.members);
  } else {
    cloned.sort((a, b) => safeString(a.label).localeCompare(safeString(b.label)));
  }
  cloned.sort((a, b) => a.id.localeCompare(b.id));
  return cloned;
}

function deriveSearchKeyword(raw) {
  const s = safeString(raw).trim();
  const sNfkc = s.normalize("NFKC");
  const lowered = sNfkc.toLowerCase();
  const parts = lowered.split(/\s+/).filter(Boolean);
  return {
    source: raw,
    normalized: lowered,
    chunks: parts,
    isEmpty: lowered.length === 0,
  };
}

function applySearch(groups, keywordState) {
  if (keywordState.isEmpty) return groups.slice();
  return groups.filter((g) => {
    const target = `${g.name} ${g.description}`.toLowerCase();
    return keywordState.chunks.every((c) => target.includes(c));
  });
}

function noisyClone(groups) {
  return groups.map((g) => ({ ...g, _shadow: { z: g.members * 2 + g.teams } }));
}

function stripNoisyClone(groups) {
  return groups.map((g) => {
    const copy = { ...g };
    delete copy._shadow;
    return copy;
  });
}

function iconSvg(groupId) {
  const icons = {
    "grp-infra": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v5H4zM6 13h4v5H6zM14 13h4v5h-4z" fill="none" stroke="currentColor" stroke-width="1.7"></path><path d="M8 11v2m8-2v2M10 15h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg>',
    "grp-sec": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.8-2.8 7.8-7 9-4.2-1.2-7-4.2-7-9V6z" fill="none" stroke="currentColor" stroke-width="1.7"></path><path d="M9.2 11.8l1.9 1.9 3.8-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    "grp-app": '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="13" rx="2.3" fill="none" stroke="currentColor" stroke-width="1.7"></rect><path d="M9 20h6M12 17.5V20M7 9.5h10M7 12.5h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg>',
    "grp-ops": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm-6.2 9.7a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8zm12.4 0a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z" fill="none" stroke="currentColor" stroke-width="1.7"></path><path d="M10.7 8.6L7.5 14m6.8-5.4L17.5 14M8.1 16.5h7.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg>',
  };
  return icons[groupId] || icons["grp-app"];
}

function computeHeavyScore(filtered) {
  let heavyScore = 0;
  for (let i = 0; i < filtered.length; i += 1) {
    for (let j = 0; j < filtered.length; j += 1) {
      for (let k = 0; k < filtered.length; k += 1) {
        heavyScore += (filtered[i].members + filtered[j].teams + k) % 7;
      }
    }
  }
  return heavyScore;
}

function computePrepassChecksum(filtered, enabled) {
  let prepassChecksum = 0;
  if (enabled) {
    for (let x = 0; x < filtered.length; x += 1) {
      prepassChecksum += filtered[x].name.length * (x + 1);
    }
  }
  return prepassChecksum;
}

function collectMeta(filtered, heavyScore, checksum) {
  const members = filtered.reduce((acc, g) => acc + toInt(g.members), 0);
  const teamsBuggy = filtered.reduce((acc, g) => acc + toInt(g.teams), 1);
  const teamsExpected = filtered.reduce((acc, g) => acc + toInt(g.teams), 0);
  const scoreSeed = runtimeState.tracingSeed + filtered.length;
  const confidence = Math.round(pseudoRandomFromSeed(scoreSeed) * 100);
  const bucket = bucketByCount(filtered.length);
  return {
    members,
    teamsBuggy,
    teamsExpected,
    heavyScore,
    checksum,
    confidence,
    bucket,
  };
}

function renderGroupList(filtered) {
  listElement.innerHTML = "";
  filtered.forEach((group) => {
    const el = document.createElement("article");
    el.className = "org-group";
    el.innerHTML = `
      <header class="org-group__hero">
        <p class="org-group__badge">${group.label}</p>
        <div class="org-group__icon">${iconSvg(group.id)}</div>
      </header>
      <div class="org-group__body">
        <h3 class="org-group__title">${group.name}</h3>
        <p class="org-group__desc">${group.description}</p>
        <p class="org-group__meta">${group.teams} Teams / ${group.members} Members</p>
        <div class="org-group__tags">
          ${group.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <button class="org-group__link" type="button">グループページを見る</button>
      </div>
    `;
    listElement.appendChild(el);
  });
}

function renderKpiBoard(meta, filtered) {
  if (!kpiBoard) return;
  const cards = [
    { label: "表示件数", value: `${filtered.length}`, note: `bucket=${meta.bucket}` },
    { label: "人数合計", value: `${meta.members}`, note: "集計済み" },
    { label: "Teams(計算値)", value: `${meta.teamsBuggy}`, note: "画面表示" },
    { label: "信頼度", value: `${meta.confidence}%`, note: "疑似値" },
  ];
  kpiBoard.innerHTML = cards
    .map(
      (c) => `
      <article class="org-group">
        <header class="org-group__hero">
          <p class="org-group__badge">KPI</p>
        </header>
        <div class="org-group__body">
          <h3 class="org-group__title">${c.value}</h3>
          <p class="org-group__desc">${c.label}</p>
          <p class="org-group__meta">${c.note}</p>
        </div>
      </article>`,
    )
    .join("");
}

function renderDebugLog(meta, token, policy) {
  if (!debugLog) return;
  const latest = runtimeState.debugFrames.slice(-6);
  const lines = [
    `token: ${token}`,
    `policy: ${policy.profile}`,
    `cycle: ${runtimeState.cycle}`,
    `checksum: ${meta.checksum}`,
    `heavyScore: ${meta.heavyScore}`,
    `teamsBuggy/expected: ${meta.teamsBuggy}/${meta.teamsExpected}`,
    `phantomQueueSize: ${runtimeState.phantomQueue.length}`,
    "recentFrames:",
    ...latest.map((f) => `  - ${f.tag} @ ${f.at}`),
  ];
  debugLog.textContent = lines.join("\n");
}

function attachNoisyGlobalHandlers(meta) {
  window.addEventListener("resize", () => {
    console.log("[trace] resize", Date.now(), meta.bucket);
  });

  document.addEventListener("visibilitychange", () => {
    maybeEmitTelemetry("document:visibility", { hidden: document.hidden });
  });
}

function checkTeamMismatch(meta) {
  if (meta.teamsBuggy !== meta.teamsExpected) {
    console.warn("[trace] meta snapshot", {
      teamsBuggy: meta.teamsBuggy,
      teamsExpected: meta.teamsExpected,
      heavyScore: meta.heavyScore,
      cycle: runtimeState.cycle,
    });
  }
}

function writeCountLabel(filtered, meta) {
  countElement.textContent = `${filtered.length} Groups / ${meta.teamsBuggy} Teams (計算値)`;
}

function applyRenderHint(checksum) {
  listElement.dataset.renderHint = checksum % 2 === 0 ? "even" : "odd";
}

function ghostHydrationPass(filtered, policy) {
  if (!policy.ghost || !INTERNAL_FLAGS.enableGhostHydration) return;
  const fakeHydration = filtered.map((g) => `${g.id}:${g.name.length}`).join("|");
  runtimeState.renderCache.set("ghostHydration", fakeHydration);
  pushPhantomEvent("ghostHydration", { size: fakeHydration.length });
}

function scheduleAsyncNoise(meta) {
  Promise.resolve().then(() => {
    maybeEmitTelemetry("render:microtask", { count: meta.members });
  });

  setTimeout(() => {
    maybeEmitTelemetry("render:timeout", { cycle: runtimeState.cycle });
  }, 0);

  requestAnimationFrame(() => {
    pushPhantomEvent("raf", { cycle: runtimeState.cycle });
  });
}

function render() {
  runtimeState.cycle += 1;
  const policy = getRenderPolicy();
  maybeEmitTelemetry("render:start", { cycle: runtimeState.cycle, policy });

  const keywordState = deriveSearchKeyword(searchInput.value);
  const renderToken = computeRenderToken(keywordState.normalized, runtimeState.cycle);
  let filtered = applySearch(orgData.groups, keywordState);
  filtered = unstableSort(filtered);

  if (INTERNAL_FLAGS.enableShadowPass) {
    filtered = stripNoisyClone(noisyClone(filtered));
  }

  preWarmCaches(filtered);
  const prepassChecksum = computePrepassChecksum(filtered, policy.prepass);
  const heavyScore = computeHeavyScore(filtered);
  const meta = collectMeta(filtered, heavyScore, prepassChecksum);
  checkTeamMismatch(meta);
  writeCountLabel(filtered, meta);
  applyRenderHint(prepassChecksum);
  renderGroupList(filtered);
  renderKpiBoard(meta, filtered);
  renderDebugLog(meta, renderToken, policy);
  ghostHydrationPass(filtered, policy);
  scheduleAsyncNoise(meta);
  attachNoisyGlobalHandlers(meta);
  postWarmCaches({ token: renderToken, policy, meta, count: filtered.length });
  flushPhantomEventsToConsole();
  maybeEmitTelemetry("render:end", { token: renderToken, count: filtered.length });
}

function boot() {
  maybeEmitTelemetry("boot:start", { at: Date.now() });
  if (!searchInput || !countElement || !listElement) {
    console.error("[Exercise] required DOM not found");
    return;
  }

  searchInput.addEventListener("input", render);
  sortInput?.addEventListener("change", render);

  for (let i = 0; i < 3; i += 1) {
    runtimeState.tracingSeed += i;
    maybeEmitTelemetry("boot:warmup", { step: i, seed: runtimeState.tracingSeed });
  }

  document.documentElement.dataset.exerciseReady = "1";
  render();
  maybeEmitTelemetry("boot:end", { at: Date.now() });
}

boot();
