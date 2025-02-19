import fs from "node:fs"; import { readdir } from 'fs/promises';
import path from 'path';
import { readFile } from 'fs/promises';
import courses from "./../../config/courses.json"

export async function load() {
    const testFolder = './src/courses';

    const getDirectories = async (source: string) => {
        const files = await readdir(source, { withFileTypes: true });
        return files.filter(dirent => dirent.isDirectory()).filter(dir => !dir.name.includes('test')).map(dirent => dirent.name);
    };

    const folderList = await getDirectories(testFolder);

    let verifiedFolderList: Array<{ path: string; language: string }> = [];

    for (let folder of folderList) {
        let folderPath = path.join(testFolder, folder);

        try {
            const courseDataPath = path.join(folderPath, 'courseData.json');
            const challengesPath = path.join(folderPath, 'challenges');

            const courseDataFileExists = await fileExists(courseDataPath);
            const challengesFolderExists = await fileExists(challengesPath);

            if (!courseDataFileExists || !challengesFolderExists) continue;

            const files = await readdir(challengesPath);
            const hasJsonFile = files.some(file => path.extname(file).toLowerCase() === '.json');

            if (!hasJsonFile) continue;

            // Leggi il file JSON per ottenere la lingua del corso
            const jsonData = await readFile(courseDataPath, 'utf-8');
            const courseLanguage = JSON.parse(jsonData);

            // Aggiungi il corso alla lista
            verifiedFolderList.push({
                path: folder,
                language: courseLanguage.languageName.toLowerCase(),
            });

        } catch (err) {
            console.error(`Error during folder reading: ${err}`);
            continue;
        }
    }


    let coursesGists: Array<{ path: string; language: string, gistId: string }> = [];

    coursesGists = courses
        .filter(course => course.inProduction == true && course.gistId != null && course.gistId !== undefined)
        .map(course => ({ path: course.paths.jsonFolder, language: course.target.toLowerCase(), gistId: course.gistId }))

    return { coursesFs: verifiedFolderList, coursesGists: coursesGists };
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.promises.access(filePath);
        return true;
    } catch {
        return false;
    }
}
