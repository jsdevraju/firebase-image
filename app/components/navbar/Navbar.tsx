import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import Button from "../button/Button";
import styles from "./style.module.css";
import Avatar from "react-avatar";
import { authSignOut } from "../../redux/auth/authSlice";

const Navbar = () => {
  const router = useRouter();

  const navItem = [
    {
      id: 1,
      name: "Login",
      path: "/login",
      className:
        router.pathname == "/login"
          ? `${styles.navActive} ${styles.navLink}`
          : styles.navLink,
    },
    {
      id: 2,
      name: "Register",
      path: "/register",
      className:
        router.pathname == "/register"
          ? `${styles.navActive} ${styles.navLink}`
          : styles.navLink,
    },
  ];

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch()

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={`${styles.navbar} flex j_be i_center`}>
            {/* Logo */}
            <Link href="/">
              <h2 className={styles.logo}>Firebase Image</h2>
            </Link>
            {/* Menu Item */}
            <ul className="flex i_center gap_1">
              {!user &&
                navItem.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>
                      <a className={item.className}>{item.name}</a>
                    </Link>
                  </li>
                ))}

              {user && (
                <>
                  <li className={styles.afterLogin} onClick={() => router.push("/profile")}>
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
                  </li>
                  <Button className="app_btn" onClick={() => dispatch(authSignOut())}>Logout</Button>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
