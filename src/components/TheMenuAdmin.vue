<template>
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
    >
        <a-menu-item key="admin-users">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <UserOutlined/> Tài Khoản
                </span>
            <!-- </router-link> -->
        </a-menu-item>

        <a-menu-item key="admin-roles">
            <!-- <router-link :to="{name: 'admin-roles'}"> -->
                <span>
                    <TagOutlined/> Vai trò
                </span>
            <!-- </router-link> -->
        </a-menu-item>

        <a-menu-item key="admin-settings">
            <!-- <router-link :to="{name: 'admin-settings'}">-->
                <span>Cài đặt</span>
            <!--</router-link> -->
        </a-menu-item>
    </a-menu>
</template>
<script>
import {defineComponent} from 'vue';
import { storeToRefs } from 'pinia'
import {useMenu} from '../stores/use-menu.js';
import { UserOutlined, TagOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        UserOutlined,
        TagOutlined,

    },
    setup(){
        const store = useMenu();
        const {selectedKeys, openKeys } =store;
        return{
            ...storeToRefs(store),
        };
    },
});
</script>