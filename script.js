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

// Contact form — client-side validation + 실제 전송(구글 시트/메일 연동) + 성공/초기화 흐름
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const contactReset = document.getElementById('contactReset');

// 문의하기 폼을 제출하면 이 주소(구글 앱스 스크립트 웹 앱)로 전송됩니다.
// → 구글 시트에 자동 저장 + kmbiz2600@gmail.com 메일 알림
const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxfAK0-NvxKOS8knSwXUKMzA-QlQpiQG5d89kVdvXjcHAGojMtjs34f1JlCWxG75M2U/exec';

if (contactForm && contactSuccess) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const submitBtnDefaultText = submitBtn ? submitBtn.textContent : '';

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

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '전송 중...';
    }

    const formData = new FormData(contactForm);

    // 구글 앱스 스크립트 웹 앱은 CORS 응답 헤더를 내려주지 않으므로
    // no-cors 모드로 전송합니다. 응답 내용은 읽을 수 없지만
    // 네트워크 요청 자체가 정상적으로 도착하면 서버(구글 시트/메일)에는 정상 반영됩니다.
    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
      .then(() => {
        contactForm.hidden = true;
        contactSuccess.hidden = false;
      })
      .catch(() => {
        alert('문의 전송 중 오류가 발생했습니다. 인터넷 연결을 확인하시고 다시 시도해 주세요.\n계속 안 되면 전화로 문의해 주세요.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtnDefaultText;
        }
      });
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
