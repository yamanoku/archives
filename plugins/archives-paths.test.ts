import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  isArchivePageRequest,
  pageUrlFromSlug,
  resolveArchivePageRequest,
} from './archives-paths.ts';

const slugs = new Set(['index', '404', 'ios-double-tap-bug']);

describe('archive dev page routing', () => {
  it('skips Vite and asset requests', () => {
    assert.equal(isArchivePageRequest('/@vite/client'), false);
    assert.equal(isArchivePageRequest('/src/search-client.ts'), false);
    assert.equal(isArchivePageRequest('/styles.css'), false);
    assert.equal(isArchivePageRequest('/search-index.json'), false);
    assert.equal(isArchivePageRequest('/search.js'), false);
  });

  it('maps pretty URLs to archive markdown files', () => {
    assert.deepEqual(resolveArchivePageRequest('/', slugs), {
      kind: 'page',
      slug: 'index',
      fileName: 'index.md',
    });
    assert.deepEqual(resolveArchivePageRequest('/ios-double-tap-bug/', slugs), {
      kind: 'page',
      slug: 'ios-double-tap-bug',
      fileName: 'ios-double-tap-bug.md',
    });
    assert.deepEqual(
      resolveArchivePageRequest('/ios-double-tap-bug.html', slugs),
      {
        kind: 'page',
        slug: 'ios-double-tap-bug',
        fileName: 'ios-double-tap-bug.md',
      },
    );
    assert.deepEqual(resolveArchivePageRequest('/404/', slugs), {
      kind: 'page',
      slug: '404',
      fileName: '404.md',
    });
  });

  it('treats unknown pages as the 404 document', () => {
    assert.deepEqual(resolveArchivePageRequest('/does-not-exist', slugs), {
      kind: 'notFound',
    });
  });

  it('builds theme URLs from slugs', () => {
    assert.equal(pageUrlFromSlug('index'), '/');
    assert.equal(pageUrlFromSlug('ios-double-tap-bug'), '/ios-double-tap-bug');
  });
});
