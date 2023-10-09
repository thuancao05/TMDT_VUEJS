<template>
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'admin-products-create' }">
          <a-button type="primary" id="addProductButton">
            <router-link :to="{ name: 'admin-products-create' }">
              <i class="fa-solid fa-plus"></i>
            </router-link>
          </a-button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table :dataSource="products" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              <span> {{ index + 1 }}</span>
            </template>

            <div v-if="column.key === 'product_thumbnail'" class="image-cell">
              <img :src="record.sp_hinhAnh" alt="Image" class="max-width-100" />
            </div>
            <div v-else>
              {{ record[column.key] }}
            </div>

            <template v-if="column.key === 'product_name'">
              <span>{{ record.sp_ten }}</span>
            </template>

            <template v-if="column.key === 'price'" >
              <span>{{ formatPrice(record.sp_gia) }}</span>
            </template>

            <template v-if="column.key === 'quantity'">
              <span>{{ record.sp_soLuong }}</span>
            </template>

            <template v-if="column.key === 'action'">
              <router-link
                :to="{
                  name: 'admin-products-edit',
                  params: { id: record.sp_id },
                }"
              >
                <a-button type="primary" class="mr-2">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a-button>
              </router-link>

              <a-button
                type="danger"
                @click="destroy(record.sp_id, record.sp_ten)"
                id="deleteProductButton"
              >
                <i class="fa-solid fa-trash"></i>
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMenu } from "../../../stores/use-menu.js";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-products"]);

    const products = ref([]);

    const columns = [
      {
        title: "#",
        key: "index",
        width: 100
      },
      {
        title: "Hình ảnh",
        dataIndex: "product_thumbnail",
        key: "product_thumbnail",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
        width: 500
      },
      {
        title: "Giá bán",
        dataIndex: "price",
        key: "price",
        width: 150
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        width: 100
      },
      {
        title: "Công cụ",
        key: "action",
        fixed: "right",
      },
    ];

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

    const destroy = (id, name) => {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm: " + name)) {
        axios
          .delete(`http://localhost/TMDT/admin/apiTaoSanPham.php?id=${id}`, id)
          .then(function (response) {
            message.success("Xóa thành công !");
            console.log(response);
            getProducts();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    };
    const  formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };    
    getProducts();
    return {
      products,
      columns,
      destroy,
      formatPrice
    };
  },
});
</script>

<style scoped>
.image-cell {
  display: flex;
  align-items: center;
}
.max-width-100 {
  max-width: 100px;
  height: auto; /* Maintain aspect ratio */
}
</style>