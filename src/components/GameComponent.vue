<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue';

import { apiGame } from '../api';
import MessageComponent from './MessageComponent.vue';

// Emit isLoading state
const emit = defineEmits<{
    (event: 'update:isLoading', value: boolean): void;
}>();

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

// State to store remaining lives
const lives = ref(3);

// State to control the message visibility and type
const showMessage = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success"); // Explicitly set the type

// Function to fetch game data from the API
const getGame = async () => {
    try {
        // Reset user answer, feedback, and lives before fetching new game data
        userAnswer.value = "";
        feedback.value.correct = "";
        feedback.value.incorrect = "";

        // Set loading state to true while fetching the data
        isLoading.value = true;
        emit('update:isLoading', true);  // Emit loading state change

        const response = await apiGame();
        quiz.value.question = response.data.question;
        quiz.value.solution = response.data.solution;
    } catch (error) {
        console.error("Error fetching game data:", error);
    } finally {
        isLoading.value = false;
        emit('update:isLoading', false);  // Emit loading state change
    }
}

// Fetch game data when the component is mounted
onMounted(() => {
    getGame();
});

// Function to check if the user input matches the correct solution
const checksolution = async () => {
    if (userAnswer.value == quiz.value.solution) {
        feedback.value.incorrect = "";
        feedback.value.correct = "Yay! You got it right!";
        message.value = feedback.value.correct;
        messageType.value = "success";
        showMessage.value = true;

        // Post to API when the answer is correct
        await postResultToAPI("correct");
    } else {
        feedback.value.correct = "";
        feedback.value.incorrect = "Please try again";
        message.value = feedback.value.incorrect;
        messageType.value = "error";
        showMessage.value = true;

        // Decrease the lives when the answer is incorrect
        lives.value--;

        if (lives.value <= 0) {
            feedback.value.incorrect = "Game Over! You've run out of lives!";
            feedback.value.correct = "";
            message.value = feedback.value.incorrect;
            messageType.value = "error"; // Set messageType to "error"
            showMessage.value = true;

            // Post to API when lives are zero
            await postResultToAPI("gameOver");
        }
    }
}

// Post result to API
const postResultToAPI = async (status: string) => {
    console.log(status)
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

        <!-- Show feedback messages based on correctness-->
        <MessageComponent v-if="showMessage" :message="message" :type="messageType" />

        <div class="flex justify-around w-full">
            <button @click="checksolution" @keydown="checksolution" v-if="lives <= 0" :disabled
                class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a] hover:text-black transition duration-200">
                Check
            </button>
            <button @click="getGame" v-if="lives <= 0" :disabled
                class="bg-[#FFD700] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff23a] hover:text-black transition duration-200">
                Skip
            </button>
        </div>
    </div>
</template>
