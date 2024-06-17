<script setup>
import AppBar from '../components/AppBar.vue';
import CheckInOutBar from '../components/CheckInOutBar.vue';
import FacilitySection from '../components/FacilitySection.vue';
import PromoSection from '../components/PromoSection.vue';
import MembershipSection from '../components/MembershipSection.vue';
import ReminderSection from '../components/ReminderSection.vue';
import ReviewSection from '../components/ReviewSection.vue';
</script>

<template>
    <header class="bg-[url('./assets/hero.png')] bg-cover bg-center min-h-screen">
        <AppBar />
    </header>

    <CheckInOutBar />
    <FacilitySection />
    <PromoSection />
    <MembershipSection />
    <ReviewSection />
    <ReminderSection />
</template>
