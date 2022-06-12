<template>
  <footer>
    <p>&copy; Copyright {{ currentYear }}, Okuto Oyama</p>
    <p>
      Source :
      <a
        href="https://github.com/yamanoku/archives/"
        target="_blank"
        rel="noopener"
      >yamanoku/archives</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const currentYear = dayjs().year()
</script>

<style scoped>
footer {
  padding: var(--y-rhythm-3);
  text-align: center;
}
footer p {
  font-size: 1rem;
  line-height: var(--y-rhythm-3);
}
</style>
