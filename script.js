function scrollToForm() {
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  alert('🔥 Sucesso! Em breve entraremos em contato.');
});