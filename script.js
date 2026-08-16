// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Contact form — saves submissions to Supabase
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = '전송 중...';

  const { error } = await supabaseClient.from('contact_messages').insert({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  submitButton.disabled = false;

  if (error) {
    formStatus.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    return;
  }

  formStatus.textContent = '문의가 접수되었습니다. 빠르게 답변드릴게요!';
  contactForm.reset();
});

// Guestbook — reads and writes entries via Supabase
const guestbookForm = document.getElementById('guestbookForm');
const guestbookStatus = document.getElementById('guestbookStatus');
const guestbookList = document.getElementById('guestbookList');

function renderGuestbookEntries(entries) {
  guestbookList.innerHTML = '';

  if (entries.length === 0) {
    guestbookList.innerHTML = '<li class="guestbook-empty">아직 남겨진 메시지가 없어요. 첫 손님이 되어주세요!</li>';
    return;
  }

  for (const entry of entries) {
    const item = document.createElement('li');
    item.className = 'guestbook-item';

    const message = document.createElement('span');
    message.className = 'guestbook-message';
    message.textContent = entry.message;

    const time = document.createElement('span');
    time.className = 'guestbook-time';
    time.textContent = new Date(entry.created_at).toLocaleString('ko-KR');

    item.append(message, time);
    guestbookList.append(item);
  }
}

async function loadGuestbookEntries() {
  const { data, error } = await supabaseClient
    .from('guestbook')
    .select('id, message, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    guestbookList.innerHTML = '<li class="guestbook-empty">방명록을 불러오지 못했습니다.</li>';
    return;
  }

  renderGuestbookEntries(data);
}

guestbookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(guestbookForm);
  const submitButton = guestbookForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  guestbookStatus.textContent = '등록 중...';

  const { error } = await supabaseClient.from('guestbook').insert({
    message: formData.get('message'),
  });

  submitButton.disabled = false;

  if (error) {
    guestbookStatus.textContent = '등록에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    return;
  }

  guestbookStatus.textContent = '';
  guestbookForm.reset();
  loadGuestbookEntries();
});

loadGuestbookEntries();
