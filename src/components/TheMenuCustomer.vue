<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
  >
    <a-menu-item key="customer-profile">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <DashboardOutlined /> Hồ sơ </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="customer-orders">
      <!-- <router-link :to="{ name: 'admin-products' }"> -->
        <span> <TagOutlined /> Đơn hàng của bạn </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="customer-address">
      <!-- <router-link :to="{ name: 'admin-orders' }"> -->
        <span> <UnorderedListOutlined /> Quản lý địa chỉ </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="customer-products">
      <router-link :to="{name: 'customer-products'}">
      <span> <AppstoreOutlined /> Trở về trang mua hàng </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="customer-logout" @click="logout()">
      <span> <LogoutOutlined /> Đăng xuất </span>
    </a-menu-item>

  </a-menu>
</template>
<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "../stores/use-menu.js";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

import {
  UserOutlined,
  TagOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
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
    LogoutOutlined,
  },
  setup() {
    const store = useMenu();
    const { selectedKeys, openKeys } = store;
    const router = useRouter();

    const logout = () => {
        axios
          .get(`http://localhost/TMDT/admin/apiLogout.php`)
          .then(function (response) {
            message.success("Đã đăng xuất!");
            // console.log(response);
            router.push({name: "login"})

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
    }
    return {
      ...storeToRefs(store),
      logout
    };
  },
});
</script>