<!-- Some elemnets used here is a product of ChatGPT -->

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    message: string;
    type: "success" | "error";
}>();

// Using computed to handle dynamic class
const typeClass = computed(() => {
    switch (props.type) {
        case "success":
            return "text-green-600";
        case "error":
            return "text-green-600";
        default:
            return "";
    }
});

// Emit state
const emit = defineEmits<{
    (event: 'update:startGame', value: boolean): void;
    (event: 'update:showMessage', value: boolean): void;
}>();


// Start new game
const startGame = () => {
    emit('update:showMessage', false)
    emit('update:startGame', true)
}
</script>

<template>
    <div class="fixed top-0 flex justify-center items-center h-full w-full p-8 rounded-lg z-50 bg-[#000000b6]">
        <div class="flex flex-col bg-white p-8 rounded-lg">
            <p :class="['text-center', 'text-2xl', 'font-semibold', 'py-4', typeClass]">{{ message }}</p>
            <div class="flex justify-center">
                <button v-if="type === 'success'" @click="startGame"
                    class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a] hover:text-black transition duration-200">
                    Close</button>
                <button v-if="type === 'error'" @click="startGame" class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a]
                    hover:text-black transition duration-200">
                    Start New Game</button>
            </div>
        </div>
    </div>
</template>
