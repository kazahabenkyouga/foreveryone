/**
 * フルスクリーン Hero — 編集志向の左寄せ・青系オーバーレイ・読み込みフェード + テキスト stagger
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div
        className="hero__bg"
        role="img"
        aria-label="抽象的な光のネットワークと都市の夜景を重ねたイメージ"
      />
      <div className="hero__overlay" aria-hidden />
      <div className="hero__inner">
        <a href="#main-workspace" className="hero__skip">
          業務ガイドへスキップ
        </a>
        <h1 id="hero-heading" className="hero__title">
          基盤は、沈黙を前提にしている。
        </h1>
        <p className="hero__lead">
          組織の地図と、その現場の手応えを、ここから辿る。
        </p>
      </div>
    </section>
  );
}
