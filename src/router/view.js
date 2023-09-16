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
      {
        path: "search/:id",
        name: "search-products",
        component: () => import("../pages/view/search.vue"),
      },
    ],
  },
  {
    path: "/cart",
    component: () => import("../layouts/cart_order.vue"),
    children: [
      // cart
      {
        path: "",
        name: "cart",
        component: () => import("../pages/view/cart.vue"),
      },
      {
        path: "payment",
        name: "payment",
        component: () => import("../pages/view/payment.vue"),
      },
    ],
  },
];
export default view;
