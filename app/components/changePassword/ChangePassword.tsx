import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { changePassword } from "../../firebaseAction/firebaseAction";
import { RootState } from "../../store/store";
import { IAuth } from "../../types/typescript";
import { passwordValidate } from "../../utils/validation";
import Button from "../button/Button";
import Input from "../input/Input";
import LabelText from "../labelText/LabelText";
import Loader from "../loader/Loader";
import styles from "./style.module.css";

const ChangePassword = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (oldPassword: string, newPassword: string) => {
    if (!user) return;
    setLoading(true);
    await changePassword(user, oldPassword, newPassword);
    setLoading(false);
  };

  if (!user?.providerData.some((p : any) => p.providerId === "password")) return null;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.changePasswordWrapper} flex gap mt_1`}>
          {/* Avatar  */}
          <div className={styles.changePassword}>
            <h2>Change Password</h2>
            <p>Your account information. Be careful when changing</p>
          </div>
          {/* Profile Change */}
          <div className={styles.passwordChangeOption}>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={passwordValidate}
              onSubmit={(values: any) => {
                const { oldPassword, newPassword } = values;
                handleUpdate(oldPassword, newPassword);
              }}
            >
              {(formik) => (
                <>
                  <Form>
                    <LabelText htmlFor="oldPassword">Old Password</LabelText>
                    <Input
                      type="password"
                      name="oldPassword"
                      placeholder="example: @oldpassword"
                      className="form_control_input"
                      id="oldPassword"
                    />
                    <LabelText htmlFor="newPassword">New Password</LabelText>
                    <Input
                      type="password"
                      name="newPassword"
                      placeholder="example: @newpassword"
                      className="form_control_input"
                      id="newPassword"
                    />
                    <LabelText htmlFor="confirmPassword">Password</LabelText>
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="example: @confirmpassword"
                      className="form_control_input"
                      id="confirmPassword"
                    />
                    <Button
                      type="submit"
                      className={`app_btn fill mt ${styles.btn}`}
                    >
                      Update
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
