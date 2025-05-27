// Footer year and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburgerBtn.textContent = nav.classList.contains('open') ? '✖' : '☰';
});

// Temple data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17460,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52770,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg"
  }
];

// Card rendering
const container = document.getElementById('temples-container');

function createTempleCard(temple) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${temple.templeName}</h3>
    <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  return card;
}

function displayTemples(filteredTemples) {
  container.innerHTML = '';
  filteredTemples.forEach(temple => {
    container.appendChild(createTempleCard(temple));
  });
}

function filterTemples(type) {
  let result = temples;

  switch (type) {
    case 'old':
      result = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
      break;
    case 'new':
      result = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
      break;
    case 'large':
      result = temples.filter(t => t.area > 90000);
      break;
    case 'small':
      result = temples.filter(t => t.area < 10000);
      break;
    default:
      result = temples;
  }

  displayTemples(result);
}

// Event listeners for nav links
const navLinks = document.querySelectorAll('#primaryNav a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const type = link.dataset.filter;
    filterTemples(type);
  });
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  displayTemples(temples);
});
