<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import * as z from "zod";
import { useToast } from 'vue-toastification';

import { apiRegister } from '../api';
import router from '../router';

// State to store form data
const formData = ref({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
});

// Validation schema
const formSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    firstName: z.string().min(1, "First name cannot be empty"),
    middleName: z.string(),
    lastName: z.string().min(1, "Last name cannot be empty"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

// Infer the type of the form schema
type formSchemaType = z.infer<typeof formSchema>;

// State to store form errors
const errors = ref<z.ZodFormattedError<formSchemaType> | null>(null);

// State to store loading state
const isLoading = ref(false);

// Toast instance
const toast = useToast();

// Validation function
const validation = () => {
    const validSchema = formSchema.safeParse(formData.value); // Validate the form data
    if (!validSchema.success) {
        errors.value = validSchema.error.format();
        return false;
    } else {
        errors.value = null;
    }
    if (formData.value.password !== formData.value.confirmPassword) {
        toast.error("Password does not match");
        return false;
    }
    return true;
}

// Handle form submission
const handleSubmit = async () => {
    try {
        if (!validation()) return;
        isLoading.value = true;
        const response = await apiRegister(formData.value);
        console.log(response);
        toast.success('Sign Up Successful');
        router.push('/login');
    } catch (error: any) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error('An error occurred');
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="bg-[#333333] flex justify-center items-center min-h-screen">
        <div v-if="isLoading" class="text-center" id="loader">
            <PulseLoader />
        </div>
        <div class="bg-white max-w-xl w-[90%] flex flex-col gap-5 rounded-lg shadow-lg p-8">
            <div class="flex flex-col items-center p-4">
                <h1 class="text-4xl font-bold text-[#008080] w-full p-3 text-center">
                    Sign Up
                </h1>
            </div>
            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full p-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- First Name -->
                    <div>
                        <input v-model="formData.firstName" placeholder="First Name"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.firstName" class="text-red-600"> <span
                                v-for="error in errors?.firstName?._errors">{{ error }}</span>
                        </div>
                    </div>
                    <!-- Middle Name -->
                    <div>
                        <input v-model="formData.middleName" placeholder="Middle Name"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.firstName" class="text-red-600"> <span class="hidden"
                                v-for="error in errors?.firstName?._errors">{{ error }}</span>
                        </div>
                    </div>
                    <!-- Last Name -->
                    <div>
                        <input v-model="formData.lastName" placeholder="Last Name"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.lastName" class="text-red-600"> <span
                                v-for="error in errors?.lastName?._errors">{{ error }}</span>
                        </div>
                    </div>
                    <!-- Userame -->
                    <div>
                        <input v-model="formData.username" placeholder="Username"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.username" class="text-red-600"> <span
                                v-for="error in errors?.username?._errors">{{
                                    error }}</span>
                        </div>
                    </div>
                </div>
                <!-- Email -->
                <div>
                    <input v-model="formData.email" placeholder="Email"
                        class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                    <div v-if="errors?.email" class="text-red-600"> <span v-for="error in errors?.email?._errors">{{
                        error }}</span>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Password -->
                    <div>
                        <input v-model="formData.password" placeholder="Password" type="password"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.password" class="text-red-600"> <span
                                v-for="error in errors?.password?._errors">{{ error }}</span>
                        </div>
                    </div>
                    <!-- Confirm Password -->
                    <div>
                        <input v-model="formData.confirmPassword" placeholder="Confirm Password" type="password"
                            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-200" />
                        <div v-if="errors?.confirmPassword" class="text-red-600 flex flex-col"> <span
                                v-for="error in errors?.confirmPassword?._errors">{{ error }}</span>
                        </div>
                    </div>
                </div>
                <button type="submit"
                    class="w-full bg-[#008080] text-white p-3 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition duration-300">
                    Sign Up
                </button>
                <p class="text-center mt-2 text-[#008080]">
                    Already have an account?
                    <RouterLink to="/login"
                        class="font-semibold hover:text-[#FFD700] hover:scale-105 transition-transform duration-200 cursor-pointer">
                        Sign In
                    </RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>