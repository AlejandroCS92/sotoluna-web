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

// Testimonials slider
const track = document.getElementById('testimonials-track');
const cards = track?.querySelectorAll('.testimonial-card');
let current = 0;

function showCard(index) {
  if (!cards || cards.length === 0) return;
  current = (index + cards.length) % cards.length;
  const cardH = cards[0].offsetHeight + 20; // gap
  track.style.transform = `translateY(-${current * cardH}px)`;
}

document.getElementById('prev-btn')?.addEventListener('click', () => showCard(current - 1));
document.getElementById('next-btn')?.addEventListener('click', () => showCard(current + 1));

// Smooth navbar background on scroll (already sticky, just reinforce)
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });
