<script setup>
const registerPop = () => {
    const loginBar = document.getElementById('login-bar');
    const registerBar = document.getElementById('register-bar');

    loginBar.classList.remove('right-0');
    loginBar.classList.add('-right-full');

    registerBar.classList.remove('-left-full');
    registerBar.classList.add('left-0');
}

const closePop = () => {
    const loginBar = document.getElementById('login-bar');
    const registerBar = document.getElementById('register-bar');

    loginBar.classList.remove('right-0');
    loginBar.classList.add('-right-full');
    registerBar.classList.remove('left-0');
    registerBar.classList.add('-left-full');
}
</script>

<template>
    <div id="login-bar" class="w-full fixed h-screen z-50 top-0 -right-full backdrop-blur flex duration-300 text-black">
        <div id="login-form-bar"
            class="w-5/6 lg:w-1/2 h-5/6 m-auto rounded-xl flex flex-col justify-between items-center py-10 z-10 bg-white bg-opacity-90">
            <h4 class="text-center font-black text-3xl lg:text-4xl">LOGIN</h4>
            <div class="w-3/4 flex flex-col justify-between font-semibold gap-16 text-lg">
                <form action="" class="">
                    <label for="username" class="">Username</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-2.5 ml-2">
                        <path fill="000000"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4" />
                    </svg>
                    <input type="text" name="username" id=""
                        class="text-black px-2 w-full rounded mt-1 mb-5 py-2 sm:pl-14 shadow" />
                    <label for="password" class="">Password</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                        class="hidden sm:block absolute mt-3 ml-2">
                        <path fill="black"
                            d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z" />
                    </svg>
                    <input type="password" name="password" id=""
                        class="text-black px-2 w-full rounded mt-1 py-2 sm:pl-14 shadow" />
                </form>
                <button
                    class="mx-auto bg-accent px-6 py-2 rounded font-bold text-white hover:scale-95 duration-75">LOGIN</button>
            </div>
            <p class="text-base font-semibold text-center">
                Belum punya akun Fitivities?
                <button id="register-bar-button" class="text-accent hover:scale-95 duration-75"
                    @click.prevent="registerPop()">REGISTER</button>
            </p>
        </div>
        <button class="absolute right-5 top-5 lg:right-20 lg:top-12 xl:right-32 xl:top-14" @click.prevent="closePop">
            <svg class="w-8 h-8 lg:w-10 lg:h-10" xmlns="http://www.w3.org/2000/svg" width="" height=""
                viewBox="0 0 24 24">
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
