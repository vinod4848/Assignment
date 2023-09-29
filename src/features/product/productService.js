import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getAllProduct = async () => {
  const response = await axios.get(`${base_url}product/getAllProduct`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/addProduct`,
    product,
    Config
  );
  return response.data;
};
const updateAproduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    { title: product.productData.title },
    Config
  );

  return response.data;
};
const getAproduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, Config);
  return response.data;
};
const deleteAproduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, Config);

  return response.data;
};
const productService = {
  getAllProduct,
  updateAproduct,
  deleteAproduct,
  getAproduct,
  createProduct,
};
export default productService;
