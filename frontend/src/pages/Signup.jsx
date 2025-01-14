import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import { useAuthStore } from "../store/useAuthStore";
import EmailVerification from "../components/EmailVerification";
import RoleSelection from "../components/RoleSelection";

const Signup = () => {
  const { formStep } = useAuthStore();

  if (formStep === 1) {
    return <SignupForm />;
  }
  if (formStep === 2) {
    return <EmailVerification />;
  }
  if (formStep === 3) {
    return <RoleSelection />;
  }
};

export default Signup;
