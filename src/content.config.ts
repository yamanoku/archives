import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const archives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/archives' }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string().optional(),
    source: z.string(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = { archives };
