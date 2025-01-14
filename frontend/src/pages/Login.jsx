import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import LoginForm from "../components/LoginForm";
import RoleSelection from "../components/RoleSelection";

const Login = () => {
  const { formStep } = useAuthStore();

  if (formStep === 1) {
    return <LoginForm />;
  }
  if (formStep === 3) {
    return <RoleSelection />;
  }
};

export default Login;
