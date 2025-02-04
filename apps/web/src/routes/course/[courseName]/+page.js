export async function load(page) {
	const { get_course } = await import('../../../course-client');
	const { courseName } = page.params;

	const course = await get_course({ courseName, gistId: '2c30ff4184a81074516280ef2bee5460' });

	return { course };
}
