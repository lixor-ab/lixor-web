'use strict';

(function () {

  /* Test with .section-summary - easier to debug css at least :) */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.section-summary'));
  sections.forEach(function (el) {
    el.addEventListener('click', onToggle, false);
  });

  function onToggle(e) {
    e.currentTarget.parentNode.classList.toggle('expanded');
  }
})();
