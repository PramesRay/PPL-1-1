// src/globalState.js
import { ref } from 'vue'

// Ambil status login dari localStorage atau default ke false
const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true'

export const isLoggedIn = ref(savedLoginStatus)
