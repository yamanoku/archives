import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import puppeteer from 'puppeteer';
import { loadDefaultJapaneseParser } from 'budoux';

const postsDirectory = join(process.cwd(), 'src/content/archives');

function getPostTitle(filename) {
  const fileContents = fs.readFileSync(
    join(postsDirectory, `${filename}`),
    'utf8',
  );
  const { data } = matter(fileContents);
  return data.title;
}

async function main() {
  const postFiles = fs.readdirSync(postsDirectory);
  const parser = loadDefaultJapaneseParser();

  for (const mdFilename of postFiles) {
    const title = getPostTitle(mdFilename);
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
      // テンプレートファイルを開く
      await page.goto('file:///' + join(process.cwd(), 'ogp/template.html'));
      // BudouXを適用したタイトルを取得する
      const parsedTitle = parser.translateHTMLString(title, 500);
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
    } catch (e) {} // めんどくさいので失敗パターンはスルーさせる

    await browser.close();
  }
}

main();
