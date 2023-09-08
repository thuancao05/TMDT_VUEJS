<template>
  <a-menu mode="vertical">
    <a-menu-item v-for="menuItem in category" :key="menuItem.id">
      <a :href="menuItem.link">{{ menuItem.label }}</a>
    </a-menu-item>
  </a-menu>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const category = ref([]);

    const getCategory = () => {
      axios
        .get("http://localhost/TMDT/admin/apiDanhMuc.php")
        .then((response) => {
          // console.log(response);
          // console.log(response.data[0]);
          category.value = response.data;
          // console.log(category.value[0].dm_ten);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategory();
    console.log(category);
    return {
      category,
    };
  },
});
</script>
