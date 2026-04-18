function scrollToForm() {
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length === 0) {
    alert('Por favor, complete o reCAPTCHA.');
    return;
  }

  alert('🔥 Sucesso! Em breve entraremos em contato.');
});