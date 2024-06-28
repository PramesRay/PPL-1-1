<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

const router = useRouter()

const extendCard = () => {
    document.getElementById('data-section').classList.toggle('hidden');
    document.getElementById('password-section').classList.toggle('hidden');
}

const logoutHandler = async () => {
    try {
        const response = await axios.get('http://localhost:3001/logout')
        Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
        });

        localStorage.removeItem("session");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

const formData = ref({
    nama: '',
    email: '',
    username: '',
    nomor_telepon: '',
    alamat: '',
    jk: '',
    profile: '',
    passwordLama: '',
    passwordBaru: '',
    conPasswordBaru: '',
})

// const fetchDataUser = async () => {
//     try {
//         const response = await axios.get('https://ppl-1-1.vercel.app/get/user')
//         console.log(response.data)
//     } catch (error) {
//         console.log(error)
//     }
// }

const putDataUser = async () => {
    await axios.put('http://localhost:3001/update/profile/', {
        nama: formData.value.nama,
        email: formData.value.email,
        username: formData.value.username,
        nomor_telepon: formData.value.nomor_telepon,
        alamat: formData.value.alamat,
        profile: formData.value.profile,
        jk: formData.value.jk
    })
        .then(response => {
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil Mengubah Data",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => window.location.reload(), 1500)
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
        })
}

const putPassword = async () => {
    await axios.put('http://localhost:3001/update/password/', {
        passwordLama: formData.value.passwordLama,
        passwordBaru: formData.value.passwordBaru,
        conPasswordBaru: formData.value.conPasswordBaru,
    })
        .then(response => {
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil Mengubah Password",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => window.location.reload(), 1500)
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
        })
}

onMounted(() => {
    // fetchDataUser()
})
</script>

<template>
    <div class="container w-full m-auto mt-5 mb-20 px-5 lg:px-20 flex flex-col">
        <div class="bg-accent rounded-xl py-5 lg:py-10 px-5 lg:px-10 w-full">
            <form id="data-section" @submit.prevent="putDataUser" class="flex flex-col gap-10">
                <div
                    class="grid sm:grid-cols-2 sm:grid-rows-4 justify-center items-center sm:gap-x-5 lg:gap-x-10 gap-y-5 text-secondary">
                    <img class="cols-span-1 row-span-2 w-40 h-40 m-auto rounded-full object-cover object-center"
                        src="../assets/information-photo.jpg" alt="photo">

                    <!--  -->
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Username</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" id="username" v-model="formData.username">
                    </div>

                    <!--  -->
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Nama Lengkap</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" id="nama" v-model="formData.nama">
                    </div>

                    <!--  -->
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Email</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" id="email" v-model="formData.email">
                    </div>

                    <!--  -->
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Nomor Handphone</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" id="nomor_telepon" v-model="formData.nomor_telepon">
                    </div>

                    <!--  -->
                    <div class="flex flex-col items-start justify-center">
                        <label for="" class="font-normal ml-2 mb-1">Alamat</label>
                        <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                            type="text" id="alamat" v-model="formData.alamat">
                    </div>

                    <!-- UBAH, KURANG DARI BE, KELEBIHAN PROPERTI 'PROFILE' -->
                    <div class="flex flex-col justify-center">
                        <p for="" class="font-normal ml-2 mb-1">Jenis Kelamin</p>
                        <div class="flex gap-1">
                            <input type="radio" v-model="formData.jk" id="pria" name="jenis_kelamin" value="pria">
                            <label class="mr-5" for="pria">Pria</label><br>
                            <input type="radio" v-model="formData.jk" id="wanita" name="jenis_kelamin" value="wanita">
                            <label for="wanita">Wanita</label><br>
                        </div>
                    </div>
                </div>

                <!--  -->
                <div class="self-end text-accent text-sm lg:text-base font-semibold flex gap-5 ">
                    <button type="submit" id="change-password"
                        class="bg-transparent outline outline-secondary text-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75"
                        @click.prevent="extendCard">
                        Ubah Password
                    </button>
                    <button type="submit"
                        class="bg-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75">Simpan
                        Data</button>
                </div>
            </form>

            <form id="password-section" @submit.prevent="putPassword" class="flex flex-col gap-10 hidden">
                <div>
                    <h2 class="w-full text-center text-secondary font-semibold text-2xl mb-5">Ganti Password</h2>
                    <div
                        class="grid sm:grid-cols-2 sm:grid-rows-2 justify-center items-center sm:gap-x-5 lg:gap-x-10 gap-y-5 text-secondary">
                        <div class="sm:col-span-2 flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Password Sekarang</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" id="passwordLama" v-model="formData.passwordLama">
                        </div>
                        <div class="flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Password Baru</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" id="passwordBaru" v-model="formData.passwordBaru">
                        </div>
                        <div class="flex flex-col items-start justify-center">
                            <label for="" class="font-normal ml-2 mb-1">Konfirmasi Password</label>
                            <input class="rounded bg-bg text-primary focus:outline-none py-2 px-5 w-full m-auto shadow"
                                type="text" id="conPasswordBaru" v-model="formData.conPasswordBaru">
                        </div>
                    </div>
                </div>

                <!--  -->
                <div class="self-end text-accent text-sm lg:text-base font-semibold flex gap-5 ">
                    <button type="submit" id="change-password"
                        class="bg-transparent outline outline-secondary text-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75"
                        @click.prevent="extendCard">
                        Ubah Data
                    </button>
                    <button type="submit"
                        class="bg-secondary rounded px-2 lg:px-5 py-2 hover:scale-95 duration-75">Simpan
                        Data</button>
                </div>
            </form>
        </div>

        <button @click.prevent="logoutHandler"
            class="rounded px-3 py-1 self-end text-xl font-medium mt-5 outline outline-[#008080] text-[#008080] hover:scale-95 duration-75">Logout</button>
    </div>
</template>
