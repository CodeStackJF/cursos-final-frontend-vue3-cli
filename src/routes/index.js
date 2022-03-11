import {createWebHistory, createRouter} from 'vue-router'
import Cursos from '@/views/Cursos.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    { 
        path: '/',
        name: 'Cursos',
        component: Cursos
    },
    { 
        path: '/Logout',
        name: 'Logout',
        component: Logout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;