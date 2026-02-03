/**
 * Atman Design System - Landing Page Scripts
 */

(function () {
  'use strict';

  // Dark mode toggle
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem('atman-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('atman-theme', theme);
  }

  setTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Sticky header
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection Observer for fade-in animations
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Category tabs for component showcase
  document.querySelectorAll('.category-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var category = this.getAttribute('data-category');

      document.querySelectorAll('.category-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');

      document.querySelectorAll('.component-category').forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-category') === category);
      });
    });
  });

  // Copy code button
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = this.closest('.code-block').querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent.trim()).then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 2000);
        });
      }
    });
  });
})();
