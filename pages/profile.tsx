import React, { useState } from "react";
import EditProfile from "../app/components/editProfile/EditProfile";
import Meta from "../app/components/meta/Meta";
import ShowProfile from "../app/components/showProfile/ShowProfile";
import styles from "../styles/profile.module.css";

const Profile = () => {
  const [setting, setSetting] = useState(false);

  return (
    <>
    <Meta title="Firebase Image - Profile" description="Firebase" keyword="Razu Islam"  />
      <section className={styles.profile}>
        <div className="container">
          {setting ? (
            <EditProfile setSetting={setSetting} />
          ) : (
            <ShowProfile setSetting={setSetting} />
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
