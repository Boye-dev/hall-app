import axios from "axios";

export default axios.create({
  baseURL: "https://hostel-management-api-f2oe.onrender.com",
  // withCredentials: true,
  // credentials: "include",
});
