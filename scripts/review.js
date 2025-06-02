window.addEventListener('DOMContentLoaded', () => {
  // Review counter
  let count = localStorage.getItem('reviewCount') || 0
  count++
  localStorage.setItem('reviewCount', count)

  const counterSpan = document.getElementById('counter')
  if (counterSpan) {
    counterSpan.textContent = count
  }

  // Footer update
  const currentYearSpan = document.getElementById('currentyear')
  const lastModifiedPara = document.getElementById('lastModified')

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  if (lastModifiedPara) {
    lastModifiedPara.textContent = 'Last Modified: ' + document.lastModified
  }
})
