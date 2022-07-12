import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/profile.module.css";
import myIcon from "../../asset/icons8-settings.gif";
import { fetchProfile } from "../../redux/profile/profileSlice";
import store, { RootState } from "../../store/store";
import Loader from "../loader/Loader";

interface IProps {
  setSetting: (setting: boolean) => void;
}

const ShowProfile: React.FC<IProps> = ({ setSetting }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { auth } = useSelector((state: RootState) => state);


  useEffect(() => {
    if (!auth?.user) return;
    if (auth?.user?.email) store.dispatch(fetchProfile(auth?.user?.email));
  }, [auth]);

  return (
    <>
      <div className={styles.profileWrapper}>
        <div className="flex j_be i_center">
          <div className={styles.padding}>
            <h3 className={styles.header}>Applicant Information</h3>
            <p className={styles.profileP}>Personal details and application.</p>
          </div>
          <div className={styles.settingIcon} onClick={() => setSetting(true)}>
            <img
              src={myIcon.src}
              alt="Razu"
              width={40}
              height={40}
              style={{
                marginRight: "3em",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <dl>
            <div className={`flex i_center ${styles.oneInfoBasic}`}>
              <dt className={styles.title}>Full Name</dt>
              <dd className={styles.name}>{profile?.fullname}</dd>
            </div>
            <div
              className={`flex i_center ${styles.oneInfoBasic} ${styles.bg_white}`}
            >
              <dt className={styles.title}>Title</dt>
              <dd className={styles.name}>Backend Developer</dd>
            </div>
            <div className={`flex i_center ${styles.oneInfoBasic}`}>
              <dt className={styles.title}>Email address</dt>
              <dd className={styles.name}>{profile?.email}</dd>
            </div>
            <div
              className={`flex i_center ${styles.oneInfoBasic} ${styles.bg_white}`}
            >
              <dt className={styles.title}>Address</dt>
              <dd className={styles.name}>{profile?.address}</dd>
            </div>
            <div className={`flex i_center ${styles.oneInfoBasic}`}>
              <dt className={styles.title}>Phone</dt>
              <dd className={styles.name}>{profile?.phone}</dd>
            </div>
            <div
              className={`flex i_center ${styles.oneInfoBasic} ${styles.bg_white}`}
            >
              <dt className={styles.title}>Website</dt>
              <dd className={styles.name}>{profile?.website}</dd>
            </div>
            <div className={`flex i_center ${styles.oneInfoBasic}`}>
              <dt className={styles.title}>About Me</dt>
              <dd className={styles.name}>{profile?.about}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ShowProfile;
