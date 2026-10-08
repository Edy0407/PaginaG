const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.nav-links');

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    siteMenu.classList.toggle('is-open', !isOpen);
  });
}

const contactForm = document.querySelector('#contact-form');

document.querySelectorAll('.product-photo img').forEach((image) => {
  const photo = image.parentElement;
  image.addEventListener('error', () => photo.classList.add('is-empty'));
  image.addEventListener('load', () => photo.classList.remove('is-empty'));
  if (!image.complete || image.naturalWidth === 0) {
    photo.classList.add('is-empty');
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `Consulta de ${formData.get('name')} - Repara+`;
    const body = [
      `Nombre: ${formData.get('name')}`,
      `Correo: ${formData.get('email')}`,
      '',
      'Consulta:',
      formData.get('message'),
    ].join('\n');
    const note = document.querySelector('#form-note');
    window.location.href = `mailto:contacto@tulocal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Si no se abre tu aplicación de correo, revisa que tengas una configurada. Actualiza contacto@tulocal.com en script.js antes de publicar.';
  });
}
