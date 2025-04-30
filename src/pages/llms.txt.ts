// ref: https://notes.minagishl.com/articles/how-to-create-llms-txt/
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('archives')).sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
  const items = posts.map((post) => ({
    ...post.data,
    link: new URL(`/${post.id}/`, context.site).toString(),
  }));
  const content = `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n## アーカイブ一覧\n\n${items
    .map(
      (item) =>
        `- [${item.title}](${item.link})${item.description ? ': ' + item.description : ''}`,
    )
    .join('\n')}`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
