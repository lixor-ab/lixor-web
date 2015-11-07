
const cases = Array.prototype.slice.call(document.querySelectorAll('.case'));
cases.forEach((el) => {
  el.querySelector('.expand-case').addEventListener('click', onToggleCaseExpansion(el), false);
});

// OK so this is silly
function onToggleCaseExpansion(caseEl) {
  return function onToggle(e) {
    console.log('onToggleCaseExpansion for: ', e, caseEl);

    e.stopPropagation();
    e.preventDefault();
    caseEl.classList.toggle('collapsed');
    caseEl.classList.toggle('expanded');
  }
}
