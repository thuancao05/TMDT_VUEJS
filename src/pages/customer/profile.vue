<template>
  <form @submit.prevent="updateUser">
    <a-card title="Chỉnh sửa thông tin " style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-3">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <div id="image"></div>
              <div>
                <h2>Tải lên hình ảnh</h2>
                <input type="file" @change="handleFileUpload" ref="fileInput" />
                <br />
                <button @click="uploadImage" class="mt-2 upload">Upload</button>
                <br />
                <!-- Display the uploaded image -->
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Uploaded Image"
                  style="max-width: 300px"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-9">
          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.name,
                  }"
                >
                  Họ và tên:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-8">
              <a-input
                placeholder="Tên sản phẩm"
                allow-clear
                v-model:value="name"
              />
              <br />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span> Số điện thoại:</span>
              </label>
            </div>

            <div class="col-12 col-sm-8">
              <a-input
                placeholder="Số điện thoại"
                allow-clear
                v-model:value="phone"
              />
              <br />
              <span v-if="!isPhoneValid" class="error-message"
                >Số điện thoại không đúng định dạng !</span
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.name,
                  }"
                >
                  Email:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-8">
              <a-input placeholder="Email" v-model:value="email" readonly />
              <br />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.name,
                  }"
                >
                  Password:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-8">
              <a-input-password
                placeholder="Mật khẩu"
                allow-clear
                v-model:value="password"
              />
              <br />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <router-link :to="{ name: 'admin-products' }">
            <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
              <span>Hủy</span>
            </a-button>
          </router-link>
          <a-button type="primary" html-type="submit">
            <span>Lưu</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>
  <script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useMenu } from "../../stores/use-menu.js";
import axios from "axios";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["customer-profile"]);

    const dateFormat = "YYYY/MM/DD";
    const route = useRoute();
    const router = useRouter();
    const category = ref([]);
    const selectedFile = ref(null);
    const imageUrl = ref(null);
    const user = reactive({
      name: "",
      avatar: "",
      password: "",
      email: "",
      phone: "",
    });

    const errors = ref({});
    const isPhoneValid = ref(true); // Initially assume email is valid
    const getUserEdit = () => {
      axios
        .get(`http://localhost/TMDT/admin/apiNguoiMua.php/`)
        .then((response) => {
          // console.log(response);
          user.name = response.data[0].nm_ten;
          user.email = response.data[0].nm_email;
          user.phone = response.data[0].nm_sdt;
          user.password = response.data[0].nm_matKhau;
          user.avatar = response.data[0].nm_hinhAnh;

          imageUrl.value = user.avatar;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const updateUser = () => {
      if(!validatePhoneNumber(user.phone)){
        isPhoneValid.value = false;
      }else{
        axios
        .post(`http://localhost/TMDT/admin/apiNguoiMua.php/`, user)
        .then((response) => {
          if (response.status == 200) {
            console.log(response);

            // message.success("Cập nhật thành công !");
            // router.push({name:"admin-users"});
          }
        })
        .catch((error) => {
          console.log(error);
          errors.value = error.response.data.errors;
        });
      }

    };

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadImage = () => {
      const formData = new FormData();
      formData.append("image", selectedFile.value);

      axios
        .post("http://localhost/TMDT/admin/upload1.php", formData)
        .then((response) => {
          // console.log(response.data);
          imageUrl.value = response.data.data.url; // Set the uploaded image URL
          user.avatar = response.data.data.url;
          alert("Thêm hình ảnh thành công!");
        })
        .catch((error) => {
          console.error(error);
          alert("Thêm hình ảnh thất bại.");
        });
    };

    const validatePhoneNumber = (phone) => {
      // Regular expression to match a 10-digit phone number
      const phoneRegex = /^[0-9]{10}$/;

      return phoneRegex.test(phone);

    };
    getUserEdit();

    return {
      filterOption,
      errors,
      validatePhoneNumber,
      category,
      dateFormat,
      updateUser,
      ...toRefs(user),
      selectedFile,
      imageUrl,
      handleFileUpload,
      uploadImage,
      isPhoneValid
    };
  },
});
</script>
  
  <style scoped>
.select-danger {
  border: 1px solid red;
}
.input-danger {
  border-color: red;
}
.upload {
  background-color: cadetblue;
  color: white;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 3px;
}
</style>