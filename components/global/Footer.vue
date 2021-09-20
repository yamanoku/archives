<template>
  <footer>
    <p>&copy; Copyright {{ currentYear }}, Okuto Oyama</p>
  </footer>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      currentYear: dayjs().year(),
    }
  },
}
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
