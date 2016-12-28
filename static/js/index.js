'use strict';

(function () {

  var sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
  sections.forEach(function (el) {
    el.addEventListener('click', onToggle, false);
  });

  function onToggle(e) {
    e.currentTarget.parentNode.classList.toggle('expanded');
  }
})();
