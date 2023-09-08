const view = [
    {
      path: "/index",
      component: () => import("../layouts/index.vue"),
      children: [
        // Quan ly user
        {
          path: "products",
          name: "customer-products",
          component: () => import("../pages/view/index.vue"),
        },
      ],
  
    },
  ];
  export default view;
  