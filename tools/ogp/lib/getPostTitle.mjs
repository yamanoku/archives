import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const postsDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../src/archives',
);

/**
 * マークダウンファイルのfrontmatterからタイトルを取得します。
 *
 * @param {string} filename - 読み込むファイルの名前
 * @returns {string} - frontmatterから取得したタイトル
 * @throws {Error} - frontmatterにtitleが含まれていない場合にエラーを返す
 */
export const getPostTitle = (filename) => {
  const fileContents = fs.readFileSync(join(postsDirectory, filename), 'utf8');
  const { data } = matter(fileContents);
  if (!data.title) {
    throw new Error(`${filename} には title が含まれていません`);
  }
  return data.title;
};
