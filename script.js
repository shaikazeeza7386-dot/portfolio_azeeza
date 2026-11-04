/**
 * Azeeza Shaik — Portfolio Interactive Scripts
 * Handles mobile drawer, smooth navigation, scrollspy, clipboard copy, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Drawer Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // 2. Scroll Spy & Active Nav Link Highlighter
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Initialize active navigation on load
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Initialize Night Mode / Light Mode Theme System
  initThemeToggle();

  // Initialize Interactive Hero Particle Canvas
  initHeroCanvas();

  // Initialize Cosmic 3D Parallax Movement for Floating Gems & Ambient Moon
  initCosmicParallax();

  // ==========================================
  // 3. Contact Form Submission Handler (Linked to Live Email + Persistent Database)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // 1. Save entry to persistent local database table
      const newEntry = {
        id: 'msg_' + Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
        status: 'sending'
      };

      try {
        const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages_db') || '[]');
        existingMessages.push(newEntry);
        localStorage.setItem('portfolio_messages_db', JSON.stringify(existingMessages));
      } catch (dbErr) {
        console.warn('Local database write notice:', dbErr);
      }

      // Visual button loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Sending to Azeeza...</span>
      `;
      submitBtn.disabled = true;

      // 2. Dispatch live transmission to Azeeza Shaik via FormSubmit API
      try {
        const response = await fetch('https://formsubmit.co/ajax/shaikazeeza7386@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _subject: `New Portfolio Inquiry from ${name}: ${subject}`,
            _template: 'table'
          })
        });

        const result = await response.json().catch(() => ({}));

        // Update database record status
        try {
          const messages = JSON.parse(localStorage.getItem('portfolio_messages_db') || '[]');
          const idx = messages.findIndex(m => m.id === newEntry.id);
          if (idx !== -1) {
            messages[idx].status = 'sent_successfully';
            localStorage.setItem('portfolio_messages_db', JSON.stringify(messages));
          }
        } catch (_) {}

        contactForm.reset();
        showToast(`✅ Thank you, ${name}! Your message has been sent to Azeeza Shaik and saved in the database.`);
      } catch (sendErr) {
        console.warn('Network transmission notice, applying mailto backup:', sendErr);
        
        // Graceful fallback to mail client
        const mailtoUri = `mailto:shaikazeeza7386@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
        window.open(mailtoUri, '_blank');
        contactForm.reset();
        showToast(`Message saved in database! Prepared email for Azeeza Shaik.`);
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

});

// ==========================================
// 4. One-Click Clipboard Copy Function
// ==========================================
function copyEmailToClipboard() {
  const email = 'shaikazeeza7386@gmail.com';
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email)
      .then(() => showToast('Email copied to clipboard: ' + email))
      .catch(() => fallbackCopy(email));
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Email copied to clipboard: ' + text);
  } catch (err) {
    showToast('Failed to copy. Please manually email: ' + text, 'error');
  }
  document.body.removeChild(textArea);
}

// ==========================================
// 5. Toast Notification System
// ==========================================
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;

  if (type === 'error') {
    toast.className = 'fixed bottom-6 right-6 z-50 transform opacity-100 translate-y-0 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-red-500/30 text-red-300 shadow-2xl text-xs font-medium';
  } else {
    toast.className = 'fixed bottom-6 right-6 z-50 transform opacity-100 translate-y-0 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 shadow-2xl text-xs font-medium';
  }

  setTimeout(() => {
    toast.className = 'fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 shadow-2xl text-xs font-medium';
  }, 3500);
}

// ==========================================
// 6. Night Mode / Light Mode Theme System
// ==========================================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const darkIcon = document.getElementById('theme-icon-dark');
  const lightIcon = document.getElementById('theme-icon-light');

  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('azeeza_portfolio_theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    updateIcons(true);
  } else {
    document.documentElement.classList.remove('light-mode');
    updateIcons(false);
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('azeeza_portfolio_theme', isLight ? 'light' : 'dark');
    updateIcons(isLight);
    showToast(isLight ? '☀️ Switched to Light Mode' : '🌙 Switched to Night Mode', 'success');
  }

  function updateIcons(isLight) {
    if (darkIcon && lightIcon) {
      if (isLight) {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
        lightIcon.classList.add('flex');
      } else {
        lightIcon.classList.add('hidden');
        lightIcon.classList.remove('flex');
        darkIcon.classList.remove('hidden');
        darkIcon.classList.add('flex');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
}

// ==========================================
// 7. Interactive Hero Digital Particle Canvas
// ==========================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || 600;
  }
  resizeCanvas();

  let width = canvas.width;
  let height = canvas.height;

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 45);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(139, 92, 246, ';
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#3b82f6';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null, maxDist: 140 };

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    width = canvas.width;
    height = canvas.height;
  }, { passive: true });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * (1 - dist / mouse.maxDist)})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 8. Cosmic 3D Parallax Movement for Floating Gems
// ==========================================
function initCosmicParallax() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const gems = heroSection.querySelectorAll('.crystal-gem');
  const moon = heroSection.querySelector('.rounded-full.bg-gradient-to-br');

  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;

    gems.forEach((gem, idx) => {
      const depth = (idx + 1) * 8;
      gem.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
    });

    if (moon) {
      moon.style.transform = `translate(${xRatio * -15}px, ${yRatio * -15}px)`;
    }
  }, { passive: true });
}

// ==========================================
// 9. Interactive Certificate Lightbox & Details Modals
// ==========================================
window.openCertificateImageModal = function(imageSrc, title) {
  let modal = document.getElementById('cert-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cert-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300';
    modal.innerHTML = `
      <div class="relative w-full max-w-4xl bg-[#090d1a] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        <!-- Header -->
        <div class="px-5 sm:px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 12.5L7 20l5-2.5L17 20l-1.5-7.5"/></svg>
            </div>
            <div>
              <h4 id="cert-modal-title" class="font-bold text-white text-sm sm:text-base leading-snug"></h4>
              <p class="text-[11px] text-cyan-400 font-mono">Official Verified Credential • byteXL</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a id="cert-modal-link" href="#" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md">
              <span>Open Original</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <button onclick="closeCertModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-sm font-bold" aria-label="Close modal">✕</button>
          </div>
        </div>
        <!-- Image Preview Body -->
        <div class="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/60">
          <img id="cert-modal-img" src="" alt="Certificate" class="max-w-full max-h-[72vh] rounded-xl object-contain shadow-2xl border border-white/10">
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertModal();
    });
  }
  document.getElementById('cert-modal-title').textContent = title;
  document.getElementById('cert-modal-link').href = imageSrc;
  document.getElementById('cert-modal-img').src = imageSrc;
  modal.classList.remove('hidden');
};

window.openCertDetailsModal = function(title, issuer, details) {
  let modal = document.getElementById('cert-details-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cert-details-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300';
    modal.innerHTML = `
      <div class="relative w-full max-w-lg bg-[#090d1a] border border-blue-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(29,99,255,0.25)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 12.5L7 20l5-2.5L17 20l-1.5-7.5"/></svg>
            </div>
            <div>
              <h4 id="cert-details-title" class="font-bold text-white text-base"></h4>
              <p id="cert-details-issuer" class="text-xs text-blue-400 font-semibold uppercase tracking-wider"></p>
            </div>
          </div>
          <button onclick="closeCertDetailsModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-sm font-bold" aria-label="Close modal">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
            <div class="text-[11px] font-mono uppercase text-slate-400">Credential Overview</div>
            <p id="cert-details-text" class="text-sm text-slate-200 leading-relaxed"></p>
          </div>
          <div class="flex items-center justify-between pt-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Completion
            </span>
            <button onclick="closeCertDetailsModal()" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertDetailsModal();
    });
  }
  document.getElementById('cert-details-title').textContent = title;
  document.getElementById('cert-details-issuer').textContent = issuer;
  document.getElementById('cert-details-text').textContent = details;
  modal.classList.remove('hidden');
};

window.closeCertModal = function() {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.classList.add('hidden');
};

window.closeCertDetailsModal = function() {
  const modal = document.getElementById('cert-details-modal');
  if (modal) modal.classList.add('hidden');
};

// ==========================================
// 8. Portfolio Messages Database Access Utilities
// ==========================================
window.getPortfolioMessages = function() {
  try {
    const list = JSON.parse(localStorage.getItem('portfolio_messages_db') || '[]');
    console.table(list);
    return list;
  } catch (e) {
    return [];
  }
};

window.exportPortfolioMessages = function() {
  const list = window.getPortfolioMessages();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `portfolio_messages_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};


