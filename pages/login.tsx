import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import LabelText from "../app/components/labelText/LabelText";
import { loginValidate } from "../app/utils/validation";
import styles from "../styles/login.module.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { RootState, useAppDispatch, useAppSelector } from "../app/store/store";
import { authFacebookLogin, authGoogleLogin, authLogin } from "../app/redux/auth/authSlice";
import Loader from "../app/components/loader/Loader";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Meta from "../app/components/meta/Meta";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth)


  useEffect(() =>{
    if(user) router.push("/")
  }, [router, user])

  return (
    <>
    <Meta title="Firebase Image - Login" description="Firebase" keyword="Razu Islam"  />
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.login}>
          <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginValidate}
                onSubmit={(values: any) => {
                 dispatch(authLogin(values));
                 router.push("/")
                }}
              >
                {(formik) => (
                  <>
                    <h1
                      style={{
                        textAlign: "center",
                        color: "#333",
                      }}
                    >
                      Welcome to login firebase
                    </h1>
                    <Form>
                      <LabelText htmlFor="email">Email</LabelText>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="form_control_input"
                        id="email"
                      />
                      <LabelText htmlFor="password">Password</LabelText>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="form_control_input"
                        id="password"
                      />
                      <Button
                        type="submit"
                        className={`app_btn fill ${styles.btn}`}
                      >
                        Login
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
              {/* Forgot Password */}
              <div className={styles.forgotPassword}>
                <p>
                  <Link href="/forgot_password">
                  Forgot your password?
                  </Link>
                </p>
              </div>
              <p className={styles.logintext}>
                if you don't have an account please
                <Link href="/register"> Register</Link>
              </p>
              {/* Google With Google */}
              <div
                className="flex i_center j_center"
                style={{
                  width: "100%",
                }}
              >
                <div
                  className="flex i_center j_center"
                  style={{
                    width: "100%",
                    marginTop: "0.6em",
                  }}
                >
                  <Button className={styles.google} onClick={() => dispatch(authGoogleLogin())}>
                    <FcGoogle /> Login With Google
                  </Button>
                </div>
              </div>
              {/* Login With Facebook Button */}
              <div
                className="flex i_center j_center"
                style={{
                  width: "100%",
                  marginTop: "0.6em",
                }}
              >
                <Button className={styles.facebook} onClick={() => dispatch(authFacebookLogin())}>
                  <FaFacebook /> Login With Facebook
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
