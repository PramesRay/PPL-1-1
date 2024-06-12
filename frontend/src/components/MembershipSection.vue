<template>
    <div class="container mx-auto p-3 mt-16 px-16">
        <h2 class="font-extrabold w-full text-center text-3xl">MEMBERSHIP</h2>
        <div class="grid grid-cols-3 gap-8 mt-10 items-center">
            <div class="rounded-xl bg-[url('./assets/membership-bronze.png')] bg-cover bg-center w-full h-[25rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="text-center w-full font-primary font-semibold text-2xl invisible group-hover:visible">
                        Bronze
                    </h4>
                    <ul
                        class="pl-4 list-disc my-auto mx-7 flex flex-col gap-1 font-semibold invisible group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>1 sesi konsultasi Personal Trainer</li>
                        <li>Akses kelas grup Reguler</li>
                        <li>Penggunaan sauna</li>
                        <li>Diskon 10% pembelian suplemen</li>
                    </ul>
                    <button
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>
            <div class="rounded-xl bg-[url('./assets/membership-gold.png')] bg-cover bg-center w-full h-[32rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="w-full text-center font-primary font-semibold text-3xl invisible group-hover:visible">
                        Gold
                    </h4>
                    <ul
                        class="pl-4 list-disc my-auto mx-7 flex flex-col gap-1 font-semibold invisible group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>4 sesi konsultasi Personal Trainer</li>
                        <li>Akses kelas grup Reguler, Spesial, dan Eksklusif</li>
                        <li>Penggunaan sauna, kolam renang, dan spa</li>
                        <li>Diskon 20% pembelian suplemen</li>
                        <li>1 sesi evaluasi kesehatan dan kebugaran</li>
                        <li>Prioritas booking kelas dan Personal Trainer</li>
                    </ul>
                    <button
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>
            <div
                class="rounded-xl bg-[url('./assets/membership-platinum.png')] bg-cover bg-center w-full h-[25rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="w-full text-center font-primary font-semibold text-2xl invisible group-hover:visible">
                        Silver
                    </h4>
                    <ul
                        class="pl-4 list-disc my-auto mx-7 flex flex-col gap-1 font-semibold invisible group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>2 sesi konsultasi personal trainer</li>
                        <li>Akses kelas grup reguler dan spesial</li>
                        <li>Penggunaan sauna dan kolam renang</li>
                        <li>Diskon 15% pembelian suplemen</li>
                    </ul>
                    <button
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MembershipSection',
}
</script>