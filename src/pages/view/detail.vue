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
          <div class="col-12 col-sm-2 text-start">
            <label>
              <span>Giá sản phẩm:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <strong>{{ formatPrice(price) }} Đ</strong>
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
      <div class="col-12 d-sm-flex justify-content-sm-center">
        <router-link :to="{ name: 'customer-products' }" class="mr-2">
          <a-button>
            <span>Trở lại</span>
          </a-button>
        </router-link>

        <a-button type="primary" style="margin-left: 30px;">
          <span>Thêm vào giỏ hàng</span>
        </a-button>
      </div>
    </div>
  </a-card>

  
  <!-- star list products -->
  <div class="mt-3">
    <h3>Sản phẩm liên quan</h3>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-3 mb-4">
        <div class="card">
          <router-link
            :to="{
              name: 'view-products-detail',
              params: { id: product.sp_id },
            }"
            class="text-black"
            @click="getProduct(product.sp_id)"
          >
            <img
              :src="product.sp_hinhAnh"
              class="card-img-top product-card"
              alt="Product Image"
            />
            <div class="card-body">
              <h5 class="card-title product-name">{{ product.sp_ten }}</h5>
              <!-- <p class="card-text">{{ product.sp_moTa }}</p> -->
              <p class="card-text">
                <strong>Giá: {{ formatPrice(product.sp_gia) }} Đ</strong>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

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
      category_id: 0,
      quantity: "",
      thumbUrl: "",
    });
    const products = ref([]); // Initialize as an empty array
    const route = useRoute();
    const id = route.params.id;
    const getProduct = (product_id) => {
      
      //   console.log(id);
      axios
        .post(`http://localhost/TMDT/admin/api1SanPham.php/`, product_id)
        .then((response) => {
          product.name = response.data[0].sp_ten;
          product.describe = response.data[0].sp_moTa;
          product.price = response.data[0].sp_gia;
          product.category_id = response.data[0].dm_id;
          product.quantity = response.data[0].sp_soLuong;
          product.thumbUrl = response.data[0].sp_hinhAnh;
        //   console.log(response);
        
          axios
          .post(`http://localhost/TMDT/admin/apiSanPhamDanhMuc.php/`, product.category_id)
          .then((response) => {
              products.value = response.data;
            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });

    };
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }; 
    getProduct(id);

    return {
      errors,
      ...toRefs(product),
      dateFormat,
      quantity_value,
      products,
      getProduct,
      formatPrice
    };
  },
});
</script>

<style>

/* Add custom styling for product cards here */
.product-card {
  width: 100%; /* Ensure the image spans the full width of the card */
  height: 200px; /* Set the fixed height for the image */
  object-fit: cover; /* Maintain aspect ratio and cover the entire space */
}
.product-name {
  min-height: 70px;
}
.text-black{
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the default text color */
  cursor: pointer; /* Show pointer cursor on hover */
}
.card:hover{
  transform: scale(1.05); /* Scale the element to 105% on hover */
  transition: transform 0.3s ease; /* Add a smooth transition effect */}
</style>