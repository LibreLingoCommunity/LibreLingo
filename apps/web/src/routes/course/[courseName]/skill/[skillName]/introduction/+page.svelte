<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { get_skill_introduction } from 'course-client';

	import Button from 'components/DeprecatedButton.svelte';
	import MarkDownPage from 'components/MarkDownPage.svelte';
	import isBrowser from 'utils/isBrowser';
	import { page } from '$app/state';

	export let preview = page.data.preview;
	export let loading = page.data.loading;
	export let readmeHTML: string = page.data.readmeHTML;
	export let title: string = page.data.title;
	export let practiceHref: string = page.data.practiceHref;
	export let courseName: string = page.data.courseName;

	// Fetching preview data
	if (preview !== null) {
		let gistParams = preview.gistId;
		if (isBrowser()) {
			const urlSearchParams = new URLSearchParams(window.location.search);
			gistParams = Object.fromEntries(urlSearchParams.entries());
		}

		const { skillName, gistId } = gistParams;

		get_skill_introduction({ courseName: 'preview', skillName, gistId }).then((skillData) => {
			title = skillData.title;
			readmeHTML = skillData.readmeHTML;
			practiceHref = skillData.practiceHref;
			loading = false;
		});
	}
</script>

{#if !loading}
	<MarkDownPage {readmeHTML} {title} description={$_('about.meta.description')}>
		<div>
			<Button style="secondary" href={`course/${courseName}`}>Go back to the course</Button>
			<Button style="primary" href={`course/${courseName}/skill/${practiceHref}`}
				>Practice {title}</Button
			>
		</div>
	</MarkDownPage>
{/if}

<style>
	div {
		margin-bottom: var(--spacing-large);
	}
</style>
