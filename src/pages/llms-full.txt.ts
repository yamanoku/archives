// ref: https://www.vincirufus.com/posts/generating-llmstxt-for-astro/
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('archives')).sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
  const content = `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n---\n\n
  ${posts
    .map(
      (post) =>
        `## ${post.data.title}\n\n${new URL(`/${post.id}/`, context.site).toString()}\n
<ArchiveContent>
${post.body}
</ArchiveContent>\n\n---\n`,
    )
    .join('\n')}`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

