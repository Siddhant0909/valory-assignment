import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { isSigningUp: isSubmitting, selectRole, authUser } = useAuthStore();
  const roles = ["Athlete", "Family", "Sponsor", "Fan"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectRole({ role: selectedRole, email: authUser.email });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Select Your Role</h1>
            <p className="text-base-content/60">
              Choose the role that best describes you.
            </p>
          </div>

          {/* Role Options */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {roles.map((role) => (
                <div
                  key={role}
                  className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer 
                    ${
                      selectedRole === role
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-primary"
                    }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <span
                    className={`text-lg font-medium ${
                      selectedRole === role
                        ? "text-primary"
                        : "text-base-content"
                    }`}
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary"
              disabled={isSubmitting || !selectedRole}
            >
              {isSubmitting ? "Submitting..." : "Confirm Role"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="items-center justify-center hidden bg-gray-100 lg:flex">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold">Join the Community</h2>
          <p className="mt-2 text-base-content/70">
            Select your role and enjoy a personalized experience based on your
            choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
