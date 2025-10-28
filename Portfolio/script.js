// NAVBAR: hamburger toggle + close on link click
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  hamburger.classList.toggle('open');
});

hamburger?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('open');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('open');
    }
  });
});

// SMOOTH SCROLL (for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80; // adjust if navbar overlaps
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  });
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
function onScrollActive() {
  const scrollPos = window.scrollY + 100; // offset to trigger earlier
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < top + height) {
      navLink?.classList.add('active-link');
    } else {
      navLink?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', onScrollActive);
window.addEventListener('load', onScrollActive);

// SCROLL-TO-TOP BUTTON
const scrollBtn = document.getElementById('scrollToTop');
function toggleScrollBtn() {
  if (!scrollBtn) return;
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
}
window.addEventListener('scroll', toggleScrollBtn);

scrollBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Simple contact form handling (demo only)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('#name')?.value.trim();
    const email = this.querySelector('#email')?.value.trim();
    const message = this.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill all fields before sending.');
      return;
    }

    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }

    // Replace with real integration (email sending or backend) later
    this.reset();
    showToast('Message sent! I will get back to you soon.');
  });
}

// Toast / small notification utility (non-blocking)
function showToast(msg, timeout = 3000) {
  const id = 'site-toast';
  let toast = document.getElementById(id);
  if (!toast) {
    toast = document.createElement('div');
    toast.id = id;
    toast.style.position = 'fixed';
    toast.style.right = '20px';
    toast.style.bottom = '20px';
    toast.style.background = 'rgba(32, 35, 40, 0.95)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    toast.style.zIndex = 9999;
    toast.style.fontSize = '0.95rem';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  if (toast.dismissTimer) clearTimeout(toast.dismissTimer);
  toast.dismissTimer = setTimeout(() => {
    toast.style.opacity = '0';
  }, timeout);
}

// Small enhancement: keyboard focus outlines for interactive controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.documentElement.classList.add('user-is-tabbing');
  }
});
