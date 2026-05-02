import { visit, SKIP } from 'unist-util-visit';
import { tokenize } from '@love-rox/tcy-core';

/**
 * rehype plugin: テキストノードを走査し、縦中横対象箇所を
 * <span class="tcy"> でラップする
 * @param {import('@love-rox/tcy-core').TcyOptions} [options]
 */
export function rehypeTcy(options) {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;

      const segments = tokenize(node.value, options);

      // tcy セグメントがなければ何もしない
      if (!segments.some((s) => s.type === 'tcy')) return;

      const newNodes = segments.map((segment) => {
        if (segment.type === 'tcy') {
          return {
            type: 'element',
            tagName: 'span',
            properties: { className: ['tcy'] },
            children: [{ type: 'text', value: segment.value }],
          };
        }
        return { type: 'text', value: segment.value };
      });

      parent.children.splice(index, 1, ...newNodes);

      return [SKIP, index + newNodes.length];
    });
  };
}
