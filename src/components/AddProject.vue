<script setup lang="ts">

import { ref, Ref } from 'vue';

const name: Ref<string | null> = ref(null);
const emit = defineEmits(['save']);

const doSave = () => {
    emit('save', name.value);
    name.value = '';
};

</script>

<template>
    <div class="add-project">
        <div>
            <input v-model="name" placeholder="Add Project" />
            <button @click="doSave">➕</button>
        </div>
    </div>
</template>

<style scoped>
.add-project {
    padding: 0.5rem;
}

.add-project>div {
    display: flex;
}

input,
button {
    height: 2rem;
    padding: 0 0.5rem;
    line-height: 2rem;
    display: inline-block;
}

button {
    padding: 0;
    margin-left: 0.5rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
}
</style>