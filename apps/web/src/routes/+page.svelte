<script lang="ts">
  import { _, locale } from "svelte-i18n"

  export let uiLanguage = 'it'
  locale.set(uiLanguage)

</script>
<svelte:head>
  <title>{$_("meta.title")}</title>
  <meta name="description" content={$_("index.meta.description")} />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<div>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
</div>

<style lang="text/scss">

</style>
