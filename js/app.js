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

  // 4. Render and Bind the Global Magnifying Dock (Apple Style)
  renderGlobalDock(appContainer);

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

// Global dock renderer and interactivity binder
function renderGlobalDock(parent) {
  const dockContainer = document.createElement("div");
  dockContainer.className = "dock-container";

  let dockItemsHTML = "";
  if (state.userRole === 'doctor') {
    dockItemsHTML = `
      <div class="dock-item" id="dock-home">
        <span class="dock-label">Home / Welcome</span>
        <div class="dock-icon"><i data-lucide="home"></i></div>
      </div>
      <div class="dock-item" id="dock-form">
        <span class="dock-label">New Diagnostics</span>
        <div class="dock-icon"><i data-lucide="plus-circle"></i></div>
      </div>
      ${state.patientData ? `
        <div class="dock-item" id="dock-dashboard">
          <span class="dock-label">Clinical Dashboard</span>
          <div class="dock-icon"><i data-lucide="activity"></i></div>
        </div>
        <div class="dock-item" id="dock-patient-view">
          <span class="dock-label">Patient View</span>
          <div class="dock-icon"><i data-lucide="user"></i></div>
        </div>
      ` : ''}
    `;
  } else if (state.userRole === 'patient') {
    dockItemsHTML = `
      <div class="dock-item" id="dock-home-patient">
        <span class="dock-label">My Health Portal</span>
        <div class="dock-icon"><i data-lucide="home"></i></div>
      </div>
    `;
  }

  // Append theme and sign out to all roles
  dockItemsHTML += `
    <div class="dock-item" id="dock-theme-toggle">
      <span class="dock-label">Toggle Theme</span>
      <div class="dock-icon"><i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}"></i></div>
    </div>
    <div class="dock-item" id="dock-logout" style="border-color: rgba(226, 92, 80, 0.2);">
      <span class="dock-label" style="color: var(--danger);">Sign Out</span>
      <div class="dock-icon" style="color: var(--danger);"><i data-lucide="log-out"></i></div>
    </div>
  `;

  dockContainer.innerHTML = `<div class="dock-wrapper">${dockItemsHTML}</div>`;
  parent.appendChild(dockContainer);
  if (window.lucide) window.lucide.createIcons();

  // Interactivity: Fish-eye magnifying animation calculations
  const wrapper = dockContainer.querySelector(".dock-wrapper");
  const items = dockContainer.querySelectorAll(".dock-item");
  const distanceThreshold = 140; // distance in pixels to start magnification
  const maxMagnification = 72;   // max item width/height in px
  const baseSize = 40;           // base item width/height in px

  wrapper.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);

      if (distance < distanceThreshold) {
        // Cosine scaling curve for smooth magnification transitions
        const ratio = Math.cos((distance / distanceThreshold) * Math.PI / 2);
        const newSize = baseSize + (maxMagnification - baseSize) * ratio;
        item.style.width = `${newSize}px`;
        item.style.height = `${newSize}px`;
      } else {
        item.style.width = `${baseSize}px`;
        item.style.height = `${baseSize}px`;
      }
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    items.forEach(item => {
      item.style.width = `${baseSize}px`;
      item.style.height = `${baseSize}px`;
    });
  });

  // Action bindings
  const bindAction = (id, callback) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", callback);
  };

  bindAction("dock-home", () => navigate(null, 'landing'));
  bindAction("dock-form", () => navigate(null, 'form'));
  bindAction("dock-dashboard", () => navigate(null, 'dashboard'));
  bindAction("dock-patient-view", () => navigate(null, 'patient-dashboard'));
  bindAction("dock-home-patient", () => navigate(null, 'patient-dashboard'));
  
  bindAction("dock-theme-toggle", () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    if (state.theme === 'light') {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    navigate(null, state.currentView); // Refresh view to update theme icons everywhere
  });

  bindAction("dock-logout", () => navigate(null, 'login'));
}

// Start application
window.addEventListener("DOMContentLoaded", () => {
  navigate(null, 'login');
});
