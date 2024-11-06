<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { apiGame } from '../api';

// State to store game data
const quiz = ref({ question: "", solution: "" });

// State to store user input for their answer
const userAnswer = ref("");

// State to store feedback messages for correct or incorrect answers
const feedback = ref({
    correct: "",
    incorrect: ""
});

// State to manage the loading state for fetching game data
const isLoading = ref(false);

// Function to fetch game data from the API
const getGame = async () => {
    try {
        // Reset user answer and feedback before fetching new data
        userAnswer.value = "";
        feedback.value.correct = "";
        feedback.value.incorrect = "";

        // Set loading state to true while fetching the data
        isLoading.value = true;

        const response = await apiGame();
        quiz.value.question = response.data.question;
        quiz.value.solution = response.data.solution;
    } catch (error) {
        console.error("Error fetching game data:", error);
    } finally {
        isLoading.value = false;
    }
};

// Fetch game data when the component is mounted
onMounted(() => {
    getGame();
});

// Function to check if the user input matches the correct solution
const checksolution = () => {
    if (userAnswer.value == quiz.value.solution) {
        feedback.value.incorrect = "";
        feedback.value.correct = "Yay! You got it right!";
    } else {
        feedback.value.correct = "";
        feedback.value.incorrect = "Please try again";
    }
}
</script>

<template>
    <div class="bg-[#333333] min-h-screen flex flex-col justify-center items-center py-16 px-4">
        <PulseLoader />
        <!-- Game content container with styling -->
        <div class="bg-white max-w-lg w-full flex flex-col items-center gap-6 p-8 rounded-lg shadow-lg">
            <!-- Title of the game -->
            <p class="text-5xl font-bold text-[#008080]">Banana Game</p>

            <!-- Check if quiz.question is a valid image URL and display it -->
            <img v-if="quiz.question" :src="quiz.question" alt="question"
                class="max-w-full rounded-lg border border-gray-300">

            <input v-model="userAnswer" type="text"
                class="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200">

            <!-- Show feedback messages based on correctness -->
            <p v-if="feedback.correct" class="text-green-600">{{ feedback.correct }}</p>
            <p v-if="feedback.incorrect" class="text-red-600">{{ feedback.incorrect }}</p>

            <div class="flex gap-4">
                <button @click="checksolution"
                    class="bg-[#008080] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#004c4c] transition duration-200">
                    Check
                </button>
                <button @click="getGame"
                    class="bg-[#008080] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#004c4c] transition duration-200">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>
