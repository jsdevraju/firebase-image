import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import LabelText from "../app/components/labelText/LabelText";
import { validate } from "../app/utils/validation";
import styles from "../styles/login.module.css";;
import Link from "next/link";
import { RootState, useAppDispatch, useAppSelector } from "../app/store/store";
import { authRegister } from "../app/redux/auth/authSlice";
import Loader from "../app/components/loader/Loader";
import { useRouter } from "next/router";
import Meta from "../app/components/meta/Meta";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: RootState) => state.auth)
  const router = useRouter();

  useEffect(() =>{
    if(user) router.push("/")
  }, [router, user])

  return (
    <>
     <Meta title="Firebase Image - Register" description="Firebase" keyword="Razu Islam"  />
      {loading ? <Loader /> : (
        <section className={styles.login}>
        <div className={`${styles.container} container`}>
          <div className={styles.wrapper}>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                cf_password: "",
              }}
              validationSchema={validate}
              onSubmit={(values: any) => {
                dispatch(authRegister(values))
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
                    Welcome to register firebase
                  </h1>
                  <Form>
                    <LabelText htmlFor="username">Username</LabelText>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      className="form_control_input"
                      id="username"
                    />
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
                    <LabelText htmlFor="cf_password">
                      Confirm Password
                    </LabelText>
                    <Input
                      type="password"
                      name="cf_password"
                      placeholder="Enter confirm passowrd"
                      className="form_control_input"
                      id="cf_password"
                    />
                    <Button
                      type="submit"
                      className={`app_btn fill ${styles.btn}`}
                    >
                      Register
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
            <p className={styles.logintext}>
              if you have already an account please{" "}
              <Link href="/login">login</Link>
            </p>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Register;
