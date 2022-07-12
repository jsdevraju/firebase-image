import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../app/components/layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../app/store/store";
import { useEffect } from "react";
import {
  onIdTokenChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { setAuth } from "../app/redux/auth/authSlice";
import { fetchProfile } from "../app/redux/profile/profileSlice";
import { getCollectionsImage } from "../app/redux/collection/collectionSlice";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { auth: myAuthState } = store.getState();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const providerId = user.providerData.some(
          (p) => p.providerId === "password"
        );
        if (providerId && !user.emailVerified) {
          await sendEmailVerification(user);
          toast.success("Verify Email Sent Please check your email");
          await signOut(auth);
          router.push("/");
        }
        store.dispatch(setAuth(user));
      } else {
        store.dispatch(setAuth(null));
        router.push("/login");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!myAuthState?.user) return;
    if (myAuthState?.user?.email) store.dispatch(fetchProfile(myAuthState?.user?.email));
    const payload = { email: myAuthState?.user?.email}
    store.dispatch(getCollectionsImage(payload))
  }, [myAuthState, store.dispatch]);

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
