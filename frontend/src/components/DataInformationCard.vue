<script setup>
import axios from 'axios';
import { isLoggedIn } from '@/global/globalState';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { inject } from 'vue';

const router = useRouter()

const extendCard = () => {
    document.getElementById('password-section').classList.toggle('hidden');
    document.getElementById('change-password').classList.add('hidden');
}

const logoutHandler = async () => {
    try {
        const response = await axios.get('https://ppl-1-1.vercel.app/logout')
        alert(response.data.message)
        isLoggedIn.value = false;
        localStorage.removeItem('isLoggedIn');
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

const fetchDataUser = async () => {
    try {
        const response = await axios.get('https://ppl-1-1.vercel.app/get/user')
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    fetchDataUser()
})
</script>

<template>
    <div class="container w-full m-auto mt-5 mb-20 px-5 lg:px-20 flex flex-col">
        <div class="bg-accent rounded-xl py-5 lg:py-10 px-5 lg:px-10 w-full">
            <form class="flex flex-col gap-10" action="">
                <div
                    class="grid sm:grid-cols-2 sm:grid-rows-4 justify-center items-center sm:gap-x-5 lg:gap-x-10 gap-y-5 text-secondary">
                    <img class="cols-span-1 row-span-2 w-40 h-40 m-auto rounded-full object-cover object-center"
                        src="../assets/information-photo.jpg" alt="photo">
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Username</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" name="" id="">
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Nama Lengkap</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" name="" id="">
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Email</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" name="" id="">
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Nomor Handphone</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" name="" id="">
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Alamat</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" name="" id="">
                    </div>
                    <div class="flex flex-col justify-center">
                        <p for="" class="font-normal ml-2 mb-1">Jenis Kelamin</p>
                        <div class="flex gap-1">
                            <input type="radio" id="pria" name="jenis_kelamin" value="pria">
                            <label class="mr-5" for="pria">Pria</label><br>
                            <input type="radio" id="wanita" name="jenis_kelamin" value="wanita">
                            <label for="wanita">Wanita</label><br>
                        </div>
                    </div>
                </div>

                <div id="password-section" class="hidden">
                    <h2 class="w-full text-center text-secondary font-semibold text-2xl mb-5 mt-5">Ganti Password</h2>
                    <div
                        class="grid sm:grid-cols-2 sm:grid-rows-2 justify-center items-center sm:gap-x-5 lg:gap-x-10 gap-y-5 text-secondary">
                        <div class="sm:col-span-2 flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Password Sekarang</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" name="" id="">
                        </div>
                        <div class="flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Password Baru</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" name="" id="">
                        </div>
                        <div class="flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Konfirmasi Password</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" name="" id="">
                        </div>
                    </div>
                </div>

                <div class="self-end text-accent text-sm lg:text-base font-semibold flex gap-5 ">
                    <button id="change-password"
                        class="bg-transparent outline outline-secondary text-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75"
                        @click.prevent="extendCard">
                        Ubah Password
                    </button>
                    <button class="bg-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75">Simpan
                        Data</button>
                </div>
            </form>
        </div>

        <button @click.prevent="logoutHandler"
            class="rounded px-3 py-1 self-end text-xl font-medium mt-5 outline outline-[#008080] text-[#008080] hover:scale-95 duration-75">Logout</button>
    </div>
</template>
