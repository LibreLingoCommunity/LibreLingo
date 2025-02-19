import { page } from '$app/state';

export async function load(page) {
	const { get_course } = await import('../../../course-client');
	const { courseName } = page.params;
	const gistId = page.url.searchParams.get('gistId')

	const course = await get_course({ courseName, gistId });

	return { course };
}
