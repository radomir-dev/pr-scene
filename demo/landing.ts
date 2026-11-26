export function renderLandingPage(): string {
  return `<main class="landing">
${renderHero()}
${renderFeatures()}
</main>`;
}

function renderHero(): string {
  return `  <section class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span></span> For your action's demo page</p>
      <h1 id="hero-title">A pull request,<br /><em>just for the demo.</em></h1>
      <p class="hero-pitch">Render a believable PR — comments, checks, reviews and merge state — so people can see what your action does before they install it.</p>
      <div class="install-card hero-install">
        <span class="feature-index">READY WHEN YOU ARE</span>
        <p>Add it to your demo page</p>
        <code><span>$</span> npm i pr-scene</code>
      </div>
    </div>
    <div class="scene-card" id="live-scene">
      <div class="scene-window">
        <div class="window-dots" aria-hidden="true"><i></i><i></i><i></i></div>
        <span>github.com / acme / storefront</span>
        <span class="scene-live"><i></i> LIVE</span>
      </div>
      <div class="scene-heading"><span>Pull request preview</span><span>renderScene()</span></div>
      <div class="js-controls"></div>
      <div class="scene-shell"><div class="js-live-scene"></div></div>
      <div class="scene-caption"><span class="caption-mark">↗</span> Rendered from a typed scene, not a screenshot.</div>
    </div>
  </section>
`;
}

function renderFeatures(): string {
  return `  <section class="features wrap" aria-labelledby="features-title">
    <div class="section-heading">
      <p class="eyebrow">Small library. Honest demo.</p>
      <h2 id="features-title">Show your action <em>doing its thing.</em></h2>
    </div>
    <div class="feature-grid">
      <article class="feature">
        <span class="feature-index">01 / CONTEXT</span>
        <h3>Real PR details</h3>
        <p>Show the title, author, branches, and state your reviewers already know.</p>
      </article>
      <article class="feature">
        <span class="feature-index">02 / TYPE-SAFE</span>
        <h3>Scenes from data</h3>
        <p>Same scene in, same HTML out — ready for a demo page or a screenshot.</p>
      </article>
      <article class="feature">
        <span class="feature-index">03 / YOUR ACTION</span>
        <h3>Your action on display</h3>
        <p>Render the comments, checks, reviews and merge state your action produces, without a real pull request.</p>
      </article>
    </div>
  </section>
`;
}
