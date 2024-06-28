<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'

const closePop = () => {
    const addReviewSection = document.getElementById('add-review-section');

    addReviewSection.classList.remove('top-0');
    addReviewSection.classList.add('top-full');
}

const formData = ref({
    deskripsi_review: '',
    rating: '',
})

const userId = localStorage.getItem("userId")

const addReview = async () => {
    await axios.post(`http://localhost:3001/post/review/${userId}`, {
        deskripsi_review: formData.value.deskripsi_review,
        rating: formData.value.rating,
    })
        .then(response => {
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil Menambahkan Review",
                showConfirmButton: false,
                timer: 1500
            });
            closePop();
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
</script>

<template>
    <div id="add-review-section" class="w-full fixed h-screen z-50 top-full backdrop-blur flex duration-300 text-white">
        <form @submit.prevent="addReview"
            class="m-auto flex flex-col gap-3 justify-center items-center w-1/3 bg-accent rounded-xl px-20 py-10 text-lg">
            <div class="w-full">
                <p>Deskripsi:</p>
                <textarea id="deskripsi_review" class="w-full rounded mt-1 text-black px-3 py-1"
                    v-model="formData.deskripsi_review"></textarea>
            </div>
            <div class="w-full">
                <p>Rating</p>
                <div class="w-full flex justify-evenly">
                    <input type="radio" id="1" name="rating" value="1" v-model="formData.rating">
                    <label for="1">1</label><br>
                    <input type="radio" id="2" name="rating" value="2" v-model="formData.rating">
                    <label for="2">2</label><br>
                    <input type="radio" id="3" name="rating" value="3" v-model="formData.rating">
                    <label for="3">3</label><br>
                    <input type="radio" id="4" name="rating" value="4" v-model="formData.rating">
                    <label for="4">4</label><br>
                    <input type="radio" id="5" name="rating" value="5" v-model="formData.rating">
                    <label for="5">5</label><br>
                </div>
            </div>

            <button type="submit"
                class="self-end bg-neutral-50 rounded px-10 py-1 text-accent mt-5 hover:scale-95 duration-75">Add</button>

            <button class="absolute right-5 top-5 lg:right-20 lg:top-12 xl:right-96 xl:top-40"
                @click.prevent="closePop">
                <svg class="w-8 h-8 lg:w-10 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path
                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path fill="#008080"
                            d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" />
                    </g>
                </svg>
            </button>
        </form>

    </div>
</template>