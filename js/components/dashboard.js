// Doctor Clinical Dashboard Component
import { drawHealthScoreGauge, drawShapChart } from '../charts.js';
import { renderChat } from './chat.js';
import { generatePrintReport } from './report.js';

// Status badge helper (shared logic)
function statusBadge(status) {
  const labels = { 'active': '● Active', 'recently-consulted': '◎ Recently Consulted', 'discontinued': '✕ Discontinued' };
  return `<span class="med-status-badge ${status}">${labels[status] || status}</span>`;
}

export function renderDashboard(container, profile, onNavigate) {
  // Dynamically calculate overall health score based on risk values
  const totalRiskSum = profile.diseaseRisks.reduce((acc, curr) => acc + curr.risk, 0);
  const avgRisk = totalRiskSum / profile.diseaseRisks.length;
  const healthScore = Math.max(10, Math.round(100 - avgRisk * 0.75));

  // State to track currently selected disease for SHAP explainability
  let selectedDiseaseId = profile.diseaseRisks[0].id;

  function drawDashboardLayout() {
    container.innerHTML = `
      <div class="dashboard-container">
        
        <!-- Left Sidebar: Patient Demographics Summary -->
        <aside class="sidebar">
          <div class="patient-brief">
            <div class="patient-avatar-box">
              ${profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="patient-brief-name">${profile.name}</div>
            <span class="patient-meta-pill">ID: ${profile.id.substring(0, 8)}</span>
          </div>

          <div class="patient-demographics-list">
            <div class="demographic-item">
              <span class="demographic-label">Age</span>
              <span class="demographic-value">${profile.age} years</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Biological Gender</span>
              <span class="demographic-value">${profile.gender}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Weight</span>
              <span class="demographic-value">${profile.weight}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Height</span>
              <span class="demographic-value">${profile.height}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">BMI</span>
              <span class="demographic-value">${profile.bmi}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Blood Pressure</span>
              <span class="demographic-value">${profile.bloodPressure}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Cholesterol</span>
              <span class="demographic-value">${profile.cholesterol}</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Tobacco Exposure</span>
              <span class="demographic-value">${profile.smokingStatus}</span>
            </div>
          </div>

          <div class="sidebar-nav" style="margin-top: auto;">
            <button id="new-run-nav-btn" class="sidebar-nav-btn">
              <i data-lucide="plus-circle" width="16" height="16"></i> New Diagnostics Run
            </button>
            <button id="print-report-nav-btn" class="sidebar-nav-btn">
              <i data-lucide="printer" width="16" height="16"></i> Print Report Summary
            </button>
            <button id="doctor-logout-nav-btn" class="sidebar-nav-btn" style="color: var(--danger); margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 15px;">
              <i data-lucide="log-out" width="16" height="16"></i> Sign Out Portal
            </button>
          </div>
        </aside>

        <!-- Right Main Viewport -->
        <main class="dashboard-main">
          
          <header class="dashboard-header">
            <div>
              <h1 style="font-size: 2.2rem; font-weight: 800;">Clinical Decision Support Dashboard</h1>
              <p style="color: var(--text-muted); margin-top: 4px;">Precision genetics and risk assessment model outputs.</p>
            </div>
            <div class="dashboard-actions">
              <button id="btn-new-run" class="btn btn-secondary">
                <i data-lucide="rotate-ccw" width="16" height="16"></i> New Analysis
              </button>
              <button id="btn-print" class="btn btn-primary">
                <i data-lucide="file-text" width="16" height="16"></i> Download PDF Report
              </button>
            </div>
          </header>

          <div class="dashboard-grid">
            
            <!-- Health Score Gauge (col-4) -->
            <div class="glass-panel col-4" style="display:flex; flex-direction:column; justify-content:center;">
              <div class="health-score-container">
                <div class="gauge-svg-wrapper">
                  ${drawHealthScoreGauge(healthScore)}
                  <div class="gauge-text">
                    <span class="gauge-score" style="color: ${healthScore >= 80 ? 'var(--success)' : healthScore >= 50 ? 'var(--warning)' : 'var(--danger)'};">${healthScore}</span>
                    <span class="gauge-label">Score</span>
                  </div>
                </div>
                <div class="score-insights">
                  <h3 class="score-title">Overall Health Index</h3>
                  <p class="score-desc">
                    Weighted index indicating general cellular resilience, scaled based on combined systemic disease hazards.
                  </p>
                </div>
              </div>
            </div>

            <!-- AI Summary Text Panel (col-8) -->
            <div class="glass-panel col-8 ai-summary-banner">
              <div class="ai-avatar-icon">
                <i data-lucide="cpu" width="32" height="32"></i>
              </div>
              <div class="ai-summary-text">
                <h3>Aegis AI Copilot Diagnostics</h3>
                <p>${profile.aiSummary}</p>
              </div>
            </div>

            <!-- Polygenic Risk List (col-6) -->
            <div class="glass-panel col-6">
              <div class="risk-header">
                <h3>Disease Risk Susceptibility</h3>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Click rows to view SHAP metrics</span>
              </div>
              <div class="risk-list" id="risk-rows-container">
                <!-- Dynamic risk items go here -->
              </div>
            </div>

            <!-- SHAP Explainability Graph (col-6) -->
            <div class="glass-panel col-6">
              <div class="risk-header">
                <h3>Explainable AI - Feature Contributions</h3>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;" id="shap-disease-title">Selected: CVD</span>
              </div>
              <div id="shap-chart-container">
                <!-- SHAP chart rendered here -->
              </div>
            </div>

            <!-- Pharmacogenomics Advisories (col-12) -->
            <div class="glass-panel col-12">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="pill" class="logo-icon" width="20" height="20"></i> Pharmacogenomics (PGx) Portal
              </h3>
              <div class="meds-split-grid">
                <!-- Avoid -->
                <div class="meds-card contraindicated">
                  <h4 class="meds-card-title">
                    <i data-lucide="x-octagon" width="18" height="18"></i> Contraindicated Medications (Avoid)
                  </h4>
                  <div class="meds-list">
                    ${profile.medications.avoid.map(med => `
                      <div class="med-item contra">
                        <div class="med-item-header">
                          <span class="med-name">${med.name}</span>
                          <span class="med-badge">AVOID</span>
                        </div>
                        <p class="med-desc">${med.reason}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Recommended -->
                <div class="meds-card recommended">
                  <h4 class="meds-card-title">
                    <i data-lucide="check-circle" width="18" height="18"></i> Indicated / Compatible Therapeutics
                  </h4>
                  <div class="meds-list">
                    ${profile.medications.recommended.map(med => `
                      <div class="med-item reco">
                        <div class="med-item-header">
                          <span class="med-name">${med.name}</span>
                          <span class="med-badge">COMPATIBLE</span>
                        </div>
                        <p class="med-desc">${med.reason}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Genetic Variants Table (col-8) -->
            <div class="glass-panel col-8">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="fingerprint" class="logo-icon" width="20" height="20"></i> Sequenced Variant Profile
              </h3>
              <div class="variants-table-container">
                <table class="variants-table">
                  <thead>
                    <tr>
                      <th>Gene</th>
                      <th>Genotype</th>
                      <th>Phenotype Classification</th>
                      <th>Clinical Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${profile.geneticAnalysis.map(gene => `
                      <tr>
                        <td><span class="gene-tag">${gene.gene}</span></td>
                        <td><code>${gene.genotype}</code></td>
                        <td>
                          <span class="implication-pill ${gene.level}">
                            ${gene.status}
                          </span>
                        </td>
                        <td style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.4;">${gene.clinical}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Timeline (col-4) -->
            <div class="glass-panel col-4">
              <h3 style="margin-bottom: 20px;">Clinical Preventive Timeline</h3>
              <div class="timeline-list">
                ${profile.timeline.map(item => `
                  <div class="timeline-item ${item.completed ? 'completed' : 'pending'}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${item.date}</div>
                    <div class="timeline-title">${item.title}</div>
                    <p class="timeline-desc">${item.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Lifestyle Plans (col-8) -->
            <div class="glass-panel col-8">
              <h3 style="margin-bottom: 20px;">Personalized Interventions & Lifestyle Guidelines</h3>
              <div class="lifestyle-list">
                ${profile.lifestylePlan.map(plan => `
                  <div class="lifestyle-card">
                    <div class="lifestyle-icon-box">
                      <i data-lucide="${plan.icon || 'utensils'}" width="20" height="20"></i>
                    </div>
                    <div class="lifestyle-content">
                      <h4>${plan.category} - ${plan.title}</h4>
                      <p>${plan.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- AI Chat Assistant Box (col-12) -->
            <div class="col-12" id="chat-widget-container">
              <!-- Render AI chat widget here -->
            </div>

            <!-- ======================================================
                 MEDICINES — ACTIVE & RECENTLY CONSULTED (col-12)
            ====================================================== -->
            <div class="glass-panel col-12">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="clipboard-list" class="logo-icon" width="20" height="20"></i>
                Medicines — Active & Recently Consulted
              </h3>
              ${(() => {
                const meds = profile.activeConsultedMeds || [];
                if (meds.length === 0) return '<p style="color: var(--text-muted); font-size: 0.85rem;">No active medication records.</p>';
                const groups = [
                  { label: 'Active Prescriptions', icon: 'check-circle', items: meds.filter(m => m.status === 'active') },
                  { label: 'Recently Consulted / Under Review', icon: 'clock', items: meds.filter(m => m.status === 'recently-consulted') },
                  { label: 'Discontinued', icon: 'x-circle', items: meds.filter(m => m.status === 'discontinued') },
                ];
                return groups.filter(g => g.items.length > 0).map(group => `
                  <div style="margin-bottom: 20px;">
                    <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 700; margin-bottom: 10px; display:flex; align-items:center; gap:6px;">
                      <i data-lucide="${group.icon}" width="13" height="13"></i> ${group.label}
                    </div>
                    ${group.items.map(med => `
                      <div class="consulted-med-card status-${med.status}" style="margin-bottom: 10px;">
                        <div class="consulted-med-info">
                          <h4>
                            ${statusBadge(med.status)}
                            ${med.name}
                          </h4>
                          <div class="consulted-med-meta">
                            <span><strong>Dose:</strong> ${med.dosage}</span>
                            <span><strong>Purpose:</strong> ${med.purpose}</span>
                            <span><strong>Prescriber:</strong> ${med.prescriber}</span>
                            <span><strong>Since:</strong> ${med.startDate}${med.endDate ? ' → ' + med.endDate : ''}</span>
                          </div>
                          <p class="consulted-med-note">${med.note}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `).join('');
              })()}
            </div>

            <!-- ======================================================
                 MEDICAL HISTORY (col-12)
            ====================================================== -->
            <div class="glass-panel col-12">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="file-clock" class="logo-icon" width="20" height="20"></i>
                Patient Medical History
              </h3>
              ${(() => {
                const history = profile.medicalHistory || [];
                if (history.length === 0) return '<p style="color: var(--text-muted); font-size: 0.85rem;">No medical history on record.</p>';
                return `
                  <div class="medical-history-list">
                    ${history.map(h => `
                      <div class="history-row">
                        <div class="history-date-col">
                          <span class="history-date-badge">${h.date}</span>
                        </div>
                        <div class="history-content-col">
                          <h4>${h.event}</h4>
                          <p>${h.detail}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `;
              })()}
            </div>

          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Render components inside dashboard
    renderRiskRows();
    updateShapPanel();
    
    const chatContainer = document.getElementById("chat-widget-container");
    renderChat(chatContainer, profile);

    // Bind Event Listeners
    document.getElementById("btn-new-run").addEventListener("click", () => onNavigate(null, "form"));
    document.getElementById("new-run-nav-btn").addEventListener("click", () => onNavigate(null, "form"));
    document.getElementById("btn-print").addEventListener("click", () => generatePrintReport(profile));
    document.getElementById("print-report-nav-btn").addEventListener("click", () => generatePrintReport(profile));
    document.getElementById("doctor-logout-nav-btn").addEventListener("click", () => onNavigate(null, "login"));
  }

  function renderRiskRows() {
    const riskContainer = document.getElementById("risk-rows-container");
    if (!riskContainer) return;

    riskContainer.innerHTML = profile.diseaseRisks.map(risk => {
      const isActive = risk.id === selectedDiseaseId;
      return `
        <div class="risk-row ${isActive ? 'active' : ''}" data-disease-id="${risk.id}">
          <div class="risk-row-meta">
            <span class="risk-name">${risk.name}</span>
            <span class="risk-percentage-badge ${risk.level}">${risk.risk}%</span>
          </div>
          <div class="risk-bar-container">
            <div class="risk-bar-fill ${risk.level}" style="width: ${risk.risk}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Bind click events to risk rows
    riskContainer.querySelectorAll(".risk-row").forEach(row => {
      row.addEventListener("click", () => {
        const id = row.getAttribute("data-disease-id");
        selectedDiseaseId = id;
        
        // Toggle active row styling
        riskContainer.querySelectorAll(".risk-row").forEach(r => r.classList.remove("active"));
        row.classList.add("active");

        updateShapPanel();
      });
    });
  }

  function updateShapPanel() {
    const shapContainer = document.getElementById("shap-chart-container");
    const shapTitle = document.getElementById("shap-disease-title");
    if (!shapContainer) return;

    const matchedDisease = profile.diseaseRisks.find(r => r.id === selectedDiseaseId);
    if (matchedDisease) {
      shapTitle.innerText = `Selected Model: ${matchedDisease.name}`;
    }

    const contributions = profile.shapContributions[selectedDiseaseId] || [];
    shapContainer.innerHTML = drawShapChart(contributions);
  }

  // Initial render execution
  drawDashboardLayout();
}
