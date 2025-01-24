<script lang="ts">
	import ClampedText from 'components/ClampedText.svelte';

	export let summary: Array<string>;
	export let stale: boolean;
	export let completed: boolean;
</script>

<div class:completed class:stale>
	<ClampedText text={`Learn: ${summary.join(', ')}`} />
</div>

<style type="text/scss">

	.completed,
	.stale {
		color: $white;
	}
</style>
