<!-- detail.vue -->
<template>
  <div>
    <h2 class="justify-content-sm-center">Giỏ Hàng</h2>

    <a-table :dataSource="products" :columns="columns" :scroll="{ x: 576 }">
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
          <a-button type="danger" @click="destroy(record.sp_id, record.sp_ten)">
            <i class="fa-solid fa-trash primary"></i>
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
  
  <script>
import { defineComponent, ref,reactive } from "vue";
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
        title: "Xóa sản phẩm",
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
            // console.log(response);
            products.value = response.data;
            console.log(products);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const destroy = (id, username) => {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm: " + username)) {
        axios
          .delete(`http://localhost/TMDT/admin/apiTaoSanPham.php?id=${id}`, id)
          .then(function (response) {
            message.success("Xóa thành công !");
            // console.log(response);
            getProducts();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    };

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };    
    getCart();
    return {
      products,
      columns,
      destroy,
      formatPrice
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
  