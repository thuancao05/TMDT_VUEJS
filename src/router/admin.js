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

    ],

  },
];
export default admin;
