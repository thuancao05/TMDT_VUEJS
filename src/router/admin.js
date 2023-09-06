const admin = [
    {
        path: "/admin",
        component: ()=> import("../layouts/admin.vue"),
        children: [
            // Quan ly user
            {
                path: "products",
                name: "admin-products",
                component: () =>import("../pages/admin/products/index.vue")
            },
            {
                path: "products/create",
                name: "admin-products-create",
                component: () =>import("../pages/admin/products/create.vue")
            },
            {
                path: "products/:id/edit",
                name: "admin-products-edit",
                component: () =>import("../pages/admin/products/edit.vue")
            },
            
            // // Quan ly role
            // {
            //     path: "roles",
            //     name: "admin-roles",
            //     component: () =>import("../pages/admin/roles/index.vue")
            // },
            // // Quan ly setting
            // {
            //     path: "settings",
            //     name: "admin-settings",
            //     component: () =>import("../pages/admin/settings/index.vue")
            // }
        ]
    }
];
export default admin;