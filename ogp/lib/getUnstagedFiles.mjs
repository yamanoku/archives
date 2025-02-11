/**
 * Gitに登録されていないマークダウンファイルのリストを抽出します。
 *
 * @param {string[]} lines - 処理される行。git statusの出力から取得される
 * @returns {string[]} - src/archives ディレクトリにある登録されていないMarkdownファイル名の配列
 */
export const getUnstagedFiles = (lines) => {
  const unstagedFiles = lines
    // 登録されていない src/archives のMarkdownファイルを表す行をフィルタリング
    .filter(
      (line) => line.startsWith('?? src/archives') && line.endsWith('.md'),
    )
    .map((line) => {
      const filePath = line.slice(3); // '?? 'プレフィックスを削除して相対ファイルパスを取得
      const fileName = filePath.split('/').pop();
      return fileName;
    });
  return unstagedFiles;
};
