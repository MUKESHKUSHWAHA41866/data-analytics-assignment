import axios from "axios";

const API = "http://localhost:8000/api";

export const getRevenue = () => axios.get(`${API}/revenue`);
export const getCustomers = () => axios.get(`${API}/top-customers`);
export const getCategories = () => axios.get(`${API}/categories`);
export const getRegions = () => axios.get(`${API}/regions`);