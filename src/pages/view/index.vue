<template>
  <!-- star slier -->
  <div class="slider" style="height:250px">
    <div class="slide">
      <img :src="currentImage" alt="Slider Image" />
    </div>
    <button @click="prevSlide">Previous</button>
    <button @click="nextSlide">Next</button>
  </div>
  <!-- end slier -->

  <!-- star list products -->
  <div class="mt-3">
    <h2>Sản phẩm</h2>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
        <div class="card">
          <router-link
            :to="{
              name: 'view-products-detail',
              params: { id: product.sp_id },
            }"
            class="text-black"
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
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";

export default defineComponent({
  setup() {
    const images = ref([
      "https://i.ibb.co/x6tZf6f/banner1.jpg",
      "https://i.ibb.co/41bMTMh/banner2.jpg",
      "https://i.ibb.co/k02Q80p/banner3.jpg",
      // Add more image URLs here
    ]);
    const currentIndex = ref(0);
    const intervalId = ref(null);
    const products = ref([]); // Initialize as an empty array

    const prevSlide = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      } else {
        // Wrap around to the last slide if at the beginning
        currentIndex.value = images.value.length - 1;
      }
    };

    const nextSlide = () => {
      if (currentIndex.value < images.value.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    };

    const currentImage = computed(() => images.value[currentIndex.value]);

    // Function to start auto-scrolling
    const startAutoScroll = () => {
      intervalId.value = setInterval(() => {
        nextSlide();
      }, 2500); // Change the time interval as needed (in milliseconds)
    };

    // Function to stop auto-scrolling
    const stopAutoScroll = () => {
      clearInterval(intervalId.value);
      intervalId.value = null;
    };

    // Start auto-scrolling when the component is mounted
    onMounted(() => {
      startAutoScroll();
    });

    // Stop auto-scrolling when the component is unmounted
    onBeforeUnmount(() => {
      stopAutoScroll();
    });

    const getProducts = () => {
      axios
        .get("http://localhost/TMDT/admin/apiSanPham.php")
        .then(function (response) {
          // handle success
          // console.log(response);
          products.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };    

    getProducts();
    return {
      images,
      currentIndex,
      prevSlide,
      nextSlide,
      currentImage,
      products,
      formatPrice,
    };
  },
});
</script>

<style>
.slider {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
}

.slide {
  flex: 0 0 100%;
  transition: transform 0.3s ease-in-out;
}

img {
  width: 100%;
  height: auto;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

button:first-child {
  left: 10px;
}

button:last-child {
  right: 10px;
}

/* Add custom styling for product cards here */
.product-card {
  width: 100%; /* Ensure the image spans the full width of the card */
  height: 300px; /* Set the fixed height for the image */
  object-fit: cover; /* Maintain aspect ratio and cover the entire space */
}
.product-name {
  height: 50px;
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

