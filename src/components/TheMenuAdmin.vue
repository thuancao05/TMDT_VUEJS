<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    
  >
    <a-menu-item key="admin-dashboard" class="text-router">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <DashboardOutlined /> Trang chủ </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-products" id="productButton">
      <router-link :to="{ name: 'admin-products' }" class="text-router">
        <span> <TagOutlined /> Sản phẩm </span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-orders" id="orderButton">
      <router-link :to="{ name: 'admin-orders' }" class="text-router" >
        <span> <UnorderedListOutlined /> Đơn hàng </span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-category">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <AppstoreOutlined /> Danh mục </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-statistics">
      <!-- <router-link :to="{name: 'admin-roles'}"> -->
      <span> <LineChartOutlined /> Thống kê </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-customer">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <UsergroupAddOutlined /> Khách hàng </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-staff">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <UserOutlined /> Nhân viên </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-reset-password">
      <!-- <router-link :to="{name: 'admin-users'}"> -->
      <span> <KeyOutlined /> Đổi mật khẩu </span>
      <!-- </router-link> -->
    </a-menu-item>
    <a-menu-item key="admin-logout" @click="logout()" id="logoutButton">
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

<style scoped>
.text-router {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the default text color */
  cursor: pointer; /* Show pointer cursor on hover */
}
</style>