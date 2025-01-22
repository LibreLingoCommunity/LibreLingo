<script lang="ts">
	import { onMount } from 'svelte';

	/* import live from '../../db/live'; */
	/* 	import getSkillStats from '../../db/skill/getSkillStats';
	 */
	import Icon from 'components/Icon.svelte';
	import Card from 'components/Card.svelte';
	import Buttons from './Buttons.svelte';
	import ContentLeft from './ContentLeft.svelte';
	import ContentCenter from './ContentCenter.svelte';

	export let title: string;
	export let levels: number;
	export let practiceHref: string;
	export let introduction: string;
	//export let id: string; // Re-enable when db and onmount
	export let imageSet: string[] = [];
	export let summary: string;

	let completed: boolean = false;
	let started: boolean = false;
	let stale: boolean = false;
	let progress: boolean = false;
	let introductionPageHref = introduction ? `${practiceHref}/introduction` : null;
	let backgroundColor = 'white';
	let foregroundColor = 'black';

	$: {
		backgroundColor = (() => {
			if (stale) return 'var(--deprecated-panel-background-failure)';
			if (completed) return 'var(--deprecated-panel-background-success)';
			return 'white';
		})();
	}

	$: {
		foregroundColor = (() => {
			if (completed) return 'white';
			if (stale) return 'white';
			return 'black';
		})();
	}

	onMount(() => {
		/* live((db) =>
			getSkillStats(db, { id })
				.then((stats) => {
					completed = stats.progress >= levels;
					progress = stats.progress;
					started = stats.started;
					stale = stats.stale && completed;
				})
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				.catch(() => {})
		); */
	});
</script>

<Card
	{backgroundColor}
	{foregroundColor}
	data-test="skill card"
	data-started={started}
	data-completed={completed}
	data-stale={stale}
>
	<div slot="icon">
		{#if completed}
			{#if stale}
				<Icon icon="dumbbell" size="large" />
			{:else}
				<Icon icon="check-square" size="large" />
			{/if}
		{/if}
	</div>
	<div slot="content">
		<div class="media">
			<ContentLeft {imageSet} {stale} {completed} />
			<ContentCenter {progress} {stale} {levels} {title} {completed} {started} {summary} />
		</div>
	</div>
	<footer slot="footer">
		<div class="card-footer-item">
			<Buttons practiceHref={introductionPageHref || practiceHref} {started} {completed} />
		</div>
	</footer>
</Card>
