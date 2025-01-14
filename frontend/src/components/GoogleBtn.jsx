import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const GoogleBtn = () => {
  const { googleAuth } = useAuthStore();
  const googleLogin = useGoogleLogin({
    onSuccess: (authResult) => googleAuth(authResult),
    onError: (authResult) => googleAuth(authResult),
    flow: "auth-code",
  });
  return (
    <button
      type="submit"
      onClick={googleLogin}
      className="w-full text-black btn hover:bg-base-300 bg-base-200"
    >
      <img src="google-icon.svg" />
      Sign in with Google
    </button>
  );
};

export default GoogleBtn;
