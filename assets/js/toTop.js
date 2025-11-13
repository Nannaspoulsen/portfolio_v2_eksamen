(function () {

  const btn = document.querySelector('.to-top');
  // Finder knappen med klassen "to-top".

  if (!btn) return;
  // Hvis knappen ikke findes, stopper jeg koden, så vi undgår fejl.

  const SHOW_AFTER = 400; 
  // Hvor langt man skal scrolle, før knappen bliver vist.

  const mediaReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Tjekker om brugeren har valgt "reduceret bevægelse" i deres systemindstillinger.

  const onScroll = () => {
    // Denne funktion kører hver gang man scroller.

    if (window.scrollY > SHOW_AFTER) {
      // Hvis man har scrollet længere ned end 400px:

      btn.classList.add('is-visible');
      // Så viser jeg knappen ved at give den klassen "is-visible".

      btn.setAttribute('aria-hidden', 'false');
      // Fortæller skærmlæsere, at knappen nu er synlig.
    } else {
      // Hvis man scroller op igen:

      btn.classList.remove('is-visible');
      // Så skjuler jeg knappen.

      btn.setAttribute('aria-hidden', 'true');
      // Fortæller skærmlæsere, at knappen ikke er synlig.
    }
  };


  const scrollToTop = () => {
    // Denne funktion kører, når man klikker på knappen.

    const behavior = mediaReduce.matches ? 'auto' : 'smooth';
    // Hvis brugeren ikke vil have animationer, bruger jeg "auto".
    // Ellers laver jeg en smooth-scroll op til toppen.

    window.scrollTo({ top: 0, behavior });
    // Scroller tilbage til toppen af siden.
  };


  window.addEventListener('scroll', onScroll, { passive: true });
  // Hver gang man scroller, kører onScroll-funktionen.

  btn.addEventListener('click', scrollToTop);
  // Når man klikker på knappen, scroller siden op.

  onScroll();

})();

