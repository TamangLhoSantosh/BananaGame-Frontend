<!-- Some elemnets used here is a product of ChatGPT -->

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const token = ref(localStorage.getItem("token"));

// Using computed to handle dynamic class
const spacing = computed(() => {
    return token.value ? "justify-between" : "justify-center";
});

// Polling localStorage to detect token changes
let tokenCheckInterval: number;

const checkTokenChange = () => {
    const currentToken = localStorage.getItem("token");
    if (currentToken !== token.value) {
        token.value = currentToken;
    }
};

onMounted(() => {
    tokenCheckInterval = setInterval(checkTokenChange, 500); // Check every 500ms
});

onUnmounted(() => {
    clearInterval(tokenCheckInterval);
});

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("playerId");
    token.value = null; // Update token to null
    window.location.href = "/login"; // Redirect to login page
};
</script>

<template>
    <div :class="['bg-[#008080]', 'w-full', 'py-2', 'flex', 'items-center', spacing, 'sticky', 'top-0']">
        <span v-if="token"></span>
        <span class="text-[#FFD700] font-bold text-2xl">Banana Game</span>
        <span v-if="token" class="bg-white px-4 py-2 me-2 rounded-3xl hover:cursor-pointer"
            @click="logout">Logout</span>
    </div>
</template>
