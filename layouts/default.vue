<template>
  <div>
    <global-header />
    <nuxt />
    <global-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GlobalHeader from '@/components/global/Header.vue'
import GlobalFooter from '@/components/global/Footer.vue'

export default Vue.extend({
  components: {
    GlobalHeader,
    GlobalFooter,
  },
})
</script>

<style>
html[lang='ja'] {
  font-kerning: none;
}
html:not([lang='ja']) body {
  hyphens: auto;
}
html[lang='ja'] body {
  line-break: loose;
}
html[lang='ja'] main,
html[lang='ja'] header,
html[lang='ja'] nav,
html[lang='ja'] footer {
  max-width: 45rem;
}
code.hljs {
  padding: calc(var(--rhythm) * 3);
}
img {
  height: auto;
}
</style>
