// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PARTICLE GENERATOR =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 10;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (target === 100 ? '' : '+');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== INTERSECTION OBSERVER =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => animateCounter(num));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObserver.observe(statsEl);

// ===== CONTACT FORM =====
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');
  form.style.display = 'none';
  success.style.display = 'flex';
  setTimeout(() => {
    success.style.display = 'none';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.reset();
  }, 4000);
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  const isScrolled = navbar.classList.contains('scrolled');
  navAnchorLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = isScrolled ? '#ff6b35' : '#fff';
      link.style.fontWeight = '700';
    } else {
      link.style.color = '';
      link.style.fontWeight = '';
    }
  });
});

// ===== SMOOTH ENTRANCE ON LOAD =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ===== LIGHTBOX =====
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCaption');
let galleryItems  = [];
let currentIndex  = 0;

function openLightbox(el) {
  galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  currentIndex = galleryItems.indexOf(el);
  showLightboxItem(currentIndex);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem(index) {
  const img     = galleryItems[index].querySelector('img');
  const caption = galleryItems[index].querySelector('.gallery-overlay span');
  lightboxImg.src         = img.src;
  lightboxImg.alt         = img.alt;
  lightboxCap.textContent = caption ? caption.textContent : '';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNav(dir, e) {
  e.stopPropagation();
  currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
  showLightboxItem(currentIndex);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1,  { stopPropagation: () => {} });
  if (e.key === 'ArrowLeft')  lightboxNav(-1, { stopPropagation: () => {} });
});
