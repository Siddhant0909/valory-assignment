import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  formStep: 1,
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check");
      set({ authUser: res.data, isAuthenticated: true });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/register", formData);
      set({ authUser: res.data, formStep: 2 });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  verifyOtp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/verify-otp", data);
      set({ formStep: 3 });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  selectRole: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/select-role", data);
      set({ authUser: res.data, isAuthenticated: true, formStep: 1 });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  googleAuth: async (authResult) => {
    set({ isLoggingIn: true });
    try {
      if (authResult?.code) {
        const res = await axiosInstance.get(
          `/user/google?code=${authResult.code}`
        );
        if (!res.data?.isNewUser) {
          set({ authUser: res.data, isAuthenticated: true, formStep: 1 });
          toast.success("Login Success!");
        } else {
          set({ authUser: res.data, formStep: 3 });
        }
      } else {
        throw new Error(authResult);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data, isAuthenticated: true });
      toast.success("Login Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/user/logout");
      set({ authUser: null, isAuthenticated: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
