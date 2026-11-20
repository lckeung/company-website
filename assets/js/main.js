(function () {
  'use strict';

  var doc = document;
  var header = doc.getElementById('siteHeader');
  var navToggle = doc.getElementById('navToggle');
  var nav = doc.getElementById('primaryNav');
  var backToTop = doc.getElementById('backToTop');
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav-link'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function closeNav() {
    doc.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = doc.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeNav();
  });

  doc.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && doc.body.classList.contains('nav-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  window.matchMedia('(min-width: 981px)').addEventListener('change', function (event) {
    if (event.matches) closeNav();
  });

  /* ------------------------------------------------------------------
     Header state + back to top
     ------------------------------------------------------------------ */
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    backToTop.classList.toggle('is-visible', y > 600);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var revealEls = doc.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------
     Animated counters
     ------------------------------------------------------------------ */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }

    var duration = 1400;
    var start = null;

    function tick(now) {
      if (!start) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  var counters = doc.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ------------------------------------------------------------------
     Active navigation section
     ------------------------------------------------------------------ */
  var sections = navLinks.map(function (link) {
    return doc.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ------------------------------------------------------------------
     Project filter
     ------------------------------------------------------------------ */
  var filterButtons = doc.querySelectorAll('.filter-btn');
  var projectCards = doc.querySelectorAll('.project-card');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');

      var filter = button.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        var matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !matches);
        if (matches) {
          card.classList.add('is-visible');
        }
      });
    });
  });

  filterButtons.forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('is-active') ? 'true' : 'false');
  });

  /* ------------------------------------------------------------------
     Enquiry form
     ------------------------------------------------------------------ */
  var form = doc.getElementById('enquiryForm');
  var formNote = doc.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      formNote.classList.remove('is-success', 'is-error');

      if (!form.checkValidity()) {
        formNote.textContent = 'Please complete the required fields before sending.';
        formNote.classList.add('is-error');
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = doc.getElementById('name').value.trim();
      form.reset();
      formNote.textContent = 'Thank you' + (name ? ', ' + name : '') +
        '. Your enquiry has been recorded — our team will respond within one working day.';
      formNote.classList.add('is-success');
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  doc.getElementById('year').textContent = String(new Date().getFullYear());
})();
