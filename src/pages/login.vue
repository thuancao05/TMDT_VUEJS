<template>
  <div class="login-container">
    <img
      src="../assets/logo.png"
      alt="logo"
      style="height: 200px; width: 200px"
      class="justify-content-sm-center"
    />
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form justify-content-sm-center">
      <div class="form-group">
        <label for="email">Email:</label>
        <a-input
          placeholder="Email"
          allow-clear
          v-model:value="email"
          id="emailInput"
        />
        <span v-if="errors.email" class="error-message"
          >Bắt buộc nhập email đúng định dạng !</span
        >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <a-input-password
          placeholder="Mật khẩu"
          v-model:value="password"
          allow-clear
          id="passwordInput"
        />
        <span v-if="errors.password" class="error-message"
        >Bắt buộc nhập mật khẩu !</span
      >
      </div>
      <span v-if="authenticated" class="error-message">
        Sai tên đăng nhập hoặc mật khẩu !</span
      >
      <button type="submit" class="btn-login" id="loginButton">Login</button>
    </form>
    <button
      id="registerButton"
      class="btn-register login-container"
      @click="register()"
    >
      Register
    </button>
  </div>
</template>
  
  <script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import {
  validateEmail,
  validatePhoneNumber,
  validateMaxLength,
  validateNotEmpty,
} from "../stores/validate.js";
export default defineComponent({
  setup() {
    const isEmailValid = ref(true); // Initially assume email is valid
    const authenticated = ref(false);
    const router = useRouter();
    const user = reactive({
      email: "thuan@gmail.com",
      password: "thuan123",
    });
    const errors = reactive({
      email: false,
      password: false,
    });
    const validateEmail = (email) => {
      // Regular expression for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
    const checkAuth = () => {
      axios
        .get(`http://localhost/TMDT/admin/check-auth.php`)
        .then((response) => {
          // console.log(response);
          if (response.data.user == "admin") {
            router.push({ name: "admin-products" });
          } else {
            router.push({ name: "customer-products" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const checkValidate = () => {
      errors.email = !validateEmail(user.email);
      errors.password = !validateNotEmpty(user.password);

      if (errors.email == false && errors.password == false) {
        return true;
      }
    };
    const login = () => {
      if (checkValidate() == true) {
          axios
            .post("http://localhost/TMDT/admin/apiLogin.php/", user)
            .then((response) => {
              console.log(response.data);
              if (response.data == "Login_fail") {
                authenticated.value = true;
              } else {
                checkAuth();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        
      }
    };

    onMounted(() => {
      checkAuth();
    });

    const register = () => {
      router.push({ name: "register" });
    };

    return {
      login,
      authenticated,
      ...toRefs(user),
      register,
      errors
    };
  },
});
</script>
  
  <style scoped>
.login-container {
  max-width: 400px;
  margin: auto auto;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center; /* Center its children horizontally */
}

h2 {
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  text-align: left;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-login {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #0056b3;
}
.btn-register {
  margin: 20px;
  padding: 10px;
  background-color: #9ea2a7;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #e8edf3;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 3px;
}
</style>
  