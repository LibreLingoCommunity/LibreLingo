import { browser } from '$app/environment';
import { register, init } from 'svelte-i18n';
const defaultLocale = 'en';

register('en', () => import('./translation/en.json'));
register('es', () => import('./translation/es.json'));
register('fr', () => import('./translation/fr.json'));
register('de', () => import('./translation/de.json'));
register('it', () => import('./translation/it.json'));
register('eo', () => import('./translation/eo.json'));
register('pl', () => import('./translation/pl.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
