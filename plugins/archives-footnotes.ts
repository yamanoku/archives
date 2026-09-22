export const FOOTNOTE_LABEL = '脚注';
export const FOOTNOTE_BACK_LABEL = 'コンテンツに戻る';
export const FOOTNOTE_CLOBBER_PREFIX = 'user-content-';

type FootnoteNode = {
  type: string;
  identifier?: string;
  label?: string;
  value?: string;
  children?: FootnoteNode[];
  [key: string]: unknown;
};

function html(value: string): FootnoteNode {
  return { type: 'html', value };
}

function escapeAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function footnoteId(identifier: string): string {
  return `${FOOTNOTE_CLOBBER_PREFIX}fn-${identifier}`;
}

function footnoteRefId(identifier: string, occurrence: number): string {
  const base = `${FOOTNOTE_CLOBBER_PREFIX}fnref-${identifier}`;
  return occurrence === 1 ? base : `${base}-${occurrence}`;
}

function collectDefinitions(
  node: FootnoteNode,
  defs: Map<string, FootnoteNode>,
): void {
  if (
    node.type === 'footnoteDefinition' &&
    typeof node.identifier === 'string'
  ) {
    if (!defs.has(node.identifier)) {
      defs.set(node.identifier, node);
    }
  }
  for (const child of node.children ?? []) {
    collectDefinitions(child, defs);
  }
}

function renderReference(
  node: FootnoteNode,
  defs: Map<string, FootnoteNode>,
  refs: Map<string, string[]>,
): FootnoteNode {
  const identifier = String(node.identifier ?? '');
  const label = String(node.label ?? identifier);
  if (!defs.has(identifier)) {
    return { type: 'text', value: `[^${label}]` };
  }
  if (!refs.has(identifier)) {
    refs.set(identifier, []);
  }
  const occurrences = refs.get(identifier);
  if (!occurrences) {
    return { type: 'text', value: `[^${label}]` };
  }
  const occurrence = occurrences.length + 1;
  const refId = footnoteRefId(identifier, occurrence);
  occurrences.push(refId);
  const display = [...refs.keys()].indexOf(identifier) + 1;
  return html(
    `<sup><a href="#${escapeAttr(footnoteId(identifier))}" id="${escapeAttr(refId)}" data-footnote-ref="" aria-describedby="footnote-label">${display}</a></sup>`,
  );
}

function rewriteTree(
  node: FootnoteNode,
  defs: Map<string, FootnoteNode>,
  refs: Map<string, string[]>,
): void {
  if (!node.children) {
    return;
  }
  const next: FootnoteNode[] = [];
  for (const child of node.children) {
    if (child.type === 'footnoteReference') {
      next.push(renderReference(child, defs, refs));
      continue;
    }
    if (child.type === 'footnoteDefinition') {
      continue;
    }
    rewriteTree(child, defs, refs);
    next.push(child);
  }
  node.children = next;
}

function cloneChildren(node: FootnoteNode): FootnoteNode[] {
  return structuredClone(node.children ?? []);
}

function appendBackrefs(children: FootnoteNode[], refIds: string[]): void {
  const backrefs = refIds
    .map((refId, index) => {
      const content = index === 0 ? '↩' : `↩<sup>${index + 1}</sup>`;
      return `<a href="#${escapeAttr(refId)}" data-footnote-backref="" aria-label="${escapeAttr(FOOTNOTE_BACK_LABEL)}" class="data-footnote-backref">${content}</a>`;
    })
    .join(' ');
  const last = children.at(-1);
  if (last?.type === 'paragraph') {
    last.children = [
      ...(last.children ?? []),
      { type: 'text', value: ' ' },
      html(backrefs),
    ];
    return;
  }
  children.push({
    type: 'paragraph',
    children: [html(backrefs)],
  });
}

function buildFootnoteSection(
  defs: Map<string, FootnoteNode>,
  refs: Map<string, string[]>,
): FootnoteNode[] {
  const nodes: FootnoteNode[] = [
    html(
      `<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">${FOOTNOTE_LABEL}</h2>\n<ol>\n`,
    ),
  ];
  for (const [identifier, refIds] of refs) {
    const definition = defs.get(identifier);
    if (!definition) {
      continue;
    }
    nodes.push(html(`<li id="${escapeAttr(footnoteId(identifier))}">\n`));
    const children = cloneChildren(definition);
    appendBackrefs(children, refIds);
    nodes.push(...children);
    nodes.push(html('</li>\n'));
  }
  nodes.push(html('</ol>\n</section>'));
  return nodes;
}

export function applyArchivesFootnotes<T extends FootnoteNode>(ast: T): T {
  const defs = new Map<string, FootnoteNode>();
  collectDefinitions(ast, defs);
  const refs = new Map<string, string[]>();
  rewriteTree(ast, defs, refs);
  if (refs.size > 0) {
    ast.children = [
      ...(ast.children ?? []),
      ...buildFootnoteSection(defs, refs),
    ];
  }
  return ast;
}

export function archivesFootnotes() {
  return {
    name: 'archives-footnotes',
    transform(ast: FootnoteNode) {
      return applyArchivesFootnotes(ast);
    },
  };
}
