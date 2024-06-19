<script setup>
import { RouterLink } from 'vue-router'
import { isLoggedIn } from '@/global/globalState';

const loginPop = () => {
    const loginBar = document.getElementById('login-bar');
    const registerBar = document.getElementById('register-bar');

    loginBar.classList.remove('-right-full');
    loginBar.classList.add('right-0');

    registerBar.classList.remove('left-0');
    registerBar.classList.add('-left-full');

    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburgerMenu.classList.toggle('-top-full');
    hamburgerMenu.classList.toggle('top-0');
    hamburgerMenu.classList.toggle('bottom-full');
    hamburgerMenu.classList.toggle('bottom-0');
}

const hamburgerPop = () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburgerMenu.classList.toggle('-top-full');
    hamburgerMenu.classList.toggle('top-0');
    hamburgerMenu.classList.toggle('bottom-full');
    hamburgerMenu.classList.toggle('bottom-0');
}
</script>

<template>
    <div class="flex gap-3 items-center justify-between container py-3 lg:py-5 mx-auto relative px-3 md:px-5 lg:px-10">
        <div class="flex items-center">
            <svg class="w-[48px] h-[48px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <g fill="#fafafa">
                    <path
                        d="M19 32V16h-3v16zm-5-3V19h-3v4h-1v2h1v4zm15-13v16h3V16zm5 13h3v-4h1v-2h-1v-4h-3zm-13-4h6v-2h-6z" />
                    <path fill-rule="evenodd"
                        d="M6 9a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3zm2 0a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"
                        clip-rule="evenodd" />
                </g>
            </svg>
            <router-link to="/"
                class="text-center text-2xl lg:text-3xl font-primary font-bold text-secondary cursor-pointer"><span
                    id="home-button">Fitivities</span></router-link>
        </div>

        <ul id="hamburger-menu"
            class="fixed sm:static inset-x-0 -top-full bottom-full bg-accent sm:bg-transparent flex flex-col sm:flex-row items-center justify-evenly sm:justify-between py-20 sm:py-0 gap-10 text-xl sm:text-base lg:text-lg text-secondary bg-opacity-95 transition-all duration-200 font-semibold sm:font-normal z-40">
            <li class="hover:scale-95 duration-75"><router-link to="/">Home</router-link></li>
            <li class="hover:scale-95 duration-75"><router-link to="/about">About</router-link></li>
            <li v-if="isLoggedIn" class="hover:scale-95 duration-75">
                <router-link to="/account">Account</router-link>
            </li>
            <li v-else><button id="login-bar-button"
                    class="text-accent bg-bg px-4 py-2 rounded hover:scale-95 duration-75"
                    @click.prevent="loginPop()">LOGIN</button></li>
        </ul>

        <button class="fixed sm:hidden right-3 z-40 hover:scale-95 duration-75" @click.prevent="hamburgerPop()">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 8h22M5 16h22M5 24h22" />
            </svg>
        </button>
    </div>
</template>
