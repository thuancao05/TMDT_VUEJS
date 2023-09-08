<template>
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
    >
        <a-menu-item key="admin-dashboard">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <DashboardOutlined /> Trang chủ
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-products">
            <router-link :to="{name: 'admin-products'}">
                <span>
                    <TagOutlined/> Sản phẩm
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-orders">
            <router-link :to="{name: 'admin-orders'}">
                <span>
                    <UnorderedListOutlined /> Đơn hàng
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-category">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <AppstoreOutlined /> Danh mục
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-statistics">
            <!-- <router-link :to="{name: 'admin-roles'}"> -->
                <span>
                    <LineChartOutlined /> Thống kê
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-customer">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <UsergroupAddOutlined /> Khách hàng
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-staff">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <UserOutlined/> Nhân viên
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-reset-password">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <KeyOutlined /> Đổi mật khẩu
                </span>
            <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="admin-logout">
            <!-- <router-link :to="{name: 'admin-users'}"> -->
                <span>
                    <LogoutOutlined /> Đăng xuất
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
import { UserOutlined, TagOutlined, DashboardOutlined,
        UnorderedListOutlined, AppstoreOutlined, LineChartOutlined,
        UsergroupAddOutlined, KeyOutlined,LogoutOutlined  } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        UserOutlined,
        TagOutlined,
        DashboardOutlined,
        UnorderedListOutlined,
        AppstoreOutlined,
        LineChartOutlined,
        UsergroupAddOutlined,
        KeyOutlined,
        LogoutOutlined

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