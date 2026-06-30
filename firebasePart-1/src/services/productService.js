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
  // Get a single Product
  async getProductById(id) {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  }
}