/**
 * ThamanyanLS — optional script for automatic layout level and depth tokens (max depth 5)
 * https://github.com/veertoooz/ThamanyanLS
 * Run after DOM ready; sets --t-level and class ls-d0…ls-d5 on each .t-layout by nesting depth.
 * Expose ThamanyanLS.init() for SPA / dynamic content — call after DOM changes.
 */
(function () {
  var __THAMANYAN_CSS__ = "__THAMANYAN_CSS_PLACEHOLDER__";
  (function () {
    var s = document.createElement("style");
    s.id = "thamanyanls-styles";
    s.textContent = __THAMANYAN_CSS__;
    (document.head || document.documentElement).appendChild(s);
  })();
  var maxDepth = 5;
  var depthClassPrefix = 'ls-d';

  function init() {
    document.querySelectorAll('.t-layout').forEach(function (el) {
      var depth = 0;
      var p = el.parentElement;
      while (p) {
        if (p.classList && p.classList.contains('t-layout')) depth++;
        p = p.parentElement;
      }
      el.style.setProperty('--t-level', depth || 1);

      var d = Math.min(depth, maxDepth);
      for (var i = 0; i <= maxDepth; i++) {
        el.classList.remove(depthClassPrefix + i);
      }
      el.classList.add(depthClassPrefix + d);
    });
  }

  if (typeof window !== 'undefined') {
    window.ThamanyanLS = { init: init };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
