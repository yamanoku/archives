import { tokenize } from '@love-rox/tcy-core';

/**
 * 文字列を縦中横用のHTMLに変換する
 * 数字箇所を <span class="tcy"> でラップして返す
 */
export function applyTcy(text: string): string {
  const segments = tokenize(text, { target: 'digit' });

  if (!segments.some((s) => s.type === 'tcy')) return text;

  return segments
    .map((segment) =>
      segment.type === 'tcy'
        ? `<span class="tcy">${segment.value}</span>`
        : segment.value
    )
    .join('');
}
