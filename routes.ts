export const ROUTES = [
  {
    path: "/",
    name: "Home",
    protected: true
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
    protected: true
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    protected: true
  },
  {
    path: "/componentsPreview",
    name: "ComponentsPreview",
  },
]