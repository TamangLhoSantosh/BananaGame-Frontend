<script>
import { ref } from 'vue';
import { apiRegister } from '../api';

export default {
    name: 'SignupComponent',
    setup() {
        const formData = ref({
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        const handleSubmit = async () => {
            try {
                if (formData.value.password !== formData.value.confirmPassword) {
                    return;
                }
                const response = await apiRegister(formData.value);
                console.log('Sign Up Successful:', response);
            } catch (error) {
                console.error('An error occurred:', error);
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
        <div class="bg-white max-w-xl w-[90%] flex flex-col gap-5 rounded-lg shadow-lg p-8">
            <div class="flex flex-col items-center p-4">
                <h1 class="text-4xl font-bold text-[#008080] w-full p-3 text-center">
                    Sign Up
                </h1>
            </div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full p-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input v-model="formData.firstName" placeholder="First Name"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                    <input v-model="formData.middleName" placeholder="Middle Name"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                    <input v-model="formData.lastName" placeholder="Last Name"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                    <input v-model="formData.username" placeholder="Username"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                </div>
                <input v-model="formData.email" placeholder="Email"
                    class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input v-model="formData.password" placeholder="Password" type="password"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                    <input v-model="formData.confirmPassword" placeholder="Confirm Password" type="password"
                        class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                </div>
                <button type="submit"
                    class="w-full bg-[#008080] text-white p-3 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition duration-300">
                    Sign Up
                </button>

                <p class="text-center mt-2 text-[#008080]">
                    Already have an account?
                    <strong
                        class="font-semibold hover:text-[#FFD700] hover:scale-105 transition-transform duration-200 cursor-pointer">
                        Sign In
                    </strong>
                </p>
            </form>
        </div>
    </div>
</template>
