<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const options = {
    focus: 'center',
    drag: 'free',
    lazyLoad: 'nearby',
    snap: 'true',
    perPage: 3,
    perMove: 2,
    padding: '2rem',
    breakpoints: {
        1024: {
            perPage: 2,
        },
        640: {
            perPage: 1,
        },
    },
}

const addReviewPop = () => {
    const addReviewSection = document.getElementById('add-review-section');

    addReviewSection.classList.remove('top-full');
    addReviewSection.classList.add('top-0');
}

const reviews = ref(null)

const fetchData = async () => {
    try {
        const response = await axios.get('https://ppl-1-1.vercel.app/get/review')
        reviews.value = response.data
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div v-if="reviews" class="container m-auto px-5 lg:px-10 flex flex-col">
        <h2 class="font-extrabold w-full text-center text-3xl mt-10 lg:mt-20">OUR MEMBER</h2>
        <Splide :options="options" class="mt-10">
            <SplideSlide v-for="(review, index) in reviews" :key="index" class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">{{ review.pengguna_id }}</p>
                    <p class="customer-review">{{ review.deskripsi_review }}</p>
                    <p class="font-thin">{{ review.rating }} ⭐</p>
                </div>
            </SplideSlide>
        </Splide>

        <button @click.prevent="addReviewPop"
            class="px-5 py-1 outline outline-accent mx-auto rounded mt-5 hover:scale-95 duration-75">Add
            Review</button>
    </div>
</template>
