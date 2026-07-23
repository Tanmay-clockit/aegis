// Landing Page Component

export function renderLanding(container, onStartForm) {
  container.innerHTML = `
    <div class="landing-container">
      <header class="landing-header">
        <div class="logo-container">
          <i data-lucide="dna" class="logo-icon" width="48" height="48"></i>
          <span class="logo-text">AEGIS</span>
        </div>
        <h1 class="landing-title">Personalized Medicine AI Decision Support Platform</h1>
        <p class="landing-subtitle">
          Unlock precision clinical insights by integrating electronic health records, 
          demographic biomarkers, and patient pharmacogenomics. Simulating explainable AI diagnostics for patient risk mitigation.
        </p>
        <button id="start-diagnostics-btn" class="btn btn-primary btn-lg">
          <i data-lucide="shield-alert"></i> Initiate Patient Diagnostics
        </button>
      </header>

      <section class="features-grid">
        <div class="glass-panel feature-card">
          <div class="feature-icon-wrapper">
            <i data-lucide="file-symlink" width="24" height="24"></i>
          </div>
          <h3>Simulated EHR Ingestion</h3>
          <p>Drag and drop mock clinical records or select from predefined profiles to simulate natural hospital workflows.</p>
        </div>

        <div class="glass-panel feature-card">
          <div class="feature-icon-wrapper">
            <i data-lucide="pocket" width="24" height="24"></i>
          </div>
          <h3>Polygenic Disease Scoring</h3>
          <p>Calculate absolute risk scores for cardiovascular diseases, diabetes, oncology, and late-onset dementia.</p>
        </div>

        <div class="glass-panel feature-card">
          <div class="feature-icon-wrapper">
            <i data-lucide="pill" width="24" height="24"></i>
          </div>
          <h3>Pharmacogenomic Filtering</h3>
          <p>Identify critical drug-gene interactions like CYP2C19 Poor Metabolizer effects or HLA-B*5701 hypersensitivities.</p>
        </div>

        <div class="glass-panel feature-card">
          <div class="feature-icon-wrapper">
            <i data-lucide="network" width="24" height="24"></i>
          </div>
          <h3>Explainable AI (XAI)</h3>
          <p>Inspect feature contributions based on SHAP analytics. Understand which genetic and physical metrics drive risk calculations.</p>
        </div>
      </section>

      <footer style="margin-top: 80px; font-size: 0.8rem; color: var(--text-muted);">
        Aegis Personalized Medicine AI Simulator. Created for educational and demonstration purposes.
      </footer>
    </div>
  `;

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Events
  document.getElementById("start-diagnostics-btn").addEventListener("click", onStartForm);
}
