// Footer year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburgerBtn.textContent = nav.classList.contains('open') ? '✖' : '☰';
});
