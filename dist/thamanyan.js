/**
 * ThamanyanLS — optional script for automatic layout level (unlimited depth)
 * https://github.com/veertoooz/ThamanyanLS
 * Run after DOM ready; sets --t-level on each .t-layout by nesting depth.
 */
(function () {
  function run() {
    document.querySelectorAll('.t-layout').forEach(function (el) {
      var depth = 0;
      var p = el.parentElement;
      while (p) {
        if (p.classList && p.classList.contains('t-layout')) depth++;
        p = p.parentElement;
      }
      el.style.setProperty('--t-level', depth || 1);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
