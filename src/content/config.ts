import { defineCollection, z } from "astro:content";

const archiveCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string(),
    noindex: z.boolean(),
  }),
});

export const collections = <const>{
  archives: archiveCollection,
};
