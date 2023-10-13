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
      {
        path: "orders/:id/edit",
        name: "admin-order-edit",
        component: () => import("../pages/admin/orders/edit.vue"),
      },
      // Quan ly khach hang
      {
        path: "customers",
        name: "admin-customers",
        component: () => import("../pages/admin/customers/index.vue"),
      },
      {
        path: "customers/:id/edit",
        name: "admin-customer-edit",
        component: () => import("../pages/admin/customers/edit.vue"),
      },
    ],
  },
];
export default admin;
