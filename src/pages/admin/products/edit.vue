<template>
  <form @submit.prevent="updateProducts">
    <a-card title="Chỉnh sửa sản phẩm" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-3">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <div id="image"></div>
              <div>
                <h2>Tải lên hình ảnh</h2>
                <input type="file" @change="handleFileUpload" ref="fileInput" />
                <br />
                <button @click="uploadImage" class="mt-2">Upload</button>
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
        </div>

        <div class="col-12 col-sm-9">
          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
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

            <div class="col-12 col-sm-8">
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
                <small class="text-danger" v-if="errors.name">Bắt buộc điền tên sản phẩm có độ dài tối đa 255 ký tự</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.describe,
                  }"
                  >Mô tả:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-8">
              <a-textarea
                placeholder="Mô tả"
                allow-clear
                v-model:value="describe"
                :rows="13"
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
            <div class="col-12 col-sm-2 text-start text-sm-end">
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

            <div class="col-12 col-sm-8">
              <a-input-number
                v-model:value="price"
                :formatter="
                  (value) => ` ${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              />

              <div class="w-100">
                <small class="text-danger" v-if="errors.price">Bắt buộc nhập giá</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
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
              ></a-select>
              <div class="w-100">
                <small class="text-danger" v-if="errors.category">Bắt buộc chọn danh mục</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
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

            <div class="col-12 col-sm-8">
              <a-input-number
                v-model:value="quantity"
                :formatter="
                  (value) =>
                    ` ${quantity}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              />

              <div class="w-100">
                <small class="text-danger" v-if="errors.quantity">Bắt buộc nhập số lượng</small>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-2 text-start text-sm-end">
              <label>
                <span
                  :class="{
                    'text-danger': errors.date_of_manufacture,
                  }"
                  >Ngày sản xuất:</span
                >
              </label>
            </div>

            <div class="col-12 col-sm-8">
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
import { useRoute } from "vue-router";
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
    const route = useRoute();
    const router = useRouter();
    const category = ref([]);
    const selectedFile = ref(null);
    const imageUrl = ref(null);
    const products = reactive({
      id:"",
      name: "",
      describe: "",
      price: "",
      date_of_manufacture: ref(dayjs(), dateFormat),
      category_id: [],
      quantity: "",
      thumbUrl: "",
    });

    const errors = reactive({
      name: false,
      category: false,
      price: false,
      describe: false,
      quantity: false,
    });

    const checkValidate = (products) => {
      // console.log(products);
      errors.category = products.category_id.length === 0;
      errors.name =
        !validateNotEmpty(products.name) ||
        !validateMaxLength(products.name, 255);
      errors.price = !validateNotEmpty(products.price);
      errors.quantity = !validateNotEmpty(products.quantity);

      if (
        errors.category == false &&
        errors.name == false &&
        errors.price == false &&
        errors.quantity == false
      ) {
        return true;
      }
    };

    const getProductsEdit = () => {
      const id = route.params.id;
      products.id = id;
      axios
        .get("http://localhost/TMDT/admin/apiDanhMuc.php")
        .then((response) => {
          category.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post(`http://localhost/TMDT/admin/apiSanPham.php/`, id)
        .then((response) => {
          products.name = response.data[0].sp_ten;
          products.describe = response.data[0].sp_moTa;
          products.price = response.data[0].sp_gia;
          products.category_id = response.data[0].dm_id;
          products.quantity = response.data[0].sp_soLuong;
          products.thumbUrl = response.data[0].sp_hinhAnh;
          products.date_of_manufacture = ref(
            dayjs(response.data[0].sp_nsx, dateFormat)
          );
          imageUrl.value = products.thumbUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const updateProducts = () => {
      if (checkValidate(products)) {
        axios
          .put(`http://localhost/TMDT/admin/apiSanPham.php/`, products)
          .then((response) => {
            if (response.status == 200) {
              console.log(response)
              message.success("Cập nhật thành công !");
              getProductsEdit();
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
          products.thumbUrl = response.data.data.url;
          alert("Thêm hình ảnh thành công!");
        })
        .catch((error) => {
          console.error(error);
          alert("Thêm hình ảnh thất bại.");
        });
    };
    getProductsEdit();

    return {
      filterOption,
      errors,
      category,
      dateFormat,
      updateProducts,
      ...toRefs(products),
      selectedFile,
      imageUrl,
      handleFileUpload,
      uploadImage,
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
</style>