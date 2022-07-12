import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import LabelText from "../app/components/labelText/LabelText";
import Meta from "../app/components/meta/Meta";
import { authForgotPassword } from "../app/redux/auth/authSlice";
import { useAppDispatch } from "../app/store/store";
import { emailValidate } from "../app/utils/validation";
import styles from "../styles/forgot.module.css";

const ForgotPassword = () => {
  const router = useRouter();
    const dispatch = useAppDispatch();

  return (
    <>
    <Meta title="Firebase Image - Forgot Password" description="Firebase" keyword="Razu Islam"  />
      <section className={styles.wrapper}>
        <div className={`container ${styles.container}`}>
          <div className={styles.row}>
            <h1>Forgot Password</h1>
            <h6 className={styles.information_text}>
              Enter your registered email to reset your password.
            </h6>
            <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={emailValidate}
                onSubmit={(values: any) => {
                    dispatch(authForgotPassword(values?.email))
                    router.push("/");
                }}
              >
                {(formik) => (
                  <>
                    <Form>
                      <LabelText htmlFor="email">Email</LabelText>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="form_control_input"
                        id="email"
                      />
                      <Button
                        type="submit"
                        className={`app_btn fill ${styles.btn}`}
                        style={{
                            marginTop:"1em"
                          }} 
                      >
                        Reset Password
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
              <Button style={{
                marginTop:"1em"
              }} className="app_btn fill" onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
