<template>
    <a-card title="Tài khoản" style="width: 100%">
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <router-link :to="{name: 'admin-products-create'}">
                    <a-button type="primary">
                        <router-link :to="{name: 'admin-products-create'}">
                        <i class="fa-solid fa-plus"></i>
                        </router-link>
                    </a-button>
                </router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="products" :columns="columns" :scroll="{ x: 576 }" :pagination="false"  @scroll="handleTableScroll"
                ref="myTable">

                    <template #bodyCell="{ column, record }">

                        <template v-if="column.key === 'index'">
                            <span> <img src="{{ record.sp_id}}" alt=""> </span>
                        </template>

                        <template v-if="column.key === 'thumbnail'">
                            <span>{{ record.sp_id}}</span>
                        </template>

                        <template v-if="column.key === 'product_name'">
                            <span>{{ record.sp_ten}}</span>

                        </template>

                        <template v-if="column.key === 'price'">
                            <span>{{record.sp_gia}}</span>
                        </template>

                        <template v-if="column.key === 'quantity'">
                            <span>{{record.sp_soLuong}}</span>
                        </template>

                        <template v-if="column.key === 'action'">
                            <router-link :to="{name: 'admin-products-edit', params: {id: record.sp_id}}">
                                <a-button type="primary" class="mr-2">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a-button>
                             </router-link> 
                            
                            <a-button type="danger" @click="destroy(record.sp_id, record.sp_ten)">
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
import { defineComponent, ref } from 'vue';
import {useMenu} from '../../../stores/use-menu.js';
import {message} from 'ant-design-vue';
import { Table } from 'ant-design-vue';

    export default defineComponent({
        components: {
            ATable: Table, // Register the a-table component
        },
        setup(){
            useMenu().onSelectedKeys(["admin-users"]);


            const products = ref([]);
            
            const columns = [
                {
                    title: '#',
                    key: 'index',
                },
                {
                    title: 'Hình ảnh',
                    dataIndex: 'product_thumbnail',
                    key: 'product_thumbnail',
                },
                {
                    title: 'Tên sản phẩm',
                    dataIndex: 'product_name',
                    key: 'product_name',
                },
                {
                    title: 'Giá bán',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: 'Số lượng',
                    dataIndex: 'quantity',
                    key: 'quantity',
                },
                {
                    title: 'Công cụ',
                    key: 'action',
                    fixed: 'right',
                },
            ]

            const tableData = ref([]); // Your table data
    const currentPageIndex = ref(1); // Initial page index
    const pageSize = 10; // Number of items per page


    // Calculate the total number of pages
    const totalPageCount = ref(Math.ceil(tableData.length / pageSize));

    // Function to get the current page's data
    const getCurrentPageData = () => {
      const startIndex = (currentPageIndex.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return tableData.value.slice(startIndex, endIndex);
    };

    // Pagination configuration
    const paginationConfig = ref({
      current: currentPageIndex.value,
      pageSize: pageSize,
      total: tableData.value.length,
      showSizeChanger: false, // Hide option to change page size
      showQuickJumper: true, // Show quick jumper for page navigation
      showTotal: (total) => `Total ${total} items`,
      onChange: (page) => {
        currentPageIndex.value = page;
      },
    });

    
    const getProducts = () =>{
                
                axios.get('http://localhost/TMDT/admin/apiSanPham.php')
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

            const destroy = (id, username) => {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm: ' + username)) {
                axios.delete(`http://localhost/TMDT/admin/apiTaoSanPham.php?id=${id}`, id)
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
        }
        getProducts();
        return {
            products,
            columns,
            destroy,
            
            tableData,
                columns,
                getCurrentPageData,
                paginationConfig,
                
            }
        },
        
    });

</script>