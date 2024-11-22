import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import SettingNodeView from '../views/SettingNodeView.vue';
import EtoView from '../views/EtoView.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthView
        },
        {
            path: '/settings/nodes',
            name: 'NodeSetting',
            component: SettingNodeView
        },
        {
            path: '/analyze/eto',
            name: 'Eto',
            component: EtoView
        }
    ]
});

export default router;