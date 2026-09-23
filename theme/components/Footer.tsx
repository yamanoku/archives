/** @jsxImportSource @ox-content/vite-plugin */
import { currentCalendarYear } from '../../src/lib/temporal.ts';

export function Footer() {
  const year = currentCalendarYear();
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
