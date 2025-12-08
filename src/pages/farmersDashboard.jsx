// // src/pages/farmers.jsx
// import React, { useState } from "react";
// import api from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function FarmersPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", address: "", phone: "", district: "" });
//   const [products, setProducts] = useState([{ name: "", quantity: 0, image: null }]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleProductChange = (index, e) => {
//     const newProducts = [...products];
//     if (e.target.name === "image") newProducts[index].image = e.target.files[0];
//     else newProducts[index][e.target.name] = e.target.value;
//     setProducts(newProducts);
//   };

//   const addProduct = () => setProducts([...products, { name: "", quantity: 0, image: null }]);
//   const removeProduct = (index) => setProducts(products.filter((_, i) => i !== index));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return toast.error("You must be logged in to register as a farmer.");

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("address", form.address);
//       formData.append("phone", form.phone);
//       formData.append("district", form.district);

//       products.forEach((p, i) => {
//         formData.append(`products[${i}][name]`, p.name);
//         formData.append(`products[${i}][quantity]`, p.quantity);
//         if (p.image) formData.append(`products[${i}][image]`, p.image);
//       });

//       const res = await api.post("/farmers/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         toast.success("Farmer registration submitted!");
//         navigate("/farmer/dashboard");
//       } else toast.error(res.data.message);
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error, try again later");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        

//         {/* Products */}
//         <h2 className="text-2xl font-bold mt-6 mb-4">Products</h2>
//         {products.map((p, i) => (
//           <div key={i} className="border p-4 rounded mb-4">
//             <div className="mb-2">
//               <label className="block font-semibold mb-1">Product Name</label>
//               <input type="text" name="name" value={p.name} onChange={(e) => handleProductChange(i,e)} className="w-full border p-2 rounded" required />
//             </div>
//             <div className="mb-2">
//               <label className="block font-semibold mb-1">Quantity</label>
//               <input type="number" name="quantity" value={p.quantity} onChange={(e) => handleProductChange(i,e)} className="w-full border p-2 rounded" min="0" required />
//             </div>
//             <div className="mb-2">
//               <label className="block font-semibold mb-1">Image</label>
//               <input type="file" name="image" onChange={(e) => handleProductChange(i,e)} accept="image/*" />
//             </div>
//             {products.length > 1 && <button type="button" onClick={() => removeProduct(i)} className="text-red-600 hover:underline mt-2">Remove</button>}
//           </div>
//         ))}
//         <button type="button" onClick={addProduct} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Product</button>
//         <button type="submit" className={`w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
//           {loading ? "Submitting..." : "Submit Registration"}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/FarmerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import api from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../AuthContext";

// export default function FarmerDashboard() {
//   const { user } = useAuth();
//   const [form, setForm] = useState({ vegetable: "", quantity: 0, price: 0 });
//   const [approvedStocks, setApprovedStocks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch approved stocks
//   // const fetchApprovedStocks = async () => {
//   //   try {
//   //     const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//   //     setApprovedStocks(res.data.stocks);
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Failed to load your approved stocks");
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchApprovedStocks();
//   // }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit new stock
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.vegetable || !form.quantity || !form.price) {
//       return toast.error("All fields are required");
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", {
//         vegetable: form.vegetable,
//         quantity: form.quantity,
//         price: form.price,
//       });

//       if (res.data) {
//         toast.success("Stock submitted! Waiting for admin approval");
//         setForm({ vegetable: "", quantity: 0, price: 0 });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit stock");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold mb-6 text-center">Farmer Dashboard</h1>

//       {/* Add New Stock */}
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Add New Stock</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Vegetable Name</label>
//             <input
//               type="text"
//               name="vegetable"
//               value={form.vegetable}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               min="0"
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               min="0"
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Add Stock"}
//           </button>
//         </form>
//       </div>

//       {/* Approved Stocks */}
//       {/* <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Approved Stocks</h2>
//         {approvedStocks.length === 0 ? (
//           <p>No approved stocks yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {approvedStocks.map((s) => (
//               <div key={s._id} className="border p-4 rounded">
//                 <p><strong>Vegetable:</strong> {s.vegetable}</p>
//                 <p><strong>Quantity:</strong> {s.quantity}</p>
//                 <p><strong>Price:</strong> ${s.price}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import api from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../AuthContext";

// export default function FarmerDashboard() {
//   const { user } = useAuth();
//   const [form, setForm] = useState({ vegetable: "", quantity: "", price: "" });
//   const [loading, setLoading] = useState(false);
//   const [approvedStocks, setApprovedStocks] = useState([]);

//   // Fetch approved stocks for the logged-in farmer
//   const fetchApprovedStocks = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) {
//         setApprovedStocks(res.stocks);
//       } else {
//         toast.error(res.message || "Failed to load approved stocks");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while fetching stocks");
//     }
//   };

//   useEffect(() => {
//     fetchApprovedStocks();
//   }, [user]);

//   // Handle input change for form
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit new stock
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.vegetable || !form.quantity || !form.price) {
//       return toast.error("All fields are required");
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", {
//         vegetable: form.vegetable,
//         quantity: Number(form.quantity),
//         price: Number(form.price),
//       });

//       if (res._id || res.success) {
//         toast.success("Stock submitted! Waiting for admin approval");
//         setForm({ vegetable: "", quantity: "", price: "" });
//         fetchApprovedStocks(); // Refresh approved stocks
//       } else {
//         toast.error(res.message || "Failed to submit stock");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.message === "Unauthorized" || err.message === "Token invalid or expired") {
//         toast.error("Please login again");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       } else {
//         toast.error(err.message || "Server error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold mb-6 text-center">Farmer Dashboard</h1>

//       {/* Add New Stock */}
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Add New Stock</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Vegetable Name</label>
//             <input
//               type="text"
//               name="vegetable"
//               value={form.vegetable}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               min="0"
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               min="0"
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Add Stock"}
//           </button>
//         </form>
//       </div>

//       {/* Approved Stocks */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Approved Stocks</h2>
//         {approvedStocks.length === 0 ? (
//           <p>No approved stocks yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {approvedStocks.map((s) => (
//               <div key={s._id} className="border p-4 rounded">
//                 <p><strong>Vegetable:</strong> {s.vegetable}</p>
//                 <p><strong>Quantity:</strong> {s.quantity}</p>
//                 <p><strong>Price:</strong> ${s.price}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import api from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Farmer() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ vegetable: "", quantity: "", price: "" });
//   const [loading, setLoading] = useState(false);
//   const [vegetables, setVegetables] = useState([]);

//   // Fetch all vegetables for this farmer
//   const fetchVegetables = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) {
//         // Filter to show only vegetables (if your backend supports packages too)
//         const vegOnly = res.stocks.filter((s) => s.type !== "package");
//         setVegetables(vegOnly);
//       } else {
//         toast.error(res.message || "Failed to fetch vegetables");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while fetching vegetables");
//     }
//   };

//   useEffect(() => {
//     fetchVegetables();
//   }, [user]);

//   // Handle form input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit new vegetable
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.vegetable || !form.quantity || !form.price) {
//       return toast.error("All fields are required");
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", {
//         vegetable: form.vegetable,
//         quantity: Number(form.quantity),
//         price: Number(form.price),
//         type: "vegetable", // ensure it's marked as vegetable
//       });

//       if (res._id || res.success) {
//         toast.success("Vegetable submitted! Waiting for admin approval");
//         setForm({ vegetable: "", quantity: "", price: "" });
//         fetchVegetables();
//       } else {
//         toast.error(res.message || "Failed to submit vegetable");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.message === "Unauthorized" || err.message === "Token invalid or expired") {
//         toast.error("Please login again");
//         localStorage.removeItem("token");
//         navigate("/login");
//       } else {
//         toast.error(err.message || "Server error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <ToastContainer />
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Back to Home
//         </button>
//       </div>

//       {/* Add Vegetable */}
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Add New Vegetable</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Vegetable Name</label>
//             <input
//               type="text"
//               name="vegetable"
//               value={form.vegetable}
//               onChange={handleChange}
//               placeholder="e.g., Carrot"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Quantity (kg)</label>
//             <input
//               type="number"
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               min="0"
//               placeholder="Quantity in kg"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Price per kg</label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               min="0"
//               placeholder="Price in $"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Add Vegetable"}
//           </button>
//         </form>
//       </div>

//       {/* List of Vegetables */}
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Your Vegetables</h2>
//         {vegetables.length === 0 ? (
//           <p className="text-gray-600">No vegetables added yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {vegetables.map((veg) => (
//               <div key={veg._id} className="border rounded p-4 hover:shadow-md transition">
//                 <p><strong>Name:</strong> {veg.vegetable}</p>
//                 <p><strong>Quantity:</strong> {veg.quantity} kg</p>
//                 <p><strong>Price:</strong> ${veg.price}</p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span className={veg.approved ? "text-green-600" : "text-yellow-500"}>
//                     {veg.approved ? "Approved" : "Pending"}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import api from "../api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Farmer() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ vegetable: "", quantity: "", price: "" });
//   const [loading, setLoading] = useState(false);
//   const [vegetables, setVegetables] = useState([]);

//   // Fetch all vegetables for this farmer
//   const fetchVegetables = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) {
//         const vegOnly = res.stocks.filter((s) => s.type !== "package");
//         setVegetables(vegOnly);
//       } else {
//         toast.error(res.message || "Failed to fetch vegetables");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while fetching vegetables");
//     }
//   };

//   useEffect(() => {
//     fetchVegetables();
//   }, [user]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.vegetable || !form.quantity || !form.price) {
//       return toast.error("All fields are required");
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", {
//         vegetable: form.vegetable,
//         quantity: Number(form.quantity),
//         price: Number(form.price),
//         type: "vegetable",
//       });

//       if (res._id || res.success) {
//         toast.success("Vegetable submitted! Waiting for admin approval");
//         setForm({ vegetable: "", quantity: "", price: "" });
//         fetchVegetables();
//       } else {
//         toast.error(res.message || "Failed to submit vegetable");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.message === "Unauthorized" || err.message === "Token invalid or expired") {
//         toast.error("Please login again");
//         localStorage.removeItem("token");
//         navigate("/login");
//       } else {
//         toast.error(err.message || "Server error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <ToastContainer />
//       {/* Header with back button only */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Back to Home
//         </button>
//       </div>

//       {/* Add Vegetable */}
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Add New Vegetable</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Vegetable Name</label>
//             <input
//               type="text"
//               name="vegetable"
//               value={form.vegetable}
//               onChange={handleChange}
//               placeholder="e.g., Carrot"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Quantity (kg)</label>
//             <input
//               type="number"
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               min="0"
//               placeholder="Quantity in kg"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Price per kg</label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               min="0"
//               placeholder="Price in $"
//               className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Add Vegetable"}
//           </button>
//         </form>
//       </div>

//       {/* List of Vegetables */}
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Your Vegetables</h2>
//         {vegetables.length === 0 ? (
//           <p className="text-gray-600">No vegetables added yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {vegetables.map((veg) => (
//               <div key={veg._id} className="border rounded p-4 hover:shadow-md transition">
//                 <p><strong>Name:</strong> {veg.vegetable}</p>
//                 <p><strong>Quantity:</strong> {veg.quantity} kg</p>
//                 <p><strong>Price:</strong> ${veg.price}</p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span className={veg.approved ? "text-green-600" : "text-yellow-500"}>
//                     {veg.approved ? "Approved" : "Pending"}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function FarmerDashboard() {
//   const { user } = useAuth();

//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     description: "",
//     image: "",
//     type: "vegetable",
//   });

//   // Fetch all products added by this farmer
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) setProducts(res.stock);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add new product
//   const handleAdd = async () => {
//     try {
//       if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
//         alert("Please fill all required fields!");
//         return;
//       }

//       await api.post("/farmer-stock", newProduct);
//       setNewProduct({ name: "", price: "", quantity: "", description: "", image: "", type: "vegetable" });
//       fetchProducts();
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

//       {/* Add New Product Form */}
//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
//           <input
//             className="p-2 border rounded"
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//           <input
//             type="number"
//             className="p-2 border rounded"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Quantity (e.g., 1kg, 100g)"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//           />
//           <select
//             className="p-2 border rounded"
//             value={newProduct.type}
//             onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
//           >
//             <option value="vegetable">Vegetable</option>
//             <option value="package">Package</option>
//           </select>
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded col-span-1 md:col-span-1"
//             onClick={handleAdd}
//           >
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">My Products</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="p-2">Product</th>
//                 <th className="p-2">Type</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id} className="border-b hover:bg-gray-50">
//                   <td className="p-2 flex items-center gap-2">
//                     {p.image && (
//                       <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
//                     )}
//                     {p.name}
//                   </td>
//                   <td className="p-2">{p.type}</td>
//                   <td className="p-2">₹{p.price}</td>
//                   <td className="p-2">{p.quantity}</td>
//                   <td className="p-2">
//                     {p.approved ? (
//                       <span className="px-2 py-1 rounded bg-green-200 text-green-800 font-semibold">
//                         Approved
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 rounded bg-yellow-200 text-yellow-800 font-semibold">
//                         Waiting for admin approval
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {products.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="p-4 text-center text-gray-500">
//                     No products added yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function FarmerDashboard() {
//   const { user } = useAuth();

//   // Products state
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // New product form
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     description: "",
//     image: "",
//     type: "vegetable",
//   });

//   // Fetch farmer's products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success && Array.isArray(res.stock)) {
//         setProducts(res.stock);
//       } else {
//         setProducts([]);
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?._id) fetchProducts();
//   }, [user]);

//   // Add new product
//   const handleAdd = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
//       alert("Please fill all required fields!");
//       return;
//     }
//     try {
//       const res = await api.post("/farmer-stock", newProduct);
//       if (res.success) {
//         alert("Product added successfully! Waiting for admin approval.");
//         setNewProduct({ name: "", price: "", quantity: "", description: "", image: "", type: "vegetable" });
//         fetchProducts();
//       }
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

//       {/* Add New Product Form */}
//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
//           <input
//             className="p-2 border rounded"
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//           <input
//             type="number"
//             className="p-2 border rounded"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Quantity (1kg, 100g)"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//           />
//           <input
//             className="p-2 border rounded"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//           />
//           <select
//             className="p-2 border rounded"
//             value={newProduct.type}
//             onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
//           >
//             <option value="vegetable">Vegetable</option>
//             <option value="package">Package</option>
//           </select>
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded col-span-1 md:col-span-1"
//             onClick={handleAdd}
//           >
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">My Products</h2>
//         {loading ? (
//           <p>Loading products...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-2">Product</th>
//                   <th className="p-2">Type</th>
//                   <th className="p-2">Price</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products?.length > 0 ? (
//                   products.map((p) => (
//                     <tr key={p._id} className="border-b hover:bg-gray-50">
//                       <td className="p-2 flex items-center gap-2">
//                         {p.image && (
//                           <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
//                         )}
//                         {p.name}
//                       </td>
//                       <td className="p-2">{p.type}</td>
//                       <td className="p-2">₹{p.price}</td>
//                       <td className="p-2">{p.quantity}</td>
//                       <td className="p-2">
//                         {p.approved ? (
//                           <span className="px-2 py-1 rounded bg-green-200 text-green-800 font-semibold">
//                             Approved
//                           </span>
//                         ) : (
//                           <span className="px-2 py-1 rounded bg-yellow-200 text-yellow-800 font-semibold">
//                             Waiting for admin approval
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center p-4 text-gray-500">
//                       No products added yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import api from "../api";

// export default function FarmerDashboard() {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     vegetable: "",
//     quantity: "",
//     price: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch pending products (waiting for admin approval)
//   const fetchPendingProducts = async () => {
//     try {
//       const res = await api.get("/farmer-stock/farmer/me"); // replace me with logged-in farmer ID if needed
//       if (res.success) setApprovedProducts(res.stocks);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch pending (waiting) products
//   const fetchPending = async () => {
//     try {
//       const res = await api.get("/farmer-stock/pending"); // admin-only route
//       if (res.success) setPendingProducts(res.stocks);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingProducts();
//     fetchPending();
//   }, []);

//   const handleAddProduct = async () => {
//     if (!newProduct.vegetable || !newProduct.quantity || !newProduct.price) {
//       setMessage("All fields are required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", newProduct);
//       if (res.success) {
//         setMessage("Product added successfully. Waiting for admin approval!");
//         setNewProduct({ vegetable: "", quantity: "", price: "" });
//         fetchPendingProducts();
//       }
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setMessage(err.message || "Error adding product");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>

//       {/* Add New Product */}
//       <div className="bg-white p-4 rounded shadow space-y-2">
//         <h2 className="font-semibold text-xl">Add New Product</h2>
//         {message && <p className="text-red-500">{message}</p>}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//           <input
//             type="text"
//             placeholder="Vegetable Name"
//             value={newProduct.vegetable}
//             onChange={(e) => setNewProduct({ ...newProduct, vegetable: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <button
//             onClick={handleAddProduct}
//             disabled={loading}
//             className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
//           >
//             {loading ? "Adding..." : "Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* Pending Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">Pending Products (Waiting for Admin Approval)</h2>
//         {pendingProducts.length === 0 ? (
//           <p className="text-gray-500">No pending products.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-yellow-300">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">₹{p.price}</td>
//                     <td className="p-2 text-yellow-700 font-semibold">Waiting for Approval</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Approved Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">Approved Products</h2>
//         {approvedProducts.length === 0 ? (
//           <p className="text-gray-500">No approved products yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {approvedProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">₹{p.price}</td>
//                     <td className="p-2 text-green-700 font-semibold">Approved</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../api";
// import { useAuth } from "../AuthContext";



// export default function FarmerDashboard() {
//   const { user } = useAuth();

//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     vegetable: "",
//     quantity: "",
//     price: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch approved products for farmer
//   const fetchApprovedProducts = async () => {
   
//      try {
//     if (!user?._id) return;
//     const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//     if (res.success) setApprovedProducts(res.stocks);
//   } catch (err) {
//     console.error(err);
//   }
//   };

//   // Fetch pending products for this farmer
//   const fetchPendingProducts = async () => {
   
//      try {
//     const res = await api.get("/farmer-stock/my-pending");
//     if (res.success) setPendingProducts(res.stocks);
//   } catch (err) {
//     console.error(err);
//   }
//   };

//   useEffect(() => {
//     fetchApprovedProducts();
//     fetchPendingProducts();
//   }, [user]);

//   const handleAddProduct = async () => {
//     if (!newProduct.vegetable || !newProduct.quantity || !newProduct.price) {
//       setMessage("All fields are required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.post("/farmer-stock", newProduct);
//       if (res) {
//         // Add the newly created product to pendingProducts immediately
//         setPendingProducts((prev) => [...prev, res]);
//         setMessage("Product added successfully. Waiting for admin approval!");
//         setNewProduct({ vegetable: "", quantity: "", price: "" });
//       }
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setMessage(err.message || "Error adding product");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>

//       {/* Add New Product */}
//       <div className="bg-white p-4 rounded shadow space-y-2">
//         <h2 className="font-semibold text-xl">Add New Product</h2>
//         {message && <p className="text-red-500">{message}</p>}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//           <input
//             type="text"
//             placeholder="Vegetable Name"
//             value={newProduct.vegetable}
//             onChange={(e) => setNewProduct({ ...newProduct, vegetable: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <button
//             onClick={handleAddProduct}
//             disabled={loading}
//             className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
//           >
//             {loading ? "Adding..." : "Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* Pending Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">Pending Products (Waiting for Admin Approval)</h2>
//         {pendingProducts.length === 0 ? (
//           <p className="text-gray-500">No pending products.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-yellow-300">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">₹{p.price}</td>
//                     <td className="p-2 text-yellow-700 font-semibold">Waiting for Approval</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Approved Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">Approved Products</h2>
//         {approvedProducts.length === 0 ? (
//           <p className="text-gray-500">No approved products yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {approvedProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">₹{p.price}</td>
//                     <td className="p-2 text-green-700 font-semibold">Approved</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // src/pages/farmersDashboard.jsx
// import { useState, useEffect } from "react";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function FarmerDashboard() {
//   const { user } = useAuth();

//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     vegetable: "",
//     quantity: "",
//     price: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Approved stocks for this farmer
//   const fetchApprovedProducts = async () => {
//     try {
//       if (!user?._id) return;
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) setApprovedProducts(res.stocks || []);
//     } catch (err) {
//       console.error("Fetch approved stocks error:", err);
//     }
//   };

//   // Pending stocks for this farmer
//   const fetchPendingProducts = async () => {
//     try {
//       const res = await api.get("/farmer-stock/my-pending");
//       if (res.success) setPendingProducts(res.stocks || []);
//     } catch (err) {
//       console.error("Fetch pending stocks error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchApprovedProducts();
//     fetchPendingProducts();
//   }, [user]);

//   const handleAddProduct = async () => {
//     setMessage("");

//     if (
//       !newProduct.vegetable.trim() ||
//       !newProduct.quantity.trim() ||
//       !newProduct.price.trim()
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     // 🔹 Price: farmer can type "150" or "150/kg" etc.
//     const priceText = newProduct.price.trim();

//     // pick first number from string
//     const match = priceText.match(/\d+(\.\d+)?/);
//     if (!match) {
//       setMessage("Please include a number in price (e.g. 150 or 150/kg)");
//       return;
//     }

//     const priceNumber = parseFloat(match[0]);
//     if (Number.isNaN(priceNumber) || priceNumber <= 0) {
//       setMessage("Please enter a valid positive price");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         vegetable: newProduct.vegetable.trim(),
//         quantity: newProduct.quantity.trim(), // e.g. "200g", "5kg", "200g/5kg"
//         price: priceNumber,                   // LKR, numeric to backend
//       };

//       // api.post returns created stock object (interceptor -> res.data)
//       const createdStock = await api.post("/farmer-stock", payload);

//       setPendingProducts((prev) => [...prev, createdStock]);

//       setMessage("Product added successfully. Waiting for admin approval!");
//       setNewProduct({ vegetable: "", quantity: "", price: "" });
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setMessage(err.message || "Error adding product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>

//       {/* Add New Product */}
//       <div className="bg-white p-4 rounded shadow space-y-2">
//         <h2 className="font-semibold text-xl">Add New Product</h2>
//         {message && <p className="text-red-500">{message}</p>}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//           {/* Vegetable name */}
//           <input
//             type="text"
//             placeholder="Vegetable Name"
//             value={newProduct.vegetable}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, vegetable: e.target.value })
//             }
//             className="p-2 border rounded"
//           />

//           {/* Quantity as string: 200g / 5kg / 200g/5kg */}
//           <input
//             type="text"
//             placeholder="Quantity (e.g. 200g, 5kg, 200g/5kg)"
//             value={newProduct.quantity}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, quantity: e.target.value })
//             }
//             className="p-2 border rounded"
//           />

//           {/* Price text input: will parse number from it */}
//           <input
//             type="text"
//             placeholder="Price (Rs) e.g. 150 or 150/kg"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//             className="p-2 border rounded"
//           />

//           <button
//             onClick={handleAddProduct}
//             disabled={loading}
//             className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 disabled:opacity-60"
//           >
//             {loading ? "Adding..." : "Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* Pending Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">
//           Pending Products (Waiting for Admin Approval)
//         </h2>
//         {pendingProducts.length === 0 ? (
//           <p className="text-gray-500">No pending products.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-yellow-300">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price (Rs)</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">Rs. {p.price}</td>
//                     <td className="p-2 text-yellow-700 font-semibold">
//                       Waiting for Approval
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Approved Products */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold text-xl mb-2">Approved Products</h2>
//         {approvedProducts.length === 0 ? (
//           <p className="text-gray-500">No approved products yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-2">Vegetable</th>
//                   <th className="p-2">Quantity</th>
//                   <th className="p-2">Price (Rs)</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {approvedProducts.map((p) => (
//                   <tr key={p._id} className="border-b">
//                     <td className="p-2">{p.vegetable}</td>
//                     <td className="p-2">{p.quantity}</td>
//                     <td className="p-2">LKR {p.price}</td>
//                     <td className="p-2 text-green-700 font-semibold">
//                       Approved
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import {
  Sprout,
  Leaf,
  Package,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function FarmerDashboard() {
  const { user } = useAuth();

  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    vegetable: "",
    quantity: "",
    price: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [message, setMessage] = useState("");

  const fetchApprovedProducts = async () => {
    try {
      if (!user?._id) return;
      const res = await api.get(`/farmer-stock/farmer/${user._id}`);
      if (res.success) setApprovedProducts(res.stocks || []);
    } catch (err) {
      console.error("Fetch approved stocks error:", err);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      const res = await api.get("/farmer-stock/my-pending");
      if (res.success) setPendingProducts(res.stocks || []);
    } catch (err) {
      console.error("Fetch pending stocks error:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoadingStocks(true);
      await Promise.all([fetchApprovedProducts(), fetchPendingProducts()]);
      setLoadingStocks(false);
    };
    load();
  }, [user]);

  const handleAddProduct = async () => {
    setMessage("");

    if (
      !newProduct.vegetable.trim() ||
      !newProduct.quantity.trim() ||
      !newProduct.price.trim()
    ) {
      setMessage("All fields are required");
      return;
    }

    // Price can be "150" or "150/kg" etc. → extract first number
    const priceText = newProduct.price.trim();
    const match = priceText.match(/\d+(\.\d+)?/);
    if (!match) {
      setMessage("Please include a number in price (e.g. 150 or 150/kg)");
      return;
    }
    const priceNumber = parseFloat(match[0]);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setMessage("Please enter a valid positive price");
      return;
    }

    setLoadingAdd(true);
    try {
      const payload = {
        vegetable: newProduct.vegetable.trim(),
        quantity: newProduct.quantity.trim(), // e.g. "200g", "5kg", "200g/5kg"
        price: priceNumber, // numeric LKR
      };

      const createdStock = await api.post("/farmer-stock", payload);

      setPendingProducts((prev) => [...prev, createdStock]);
      setMessage("Stock added! Waiting for admin approval.");
      setNewProduct({ vegetable: "", quantity: "", price: "" });
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(err.message || "Error adding product");
    } finally {
      setLoadingAdd(false);
    }
  };

  const totalPending = pendingProducts.length;
  const totalApproved = approvedProducts.length;

  const farmerName = user?.name || "Farmer";

  return (
    <div
      className="min-h-screen  px-4 py-6"
      style={{ paddingTop: "100px",backgroundColor:"#b7e4c7"}}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER / HERO */}
        <div className=" backdrop-blur-md rounded-3xl shadow-lg border border-emerald-100 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{marginLeft:"100px",marginRight:"100px",borderRadius:"10px",backgroundColor:"#055a53ff",color:"white",height:"150px"}}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md text-white text-2xl font-bold">
              {farmerName[0]?.toUpperCase() || "F"}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                Farmer Dashboard
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Hello, {farmerName} 👨‍🌾
              </h1>
              <p className="text-sm text-slate-500">
                Add your fresh vegetables and track stock approvals in real
                time.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3" >
            <StatChip
              icon={<Clock size={16} />}
              label="Pending Stocks"
              value={totalPending}
              color=" text-amber-700 border-amber-100"
            />
            <StatChip
              icon={<CheckCircle size={16} />}
              label="Approved Stocks"
              value={totalApproved}
              color="bg-emerald-50 text-emerald-700 border-emerald-100"
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Add Stock Card */}
          <div className="lg:col-span-1">
            <div className=" backdrop-blur rounded-3xl shadow-md border border-emerald-100 p-8 space-y-4" style={{backgroundColor:"#A5CECB",borderRadius:"15px",marginLeft:"200px",width:"600px"}}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sprout size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Add New Stock
                  </h2>
                  <p className="text-xs text-slate-500">
                    Quantity & price will be shown to customers after admin
                    approval.
                  </p>
                </div>
              </div>

              {message && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {message}
                </p>
              )}

              <div className="space-y-3 mt-2">
                {/* Vegetable Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">
                    Vegetable Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomato, Brinjal"
                    value={newProduct.vegetable}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        vegetable: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">
                    Quantity (Display)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200g, 5kg, 200g/5kg"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
                  />
                  <p className="text-[11px] text-slate-400">
                    This text will be shown exactly to customers.
                  </p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">
                    Price (LKR)
                  </label>
                  <div className="flex ">
                    <div className="flex-1 relative">
                     
                      <input
                        type="text"
                        placeholder="e.g. 150 or 150/kg"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    First number will be used (e.g.{" "}
                    <span className="font-semibold">150</span> from{" "}
                    <span className="italic">150/kg</span>).
                  </p>
                </div>

                <button
                  onClick={handleAddProduct}
                  disabled={loadingAdd}
                  className="w-full mt-2 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
                >
                  {loadingAdd ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Adding...
                    </>
                  ) : (
                    <>
                     
                      Add Stock
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Pending + Approved lists */}
          <div className="lg:col-span-2 space-y-5" style={{marginLeft:"250px",width:"650px"}}>
            {/* Pending Stocks */}
            <div className=" backdrop-blur rounded-3xl shadow-md border border-amber-100 p-6" style={{backgroundColor:"#95d5b2",borderRadius:"10px",color:"black"}}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Pending Stocks
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Waiting for admin approval
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                  {totalPending} pending
                </span>
              </div>

              {loadingStocks ? (
                <SkeletonRows />
              ) : pendingProducts.length === 0 ? (
                <EmptyState
                  icon={Clock}
                  text="No pending stocks. Add new stock to see it here."
                />
              ) : (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-amber-50 text-amber-800 text-xs uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Vegetable</th>
                        <th className="px-3 py-2 text-left">Quantity</th>
                        <th className="px-3 py-2 text-left">Price (LKR)</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-50">
                      {pendingProducts.map((p) => (
                        <tr key={p._id} className="hover:bg-amber-50/60">
                          <td className="px-3 py-2 font-medium text-slate-800">
                            {p.vegetable}
                          </td>
                          <td className="px-3 py-2 text-slate-600">
                            {p.quantity}
                          </td>
                          <td className="px-3 py-2 text-slate-700">
                            LKR {p.price}
                          </td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                              <Clock size={12} />
                              Waiting Approval
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Approved Stocks */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-md border border-emerald-100 p-4" style={{backgroundColor:"#acc571ff",borderRadius:"10px",color:"black"}}>
              <div className="flex items-center justify-between mb-3" >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Package size={16} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Approved Stocks
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Visible to customers in store
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                  {totalApproved} approved
                </span>
              </div>

              {loadingStocks ? (
                <SkeletonRows />
              ) : approvedProducts.length === 0 ? (
                <EmptyState
                  icon={Package}
                  text="No approved stocks yet. Admin approval required."
                />
              ) : (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-emerald-50 text-emerald-800 text-xs uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Vegetable</th>
                        <th className="px-3 py-2 text-left">Quantity</th>
                        <th className="px-3 py-2 text-left">Price (LKR)</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-50">
                      {approvedProducts.map((p) => (
                        <tr key={p._id} className="hover:bg-emerald-50/60">
                          <td className="px-3 py-2 font-medium text-slate-800">
                            {p.vegetable}
                          </td>
                          <td className="px-3 py-2 text-slate-600">
                            {p.quantity}
                          </td>
                          <td className="px-3 py-2 text-slate-700">
                            LKR {p.price}
                          </td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                              <CheckCircle size={12} />
                              Approved
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small UI helpers */

function StatChip({ icon, label, value, color }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-semibold border ${color}`}
    >
      <div className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center text-[11px] shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wide opacity-70">
          {label}
        </span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-2 mt-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-10 rounded-xl bg-slate-100 animate-pulse"
        ></div>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
        <Icon size={22} />
      </div>
      <p className="text-xs md:text-sm text-slate-500 text-center">{text}</p>
    </div>
  );
}