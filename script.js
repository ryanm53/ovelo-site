/* Ovelo landing page. Small on purpose: no libraries. */
(function () {
  var root = document.documentElement;

  // 1. Main button: label and link come from the <html> tag in index.html.
  var label = root.getAttribute('data-cta-label');
  var href = root.getAttribute('data-cta-href');
  document.querySelectorAll('[data-cta]').forEach(function (a) {
    if (label) a.textContent = label;
    if (href) a.setAttribute('href', href);
    if (href && /^https?:/i.test(href)) a.setAttribute('rel', 'noopener');
  });

  // 2. Daily logo color. Only the logo's accent changes; buttons and favicon stay tangerine.
  //    Test a color with ?logoColor=0E7C86
  var DAILY_LOGO_COLORS = {0: '#D6456F', 1: '#0E7C86', 2: '#4457D6', 3: '#4F8A5B', 4: '#B8780A', 5: '#E4572E', 6: '#9B4FB0'};
  var override = new URLSearchParams(location.search).get('logoColor');
  var hex = override ? override.replace('#', '') : '';
  var color = /^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex) ? '#' + hex : DAILY_LOGO_COLORS[new Date().getDay()];
  if (color) root.style.setProperty('--logo-accent', color);

  // 3. Hairline under the nav once the page scrolls.
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-stuck', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive: true});

  // 4. Fade sections in as they enter the screen.
  var items = document.querySelectorAll('.reveal');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
  items.forEach(function (el) { io.observe(el); });
})();
