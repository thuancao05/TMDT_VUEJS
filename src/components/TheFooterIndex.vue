<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <h6>Thông Tin Liên Hệ</h6>
      
        Địa chỉ: Số 01 Hẻm 216 Đường 3/2, Hưng Lợi, Ninh Kiều, Tp Cần Thơ.
        <br />
        ✔ Liên hệ trực tiếp: 070 479 7165 <br />
        <span>&copy; {{ currentYear }} Sáng Tạo Điện Tử</span>

    </div>
  </footer>
</template>

  <script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
/* Add custom styles for your footer if needed */
</style>