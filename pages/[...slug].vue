<template>
  <main id="main">
    <article>
      <h1>
        <budoux-ja>
          {{ page.title }}
        </budoux-ja>
      </h1>
      <div class="article-header">
        <div lang="en">
          created at:
          <time :datetime="dateTime(page.date)">{{ dateTime(page.date) }}</time>
        </div>
        <div lang="en">
          <a :href="editLink" target="_blank" rel="noopener">
            GitHub Edit Page
          </a>
        </div>
      </div>
      <deprecation-alert-one-year />
      <content-renderer v-if="page" :value="page" />
    </article>
    <p>
      アーカイブ記事のため、内容に関する更新依頼は受け付けておりませんが、誤字や脱字などありましたらご連絡ください。
    </p>
    <details>
      <summary>この記事に関する修正依頼</summary>
      <ul>
        <li>
          <a :href="gitHubLink" target="_blank" rel="noopener">
            GitHub Issue を作成する
          </a>
        </li>
        <li>
          <a :href="twitterLink" target="_blank" rel="noopener">
            著者にツイートする
          </a>
        </li>
      </ul>
    </details>
    <nuxt-link to="/">
      アーカイブ一覧へ戻る
    </nuxt-link>
  </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import DeprecationAlertOneYear from '@/components/content/DeprecationAlertOneYear.vue'

const dateTime = (time: string): string => {
  return dayjs(time).format('YYYY-MM-DD')
}

const { path } = useRoute()
const { data: page } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})

const gitHubLink = computed(() => {
  return `https://github.com/yamanoku/archives/issues/new?title=アーカイブのドキュメントにまつわる修正依頼&labels=feedback&body=URL：https://archives.yamanoku.net${path}%0A修正依頼内容：%0A`
})
const twitterLink = computed(() => {
  return `https://twitter.com/share?url=https://archives.yamanoku.net${path}&text=@yamanoku`
})
const editLink = computed(() => {
  return `https://github.com/yamanoku/archives/edit/main/content${path}.md`
})

useHead({
  title: page.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: page.description
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: page.title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: page.description
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `https://archives.yamanoku.net/og-images${path}.png`
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: page.title
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: page.title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: page.description
    },
    {
      hid: 'twitter:image',
      property: 'twitter:image',
      content: `https://archives.yamanoku.net/og-images${path}.png`
    },
    {
      hid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: page.title
    }
  ]
})
</script>

<style scoped>
.article-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: calc(var(--y-rhythm-2) * -1);
  padding: 0;
}
.article-header > * {
  margin: var(--y-rhythm-2);
}
</style>
