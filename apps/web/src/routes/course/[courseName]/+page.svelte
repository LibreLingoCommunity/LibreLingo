<script lang="ts">
	import { locale } from 'svelte-i18n';
	import SkillCard from 'components/SkillCard/SkillCard.svelte';
	import NavBar from 'components/NavBar.svelte';

	import Column from 'components/Column.svelte';
	import Columns from 'components/Columns.svelte';
	import Content from 'components/Content.svelte';
	import Footer from 'components/DeprecatedFooter.svelte';
	import type { ModulesType } from 'types/ModulesType';
	import { page } from '$app/state';

	export const courseName = page.data.course.courseName;
	export let modules: ModulesType = page.data.course.modules;
	export let languageName = page.data.course.languageName;
	export const repositoryURL = page.data.course.repositoryURL;
	export let uiLanguage = 'es';
	const gistId = page.url.searchParams.get('gistId');
	locale.set(uiLanguage);
</script>

<svelte:head>
	<title>LibreLingo - learn {languageName} for free</title>
</svelte:head>

<NavBar hasAuth {repositoryURL} />

{#each modules as { title, skills }}
	<section class="section">
		<div class="container">
			<h2 class="is-size-2">{title}</h2>
			<Columns multiline>
				{#each skills as skill}
					<Column sizeDesktop="1/3" sizeTablet="1/2">
						<SkillCard
							{...{ ...skill }}
							practiceHref={`/course/${courseName}/skill/${skill.practiceHref}`}
							gistId={gistId}
						/>
					</Column>
				{/each}
			</Columns>
		</div>
	</section>
{/each}

<Footer>
	<Content>
		<Columns>
			<Column>
				<strong>LibreLingo</strong>
				by
				<a href="https://github.com/kantord">Dániel Kántor</a>
				and
				<a href="https://github.com/LibreLingo/LibreLingo#contributors"> various contributors </a>
				.
			</Column>
			<Column>
				The source code is licensed
				<a href="https://opensource.org/licenses/AGPL-3.0">AGPL-3.0.</a>
				<br />
				<a href="https://github.com/LibreLingo/LibreLingo"> Source code available on GitHub. </a>
			</Column>
			<Column />
		</Columns>
		<p></p>
	</Content>
</Footer>

<style type="text/scss">
	.container {
		padding-right: 20px;
		padding-left: 20px;
	}
</style>
