// AI Analysis Loading Screen Component

export function renderLoadingScreen(container, onFinished) {
  container.innerHTML = `
    <div class="loading-view-container">
      <div class="loading-hero">
        <i data-lucide="dna" class="loading-logo" width="64" height="64"></i>
        <h2>Engine Sequencing & Analysis In Progress</h2>
        <p style="color: var(--text-secondary); margin-top: 8px;">
          Applying genomic models and computing drug compatibility...
        </p>
      </div>

      <!-- Main Progress Bar -->
      <div class="analysis-progress-bar-container">
        <div id="progress-bar-fill" class="analysis-progress-fill"></div>
      </div>

      <!-- Sequencing Stages -->
      <div class="stages-list">
        <div class="stage-item pending" id="stage-0">
          <div class="stage-info">
            <i data-lucide="file-text" width="18" height="18"></i>
            <span>Ingesting clinical notes and EHR profiles</span>
          </div>
          <div class="stage-status" id="status-0">Waiting</div>
        </div>

        <div class="stage-item pending" id="stage-1">
          <div class="stage-info">
            <i data-lucide="fingerprint" width="18" height="18"></i>
            <span>Isolating genomic loci & alleles</span>
          </div>
          <div class="stage-status" id="status-1">Waiting</div>
        </div>

        <div class="stage-item pending" id="stage-2">
          <div class="stage-info">
            <i data-lucide="activity" width="18" height="18"></i>
            <span>Executing polygenic disease scoring</span>
          </div>
          <div class="stage-status" id="status-2">Waiting</div>
        </div>

        <div class="stage-item pending" id="stage-3">
          <div class="stage-info">
            <i data-lucide="pill" width="18" height="18"></i>
            <span>Evaluating drug-gene compatibility</span>
          </div>
          <div class="stage-status" id="status-3">Waiting</div>
        </div>

        <div class="stage-item pending" id="stage-4">
          <div class="stage-info">
            <i data-lucide="bar-chart-3" width="18" height="18"></i>
            <span>Constructing SHAP explainability matrices</span>
          </div>
          <div class="stage-status" id="status-4">Waiting</div>
        </div>
      </div>

      <!-- Real-time Terminal Log -->
      <div class="terminal-logs" id="terminal-log-box">
        <div class="log-entry">[SYSTEM] Initializing Aegis Clinical Support pipeline...</div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Animation timeline
  const stages = [
    { name: "EHR Ingestion", logs: ["[INFO] Loading patient physical metrics...", "[OK] Completed demographic record parsing."] },
    { name: "Genomic Isolation", logs: ["[INFO] Aligning sequencing reads to GRCh38...", "[PGx] Isolated CYP2C19 loci.", "[PGx] Mapping HLA-B*5701 and BRCA1 markers."] },
    { name: "Disease Risk Math", logs: ["[INFO] Running risk calculations...", "[OK] CVD and T2D polygenic risk assessment finished."] },
    { name: "Pharmacogenomics", logs: ["[INFO] Checking Clinical Pharmacogenetics Implementation Consortium (CPIC) guidelines...", "[WARN] Counter-indication detected. Flagging drug warnings."] },
    { name: "SHAP Explainability", logs: ["[INFO] Distributing game-theoretic weights for biomarker contribution...", "[OK] SHAP charts compiled successfully.", "[SYSTEM] Pipeline complete. Redirecting to Patient Dashboard..."] }
  ];

  const fill = document.getElementById("progress-bar-fill");
  const logBox = document.getElementById("terminal-log-box");
  let currentStageIndex = 0;
  
  function addLog(text) {
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerText = text;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function advanceStage() {
    if (currentStageIndex >= stages.length) {
      // Completed all stages! Trigger redirect
      setTimeout(() => {
        onFinished();
      }, 600);
      return;
    }

    // Set previous stage to completed
    if (currentStageIndex > 0) {
      const prevIdx = currentStageIndex - 1;
      const prevItem = document.getElementById(`stage-${prevIdx}`);
      const prevStatus = document.getElementById(`status-${prevIdx}`);
      prevItem.className = "stage-item completed";
      prevStatus.innerHTML = `<i data-lucide="check" width="14" height="14" style="color: var(--success);"></i> Done`;
      if (window.lucide) window.lucide.createIcons();
    }

    // Set current stage to active
    const currentItem = document.getElementById(`stage-${currentStageIndex}`);
    const currentStatus = document.getElementById(`status-${currentStageIndex}`);
    currentItem.className = "stage-item active";
    currentStatus.innerHTML = `<i data-lucide="loader" class="logo-icon spin" width="14" height="14" style="color: var(--primary);"></i> Running`;
    if (window.lucide) window.lucide.createIcons();

    // Print logs
    const currentStage = stages[currentStageIndex];
    let logDelay = 100;
    currentStage.logs.forEach((logText, idx) => {
      setTimeout(() => {
        addLog(logText);
      }, logDelay * (idx + 1));
    });

    // Update Progress Bar
    const progressPercent = Math.round(((currentStageIndex + 1) / stages.length) * 100);
    fill.style.width = `${progressPercent}%`;

    // Move to next stage
    currentStageIndex++;
    setTimeout(advanceStage, 1000 + Math.random() * 500); // 1-1.5s per step
  }

  // Kickstart after short buffer
  setTimeout(advanceStage, 400);
}
