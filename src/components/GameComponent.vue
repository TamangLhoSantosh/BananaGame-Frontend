<script setup lang="ts">
import { onMounted, ref, defineEmits, watch } from 'vue';
import { apiCreateHistory, apiGame } from '../api';

// Emit states
const emit = defineEmits<{
    (event: 'update:isLoading', value: boolean): void;
    (event: 'update:showMessage', value: boolean): void;
    (event: 'update:message', value: string): void;
    (event: 'update:messageType', value: "success" | "error"): void;
    (event: 'update:startGame', value: boolean): void;
    (event: 'update:fetchHistory', value: boolean): void;
}>();

// Props
const props = defineProps<{
    startGame: boolean;
}>();

const startNewGame = ref(props.startGame);
const quiz = ref({ question: "", solution: "" });
const userAnswer = ref("");
const feedback = ref("");
const lives = ref(3);

// Watch for changes to startGame prop and fetch new game data when true
watch(() => props.startGame, (newVal) => {
    if (newVal) {
        getGame();
    }
});

// Get game data
const getGame = async () => {
    try {
        userAnswer.value = "";
        feedback.value = "";
        if (lives.value === 0) lives.value = 3;

        emit('update:isLoading', true);  // Emit loading state change

        const response = await apiGame();
        quiz.value.question = response.data.question;
        quiz.value.solution = response.data.solution;
    } catch (error) {
        console.error("Error fetching game data:", error);
    } finally {
        emit('update:isLoading', false);  // Emit loading state change
        emit('update:startGame', false) // Emit startGame state change
    }
};

// Fetch game data when component is mounted
onMounted(() => {
    if (startNewGame.value) {
        getGame();
    }
});


// Start new game
if (startNewGame) {
    getGame();
}

// Function to check if the user input matches the correct solution
const checksolution = async () => {
    if (userAnswer.value == quiz.value.solution) {
        feedback.value = "";
        emit('update:message', "Yay! You got it right!"); // Emit message state
        emit('update:messageType', "success"); // Emit message type state
        emit('update:showMessage', true); // Emit show message state

        // Post to API when the answer is correct
        await postResultToAPI(true);
    } else {
        feedback.value = "Please try again";

        // Decrease the lives when the answer is incorrect
        lives.value--;

        if (lives.value <= 0) {
            feedback.value = ""
            emit('update:message', "Game Over! You've run out of lives!"); // Emit message state
            emit('update:messageType', "error"); // Emit message type state
            emit('update:showMessage', true); // Emit show message state

            // Post to API when lives are zero
            await postResultToAPI(false);
        }
    }
}

// Post result to API
const postResultToAPI = async (status: boolean) => {
    await apiCreateHistory(status);
    emit('update:fetchHistory', true);
}
</script>


<template>
    <div class="bg-white max-w-lg w-full flex flex-col items-center gap-6 p-8 rounded-lg shadow-lg">
        <!-- Title of the game -->
        <p class="text-5xl font-bold text-[#FFD700]"> Banana Game </p>

        <!-- Display remaining lives -->
        <p class="text-xl font-semibold text-gray-700">Lives: {{ lives }}</p>

        <!-- Check if quiz.question is a valid image URL and display it -->
        <img v-if="quiz.question" :src="quiz.question" alt="question"
            class="max-w-full rounded-lg border border-gray-300">

        <input v-model="userAnswer" type="text"
            class="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200">

        <!-- To display error only -->
        <p v-if="feedback" class="text-red-600">{{ feedback }}</p>

        <div class="flex justify-around w-full">
            <button @click="checksolution"
                class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a] hover:text-black transition duration-200">
                Check
            </button>
            <button @click="getGame"
                class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a] hover:text-black transition duration-200">
                Skip
            </button>
        </div>
    </div>
</template>
