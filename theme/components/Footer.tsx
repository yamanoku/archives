/** @jsxImportSource @ox-content/vite-plugin */
export function Footer() {
  const year = new Date().getFullYear().toString();
  return (
    <footer>
      <p>&copy; Copyright {year}, Okuto Oyama</p>
      <p>
        Source :{' '}
        <a
          href="https://github.com/yamanoku/archives/"
          target="_blank"
          rel="noopener"
        >
          yamanoku/archives
        </a>
      </p>
    </footer>
  );
}
