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
            <budoux-ja>
              {{ article.title }}
            </budoux-ja>
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
import Vue from "vue";
import dayjs from 'dayjs'

Vue.config.ignoredElements = ["budoux-ja"];

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
      title: 'アーカイブ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'アーカイブ',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://yamanoku.net/ogp/ogp-archive@2x.png',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Archive Document',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'アーカイブ',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: 'https://yamanoku.net/ogp/ogp-archive@2x.png',
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: 'Archive Document',
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
