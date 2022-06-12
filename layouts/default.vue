<template>
  <div>
    <global-header />
    <slot />
    <global-footer />
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/content/Header.vue'
import GlobalFooter from '@/components/content/Footer.vue'
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
