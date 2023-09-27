<template>
  <header>
    <router-link
      :to="{
        name: 'customer-products',
      }"
      class="text-white"
    >
      <div class="logo" id="logo">
        <img src="../assets/logo.png" alt="Logo" style="max-width: 60px" />
        Sáng Tạo Điện Tử
      </div>
    </router-link>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'cart' }">
            <ShoppingCartOutlined />
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'customer-profile' }">
            <UserOutlined />
          </router-link>
        </li>

        <li >
          <a id="logoutBtn" href="#" @click="logout()">
            <LogoutOutlined />
          </a>
        </li>
        <li>
          <b class="msg">{{ username }}</b>
        </li>
      </ul>
    </nav>
  </header>
  <div class="search-style">
    <a-input-search
      v-model:value="searchValue"
      placeholder="Bạn cần tìm sản phẩm nào..."
      style="width: 300px"
      @search="onSearch()"
    />
  </div>
</template>
  <script>
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const searchKey = ref(0);
export default defineComponent({
  components: {
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
  },
  name: "Header",
  setup() {
    const router = useRouter();
    const username = ref("Xin chào ");
    const searchValue = ref("");
    const checkAuth = () => {
      axios
        .get(`http://localhost/TMDT/admin/check-auth.php`)
        .then((response) => {
          // console.log(response);
          username.value += response.data.username;

          // if(response.data.user != 'admin'){
          //   router.push({name: "login"})
          // }else{
          // }
        })
        .catch((error) => {
          // router.push({ name: "login" });

          console.log(error);
        });
    };
    const logout = () => {
      axios
        .get(`http://localhost/TMDT/admin/apiLogout.php`)
        .then(function (response) {
          // console.log(response);
          router.push({ name: "login" });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const onSearch = () => {
      searchKey.value += 1;
      // console.log(searchValue.value);
      // Update the route with the new search key as a query parameter
      router.push({
        name: "search-products",
        params: { id: searchValue.value },
        query: { key: searchKey.value },
        state: { reload: true }, // Add a state property to trigger re-render
      });
    };

    checkAuth();
    return {
      logout,
      username,
      onSearch,
      searchValue,
    };
  },
});
</script>
  
  <style scoped>
/* Add your header styles here */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  background-color: #f37435;
  border-radius: 10px;
  margin: 5px;
}

.logo {
  font-size: 30px;
  display: inline-block;
  font-weight: bold;
}

nav ul {
  list-style-type: none;
  padding-top: 10px;
  display: inline-flex;
}

nav li {
  margin-right: 30px;
  align-items: center;
  display: inline-flex;
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 30px; /* Adjust the font size as needed */
}
nav a :hover {
  color: blue;
}
.msg {
  display: inline-flex;
}

.search-style {
  text-align: center;
  background-color: deepskyblue;
  padding: 5px;
  border-radius: 10px;
  margin: 5px;
}
</style>