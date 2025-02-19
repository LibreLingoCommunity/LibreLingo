<script lang="ts">
  import MarkDownPage from "../../components/MarkDownPage.svelte"
  import { page } from '$app/state';

  export let readmeHTML: string = page.data.readmeHTML
</script>
<MarkDownPage {readmeHTML} title="Terms of Service" />
