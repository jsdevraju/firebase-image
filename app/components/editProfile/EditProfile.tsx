import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NotFound from "../../../pages/404";
import { profileUpdate } from "../../redux/profile/profileSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { InputChange } from "../../types/typescript";
import Button from "../button/Button";
import LabelText from "../labelText/LabelText";
import Loader from "../loader/Loader";
import styles from "./style.module.css";
import { BsImage } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { changeAvatar } from "../../firebaseAction/firebaseAction";
import Model from "../imageModel/Model";
import ChangePassword from "../changePassword/ChangePassword";

interface IProps {
  setSetting: (setting: boolean) => void;
}

const initialState = {
  fullname: "",
  email: "",
  address: "",
  phone: "",
  website: "",
  about: "",
};

const EditProfile: React.FC<IProps> = ({ setSetting }) => {
  const router = useRouter();
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !data.fullname ||
      data.fullname?.length < 3 ||
      data.fullname?.length > 15
    )
      return toast.error(
        "Fullname at least 3 characters and less then 15 characters"
      );
    if (!data.address || data.address?.length < 3 || data.address?.length > 100)
      return toast.error(
        "Address at least 3 characters and less then 100 characters"
      );
    if (!data.phone || data.phone?.length < 11 || data.phone?.length > 15)
      return toast.error(
        "Phone at least 11 characters and less then 165 characters"
      );
    if (!data.website || data.website?.length < 10)
      return toast.error("Website at least 11 characters");
    if (!data.about || data.about?.length < 50)
      return toast.error("About at least 50 characters");
    if (!user) return;
    setLoading(true);
    // make request
    dispatch(profileUpdate({ user, data }));
    setLoading(false);
  };

  const handleChange = (e: InputChange) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadFile = (e: InputChange) => {
    if (!e?.target.files) return;
    const storageRef = ref(
      storage,
      `profile/${user.email}/${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        return toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setAvatar(downloadUrl);
        });
      }
    );
  };

  const handleAvatar = () => {
    if (!avatar) return;
    setLoading(true);
    changeAvatar(user, avatar);
    toast.success("Profile Update Successfully");
    setLoading(false);
    router.push("/");
  };

  useEffect(() => {
    if (profile) setData(profile);
  }, [profile]);

  if (!user) return <NotFound />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.editProfile}>
          <div className="container">
            {/* Wrapper Div */}
            <div className={`${styles.wrapper} flex gap wrap`}>
              {/* Left Side */}
              <div className={styles.wrapperLeft}>
                <h2>Profile</h2>
                <p>
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              {/* Right Side */}
              <div className={styles.wrapperRight}>
                <form onSubmit={handleSubmit}>
                  <LabelText htmlFor="fullname">Full Name</LabelText>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="example: razu islam"
                    className="form_control_input"
                    id="fullname"
                    value={data.fullname}
                    onChange={handleChange}
                  />
                  <LabelText htmlFor="email">Email Contact</LabelText>
                  <input
                    type="email"
                    name="email"
                    placeholder="example: email@gmail.com"
                    className="form_control_input"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <LabelText htmlFor="address">Address</LabelText>
                  <input
                    type="text"
                    name="address"
                    placeholder="example: bobrakhaliy pabna 6600"
                    className="form_control_input"
                    id="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                  <LabelText htmlFor="phone">Phone</LabelText>
                  <input
                    type="text"
                    name="phone"
                    placeholder="example: bobrakhaliy pabna 6600"
                    className="form_control_input"
                    id="phone"
                    value={data.phone}
                    onChange={handleChange}
                  />
                  <LabelText htmlFor="website">Website</LabelText>
                  <input
                    type="text"
                    name="website"
                    placeholder="example: bobrakhaliy pabna 6600"
                    className="form_control_input"
                    id="website"
                    value={data.website}
                    onChange={handleChange}
                  />
                  <LabelText htmlFor="about">About Me</LabelText>
                  <textarea
                    name="about"
                    id="about"
                    cols={30}
                    rows={10}
                    className="form_control_input"
                    placeholder="example: I'm razu islam"
                    value={data.about}
                    onChange={handleChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: "1.5em",
                    }}
                  >
                    <Button
                      disabled={loading}
                      type="submit"
                      className={`app_btn`}
                    >
                      {loading ? "loading..." : "Save"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {/* Show Profile Image Upload Section */}
            <div className={`${styles.profileArea} flex gap mt_1 wrap`}>
              {/* Avatar  */}
              <div className={styles.avatarProfile}>
                <h2>Account</h2>
                <p>Your account information. Be careful when changing</p>
              </div>
              {/* Profile Change */}
              <div className={styles.profile_img}>
                <div className={styles.image_area}>
                  <h4>Photo</h4>
                  <div className="flex i_center gap mt wrap">
                    {user?.photoURL && user?.photoURL ? (
                      <Avatar
                        style={{
                          cursor: "pointer",
                        }}
                        size="35px"
                        round={true}
                        src={user?.photoURL}
                      />
                    ) : (
                      <Avatar
                        style={{
                          cursor: "pointer",
                        }}
                        size="35px"
                        round={true}
                        name={user?.displayName}
                      />
                    )}
                    <Button
                      onClick={handleAvatar}
                      disabled={loading}
                      className={styles.btn}
                      type="button"
                    >
                      {loading ? "loading..." : "Change"}
                    </Button>
                  </div>
                </div>
                {/* File Upload Area */}
                <div className={`${styles.uploadArea} mt_1`}>
                  <div className={styles.wrapperUpload}>
                    {avatar ? (
                      <Avatar
                        style={{
                          cursor: "pointer",
                        }}
                        size="35px"
                        round={true}
                        src={avatar}
                      />
                    ) : (
                      <BsImage color="#cbd5e1" size={30} />
                    )}

                    <p className="mt">
                      <label
                        htmlFor="upload"
                        style={{
                          color: "#22d3ee",
                          fontWeight: "bold",
                          marginRight: "0.3em",
                          cursor: "pointer",
                        }}
                      >
                        Upload a file
                      </label>
                      or
                      <label
                        style={{
                          color: "#f87171",
                          fontWeight: "bold",
                          marginLeft: "0.3em",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpen(!open)}
                      >
                        My Storage
                      </label>
                      or drag and drop
                    </p>
                    <br />
                    <p>PNG,JPG,GIF up to 1MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      name=""
                      id="upload"
                      style={{
                        display: "none",
                      }}
                      onChange={uploadFile}
                    />
                  </div>
                </div>
                {/* Some Input Area */}
                <div className={styles.formArea}>
                  <LabelText htmlFor="fullname">Display Name</LabelText>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="example: bobrakhaliy pabna 6600"
                    className="form_control_input"
                    id="fullname"
                    value={data.fullname}
                    disabled={true}
                  />
                  <LabelText htmlFor="email">Email Address</LabelText>
                  <input
                    type="email"
                    name="email"
                    placeholder="example: bobrakhaliy pabna 6600"
                    className="form_control_input"
                    id="email"
                    value={data.email}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            {/* Change Password Information */}
            <ChangePassword />
            <Button
              type="submit"
              className={`app_btn`}
              onClick={() => setSetting(false)}
              style={{
                marginTop:"2em"
              }}
            >
              Cancel
            </Button>
            {/* Model Render Here */}
            {open && (
              <Model open={open} setOpen={setOpen} setAvatar={setAvatar} className="ontherModel" />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default EditProfile;
