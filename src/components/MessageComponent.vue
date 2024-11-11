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
            return "bg-green-100 text-green-800 border border-green-400";
        case "error":
            return "bg-red-100 text-red-800 border border-red-400";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-400";
    }
});
</script>

<template>
    <div v-if="message" :class="`p-4 rounded-lg ${typeClass}`">
        <p class="text-center text-lg font-semibold">{{ message }}</p>
    </div>
</template>
