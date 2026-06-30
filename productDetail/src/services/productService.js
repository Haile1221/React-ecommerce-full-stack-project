import axiosClient from "../api/axiosClient";

/*
  Product Service Layer
  Keeps API logic separate from UI
*/

export const productService = {
  // Get all Products 
  async getAllProducts() {
    const response = await axiosClient.get("/products");
    return response.data.products;
  },

  // get single products 

  async getProductById(id) {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;

  },


}