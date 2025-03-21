export const API_ROUTES = {
  AUTH: {
    USER_ROLE:     "/api/auth/user-role",
    SIGN_UP:       "/api/auth/sign-up",
    USER:          "/api/auth/user",
    SET_USER_ROLE: "/api/auth/set-user-role"
  },
  EMAIL:              "/api/email",
  IMAGE:              "/api/image",
  CREATE_ORDER:       "/api/order/",
  ORDER:              "/api/order/:id",
  ORDERS:             "/api/orders",
  PENDING_ORDER:      "/api/order/pending/:customerId",
  REVALIDATE:         "/api/revalidate",
  USER:               "/api/user",
  USERS:              "/api/users",
  ORDERS_BY_CUSTOMER: "/api/orders/:customerId"
};