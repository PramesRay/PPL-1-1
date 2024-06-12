<template>
    <div class="container p-3 mx-auto font-primary mt-10 w-full px-16">
        <h2 class="font-extrabold w-full text-center text-3xl">FASILITAS</h2>
        <div class="grid gap-5 grid-cols-6 w-full mt-8 text-secondary text-center">
            <div
                class="rounded-xl bg-[url('./assets/facility-gym.jpg')] bg-cover bg-center w-full h-80 col-span-3 shadow">
                <div class="w-full h-full hover:backdrop-blur-xl rounded-xl flex group duration-300">
                    <h4
                        class="mx-auto self-center text-3xl font-extrabold cursor-default invisible group-hover:visible">
                        Weight Training
                    </h4>
                </div>
            </div>
            <div
                class="rounded-xl bg-[url('./assets/facility-pilates.jpg')] bg-cover bg-center w-full h-80 col-span-3 shadow">
                <div class="w-full h-full hover:backdrop-blur-xl rounded-xl flex group duration-300">
                    <h4
                        class="mx-auto self-center text-3xl font-extrabold cursor-default invisible group-hover:visible">
                        Fitness Class
                    </h4>
                </div>
            </div>
            <div
                class="rounded-xl bg-[url('./assets/facility-boxing.jpg')] bg-cover bg-center w-full h-80 col-span-2 shadow">
                <div class="w-full h-full hover:backdrop-blur-xl rounded-xl flex group duration-300">
                    <h4
                        class="mx-auto self-center text-3xl font-extrabold cursor-default invisible group-hover:visible">
                        Martial Arts
                    </h4>
                </div>
            </div>
            <div
                class="rounded-xl bg-[url('./assets/facility-sauna.jpg')] bg-cover bg-center w-full h-80 col-span-2 shadow">
                <div class="w-full h-full hover:backdrop-blur-xl rounded-xl flex group duration-300">
                    <h4
                        class="mx-auto self-center text-3xl font-extrabold cursor-default invisible group-hover:visible">
                        Sauna
                    </h4>
                </div>
            </div>
            <div
                class="rounded-xl bg-[url('./assets/facility-pt.jpg')] bg-cover bg-center w-full h-80 col-span-2 shadow">
                <div class="w-full h-full hover:backdrop-blur-xl rounded-xl flex group duration-300">
                    <h4
                        class="mx-auto self-center text-3xl font-extrabold cursor-default invisible group-hover:visible">
                        Personal Training
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FacilitySection',
}
</script>