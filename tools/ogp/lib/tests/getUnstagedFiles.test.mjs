import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { getUnstagedFiles } from '../getUnstagedFiles.mjs';

describe('getUnstagedFiles tests', () => {
  it('unstageのファイルが含まれている場合', () => {
    const linesMock = [
      '?? src/archives/2023-10-01.md',
      'D src/archives/2024-10-02.md',
      'M src/archives/2025-01-03.md',
    ];
    const result = getUnstagedFiles(linesMock);
    assert.deepStrictEqual(['2023-10-01.md'], result);
  });
  it('unstageのファイルが含まれていない場合', () => {
    const linesMock = [
      'D src/archives/2024-10-02.md',
      'M src/archives/2025-01-03.md',
    ];
    const result = getUnstagedFiles(linesMock);
    assert.deepStrictEqual([], result);
  });
});
