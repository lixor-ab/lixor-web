(function() {

  /* Test with .section-summary - easier to debug css at least :) */
  const sections = Array.prototype.slice.call(document.querySelectorAll('.section-summary'));
  sections.forEach((el) => { el.addEventListener('click', onToggle, false); });

  function onToggle(e) {
    e.currentTarget.parentNode.parentNode.classList.toggle('expanded');
  }

})();

