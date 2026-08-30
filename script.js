// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// Contact form — client-side validation + success/reset flow
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const contactReset = document.getElementById('contactReset');

if (contactForm && contactSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false;
    contactForm.querySelectorAll('[data-required]').forEach((input) => {
      const field = input.closest('.field');
      const isEmpty = input.value.trim() === '';
      field.classList.toggle('has-error', isEmpty);
      if (isEmpty) hasError = true;
    });

    if (hasError) return;

    contactForm.hidden = true;
    contactSuccess.hidden = false;
  });

  contactForm.querySelectorAll('[data-required]').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.closest('.field').classList.remove('has-error');
      }
    });
  });
}

if (contactReset) {
  contactReset.addEventListener('click', () => {
    contactForm.reset();
    contactForm.querySelectorAll('.field').forEach((field) => field.classList.remove('has-error'));
    contactSuccess.hidden = true;
    contactForm.hidden = false;
  });
}

// "견적문의" 버튼으로 넘어왔을 때 문의 내용에 품명·코드를 자동으로 채워줌
// (링크 형식: index.html?qname=상품명&qcode=상품코드#contact)
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const qname = params.get('qname');
  const qcode = params.get('qcode');

  if (qname || qcode) {
    const messageField = contactForm.querySelector('textarea[name="message"]');
    if (messageField) {
      const label = qname && qcode ? `${qname} (코드: ${qcode})` : qname || qcode;
      messageField.value = `[문의 제품] ${label}\n\n`;
    }

    // 새로고침해도 문의 내용이 계속 다시 채워지지 않도록 주소창의 쿼리만 조용히 정리
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);
  }
}

// Hero carousel (home page only)
const heroCarousel = document.getElementById('heroCarousel');

if (heroCarousel) {
  const heroSection = heroCarousel.closest('.hero');
  const slides = heroCarousel.querySelectorAll('.hero-slide');
  const photos = heroSection ? heroSection.querySelectorAll('.hero-photo') : [];
  const dots = heroCarousel.querySelectorAll('.hero-dot');
  const prevBtn = heroCarousel.querySelector('.hero-arrow-prev');
  const nextBtn = heroCarousel.querySelector('.hero-arrow-next');
  const progressBar = heroCarousel.querySelector('.hero-progress-bar');
  let current = 0;
  let timer;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    photos.forEach((photo, i) => photo.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    restartTimer();
  }

  function restartTimer() {
    if (!progressBar) return;
    progressBar.style.animation = 'none';
    // Force reflow so the animation restarts from 0 every time.
    void progressBar.offsetWidth;
    progressBar.style.animation = '';
    clearTimeout(timer);
    timer = setTimeout(() => goToSlide(current + 1), 6000);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(current + 1));

  restartTimer();
}

// Home "인기 상품" category tab filter
const bestGrid = document.getElementById('bestProductGrid');

if (bestGrid) {
  const tabs = document.querySelectorAll('.best-tab');
  const items = bestGrid.querySelectorAll('.product-item');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const cat = tab.dataset.cat;
      items.forEach((item) => {
        item.hidden = cat !== 'all' && item.dataset.cat !== cat;
      });
    });
  });
}
