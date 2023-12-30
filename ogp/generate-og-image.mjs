import fs from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import matter from 'gray-matter';
import puppeteer from 'puppeteer';
import { loadDefaultJapaneseParser } from 'budoux';

function getUnstagedFiles() {
  const output = execSync('git status --porcelain', { encoding: 'utf-8' }); // Run git status command
  const lines = output.split('\n'); // Split output into lines
  const unstagedFiles = lines
    // Filter out lines that represent unstaged markdown files
    .filter((line) => line.startsWith('??') && line.endsWith('.md'))
    .map((line) => {
      const filePath = line.slice(3); // Remove the '?? ' prefix
      const fileName = filePath.split('/').pop(); // Extract the file name
      return fileName;
    });
  return unstagedFiles;
}

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
  const unstagedFiles = getUnstagedFiles();
  const parser = loadDefaultJapaneseParser();

  for (const mdFilename of unstagedFiles) {
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
      console.log(`Create: ${mdFilename.replace('.md', '')}.png`);
    } catch (e) {} // めんどくさいので失敗パターンはスルーさせる

    await browser.close();
  }
}

main();
