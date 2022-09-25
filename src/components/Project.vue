<script setup lang="ts">

import { ProjectStatus } from '../classes/project-status';

const props = defineProps<{ time: Number, project: ProjectStatus }>();
const emit = defineEmits(['toggle']);

</script>

<template>
    <div class="project" :class="{ running: props.project.running }" @click="emit('toggle')">
        <h3>{{ props.project.name }}</h3>
        <h4>Total: <span :key="`elapsed-${props.time}`">{{ props.project.elapsed() }}</span>
        </h4>
    </div>
</template>

<style scoped>
.project {
    padding: 0.5rem;
    will-change: background-color;
    transition: background-color 300ms ease-out;
}

.project:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.project.running {
    background-color: rgba(0, 255, 0, 0.3);
}

.project.running:hover {
    background-color: rgba(0, 255, 0, 0.5);
}

h3 {
    margin: 0;
}

h4 {
    margin: 0;
}
</style>
