// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const btnNav = document.querySelector('.btn-nav');

toggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  btnNav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    btnNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Testimonials slider — rotación de contenido en 3 slots fijos
const testimonialTexts = [
  '"Se nota la experiencia desde el primer contacto. Su acompañamiento marcó la diferencia en un momento difícil."',
  '"Recibimos una asesoría clara y honesta que nos permitió tomar buenas decisiones. Sentimos respaldo en cada etapa del proceso."',
  '"Profesional, cercano y eficiente. No solo resolvió el problema, nos dio tranquilidad durante todo el camino."'
];

let tOffset = 0; // índice del texto que está en slot 0 (top)
const tCards = document.querySelectorAll('.testimonial-card');

function renderTestimonials(fade) {
  const n = testimonialTexts.length;
  tCards.forEach((card, slot) => {
    if (fade) card.style.opacity = '0';
    setTimeout(() => {
      const textIndex = (tOffset + slot) % n;
      card.querySelector('p').textContent = testimonialTexts[textIndex];
      card.classList.toggle('active', slot === 1);
      if (fade) card.style.opacity = '1';
    }, fade ? 200 : 0);
  });
}

document.getElementById('prev-btn')?.addEventListener('click', () => {
  tOffset = (tOffset - 1 + testimonialTexts.length) % testimonialTexts.length;
  renderTestimonials(true);
});
document.getElementById('next-btn')?.addEventListener('click', () => {
  tOffset = (tOffset + 1) % testimonialTexts.length;
  renderTestimonials(true);
});

// Smooth navbar background on scroll (already sticky, just reinforce)
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Modales áreas de práctica ──
document.querySelectorAll('.area-link[data-modal]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeAllModals() {
  document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAllModals();
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});
