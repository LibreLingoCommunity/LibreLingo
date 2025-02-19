<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Button from 'components/Button.svelte';
	import Hidden from 'components/Hidden.svelte';
	import Translate from 'components/Translate.svelte';
	import Stack from 'components/Stack.svelte';
	import Hero from 'components/Hero/Hero.svelte';
	import Page from 'components/Page.svelte';
	import Footer from 'components/Footer.svelte';
	import Mascot from 'components/NewMascot.svelte';
	import Heading from 'components/Heading.svelte';

	import {page} from '$app/state';

	let coursesFs = page.data.coursesFs
	let coursesGists = page.data.coursesGists

</script>

<svelte:head>
	<title>{$_('meta.title')}</title>
	<meta name="description" content={$_('index.meta.description')} />
</svelte:head>

<main class="main-content">
	<Page>
		<Hero>
			<Stack direction="column" spacing="m" fullHeight justify="center">

				<Stack spacing="m" direction="column" directionDesktop="row">
					<Stack shrink={4}>
						<Mascot shadow={false} glow={true} />
					</Stack>
					<Stack direction="column" justify="center" shrink={2}>
						<Heading level={1}>
							<Translate key="index.subtitle">
								A community-driven language-learning platform
							</Translate>
						</Heading>
					</Stack>
				</Stack>

				<Stack spacing="m" direction="column">
					<!-- For each courses available locally.. -->
					 {#if coursesFs}
						<h3 style="text-align:center">Courses available locally</h3>
						{#each coursesFs as course }
							<Stack justify="center">
								<Button style="primary" size="large" href="course/{course.path}">
									<Translate key="index.start_{course.language}_course">Start learning {course.language}</Translate>
								</Button>
							</Stack>
						{/each}
					 {/if}
				</Stack>

				<Stack spacing="m" direction="column" >
					<!-- For each courses in gists available.. -->
					{#if coursesGists}
						<h3 style="text-align:center">Courses available from gists</h3>
						{#each coursesGists as course }
							<Stack justify="center">
								<Button style="primary" size="large" href="course/{course.path}?gistId={course.gistId}">
									<Translate key="index.start_{course.language}_course">Start learning {course.language}</Translate>
								</Button>
							</Stack>
						{/each}
					{/if}
					
				</Stack>

			</Stack>
			
		</Hero>
		<Footer />
	</Page>
</main>