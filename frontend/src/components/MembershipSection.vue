<script setup>
const paymentPopUp = async () => {
    try {
        // Ganti dengan transaksi_id yang sesuai
        const transaksiId = 18; // Contoh transaksi_id, ubah sesuai kebutuhan Anda

        // Meminta token transaksi dari backend
        const response = await fetch(`http://localhost:3001/get-transaction-token/${transaksiId}`);
        const data = await response.json();

        if (data.token) {
            // Memulai pembayaran dengan token yang diperoleh
            window.snap.pay(data.token, {
                onSuccess: async function (result) {
                    console.log('Payment success:', result);

                    // Memanggil API untuk memperbarui status transaksi
                    const updateResponse = await fetch(`http://localhost:3001/transaction-done/${transaksiId}`, {
                        method: 'PUT'
                    });

                    if (updateResponse.ok) {
                        const updateData = await updateResponse.json();
                        alert(updateData.message);
                    } else {
                        console.error('Failed to update transaction status');
                    }
                },
                onPending: function (result) {
                    console.log('Payment pending:', result);
                    alert('Payment pending, please complete the payment.');
                },
                onError: function (result) {
                    console.error('Payment failed:', result);
                    alert('Payment failed, please try again.');
                },
                onClose: function () {
                    console.log('Payment popup closed.');
                }
            });
        } else {
            console.error('Failed to get transaction token:', data.message);
            alert('Failed to get transaction token, please try again.');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('An error occurred, please try again.');
    }
}
</script>

<template>
    <div class="container mx-auto p-3 mt-6 lg:mt-16 px-5 lg:px-16">
        <h2 id="membership" class="font-extrabold w-full text-center text-3xl">MEMBERSHIP</h2>
        <div class="grid lg:grid-cols-3 gap-3 lg:gap-5 mt-10 items-center">
            <!--  -->
            <div class="rounded-xl bg-[url('./assets/membership-bronze.png')] bg-cover bg-center w-full h-[25rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="text-center w-full font-primary font-semibold text-2xl invisible group-hover:visible">
                        Bronze
                    </h4>
                    <ul
                        class="w-fit lg:px-10 pl-4 list-disc my-auto mx-7 sm:m-auto flex flex-col gap-1 font-semibold invisible text-sm xl:text-base group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>1 sesi konsultasi Personal Trainer</li>
                        <li>Akses kelas grup Reguler</li>
                        <li>Penggunaan sauna</li>
                        <li>Diskon 10% pembelian suplemen</li>
                    </ul>
                    <button @click.prevent="paymentPopUp"
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>

            <!--  -->
            <div
                class="order-last lg:order-none rounded-xl bg-[url('./assets/membership-gold.png')] bg-cover bg-center w-full h-[32rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="w-full text-center font-primary font-semibold text-3xl invisible group-hover:visible">
                        Gold
                    </h4>
                    <ul
                        class="w-fit lg:px-10 pl-4 list-disc my-auto mx-7 sm:m-auto flex flex-col gap-1 font-semibold invisible text-sm xl:text-base group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>4 sesi konsultasi Personal Trainer</li>
                        <li>Akses kelas grup Reguler, Spesial, dan Eksklusif</li>
                        <li>Penggunaan sauna, kolam renang, dan spa</li>
                        <li>Diskon 20% pembelian suplemen</li>
                        <li>1 sesi evaluasi kesehatan dan kebugaran</li>
                        <li>Prioritas booking kelas dan Personal Trainer</li>
                    </ul>
                    <button @click.prevent="paymentPopUp"
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>

            <!--  -->
            <div
                class="rounded-xl bg-[url('./assets/membership-platinum.png')] bg-cover bg-center w-full h-[25rem] flex">
                <div class="w-full h-full flex flex-col py-10 hover:backdrop-blur-3xl rounded-xl group duration-300">
                    <h4 class="w-full text-center font-primary font-semibold text-2xl invisible group-hover:visible">
                        Silver
                    </h4>
                    <ul
                        class="w-fit lg:px-10 pl-4 list-disc my-auto mx-7 sm:m-auto flex flex-col gap-1 font-semibold invisible text-sm xl:text-base group-hover:visible">
                        <li>Akses tanpa batas</li>
                        <li>2 sesi konsultasi personal trainer</li>
                        <li>Akses kelas grup reguler dan spesial</li>
                        <li>Penggunaan sauna dan kolam renang</li>
                        <li>Diskon 15% pembelian suplemen</li>
                    </ul>
                    <button @click.prevent="paymentPopUp"
                        class="bg-accent text-secondary px-5 py-2 font-bold mx-auto rounded hover:scale-95 duration-75 invisible group-hover:visible">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
