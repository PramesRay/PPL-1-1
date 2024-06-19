<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';

const closePop = () => {
    const loginBar = document.getElementById('login-bar');
    const registerBar = document.getElementById('register-bar');

    loginBar.classList.remove('right-0');
    loginBar.classList.add('-right-full');
    registerBar.classList.remove('left-0');
    registerBar.classList.add('-left-full');
}

const loginPop = () => {
    const loginBar = document.getElementById('login-bar');
    const registerBar = document.getElementById('register-bar');

    loginBar.classList.remove('-right-full');
    loginBar.classList.add('right-0');

    registerBar.classList.remove('left-0');
    registerBar.classList.add('-left-full');
}

const formData = ref({
    emailReg: '',
    phoneReg: '',
    usernameReg: '',
    passwordReg: '',
    conPasswordReg: '',
})

// eslint-disable-next-line no-useless-escape
const isEmailRegValid = computed(() => /^[^\&@]+@[^\&@]+\.[^\&@]+$/.test(formData.value.emailReg))
const isPhoneRegValid = computed(() => formData.value.phoneReg.trim() !== '')
const isUsernameRegValid = computed(() => formData.value.usernameReg.trim() !== '')
const isPasswordRegValid = computed(() => formData.value.passwordReg.length >= 8)
const isConPasswordRegValid = computed(() => formData.value.conPasswordReg === formData.value.passwordReg)

const isFormValid = computed(() => isUsernameRegValid.value && isPasswordRegValid.value && isEmailRegValid.value && isPhoneRegValid.value && isConPasswordRegValid.value)

const postRegister = () => {
    axios.post('http://localhost:3001/register', {
        emailReg: formData.value.emailReg,
        phoneReg: formData.value.phoneReg,
        usernameReg: formData.value.usernameReg,
        passwordReg: formData.value.passwordReg,
        conPasswordReg: formData.value.conPasswordReg,
    })
        .then(response => {
            console.log(response)
            loginPop()
            alert('Berhasil registrasi')
        })
        .catch(error => {
            alert(error.response.data.message)
        })
}
</script>

<template>
    <div id="register-bar" class="w-full fixed h-screen z-50 top-0 -left-full backdrop-blur-lg flex duration-300">
        <div id="register-form-bar"
            class="w-5/6 lg:w-1/2 h-5/6 m-auto rounded-xl flex flex-col justify-between items-center py-10 lg:py-5 z-10 bg-white bg-opacity-90">
            <h4 class="text-center font-black text-3xl mb-3 lg:mb-0 lg:text-4xl">REGISTER</h4>
            <div class="w-3/4 flex flex-col justify-between font-semibold gap-10 text-lg">
                <form @submit.prevent="postRegister" class="flex flex-col">
                    <!--  -->
                    <label for="emailReg" class="">Email</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-[38px] ml-3">
                        <path fill="black"
                            d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m0 2l-6.5 4.47a1 1 0 0 1-1 0L5 6Z" />
                    </svg>
                    <input type="emailReg" id="emailReg" v-model="formData.emailReg" required
                        class="text-black px-2 w-full rounded mt-1 mb-3 py-2 sm:pl-14 shadow" />

                    <!--  -->
                    <label for="phoneReg" class="">No Handphone</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-[126px] ml-3">
                        <path fill="black"
                            d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98" />
                    </svg>
                    <input type="text" id="phoneReg" v-model="formData.phoneReg" required
                        class="text-black px-2 w-full rounded mt-1 mb-3 py-2 sm:pl-14 shadow" />

                    <!--  -->
                    <label for="usernameReg" class="">Username</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-[215px] ml-3">
                        <path fill="000000"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4" />
                    </svg>
                    <input type="text" id="usernameReg" v-model="formData.usernameReg" required
                        class="text-black px-2 w-full rounded mt-1 mb-3 py-2 sm:pl-14 shadow" />

                    <!--  -->
                    <label for="passwordReg" class="">Password</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-[306px] ml-3">
                        <path fill="black"
                            d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z" />
                    </svg>
                    <input type="passwordReg" id="passwordReg" v-model="formData.passwordReg" required
                        class="text-black px-2 w-full rounded mt-1 mb-3 py-2 sm:pl-14 shadow" />

                    <!--  -->
                    <label for="passwordRegCon" class="">Confirm Password</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-[394px] ml-3">
                        <path fill="black"
                            d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z" />
                    </svg>
                    <input type="passwordReg" id="conPasswordReg" v-model="formData.conPasswordReg" required
                        class="text-black px-2 w-full rounded mt-1 py-2 sm:pl-14 shadow" />

                    <button v-if="!isFormValid" disabled
                        class="mx-auto mt-7 bg-accent px-6 py-2 rounded font-bold text-white grayscale">REGISTER</button>
                    <button v-else
                        class="mx-auto mt-7 bg-accent px-6 py-2 rounded font-bold text-white  hover:scale-95 duration-75">REGISTER</button>
                </form>
            </div>
        </div>
        <button class="absolute right-5 top-5 lg:right-20 lg:top-12 xl:right-32 xl:top-14" @click.prevent="closePop">
            <svg class="w-8 h-8 lg:w-10 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <path
                        d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="white"
                        d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" />
                </g>
            </svg>
        </button>
    </div>
</template>
