// Patient Form Component
import { PATIENT_PROFILES } from '../db.js';

export function renderPatientForm(container, onSubmitData) {
  let selectedPreset = null;

  container.innerHTML = `
    <div class="glass-panel form-container">
      <div class="form-header-bar">
        <h2>Patient Diagnostics Setup</h2>
        <button id="back-landing-btn" class="btn btn-secondary btn-sm">
          <i data-lucide="arrow-left" width="16" height="16"></i> Back
        </button>
      </div>

      <!-- Quick Preset Selector -->
      <div class="preset-selector-section">
        <h3 class="preset-title">Select Simulated Patient Profile</h3>
        <div class="presets-grid">
          <div class="preset-card" data-preset="sarah-jenkins">
            <div class="preset-name">Sarah Jenkins (64)</div>
            <div class="preset-details">Cardiac focus. CYP2C19 Poor Metabolizer (*2/*2), homozygous APOE-ε4.</div>
          </div>
          <div class="preset-card" data-preset="marcus-chen">
            <div class="preset-name">Marcus Chen (42)</div>
            <div class="preset-details">Metabolic focus. HLA-B*5701 carrier (severe Abacavir hypersensitivity).</div>
          </div>
          <div class="preset-card" data-preset="elena-rostova">
            <div class="preset-name">Elena Rostova (29)</div>
            <div class="preset-details">Oncology focus. BRCA1 mutation detected. Standard physicals.</div>
          </div>
        </div>
      </div>

      <!-- Simulated EHR File Uploader -->
      <div id="drop-zone" class="file-uploader">
        <i data-lucide="upload-cloud" class="uploader-icon" width="40" height="40"></i>
        <h4 class="uploader-title">Drag & Drop Simulated EHR File</h4>
        <p class="uploader-subtitle">Or click here to browse files (.json, .xml, .txt)</p>
        <input type="file" id="file-input" style="display: none;" accept=".json,.xml,.txt">
        <div id="upload-feedback" style="display:none; color: var(--success); font-size: 0.85rem; margin-top: 8px; font-weight: 600;"></div>
      </div>

      <!-- Custom Input Form -->
      <form id="diagnostics-form">
        <div class="form-grid">
          
          <!-- Demographics -->
          <div class="form-group">
            <label class="form-label" for="pt-name">Patient Name</label>
            <input type="text" id="pt-name" class="form-control" placeholder="Jane Doe" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-gender">Biological Gender</label>
            <select id="pt-gender" class="form-control">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-age">Age (Years)</label>
            <input type="number" id="pt-age" class="form-control" min="1" max="120" value="45" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-weight">Weight (kg)</label>
            <input type="number" id="pt-weight" class="form-control" min="20" max="250" value="70" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-height">Height (cm)</label>
            <input type="number" id="pt-height" class="form-control" min="50" max="250" value="170" required>
          </div>

          <!-- Biomarkers -->
          <div class="form-group">
            <label class="form-label">Blood Pressure (Systolic / Diastolic mmHg)</label>
            <div style="display:flex; gap: 8px;">
              <input type="number" id="pt-bp-sys" class="form-control" placeholder="Systolic" value="120" style="flex:1;" required>
              <span style="align-self:center; color: var(--text-muted);">/</span>
              <input type="number" id="pt-bp-dia" class="form-control" placeholder="Diastolic" value="80" style="flex:1;" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-chol">Total Cholesterol (mg/dL)</label>
            <input type="number" id="pt-chol" class="form-control" min="50" max="500" value="180" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="pt-smoke">Smoking Habit</label>
            <select id="pt-smoke" class="form-control">
              <option value="false">Never Smoked</option>
              <option value="true">Active Smoker / Former Smoker</option>
            </select>
          </div>

          <!-- Genetic Variant Indicators -->
          <div class="form-group full-width" style="margin-top: 15px;">
            <label class="form-label">Sequenced Pharmacogenomic & Risk Markers</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="gen-cyp2c19" class="checkbox-input">
                <span>CYP2C19 *2/*2 (Poor Metabolizer alleles)</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="gen-apoe" class="checkbox-input">
                <span>APOE ε4/ε4 (High Alzheimer's Risk carrier)</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="gen-brca" class="checkbox-input">
                <span>BRCA1 Pathogenic Variant detected</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="gen-hlab" class="checkbox-input">
                <span>HLA-B*5701 Allele Positive (Abacavir sensitivity)</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="gen-mthfr" class="checkbox-input">
                <span>MTHFR 677T/T Homozygous Variant detected</span>
              </label>
            </div>
          </div>

        </div>

        <div class="form-actions">
          <button type="button" id="reset-form-btn" class="btn btn-secondary">
            Reset Fields
          </button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="cpu" width="16" height="16"></i> Run AI Diagnostics
          </button>
        </div>
      </form>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Preset Card Handlers
  const presetCards = container.querySelectorAll(".preset-card");
  presetCards.forEach(card => {
    card.addEventListener("click", () => {
      const presetId = card.getAttribute("data-preset");
      
      presetCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      selectedPreset = presetId;
      applyPresetData(presetId);
    });
  });

  // Load Preset Details helper
  function applyPresetData(presetId) {
    const profile = PATIENT_PROFILES[presetId];
    if (!profile) return;

    document.getElementById("pt-name").value = profile.name;
    document.getElementById("pt-gender").value = profile.gender;
    document.getElementById("pt-age").value = profile.age;
    
    // Parse Weight / Height
    document.getElementById("pt-weight").value = parseFloat(profile.weight);
    document.getElementById("pt-height").value = parseFloat(profile.height);
    
    // Parse blood pressure
    const bpParts = profile.bloodPressure.split("/");
    document.getElementById("pt-bp-sys").value = parseInt(bpParts[0]) || 120;
    document.getElementById("pt-bp-dia").value = parseInt(bpParts[1].replace(" mmHg", "")) || 80;
    
    document.getElementById("pt-chol").value = parseInt(profile.cholesterol) || 180;
    
    const isSmoker = profile.smokingStatus.toLowerCase().includes("smoker") && !profile.smokingStatus.toLowerCase().includes("never");
    document.getElementById("pt-smoke").value = isSmoker.toString();

    // Set genetics
    document.getElementById("gen-cyp2c19").checked = profile.geneticMarkers.cyp2c19.includes("Poor");
    document.getElementById("gen-apoe").checked = profile.geneticMarkers.apoe.includes("High");
    document.getElementById("gen-brca").checked = profile.geneticMarkers.brca.includes("Detected") || profile.geneticMarkers.brca.includes("Positive");
    document.getElementById("gen-hlab").checked = profile.geneticMarkers.hlab5701.includes("Positive");
    document.getElementById("gen-mthfr").checked = profile.geneticMarkers.mthfr.includes("T/T") || profile.geneticMarkers.mthfr.includes("Homozygous");
  }

  // File Upload Handlers (Simulated EHR parser)
  const dropZone = container.querySelector("#drop-zone");
  const fileInput = container.querySelector("#file-input");
  const uploadFeedback = container.querySelector("#upload-feedback");

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      handleUploadedFile(e.target.files[0]);
    }
  });

  function handleUploadedFile(file) {
    uploadFeedback.style.display = "block";
    uploadFeedback.style.color = "var(--primary)";
    uploadFeedback.innerHTML = `<i data-lucide="loader" class="logo-icon spin" width="14" height="14"></i> Parsing ${file.name}...`;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      // Create some random realistic parameters from the upload or just set to standard demo values
      document.getElementById("pt-name").value = file.name.split('.')[0].replace(/[-_]/g, ' ') || "Simulated Record";
      document.getElementById("pt-age").value = Math.floor(Math.random() * 30) + 35; // random age between 35 and 65
      document.getElementById("pt-weight").value = 75;
      document.getElementById("pt-height").value = 168;
      document.getElementById("pt-bp-sys").value = 135;
      document.getElementById("pt-bp-dia").value = 85;
      document.getElementById("pt-chol").value = 210;
      document.getElementById("pt-smoke").value = "false";
      
      // Randomize one genetic marker to make it interesting
      document.getElementById("gen-cyp2c19").checked = Math.random() > 0.5;
      document.getElementById("gen-apoe").checked = Math.random() > 0.6;
      document.getElementById("gen-brca").checked = Math.random() > 0.8;
      document.getElementById("gen-hlab").checked = Math.random() > 0.7;
      document.getElementById("gen-mthfr").checked = Math.random() > 0.5;

      uploadFeedback.style.color = "var(--success)";
      uploadFeedback.innerHTML = `<i data-lucide="check-circle" width="14" height="14" style="vertical-align: middle;"></i> Successfully parsed medical records from ${file.name}! Form details initialized.`;
      
      // Clear preset selector since we are custom/uploaded now
      presetCards.forEach(c => c.classList.remove("active"));
      selectedPreset = null;
      
      if (window.lucide) window.lucide.createIcons();
    }, 1500);
  }

  // Reset Button
  document.getElementById("reset-form-btn").addEventListener("click", () => {
    document.getElementById("diagnostics-form").reset();
    presetCards.forEach(c => c.classList.remove("active"));
    selectedPreset = null;
    uploadFeedback.style.display = "none";
  });

  // Back Button
  document.getElementById("back-landing-btn").addEventListener("click", () => {
    onSubmitData(null, "landing"); // navigate back
  });

  // Submit Handler
  document.getElementById("diagnostics-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Package form data
    const formData = {
      presetId: selectedPreset,
      name: document.getElementById("pt-name").value,
      gender: document.getElementById("pt-gender").value,
      age: document.getElementById("pt-age").value,
      weight: document.getElementById("pt-weight").value,
      height: document.getElementById("pt-height").value,
      bpSystolic: document.getElementById("pt-bp-sys").value,
      bpDiastolic: document.getElementById("pt-bp-dia").value,
      cholesterol: document.getElementById("pt-chol").value,
      smoking: document.getElementById("pt-smoke").value === "true",
      cyp2c19: document.getElementById("gen-cyp2c19").checked ? "poor" : "normal",
      apoe: document.getElementById("gen-apoe").checked ? "e4" : "normal",
      brca1: document.getElementById("gen-brca").checked ? "positive" : "negative",
      hlab5701: document.getElementById("gen-hlab").checked ? "positive" : "negative",
      mthfr: document.getElementById("gen-mthfr").checked ? "variant" : "normal"
    };

    onSubmitData(formData, "loading");
  });
}
