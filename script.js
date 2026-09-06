// Tailwind configuration
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        cb: {
          dark: '#0a3a1f',
          deep: '#125c30',
          primary: '#1d8d48',
          vibrant: '#2cc05d',
          lime: '#84cc16',
          yellow: '#facc15',
          gold: '#eab308',
          light: '#f0fdf4',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #09331b 0%, #125c30 50%, #1e924a 100%)',
        'card-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7fdf9 100%)',
        'gold-gradient': 'linear-gradient(90deg, #facc15 0%, #eab308 100%)',
      },
    },
  },
};

// Alpine.js application
function lombaApp() {
  return {
    mobileMenuOpen: false,
    searchQuery: '',
    selectedLevel: 'semua',
    selectedCategory: 'semua',
    modalOpen: false,
    selectedLomba: null,

    levels: [
      { id: 'semua', name: 'Semua Tingkat', icon: 'fa-solid fa-layer-group' },
      { id: 'TK', name: 'TK', icon: 'fa-solid fa-child' },
      { id: 'SD', name: 'SD', icon: 'fa-solid fa-school' },
      { id: 'SMP', name: 'SMP', icon: 'fa-solid fa-graduation-cap' },
      { id: 'SMA', name: 'SMA', icon: 'fa-solid fa-university' },
    ],

    categories: [
      { id: 'semua', name: 'Semua Kategori', icon: 'fa-solid fa-border-all' },
      { id: 'Sport', name: 'Sport', icon: 'fa-solid fa-futbol' },
      { id: 'Esport', name: 'Esport', icon: 'fa-solid fa-gamepad' },
      { id: 'English', name: 'English', icon: 'fa-solid fa-language' },
      { id: 'Mandarin', name: 'Mandarin', icon: 'fa-solid fa-earth-asia' },
      { id: 'Modern Dance', name: 'Modern Dance', icon: 'fa-solid fa-music' },
      { id: 'TK & Seni', name: 'TK & Seni', icon: 'fa-solid fa-palette' },
    ],

    // Full List of Competitions mapped accurately from prompt specifications
    competitions: [
      // --- TINGKAT TK ---
      {
        id: 1,
        title: 'Mewarnai Totebag',
        level: 'TK',
        category: 'TK & Seni',
        teamType: 'Individu',
        schedule: '10 Oktober 2026',
        gformUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc2YOC9MS-ziBuYMNSusHJ-OUElmgc8WKgABkt-G7Q2y4KJUw/viewform?usp=header',
      },
      {
        id: 2,
        title: 'Bernyanyi Mandarin TK',
        level: 'TK',
        category: 'Mandarin',
        teamType: 'Individu',
        schedule: '5 Oktober 2026',
        gformUrl: 'https://forms.gle/uGjsjEW3hjnQUg9M7',
      },
      {
        id: 3,
        title: 'Menari TK',
        level: 'TK',
        category: 'TK & Seni',
        teamType: 'Grup (8-10 Orang)',
        schedule: '10 Oktober 2026',
        gformUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfkwUCJtdxggk_NbTJgD9rFOWMQ-GIUvstEin-i715hOLTAIw/viewform?usp=sharing&ouid=111507050738052168768',
      },

      // --- TINGKAT SD ---
      {
        id: 4,
        title: 'Badminton Ganda Putra SD',
        level: 'SD',
        category: 'Sport',
        teamType: 'Ganda (2 Orang)',
        schedule: '13 Oktober 2026',
        gformUrl: 'https://forms.gle/dW8BKojRN1kSTxis6',
      },
      {
        id: 5,
        title: 'Mobile Legends SD',
        level: 'SD',
        category: 'Esport',
        teamType: 'Tim (5-6 Orang)',
        schedule: '13 Oktober 2026',
        gformUrl: 'https://forms.gle/6hvVEPLHUJPFgATG6',
      },
      {
        id: 6,
        title: 'Spelling Bee SD',
        level: 'SD',
        category: 'English',
        teamType: 'Individu',
        schedule: '5 Oktober 2026',
        gformUrl: 'https://forms.gle/xscoJqTE2c6ZDA3F9',
      },
      {
        id: 7,
        title: 'Story Telling SD',
        level: 'SD',
        category: 'English',
        teamType: 'Individu',
        schedule: '6 Oktober 2026',
        gformUrl: 'https://forms.gle/xscoJqTE2c6ZDA3F9',
      },
      {
        id: 8,
        title: 'Bernyanyi Mandarin SD',
        level: 'SD',
        category: 'Mandarin',
        teamType: 'Individu',
        schedule: '6 dan 7 Oktober 2026',
        gformUrl: 'https://forms.gle/uGjsjEW3hjnQUg9M7',
      },

      // --- TINGKAT SMP ---
      {
        id: 9,
        title: 'Futsal SMP',
        level: 'SMP',
        category: 'Sport',
        teamType: 'Tim (5-10 Orang)',
        schedule: '15 Oktober 2026',
        gformUrl: 'https://forms.gle/oef8Un4CJfNxeVAx7',
      },
      {
        id: 10,
        title: 'Badminton Ganda Putra SMP',
        level: 'SMP',
        category: 'Sport',
        teamType: 'Ganda (2 Orang)',
        schedule: '14 Oktober 2026',
        gformUrl: 'https://forms.gle/dW8BKojRN1kSTxis6',
      },
      {
        id: 11,
        title: 'Mobile Legends SMP',
        level: 'SMP',
        category: 'Esport',
        teamType: 'Tim (5-6 Orang)',
        schedule: '14 Oktober 2026',
        gformUrl: 'https://forms.gle/6hvVEPLHUJPFgATG6',
      },
      {
        id: 12,
        title: 'Story Telling SMP',
        level: 'SMP',
        category: 'English',
        teamType: 'Individu',
        schedule: '7 Oktober 2026',
        gformUrl: 'https://forms.gle/xscoJqTE2c6ZDA3F9',
      },
      {
        id: 13,
        title: 'Story Telling Mandarin SMP',
        level: 'SMP',
        category: 'Mandarin',
        teamType: 'Individu',
        schedule: '8 Oktober 2026',
        gformUrl: 'https://forms.gle/uGjsjEW3hjnQUg9M7',
      },
      {
        id: 14,
        title: 'Modern Dance SMP',
        level: 'SMP',
        category: 'Modern Dance',
        teamType: 'Grup (3-9 Orang)',
        schedule: '9 Oktober 2026',
        gformUrl: 'https://forms.gle/ZajkWzuPNRuiQDyF9',
      },

      // --- TINGKAT SMA ---
      {
        id: 15,
        title: 'Mobile Legends SMA',
        level: 'SMA',
        category: 'Esport',
        teamType: 'Tim (5-6 Orang)',
        schedule: '15 Oktober 2026',
        gformUrl: 'https://forms.gle/6hvVEPLHUJPFgATG6',
      },
      {
        id: 16,
        title: 'English Debate SMA',
        level: 'SMA',
        category: 'English',
        teamType: 'Tim (3 Orang)',
        schedule: '8 Oktober 2026',
        gformUrl: 'https://forms.gle/xscoJqTE2c6ZDA3F9',
      },
      {
        id: 17,
        title: 'Story Telling Mandarin SMA',
        level: 'SMA',
        category: 'Mandarin',
        teamType: 'Individu',
        schedule: '9 Oktober 2026',
        gformUrl: 'https://forms.gle/uGjsjEW3hjnQUg9M7',
      },
      {
        id: 18,
        title: 'Modern Dance SMA',
        level: 'SMA',
        category: 'Modern Dance',
        teamType: 'Grup (3-9 Orang)',
        schedule: '9 Oktober 2026',
        gformUrl: 'https://forms.gle/ZajkWzuPNRuiQDyF9',
      },
    ],

    faqs: [
      {
        q: 'Siapa saja yang boleh mengikuti lomba?',
        a: 'Peserta dapat mengikuti lomba sesuai dengan jenjang pendidikan dan kategori lomba yang telah ditentukan. Siswa dari sekolah manapun boleh mendaftar, baik dari Yayasan Citra Bangsa maupun sekolah lain.',
        open: false,
      },
      {
        q: 'Apakah peserta boleh mengikuti lebih dari satu lomba?',
        a: 'Ya, peserta dapat mengikuti lebih dari satu lomba selama memenuhi persyaratan dan jadwal pelaksanaan masing-masing lomba tidak berbenturan.',
        open: false,
      },
      {
        q: 'Bagaimana jika peserta memilih kategori lomba yang tidak sesuai dengan jenjangnya?',
        a: 'Peserta harus mengikuti kategori lomba sesuai jenjang yang telah ditentukan. Panitia berhak melakukan penyesuaian atau membatalkan keikutsertaan apabila kategori yang dipilih tidak sesuai.',
        open: false,
      },
      {
        q: 'Apakah peserta wajib menggunakan seragam tertentu?',
        a: 'Ketentuan pakaian atau kostum akan disesuaikan dengan masing-masing kategori lomba. Peserta diharapkan menggunakan pakaian yang rapi, sopan, nyaman, dan sesuai dengan jenis perlombaan.',
        open: false,
      },
    ],

    // Computed getter for filtered list
    get filteredCompetitions() {
      return this.competitions.filter((item) => {
        // Level filter
        const matchLevel = this.selectedLevel === 'semua' || item.level === this.selectedLevel;

        // Category filter
        const matchCategory = this.selectedCategory === 'semua' || item.category === this.selectedCategory;

        // Search query
        const query = this.searchQuery.toLowerCase().trim();
        const matchSearch = query === '' || item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query) || item.level.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);

        return matchLevel && matchCategory && matchSearch;
      });
    },

    getCompetitionCountByLevel(levelId) {
      if (levelId === 'semua') return this.competitions.length;
      return this.competitions.filter((c) => c.level === levelId).length;
    },

    getCategoryIcon(category) {
      switch (category) {
        case 'Sport':
          return 'fa-solid fa-futbol';
        case 'Esport':
          return 'fa-solid fa-gamepad';
        case 'English':
          return 'fa-solid fa-language';
        case 'Mandarin':
          return 'fa-solid fa-earth-asia';
        case 'Modern Dance':
          return 'fa-solid fa-music';
        case 'TK & Seni':
          return 'fa-solid fa-palette';
        default:
          return 'fa-solid fa-trophy';
      }
    },

    openModal(lomba) {
      this.selectedLomba = lomba;
      this.modalOpen = true;
    },

    resetFilters() {
      this.selectedLevel = 'semua';
      this.selectedCategory = 'semua';
      this.searchQuery = '';
    },
  };
}
