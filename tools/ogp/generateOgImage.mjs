import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import puppeteer from 'puppeteer';
import { loadDefaultJapaneseParser } from 'budoux';
import { getMissingOgImages } from './lib/getMissingOgImages.mjs';
import { getPostTitle } from './lib/getPostTitle.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const archivesDir = join(ROOT, 'src/archives');
const ogImagesDir = join(ROOT, 'public/og-images');
const templateHtml = join(__dirname, 'template.html');

const mdFilenames = fs
  .readdirSync(archivesDir)
  .filter((name) => name.endsWith('.md'));
const ogImageFilenames = fs.existsSync(ogImagesDir)
  ? fs.readdirSync(ogImagesDir).filter((name) => name.endsWith('.png'))
  : [];
const missingFiles = getMissingOgImages(mdFilenames, ogImageFilenames);

if (missingFiles.length === 0) {
  console.log('No missing OG images.');
  process.exit(0);
}

const parser = loadDefaultJapaneseParser();

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // テンプレートファイルを開く
  await page.goto(pathToFileURL(templateHtml).href);
  for (const mdFilename of missingFiles) {
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
        path: join(ogImagesDir, `${mdFilename.replace('.md', '')}.png`),
        clip: { x: 0, y: 0, width: 1200, height: 630 },
      });
      console.log(`Create: ${mdFilename.replace('.md', '')}.png`);
    } catch (error) {
      throw new Error(error);
    }
  }
  await browser.close();
})();
