<template>
    <form @submit.prevent="">
      <a-card title="Cập nhật đơn hàng" style="width: 100%">
        <div class="row">
          <div class="col-12 col-sm-4">
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>ID Đơn hàng:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <span>{{ id }}</span>
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>Tên người nhận:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <span>{{ name }}</span>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>SĐT người nhận:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <span>{{ phone }}</span>
              </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-sm-4 text-start text-sm-end">
                  <label>
                    <span>Địa chỉ:</span>
                  </label>
                </div>
    
                <div class="col-12 col-sm-8">
                  <span>{{ address }}</span>
                </div>
              </div>
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>Ngày đặt hàng:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <span>{{ date_of_order }}</span>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>Tống số lượng sản phẩm:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <span>{{ totalItem }}</span>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 col-sm-4 text-start text-sm-end">
                <label>
                  <span>Tống thanh toán:</span>
                </label>
              </div>
  
              <div class="col-12 col-sm-8">
                <b>{{ formatPrice(totalSum) }} Đ</b>
              </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-12 col-sm-4 text-start text-sm-end">
                  <label>
                    <span>Trạng thái đơn hàng :</span>
                  </label>
                </div>
    
                <div class="col-12 col-sm-8">
                  <b>{{ status_id }} </b>
                </div>
              </div>
          </div>
  
          <div class="col-12 col-sm-8">
            <a-table
              :dataSource="products"
              :columns="columns"
              :scroll="{ x: 576 }"
            >
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'index'">
                  <span> {{ index + 1 }}</span>
                </template>

  
                <template v-if="column.key === 'product_name'">
                  <span>{{ record.sp_ten }}</span>
                </template>
  
                <template v-if="column.key === 'price'">
                  <span>{{ formatPrice(record.gh_donGia) }}</span>
                </template>
  
                <template v-if="column.key === 'quantity'">
                  <span>{{ record.gh_soLuong }}</span>
                </template>
                <template v-if="column.key === 'totalSum'">
                  <span>{{
                    formatPrice(record.gh_donGia * record.gh_soLuong)
                  }}</span>
                </template>
              </template>
            </a-table>
          </div>
        </div>
  
        <div class="row">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <router-link :to="{ name: 'customer-orders' }">
              <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                <span>Trở lại</span>
              </a-button>
            </router-link>
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
  import { useRoute } from "vue-router";
  import dayjs from "dayjs";
  export default defineComponent({
    setup() {
      useMenu().onSelectedKeys(["admin-products"]);
  
      const dateFormat = "YYYY/MM/DD";
      const route = useRoute();
      const status = ref([]);
      const products = ref([]);
  
      const orders = reactive({
        id: "",
        name: "",
        note: "",
        date_of_order: "",
        totalSum: "",
        totalItem: "",
        phone: "",
        status_id: "",
        address: "",

      });
      const columns = [
        {
          title: "#",
          key: "index",
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
          dataIndex: "totalSum",
          key: "totalSum",
          width: 100,
        },
      ];
      const getOrderEdit = () => {
        const id = route.params.id;
        orders.id = id;
        axios
          .get("http://localhost/TMDT/admin/apiTrangThaiDonHang.php")
          .then((response) => {
            status.value = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
  
        axios
          .post(`http://localhost/TMDT/admin/apiChiTietDonHang.php`, id)
          .then((response) => {
            products.value = response.data;
            // console.log(products.value);
          })
          .catch((error) => {
            console.log(error);
          });
  
        axios
          .post(`http://localhost/TMDT/admin/apiDonHang.php/`, id)
          .then((response) => {
            console.log(response);
            orders.name = response.data[0].nm_ten;
            orders.phone = response.data[0].nm_sdt;
            orders.address = response.data[0].dc_sonha + ", " + response.data[0].dc_xa + ", " +response.data[0].dc_tinh + ", " +response.data[0].dc_thanhpho;;
            orders.note = response.data[0].dh_ghiChu;
            orders.totalSum = response.data[0].dh_tongThanhToan;
            orders.totalItem = response.data[0].dh_soLuong;
            orders.date_of_order = response.data[0].dh_ngayDat, dateFormat
            
            orders.status_id = response.data[0].tt_ten;
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      const updateOrders = () => {
        axios
          .put(`http://localhost/TMDT/admin/apiDonHang.php/`, orders)
          .then((response) => {
            if (response.status == 200) {
              // console.log(response);
              message.success("Cập nhật thành công !");
              getOrderEdit();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      const filterOption = (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };
      const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
  
      const printPage = () => {
        window.print();
      };
      getOrderEdit();
  
      return {
        filterOption,
        status,
        dateFormat,
        updateOrders,
        ...toRefs(orders),
        products,
        columns,
        formatPrice,
        printPage
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