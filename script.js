// ── Nav scroll effect ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ──
const menuBtn = document.querySelector('.nav-menu');
const mobileNav = document.querySelector('.nav-mobile');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ── Scroll animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Track App Store download clicks ──
document.querySelectorAll('a[href*="apps.apple.com"]').forEach(link => {
  link.addEventListener('click', () => {
    // Save to localStorage for owner dashboard
    try {
      const clicks = JSON.parse(localStorage.getItem('bb_download_clicks') || '[]');
      clicks.push(new Date().toISOString());
      localStorage.setItem('bb_download_clicks', JSON.stringify(clicks));
    } catch (e) {}
    // Increment CountAPI counter
    fetch('https://api.countapi.xyz/hit/bigbrainhw/downloads').catch(() => {});
  });
});
