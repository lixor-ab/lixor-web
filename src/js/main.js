
const cases = Array.prototype.slice.call(document.querySelectorAll('.case'));
cases.forEach((el) => {
  el.querySelector('.expand-case').addEventListener('click', onToggleCaseExpansion(el), false);
  el.querySelector('.collapse-case').addEventListener('click', onToggleCaseCollapse(el), false);
});

// OK so this is silly
function onToggleCaseExpansion(caseEl) {
  return function onToggle(e) {
    console.log('onToggleCaseExpansion for: ', e, caseEl);

    e.stopPropagation();
    e.preventDefault();
    caseEl.classList.toggle('collapsed'); // too big scope?
    caseEl.classList.toggle('expanded'); // if we need it
    caseEl.querySelector('.expand-case i.fa').classList.toggle('fa-arrow-up');
    caseEl.querySelector('.expand-case i.fa').classList.toggle('fa-arrow-circle-down');
  }
}

// ah - even sillier
function onToggleCaseCollapse(caseEl) {
  return function onToggle(e) {
    console.log('onToggleCaseCollapse for: ', e, caseEl);
    onToggleCaseExpansion(caseEl)(e);

    // and yeah - we need a prettier scroll - but that goes for all animation-ish thing

    const boundRect = caseEl.getBoundingClientRect();
    if (boundRect.bottom < boundRect.height/3) caseEl.scrollIntoView();
  }
}
