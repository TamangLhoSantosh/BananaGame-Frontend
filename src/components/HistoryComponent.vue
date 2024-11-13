<!-- Some elemnets used here is a product of ChatGPT -->

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { apiGameHistory } from '../api';

// Props
const props = defineProps<{
    fetchHistory: boolean;
}>();

// Interface for History
interface History {
    id: number, game_status: boolean, playedAt: string, playerId: number
}

// State to store the game history data
const data = ref<History[]>([]);

// Emit states
const emit = defineEmits<{
    (event: 'update:fetchHistory', value: boolean): void;
}>();

// Watch for changes to fetchHistory prop and fetch game history data when true
watch(() => props.fetchHistory, (newVal) => {
    if (newVal) {
        getHistory();
    }
});

// Fetch the game history data from the API
const getHistory = async () => {
    const response = await apiGameHistory();
    if (response.status === 200) data.value = response.data;
    emit('update:fetchHistory', false);
}

// Function to format the date in a readable format
const formatDate = (timestamp: string) => {
    // Convert the timestamp to a Date object
    const date = new Date(Number(timestamp));
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    // Format the date with the weekday, year, month, and day
    return date.toLocaleDateString('en-US', options);
}

// Fetch the game history data when the component is mounted
onMounted(() => {
    getHistory();
});
</script>

<template>
    <div class="bg-white px-8 max-h-[500px] rounded-lg shadow-lg overflow-y-auto scrollbar-hidden min-w-fit">
        <p class="text-center font-bold pt-8 pb-4 text-2xl text-[#008080] sticky top-0 bg-white">History</p>
        <ul class="pb-2">
            <li v-if="data.length === 0" class="text-center text-[#FFD700]">No game history found</li>
            <li v-for="item in data" :key="item.id" class="border-b border-gray-300 py-4">
                <p class="text-[#FFD700]">Game Status: <span :class="[color]">{{ item.game_status === true ? 'Won'
                    : 'Lost' }}</span></p>
                <p class="text-[#FFD700]">Played At: <span class="text-[#008080]">{{ formatDate(item.playedAt) }}</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* Hide the scrollbar */
.scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}
</style>
