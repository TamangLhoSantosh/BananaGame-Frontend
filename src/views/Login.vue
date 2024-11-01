<script>
import { ref } from 'vue';
import { apiLogin } from '../api';

export default {
  setup() {
    const formData = ref({
      username: '',
      password: '',
    });

    const handleSubmit = async () => {
      try {
        const response = await apiLogin(formData.value);

        console.log('Sign In Successful:', response);
        // if (response.ok) {
          // Store the token or user info in local storage or Vuex
          // localStorage.setItem('token', data.token);
        // } else {
        //   const error = await response.json();
        //   console.error('Sign In Error:', error);
        // }
      } catch (error) {
        console.error('Network Error:', error);
      }
    };

    return {
      formData,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="bg-[#333333] flex justify-center items-center min-h-screen">
    <div class="bg-white max-w-md w-[90%] flex flex-col gap-5 rounded-lg shadow-lg p-8">
      <div class="flex flex-col items-center p-4">
        <h1 class="text-4xl font-bold text-[#008080] w-full p-3 text-center">
          Sign In
        </h1>
        <p class="text-lg text-center text-gray-700">
          Sign in to stay connected
        </p>
      </div>
      <form class="flex flex-col p-3 gap-6 w-full" @submit.prevent="handleSubmit">
        <input
          v-model="formData.username"
          placeholder="Username or Email"
          class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200"
          required
        />
        <div class="relative w-full">
          <input
            v-model="formData.password"
            placeholder="Password"
            type="password"
            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200"
            required
            autocomplete="current-password"
          />
        </div>
        <button
          type="submit"
          class="w-full self-center md:w-28 bg-[#FFD700] mt-[10px] p-2 rounded-lg shadow-md hover:bg-[#FFC107] transition duration-300"
        >
          Sign In
        </button>
        <p class="text-center mt-2 text-[#008080]">
          Don't have an account? 
          <strong class="font-semibold hover:text-[#FFD700] hover:scale-105 transition-transform duration-200 cursor-pointer">
            Sign Up
          </strong>
        </p>
      </form>
    </div>
  </div>
</template>
