import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
window.axios = axios;

import {

     Image,
     Upload,
     InputNumber,
     DatePicker,
     Checkbox,
     Input,
     Select,
     Avatar,
     Table,
     Card,
     Menu,
     List,
     Drawer,
     Button,
     message, 
     CheckableTag
} from 'ant-design-vue';

import './static/fontawesome-free-6.4.2-web/css/all.min.css';
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // You can choose minified version if you prefer.
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Image);
app.use(Upload);
app.use(InputNumber);
app.use(DatePicker);
app.use(Checkbox);
app.use(Input);
app.use(Select);
app.use(Avatar);
app.use(Table);
app.use(Card);
app.use(Menu);
app.use(List);
app.use(Button);
app.use(Drawer);
app.mount("#app");

app.config.globalProperties.$message = message;
