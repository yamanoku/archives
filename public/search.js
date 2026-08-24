(() => {
  const dialog = document.getElementById('dialog');
  const openModalButton = document.getElementById('openModalButton');
  const closeModalButton = document.getElementById('closeModalButton');
  const form = document.getElementById('archive-search-form');
  const input = document.getElementById('archive-search-input');
  const results = document.getElementById('archive-search-results');
  if (!dialog || !openModalButton || !closeModalButton || !form || !input || !results) {
    return;
  }

  const openModal = () => dialog.showModal();
  const closeModal = () => dialog.close();
  openModalButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeModal();
  });

  let documentsPromise;
  const loadDocuments = () => {
    if (!documentsPromise) {
      documentsPromise = fetch('/search-index.json')
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data.documents)) return data.documents;
          return [];
        })
        .catch(() => []);
    }
    return documentsPromise;
  };

  const snippet = (text, query) => {
    const haystack = String(text || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!haystack) return '';
    const needle = query.toLowerCase();
    const index = haystack.toLowerCase().indexOf(needle);
    if (index === -1) return haystack.slice(0, 120);
    const start = Math.max(0, index - 40);
    const end = Math.min(haystack.length, index + query.length + 80);
    return (
      (start > 0 ? '…' : '') +
      haystack.slice(start, end) +
      (end < haystack.length ? '…' : '')
    );
  };

  const searchDocuments = (documents, query) => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];
    return documents
      .map((doc) => {
        const title = String(doc.title || '');
        const body = String(doc.body || '');
        const url = String(doc.url || '');
        const haystack = `${title} ${body}`.toLowerCase();
        let score = 0;
        for (const token of tokens) {
          if (!haystack.includes(token)) return null;
          if (title.toLowerCase().includes(token)) score += 10;
          score += 1;
        }
        return {
          title,
          url,
          score,
          snippet: snippet(body || title, tokens[0]),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    results.replaceChildren();
    if (!query) return;
    const documents = await loadDocuments();
    const hits = searchDocuments(documents, query);
    if (hits.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = '該当する記事はありません。';
      results.append(empty);
      return;
    }
    const list = document.createElement('ul');
    for (const hit of hits) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = hit.url || '#';
      link.textContent = hit.title || hit.url;
      item.append(link);
      if (hit.snippet) {
        const excerpt = document.createElement('p');
        excerpt.textContent = hit.snippet;
        item.append(excerpt);
      }
      list.append(item);
    }
    results.append(list);
  });
})();
