const customer = [
    {
      path: "/customer",
      component: () => import("../layouts/customer.vue"),
      children: [
        // Quan ly san pham
        {
          path: "profile",
          name: "customer-profile",
          component: () => import("../pages/customer/profile.vue"),
        },
      ],
  
    },
  ];
  export default customer;
  