<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="bg-[#333333] flex justify-center items-center min-h-screen">
        <div class="bg-white max-w-md w-[90%] flex flex-col gap-5 rounded-lg shadow-lg p-8">
            <div class="flex flex-col items-center p-4">
                <h1 class="text-4xl font-bold text-[#008080] w-full p-3 text-center">
                    Page Not Found
                </h1>
                <p class="text-lg text-center text-gray-700">
                    The page you are looking for does not exist.
                </p>
                <RouterLink to="/" class="text-[#008080] underline hover:text-[#004c4c]">
                    Go back to Home
                </RouterLink>
            </div>
        </div>
    </div>
</template>