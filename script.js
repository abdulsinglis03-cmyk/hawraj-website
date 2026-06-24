/**
 * HAWRAJ GLOBAL INDUSTRIES LTD — Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCounterAnimation();
  initContactForm();
  initBackToTop();
  initHeroAnimations();
  setCurrentYear();
});

/* Navigation */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
}

/* Scroll Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* Hero entrance animations on load */
function initHeroAnimations() {
  const heroElements = document.querySelectorAll('.hero__content .animate-on-scroll');
  setTimeout(() => {
    heroElements.forEach(el => el.classList.add('visible'));
  }, 200);
}

/* Counter Animation */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat__number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => animateCounter(counter));
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.about__stats');
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
   // e.preventDefault();

    clearErrors();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    if (!name) {
      showError('name', 'Please enter your full name');
      valid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email address');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address');
      valid = false;
    }

    if (!message) {
      showError('message', 'Please enter your message');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn__text');
    const btnLoading = btn.querySelector('.btn__loading');
    const successMsg = document.getElementById('form-success');

    btnText.hidden = true;
    btnLoading.hidden = false;
    btn.disabled = true;

    await simulateSubmit();

    btnText.hidden = false;
    btnLoading.hidden = true;
    btn.disabled = false;

    form.reset();
    successMsg.hidden = false;

    setTimeout(() => {
      successMsg.hidden = true;
    }, 6000);
  });
}

function showError(field, message) {
  const group = document.getElementById(field).closest('.form__group');
  group.classList.add('error');
  document.getElementById(`${field}-error`).textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form__group').forEach(g => g.classList.remove('error'));
  document.querySelectorAll('.form__error').forEach(e => (e.textContent = ''));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateSubmit() {
  return new Promise(resolve => setTimeout(resolve, 1500));
}

/* Back to Top */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Current Year */
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
