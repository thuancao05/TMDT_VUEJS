<template>
    <a-card title="Danh sách đơn hàng" style="width: 100%">
      <div class="row">
        <div class="col-12">
          <a-table :dataSource="orders" :columns="columns" :scroll="{ x: 576 }">
            <template #bodyCell="{ column, record, index }">

              <template v-if="column.key === 'index'">
                <span> {{ index + 1 }}</span>
              </template>

              <template v-if="column.key === 'order_id'">
                <span>{{ record.dh_id }}</span>
              </template>
  
              <template v-if="column.key === 'order_date'">
                <span>{{ record.dh_ngayDat }}</span>
              </template>

              <template v-if="column.key === 'customer_name'">
                <span>{{ record.nm_ten }}</span>
              </template>
  
              <template v-if="column.key === 'customer_phone'">
                <span>{{ record.nm_sdt }}</span>
              </template>
  
              <template v-if="column.key === 'total_payment'">
                <!-- <span>{{ record.dh_tongThanhToan }}</span> -->
                
                <a-input-number :disabled = "true"
                v-model:value="record.dh_tongThanhToan"
                :formatter="
                    (value) => ` ${record.dh_tongThanhToan}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                />

              </template>
  
              <template v-if="column.key === 'status'">
                <span>{{ record.tt_ten }}</span>
                
              </template>

              <template v-if="column.key === 'action'">
                <router-link
                  :to="{
                    name: 'admin-order-edit',
                    params: { id: record.dh_id },
                  }"
                >
                  <a-button type="primary" style="margin-right: 5px;">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </a-button>
                </router-link>
  
                <a-button
                  @click="destroy(record.dh_id)"
                  class="btn btn-secondary ml-2"
                >
                 <p >Hủy</p>
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
  import { Table } from "ant-design-vue";
  
  export default defineComponent({
    setup() {
      useMenu().onSelectedKeys(["admin-orders"]);
  
      const orders = ref([]);
      const status = ref([]);
      
      const columns = [
        {
          title: "#",
          key: "index",
          width: 100
        },
        {
          title: "ID đơn hàng",
          dataIndex: "order_id",
          key: "order_id",
          width: 150
        },
        {
          title: "Ngày đặt hàng",
          dataIndex: "order_date",
          key: "order_date",
        },
        {
          title: "Tên người nhận",
          dataIndex: "customer_name",
          key: "customer_name",
        },
        {
          title: "Số điện thoại",
          dataIndex: "customer_phone",
          key: "customer_phone",
        },
        {
          title: "Tổng thanh toán",
          dataIndex: "total_payment",
          key: "total_payment",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Công cụ",
          key: "action",
          fixed: "right",
        },
      ];

      const getOrders = () => {
        axios.get("http://localhost/TMDT/admin/apiTrangThai.php")
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data[0]);
                    status.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
        });
        axios
          .get("http://localhost/TMDT/admin/apiDonHang.php")
          .then(function (response) {
            // handle success
            // console.log(response);
            orders.value = response.data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      };
  
      const destroy = (id) => {
        if (confirm("Bạn có chắc chắn muốn hủy đơn hàng - ID: " + id)) {
          axios
            .delete(`http://localhost/TMDT/admin/apiDonHang.php?id=${id}`, id)
            .then(function (response) {
              message.success("Hủy thành công !");
              console.log(response);
              getOrders();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
      };

      const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

      getOrders();
      return {
        orders,
        columns,
        destroy,
        status,
        filterOption,
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