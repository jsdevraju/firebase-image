import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getFiles } from "../../firebaseAction/firebaseAction";
import { RootState } from "../../store/store";
import Button from "../button/Button";
import styles from "./style.module.css";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setAvatar: (value: string) => void;
  className: string;
}

const Model: React.FC<IProps> = ({ open, setOpen, setAvatar, className }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [store, setStore] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getFiles(`profile/${user.email}`, (urls) => {
      setStore(urls);
      setLoading(false);
    });
    return setStore([]);
  }, [user]);

  const handleSelectImg = (img: string) => {
    setFile(img);
  };

  const handleClick = () => {
    setAvatar(files);
    setOpen(!open);
  };

  const isActive = (img: string) => {
    if (files.includes(img)) return "active";
  };

  return (
    <>
      <div className={className === "homeModel" ? styles.homeModelWrapper : styles.modelWrapper}>
        <div
          className={
            className === "homeModel" ? styles.homeModel : styles.model
          }
        >
          <h1>My Storage</h1>
          {/* Model Inner */}
          <div className={styles.modelInner}>
            {/* Per Image Render One Image Box */}
            {loading ? (
              <p>loading....</p>
            ) : (
              store &&
              store?.map((img) => (
                <div
                  className={styles.imgBox}
                  key={img}
                  onClick={() => handleSelectImg(img)}
                >
                  <img src={img} alt="Avatar" className={`${isActive(img)}`} />
                </div>
              ))
            )}
          </div>
          <div className={styles.modelFooter}>
            <Button
              className={styles.btn}
              type="button"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
            <Button className="app_btn" type="button" onClick={handleClick}>
              Ok
            </Button>
          </div>
        </div>
      </div>
      <div onClick={() => setOpen(!open)} className={styles.overlay}></div>
    </>
  );
};

export default Model;
