import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");

  const { isSigningUp: isVerifying, verifyOtp, authUser } = useAuthStore();

  const handleVerify = (e) => {
    e.preventDefault();
    verifyOtp({ email: authUser.email, otp: otp });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-base-content/60">
              Enter the OTP sent to your email address.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">
                  One-Time Password (OTP)
                </span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary"
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="items-center justify-center hidden bg-gray-100 lg:flex">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold">Secure Your Account</h2>
          <p className="mt-2 text-base-content/70">
            Verifying your email helps secure your account and recover it in
            case of an issue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
