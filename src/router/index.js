import { createRouter, createWebHistory } from "vue-router";
import admin from './admin.js'
import view from './view.js'
const routes = [...admin, ...view];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;