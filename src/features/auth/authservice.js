import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const login = async (userdata) => {
  const response = await axios.post(`${base_url}user/admin-login`, userdata);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async (userdata) => {
  const response = await axios.get(`${base_url}user/admin-logout`, userdata);
  if (response.data) {
    localStorage.removeItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getAllOrder`, Config);
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getorderbyuser/${id}`,
    Config
  );
  return response.data;
};
const authService = {
  login,
  getOrders,
  getOrder,
  logout,
};
export default authService;
