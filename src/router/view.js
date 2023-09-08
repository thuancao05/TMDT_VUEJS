const view = [
    {
      path: "/index",
      component: () => import("../layouts/index.vue"),
      children: [
        // dasboard index
        {
          path: "products",
          name: "customer-products",
          component: () => import("../pages/view/index.vue"),
        },
        {
          path: "products/:id/detail",
          name: "view-products-detail",
          component: () => import("../pages/view/detail.vue"),
        },
        {
          path: "products/:id/category",
          name: "view-category-products",
          component: () => import("../pages/view/category_products.vue"),
        },
      ],
  
    },
  ];
  export default view;
  