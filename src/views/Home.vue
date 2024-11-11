<script setup lang="ts">
import { ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import GameComponent from '../components/GameComponent.vue';
import HistoryComponent from '../components/HistoryComponent.vue';

// State to manage the loading state for fetching game data
const isGameLoading = ref(false);
</script>

<template>
    <div class="bg-[#333333] min-h-screen flex flex-col justify-center items-center py-16 px-4">
        <!-- Show loader while loading game data -->
        <div v-if="isGameLoading" class="text-center" id="loader">
            <PulseLoader />
        </div>
        <div class="flex gap-10">
            <!-- Game content container with styling -->
            <GameComponent :isLoading="isGameLoading" @update:isLoading="isGameLoading = $event" />

            <!-- History component to display game history -->
            <HistoryComponent />
        </div>
    </div>
</template>
