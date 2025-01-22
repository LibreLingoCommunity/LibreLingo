<script lang="ts">
	import ChallengeScreen from 'components/challenges/ChallengeScreen.svelte';
	import NavBar from 'components/NavBar.svelte';
	import { sortChallengeGroups } from './_logic';
	import isBrowser from 'utils/isBrowser';
	import { page } from '$app/state';

	export let preview = page.data.preview;
	export let loading = page.data.loading;

	export let rawChallenges = page.data.rawChallenges;
	export let languageName: string = page.data.languageName;
	export let languageCode: string = page.data.languageCode;
	export let specialCharacters: Array<string> = page.data.specialCharacters;
	export let repositoryURL: string = page.data.repositoryURL;
	export let skillName: string = page.data.skillName;
	export let courseURL: string = page.data.courseURL;
	export let skillId: string = page.data.skillId;
	export let challengesPerLevel: number = page.data.challengesPerLevel;

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
