<script lang="ts">
	import ImageSet from './ImageSet.svelte';

	export let imageSet;
	export let stale;
	export let completed;
</script>

{#if imageSet && imageSet.length}
	<div class="media-left" class:stale class:completed>
		<div class="image-set">
			<ImageSet {imageSet} {stale} {completed} />
		</div>
	</div>
{/if}

<style type="text/scss">
	@import './../../assets/variables.scss';

	.stale,
	.completed {
		mix-blend-mode: screen;

		.image-set {
			filter: saturate(0);
		}
	}
</style>
