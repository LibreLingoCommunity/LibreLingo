<script lang="ts">
	import Progress from './Progress.svelte';
	import { tweened } from 'svelte/motion';

	export let value;

	const progress = tweened(0);
	$: progress.set(value);
</script>

<div>
	<Progress value={$progress} />
</div>

<style type="text/scss">
	@import '../assets/variables.scss';
	div {
		padding-bottom: $size-6;
	}
</style>
