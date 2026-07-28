// Login Component — Animated Two-Panel Layout (HTML/CSS/JS)
import { PATIENT_PROFILES } from '../db.js';

// ── Orbiting icon definitions ─────────────────────────────────
const ORBIT_ICONS = [
  // Inner ring (r=100), clockwise
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',       alt: 'HTML5',      r: 100, dur: 20, delay: 0,   ccw: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',         alt: 'CSS3',       r: 100, dur: 20, delay: 10,  ccw: false },
  // Mid-inner ring (r=150), counter-clockwise
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind', r: 150, dur: 22, delay: 5,   ccw: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',     alt: 'Next.js',    r: 150, dur: 22, delay: 15,  ccw: true  },
  // Mid ring (r=200), clockwise
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', alt: 'TypeScript', r: 200, dur: 25, delay: 0,  ccw: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', alt: 'JavaScript', r: 200, dur: 25, delay: 12, ccw: false },
  // Outer ring (r=260), counter-clockwise
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',       alt: 'React',      r: 260, dur: 30, delay: 0,   ccw: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',       alt: 'Figma',      r: 260, dur: 30, delay: 15,  ccw: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',            alt: 'Git',        r: 260, dur: 30, delay: 25,  ccw: true  },
];

// ── Ripple circle definitions (size, opacity) ─────────────────
const RIPPLE_CIRCLES = [
  { size: 100, op: 0.24 }, { size: 170, op: 0.20 }, { size: 240, op: 0.16 },
  { size: 310, op: 0.13 }, { size: 380, op: 0.10 }, { size: 450, op: 0.07 },
  { size: 520, op: 0.05 }, { size: 590, op: 0.03 },
];

// ── Build left panel HTML ─────────────────────────────────────
function buildLeftPanel() {
  const rings = [...new Set(ORBIT_ICONS.map(i => i.r))].sort((a,b) => a-b);

  const ringDivs = rings.map(r =>
    `<div class="orbit-ring" style="width:${r*2}px;height:${r*2}px;"></div>`
  ).join('');

  const iconDivs = ORBIT_ICONS.map((icon, idx) => {
    const startDeg = (idx * 37) % 360; // spread evenly
    const anim = icon.ccw ? 'orbit-ccw' : 'orbit-cw';
    return `
      <div class="orbit-icon" style="
        --orbit-r: ${icon.r};
        --start-deg: ${startDeg}deg;
        animation: ${anim} ${icon.dur}s linear ${icon.delay > 0 ? `-${icon.delay}s` : '0s'} infinite;
      ">
        <img src="${icon.src}" alt="${icon.alt}" loading="lazy">
      </div>
    `;
  }).join('');

  const rippleCircles = RIPPLE_CIRCLES.map((c, i) => `
    <div class="ripple-circle" style="
      width:${c.size}px; height:${c.size}px;
      --rip-op:${c.op};
      animation-delay: ${i * 0.18}s;
      border-style: ${i === RIPPLE_CIRCLES.length-1 ? 'dashed' : 'solid'};
    "></div>
  `).join('');

  return `
    <div class="login-left-panel">
      <div class="ripple-container">${rippleCircles}</div>
      <div class="orbit-scene">
        ${ringDivs}
        <div class="orbit-center-text">Aegis<br>AI</div>
        ${iconDivs}
      </div>
    </div>
  `;
}

// ── Wrap content in box-reveal structure ─────────────────────
function boxReveal(innerHTML, delay = 0) {
  return `
    <div class="box-reveal-outer" style="--br-delay:${delay}ms">
      <div class="box-reveal-overlay"></div>
      <div class="box-reveal-content">${innerHTML}</div>
    </div>
  `;
}

// ── Build right panel HTML ────────────────────────────────────
function buildRightPanel() {
  return `
    <div class="login-right-panel">
      <div class="anim-login-form-wrapper">

        ${boxReveal(`<h2 class="anim-form-heading">Welcome back</h2>`, 0)}
        ${boxReveal(`<p class="anim-form-subheading">Sign in to your Aegis health portal</p>`, 60)}

        <div id="login-error" class="anim-error-banner">
          Invalid credentials. Please use the defaults below.
        </div>

        <form id="login-form" novalidate>

          <!-- Email field -->
          <div class="anim-field-group">
            ${boxReveal(`<label class="anim-field-label" for="login-email">Email <span class="required-star">*</span></label>`, 120)}
            ${boxReveal(`
              <div class="glow-input-wrap" id="glow-wrap-email">
                <input type="email" id="login-email" placeholder="doctor@aegis.com" autocomplete="email">
              </div>
              <span class="anim-field-error" id="err-email"></span>
            `, 150)}
          </div>

          <!-- Password field -->
          <div class="anim-field-group">
            ${boxReveal(`<label class="anim-field-label" for="login-password">Password <span class="required-star">*</span></label>`, 200)}
            ${boxReveal(`
              <div class="glow-input-wrap" id="glow-wrap-password">
                <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password">
                <button type="button" class="pw-toggle" id="pw-toggle-btn" aria-label="Toggle password visibility">
                  <svg id="pw-eye-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <span class="anim-field-error" id="err-password"></span>
            `, 240)}
          </div>

          <!-- Submit -->
          ${boxReveal(`
            <button type="submit" class="anim-submit-btn" id="login-submit-btn">
              Authenticate Access &rarr;
              <span class="btn-shimmer-1"></span>
              <span class="btn-shimmer-2"></span>
            </button>
          `, 300)}

        </form>

        <!-- Credentials helper -->
        ${boxReveal(`
          <div class="login-credentials-helper" style="margin-top: 28px;">
            <h4>Default Simulated Credentials</h4>
            <div><strong>Doctor:</strong> <code>doctor@aegis.com</code> / <code>doctor123</code></div>
            <div><strong>Patient:</strong> <code>sarah@aegis.com</code> / <code>sarah123</code></div>
          </div>
        `, 360)}

      </div>
    </div>
  `;
}

// ── Main export ───────────────────────────────────────────────
export function renderLogin(container, onLoginSuccess) {
  container.innerHTML = `
    <div class="login-split-wrapper">
      ${buildLeftPanel()}
      ${buildRightPanel()}
    </div>
  `;

  // Trigger box-reveal animations staggered on load
  requestAnimationFrame(() => {
    const revealEls = container.querySelectorAll('.box-reveal-outer');
    revealEls.forEach((el, i) => {
      const delay = parseInt(el.style.getPropertyValue('--br-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay + 80);
    });
  });

  // ── Radial glow on inputs ──────────────────────────────────
  container.querySelectorAll('.glow-input-wrap').forEach(wrap => {
    const input = wrap.querySelector('input');

    wrap.addEventListener('mouseenter', () => {
      wrap.style.setProperty('--glow-r', '100px');
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.style.setProperty('--glow-r', '0px');
    });
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      wrap.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
      wrap.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });
  });

  // ── Password toggle ────────────────────────────────────────
  const pwInput = container.querySelector('#login-password');
  const pwToggle = container.querySelector('#pw-toggle-btn');
  const eyeIcon = container.querySelector('#pw-eye-icon');

  const EYE_OPEN = `
    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
    <circle cx="12" cy="12" r="3"/>
  `;
  const EYE_SHUT = `
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  `;

  let pwVisible = false;
  pwToggle.addEventListener('click', () => {
    pwVisible = !pwVisible;
    pwInput.type = pwVisible ? 'text' : 'password';
    eyeIcon.innerHTML = pwVisible ? EYE_OPEN : EYE_SHUT;
  });

  // ── Form validation & submit ───────────────────────────────
  const form = container.querySelector('#login-form');
  const emailInput = container.querySelector('#login-email');
  const errorBanner = container.querySelector('#login-error');
  const errEmail = container.querySelector('#err-email');
  const errPassword = container.querySelector('#err-password');

  function clearErrors() {
    errEmail.textContent = '';
    errPassword.textContent = '';
    errorBanner.style.display = 'none';
  }

  function validate(email, pass) {
    let ok = true;
    clearErrors();
    if (!email) {
      errEmail.textContent = 'Email is required';
      ok = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errEmail.textContent = 'Invalid email address';
      ok = false;
    }
    if (!pass) {
      errPassword.textContent = 'Password is required';
      ok = false;
    } else if (pass.length < 6) {
      errPassword.textContent = 'Password must be at least 6 characters';
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const pass  = pwInput.value.trim();

    if (!validate(email, pass)) return;

    if (email === 'doctor@aegis.com' && pass === 'doctor123') {
      onLoginSuccess('doctor', null);
    } else if (email === 'sarah@aegis.com' && pass === 'sarah123') {
      onLoginSuccess('patient', PATIENT_PROFILES['sarah-jenkins']);
    } else {
      errorBanner.style.display = 'block';
    }
  });

  // Live-clear field errors on input
  emailInput.addEventListener('input', () => { errEmail.textContent = ''; });
  pwInput.addEventListener('input', ()    => { errPassword.textContent = ''; });
}
