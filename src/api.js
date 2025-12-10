// import axios from "axios";

// // Base API instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // change to your backend URL
//   headers: {"Content-Type": "application/json" },
// });

// // 🔐 Add JWT token automatically if logged in
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // JWT stored in localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor to automatically unwrap data and handle errors
// api.interceptors.response.use(
//   (response) => response.data, // directly return data
//   (error) => {
//     console.error(error.response?.data || error.message);
//     return Promise.reject(error.response?.data || { success: false, message: error.message });
//   }
// );



// // ==================== Products ====================

// // Get all products (vegetables + packages)
// export const getProducts = (page = 1, limit = 20) => api.get(`/products?page=${page}&limit=${limit}`);

// // Get by Id products (Veg/ Package)
// export const getProductById = (id) => api.get(`/products/${id}`);


// // Admin: create product
// export const createProduct = (payload) => api.post("/products", payload);



// // Admin: get all products including unapproved
// export const getAllProductsAdmin = () => api.get("/products/admin");

// // ==================== Cart ====================

// // Get user's cart
// export const getCart = () => api.get("/cart");

// // Add item to cart
// export const addToCart = (payload) => api.post("/cart/add", payload);

// // Update cart item quantity
// export const updateCartItem = (id, quantity) => api.put(`/cart/update/${id}`, { quantity });

// // Delete cart item
// export const deleteCartItem = (id) => api.delete(`/cart/remove/${id}`);

// // Sync localStorage cart to backend
// export const syncCart = (items) => api.post("/cart/sync", { items });


// // ==================== Auth ====================

// // Login
// export const loginUser = async (email, password) => {
//   const data = await api.post("/auth/login", { email, password });
//   if (data.success && data.token) {
//     localStorage.setItem("token", data.token);
//   }
//   return data;
// };

// // Register
// export const registerUser = (payload) => api.post("/auth/register", payload);

// // Logout
// export const logoutUser = () => {
//   localStorage.removeItem("token");
// };

// export default api;




// // src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // change to your backend URL if needed
//   headers: { "Content-Type": "application/json" },
// });

// // Attach auth token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Simplify response handling
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     // normalize server errors
//     const payload = error.response?.data || { success: false, message: error.message };
//     return Promise.reject(payload);
//   }
// );


// // Get user's cart
// export const getCart = () => api.get("/cart");

// // Add item to cart
// export const addToCart = (payload) => api.post("/cart/add", payload);

// // Update cart item quantity
// export const updateCartItem = (id, quantity) =>
//   api.put(`/cart/update/${id}`, { quantity });

// // Delete cart item
// export const deleteCartItem = (id) => api.delete(`/cart/remove/${id}`);

// // Sync localStorage cart to backend
// export const syncCart = (items) => api.post("/cart/sync", { items });


// // === Orders ===
// export const createOrder = (orderPayload) => api.post("/orders/create", orderPayload);
// export const confirmCODOrder = (orderId) => api.post("/orders/confirm-cod", { orderId });

// // === Payments ===
// // Create a payment intent for an order (backend should return { clientSecret })
// export const createPaymentIntent = ({ orderId, amount }) =>
//   api.post("/payments/create-payment-intent", { orderId, amount });

// // === Cart, Auth, Products etc (your existing exports) ===
// // ... you can keep other functions you already had
// export const getProducts = (page = 1, limit = 20) => api.get(`/products?page=${page}&limit=${limit}`);
// export const getProductById = (id) => api.get(`/products/${id}`);

// // Auth helpers
// export const loginUser = async (email, password) => {
//   const data = await api.post("/auth/login", { email, password });
//   if (data.success && data.token) localStorage.setItem("token", data.token);
//   return data;
// };
// export const registerUser = (payload) => api.post("/auth/register", payload);
// export const logoutUser = () => localStorage.removeItem("token");

// export default api;



// // src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api", // Backend base URL
//   headers: { "Content-Type": "application/json" },
// });

// // Attach auth token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Simplify response handling
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const payload = error.response?.data || { success: false, message: error.message };
//     return Promise.reject(payload);
//   }
// );

// // ====================== CART ======================
// export const getCart = () => api.get("/cart");
// export const addToCart = (payload) => api.post("/cart/add", payload);
// export const updateCartItem = (id, quantity) =>
//   api.put(`/cart/update/${id}`, { quantity });
// export const deleteCartItem = (id) => api.delete(`/cart/remove/${id}`);
// export const syncCart = (items) => api.post("/cart/sync", { items });

// // 🔴 புதிய helper: ordered products cart‑லிருந்து clear பண்ண
// export const clearOrderedCartItems = (productIds) =>
//   api.post("/cart/clear-ordered", { productIds });
// // ====================== ORDERS ======================
// export const createOrder = (orderPayload) => api.post("/orders/create", orderPayload);
// export const confirmCODOrder = (orderId) => api.post("/orders/confirm-cod", { orderId });

// // ====================== PAYMENTS ======================
// // ✅ Corrected route for backend: /payments/create-intent
// export const createPaymentIntent = ({ orderId, amount }) =>
//   api.post("/payments/create-intent", { orderId, amount });

// // Confirm payment (if using server-side confirmation)
// export const confirmPayment = ({ orderId, paymentIntentId }) =>
//   api.post("/payments/confirm", { orderId, paymentIntentId });

// // 🔴 NEW: Stripe Checkout Session (redirect to stripe.com page)
// export const createCheckoutSession = (orderId) =>
//   api.post("/payments/checkout-session", { orderId });

// export const confirmCheckoutSession = (sessionId) =>
//   api.post("/payments/checkout-success", { sessionId });

// // ====================== PRODUCTS ======================
// export const getProducts = (page = 1, limit = 20) =>
//   api.get(`/products?page=${page}&limit=${limit}`);
// export const getProductById = (id) => api.get(`/products/${id}`);

// // ====================== AUTH ======================
// export const loginUser = async (email, password) => {
//   const data = await api.post("/auth/login", { email, password });
//   if (data.success && data.token) localStorage.setItem("token", data.token);
//   return data;
// };

// export const registerUser = (payload) => api.post("/auth/register", payload);
// export const logoutUser = () => localStorage.removeItem("token");

// export const changePassword = (currentPassword, newPassword) =>
//   api.post("/auth/change-password", { currentPassword, newPassword });

// // ====================== REVIEWS ======================
// export const addReviewForProduct = (productId, rating, comment) =>
//   api.post("/reviews", { product: productId, rating, comment });

// // ====================== EXPORT DEFAULT ======================
// export default api;


import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  baseURL:'https://vegpack-backend-1.onrender.com/api',
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ send cookies
});

// No need to attach token manually now
api.interceptors.request.use((config) => config);

// Simplify response handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload =
      error.response?.data || { success: false, message: error.message };
    return Promise.reject(payload);
  }
);

// ========== CART ==========
export const getCart = () => api.get("/cart");
export const addToCart = (payload) => api.post("/cart/add", payload);
export const updateCartItem = (id, quantity) =>
  api.put(`/cart/update/${id}`, { quantity });
export const deleteCartItem = (id) => api.delete(`/cart/remove/${id}`);
export const syncCart = (items) => api.post("/cart/sync", { items });
export const clearOrderedCartItems = (productIds) =>
  api.post("/cart/clear-ordered", { productIds });

// ========== ORDERS ==========
export const createOrder = (orderPayload) =>
  api.post("/orders/create", orderPayload);
export const confirmCODOrder = (orderId) =>
  api.post("/orders/confirm-cod", { orderId });

// ========== PAYMENTS ==========
export const createPaymentIntent = ({ orderId, amount }) =>
  api.post("/payments/create-intent", { orderId, amount });
export const confirmPayment = ({ orderId, paymentIntentId }) =>
  api.post("/payments/confirm", { orderId, paymentIntentId });
export const createCheckoutSession = (orderId) =>
  api.post("/payments/checkout-session", { orderId });
export const confirmCheckoutSession = (sessionId) =>
  api.post("/payments/checkout-success", { sessionId });

// ========== PRODUCTS ==========
export const getProducts = (page = 1, limit = 20) =>
  api.get(`/products?page=${page}&limit=${limit}`);
export const getProductById = (id) => api.get(`/products/${id}`);

// ========== AUTH (helpers if you need) ==========
export const changePassword = (currentPassword, newPassword) =>
  api.post("/auth/change-password", { currentPassword, newPassword });

// ========== REVIEWS ==========
export const addReviewForProduct = (productId, rating, comment) =>
  api.post("/reviews", { product: productId, rating, comment });

export default api;