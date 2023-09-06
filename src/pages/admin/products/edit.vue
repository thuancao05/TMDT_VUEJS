<template>
        <form @submit.prevent="updateProducts">
            <a-card title="Tạo mới tài khoản" style="width: 100%">
                <div class="row">
                    <div class="col-12 col-sm-4">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center mb-3">
                                <div id="image"></div>
                                <!-- <a-upload
                                    v-model:file-list="thumbUrl"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    list-type="picture-card"
                                    @preview="handlePreview"
                                    >
                                    <div v-if="thumbUrl.length < 1">
                                        <plus-outlined />
                                        <div style="margin-top: 8px">Upload</div>
                                    </div>
                                </a-upload> -->
    
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-8">
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
    
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.name
                                    }">
                                        Tên sản phẩm:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-7">
                                <a-input placeholder="Tên sản phẩm" allow-clear 
                                v-model:value="name"
                                :class="{
                                    'input-danger': errors.name
                                }"/>
                                
                                <br />
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.describe
                                    }">Mô tả:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-7">
                                <a-textarea placeholder="Mô tả" allow-clear 
                                v-model:value="describe"
                                :row="10"
                                :class="{
                                    'input-danger': errors.describe
                                }"/>
                                <br />
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.describe">{{ errors.describe[0] }}</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.price
                                    }">Giá bán:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-7">
                                <a-input-number
                                    v-model:value="price"
                                    :formatter="value => ` ${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                    />
    
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.price">{{ errors.price[0] }}</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.category_id
                                    }">Danh mục:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-5">
                                <a-select
                                    show-search
                                    placeholder="Danh mục"
                                    style="width: 100%"
                                    :options="category"
                                    :filter-option="filterOption"
                                    allow-clear
                                    v-model:value="category_id"
                                    :class="{
                                        'input-danger': errors.category_id
                                    }"
                                ></a-select>
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.quantity
                                    }">Số lượng:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-7">
                                <a-input-number
                                v-model:value="quantity"
                                :formatter="value => ` ${quantity}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                />
    
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.quantity">{{ errors.quantity[0] }}</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <label>
                                    <span :class="{
                                        'text-danger': errors.date_of_manufacture
                                    }">Ngày sản xuất:</span>
                                </label>
                            </div>
    
                            <div class="col-12 col-sm-7">
                                <a-date-picker 
                                v-model:value="date_of_manufacture" 
                                :format="dateFormat"
                                />
                                <div class="w-100">
                                    <small class="text-danger" v-if="errors.date_of_manufacture">{{ errors.price[0] }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                        <router-link :to="{name:'admin-products'}">
                            <a-button class=" me-0 me-sm-2 mb-3 mb-sm-0">
                                <span>Hủy</span>
                            </a-button>
                        </router-link>
                        <a-button type="primary" html-type="submit">
                            <span>Lưu</span>
                        </a-button>
                    </div>
                </div>
            </a-card>
        </form>
    
</template>
<script>
    import { defineComponent, ref, reactive, toRefs } from 'vue';
    import {useMenu} from '../../../stores/use-menu.js';
    import axios from 'axios';
    import {message} from 'ant-design-vue';
    import {useRouter} from 'vue-router';
    import {useRoute} from 'vue-router';
    import dayjs from 'dayjs';
    export default defineComponent({
    setup(){
        useMenu().onSelectedKeys(["admin-users"]);

        const dateFormat = 'YYYY/MM/DD';
        const route = useRoute();
        const router = useRouter();
        const category = ref([]);
        const products = reactive({
            name:"",
            describe:"",
            price:"",
            date_of_manufacture:ref(),
            category_id:[],
            quantity: "",
            thumbUrl: []

        });

        const errors = ref({});


        const getProductsEdit = () =>{
                const id = route.params.id;
                console.log(id);
            axios.get("http://localhost/TMDT/admin/apiDanhMuc.php")
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data[0]);
                    category.value = response.data;
                    console.log(category.value[0].dm_ten);
                })
                .catch((error) => {
                    console.log(error);
                });
            axios.post(`http://localhost/TMDT/admin/apiSanPham.php/`, id )
            .then((response) => {

                products.name = response.data[0].sp_ten;
                products.describe = response.data[0].sp_moTa;
                products.price = response.data[0].sp_gia;
                products.category_id = response.data[0].dm_id;
                products.quantity = response.data[0].sp_soLuong;
                products.thumbUrl = response.data[0].sp_hinhAnh;
                products.date_of_manufacture = ref(dayjs(response.data[0].sp_nsx, dateFormat));

                const base64 = btoa(
                new Uint8Array(products.thumbUrl).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )    )
                setImage(base64)
                document.getElementById('image').innerHTML = '<img src="' + products.thumbUrl + '" id="imageBox"/>';
                
                console.log(products.value);
            })
            .catch((error) => {
                console.log(error);
                
            })
        };

        const updateProducts =() =>{
            axios.put(`http://127.0.0.1:8000/api/users/${route.params.id}`,)
            .then((response) => {
                if(response.status == 200){
                    message.success("Cập nhật thành công !");
                    // router.push({name:"admin-users"});
                }
            })
            .catch((error) => {
                console.log(error);
                errors.value = error.response.data.errors;
                
            })
        };
 
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        getProductsEdit();

        return{
            
            filterOption,
            errors,
            category,
            dateFormat,
            updateProducts,
            ...toRefs(products),
        }
    },
    });
</script>

<style>
.select-danger{
    border:1px solid red ;
}
.input-danger{
    border-color: red ;
}
</style>