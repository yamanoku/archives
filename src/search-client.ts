import { search, searchOptions } from 'virtual:ox-content/search';
import { isSearchableUrl, prettySearchUrl } from './lib/search-urls.ts';

const RESULT_LIMIT = 20;

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function resultHref(url: unknown): string {
  const pretty = prettySearchUrl(url);
  return typeof pretty === 'string' && pretty ? pretty : '#';
}

function renderResults(
  container: HTMLElement,
  hits: Array<{ title: string; url: string; snippet: string }>,
): void {
  container.replaceChildren();
  if (hits.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = '該当する記事はありません。';
    container.append(empty);
    return;
  }

  const list = document.createElement('ul');
  for (const hit of hits) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = resultHref(hit.url);
    link.textContent = hit.title || hit.url;
    item.append(link);
    if (hit.snippet) {
      const excerpt = document.createElement('p');
      excerpt.textContent = hit.snippet;
      item.append(excerpt);
    }
    list.append(item);
  }
  container.append(list);
}

async function runSearch(query: string, results: HTMLElement): Promise<void> {
  const trimmed = query.trim();
  if (!trimmed) {
    results.replaceChildren();
    return;
  }

  const found = await search(trimmed, { limit: RESULT_LIMIT + 5 });
  const hits = found
    .filter((hit) => isSearchableUrl(hit.url))
    .slice(0, RESULT_LIMIT);
  renderResults(results, hits);
}

const dialog = document.getElementById('dialog');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const form = document.getElementById('archive-search-form');
const input = document.getElementById('archive-search-input');
const results = document.getElementById('archive-search-results');

if (
  dialog instanceof HTMLDialogElement &&
  openModalButton instanceof HTMLButtonElement &&
  closeModalButton instanceof HTMLButtonElement &&
  form instanceof HTMLFormElement &&
  input instanceof HTMLInputElement &&
  results instanceof HTMLElement
) {
  if (searchOptions.placeholder) {
    input.placeholder = searchOptions.placeholder;
  }

  const openModal = () => {
    dialog.showModal();
    input.focus();
  };
  const closeModal = () => dialog.close();

  openModalButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeModal();
  });

  let searchTimeout: number | undefined;
  const scheduleSearch = () => {
    window.clearTimeout(searchTimeout);
    searchTimeout = window.setTimeout(() => {
      void runSearch(input.value, results);
    }, 150);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.clearTimeout(searchTimeout);
    void runSearch(input.value, results);
  });
  input.addEventListener('input', scheduleSearch);

  const hotkey = searchOptions.hotkey;
  document.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (dialog.open) {
      return;
    }
    const slashHotkey = Boolean(hotkey) && event.key === hotkey;
    const commandK =
      (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (!slashHotkey && !commandK) {
      return;
    }
    if (slashHotkey && isTypingTarget(event.target)) {
      return;
    }
    event.preventDefault();
    openModal();
  });
}
