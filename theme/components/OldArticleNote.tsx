/** @jsxImportSource @ox-content/vite-plugin */
import { calendarYearsSince } from '../../src/lib/temporal.ts';

type Props = {
  date: unknown;
};

export function OldArticleNote({ date }: Props) {
  const years = calendarYearsSince(date);
  if (years < 1) {
    return null;
  }
  return (
    <div class="notes">
      <svg
        class="notes-icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 10v5" />
        <path d="M12 18v.01" />
      </svg>
      <strong>
        この記事は公開から<span class="tcy">{String(years)}</span>
        年以上が経過しています。内容が一部古い箇所があります。
      </strong>
    </div>
  );
}
