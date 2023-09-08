<template>
    <header>
      <router-link
      :to="{
        name: 'customer-products'
      }"
      class="text-white"
      >
        <div class="logo">
            <img src="../assets/logo.png" alt="Logo" style="max-width:60px">
            Sáng Tạo Điện Tử
        </div>
      </router-link>
        <nav>
          <ul>
            <li><a href="#">
                <SearchOutlined />
            </a></li>
            <li><a href="#">
                <ShoppingCartOutlined />
            </a></li>
            <li><a href="#">
                <UserOutlined />
            </a></li>
          </ul>
        </nav>
      </header>
  </template>
  <script>
  import {SearchOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {defineComponent} from 'vue';

  export default defineComponent({
    components: {
        SearchOutlined,
        ShoppingCartOutlined,
        UserOutlined
    },
    name: 'Header',
})
  </script>
  
  <style scoped>
  /* Add your header styles here */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;
    background-color: #007bff;
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
  }
  
  nav a {
    text-decoration: none;
    color: white;
    font-size: 30px; /* Adjust the font size as needed */

  }
  nav a :hover{
    color: red;
  }
  </style>