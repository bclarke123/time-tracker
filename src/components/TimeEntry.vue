<script setup lang="ts">

const emit = defineEmits(['add']);

</script>

<template>
    <div class="time-entry">
        <button @click.stop="emit('add', 150)">Add</button>
    </div>
</template>

<style scoped>
.time-entry {
    display: flex;
}
</style>