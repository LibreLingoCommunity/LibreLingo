import { get_skill_introduction } from 'course-client';

export async function load(page) {
	const { courseName, skillName } = page.params;

	if (courseName === 'preview') {
		const gistId = page.url.searchParams.get('gistId');
		const skillNameFromQuery = page.url.searchParams.get('skillName');

		return {
			loading: true,
			preview: {
				type: skillName,
				gistId,
				skillName: skillNameFromQuery
			}
		};
	}

	return {
		...(await get_skill_introduction({ courseName, skillName })),
		loading: false,
		preview: null
	};
}
