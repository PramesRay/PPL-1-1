<template>
    <header class="bg-[url('./assets/hero-about.png')] bg-cover bg-center min-h-screen">
        <div class="absolute flex w-full h-screen">
            <h1 class="m-auto text-secondary font-bold text-5xl">About Us</h1>
        </div>
        <AppBar></AppBar>
    </header>

    <CheckInOutBar></CheckInOutBar>
    <AboutSection></AboutSection>
    <ReviewSection></ReviewSection>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import CheckInOutBar from '@/components/CheckInOutBar.vue';
import AboutSection from '@/components/AboutSection.vue';
import ReviewSection from '@/components/ReviewSection.vue';

export default {
    name: 'About',
    components: {
        AppBar,
        CheckInOutBar,
        AboutSection,
        ReviewSection,
    }
}
</script>