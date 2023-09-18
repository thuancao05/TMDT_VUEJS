const customer = [
    {
      path: "/customer",
      component: () => import("../layouts/customer.vue"),
      children: [
        // Quan ly profile
        {
          path: "profile",
          name: "customer-profile",
          component: () => import("../pages/customer/profile.vue"),
        },
        //quan ly don hang
        {
          path: "orders",
          name: "customer-orders",
          component: () => import("../pages/customer/order/orders.vue"),
        },
        {
          path: "orders/:id/detail",
          name: "customer-orders-detail",
          component: () => import("../pages/customer/order/detail.vue"),
        },
      ],
  
    },
  ];
  export default customer;
  