<template>
  <main id="main" role="main">
    <article>
      <h1>{{ page.title }}</h1>
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
      <nuxt-content :document="page" />
    </article>
    <p>
      アーカイブ記事のため、内容に関する更新依頼は受け付けておりませんが、誤字や脱字などありましたらご連絡ください。
    </p>
    <details>
      <summary>この記事に関する修正依頼</summary>
      <ul role="list">
        <li role="listitem">
          <a :href="gitHubLink" target="_blank" rel="noopener">
            GitHub Issue を作成する
          </a>
        </li>
        <li role="listitem">
          <a :href="twitterLink" target="_blank" rel="noopener">
            著者にツイートする
          </a>
        </li>
      </ul>
    </details>
    <nuxt-link to="/"> アーカイブ一覧へ戻る </nuxt-link>
  </main>
</template>

<script>
import dayjs from 'dayjs'
import DeprecationAlertOneYear from '@/components/global/DeprecationAlertOneYear.vue'

export default {
  name: 'ArchiveDocumentSlug',
  components: {
    DeprecationAlertOneYear,
  },
  async asyncData({ $content, params, error }) {
    let page
    try {
      page = await $content(`${params.slug}`).fetch()
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
    return {
      page,
    }
  },
  data() {
    return {
      gitHubLink: `https://github.com/yamanoku/yamanoku.github.io/issues/new?title=アーカイブのドキュメントにまつわる修正依頼&labels=document,feedback&body=URL：https://yamanoku.net/archive/${this.$route.path}%0A修正内容`,
      twitterLink: `https://twitter.com/share?url=https://yamanoku.net/archive/${this.$route.path}&text=@yamanoku`,
      editLink: `https://github.com/yamanoku/yamanoku.github.io/edit/nuxt/content${this.$route.path}.md`,
    }
  },
  head() {
    return {
      title: `${this.page.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.page.description}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.page.title}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.page.description}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://yamanoku.net/ogp/ogp-archive@2x.png',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.page.title}`,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.page.title}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.page.description}`,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content:
            'https://yamanoku.net/ogp/ogp-twitter_summary-archives@2x.png',
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: `${this.page.title}`,
        },
      ],
    }
  },
  methods: {
    dateTime(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },
  },
}
</script>

<style scoped>
.article-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: calc(var(--rhythm) / 2 * -1);
  padding: 0;
}
.article-header > * {
  margin: calc(var(--rhythm) / 2);
}
</style>
