<template>
  <form @submit.prevent="createProducts">
    <a-card title="Tạo mới sản phẩm" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <div>
                <h4>Tải lên hình ảnh</h4>
                <input type="file" @change="handleFileUpload" ref="fileInput" id="chooseImageButton"/>
                <br />
                <button @click="uploadImage" class="mt-2 upload" id="uploadImageButton">Upload</button>
                <br />
                <!-- Display the uploaded image -->
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Uploaded Image"
                  style="max-width: 200px"
                />
              </div>
            </div>
          </div>
          <div class="w-100">
            <small
              class="text-danger"
              v-if="errors.image"
              id="errorImageMessage"
              >Bắt buộc tải lên ảnh</small
            >
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
                id="nameInput"
              />

              <br />
              <div class="w-100">
                <small
                  class="text-danger"
                  v-if="errors.name"
                  id="errorNameMessage"
                  >Bắt buộc điền tên sản phẩm có độ dài tối đa 255 ký tự</small
                >
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
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
                :rows="13"
                :class="{
                  'input-danger': errors.describe,
                }"
                id="describeInput"
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
                id="priceInput"
              />

              <div class="w-100">
                <small
                  class="text-danger"
                  v-if="errors.price"
                  id="errorPriceMessage"
                  >Bắt buộc nhập giá</small
                >
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span
                  :class="{
                    'text-danger': errors.category,
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
                  'input-danger': errors.category,
                }"
                id="categoryInput"
              ></a-select>
              <div class="w-100">
                <small
                  class="text-danger"
                  v-if="errors.category"
                  id="errorCategoryMessage"
                  >Bắt buộc chọn danh mục</small
                >
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
                id="quantityInput"
              />

              <div class="w-100">
                <small
                  class="text-danger"
                  v-if="errors.quantity"
                  id="errorQuantityMessage"
                  >Bắt buộc nhập số lượng</small
                >
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
                id="dateInput"
              />
              <div class="w-100">
                <small
                  class="text-danger"
                  v-if="errors.date"
                  id="errorDateMessage"
                  >Bắt buộc nhập ngày sản xuất hợp lệ</small
                >
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
          <a-button type="primary" html-type="submit" id="submitButton">
            <span>Thêm sản phẩm mới</span>
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
import {
  validateEmail,
  validatePhoneNumber,
  validateMaxLength,
  validateNotEmpty,
} from "../../../stores/validate.js";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-products"]);

    const dateFormat = "YYYY/MM/DD";
    const toDate = new dayjs();
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
    const errors = reactive({
      name: false,
      category: false,
      price: false,
      describe: false,
      quantity: false,
      date: false,
      image: false,
    });

    const getProductsCreate = () => {
      axios
        .get("http://localhost/TMDT/admin/apiDanhMuc.php")
        .then((response) => {
          // console.log(response);
          category.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadImage = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", selectedFile.value);

      axios
        .post("http://localhost/TMDT/admin/upload1.php", formData)
        .then((response) => {
          // console.log(response.data);
          imageUrl.value = response.data.data.url; // Set the uploaded image URL
          products.thumbUrl = response.data.data.url;
          message.success("Thêm hình ảnh thành công")
        })
        .catch((error) => {
          console.error(error);
          message.error("Thêm hình ảnh thất bại")
        });
    };

    const checkValidate = (products) => {
      errors.category = products.category_id.length === 0;
      errors.name =
        !validateNotEmpty(products.name) ||
        !validateMaxLength(products.name, 255);
      errors.price = !validateNotEmpty(products.price);
      errors.quantity = !validateNotEmpty(products.quantity);
      errors.image = !validateNotEmpty(products.name);
      errors.date = dayjs(products.date_of_manufacture, dateFormat).isAfter(dayjs(toDate, dateFormat));

      if (
        errors.category == false &&
        errors.name == false &&
        errors.price == false &&
        errors.quantity == false &&
        errors.date == false &&
        errors.image == false
      ) {
        return true;
      }
    };
    const createProducts = () => {
      if (checkValidate(products)) {
        axios
          .post("http://localhost/TMDT/admin/apiTaoSanPham.php/", products)
          .then(function (response) {
            message.success("Thêm sản phẩm thành công !");
            router.push({ name: "admin-products" });
          })
          .catch((error) => {
            console.error(error);
            alert("Thêm sản phẩm thất bại.");
          });
      }
    };
    getProductsCreate();

    return {
      category,
      ...toRefs(products),
      filterOption,
      createProducts,
      errors,
      dateFormat,
      selectedFile,
      imageUrl,
      handleFileUpload,
      uploadImage,
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

.upload {
  background-color: cadetblue;
  color: white;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
}
</style>