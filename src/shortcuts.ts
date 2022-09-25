import { registerAll, unregisterAll } from '@tauri-apps/api/globalShortcut';

import { ProjectStatus } from './classes/project-status';

export const registerShortcuts = async (projects: ProjectStatus[]): Promise<void> => {

    unregisterAll();

    const shortcuts = projects.map((_, i) => `Ctrl+Alt+${i + 1}`);
    registerAll(shortcuts, (shortcut) => {
        const num = /\+(\d+)$/.exec(shortcut);
        if (!num) {
            return;
        }

        const index = Number(num[1]) - 1;
        const project = projects[index];
        project.toggle();
    });

};