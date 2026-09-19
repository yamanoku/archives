import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const archives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/archives' }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string().optional(),
    source: z.string(),
    category: z
      .enum(['tech', 'event', 'retrospective', 'essay', 'other'])
      .optional(),
    topic: z
      .enum(['accessibility', 'frontend', 'work', 'life', 'other'])
      .optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = { archives };
