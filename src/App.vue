<script setup lang="ts">

import Project from './components/Project.vue';

import { ProjectStatus } from './classes/project-status';

import { Ref, ref, onMounted, onBeforeUnmount } from 'vue';
import { registerAll } from '@tauri-apps/api/globalShortcut';

const projects: Ref<Array<ProjectStatus>> = ref([
  new ProjectStatus('Internal')
]);

const shortcuts = projects.value.map((_, i) => `Ctrl+Alt+${i + 1}`);
registerAll(shortcuts, (shortcut) => {
  const num = /\+(\d+)$/.exec(shortcut);
  if (!num) {
    return;
  }

  const index = Number(num[1]) - 1;
  const project = projects.value[index];
  project.toggle();
});

let time = ref(0);
let frame: number = 0;
const tick = (): void => {
  time.value = Math.floor(performance.now() / 50);
  frame = requestAnimationFrame(tick);
};

onMounted(tick);
onBeforeUnmount(() => cancelAnimationFrame(frame));

</script>

<template>
  <div class="projects">

    <Project v-for="project in projects" :key="project.name" :project="project" :time="time"
      @toggle="project.toggle()" />

  </div>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
</style>
