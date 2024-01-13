<script lang="ts">
  import { onMount } from 'svelte';

  const storageKey = 'color-theme';

  let preference: 'light' | 'dark' | undefined;

  $: preference && localStorage.setItem(storageKey, JSON.stringify(preference));

  $: if (preference) {
    document.documentElement.classList.add(`theme-${preference}`);
    document.documentElement.classList.remove(`theme-${preference === 'light' ? 'dark' : 'light'}`);
  }

  const toggle = () => {
    preference = preference === 'light' ? 'dark' : 'light';
  };

  onMount(() => {
    const getStorageKey = localStorage.getItem(storageKey) as string;

    preference = JSON.parse(getStorageKey);

    if (!preference) {
      preference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        preference = isDark ? 'dark' : 'light';
      });

  });
</script>

<button type="button" on:click={toggle}>
  Switch to {preference === 'light' ? 'dark' : 'light'}
</button>
