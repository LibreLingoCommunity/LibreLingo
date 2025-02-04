import { get_skill_data } from 'course-client';

export async function load(page) {
	const { skillName, courseName } = page.params;
	
	const gistId = page.url.searchParams.get('gistId');
	if (courseName === 'preview') {
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
		...(await get_skill_data({ skillName, courseName, gistId})),
		loading: false,
		preview: null
	};
}
