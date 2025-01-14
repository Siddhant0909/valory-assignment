import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleBtn from "./GoogleBtn";
import AuthImagePattern from "./AuthImagePattern";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");

    if (!formData.email.trim()) return toast.error("Email is required");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="mb-8 text-center">
              <div className="flex flex-col items-center gap-2 group">
                <h1 className="mt-2 text-4xl font-bold">Valory</h1>
                <p className="text-base-content/60">
                  Get started with your free account
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full border-opacity-50">
              <GoogleBtn />
              <div className="divider">OR</div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input input-bordered w-full pl-10`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </div>

            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}

        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignupForm;
