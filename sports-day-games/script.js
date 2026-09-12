/* =========================================================
   SPORTS DAY & GAMES
   CITRA BANGSA SCHOOL
   ========================================================= */

/* =========================================================
   GOOGLE FORM LINKS
   =========================================================
   
   Nanti cukup ganti URL di bawah.

   Contoh:

   basket:
   "https://forms.gle/xxxxxxxx"

   Tidak perlu mengubah HTML.
   ========================================================= */

const registrationLinks = {
  basket: '#',

  tenisMeja: '#',

  buluTangkis: '#',

  futsal: '#',
};

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

/* =========================================================
   SPORTS REGISTRATION
   ========================================================= */

function initSportRegistration() {
  const buttons = document.querySelectorAll('.register-button');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const sport = button.dataset.sport;

      const key = normalizeSportName(sport);

      const targetUrl = registrationLinks[key];

      /*
       * Kalau link belum diisi,
       * tampilkan pemberitahuan sederhana.
       */

      if (!targetUrl || targetUrl === '#') {
        event.preventDefault();

        showRegistrationNotice(sport);

        return;
      }

      /*
       * Kalau link sudah diisi,
       * arahkan ke Google Form.
       */

      event.preventDefault();

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/* =========================================================
   NORMALIZE SPORT NAME
   ========================================================= */

function normalizeSportName(name) {
  const normalized = name.toLowerCase().trim();

  if (normalized === 'basket') {
    return 'basket';
  }

  if (normalized === 'tenis meja') {
    return 'tenisMeja';
  }

  if (normalized === 'bulu tangkis') {
    return 'buluTangkis';
  }

  if (normalized === 'futsal') {
    return 'futsal';
  }

  return '';
}

/* =========================================================
   REGISTRATION NOTICE
   ========================================================= */

function showRegistrationNotice(sport) {
  const existing = document.querySelector('.registration-notice');

  if (existing) {
    existing.remove();
  }

  const notice = document.createElement('div');

  notice.className = 'registration-notice';

  notice.innerHTML = `
        <div class="notice-box">

            <div class="notice-icon">
                <i class="fa-solid fa-link"></i>
            </div>

            <strong>
                Pendaftaran ${sport}
            </strong>

            <p>
                Link pendaftaran akan segera tersedia.
                Silakan kembali lagi nanti.
            </p>

            <button type="button">
                Tutup
            </button>

        </div>
    `;

  document.body.appendChild(notice);

  const closeButton = notice.querySelector('button');

  closeButton.addEventListener('click', () => {
    notice.classList.add('closing');

    setTimeout(() => {
      notice.remove();
    }, 250);
  });

  /*
   * Tutup ketika klik area luar.
   */

  notice.addEventListener('click', (event) => {
    if (event.target === notice) {
      notice.remove();
    }
  });
}

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

/* =========================================================
   ADD NOTICE STYLES
   ========================================================= */

const noticeStyle = document.createElement('style');

noticeStyle.textContent = `

    .registration-notice {

        position: fixed;

        inset: 0;

        z-index: 9999;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 20px;

        background:
            rgba(7, 27, 69, 0.55);

        backdrop-filter:
            blur(8px);

    }


    .notice-box {

        width: min(
            420px,
            100%
        );

        padding: 30px;

        border-radius: 25px;

        background: white;

        color: #17233d;

        text-align: center;

        box-shadow:
            0 30px 80px
            rgba(0, 0, 0, 0.2);

        animation:
            noticeIn 0.25s ease;

    }


    .notice-icon {

        width: 55px;

        height: 55px;

        display: flex;

        align-items: center;

        justify-content: center;

        margin: 0 auto 15px;

        border-radius: 16px;

        background:
            rgba(20, 85, 217, 0.1);

        color: #1455d9;

        font-size: 20px;

    }


    .notice-box strong {

        display: block;

        font-family:
            "Baloo 2",
            sans-serif;

        font-size: 25px;

    }


    .notice-box p {

        margin-top: 8px;

        color: #64708a;

        font-size: 12px;

        line-height: 1.7;

    }


    .notice-box button {

        margin-top: 20px;

        padding: 11px 24px;

        border: none;

        border-radius: 100px;

        background: #1455d9;

        color: white;

        font-family: inherit;

        font-size: 10px;

        font-weight: 800;

        cursor: pointer;

    }


    .registration-notice.closing {

        opacity: 0;

        transition:
            opacity 0.25s ease;

    }


    @keyframes noticeIn {

        from {

            opacity: 0;

            transform:
                scale(0.95)
                translateY(10px);

        }

        to {

            opacity: 1;

            transform:
                scale(1)
                translateY(0);

        }

    }

`;

document.head.appendChild(noticeStyle);
