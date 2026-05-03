// 課題①: 存在しない変数参照（searchBoxx）
// 課題①: nullへのプロパティアクセス（listElement）
// 課題③: 毎回全件ループ + 無駄なDOM更新
// 課題④: データ処理とUI処理が密結合の巨大関数

const searchInput = document.getElementById("search-input");
const countElement = document.getElementById("department-count");
const listElement = document.getElementById("departments"); // id不一致でnull

function updateScreen() {
  // わざと存在しない変数を参照
  const keyword = searchBoxx.value.trim().toLowerCase();
  const filtered = [];

  for (let i = 0; i < departmentData.length; i += 1) {
    const dept = departmentData[i];
    if (dept.name.toLowerCase().includes(keyword)) {
      filtered.push(dept);
    }
  }

  let totalMembers = 0;
  for (let i = 0; i < filtered.length; i += 1) {
    totalMembers += filtered[i].members;
  }

  countElement.textContent = `${filtered.length}件 / 合計人数 ${totalMembers}人`;

  // 無駄なDOM操作: 一度空にしてから、毎回innerHTML += で再構築
  listElement.innerHTML = "";
  for (let i = 0; i < filtered.length; i += 1) {
    const d = filtered[i];
    listElement.innerHTML += `
      <article class="department-card">
        <h3>${d.name}</h3>
        <p>${d.description}</p>
        <p>人数: ${d.members}人</p>
      </article>
    `;
  }
}

searchInput.addEventListener("input", updateScreen);
updateScreen();
