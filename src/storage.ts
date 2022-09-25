import { BaseDirectory, writeTextFile, readTextFile, readDir, createDir } from "@tauri-apps/api/fs";
import { ProjectStatus } from "./classes/project-status";

const mkdir = async (): Promise<void> => {
    try {
        await readDir('', { dir: BaseDirectory.App });
    } catch (e) {
        console.error('Creating app dir', e);
        await createDir('', { dir: BaseDirectory.App, recursive: true });
    }
};

export const loadProjects = async (): Promise<ProjectStatus[]> => {

    await mkdir();

    let projects: string[];
    try {
        const contents = await readTextFile(
            'projects.json',
            {
                dir: BaseDirectory.App
            }
        );
        projects = JSON.parse(contents);
    } catch (e) {
        console.error("Error reading config file", e);
        projects = ['Internal'];
    }

    return projects.map((p) => new ProjectStatus(p));
}

export const saveProjects = async (projects: ProjectStatus[]): Promise<void> => {

    await mkdir();

    const names: string[] = projects.map((p) => p.name);
    const contents: string = JSON.stringify(names);

    try {
        await writeTextFile(
            {
                path: 'projects.json',
                contents
            },
            {
                dir: BaseDirectory.App,

            }
        );
    } catch (e) {
        console.error("Error writing config file", e);
    }

};