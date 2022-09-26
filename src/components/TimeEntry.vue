<script setup lang="ts">

import { ref, Ref } from 'vue';

const emit = defineEmits(['add']);

const increments: Ref<HTMLInputElement | null> = ref(null);

const addIncrements = () => {
    const num: number = Number(increments.value?.value);
    emit('add', num)
};

</script>

<template>
    <div class="time-entry" @click.stop.prevent="() => {}">
        <input type="number" min="0" step="1" ref="increments" placeholder="Hours to add" />
        <button @click.stop="addIncrements">Add</button>
    </div>
</template>

<style scoped>
.time-entry {
    display: flex;
}
</style>