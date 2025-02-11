import { describe, it } from 'node:test';
import { loadDefaultJapaneseParser } from 'budoux';

describe('BudouX snapshots tests', async () => {
  const parser = loadDefaultJapaneseParser();
  it(`日本語テキストのみ`, (t) => {
    const result = parser.parse(
      'コミットメッセージとコミットの粒度について思ったこと',
    );
    t.assert.snapshot(result);
  });
  it('半角英数字含めるテキスト', (t) => {
    const result = parser.parse(
      'JavaScript無効にしたときのユーザビリティとかについて',
    );
    t.assert.snapshot(result);
  });
  it('半角スペース・半角英数字含めるテキスト', (t) => {
    const result = parser.parse(
      'GAAD Japan 2022 でスポンサー協賛と LT をしてきました',
    );
    t.assert.snapshot(result);
  });
});
