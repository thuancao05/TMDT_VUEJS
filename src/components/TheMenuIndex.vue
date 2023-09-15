<template>
  <a-menu mode="vertical">
    <a-menu-item
      v-for="menuItem in category"
      :key="menuItem.id"
      class="text-dark"
    >
      <router-link
        :to="{
          name: 'view-category-products',
          params: { id: menuItem.value},
        }"
        :key="menuItem.value"
        class="text-black"
      >
        <p>{{ menuItem.label }}</p>
      </router-link>
      
    </a-menu-item>
  </a-menu>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { useMenu } from "../stores/use-menu.js";
import { storeToRefs } from "pinia";


export default defineComponent({
  setup() {
    const category = ref([]);
    const store = useMenu();

    const getCategory = () => {
      axios
        .get("http://localhost/TMDT/admin/apiDanhMuc.php")
        .then((response) => {
          // console.log(response);
          // console.log(response.data[0]);
          category.value = response.data;
          // console.log(category);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategory();
    // console.log(category);
    return {
      category,
      ...storeToRefs(store),

    };
  },
});
</script>

<style scoped>
.text-black{
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the default text color */
  cursor: pointer; /* Show pointer cursor on hover */
}</style>
