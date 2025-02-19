<script lang="ts">  
  import MarkDownPage from "../../components/MarkDownPage.svelte"
  export let readmeHTML
</script>

<MarkDownPage
  {readmeHTML}
  title="About LibreLingo"
  description={$_("about.meta.description")}
/>
