/// <reference types="vite/client" />

declare module 'virtual:ox-content/search' {
  export type SearchResult = {
    id: string;
    title: string;
    url: string;
    score: number;
    matches: string[];
    snippet: string;
    scopes?: string[];
  };

  export type SearchCallOptions = {
    limit?: number;
    prefix?: boolean;
    fuzzy?: boolean;
    locale?: string;
    localeCodes?: string[];
    defaultLocale?: string;
    versionPrefixes?: string[];
  };

  export function search(
    query: string,
    options?: SearchCallOptions,
  ): Promise<SearchResult[]>;

  export const searchOptions: {
    enabled: boolean;
    limit: number;
    prefix: boolean;
    placeholder: string;
    hotkey: string;
    provider?: string;
  };
}

