<script setup lang="ts">
import { apiGame } from '../api';

const token = localStorage.getItem('token');

const getGame = async () => {
    const response = await apiGame(token);
    console.log(response);
};

getGame();
</script>
<template>
    <p>sadf</p>

</template>