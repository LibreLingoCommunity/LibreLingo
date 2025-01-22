<script lang="ts">
	import ChallengeScreen from 'components/challenges/ChallengeScreen.svelte';
	import NavBar from 'components/NavBar.svelte';
	import { sortChallengeGroups } from './_logic';
	import isBrowser from 'utils/isBrowser';
	import { page } from '$app/state';

	export let preview = page.data.preview;
	export let loading = page.data.loading;
	export let rawChallenges;
	export let languageName: string;
	export let languageCode: string;
	export let specialCharacters: Array<string>;
	export let repositoryURL: string;
	export let skillName: string;
	export let courseURL: string;
	export let skillId: string;
	export let challengesPerLevel: number;

	let expectedNumberOfChallenges = Math.max(4, Math.round(challengesPerLevel * 1.2));

	// Fetching preview data
	if (preview !== null) {
		let gistParams = preview.gistId;
		if (isBrowser()) {
			const urlSearchParams = new URLSearchParams(window.location.search);
			gistParams = Object.fromEntries(urlSearchParams.entries());
		}

		const { skillName, gistId } = gistParams;

		get_skill_data({
			gistId,
			skillName,
			courseName: 'preview'
		}).then((skillData) => {
			rawChallenges = skillData.rawChallenges;
			languageName = skillData.languageName;
			languageCode = skillData.languageCode;
			specialCharacters = skillData.specialCharacters;
			repositoryURL = skillData.repositoryURL;
			skillId = skillData.skillId;
			challengesPerLevel = skillData.challengesPerLevel;
			courseURL = skillData.courseURL;
			expectedNumberOfChallenges = Math.max(4, Math.round(challengesPerLevel * 1.2));
			loading = false;
		});
	}
</script>

<svelte:head>
	<title>LibreLingo - learn {skillName} in {languageName} for free</title>
</svelte:head>

<NavBar {repositoryURL} />

{#if !loading}
	<ChallengeScreen
		{expectedNumberOfChallenges}
		{skillId}
		{rawChallenges}
		{languageName}
		{languageCode}
		{specialCharacters}
		{sortChallengeGroups}
		{courseURL}
	/>
{/if}
