// Netlify Forms contact behavior. The form has method=POST, the
// netlify attribute and action="/cam-on.html", so a native submit
// hands off to Netlify's form backend and redirects on success.
// We only intercept here to (a) drop bot honeypot submissions and
// (b) validate in-browser so a bad submit doesn't bounce the user.
// On a valid submit we let the browser do the real full-page POST.

export function initForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', (event) => {
    // Honeypot: bots often fill hidden fields; real visitors never see it.
    if (form['truong-khong-dien'].value.trim()) {
      event.preventDefault();
      form.reset();
      formStatus.textContent = '';
      return;
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      formStatus.textContent = 'Vui lòng hoàn thiện các trường bắt buộc.';
      return;
    }

    formStatus.textContent = 'Đang gửi nhu cầu của bạn…';
    // Intentionally NOT preventDefault() here: let the browser perform the
    // native POST to Netlify, which then redirects to /cam-on.html.
  });
}
