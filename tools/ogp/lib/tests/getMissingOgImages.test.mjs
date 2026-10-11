import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { getMissingOgImages } from '../getMissingOgImages.mjs';

describe('getMissingOgImages tests', () => {
  it('OG画像が存在しない記事を返す', () => {
    const mdFilenames = [
      '2023-10-01.md',
      '2024-10-02.md',
      'index.md',
      '404.md',
    ];
    const ogImageFilenames = ['2023-10-01.png'];
    const result = getMissingOgImages(mdFilenames, ogImageFilenames);
    assert.deepStrictEqual(['2024-10-02.md'], result);
  });

  it('すべて存在する、または除外対象のみの場合は空配列を返す', () => {
    const mdFilenames = ['2023-10-01.md', 'index.md', '404.md'];
    const ogImageFilenames = ['2023-10-01.png'];
    const result = getMissingOgImages(mdFilenames, ogImageFilenames);
    assert.deepStrictEqual([], result);
  });
});
