<template>
    <TheHeader/>
    <div class="container-fluid mt-3 productContainer">
        <div class="row mr-5">
                <div class="col-sm-2 mt-3 d-none d-sm-flex">
                    <a-list bordered style="with:100%; background-color: #007bff; height:200px" class="text-white">
                        <TheMenu/>
                        <template #header >
                        <b>Danh mục sản phẩm</b>
                        </template>
                    </a-list>
                </div>
                <div class="col-sm-10 mt-3">
                    <router-view></router-view>
                </div>
        </div>
    </div>
    <TheFooter/>

</template>
<script>
    import TheHeader from "../components/TheHeaderIndex.vue";
    import TheMenu from "../components/TheMenuIndex.vue";
    import TheFooter from "../components/TheFooterIndex.vue";
    export default{
        components:{
            TheHeader,
            TheMenu,
            TheFooter
        }
    }
</script>

<style>

.productContainer {
    width: 90%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    background-color: #E9ECEF;
  }
</style>