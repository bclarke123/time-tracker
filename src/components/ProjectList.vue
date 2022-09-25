<script setup lang="ts">

import Project from './Project.vue';

import { ProjectStatus } from '../classes/project-status';

const props = defineProps<{ projects: ProjectStatus[], time: number }>();
const emit = defineEmits(['delete']);

</script>

<template>
    <div class="project-list">
        <Project v-for="project in props.projects" :key="project.name" :project="project" :time="props.time"
            @toggle="project.toggle()" @delete="emit('delete', project)" />
    </div>
</template>