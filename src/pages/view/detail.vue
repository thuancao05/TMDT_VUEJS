<template>
  <a-card title="Chi tiết sản phẩm" style="width: 100%">
    <div class="row">
      <div class="col-12 col-sm-3">
        <div class="row">
          <div class="col-12 d-flex justify-content-center mb-3">
            <!-- Display the uploaded image -->
            <img
              v-if="thumbUrl"
              :src="thumbUrl"
              alt="Uploaded Image"
              style="max-width: 200px"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-9">
        <div class="row mb-3">
          <div class="col-12 col-sm-13 ml-3">
            <h4>{{ name }}</h4>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-13">
            <p>{{ describe }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-1 text-start">
            <label>
              <span>Giá :</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <b>{{ price }}</b>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-2 text-start">
            <label>
              <span>Số lượng:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-input-number
                v-model:value="quantity_value"
                :min="1"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-grid d-sm-flex justify-content-sm-center mx-auto">
        <router-link :to="{ name: 'customer-products' }" class="mr-2">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 mr-3">
            <span>Trở lại</span>
          </a-button>
        </router-link>

        <a-button type="primary" html-type="submit">
          <span>Thêm vào giỏ hàng</span>
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const errors = ref({});
    const dateFormat = "YYYY/MM/DD";
    const quantity_value = ref(1);
    const product = reactive({
      name: "",
      describe: "",
      price: "",
      date_of_manufacture: ref(),
      category_id: [],
      quantity: "",
      thumbUrl: "",
    });
    const route = useRoute();
    const getProduct = () => {
      const id = route.params.id;
      //   console.log(id);
      axios
        .post(`http://localhost/TMDT/admin/api1SanPham.php/`, id)
        .then((response) => {
          product.name = response.data[0].sp_ten;
          product.describe = response.data[0].sp_moTa;
          product.price = response.data[0].sp_gia;
          product.category_id = response.data[0].dm_id;
          product.quantity = response.data[0].sp_soLuong;
          product.thumbUrl = response.data[0].sp_hinhAnh;
          product.date_of_manufacture = ref(
            dayjs(response.data[0].sp_nsx, dateFormat)
          );
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
    return {
      errors,
      ...toRefs(product),
      dateFormat,
      quantity_value
    };
  },
});
</script>