import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { getPostTitle } from '../getPostTitle.mjs';

describe('getPostTitle tests', () => {
  it('ファイル名からタイトルを取得する', () => {
    const result = getPostTitle('attention-quality-check.md');
    assert.strictEqual('クオリティチェックで気をつけていること', result);
  });
  it('存在しない場合エラーを返す', () => {
    assert.throws(() => getPostTitle('not-404.md'), Error);
  });
});
