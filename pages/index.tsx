import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../app/components/button/Button";
import { RootState, useAppDispatch } from "../app/store/store";
import styles from "../styles/home.module.css";
import { FcAddImage } from "react-icons/fc";
import { FormSubmit, ICollection, InputChange } from "../app/types/typescript";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import toast from "react-hot-toast";
import Avatar from "react-avatar";
import { BsImage } from "react-icons/bs";
import Model from "../app/components/imageModel/Model";
import { createCollection } from "../app/firebaseAction/firebaseAction";
import Loader from "../app/components/loader/Loader";
import { setCollection } from "../app/redux/collection/collectionSlice";
import HomeImageCard from "../app/components/homeImageCard/HomeImageCard";
import HomeModel from "../app/components/homeModel/HomeModel";
import Meta from "../app/components/meta/Meta";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading: collectLoading, collection } = useSelector(
    (state: RootState) => state.collection
  );
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgPopUp, setImgPopUp] = useState(false);
  const [imgDetails, setImgDetails] = useState<ICollection>({});

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

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    if (!title || title?.length < 5)
      return toast.error("Title at least 5 characters");
    if (!avatar) return toast.error("Avatar require");
    setLoading(true);
    const res = await createCollection(user.email, title, avatar);
    dispatch(setCollection(res));
    setAvatar("");
    setTitle("");
    setShow(!show);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) router.push("/login");
  }, [router, user]);

  return (
    <>
      <Meta
        title="Firebase Image - Home"
        description="Firebase"
        keyword="Razu Islam"
      />
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.home}>
          <div className="container">
            {/* Header */}
            <div className={`${styles.header} flex i_center j_be`}>
              {/* leftSide */}
              <h1>MY COLLECTION</h1>
              {/* Right Side */}
              <div className={styles.btnGrp}>
                <Button type="button">ASC</Button>
                <Button type="button">DSC</Button>
              </div>
            </div>
            {/* Input Title And Image Model */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.control}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  id="title"
                  className={styles.form_control}
                  placeholder="example: @title_img"
                />
                <FcAddImage onClick={() => setShow(!show)} size={30} />
              </div>
              {/* Image Wrapper */}

              {show && (
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
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "1em",
                }}
              >
                <Button className="app_btn" type="submit">
                  Create
                </Button>
              </div>
            </form>

            {/* Show Image Collection */}
            {collectLoading ? (
              <Loader />
            ) : collection?.length > 0 ? (
              <div className={styles.collection}>
                <h1
                  style={{
                    color: "#333",
                    letterSpacing: "3px",
                    marginTop: "1.5em",
                    marginBottom: "1.5em",
                  }}
                >
                  SHOW COLLECTION
                </h1>

                {/* All Image Collection */}
                <div className={styles.allCollection}>
                  {collection &&
                    collection?.map((itemCollection) => (
                      <HomeImageCard
                        key={itemCollection.id}
                        setImgDetails={setImgDetails}
                        collection={itemCollection}
                        imgPopUp={imgPopUp}
                        setImgPopUp={setImgPopUp}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <p style={{
                textAlign:"center",
                marginTop:"2em",
                fontSize:"2em"
              }}>
                Sorry Don't yet add any Collection
              </p>
            )}

            {/* Image Model Popup */}
            {imgPopUp && (
              <HomeModel
                imgPopUp={imgPopUp}
                setImgPopUp={setImgPopUp}
                imgDetails={imgDetails}
              />
            )}

            {/* Model Render Here */}
            {open && (
              <Model
                className="homeModel"
                open={open}
                setOpen={setOpen}
                setAvatar={setAvatar}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
