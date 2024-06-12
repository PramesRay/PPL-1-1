<template>
    <div class="flex gap-3 items-center justify-between container py-5 mx-auto relative ">
        <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48">
                <g fill="#fafafa">
                    <path
                        d="M19 32V16h-3v16zm-5-3V19h-3v4h-1v2h1v4zm15-13v16h3V16zm5 13h3v-4h1v-2h-1v-4h-3zm-13-4h6v-2h-6z" />
                    <path fill-rule="evenodd"
                        d="M6 9a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3zm2 0a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"
                        clip-rule="evenodd" />
                </g>
            </svg>
            <h1 class="text-center text-3xl font-primary font-black text-secondary cursor-pointer"><span
                    id="home-button">Fitivities</span></h1>
        </div>

        <ul id="#hamburger-menu"
            class="flex flex-row items-center justify-start gap-10 text-md lg:px-5 md:bg-transparent md:text-secondary bg-opacity-95 transition-all duration-200 font-semibold">
            <li class="hover:scale-95 duration-75"><router-link to="/">Home</router-link></li>
            <li class="hover:scale-95 duration-75"><router-link to="/about">About</router-link></li>
            <li class="hover:scale-95 duration-75"><router-link to="/account">Account</router-link></li>
            <li><button id="login-bar-button" class="text-accent bg-bg px-4 py-2 rounded hover:scale-95 duration-75"
                    @click.prevent="loginPop()">LOGIN</button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AppBar',
    methods: {
        loginPop() {
            const loginBar = document.getElementById('login-bar');
            const registerBar = document.getElementById('register-bar');

            loginBar.classList.remove('-right-full');
            loginBar.classList.add('right-0');

            registerBar.classList.remove('left-0');
            registerBar.classList.add('-left-full');
        },
    }
}
</script>