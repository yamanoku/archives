import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createMarkdownProcessor } from '@ox-content/vite-plugin';
import {
  FOOTNOTE_BACK_LABEL,
  FOOTNOTE_LABEL,
  applyArchivesFootnotes,
  archivesFootnotes,
} from './archives-footnotes.ts';

function nodeValue(node: unknown): string {
  if (node && typeof node === 'object' && 'value' in node) {
    return String((node as { value?: unknown }).value ?? '');
  }
  return '';
}

function collectHtml(node: unknown): string {
  const parts: string[] = [];
  const walk = (current: unknown) => {
    if (!current || typeof current !== 'object') {
      return;
    }
    const record = current as {
      type?: string;
      value?: string;
      children?: unknown[];
    };
    if (record.type === 'html' && typeof record.value === 'string') {
      parts.push(record.value);
    }
    for (const child of record.children ?? []) {
      walk(child);
    }
  };
  walk(node);
  return parts.join('');
}

describe('archives footnotes transformer', () => {
  it('rewrites references and builds a remark-rehype footnotes section', () => {
    const ast = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'note' },
            { type: 'footnoteReference', identifier: '1', label: '1' },
            { type: 'text', value: ' again' },
            { type: 'footnoteReference', identifier: '1', label: '1' },
            { type: 'text', value: ' named' },
            { type: 'footnoteReference', identifier: 'note', label: 'note' },
            { type: 'text', value: ' missing' },
            {
              type: 'footnoteReference',
              identifier: 'missing',
              label: 'missing',
            },
          ],
        },
        {
          type: 'footnoteDefinition',
          identifier: '1',
          label: '1',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'First ' },
                { type: 'link', url: './ios-double-tap-bug' },
              ],
            },
          ],
        },
        {
          type: 'footnoteDefinition',
          identifier: 'note',
          label: 'note',
          children: [
            { type: 'paragraph', children: [{ type: 'text', value: 'Named' }] },
          ],
        },
        {
          type: 'footnoteDefinition',
          identifier: 'unused',
          label: 'unused',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Unused' }],
            },
          ],
        },
      ],
    };

    applyArchivesFootnotes(ast);

    assert.equal(
      ast.children.some((node) => node.type === 'footnoteDefinition'),
      false,
    );
    assert.equal(
      ast.children.some((node) => node.type === 'footnoteReference'),
      false,
    );

    const refs = ast.children[0]?.children ?? [];
    assert.equal(
      nodeValue(refs[1]),
      '<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup>',
    );
    assert.equal(
      nodeValue(refs[3]),
      '<sup><a href="#user-content-fn-1" id="user-content-fnref-1-2" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup>',
    );
    assert.equal(
      nodeValue(refs[5]),
      '<sup><a href="#user-content-fn-note" id="user-content-fnref-note" data-footnote-ref="" aria-describedby="footnote-label">2</a></sup>',
    );
    assert.equal(nodeValue(refs[7]), '[^missing]');

    const html = collectHtml(ast);
    assert.match(
      html,
      new RegExp(
        `<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">${FOOTNOTE_LABEL}</h2>`,
      ),
    );
    assert.match(html, /<li id="user-content-fn-1">/);
    assert.match(html, /<li id="user-content-fn-note">/);
    assert.doesNotMatch(html, /user-content-fn-unused/);
    assert.match(html, new RegExp(`aria-label="${FOOTNOTE_BACK_LABEL}"`));
    assert.match(html, /↩<sup>2<\/sup>/);
  });

  it('exposes an ox-content transformer hook', () => {
    const transformer = archivesFootnotes();
    assert.equal(transformer.name, 'archives-footnotes');
    const ast = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'footnoteReference', identifier: '1', label: '1' },
          ],
        },
        {
          type: 'footnoteDefinition',
          identifier: '1',
          children: [
            { type: 'paragraph', children: [{ type: 'text', value: 'note' }] },
          ],
        },
      ],
    };
    transformer.transform(ast);
    assert.match(nodeValue(ast.children.at(-1)), /<\/section>/);
  });
});

describe('archives footnotes html', () => {
  it('renders remark-rehype markup with Japanese labels', async () => {
    const processor = createMarkdownProcessor({
      footnotes: true,
      gfm: true,
      highlight: false,
      docs: false,
      search: false,
      ogImage: false,
      transformers: [archivesFootnotes()],
    });
    const { html } = await processor.render(
      `Hello footnote[^1] and again[^1] and second[^note].

Unused[^missing]

[^1]: First note with a [link](https://example.com).

[^note]: Named footnote.

[^unused]: unused definition.
`,
      'footnotes.md',
    );

    assert.match(
      html,
      /<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1<\/a><\/sup>/,
    );
    assert.match(
      html,
      /<sup><a href="#user-content-fn-1" id="user-content-fnref-1-2" data-footnote-ref="" aria-describedby="footnote-label">1<\/a><\/sup>/,
    );
    assert.match(
      html,
      /<sup><a href="#user-content-fn-note" id="user-content-fnref-note" data-footnote-ref="" aria-describedby="footnote-label">2<\/a><\/sup>/,
    );
    assert.match(html, /Unused\[\^missing\]/);
    assert.match(
      html,
      /<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">脚注<\/h2>/,
    );
    assert.match(html, /<ol>/);
    assert.match(html, /<li id="user-content-fn-1">/);
    assert.match(
      html,
      /First note with a <a href="https:\/\/example.com" target="_blank" rel="noopener noreferrer">link<\/a>\. <a href="#user-content-fnref-1" data-footnote-backref="" aria-label="コンテンツに戻る" class="data-footnote-backref">↩<\/a> <a href="#user-content-fnref-1-2" data-footnote-backref="" aria-label="コンテンツに戻る" class="data-footnote-backref">↩<sup>2<\/sup><\/a>/,
    );
    assert.match(html, /<li id="user-content-fn-note">/);
    assert.doesNotMatch(html, /class="footnote"/);
    assert.doesNotMatch(html, /id="fn-unused"/);
    assert.doesNotMatch(html, /aria-label="Footnotes"/);
    assert.doesNotMatch(html, /aria-label="Back to reference/);
  });
});
