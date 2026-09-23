/** @jsxImportSource @ox-content/vite-plugin */
import { raw } from '@ox-content/vite-plugin';

const TATEGAKI_SCRIPT = `(function () {
  const checkbox = document.getElementById('tategaki-toggle');
  if (!checkbox) {
    return;
  }
  const enabled = localStorage.getItem('tategaki-mode') === 'true';
  document.documentElement.classList.toggle('tategaki-mode', enabled);
  checkbox.checked = enabled;
  checkbox.addEventListener('change', () => {
    document.documentElement.classList.toggle('tategaki-mode', checkbox.checked);
    localStorage.setItem('tategaki-mode', String(checkbox.checked));
  });
})();`;

export function TategakiToggle() {
  return (
    <>
      <label class="tategaki-toggle">
        <input type="checkbox" id="tategaki-toggle" />
        縦書き
      </label>
      <script>{raw(TATEGAKI_SCRIPT)}</script>
    </>
  );
}
