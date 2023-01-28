import axios from "axios";
import { checkTokenValidity } from "./utilis";

export const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

instance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refresh_token");
// tokeni ar arsebobs
  if (!token || !refresh_token) return req;
  req.headers.Authorization = `Bearer ${token}`
  const isExpired = checkTokenValidity(token)
//   vada ar gasvlia
  if(!isExpired) return req
//   vada gauvida 
const {data} = await axios.post("http://localhost:3001/users/refresh", {
    refresh_token,
})
localStorage.setItem("token", data.token)
req.headers.Authorization = `Bearer ${data.token}`
  return req
});
