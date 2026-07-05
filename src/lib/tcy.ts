import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeTcy, { type RehypeTcyOptions } from '@love-rox/tcy-rehype';

export type { RehypeTcyOptions };

export async function transformHtml(html: string, options: RehypeTcyOptions = {}): Promise<string> {
  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeTcy, options)
    .use(rehypeStringify)
    .process(html);
  return String(file);
}
