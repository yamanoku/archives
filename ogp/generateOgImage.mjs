import { join } from 'path';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';
import { loadDefaultJapaneseParser } from 'budoux';
import { getUnstagedFiles } from './lib/getUnstagedFiles.mjs';
import { getPostTitle } from './lib/getPostTitle.mjs';

// gitにまだ登録されていない新規ファイルを取得する
const output = execSync('git status --porcelain', { encoding: 'utf-8' });
const lines = output.split('\n');
const unstagedFiles = getUnstagedFiles(lines);

const parser = loadDefaultJapaneseParser();

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // テンプレートファイルを開く
  await page.goto('file:///' + join(process.cwd(), 'ogp/template.html'));
  for (const mdFilename of unstagedFiles) {
    const title = getPostTitle(mdFilename);
    try {
      // BudouXを適用したタイトルを取得する
      const parsedTitle = parser.translateHTMLString(title);
      // h1要素のinnerHTMLを置き換える
      await page.$eval(
        'h1',
        (el, parsedTitle) => {
          el.innerHTML = parsedTitle;
        },
        parsedTitle,
      );
      // スクリーンショットを撮る
      await page.screenshot({
        path: `public/og-images/${mdFilename.replace('.md', '')}.png`,
        clip: { x: 0, y: 0, width: 1200, height: 630 },
      });
      console.log(`Create: ${mdFilename.replace('.md', '')}.png`);
    } catch (error) {
      throw new Error(error);
    }
  }
  await browser.close();
})();
