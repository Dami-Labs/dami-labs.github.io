const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      navToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
  });

  const desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', () => {
    const focusedElement = document.activeElement;
    closeNav();
    if (!desktop.matches && siteNav.contains(focusedElement)) navToggle.focus();
    if (desktop.matches && focusedElement === navToggle) siteNav.querySelector('a').focus();
  });
  document.documentElement.classList.add('js');
}

const foundedYear = 2025;
const currentYear = Math.max(foundedYear, new Date().getFullYear());
document.getElementById('year').textContent = currentYear === foundedYear
  ? String(foundedYear)
  : `${foundedYear}–${currentYear}`;

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    // Keep the first screen visible immediately; animate only content below it.
    if (item.getBoundingClientRect().top >= window.innerHeight) {
      observer.observe(item);
      item.classList.add('is-pending');
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
