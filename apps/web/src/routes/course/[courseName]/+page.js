export async function load(page) {
	const { get_course } = await import('../../../course-client');
	const { courseName } = page.params;

	const course = await get_course({ courseName });

	return { course };
}
