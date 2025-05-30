import fetch from 'isomorphic-fetch';
import parseMarkdown from '../utils/parseMarkdown';
import { baseURL } from './../../config/gists.json';
import { PUBLIC_GITHUB_PAT } from '$env/static/public';

export type SkillDataType = {
	id: string;
	practiceHref: string;
	title: string;
	levels: number;
	introduction: string;
	summary: string[];
};

export type ModuleDataType = {
	title: string;
	skills: SkillDataType[];
};

export type CourseDataType = {
	courseName: string;
	modules: ModuleDataType[];
	languageName: string;
	repositoryURL: string;
	languageCode: string;
	specialCharacters: string[];
};

const formatCourseData = (rawCourseData, { courseName }) => {
	const { modules, languageName, repositoryURL, languageCode, specialCharacters, uiLanguage } =
		rawCourseData;

	return {
		courseName,
		modules,
		languageName,
		repositoryURL,
		languageCode,
		specialCharacters,
		uiLanguage
	};
};

type RawGistFileType = {
	content: string;
	truncated: boolean;
	raw_url: string;
};

const fetchGistFiles = async (gistId: string) => {
	// get the data from a Github gist served through a CORS proxy
	const headers = {
		'Accept': 'application/vnd.github+json',
		'Authorization': 'token ' + PUBLIC_GITHUB_PAT,
		'X-GitHub-Api-Version': '2022-11-28'
	};

	try {
		const rawResponse = await fetch(`${baseURL}/${gistId}`, { method: 'GET', headers: headers });
		const response = await rawResponse.json();
		let toFetchSeparatelyText = []
		let toFetchSeparatelyJson = []
		const gistFiles = {}  // Create a map of the files
		Object
			.entries(response.files)
			.forEach(async ([filename, value]: [string, RawGistFileType]) => {
				const filenameProcessed = filename.replace('librelingo___', '').replace('___', '/');
				if (value.truncated) { // We should do a call to the file directly because it is too huge so truncated.	
					if (filename.endsWith('.json')) {
						toFetchSeparatelyJson.push([filenameProcessed, fetch(value.raw_url).then(response => response.json())]);
					} else {
						toFetchSeparatelyText.push([filenameProcessed, fetch(value.raw_url).then(response => response.text())]);
					}
				} else {
					gistFiles[filenameProcessed] = filename.endsWith('.json') ? JSON.parse(value?.content) : value?.content;
				}
			})
			
			await Promise.all(
				toFetchSeparatelyText.map((value) => value[1]),
			).then((values) => {
				values.forEach((value, index) => {
					gistFiles[toFetchSeparatelyText[index][0]] = value;
				})
			})
			await Promise.all(
				toFetchSeparatelyJson.map((value) => value[1])
			).then((values) => {
				values.forEach((value, index) => {
					gistFiles[toFetchSeparatelyJson[index][0]] = value;
				})
			})

			return gistFiles;
	} catch (error) {
		throw new Error(`Could not load gist with Id "${gistId}". ${error}`);
	}
};

export const get_course = async ({
	courseName,
	gistId = null
}: {
	courseName: string;
	gistId?: string | null;
}): Promise<CourseDataType> => {
	if (gistId !== null) {
		let files = await fetchGistFiles(gistId);
		return formatCourseData(files[`courseData.json`], { courseName });
	}

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const rawCourseData = await import(/* @vite-ignore */ `../courses/${courseName}/courseData.json`); // eslint-disable-line @typescript-eslint/no-var-requires
	return formatCourseData(rawCourseData, { courseName });
};

const formatSkilldata = async (skillData, { courseName, skillName, gistId }) => {
	const { languageName, languageCode, specialCharacters, repositoryURL } = await get_course({
		courseName,
		gistId
	});
	const rawChallenges = skillData.challenges;
	const challengesPerLevel = skillData.challenges.length / skillData.levels;

	const skillId = skillData.id;

	return {
		rawChallenges: Array.from(rawChallenges),
		languageName,
		languageCode,
		specialCharacters,
		repositoryURL,
		skillName,
		skillId,
		challengesPerLevel,
		courseURL: `/course/${courseName}`
	};
};

export const get_skill_data = async ({
	courseName,
	skillName,
	gistId = null
}: {
	courseName: string;
	skillName: string;
	gistId?: string | null;
}) => {
	if (gistId !== null) {
		const files = await fetchGistFiles(gistId);
		return await formatSkilldata(files[`challenges/${skillName}.json`], {
			courseName,
			skillName,
			gistId
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const skillData = await import(
		/* @vite-ignore */ `../courses/${courseName}/challenges/${skillName}.json`
	);

	return await formatSkilldata(skillData, { courseName, skillName, gistId });
};

const formatSkillIntroduction = async (skill, { skillName, courseName, markdown }) => {
	return {
		skillName,
		courseName,
		title: skill.title,
		practiceHref: skill.practiceHref,
		readmeHTML: parseMarkdown(markdown)
	};
};

export const get_skill_introduction = async ({
	courseName,
	skillName,
	gistId
}: {
	courseName: string;
	skillName: string;
	gistId?: string;
}) => {
	const { modules } = await get_course({ courseName, gistId });

	for (const module of modules) {
		for (const skill of module.skills) {
			if (skill.practiceHref === skillName) {
				if (gistId) {
					const files = await fetchGistFiles(gistId);

					return formatSkillIntroduction(skill, {
						skillName,
						courseName,
						markdown: files[`introduction/${skill.introduction}`]
					});
				}

				const { markdown } = await import(
					/* @vite-ignore */ `../courses/${courseName}/introduction/${skill.introduction}`
				);

				return formatSkillIntroduction(skill, {
					skillName,
					courseName,
					markdown
				});
			}
		}
	}

	throw new Error(`Could not find skill with name "${skillName}" in course "${courseName}".`);
};
