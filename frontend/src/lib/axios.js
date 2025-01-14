import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL:
  //   import.meta.env.VITE_MODE === "development"
  //     ? "http://localhost:3000/api"
  //     : `${import.meta.env.VITE_SERVER_URL}/api`,
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export const googleAuth = (code) =>
  axiosInstance.get(`user/google?code=${code}`);

export const verifyOtp = (data) => {
  return axiosInstance.post("user/verify-otp", data);
};
