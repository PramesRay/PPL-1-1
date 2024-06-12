<template>
    <AppBar></AppBar>
    <LoginSidebar></LoginSidebar>
    <RegisterSidebar></RegisterSidebar>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import LoginSidebar from '@/components/LoginSidebar.vue';
import RegisterSidebar from '@/components/RegisterSidebar.vue';

export default {
    name: 'Hero',
    components: {
        AppBar,
        LoginSidebar,
        RegisterSidebar,
    },
    methods: {
        loginPop() {
            const loginBar = document.getElementById('login-bar');
            const registerBar = document.getElementById('register-bar');

            loginBar.classList.remove('-right-full');
            loginBar.classList.add('right-0');

            registerBar.classList.remove('left-0');
            registerBar.classList.add('-left-full');
        },
        registerPop() {
            const loginBar = document.getElementById('login-bar');
            const registerBar = document.getElementById('register-bar');

            loginBar.classList.remove('right-0');
            loginBar.classList.add('-right-full');

            registerBar.classList.remove('-left-full');
            registerBar.classList.add('left-0');
        },
    }
}
</script>