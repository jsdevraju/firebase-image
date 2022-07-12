import * as Yup from "yup";

export const validate = Yup.object({
  username: Yup.string()
    .min(3, "Username at least 3 characters")
    .max(15, "Username less then 15 characters")
    .required("Username is require"),
  email: Yup.string().email("Email is invalid").required("Email is require"),
  password: Yup.string()
    .min(8, "Password at least 8 characters")
    .max(32, "Password less then 32 characters")
    .required("Password is require"),
  cf_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password d't match")
    .required("Confirm Password is require"),
});

export const loginValidate = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is require"),
  password: Yup.string()
    .min(8, "Password at least 8 characters")
    .max(32, "Password less then 32 characters")
    .required("Password is require"),
});

export const passwordValidate = Yup.object({
  oldPassword: Yup.string()
    .min(8, "OldPassword at least 8 characters")
    .max(32, "OldPassword less then 32 characters")
    .required("OldPassword is require"),
  newPassword: Yup.string()
    .min(8, "newPassword at least 8 characters")
    .max(32, "newPassword less then 32 characters")
    .required("newPassword is require"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref("newPassword"), null], "Password d't match")
  .required("Confirm Password is require"),
});

export const emailValidate = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is require"),
});

