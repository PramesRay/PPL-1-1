<script setup>
import AppBar from '../components/AppBar.vue';
import MembershipCard from '../components/MembershipCard.vue';
import DataInformationCard from '../components/DataInformationCard.vue';
</script>

<template>
    <header class="bg-[url('./assets/hero-account.png')] bg-cover bg-center min-h-screen">
        <div class="absolute flex w-full h-screen">
            <h1 class="m-auto text-secondary font-bold text-3xl lg:text-5xl">Personal Info</h1>
        </div>
        <AppBar />
    </header>

    <MembershipCard />
    <DataInformationCard />
</template>
