export const API_ROUTES = {
  AUTH: {
    USER_ROLE: "/api/auth/user-role",
    SIGN_UP:   "/api/auth/sign-up",
    USER:      "/api/auth/user"
  },
  EMAIL:              "/api/email",
  IMAGE:              "/api/image",
  CREATE_ORDER:       "/api/order/",
  ORDER:              "/api/order/:id",
  PENDING_ORDER:      "/api/order/pending/:customerId",
  REVALIDATE:         "/api/revalidate",
  USER:               "/api/user",
  ORDERS_BY_CUSTOMER: "/api/orders/:customerId"
};