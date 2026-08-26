const checkbox = document.getElementById('tategaki-toggle');
if (checkbox) {
  if (localStorage.getItem('tategaki-mode') === 'true') {
    document.documentElement.classList.add('tategaki-mode');
    checkbox.checked = true;
  }
  checkbox.addEventListener('change', () => {
    document.documentElement.classList.toggle('tategaki-mode', checkbox.checked);
    localStorage.setItem('tategaki-mode', String(checkbox.checked));
  });
}
