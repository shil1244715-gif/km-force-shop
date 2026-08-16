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
