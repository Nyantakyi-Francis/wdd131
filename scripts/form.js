// Populate product dropdown
const products = [
  { id: 'fc-1888', name: "flux capacitor" },
  { id: 'fc-2050', name: "power laces" },
  { id: 'fs-1987', name: "time circuits" },
  { id: 'ac-2000', name: "low voltage reactor" },
  { id: 'jj-1969', name: "warp equalizer" }
]

window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('product')

  if (select) {
    products.forEach(product => {
      const option = document.createElement('option')
      option.value = product.id
      option.textContent = product.name
      select.appendChild(option)
    })
  }

  // Footer script
  const currentYearSpan = document.getElementById('currentyear')
  const lastModifiedPara = document.getElementById('lastModified')

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  if (lastModifiedPara) {
    lastModifiedPara.textContent = 'Last Modified: ' + document.lastModified
  }
})
