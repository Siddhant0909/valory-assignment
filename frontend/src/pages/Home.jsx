import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },
    { name: "Messages", path: "/messages" },
    { name: "Notifications", path: "/notifications" },
  ];

  const { authUser, updateProfile, logout } = useAuthStore();

  const roles = ["Athlete", "Family", "Sponsor", "Fan"];
  const [role, setRole] = useState(authUser.role);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    updateProfile({ role: selectedRole });
    setIsDialogOpen(false);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-primary">Valory</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="block px-4 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-primary/10 hover:text-primary"
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center p-4 border-t">
          <img
            src={authUser?.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">
              {authUser.fullName}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 border-t">
          <button className="w-full btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome {authUser.fullName}</h1>
        <p className="mt-4 text-xl text-gray-600">
          Current Role: {authUser.role}
        </p>
        <button
          className="mt-4 btn btn-sm btn-primary"
          onClick={() => setIsDialogOpen(true)}
        >
          Change Role
        </button>
      </main>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-bold">Select Your Role</h2>
            <div className="space-y-4">
              {roles.map((r, index) => (
                <div
                  key={index}
                  onClick={() => handleRoleSelect(r)}
                  className={`p-4 border rounded-lg cursor-pointer text-center ${
                    r === role
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {r}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="w-full mt-6 btn btn-sm btn-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
