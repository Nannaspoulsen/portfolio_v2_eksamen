

(function () {
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  const SHOW_AFTER = 400; 
  const mediaReduce = window.matchMedia('(prefers-reduced-motion: reduce)');


  const onScroll = () => {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add('is-visible');
      btn.setAttribute('aria-hidden', 'false');
    } else {
      btn.classList.remove('is-visible');
      btn.setAttribute('aria-hidden', 'true');
    }
  };


  const scrollToTop = () => {
    const behavior = mediaReduce.matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };


  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', scrollToTop);


  onScroll();
})();
