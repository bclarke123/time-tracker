import { register, unregisterAll } from '@tauri-apps/api/globalShortcut';

import { ProjectStatus } from './classes/project-status';

export const registerShortcuts = async (projects: ProjectStatus[]): Promise<void> => {

    unregisterAll();

    for (let i = 0; i < projects.length; i++) {
        register(`Ctrl+Alt+${i + 1}`, () => projects[i].toggle());
    }

};