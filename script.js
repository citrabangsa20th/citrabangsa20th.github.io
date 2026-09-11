/* =========================================================
   CITRA BANGSA 20TH ANNIVERSARY
   MAIN PORTAL
   ========================================================= */

/* =========================================================
   WAIT FOR DOM
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimation();
  initCardTilt();
});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initRevealAnimation() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) {
    return;
  }

  /*
   * Fallback jika browser tidak mendukung
   * IntersectionObserver.
   */

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
    /*
     * Sedikit delay agar elemen yang berdekatan
     * tidak muncul bersamaan.
     */

    element.style.transitionDelay = `${Math.min(index * 70, 450)}ms`;

    observer.observe(element);
  });
}

/* =========================================================
   SUBTLE CARD TILT
   ========================================================= */

function initCardTilt() {
  /*
   * Efek tilt hanya aktif pada device
   * yang memiliki pointer/mouse.
   */

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!finePointer) {
    return;
  }

  const cards = document.querySelectorAll('.event-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1.5;

      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* =========================================================
   PREVENT DEAD LINK BUTTONS
   ========================================================= */

document.querySelectorAll('.event-button.disabled').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
  });
});
