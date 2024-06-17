<script setup>
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
</script>

<template>
    <div class="container m-auto px-5 lg:px-10">
        <h2 class="font-extrabold w-full text-center text-3xl mt-10 lg:mt-20">OUR MEMBER</h2>
        <Splide :options="options" class="mt-10">
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Budi Santoso</p>
                    <p class="customer-review">
                        Saya sudah menjadi anggota gym ini selama enam bulan dan sangat puas dengan
                        fasilitas yang disediakan. Peralatan gym sangat lengkap dan selalu dalam kondisi
                        bersih. Instruktur sangat profesional dan membantu saya mencapai tujuan kebugaran
                        saya. Selain itu, suasana gym sangat menyenangkan dan mendukung untuk berolahraga.
                        Sangat direkomendasikan!
                    </p>
                    <p class="font-thin">1 Juni 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Siti Rahmawati</p>
                    <p class="customer-review">
                        Gym ini benar-benar luar biasa! Kelas-kelas yang ditawarkan sangat bervariasi,
                        mulai dari yoga, pilates, hingga Zumba. Instruktur kelas sangat berpengalaman dan
                        membuat sesi latihan menjadi sangat menyenangkan. Kebersihan gym juga sangat
                        terjaga. Hanya saja, kadang-kadang area loker agak ramai di jam-jam tertentu.
                    </p>
                    <p class="font-thin">15 Mei 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Ahmad Fauzi</p>
                    <p class="customer-review">
                        Pengalaman saya di gym ini cukup memuaskan. Fasilitasnya modern dan lengkap,
                        dengan berbagai macam alat yang tersedia. Stafnya ramah dan selalu siap membantu.
                        Namun, area parkir agak terbatas sehingga kadang-kadang sulit mendapatkan tempat
                        parkir.
                    </p>
                    <p class="font-thin">25 April 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Dewi Kartika</p>
                    <p class="customer-review">
                        Saya suka gym ini karena memiliki suasana yang nyaman dan tidak terlalu ramai.
                        Fasilitas spa dan sauna juga menjadi nilai tambah bagi saya setelah sesi latihan
                        yang melelahkan. Program latihan yang ditawarkan sangat efektif dan membantu saya
                        dalam menurunkan berat badan.
                    </p>
                    <p class="font-thin">10 April 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Rudi Hartono</p>
                    <p class="customer-review">
                        Saya baru bergabung dengan gym ini dan sejauh ini sangat puas. Peralatan yang
                        disediakan sangat canggih dan selalu dalam kondisi baik. Instruktur pribadi yang
                        saya sewa sangat kompeten dan membantu saya menyusun program latihan yang sesuai
                        dengan kebutuhan saya.
                    </p>
                    <p class="font-thin">30 Maret 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Lina Marlina</p>
                    <p class="customer-review">
                        Gym ini benar-benar memenuhi harapan saya. Lokasinya strategis dan mudah
                        dijangkau. Fasilitas shower dan ruang ganti selalu bersih dan terawat. Saya juga
                        sangat menyukai program diet yang mereka tawarkan, sangat membantu saya dalam
                        menjaga pola makan yang sehat.
                    </p>
                    <p class="font-thin">20 Maret 2024</p>
                </div>
            </SplideSlide>
            <SplideSlide class="px-2 ">
                <div
                    class="w-full h-full py-5 px-7 bg-accent text-secondary font-light flex flex-col justify-center gap-4 rounded-lg">
                    <p class="font-bold text-xl">Joko Prasetyo</p>
                    <p class="customer-review">
                        Saya sangat menikmati latihan di gym ini. Instruktur yang ada sangat motivasional
                        dan selalu memberikan semangat. Program latihan yang bervariasi membuat saya tidak
                        bosan dan selalu termotivasi untuk datang ke gym. Selain itu, harga keanggotaan
                        juga cukup terjangkau dibandingkan dengan fasilitas yang ditawarkan.
                    </p>
                    <p class="font-thin">5 Maret 2024</p>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>
