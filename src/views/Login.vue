<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

import { apiLogin } from '../api';
import router from '../router';

// State to store form data
const formData = ref({
  username: '',
  password: '',
});

// State to toggle password visibility
const showPassword = ref(false);

// State to store loading state
const isLoading = ref(false);

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Toast instance
const toast = useToast();

// Function to handle form submission
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await apiLogin(formData.value);
    toast.success('Sign In Successful');
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('playerId', response.data.id); ``
    router.push('/');
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    } else {
      toast.error('An error occurred');
    }
  }
  finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-[#333333] flex justify-center items-center min-h-screen">
    <div v-if="isLoading" class="text-center" id="loader">
      <PulseLoader />
    </div>
    <div class="bg-white max-w-md w-[90%] flex flex-col gap-5 rounded-lg shadow-lg p-8">
      <div class="flex flex-col items-center p-4">
        <h1 class="text-4xl font-bold text-[#008080] w-full p-3 text-center">
          Sign In
        </h1>
        <p class="text-lg text-center text-gray-700">
          Sign in to stay connected
        </p>
      </div>
      <!-- Form -->
      <form class="flex flex-col p-3 gap-6 w-full" @submit.prevent="handleSubmit">
        <!-- Username -->
        <input v-model="formData.username" placeholder="Username"
          class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200"
          required />
        <!-- Password -->
        <div class="relative w-full">
          <input v-model="formData.password" placeholder="Password" :type="showPassword ? 'text' : 'password'"
            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200"
            required autocomplete="current-password" />
          <span @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <button type="submit"
          class="w-full self-center md:w-28 bg-[#FFD700] mt-[10px] p-2 rounded-lg shadow-md hover:bg-[#008080] hover:text-white transition duration-300">
          Sign In
        </button>
        <p class="text-center mt-2 text-[#008080]">
          Don't have an account?
          <RouterLink to="/register"
            class="font-semibold hover:text-[#FFD700] hover:scale-105 transition-transform duration-200 cursor-pointer">
            Sign Up
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
</style>