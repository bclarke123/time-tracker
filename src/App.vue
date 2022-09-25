<script setup lang="ts">

import Project from './components/Project.vue';
import AddProject from './components/AddProject.vue';

import { ProjectStatus } from './classes/project-status';
import { loadProjects, saveProjects } from './storage';
import { registerShortcuts } from './shortcuts';

import { Ref, ref, onMounted, onBeforeUnmount, watch } from 'vue';

const projects: Ref<ProjectStatus[]> = ref([]);
watch(projects, () => registerShortcuts(projects.value));
loadProjects().then((allProjects) => projects.value = allProjects);

let time = ref(0);
let frame: number = 0;
const tick = (): void => {
  time.value = Math.floor(performance.now() / 50);
  frame = requestAnimationFrame(tick);
};

onMounted(tick);
onBeforeUnmount(() => cancelAnimationFrame(frame));

const doAddProject = (name: string) => {
  const proj = new ProjectStatus(name);
  const arr = projects.value.concat(proj);
  projects.value = arr;
  saveProjects(projects.value);
};

const doDeleteProject = (project: ProjectStatus) => {

  const arr = projects.value.filter((p) => p !== project);
  projects.value = arr;
  saveProjects(projects.value);

};

</script>

<template>
  <div class="projects">

    <AddProject @save="doAddProject" />

    <Project v-for="project in projects" :key="project.name" :project="project" :time="time" @toggle="project.toggle()"
      @delete="doDeleteProject(project)" />

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
