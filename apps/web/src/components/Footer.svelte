<script lang="typescript">
	import Stack from './Stack.svelte';
	import Translate from './Translate.svelte';
	import Hidden from './Hidden.svelte';
	import LicenseLogo from './LicenseLogo.svelte';
</script>

<div class="main-footer">
	<Stack align="center" direction="column" spacing="s">
		<slot />
		<div class="buttonset">
			<a href="about">
				<Translate key="index.about_librelingo">About LibreLingo</Translate>
			</a>
			<a href="https://librelingo.app/docs/">
				<Translate key="index.development_docs_english_only">Development docs (English)</Translate>
			</a>
			<Hidden>
				<br />
				<a href="/devtools"> Development tools </a>
				<a href="/dev"> Development tools </a>
			</Hidden>
		</div>
		<div>
			<strong>LibreLingo</strong>
			was created by
			<a href="https://github.com/kantord">Dániel Kántor</a>
			and
			<a href="https://github.com/LibreLingo/LibreLingo#contributors">various contributors</a>. The
			<a href="https://github.com/LibreLingo/LibreLingo">source code</a>
			is licensed
			<a href="https://opensource.org/licenses/AGPL-3.0">AGPL-3.0.</a>
		</div>
		<LicenseLogo />
	</Stack>
</div>

<style>
	.main-footer {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
</style>
