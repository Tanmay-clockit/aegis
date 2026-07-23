// Login Component
import { PATIENT_PROFILES } from '../db.js';

export function renderLogin(container, onLoginSuccess) {
  container.innerHTML = `
    <div class="login-view-wrapper">
      <div class="glass-panel login-card">
        <div class="login-logo">
          <i data-lucide="shield-check" width="54" height="54"></i>
        </div>
        <h2>Aegis Portal Login</h2>
        <p class="login-subtitle">Simulated Healthcare Precision Platform</p>
        
        <form id="login-form">
          <div class="login-input-group">
            <label class="form-label" for="login-email">Clinical Email</label>
            <input type="email" id="login-email" class="form-control" placeholder="doctor@aegis.com" required>
          </div>

          <div class="login-input-group" style="margin-bottom: 24px;">
            <label class="form-label" for="login-password">Access Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>

          <div id="login-error" style="display:none; color: var(--danger); font-size: 0.8rem; margin-bottom: 16px; text-align: left; font-weight: 600;">
            Invalid clinical email or access credentials. Please review the defaults below.
          </div>

          <button type="submit" class="btn btn-primary login-submit-btn">
            Authenticate Access <i data-lucide="arrow-right" width="16" height="16"></i>
          </button>
        </form>

        <div class="login-credentials-helper">
          <h4>Default Simulated Credentials</h4>
          <div>
            <strong>Doctor Role:</strong>
            <code>doctor@aegis.com</code> / <code>doctor123</code>
          </div>
          <div>
            <strong>Patient Role:</strong>
            <code>sarah@aegis.com</code> / <code>sarah123</code>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("login-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    if (email === "doctor@aegis.com" && pass === "doctor123") {
      errorBox.style.display = "none";
      onLoginSuccess("doctor", null);
    } else if (email === "sarah@aegis.com" && pass === "sarah123") {
      errorBox.style.display = "none";
      // Auto-load Sarah Jenkins profile
      const sarahProfile = PATIENT_PROFILES["sarah-jenkins"];
      onLoginSuccess("patient", sarahProfile);
    } else {
      errorBox.style.display = "block";
    }
  });
}
