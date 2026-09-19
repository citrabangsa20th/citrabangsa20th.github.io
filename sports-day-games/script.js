/* =========================================================
   SPORTS DAY & GAMES
   CITRA BANGSA SCHOOL
   ========================================================= */

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimation();

  initSportRegistration();

  initSmoothScroll();
});

/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function initRevealAnimation() {
  const elements = document.querySelectorAll('.activity-card, .timeline-item, .sport-card, .game-item, .traditional-game, .bazaar-card');

  if (!elements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => {
      element.classList.add('visible');
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,

      rootMargin: '0px 0px -40px 0px',
    },
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;

    element.classList.add('reveal');

    observer.observe(element);
  });
}
