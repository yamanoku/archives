const EXCLUDED_FILES = new Set(['index.md', '404.md']);

/**
 * OG画像が未生成のマークダウンファイル名を抽出します。
 *
 * @param {string[]} mdFilenames - src/archives 配下の .md ファイル名
 * @param {string[]} ogImageFilenames - public/og-images 配下の .png ファイル名
 * @returns {string[]} - OG画像が存在しない記事の Markdown ファイル名の配列
 */
export const getMissingOgImages = (mdFilenames, ogImageFilenames) => {
  const existing = new Set(ogImageFilenames);
  return mdFilenames.filter(
    (name) =>
      name.endsWith('.md') &&
      !EXCLUDED_FILES.has(name) &&
      !existing.has(name.replace(/\.md$/, '.png')),
  );
};
