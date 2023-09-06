<template>
  
  <form @submit.prevent="createProducts">
    <a-card title="Tạo mới tài khoản" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">

              <div>
                <h1>Image Upload</h1>
                <input type="file" @change="handleFileUpload" ref="fileInput" />
                <button @click="uploadImage" class="mb-2">Upload</button>
            
                <!-- Display the uploaded image -->
                <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" style="max-width:200px"/>
              </div>

            </div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.name,
                  }"
                >
                  Tên sản phẩm:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-7">
              <a-input
                placeholder="Tên sản phẩm"
                allow-clear
                v-model:value="name"
                :class="{
                  'input-danger': errors.name,
                }"
              />

              <br />
              <div class="w-100">
                <small class="text-danger" v-if="errors.name">{{
                  errors.name[0]
                }}</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.describe,
                  }"
                  >Mô tả:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-7">
              <a-textarea
                placeholder="Mô tả"
                allow-clear
                v-model:value="describe"
                :row="10"
                :class="{
                  'input-danger': errors.describe,
                }"
              />
              <br />
              <div class="w-100">
                <small class="text-danger" v-if="errors.describe">{{
                  errors.describe[0]
                }}</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.price,
                  }"
                  >Giá bán:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-7">
              <a-input-number
                v-model:value="price"
                :formatter="
                  (value) => ` ${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              />

              <div class="w-100">
                <small class="text-danger" v-if="errors.price">{{
                  errors.price[0]
                }}</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.category_id,
                  }"
                  >Danh mục:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-5">
              <a-select
                show-search
                placeholder="Danh mục"
                style="width: 100%"
                :options="category"
                :filter-option="filterOption"
                allow-clear
                v-model:value="category_id"
                :class="{
                  'input-danger': errors.category_id,
                }"
              ></a-select>
              <div class="w-100">
                <small class="text-danger" v-if="errors.category_id">{{
                  errors.category_id[0]
                }}</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.quantity,
                  }"
                  >Số lượng:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-7">
              <a-input-number
                v-model:value="quantity"
                :formatter="
                  (value) =>
                    ` ${quantity}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              />

              <div class="w-100">
                <small class="text-danger" v-if="errors.quantity">{{
                  errors.quantity[0]
                }}</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.date_of_manufacture,
                  }"
                  >Ngày sản xuất:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-7">
              <a-date-picker
                v-model:value="date_of_manufacture"
                :format="dateFormat"
              />
              <div class="w-100">
                <small class="text-danger" v-if="errors.date_of_manufacture">{{
                  errors.price[0]
                }}</small>
              </div>
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
import { useMenu } from "../../../stores/use-menu.js";
import axios from "axios";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import ChildComponent from "./uploadimg.vue";

export default defineComponent({
  components: {
    'child-component': ChildComponent, // Register the child component
    },

  setup() {
    useMenu().onSelectedKeys(["admin-users"]);

    const dateFormat = "YYYY/MM/DD";
    const router = useRouter();
    const category = ref([]);
    const selectedFile = ref(null);
    const imageUrl = ref(null);
    const products = reactive({
      name: "",
      describe: "",
      price: "1000",
      date_of_manufacture: ref(dayjs("2023/01/01", dateFormat)),
      category_id: [],
      quantity: "1",
      thumbUrl: "",
    });
    const errors = ref({});

    const getProductsCreate = () => {
      axios
        .get("http://localhost/TMDT/admin/apiDanhMuc.php")
        .then((response) => {
          // console.log(response);
          // console.log(response.data[0]);
          category.value = response.data;
          // console.log(category.value[0].dm_ten);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const createProducts = () => {
      axios
        .post("http://localhost/TMDT/admin/apiTaoSanPham.php/", products)
        .then(function (response) {
          console.log(response.data);
        });
    };
    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadImage = () => {
      const formData = new FormData();
      formData.append('image', selectedFile.value);

      axios
        .post('http://localhost/TMDT/admin/upload1.php', formData)
        .then((response) => {
          console.log(response.data);
          imageUrl.value = response.data.data.url; // Set the uploaded image URL
          products.thumbUrl= response.data.data.url;
          alert('Image uploaded successfully!');
        })
        .catch((error) => {
          console.error(error);
          alert('Error uploading image.');
        });
    };
    
    getProductsCreate();

    return {
      category,
      ...toRefs(products),
      filterOption,
      createProducts,
      errors,
      dateFormat,
      selectedFile, imageUrl, handleFileUpload, uploadImage
    };
  },
  
});
</script>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>