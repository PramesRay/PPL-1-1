import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// splide
import VueSplide from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

// swal
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

axios.defaults.withCredentials = true

app.use(VueSplide)
app.use(VueSweetalert2)

app.use(router)
app.mount('#app')
