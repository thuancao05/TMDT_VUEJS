const admin = [
  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
    children: [
      // Quan ly san pham
      {
        path: "products",
        name: "admin-products",
        component: () => import("../pages/admin/products/index.vue"),
      },
      {
        path: "products/create",
        name: "admin-products-create",
        component: () => import("../pages/admin/products/create.vue"),
      },
      {
        path: "products/:id/edit",
        name: "admin-products-edit",
        component: () => import("../pages/admin/products/edit.vue"),
      },
      // Quan ly don hang
      {
        path: "orders",
        name: "admin-orders",
        component: () => import("../pages/admin/orders/index.vue"),
      },
    //   {
    //     path: "orders/create",
    //     name: "admin-orders-create",
    //     component: () => import("../pages/admin/orders/create.vue"),
    //   },
    //   {
    //     path: "products/:id/edit",
    //     name: "admin-products-edit",
    //     component: () => import("../pages/admin/products/edit.vue"),
    //   },

    ],
    // path: "/index",
    // component: () => import("../layouts/index.vue"),
    // children: [
    //   // Quan ly user
    //   {
    //     path: "products",
    //     name: "customer-products",
    //     component: () => import("../pages/view/index.vue"),
    //   },
    // ],

  },
];
export default admin;
