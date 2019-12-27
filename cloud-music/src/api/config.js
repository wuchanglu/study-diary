import axios from "axios";
export const baseUrl = "http://192.168.1.96:4000";
const axiosInstance = axios.create({
  baseURL: baseUrl
});
axiosInstance.interceptors.response.use(
  res => {
      return res.data
  },
  err => {
    console.log(err, "网络错误");
  }
);

export { axiosInstance };
