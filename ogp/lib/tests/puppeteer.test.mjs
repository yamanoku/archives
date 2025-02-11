import { test } from 'node:test';
import * as assert from 'node:assert';
import { join } from 'path';
import puppeteer from 'puppeteer';

test('puppeteerで使用している挙動の確認', async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file:///' + join(process.cwd(), 'ogp/template.html'));
  const beforeText = await page.$eval('h1', (el) => el.innerHTML);
  assert.strictEqual(beforeText, 'タイトル');
  const dummyText = 'ダミーテキスト';
  // h1要素のinnerHTMLを置き換える
  await page.$eval(
    'h1',
    (el, dummyText) => {
      el.innerHTML = dummyText;
    },
    dummyText,
  );
  const afterText = await page.$eval('h1', (el) => el.innerHTML);
  assert.strictEqual(afterText, 'ダミーテキスト');
  // スクリーンショットをメモリ上に保存して挙動出来ているかを確認
  const screenshot = await page.screenshot();
  assert.ok(screenshot.length > 0);
  await browser.close();
});
