import { createRouter, createWebHistory } from "vue-router";
import admin from './admin.js'
import view from './view.js'
import login from './login.js'
import register from './register.js'
import customer from './customer.js'

const routes = [...admin, ...view, ...login, ...register, ...customer];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;