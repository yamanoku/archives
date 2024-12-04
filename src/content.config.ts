import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const archives = defineCollection({
  // For content layer you no longer define a `type`
  loader: glob({ pattern: '**/*.md', base: './src/archives' }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = { archives };
