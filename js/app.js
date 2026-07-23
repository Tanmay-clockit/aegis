// Aegis Main Controller and Router
import { renderLogin } from './components/login.js';
import { renderLanding } from './components/landing.js';
import { renderPatientForm } from './components/patientForm.js';
import { renderLoadingScreen } from './components/loadingScreen.js';
import { renderDashboard } from './components/dashboard.js';
import { renderPatientDashboard } from './components/patientDashboard.js';
import { PATIENT_PROFILES, generateCustomProfile } from './db.js';

// Global application state
const state = {
  currentView: 'login', // 'login' | 'landing' | 'form' | 'loading' | 'dashboard' | 'patient-dashboard'
  userRole: null,      // 'doctor' | 'patient' | null
  patientData: null,   // Holds the active diagnostic patient dataset
  theme: 'dark'        // 'dark' | 'light'
};

const appContainer = document.getElementById("app");

// Initialize theme state on document load
function initTheme() {
  if (state.theme === 'light') {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}

// Global router and render engine
function navigate(data, view) {
  state.currentView = view;
  initTheme(); // Ensure theme class is applied

  // Clear container
  appContainer.innerHTML = "";

  // 1. If Login, render login view directly without the header toolbar
  if (view === 'login') {
    state.userRole = null;
    state.patientData = null;
    
    const viewSubContainer = document.createElement("div");
    appContainer.appendChild(viewSubContainer);
    
    renderLogin(viewSubContainer, (role, profile) => {
      state.userRole = role;
      if (role === 'patient') {
        state.patientData = profile;
        navigate(null, 'patient-dashboard');
      } else {
        navigate(null, 'landing');
      }
    });
    return;
  }

  // 2. For all other views, render the global navigation toolbar first
  const toolbar = document.createElement("div");
  toolbar.className = "global-toolbar";
  toolbar.innerHTML = `
    <div class="toolbar-brand">
      <i data-lucide="dna" style="color: var(--primary);" width="22" height="22"></i>
      <span class="logo-text" style="font-size: 1.3rem; letter-spacing: -0.5px; margin-right: 10px;">AEGIS</span>
      <span class="patient-meta-pill" style="text-transform: uppercase; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.5px;">
        ${state.userRole === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}
      </span>
    </div>
    <div class="toolbar-controls">
      <button class="theme-toggle-btn" id="global-theme-toggle" title="Switch Theme">
        <i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" width="18" height="18"></i>
      </button>
      <button class="btn btn-secondary btn-sm" id="global-logout-btn" style="padding: 6px 12px; font-size: 0.8rem;">
        <i data-lucide="log-out" width="14" height="14"></i> Sign Out
      </button>
    </div>
  `;
  appContainer.appendChild(toolbar);

  // Subcontainer for the active page body
  const viewBody = document.createElement("div");
  viewBody.id = "view-body";
  appContainer.appendChild(viewBody);

  // Bind toolbar control listeners
  document.getElementById("global-theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    if (state.theme === 'light') {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    // Re-trigger icon render
    const btn = document.getElementById("global-theme-toggle");
    btn.innerHTML = `<i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" width="18" height="18"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  document.getElementById("global-logout-btn").addEventListener("click", () => {
    navigate(null, 'login');
  });

  if (window.lucide) window.lucide.createIcons();

  // 3. Route to the correct view component inside the body subcontainer
  if (view === 'landing') {
    renderLanding(viewBody, () => navigate(null, 'form'));
  } 
  
  else if (view === 'form') {
    renderPatientForm(viewBody, (formData, targetView) => {
      if (targetView === 'landing') {
        navigate(null, 'landing');
      } else if (targetView === 'loading') {
        // Load target preset profile or calculate custom inputs
        if (formData.presetId) {
          state.patientData = PATIENT_PROFILES[formData.presetId];
        } else {
          state.patientData = generateCustomProfile(formData);
        }
        navigate(null, 'loading');
      }
    });
  } 
  
  else if (view === 'loading') {
    renderLoadingScreen(viewBody, () => navigate(null, 'dashboard'));
  } 
  
  else if (view === 'dashboard') {
    if (!state.patientData) {
      navigate(null, 'form');
      return;
    }
    renderDashboard(viewBody, state.patientData, navigate);
  } 
  
  else if (view === 'patient-dashboard') {
    if (!state.patientData) {
      navigate(null, 'login');
      return;
    }
    renderPatientDashboard(viewBody, state.patientData, () => navigate(null, 'login'));
  }
}

// Start application
window.addEventListener("DOMContentLoaded", () => {
  navigate(null, 'login');
});
