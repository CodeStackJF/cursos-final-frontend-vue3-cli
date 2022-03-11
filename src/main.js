import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

axios.defaults.baseURL = 'https://codestackapi.com/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

createApp(App).use(router).use(VueAxios, axios).mount('#app')