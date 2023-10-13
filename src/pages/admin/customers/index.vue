<template>
  <a-card title="Danh sách khách hàng" style="width: 100%">
    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="customers"
          :columns="columns"
          :scroll="{ x: 576 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              <span> {{ index + 1 }}</span>
            </template>

            <template v-if="column.key === 'customer_email'">
              <span>{{ record.nm_email }}</span>
            </template>

            <template v-if="column.key === 'customer_name'">
              <span>{{ record.nm_ten }}</span>
            </template>

            <template v-if="column.key === 'customer_phone'">
              <span>{{ record.nm_sdt }}</span>
            </template>

            <template v-if="column.key === 'status'">
              <span>{{ record.nm_trangThai }}</span>
            </template>

            <template v-if="column.key === 'action'">
              <router-link
                :to="{
                  name: 'admin-order-edit',
                  params: { id: record.nm_id },
                }"
              >
                <a-button type="primary" style="margin-right: 5px">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a-button>
              </router-link>

              <a-button
                @click="destroy(record.nm_id, record.nm_ten)"
                class="btn btn-secondary ml-2"
              >
                <p>Xóa</p>
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

    const customers = ref([]);
    const status = ref([]);

    const columns = [
      {
        title: "#",
        key: "index",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "customer_email",
        key: "customer_email",
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
      axios
        .get("http://localhost/TMDT/admin/apiNguoiMua.php")
        .then(function (response) {
          // handle success
          console.log(response);
          customers.value = response.data;

          for (var i = 0; i < customers.value.length; i++) {
            console.log(customers.value[0].nm_trangThai);
            if (customers.value[i].nm_trangThai == 1) {
              customers.value[i].nm_trangThai = "Hoạt động";
            }
            if (customers.value[i].nm_trangThai == 0) {
              customers.value[i].nm_trangThai = "Bị chặn";
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const destroy = (id, name) => {
      if (confirm("Bạn có chắc chắn muốn xóa khách hàng: " + name)) {
        axios
          .delete(`http://localhost/TMDT/admin/apiNguoiMua.php?id=${id}`, id)
          .then(function (response) {
            message.success("Xóa thành công !");
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
      customers,
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