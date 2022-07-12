import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import {
  auth,
  db,
  providerFacebook,
  providerGoogle,
  storage,
} from "../../firebase";
import { IRegister, ILogin, IAuth, IProfile, ICollection } from "../types/typescript";
import { setDoc, doc, getDoc, addDoc, collection, query, getDocs, where } from "firebase/firestore/lite";
import { listAll, ref } from "firebase/storage";

export const registerApi = async (user: IRegister) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    await updateProfile(res.user, {
      displayName: user.username,
    });
    toast.success("Register Successfully");
    return res.user;
  } catch (error: any) {
    if (error?.message?.includes("auth/email"))
      return toast.error("Email already exits");
  }
};

export const loginApi = async (user: ILogin) => {
  try {
    const { email, password } = user;
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successfully");
    return res.user;
  } catch (error: any) {
    if (error?.message?.includes("auth/email"))
      return toast.error("Email already exits");
    else if (error?.message?.includes("auth/wrong"))
      return toast.error("Invalid Credentials");
  }
};

export const googleApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);
    toast.success("Login Successfully");
    return res.user;
  } catch (error: any) {
    console.log(error);
    if (error?.message?.includes("auth/email"))
      return toast.error("Email already exits");
  }
};

export const facebookApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerFacebook);
    toast.success("Login Successfully");
    return res.user;
  } catch (error: any) {
    if (error?.message?.includes("auth/email"))
      return toast.error("Email already exits");
  }
};

export const forgotPassApi = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return toast.success("Sent Link Successfully Please check email");
  } catch (error: any) {
    console.log(error);
    if (error?.message?.includes("auth/email"))
      return toast.error("Email already exits");
  }
};

export const signOutApi = async () => {
  try {
    await signOut(auth);
    toast.success("Logout Successfully");
  } catch (error: any) {
    console.log(error);
  }
};

// Profile Actions
export const changeProfile = async (user: IAuth, data: IProfile) => {
  if (!user.email) return;
  try {
    await setDoc(doc(db, "user", user.email), data);
    toast.success("Update Successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (email: string) => {
  try {
    const docRef = doc(db, `user/${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};

export const changeAvatar = async (user: IAuth, url: string) => {
  try {
    await updateProfile(user, { photoURL: url });
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (path: string) => {
  let item: string = "";
  await getDownloadURL(ref(storage, path))
    .then((url) => (item = url))
    .catch((err) => {
      return toast.error(err.message);
    });

  return item;
};

export const getFiles = async (
  folder: string,
  callback: (urls: string[]) => void
) => {
  let listRef = ref(storage, `${folder}`);
  listAll(listRef)
    .then((res) => {
      const urlPromises = res.items?.map(async (itemRef) => {
        const path = itemRef.toString();
        return await downloadFile(path);
      });

      return Promise.all(urlPromises).then((urls) => callback(urls));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const reAuth = async (user: IAuth, pass: string) => {
  try {
    const providerId = user.providerData[0].providerId;
    // Password
    if (providerId === "password") {
      if (!user.email) return;

      const credential = EmailAuthProvider.credential(user.email, pass);
      await reauthenticateWithCredential(user, credential);
    }
  } catch (err: any) {
    return toast.error(err.message);
  }
};

export const changePassword = async (
  user: IAuth,
  oldPass: string,
  newPass: string
) => {
  try {
    const res = await reAuth(user, oldPass);
    if (res) return toast.error(res);

    await updatePassword(user, newPass);
    toast.success("Password Update Successfully ")
  } catch (error) {
    console.log(error);
  }
};

export const createCollection = async (email:string, title:string, photos:string) => {
  try {
    const data = {
      email,
      title,
      photos,
      createdAt:new Date().toISOString()
    }

    const res = await addDoc(collection(db, "collections"), data);
    toast.success("Create Collection Successfully")
    return { ...data, id:res.id}

  } catch (error) {
    
  }
}

export const getCollections = async (email:string) =>{
  try {
    const data: ICollection[] = [];
    const q = query(collection(db, "collections"), where("email", "==", email))
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      data.push({...doc.data(), id:doc.id})
    })
    return data;
  } catch (error) {
    console.log(error)
  }
}