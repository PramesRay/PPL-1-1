<template>
    <div class="h-80 bg-accent mt-20 grid grid-cols-5 gap-10">
        <div class="bg-[url('./assets/promo-whey.jpg')] bg-cover bg-center col-span-2"></div>
        <div class="col-span-3 flex px-5 pr-20 py-5 flex-col text-secondary gap-7 justify-center">
            <h4 class="font-bold text-4xl">Promo Member Baru</h4>
            <p class="text-xl font-normal">
                Bergabunglah dengan gym kami dan dapatkan whey protein GRATIS untuk memaksimalkan setiap langkah
                perjalanan kebugaran Anda.
            </p>
            <p class="text-xl font-normal hover:underline cursor-pointer">Dapatkan sekarang!</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PromoSection',
}
</script>