<template>
  <div class="container-fluid">
    <div
      class="row text-white"
      style="background-color: #0c713d; padding: 1 rem"
    >
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawer()">
          <i class="fa-solid fa-align-justify"></i>
        </span>
      </div>
      <div
        class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start"
      >
        <img
          src="../assets/logo.png"
          alt="Logo"
          height="60"
          width="60"
          class="mx-3 me-3"
          id="logo"
        />
        <span class="d-none d-sm-flex">QUẢN TRỊ</span>
      </div>

      <div
        class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end"
      >
        <span>Admin</span>
      </div>
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawerUser()">
          <i class="fa-solid fa-user"></i>
        </span>
      </div>
    </div>
  </div>
  <a-drawer v-model:visible="visible" title="DANH MỤC" placement="left">
    <TheMenu />
  </a-drawer>
  <a-drawer v-model:visible="visible_user" title="ADMIN" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
import TheMenu from "./TheMenuAdmin.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TheMenu,
  },
  setup() {
    const visible = ref(false);
    const visible_user = ref(false);
    const router = useRouter();

    const showDrawer = () => {
      visible.value = true;
    };
    const showDrawerUser = () => {
      visible_user.value = true;
    };

    const checkAuth = () => {
      axios
        .get(`http://localhost/TMDT/admin/check-auth.php`)
        .then((response) => {
          // console.log(response);
          if (response.data.user != "admin") {
            router.push({ name: "login" });
          }
        })
        .catch((error) => {
          router.push({ name: "login" });
          console.log(error);
        });
    };
    // console.log(checkAuth());
    checkAuth();
    return {
      visible,
      visible_user,
      showDrawer,
      showDrawerUser,
    };
  },
});
</script>