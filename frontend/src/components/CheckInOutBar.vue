<template>
    <button id="check-in-pop-up"
        class="fixed w-20 h-20 bg-white text-accent bottom-10 right-20 rounded flex z-40 hover:scale-95 duration-75"
        @click.prevent="ciPop()">
        <p class="m-auto px-2 text-center font-medium text-lg">Check In</p>
    </button>
    <button id="qr-pop-up"
        class="fixed w-20 h-20 bg-white bottom-10 right-20 rounded opacity-0 duration-150 hover:scale-95 "
        @click.prevent="qrPop()">
        <img src='../assets/qr-placeholder.png' alt="qr" class="bg-cover bg-center p-2" />
    </button>
    <div id="count-pop-up"
        class="fixed w-40 h-20 bg-white bottom-10 right-20 rounded flex flex-col justify-center items-center font-medium text-lg opacity-0 duration-300 cursor-default">
        <p>On Gym Count</p>
        <span class="font-bold">46</span>
    </div>

    <div id="check-in-qr" class="w-full fixed h-screen z-50 top-full backdrop-blur flex duration-300 text-black">
        <img id="qr-image" src='../assets/qr-placeholder.png' alt="qr" class="bg-cover bg-center m-auto h-5/6" />
        <button class="absolute right-20 top-16" @click.prevent="closePop()">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <path
                        d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="white"
                        d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" />
                </g>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'CheckInOutBar',
    methods: {
        ciPop() {
            const qrPopUp = document.getElementById('qr-pop-up');
            const countPopUp = document.getElementById('count-pop-up');

            qrPopUp.classList.toggle('-translate-y-24');
            qrPopUp.classList.toggle('opacity-0');
            countPopUp.classList.toggle('-translate-y-48');
            countPopUp.classList.toggle('opacity-0');

            // qrPopUp.classList.toggle('scale-0');
            // qrPopUp.classList.toggle('bottom-10');
            // qrPopUp.classList.toggle('bottom-36');
            // qrPopUp.classList.toggle('scale-100');
            // countPopUp.classList.toggle('bottom-10');
            // countPopUp.classList.toggle('bottom-[15.5rem]');
            // countPopUp.classList.toggle('scale-0');
            // countPopUp.classList.toggle('scale-100');
        },
        qrPop() {
            const checkInQr = document.getElementById('check-in-qr');

            checkInQr.classList.remove('top-full');
            checkInQr.classList.add('top-0');
        },
        closePop() {
            const qrPopUp = document.getElementById('qr-pop-up');
            const countPopUp = document.getElementById('count-pop-up');
            const checkInQr = document.getElementById('check-in-qr');

            checkInQr.classList.remove('top-0');
            checkInQr.classList.add('top-full');

            qrPopUp.classList.remove('bottom-36');
            qrPopUp.classList.add('bottom-10');
            qrPopUp.classList.remove('scale-100');
            qrPopUp.classList.add('scale-0');
            countPopUp.classList.remove('bottom-[15.5rem]');
            countPopUp.classList.add('bottom-10');
            countPopUp.classList.remove('scale-100');
            countPopUp.classList.add('scale-0');
        }
    }
}
</script>