import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import axios from "axios";

const useFirebaseAutoLogin = (onLogin) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        const res = await axios.post(
          "https://db.store1920.com/wp-json/custom/v1/firebase-login",
          { idToken: token }
        );

        const userInfo = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          token: res.data.token,
        };

        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("userId", userInfo.id);
        localStorage.setItem("email", userInfo.email);

        onLogin?.(userInfo);
      }
    });

    return () => unsubscribe();
  }, [onLogin]);
};

export default useFirebaseAutoLogin;
