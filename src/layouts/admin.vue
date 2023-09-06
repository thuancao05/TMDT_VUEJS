<template>
    <TheHeader/>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-sm-3 d-none d-sm-flex">
                <a-list bordered style="with:100%">
                    <TheMenu/>
                    <template #header>
                      <div>BẢNG ĐIỀU KHIỂN</div>
                    </template>
                  </a-list>
            </div>
            <div class="col-sm-9">
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>
<script>
    import TheHeader from "../components/TheHeaderAdmin.vue";
    import TheMenu from "../components/TheMenuAdmin.vue";
    export default{
        components:{
            TheHeader,
            TheMenu
        }
    }
</script>