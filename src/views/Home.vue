<script setup lang="ts">
import { ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import GameComponent from '../components/GameComponent.vue';
import HistoryComponent from '../components/HistoryComponent.vue';
import MessageComponent from '../components/MessageComponent.vue';

// State for game data and messages
const isGameLoading = ref(false);
const showMessage = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");
const startGame = ref(false)
const fetchHistory = ref(false)
</script>

<template>
    <div class="bg-[#333333] min-h-screen flex flex-col justify-center items-center py-16 px-4">
        <!-- Show loader while loading game data -->
        <div v-if="isGameLoading" class="text-center" id="loader">
            <PulseLoader />
        </div>

        <!-- Show popup message-->
        <MessageComponent v-if="showMessage" :message="message" :type="messageType"
            @update:startGame="startGame = $event" @update:showMessage="showMessage = $event" />

        <div class="flex gap-10">
            <!-- Game content container with styling -->
            <GameComponent :startGame="startGame" @update:isLoading="isGameLoading = $event"
                @update:showMessage="showMessage = $event" @update:message="message = $event"
                @update:messageType="messageType = $event" @update:startGame="startGame = $event"
                @update:fetchHistory="fetchHistory = $event" />

            <!-- History component to display game history -->
            <HistoryComponent :fetchHistory="fetchHistory" />
        </div>
    </div>
</template>
