<!-- detail.vue -->
<template>
  <form @submit.prevent="order">
    <h2 class="justify-content-sm-center">Thanh Toán Đơn Hàng</h2>
    <div class="row">
      <div class="col-12 col-sm-8">
        <a-table
          :dataSource="products"
          :columns="columns"
          :scroll="{ x: 576 }"
          :pagination="false"
        >
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
              <span>{{ formatPrice(record[4]) }}</span>
            </template>
            <template v-if="column.key === 'sum'">
              <span>{{ formatPrice(record[3] * record[4]) }}</span>
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
      <div class="col-12 col-sm-4 bg-light">
        <h4 class="d-sm-flex justify-content-sm-center m-3">
          Thông tin nhận hàng
        </h4>
        <div class="row mb-3">
          <div class="col-12 col-sm-3 text-start text-sm-start">
            <label>
              <span> Họ tên:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-input
              placeholder="Tên người nhận"
              allow-clear
              v-model:value="fullname"
              id="nameInput"
            />
            <br />
            <div class="w-100">
              <small class="text-danger" v-if="errors.name" id="errorNameMessage"
                >Bắt buộc điền họ và tên tối đa 255 ký tự</small>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-3 text-start text-sm-start">
            <label>
              <span> Điện thoại:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-input
              placeholder="Số điện thoại"
              allow-clear
              v-model:value="phone"
              id="phoneInput"

            />
            <br />
            <div class="w-100">
              <small class="text-danger" v-if="errors.phone" id="errorPhoneMessage"
                >Bắt buộc điền số điện thoại đúng định dạng</small>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-3 text-start text-sm-start">
            <label>
              <span> Email:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-input placeholder="Email" allow-clear v-model:value="email"               
              id="emailInput"
            />
            
            <br />

            <div class="w-100">
              <small class="text-danger" v-if="errors.email" id="errorEmailMessage"
                >Bắt buộc điền email đúng định dạng</small>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-3 text-start text-sm-start">
            <label>
              <span> Địa chỉ:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-textarea
              placeholder="Địa chỉ"
              allow-clear
              v-model:value="address"
              id="addressInput"

            />
            <br />
          </div>

          <div class="col-12 col-sm-12 d-flex m-2">
            <div class="col-12 col-sm-4">
              <a-select
                show-search
                placeholder="Tỉnh"
                style="width: 100%"
                :options="city"
                :filter-option="filterOption"
                allow-clear
                v-model:value="city_id"
                @change="selectDistrict()"
                id="citySelect"

              ></a-select>
            </div>

            <div class="col-12 col-sm-4">
              <a-select
                show-search
                placeholder="Quận"
                style="width: 100%"
                :options="district"
                :filter-option="filterOption"
                allow-clear
                v-model:value="district_id"
                @change="selectWard()"
                id="districtSelect"

              ></a-select>
            </div>
            <div class="col-12 col-sm-4">
              <a-select
                show-search
                placeholder="Xã"
                style="width: 100%"
                :options="ward"
                :filter-option="filterOption"
                allow-clear
                v-model:value="ward_id"
                id="wardSelect"

              ></a-select>
            </div>
          </div>
          <div class="w-100 text-center">
            <small class="text-danger" v-if="errors.address" id="errorAddressMessage"
              >Bắt buộc chọn địa chỉ</small
            >
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-3 text-start text-sm-start">
            <label>
              <span> Ghi chú:</span>
            </label>
          </div>

          <div class="col-12 col-sm-8">
            <a-input placeholder="Ghi chú" allow-clear v-model:value="note"
              id="noteInput"
            />
            <br />
            <div class="w-100">
              <small class="text-danger" v-if="errors.note" id="errorNoteMessage"
                >Điền ghi chú tối đa 255 ký tự</small
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 m-3 d-sm-flex justify-content-sm-center">
            <router-link :to="{ name: 'cart' }" class="mr-2">
              <a-button>
                <span>Trở lại</span>
              </a-button>
            </router-link>

            <a-button
              type="primary"
              html-type="submit"
              style="margin-left: 30px"
              id="submitButton"
            >
              <span>Đặt hàng </span>
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
  
  <script>
import { defineComponent, ref, computed, toRefs, reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import {
  validateEmail,
  validatePhoneNumber,
  validateMaxLength,
  validateNotEmpty,
} from "../../stores/validate.js";

export default defineComponent({
  setup() {
    const router = useRouter();
    const errors = reactive({
      name: false,
      phone: false,
      email: false,
      address: false,
      note: false,
    });
    const products = ref([]); // Initialize as an empty array
    const user = reactive({
      email: "",
      phone: "",
      fullname: "",
      city_id: [],
      district_id: [],
      ward_id: [],
    });
    const note = ref("");
    const address = ref("");
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
    ];

    const city = ref([]);
    const district = ref([]);
    const ward = ref([]);

    const getCity = () => {
      axios
        .get("http://localhost/TMDT/admin/apiThanhPho.php")
        .then(function (response) {
          city.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const selectDistrict = () => {
      const id = user.city_id;
      axios
        .post(`http://localhost/TMDT/admin/apiQuan.php`, {
          params: {
            ID: id,
          },
        })
        .then(function (response) {
          // console.log(response);
          district.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const selectWard = () => {
      const id = user.district_id;
      axios
        .post(`http://localhost/TMDT/admin/apiXa.php`, {
          params: {
            ID: id,
          },
        })
        .then(function (response) {
          // console.log(response);
          ward.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const getCart = () => {
      axios
        .get("http://localhost/TMDT/admin/apiThemSPVaoGioHang.php")
        .then(function (response) {
          // handle success
          // console.log(response);
          products.value = response.data;
          // console.log(products);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const getUser = () => {
      axios
        .get("http://localhost/TMDT/admin/apiNguoiMua.php")
        .then(function (response) {
          user.fullname = response.data[0].nm_ten;
          user.email = response.data[0].nm_email;
          user.phone = response.data[0].nm_sdt;

          axios
            .get("http://localhost/TMDT/admin/apiDiaChiNguoiMua.php")
            .then(function (response) {
              address.value = "";
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
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
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const order = () => {
      if (checkValidate() == true) {
        axios
          .post("http://localhost/TMDT/admin/apiDiaChiNguoiMua.php", {
            matp: user.city_id,
            maqh: user.district_id,
            maxa: user.ward_id,
            sonha: address.value,
          })
          .then(function (response) {
            // console.log(response)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

        axios
          .post("http://localhost/TMDT/admin/apiTaoDonHang.php/", {
            tongtien: totalSum.value,
            tongSL: totalItem.value,
            ghichu: note.value,
          })
          .then(function (response) {
            // console.log(response);
            message.success("Đặt hàng thành công");
            router.push({ name: "customer-orders" });
            // console.log("dat hang")
          })
          .catch((error) => {
            console.error(error);
            alert("Đặt hàng thất bại.");
          });
      }
    };

    const checkValidate = () => {
      errors.address = user.city_id.length === 0;
      errors.address = user.district_id.length === 0;
      errors.address = user.ward_id.length === 0;

      errors.name =
        !validateNotEmpty(user.fullname) ||
        !validateMaxLength(user.fullname, 255);
      errors.phone = !validatePhoneNumber(user.phone);
      errors.email = !validateEmail(user.email);
      errors.note = !validateMaxLength(note.value, 255);

      if (
        errors.address == false &&
        errors.name == false &&
        errors.phone == false &&
        errors.email == false &&
        errors.note == false
      ) {
        return true;
      }else{
        return false;
      }
    };
    getCity();
    getCart();
    getUser();
    return {
      products,
      columns,
      formatPrice,
      totalSum,
      totalItem,
      order,
      ...toRefs(user),
      filterOption,
      address,
      note,
      city,
      district,
      ward,
      selectDistrict,
      selectWard,
      errors,
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
  