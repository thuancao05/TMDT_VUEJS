<template>
    <TheHeader/>
    <div class="container-fluid mt-3 productContainer">
        <div class="row mr-5 col-sm-12" style="min-height: 550px;">
           <router-view></router-view>

        </div>
    </div>
    <TheFooter/>

</template>
<script>
    import TheHeader from "../components/TheHeaderIndex.vue";
    import TheFooter from "../components/TheFooterIndex.vue";
    export default{
        components:{
            TheHeader,
            TheFooter
        }
    }
</script>

<style scoped>

.productContainer {
    width: 90%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    background-color: #E9ECEF;
  }
</style>