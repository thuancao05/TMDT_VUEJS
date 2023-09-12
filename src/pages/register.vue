<template>
  <div class="login-container">
    <img
      src="../assets/logo.png"
      alt="logo"
      style="height: 200px; width: 200px"
      class="justify-content-sm-center"
    />
    <h2>Register</h2>
    <form @submit.prevent="register" class="login-form justify-content-sm-center">
      <div class="form-group">
        <label for="email">Your name:</label>
        <a-input
          placeholder="Tên người dùng"
          allow-clear
          v-model:value="name"
          required
        />
      </div>

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
        Email đã được đăng ký trước đó !</span
      >
        <button type="submit" class="btn-login" >Register</button>
    </form>
    <button class="btn-register login-container" @click="login()">Login</button>

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
      email: "",
      password: "",
      name: ""
    });
    const validateEmail = (email) => {
      // Regular expression for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const register = () => {
      if (!validateEmail(user.email)) {
        isEmailValid.value = false;
      } else {
        axios
          .post("http://localhost/TMDT/admin/apiSigup.php/", user)
          .then((response) => {
            // console.log(response.data);
            if (response.data == "Email already exists") {
              authenticated.value = true;
            } else if(response.data == "Register Fail !") {
              // console.log("Thất bại !");
              message.error("Đăng ký thất bại !")

            }else{
              // console.log("Thành công");
              message.success("Đăng ký thành công !")
              router.push({name: "login"});
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const login = () =>{
      router.push({ name: "login" });
    }


    return {
      isEmailValid,
      authenticated,
      ...toRefs(user),
      login
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
.btn-register{
  padding: 10px;
  background-color: #9ea2a7;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 3px;
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
  