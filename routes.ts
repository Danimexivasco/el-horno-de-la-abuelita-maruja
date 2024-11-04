export const ROUTES = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/signIn",
    name: "SignIn",
    authRoute: true
  },
  {
    path: "/signUp",
    name: "SignUp",
    authRoute: true
  },
  {
    path: "/products",
    name: "Products",
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
  },
  {
    path: "/componentsPreview",
    name: "ComponentsPreview",
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    protected: true
  },
]