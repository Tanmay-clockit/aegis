// Patient Dashboard Component
import { drawHealthScoreGauge } from '../charts.js';
import { renderChat } from './chat.js';

// Helper to render a status badge for each medication
function statusBadge(status) {
  const labels = {
    'active': '● Active',
    'recently-consulted': '◎ Recently Consulted',
    'discontinued': '✕ Discontinued'
  };
  return `<span class="med-status-badge ${status}">${labels[status] || status}</span>`;
}

export function renderPatientDashboard(container, profile, onLogout) {
  // Calculate overall health index
  const totalRiskSum = profile.diseaseRisks.reduce((acc, curr) => acc + curr.risk, 0);
  const avgRisk = totalRiskSum / profile.diseaseRisks.length;
  const healthScore = Math.max(10, Math.round(100 - avgRisk * 0.75));

  // Use profile's activeConsultedMeds (with fallback to empty)
  const medsConsulted = profile.activeConsultedMeds || [];
  const activeMeds = medsConsulted.filter(m => m.status === 'active');
  const consultedMeds = medsConsulted.filter(m => m.status === 'recently-consulted');
  const discontMeds = medsConsulted.filter(m => m.status === 'discontinued');

  // Grouped render helper
  function renderMedGroup(title, icon, meds) {
    if (meds.length === 0) return '';
    return `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 700; margin-bottom: 10px; display:flex; align-items:center; gap:6px;">
          <i data-lucide="${icon}" width="13" height="13"></i> ${title}
        </div>
        ${meds.map((med, rawIdx) => {
          const idx = `${med.status}-${rawIdx}`;
          const canToggle = med.status === 'active';
          return `
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
                  <span><strong>Since:</strong> ${med.startDate}${med.endDate ? ` → ${med.endDate}` : ''}</span>
                </div>
                <p class="consulted-med-note">${med.note}</p>
              </div>
              ${canToggle ? `
                <div class="consulted-med-adherence" id="adherence-${idx}">
                  <i data-lucide="${med.adherence ? 'check-circle' : 'circle'}" width="15" height="15"></i>
                  ${med.adherence ? 'Taken Today' : 'Mark Taken'}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Medical history rows
  function renderMedicalHistory(history) {
    if (!history || history.length === 0) return '<p style="color: var(--text-muted); font-size: 0.85rem;">No medical history recorded.</p>';
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
  }

  function drawPatientLayout() {
    container.innerHTML = `
      <div class="dashboard-container">
        
        <!-- Left Sidebar: Patient Profile -->
        <aside class="sidebar">
          <div class="patient-brief">
            <div class="patient-avatar-box">
              ${profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="patient-brief-name">${profile.name}</div>
            <span class="patient-meta-pill">Patient Portal</span>
          </div>

          <div class="patient-demographics-list">
            <div class="demographic-item">
              <span class="demographic-label">Age</span>
              <span class="demographic-value">${profile.age} years</span>
            </div>
            <div class="demographic-item">
              <span class="demographic-label">Gender</span>
              <span class="demographic-value">${profile.gender}</span>
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
              <span class="demographic-label">Tobacco</span>
              <span class="demographic-value">${profile.smokingStatus}</span>
            </div>
          </div>

          <!-- Pre-existing Conditions list in sidebar -->
          <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700; margin-bottom: 10px;">
              Pre-existing Conditions
            </div>
            ${profile.preExistingConditions.map(c => `
              <div style="font-size: 0.8rem; padding: 4px 0; color: var(--text-main); border-bottom: 1px dashed var(--border-color);">
                <i data-lucide="alert-triangle" width="12" height="12" style="color: var(--warning); vertical-align: middle; margin-right: 4px;"></i>${c}
              </div>
            `).join('')}
          </div>

          <div class="sidebar-nav" style="margin-top: auto;">
            <button id="patient-logout-btn" class="sidebar-nav-btn" style="color: var(--danger);">
              <i data-lucide="log-out" width="16" height="16"></i> Sign Out Portal
            </button>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="dashboard-main">
          
          <header class="dashboard-header">
            <div>
              <h1 style="font-size: 2rem; font-weight: 800;">My Health Portal</h1>
              <p style="color: var(--text-muted); margin-top: 4px;">Welcome back, <strong>${profile.name.split(' ')[0]}</strong>. Your precision health summary is ready.</p>
            </div>
            <button id="btn-patient-logout" class="btn btn-secondary">
              <i data-lucide="log-out" width="16" height="16"></i> Log Out
            </button>
          </header>

          <div class="dashboard-grid">
            
            <!-- Health Score Gauge (col-4) -->
            <div class="glass-panel col-4" style="display:flex; flex-direction:column; justify-content:center;">
              <div class="health-score-container">
                <div class="gauge-svg-wrapper">
                  ${drawHealthScoreGauge(healthScore)}
                  <div class="gauge-text">
                    <span class="gauge-score" style="color: ${healthScore >= 80 ? 'var(--success)' : healthScore >= 50 ? 'var(--warning)' : 'var(--danger)'};">${healthScore}</span>
                    <span class="gauge-label">Index</span>
                  </div>
                </div>
                <div class="score-insights">
                  <h3 class="score-title">Health Resilience Index</h3>
                  <p class="score-desc">
                    Calculated score summarizing your genetic metabolism balance and cardiovascular health metrics.
                  </p>
                </div>
              </div>
            </div>

            <!-- AI Summary (dynamic from profile) (col-8) -->
            <div class="glass-panel col-8 ai-summary-banner">
              <div class="ai-avatar-icon">
                <i data-lucide="sparkles" width="32" height="32"></i>
              </div>
              <div class="ai-summary-text">
                <h3>My Aegis Health Companion</h3>
                <p>${profile.aiSummary}</p>
              </div>
            </div>

            <!-- ======================================================
                 MEDICINES ACTIVE / RECENTLY CONSULTED (col-8)
            ====================================================== -->
            <div class="glass-panel col-8">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="pill" class="logo-icon" width="20" height="20"></i>
                Medicines — Active &amp; Recently Consulted
              </h3>

              ${renderMedGroup('Active Prescriptions', 'check-circle', activeMeds)}
              ${renderMedGroup('Recently Consulted / Under Review', 'clock', consultedMeds)}
              ${renderMedGroup('Discontinued', 'x-circle', discontMeds)}

              ${medsConsulted.length === 0 ? '<p style="color: var(--text-muted); font-size: 0.85rem;">No medication records available for this profile.</p>' : ''}
            </div>

            <!-- Care Timeline (col-4) -->
            <div class="glass-panel col-4">
              <h3 style="margin-bottom: 20px;">My Care Timeline</h3>
              <div class="timeline-list">
                ${profile.timeline.map(item => `
                  <div class="timeline-item ${item.completed ? 'completed' : 'pending'}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${item.date}</div>
                    <div class="timeline-title">${item.title}</div>
                    <p class="timeline-desc" style="font-size: 0.75rem;">${item.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- ======================================================
                 MEDICAL HISTORY (col-12)
            ====================================================== -->
            <div class="glass-panel col-12">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="file-clock" class="logo-icon" width="20" height="20"></i>
                Medical History
              </h3>
              ${renderMedicalHistory(profile.medicalHistory)}
            </div>

            <!-- Genomics Made Simple (dynamic from profile) (col-8) -->
            <div class="glass-panel col-8">
              <h3 style="margin-bottom: 20px; display:flex; align-items:center; gap: 8px;">
                <i data-lucide="dna" class="logo-icon" width="20" height="20"></i> Understanding My DNA Markers
              </h3>
              <div class="variants-table-container">
                <table class="variants-table">
                  <thead>
                    <tr>
                      <th>Gene</th>
                      <th>Status</th>
                      <th>What this means for you</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${profile.geneticAnalysis.map(gene => `
                      <tr>
                        <td><span class="gene-tag">${gene.gene}</span></td>
                        <td><span class="implication-pill ${gene.level}">${gene.status}</span></td>
                        <td style="color: var(--text-muted); line-height: 1.4; font-size: 0.82rem;">${gene.clinical}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Wellness Plan (col-4) -->
            <div class="glass-panel col-4">
              <h3 style="margin-bottom: 20px;">My Wellness Plan</h3>
              <div style="display:flex; flex-direction:column; gap: 14px;">
                ${profile.lifestylePlan.map(plan => `
                  <div class="lifestyle-card">
                    <div class="lifestyle-icon-box">
                      <i data-lucide="${plan.icon || 'utensils'}" width="20" height="20"></i>
                    </div>
                    <div class="lifestyle-content">
                      <h4>${plan.category}: ${plan.title}</h4>
                      <p>${plan.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- AI Chat Assistant (col-12) -->
            <div class="col-12" id="patient-chat-container">
              <!-- Renders Chat Widget -->
            </div>

          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Render Chat inside Patient view
    const chatBox = document.getElementById("patient-chat-container");
    renderChat(chatBox, profile);

    // Bind log out buttons
    document.getElementById("btn-patient-logout").addEventListener("click", onLogout);
    document.getElementById("patient-logout-btn").addEventListener("click", onLogout);

    // Adherence toggle — only for active meds
    activeMeds.forEach((med, rawIdx) => {
      const idx = `active-${rawIdx}`;
      const btn = document.getElementById(`adherence-${idx}`);
      if (!btn) return;

      let taken = med.adherence;
      btn.addEventListener("click", () => {
        taken = !taken;
        btn.style.background = taken ? "var(--success-glow)" : "rgba(70,72,88,0.12)";
        btn.style.color = taken ? "var(--success)" : "var(--text-muted)";
        btn.style.borderColor = taken ? "rgba(58,176,116,0.3)" : "var(--border-color)";
        btn.innerHTML = `<i data-lucide="${taken ? 'check-circle' : 'circle'}" width="15" height="15"></i> ${taken ? 'Taken Today' : 'Mark Taken'}`;
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // Execute Initial Render
  drawPatientLayout();
}
