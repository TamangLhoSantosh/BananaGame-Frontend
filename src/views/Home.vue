<script setup lang="ts">
import { ref } from 'vue';
import { apiGame } from '../api';

const quiz = ref({ question: "", answer: "" });

const userAnswer = ref("");

const getGame = async () => {

    const response = await apiGame();
    quiz.value = response.data;
};

getGame();

const checkAnswer = () => {
    if (userAnswer.value === quiz.value.answer) {
        alert("Correct");
    } else {
        alert("Incorrect");
    }
}
</script>
<template>
    <div class="flex flex-col justify-center items-center my-16">
        <p class="text-5xl">Banana Game</p>
        <img :src="quiz.question" alt="question" class="max-h-fit max-w-fit">
        <input v-model="userAnswer" type="text"
            class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200">
        <button @click="getGame">Next</button>
        <button @click="checkAnswer">Check</button>
    </div>
</template>