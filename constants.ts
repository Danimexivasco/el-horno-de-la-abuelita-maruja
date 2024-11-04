export const SESSION_COOKIE_NAME = "user_session";
export const USER_CHECKED_COOKIE_NAME = "user_c";
export const ONE_DAY = 60 * 60 * 24;
export const DEFAULT_THEME = "dark"

export const AUTHENTICATION_FORM_INPUTS = [
  { name: "email",
    type: "email",
    label:"Email",
    placeholder: "Enter your email",
    required: true },
  { name: "password",
    type: "password",
    label:"Password",
    placeholder: "Enter your password",
    required: true },
]

export const AUTHENTICATION_FORM_INITIAL_STATE = {
  email: "",
  password: ""
}