<script setup lang="ts">

import { ProjectStatus } from '../classes/project-status';

const props = defineProps<{ time: Number, project: ProjectStatus }>();
const emit = defineEmits(['toggle', 'delete']);

const confirmDelete = async (): Promise<void> => {
    const yes = await confirm('Are you sure?');

    if (yes) {
        console.log('woof');
        emit('delete');
    }
};

</script>

<template>
    <div class="project" :class="{ running: props.project.running }" @click="emit('toggle')">
        <h3>{{ props.project.name }}</h3>
        <h4>Total: <span :key="`elapsed-${props.time}`">{{ props.project.elapsed() }}</span>
        </h4>
        <button class="del" @click.stop="confirmDelete">
            ❌
        </button>
    </div>
</template>

<style scoped>
.project {
    padding: 0.5rem;
    will-change: background-color;
    transition: background-color 300ms ease-out;
    position: relative;
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

h3,
h4 {
    margin: 0;
    pointer-events: none;
}

.del {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    opacity: 0;
    padding: 0;
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;

    will-change: opacity;
    transition: opacity 300ms ease-out;
}

.project:hover .del {
    opacity: 1;
}
</style>
