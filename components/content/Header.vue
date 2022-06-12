<template>
  <header>
    <nuxt-link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="246"
        height="242"
        viewBox="0 0 246 242"
        role="img"
        aria-labelledby="title"
      >
        <title id="title">yamanoku.net</title>
        <path
          class="cls-1"
          d="M64,67v54l82,82-46,46v60h56L310,155V96H230l-21,20L160,67H64ZM176,203l-45,46h25L293,113H230l-39,39-31-31H94Z"
          transform="translate(-64 -67)"
        />
      </svg>
      アーカイブ
    </nuxt-link>
  </header>
</template>

<style scoped>
header {
  max-width: 80ch;
  margin: auto;
  padding: 0 var(--y-rhythm-2);
}
a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: var(--y-rhythm-2) 0;
  text-decoration: none;
}
svg {
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
.cls-1 {
  fill: rgb(54, 70, 93);
  fill-rule: evenodd;
}
@media (prefers-color-scheme: dark) {
  .cls-1 {
    fill: var(--y-white-base);
  }
}
</style>
