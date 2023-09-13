<!-- detail.vue -->
<template>
  <div>
    <h2 class="justify-content-sm-center">Giỏ Hàng</h2>

    <a-table :dataSource="products" :columns="columns" :scroll="{ x: 576 }" :pagination="false">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <span> {{ index + 1 }}</span>
        </template>

        <div v-if="column.key === 'product_thumbnail'" class="image-cell">
          <img :src="record[2]" alt="Image" class="max-width-100" />
        </div>
        <div v-else>
          {{ record[column.key] }}
        </div>

        <template v-if="column.key === 'product_name'">
          <span>{{ record[1] }}</span>
        </template>

        <template v-if="column.key === 'price'">
            <span>{{ formatPrice(record[3]) }}</span>
        </template>

        <template v-if="column.key === 'quantity'">
          <a-input-number v-model:value="record[4]" :min="1" />
        </template>
        <template v-if="column.key === 'sum'">
            <span>{{ formatPrice(record[3]*record[4]) }}</span>
          </template>

        <template v-if="column.key === 'delete'">
          <a-button type="danger" @click="destroy(index, record[1])">
            <i class="fa-solid fa-trash primary"></i>
          </a-button>
        </template>
      </template>
      <template #footer>
        <h4>
        Tổng cộng - Số lượng sản phẩm:
        <b style="margin: auto 5px">{{ formatPrice(totalItem) }} Cái </b>
        || Thành tiền:
        <b style="color: red; margin-left: 5px">
          {{ formatPrice(totalSum) }} Đ</b
        >
      </h4>
      </template>
    </a-table>
  </div>

  <div class="row">
    <div class="col-12 m-3 d-sm-flex justify-content-sm-center">
      <router-link :to="{ name: 'customer-products' }" class="mr-2">
        <a-button>
          <span>Trở lại trang chủ</span>
        </a-button>
      </router-link>

      <router-link :to="{ name: 'payment' }" class="mr-2">
      <a-button type="primary" style="margin-left: 30px">
        <span>Đặt hàng </span>
      </a-button>
    </router-link>

    </div>
  </div>
</template>
  
  <script>
import { defineComponent, ref,computed  } from "vue";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const products = ref([]); // Initialize as an empty array

    const columns = [
      {
        title: "#",
        key: "index",
        width: 100,
      },
      {
        title: "Hình ảnh",
        dataIndex: "product_thumbnail",
        key: "product_thumbnail",
        width: 100,
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
        width: 500,
      },
      {
        title: "Giá bán",
        dataIndex: "price",
        key: "price",
        width: 150,
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        width: 100,
      },
      {
        title: "Thành tiền",
        dataIndex: "sum",
        key: "sum",
        width: 100,
      },
      {
        title: "Bỏ chọn",
        dataIndex: "delete",
        key: "delete",
        width: 150,
      },
    ];

    const getCart = () => {
      axios
        .get("http://localhost/TMDT/admin/apiThemSPVaoGioHang.php")
        .then(function (response) {
          // handle success
            console.log(response);
            products.value = response.data;
            // console.log(products);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const destroy = (id, name) => {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm: " + name)) {
        axios
          .delete(`http://localhost/TMDT/admin/apiThemSPVaoGioHang.php?id=${id}`, id)
          .then(function (response) {
            message.success("Xóa thành công !");
            //  console.log(response);
            getCart();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    };
    // Calculate the total sum using a computed property
    const totalSum = computed(() => {
      return products.value.reduce((sum, product) => {
        return sum + product[3] * product[4]; // Assuming price is at index 3 and quantity at index 4
      }, 0);
    });
    const totalItem = computed(() => {
      return products.value.reduce((sum, product) => {
        return sum + product[4]; // Assuming price is at index 3 and quantity at index 4
      }, 0);
    });
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };    
    getCart();
    return {
      products,
      columns,
      destroy,
      formatPrice,
      totalSum,
      totalItem
    };
  },
});
</script>

<style>
h2 {
  text-align: center;
}

.image-cell {
  display: flex;
  align-items: center;
}
.max-width-100 {
  max-width: 100px;
  height: auto; /* Maintain aspect ratio */
}
</style>
  