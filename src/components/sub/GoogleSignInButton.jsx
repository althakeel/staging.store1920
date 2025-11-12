import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import axios from "axios";
import GoogleIcon from '../../assets/images/search.png'; 


const GoogleSignInButton = ({ onLogin }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        "https://db.store1920.com/wp-json/custom/v1/firebase-login",
        { idToken }
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
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  return (
    <button className="google-signin-btn" onClick={handleGoogleSignIn}>
      <img
        src={GoogleIcon}
        alt="Google Sign-In"
        width={24}
        height={24}
        style={{ marginRight: "8px" }}
      />
    </button>
  );
};

export default GoogleSignInButton;
