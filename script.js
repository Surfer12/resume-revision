// ===== IntersectionObserver to reveal sections on scroll =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => observer.observe(el));

// ===== Testimonials carousel =====
const track = document.querySelector('.carousel__track');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const prevBtn = document.querySelector('.carousel__control--prev');
const nextBtn = document.querySelector('.carousel__control--next');
let index = 0;
let autoSlide;

function updateCarousel(newIndex) {
  testimonials[index].classList.remove('active');
  index = (newIndex + testimonials.length) % testimonials.length;
  testimonials[index].classList.add('active');
  track.style.transform = `translateX(-${index * 100}%)`;
}

function startAutoSlide() {
  autoSlide = setInterval(() => updateCarousel(index + 1), 6000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  updateCarousel(index - 1);
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  updateCarousel(index + 1);
  startAutoSlide();
});

startAutoSlide();

// ===== Hamburger menu =====
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
});

// Close drawer on nav link click (mobile)
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

// ===== Dynamic year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();