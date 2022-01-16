<template>
  <main id="main">
    <h1>アーカイブ一覧</h1>
    <p>
      このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。
    </p>
    <p>
      移行時にリンク切れなど修正しましたが、内容自体は特にアップデートしておりませんので参照する際はその点ご注意ください。
    </p>
    <div>
      <article v-for="article in articles" :key="article.slug">
        <p>
          <time :datetime="dateTime(article.date)">
            {{ dateTime(article.date) }}
          </time>
        </p>
        <h2>
          <nuxt-link :to="article.path">
            {{ article.title }}
          </nuxt-link>
        </h2>
        <p>
          {{ article.description }}
        </p>
      </article>
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs'

export default {
  async asyncData({ $content }) {
    const query = $content('/', { deep: true }).sortBy('date', 'desc')
    const articles = await query.fetch()
    return {
      articles,
    }
  },
  head() {
    return {
      title: `${this.page.title}`,
      meta: [
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
          hid: 'twitter:image',
          property: 'twitter:image',
          content: 'https://yamanoku.net/ogp/ogp-archive@2x.png',
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
