<template>
  <div class="login-container justify-content-sm-center">
    <img
      src="../assets/logo.png"
      alt="logo"
      style="max-height: 200px"
      class="justify-content-sm-center"
    />
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <a-input
          placeholder="Email"
          allow-clear
          v-model:value="email"
          required
        />
        <span v-if="!isEmailValid" class="error-message"
          >Email không đúng định dạng !</span
        >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <a-input-password
          placeholder="Mật khẩu"
          v-model:value="password"
          allow-clear
          required
        />
      </div>
      <span v-if="authenticated" class="error-message">
        Sai tên đăng nhập hoặc mật khẩu !</span>

      <button type="submit" class="btn-login">Login</button>
    </form>
  </div>
</template>
  
  <script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const isEmailValid = ref(true); // Initially assume email is valid
    const authenticated = ref(false);
    const router = useRouter();
    const user = reactive({
      email: "thuan@gmail.com",
      password: "thuan123",
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
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const login = () => {
      if (!validateEmail(user.email)) {
        isEmailValid.value = false;
      } else {
        axios
          .post("http://localhost/TMDT/admin/apiLogin.php/", user)
          .then((response) => {
            // console.log(response.data);
            if (response.data == "Login_fail") {
              authenticated.value = true;
            } else {
              checkAuth();
              router.push({ name: "admin-products" });
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

    return {
      login,
      isEmailValid,
      authenticated,
      ...toRefs(user),
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
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 3px;
}
</style>
  