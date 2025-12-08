// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api, { getProductById } from "../api";
// import { useAuth } from "../AuthContext";

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn,token} = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         // fetch product by ID
//         const data = await getProductById(id);
//         if (data?.success) {
//           setVeg(data?.product);
//           console.log(data.product, "products")
//         }

//         else navigate("/vegetables"); // fallback if not found
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // const handleAddToCart = async () => {
//   //   setAdding(true);
//   //   try {
//   //     const payload = {
//   //       type: "vegetable",
//   //       itemId: veg._id,
//   //       name: veg.name,
//   //       image: veg.image,
//   //       unitPrice: veg.price,
//   //       quantity: Number(qty) || 1,
//   //       vegetables: veg.vegetables?.map(v => v._id) || [],
//   //     };

//   //     if (!isLoggedIn) {
//   //       // Guest cart
//   //       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   //       cart.push({ ...payload });
//   //       localStorage.setItem("cart", JSON.stringify(cart));
//   //       alert("Added to cart (guest)");
//   //     } else {
//   //       // Logged-in user cart
//   //       // const res = await api.post("/cart", payload);
//   //       // if (res.success) alert("Added to cart");
//   //       await api.post("/cart/add", payload, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     alert("Added to cart");
//   //     }

//   //     const backTo = location.state?.from || "/vegetables";
//   //     navigate(backTo);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Add to cart failed");
//   //   } finally {
//   //     setAdding(false);
//   //   }
//   // };


//   const handleAddToCart = async () => {
//   setAdding(true);

//   try {
//     // payload matches backend
//     const payload = {
//       productId: veg._id,
//       name: veg.name,
//       price: veg.price,
//       image: veg.image,
//       quantity: Number(qty) || 1,
//     };

//     if (!isLoggedIn) {
//       // Guest cart
//       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//       cart.push(payload);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       alert("Added to cart (guest)");
//     } else {
//       // Logged-in user cart
//       const res = await addToCartAPI(payload); // uses api.js helper
//       if (res.success) {
//         alert("Added to cart");
//       } else {
//         console.error("Add to cart failed:", res.message);
//         alert("Add to cart failed: " + res.message);
//       }
//     }

//     // Go back or to vegetables page
//     navigate(location.state?.from || "/vegetables");

//   } catch (err) {
//     console.error("Add to cart error:", err);
//     alert("Add to cart failed");
//   } finally {
//     setAdding(false);
//   }
// };


//   if (loading) return <p className="text-center mt-12">Loading...</p>;
//   if (!veg) return null;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow p-6 flex gap-6">
//         <img
//           src={veg.image || "https://via.placeholder.com/400x300"}
//           alt={veg.name}
//           className="w-1/2 object-cover rounded"
//         />
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold">{veg.name}</h1>
//           <p className="text-green-700 font-semibold mt-2 text-xl">₹{veg.price}</p>
//           <p className="mt-3 text-gray-600">{veg.description || "Fresh and healthy."}</p>

//           <div className="mt-6 flex items-center gap-4">
//             <label className="font-medium">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               value={qty}
//               onChange={(e) => setQty(e.target.value)}
//               className="w-24 border rounded p-2"
//             />
//           </div>

//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={handleAddToCart}
//               disabled={adding}
//               className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               {adding ? "Adding..." : "Add to Cart"}
//             </button>
//             <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setVeg(data.product);
//         } else {
//           navigate("/vegetables"); // fallback if product not found
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   // Handle Add to Cart
//   const handleAddToCart = async () => {
//     setAdding(true);
//     try {
//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: Number(qty) || 1,
//         image: veg.image,
//       };

//       if (!isLoggedIn) {
//         // Guest cart (localStorage)
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         const existingIndex = cart.findIndex((item) => item.itemId === veg._id);
//         if (existingIndex >= 0) {
//           cart[existingIndex].quantity += payload.quantity;
//         } else {
//           cart.push(payload);
//         }
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         // Logged-in user cart
//         const res = await addToCart(payload);
//         console.log("Add to cart response:", res);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-12">Loading...</p>;
//   if (!veg) return <p className="text-center mt-12">Vegetable not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6" style={{marginTop:"100px"}}>
//       <div className="bg-white rounded-lg shadow p-6 flex gap-6">
//         <img
//           src={veg.image || "https://via.placeholder.com/400x300"}
//           alt={veg.name}
//           className="w-1/2 object-cover rounded"
//         />
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold">{veg.name}</h1>
//           <p className="text-green-700 font-semibold mt-2 text-xl">₹{veg.price}</p>
//           <p className="mt-3 text-gray-600">{veg.description || "Fresh and healthy."}</p>

//           <div className="mt-6 flex items-center gap-4">
//             <label className="font-medium">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               value={qty}
//               onChange={(e) => setQty(e.target.value)}
//               className="w-24 border rounded p-2"
//             />
//           </div>

//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={handleAddToCart}
//               disabled={adding}
//               className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               {adding ? "Adding..." : "Add to Cart"}
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 border rounded"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/VegetableDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // 🔴 Quantity dropdown state
//   const [qtyOption, setQtyOption] = useState("1kg"); // "250g" | "500g" | "1kg" | "other"
//   const [customQty, setCustomQty] = useState("");    // "Other" type பண்ணக் கூடிய field

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setVeg(data.product);
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;

//     setAdding(true);
//     try {
//       // final quantity label (dropdown or custom)
//       const selectedQuantityLabel =
//         qtyOption === "other"
//           ? customQty.trim() || "1kg"
//           : qtyOption;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1,                // numeric quantity: 1 (weight label separate)
//         image: veg.image,
//         weightLabel: selectedQuantityLabel, // UIக்காக மட்டும் (guest cart ல use செய்யலாம்)
//       };

//       if (!isLoggedIn) {
//         // Guest cart (localStorage)
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         // Logged-in user cart
//         const res = await addToCart(payload);
//         console.log("Add to cart response:", res);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-20">Loading...</p>;
//   if (!veg) return <p className="text-center mt-20">Vegetable not found.</p>;

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
//           {/* Image */}
//           <img
//             src={veg.image || "/products/default.png"}
//             alt={veg.name}
//             className="w-full md:w-1/2 object-cover rounded-xl bg-green-50"
//           />

//           {/* Right panel */}
//           <div className="flex-1 flex flex-col space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {veg.name}
//             </h1>
//             <p className="text-green-700 font-semibold mt-2 text-2xl">
//               ₹{veg.price}
//             </p>
//             <p className="mt-2 text-sm sm:text-base text-gray-600">
//               {veg.description || "Fresh and healthy vegetable from local farms."}
//             </p>

//             {/* Quantity dropdown + Other input */}
//             <div className="mt-4 flex flex-wrap items-center gap-3">
//               <label className="font-medium text-sm sm:text-base">
//                 Quantity
//               </label>

//               {/* Dropdown */}
//               <select
//                 value={qtyOption}
//                 onChange={(e) => setQtyOption(e.target.value)}
//                 className="border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//               >
//                 <option value="250g">250 g</option>
//                 <option value="500g">500 g</option>
//                 <option value="1kg">1 kg</option>
//                 <option value="other">Other</option>
//               </select>

//               {/* Other text box */}
//               {qtyOption === "other" && (
//                 <input
//                   type="text"
//                   className="w-32 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                   placeholder="e.g. 750g"
//                   value={customQty}
//                   onChange={(e) => setCustomQty(e.target.value)}
//                 />
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm font-semibold"
//               >
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/VegetableDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Quantity dropdown state
//   const [qtyOption, setQtyOption] = useState("1kg"); // "250g" | "500g" | "1kg" | "other"
//   const [customQty, setCustomQty] = useState("");    // Other text field

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//            console.log("🔍 Product from API:", data.product);
//           setVeg(data.product);
          
//           // default dropdown value as product.quantity if set
//           if (data.product.quantity) {
//             setQtyOption(data.product.quantity);
//           }
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;

//     setAdding(true);
//     try {
//       // final label (dropdown or custom)
//       const selectedQuantityLabel =
//         qtyOption === "other"
//           ? customQty.trim() || veg.quantity || "1kg"
//           : qtyOption;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1,                // numeric qty, weightLabel separate
//         image: veg.image,
//         weightLabel: selectedQuantityLabel,
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-20">Loading...</p>;
//   if (!veg) return <p className="text-center mt-20">Vegetable not found.</p>;

//   // current selected label (for display)
//   const selectedLabel =
//     qtyOption === "other"
//       ? (customQty.trim() || veg.quantity || "1kg")
//       : qtyOption;

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
//           {/* Image */}
//           <img
//             src={veg.image || "/products/default.png"}
//             alt={veg.name}
//             className="w-full md:w-1/2 object-cover rounded-xl bg-green-50"
//           />

//           {/* Right panel */}
//           <div className="flex-1 flex flex-col space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {veg.name}
//             </h1>

//             <p className="text-green-700 font-semibold mt-1 text-2xl">
//               ₹{veg.price}
//             </p>

//             {/* Default unit (admin set quantity) */}
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">Available unit:</span>{" "}
//               {veg.quantity || "1kg"}
//             </p>

//             <p className="mt-2 text-sm sm:text-base text-gray-600">
//               {veg.description ||
//                 "Fresh and healthy vegetable from local farms."}
//             </p>

//             {/* Quantity dropdown + Other input */}
//             <div className="mt-4 flex flex-wrap items-center gap-3">
//               <label className="font-medium text-sm sm:text-base">
//                 Select quantity
//               </label>

//               <select
//                 value={qtyOption}
//                 onChange={(e) => setQtyOption(e.target.value)}
//                 className="border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//               >
//                 <option value="250g">250 g</option>
//                 <option value="500g">500 g</option>
//                 <option value={veg.quantity || "1kg"}>
//                   {veg.quantity || "1kg"}
//                 </option>
//                 <option value="other">Other</option>
//               </select>

//               {qtyOption === "other" && (
//                 <input
//                   type="text"
//                   className="w-32 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                   placeholder="e.g. 750g"
//                   value={customQty}
//                   onChange={(e) => setCustomQty(e.target.value)}
//                 />
//               )}
//             </div>

//             {/* Show selected quantity text */}
//             <p className="text-xs text-gray-600">
//               <span className="font-semibold">Selected quantity:</span>{" "}
//               {selectedLabel}
//             </p>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm font-semibold"
//               >
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/VegetablesDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Quantity dropdown state
//   const [qtyOption, setQtyOption] = useState("1kg"); // "250g" | "500g" | "1kg" | "other"
//   const [customQty, setCustomQty] = useState(""); // Other text field

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           console.log("Product from API:", data.product); // debug
//           setVeg(data.product);
//           // default dropdown value as product.quantity if set
//           if (data.product.quantity) {
//             setQtyOption(data.product.quantity);
//           }
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;

//     setAdding(true);
//     try {
//       // final label (dropdown or custom)
//       const selectedQuantityLabel =
//         qtyOption === "other"
//           ? customQty.trim() || veg.quantity || "1kg"
//           : qtyOption;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1, // numeric qty, weightLabel separate
//         image: veg.image,
//         weightLabel: selectedQuantityLabel,
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-20 text-gray-700">Loading...</p>;
//   if (!veg)
//     return <p className="text-center mt-20 text-gray-700">Not found.</p>;

//   // current selected label (for display)
//   const selectedLabel =
//     qtyOption === "other"
//       ? customQty.trim() || veg.quantity || "1kg"
//       : qtyOption;

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
//           {/* Image */}
//           <div className="w-full md:w-1/2">
//             <img
//               src={
//                 veg.image && veg.image.trim()
//                   ? veg.image
//                   : "https://via.placeholder.com/400x300?text=VegPack+Veg"
//               }
//               alt={veg.name}
//               className="w-full h-64 md:h-80 object-cover rounded-xl bg-green-50"
//             />
//           </div>

//           {/* Right panel */}
//           <div className="flex-1 flex flex-col space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {veg.name}
//             </h1>

//             <p className="text-green-700 font-semibold mt-1 text-2xl">
//               ₹{veg.price}
//             </p>

//             {/* Default unit (admin set quantity) */}
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">Available unit:</span>{" "}
//               {veg.quantity || "1kg"}
//             </p>

//             <p className="mt-2 text-sm sm:text-base text-gray-600">
//               {veg.description ||
//                 "Fresh and healthy vegetable from local farms."}
//             </p>

//             {/* Quantity dropdown + Other input */}
//             <div className="mt-4 flex flex-wrap items-center gap-3">
//               <label className="font-medium text-sm sm:text-base">
//                 Select quantity
//               </label>

//               <select
//                 value={qtyOption}
//                 onChange={(e) => setQtyOption(e.target.value)}
//                 className="border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//               >
//                 <option value="250g">250 g</option>
//                 <option value="500g">500 g</option>
//                 <option value={veg.quantity || "1kg"}>
//                   {veg.quantity || "1kg"}
//                 </option>
//                 <option value="other">Other</option>
//               </select>

//               {qtyOption === "other" && (
//                 <input
//                   type="text"
//                   className="w-32 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                   placeholder="e.g. 750g"
//                   value={customQty}
//                   onChange={(e) => setCustomQty(e.target.value)}
//                 />
//               )}
//             </div>

//             {/* Show selected quantity text */}
//             <p className="text-xs text-gray-600">
//               <span className="font-semibold">Selected quantity:</span>{" "}
//               {selectedLabel}
//             </p>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm font-semibold"
//               >
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() =>
//                   navigate(location.state?.from || "/vegetables")
//                 }
//                 className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/VegetablesDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";

// // Convert relative "products/xxx.jpg" → "/products/xxx.jpg"
// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Quantity dropdown state
//   const [qtyOption, setQtyOption] = useState("1kg"); // "250g" | "500g" | "1kg" | "other"
//   const [customQty, setCustomQty] = useState(""); // Other text field

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           console.log("Product from API:", data.product); // debug
//           setVeg(data.product);
//           // default dropdown value as product.quantity if set
//           if (data.product.quantity) {
//             setQtyOption(data.product.quantity);
//           }
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;

//     setAdding(true);
//     try {
//       // final label (dropdown or custom)
//       const selectedQuantityLabel =
//         qtyOption === "other"
//           ? customQty.trim() || veg.quantity || "1kg"
//           : qtyOption;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1, // numeric qty, weightLabel separate
//         image: veg.image,
//         weightLabel: selectedQuantityLabel,
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-20 text-gray-700">Loading...</p>;
//   if (!veg)
//     return <p className="text-center mt-20 text-gray-700">Not found.</p>;

//   // current selected label (for display)
//   const selectedLabel =
//     qtyOption === "other"
//       ? customQty.trim() || veg.quantity || "1kg"
//       : qtyOption;

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
//           {/* Image */}
//           <div className="w-full md:w-1/2">
//             <img
//               src={
//                 getImageUrl(veg.image) ||
//                 "https://via.placeholder.com/400x300?text=VegPack+Veg"
//               }
//               alt={veg.name}
//               className="w-full h-64 md:h-80 object-cover rounded-xl bg-green-50"
//             />
//           </div>

//           {/* Right panel */}
//           <div className="flex-1 flex flex-col space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {veg.name}
//             </h1>

//             <p className="text-green-700 font-semibold mt-1 text-2xl">
//               ₹{veg.price}
//             </p>

//             {/* Default unit (admin set quantity) */}
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">Available unit:</span>{" "}
//               {veg.quantity || "1kg"}
//             </p>

//             <p className="mt-2 text-sm sm:text-base text-gray-600">
//               {veg.description ||
//                 "Fresh and healthy vegetable from local farms."}
//             </p>

//             {/* Quantity dropdown + Other input */}
//             <div className="mt-4 flex flex-wrap items-center gap-3">
//               <label className="font-medium text-sm sm:text-base">
//                 Select quantity
//               </label>

//               <select
//                 value={qtyOption}
//                 onChange={(e) => setQtyOption(e.target.value)}
//                 className="border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//               >
//                 <option value="250g">250 g</option>
//                 <option value="500g">500 g</option>
//                 <option value={veg.quantity || "1kg"}>
//                   {veg.quantity || "1kg"}
//                 </option>
//                 <option value="other">Other</option>
//               </select>

//               {qtyOption === "other" && (
//                 <input
//                   type="text"
//                   className="w-32 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                   placeholder="e.g. 750g"
//                   value={customQty}
//                   onChange={(e) => setCustomQty(e.target.value)}
//                 />
//               )}
//             </div>

//             {/* Show selected quantity text */}
//             <p className="text-xs text-gray-600">
//               <span className="font-semibold">Selected quantity:</span>{" "}
//               {selectedLabel}
//             </p>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm font-semibold"
//               >
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() =>
//                   navigate(location.state?.from || "/vegetables")
//                 }
//                 className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/VegetablesDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";
// import { ArrowLeft, ShoppingCart } from "lucide-react";

// // Convert relative "products/xxx.jpg" → "/products/xxx.jpg"
// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Quantity dropdown state
//   const [qtyOption, setQtyOption] = useState("1kg"); // "250g" | "500g" | "1kg" | "other"
//   const [customQty, setCustomQty] = useState(""); // Other text field

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setVeg(data.product);
//           // default dropdown value as product.quantity if set
//           if (data.product.quantity) {
//             setQtyOption(data.product.quantity);
//           }
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;

//     setAdding(true);
//     try {
//       // final label (dropdown or custom)
//       const selectedQuantityLabel =
//         qtyOption === "other"
//           ? customQty.trim() || veg.quantity || "1kg"
//           : qtyOption;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1, // numeric qty, weightLabel separate
//         image: veg.image,
//         weightLabel: selectedQuantityLabel,
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }

//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-20 text-gray-700">Loading...</p>;
//   if (!veg)
//     return <p className="text-center mt-20 text-gray-700">Not found.</p>;

//   // current selected label (for display)
//   const selectedLabel =
//     qtyOption === "other"
//       ? customQty.trim() || veg.quantity || "1kg"
//       : qtyOption;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 pt-24 pb-10 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(location.state?.from || "/vegetables")}
//           className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-900"
//         >
//           <ArrowLeft size={18} />
//           Back to Vegetables
//         </button>

//         {/* Main Card */}
//         <div className="bg-white/95 rounded-3xl shadow-xl border border-green-100 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 flex flex-col lg:flex-row gap-8">
//           {/* Image Section */}
//           <div className="lg:w-1/2 w-full flex items-center justify-center">
//             <div className="w-full bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center p-3 sm:p-4 lg:p-5">
//               <img
//                 src={
//                   getImageUrl(veg.image) ||
//                   "https://via.placeholder.com/600x400?text=VegPack+Veg"
//                 }
//                 alt={veg.name}
//                 className="w-full h-full max-h-[420px] object-contain rounded-xl"
//               />
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className="flex-1 flex flex-col space-y-4">
//             {/* Title + Tag */}
//             <div>
//               <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold uppercase tracking-wide">
//                 Fresh Vegetable
//               </span>
//               <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
//                 {veg.name}
//               </h1>
//             </div>

//             {/* Price + Quantity */}
//             <div className="flex flex-wrap items-center gap-4">
//               <div>
//                 <p className="text-xs uppercase text-gray-500 tracking-wide">
//                   Price
//                 </p>
//                 <p className="text-3xl font-bold text-green-700">
//                   ₹{veg.price}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase text-gray-500 tracking-wide">
//                   Default Unit
//                 </p>
//                 <p className="text-sm font-semibold text-gray-800">
//                   {veg.quantity || "1kg"}
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//                 {veg.description && veg.description.trim().length > 0
//                   ? veg.description
//                   : "Fresh, organic vegetables sourced from trusted local farms. Cleaned, sorted, and delivered with care to ensure maximum nutrition and taste."}
//               </p>
//             </div>

//             {/* Quantity & Selector */}
//             <div className="mt-1">
//               <p className="text-xs font-semibold text-gray-600 mb-1">
//                 Choose your quantity
//               </p>
//               <div className="flex flex-wrap items-center gap-3">
//                 <select
//                   value={qtyOption}
//                   onChange={(e) => setQtyOption(e.target.value)}
//                   className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                 >
//                   <option value="250g">250 g</option>
//                   <option value="500g">500 g</option>
//                   <option value={veg.quantity || "1kg"}>
//                     {veg.quantity || "1kg"}
//                   </option>
//                   <option value="other">Other</option>
//                 </select>

//                 {qtyOption === "other" && (
//                   <input
//                     type="text"
//                     className="w-32 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//                     placeholder="e.g. 750g"
//                     value={customQty}
//                     onChange={(e) => setCustomQty(e.target.value)}
//                   />
//                 )}

//                 <span className="text-xs text-gray-600">
//                   Selected:{" "}
//                   <span className="font-semibold">{selectedLabel}</span>
//                 </span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="pt-3 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full hover:bg-green-700 transition text-sm font-semibold shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <ShoppingCart size={18} />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() =>
//                   navigate(location.state?.from || "/vegetables")
//                 }
//                 className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
//               >
//                 Cancel / Back
//               </button>
//             </div>

//             {/* Info note */}
//             <p className="pt-1 text-xs text-gray-500">
//               All our vegetables are washed and packed with minimal plastic.
//               Delivery available next morning for orders placed before 9 PM.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";
// import { ArrowLeft, ShoppingCart, Check, Loader2, Heart } from "lucide-react";
// import { motion } from "framer-motion";

// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);
  
//   const [weightOptions, setWeightOptions] = useState(["250g", "500g", "1kg"]);
//   const [selectedWeight, setSelectedWeight] = useState("1kg");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success && data.product) {
//           const product = data.product;
//           setVeg(product);
//           if (product.quantity) {
//             setSelectedWeight(product.quantity);
//             setWeightOptions(prev => 
//               prev.includes(product.quantity) ? prev : [...prev, product.quantity]
//             );
//           }
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!veg) return;
//     setAdding(true);
//     try {
//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         unitPrice: veg.price,
//         quantity: 1,
//         image: veg.image,
//         weightLabel: selectedWeight,
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-2" />
//         <p className="text-gray-500 font-medium text-xs">Loading...</p>
//     </div>
//   );

//   if (!veg) return null;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-10 px-4 font-sans text-slate-900" style={{paddingTop:"150px",paddingBottom:"80px"}}>
//       <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100 relative">
        
//         {/* Back Button */}
//         <button 
//             onClick={() => navigate(location.state?.from || "/vegetables")}
//             className="absolute top-6 left-6 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
//         >
//             <ArrowLeft size={18} className="text-slate-600" /> 
//         </button>

//         <div className="grid md:grid-cols-2 gap-8 items-center">
            
//             {/* LEFT: Small Image Card */}
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center h-[280px] relative overflow-hidden"
//             >
//                 <div className="absolute inset-0 bg-green-50/40 rounded-2xl"></div>
//                 <img 
//                     src={getImageUrl(veg.image) || "/products/default.png"} 
//                     alt={veg.name}
//                     // Very Small Image Size
//                     className="relative z-10 w-full max-w-[160px] h-full object-contain drop-shadow-lg"
//                 />
//             </motion.div>

//             {/* RIGHT: Compact Details */}
//             <motion.div 
//                 initial={{ opacity: 0, x: 10 }} 
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="flex flex-col justify-center"
//             >
//                 <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider bg-green-50 px-2 py-1 rounded w-fit mb-2">
//                     Organic
//                 </span>

//                 <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
//                     {veg.name}
//                 </h1>

//                 <div className="flex items-center gap-3 mb-4">
//                     <p className="text-2xl font-bold text-green-700">₹{veg.price}</p>
//                     <span className="text-slate-400 text-xs line-through">₹{Math.round(veg.price * 1.2)}</span>
//                 </div>

//                 <p className="text-slate-500 text-xs leading-relaxed mb-5">
//                     {veg.description || "Freshly harvested organic vegetables sourced directly from local farms."}
//                 </p>

//                 {/* Compact Quantity Selector */}
//                 <div className="mb-5">
//                     <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Quantity</label>
//                     <div className="flex flex-wrap gap-2">
//                         {weightOptions.map((option) => (
//                             <button
//                                 key={option}
//                                 onClick={() => setSelectedWeight(option)}
//                                 className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
//                                     selectedWeight === option
//                                     ? "border-green-600 bg-green-50 text-green-700"
//                                     : "border-slate-200 bg-white text-slate-600 hover:border-green-400"
//                                 }`}
//                             >
//                                 {selectedWeight === option && <Check size={10} strokeWidth={3} />}
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Compact Buttons */}
//                 <div className="flex gap-2">
//                     <button 
//                         onClick={handleAddToCart}
//                         disabled={adding}
//                         className="flex-1 bg-slate-900 text-white py-3 rounded-lg text-xs font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
//                     >
//                         {adding ? <Loader2 className="animate-spin" size={14}/> : <ShoppingCart size={14} />}
//                         {adding ? "Adding..." : "Add to Cart"}
//                     </button>
                    
//                     <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
//                         <Heart size={16} />
//                     </button>
//                 </div>

//             </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";
// import { ArrowLeft, ShoppingCart, Check, Loader2, Edit3 } from "lucide-react";
// import { motion } from "framer-motion";

// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);
  
//   const defaultOptions = ["250g", "500g", "1kg"];
//   const [selectedWeight, setSelectedWeight] = useState("1kg");
//   const [isCustom, setIsCustom] = useState(false);
//   const [customQty, setCustomQty] = useState("");
//   const [calculatedPrice, setCalculatedPrice] = useState(0);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success && data.product) {
//           setVeg(data.product);
//           setCalculatedPrice(data.product.price); 
//           if (data.product.quantity) setSelectedWeight(data.product.quantity);
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   useEffect(() => {
//     if (!veg) return;
//     let pricePerKg = veg.price;
//     if (veg.quantity === "500g") pricePerKg = veg.price * 2;
//     if (veg.quantity === "250g") pricePerKg = veg.price * 4;

//     let multiplier = 1;
//     if (isCustom) {
//         const num = parseFloat(customQty);
//         if (!isNaN(num)) {
//             if (customQty.toLowerCase().includes("g") && !customQty.toLowerCase().includes("kg")) multiplier = num / 1000;
//             else multiplier = num;
//         }
//     } else {
//         if (selectedWeight === "250g") multiplier = 0.25;
//         if (selectedWeight === "500g") multiplier = 0.5;
//         if (selectedWeight === "1kg") multiplier = 1;
//         if (selectedWeight === "2kg") multiplier = 2;
//     }
//     setCalculatedPrice(Math.round(pricePerKg * multiplier));
//   }, [selectedWeight, isCustom, customQty, veg]);

//   const handleAddToCart = async () => {
//     if (!veg) return;
//     const finalQuantity = isCustom ? customQty : selectedWeight;
//     if (isCustom && !customQty.trim()) { alert("Please enter a quantity!"); return; }

//     setAdding(true);
//     try {
//       const payload = {
//         type: "vegetable", itemId: veg._id, name: veg.name, unitPrice: veg.price,
//         quantity: 1, image: veg.image, weightLabel: finalQuantity, totalPrice: calculatedPrice
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-2" />
//         <p className="text-gray-500 font-medium text-xs">Loading...</p>
//     </div>
//   );

//   if (!veg) return null;

//   return (
//     <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center py-10 px-4 font-sans text-slate-900" style={{paddingTop:"150px",paddingBottom:"80px"}}>
      
//       {/* Increased Border Radius to 3rem (rounded-[3rem]) */}
//       <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-10 border border-white/60 relative overflow-hidden">
        
//         {/* Background Decorative Blob */}
//         <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-100/50 rounded-full blur-3xl pointer-events-none"></div>

//         <button 
//             onClick={() => navigate(location.state?.from || "/vegetables")}
//             className="absolute top-8 left-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors z-20 shadow-sm"
//         >
//             <ArrowLeft size={20} className="text-slate-600" /> 
//         </button>

//         <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
            
//             {/* LEFT: Image */}
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }}
//                 // More Rounded Image Container
//                 className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 flex items-center justify-center h-[320px] relative overflow-hidden shadow-inner"
//             >
//                 <div className="absolute inset-0 bg-green-50/40 rounded-[2.5rem]"></div>
//                 <img 
//                     src={getImageUrl(veg.image) || "/products/default.png"} 
//                     alt={veg.name}
//                     className="relative z-10 w-full max-w-[180px] h-full object-contain drop-shadow-2xl"
//                 />
//             </motion.div>

//             {/* RIGHT: Details */}
//             <motion.div 
//                 initial={{ opacity: 0, x: 10 }} 
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="flex flex-col justify-center"
//             >
//                 <span className="text-green-700 text-[10px] font-bold uppercase tracking-wider bg-green-100 px-3 py-1.5 rounded-full w-fit mb-3">
//                     Fresh & Organic
//                 </span>

//                 <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tighter">
//                     {veg.name}
//                 </h1>

//                 <div className="flex items-center gap-3 mb-5">
//                     <p className="text-4xl font-black text-green-700">₹{calculatedPrice}</p>
//                     <span className="text-slate-400 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg">
//                         Base: ₹{veg.price} / {veg.quantity || "1kg"}
//                     </span>
//                 </div>

//                 <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3 font-medium">
//                     {veg.description || "Harvested daily from local organic farms to ensure maximum freshness and nutrition for your family."}
//                 </p>

//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                     <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Select Quantity</label>
//                     <div className="flex flex-wrap gap-3">
//                         {defaultOptions.map((option) => (
//                             <button
//                                 key={option}
//                                 onClick={() => { setSelectedWeight(option); setIsCustom(false); }}
//                                 className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
//                                     !isCustom && selectedWeight === option
//                                     ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-200"
//                                     : "border-slate-200 bg-white text-slate-600 hover:border-green-400 hover:text-green-600"
//                                 }`}
//                             >
//                                 {!isCustom && selectedWeight === option && <Check size={12} strokeWidth={3} />}
//                                 {option}
//                             </button>
//                         ))}

//                         <button
//                             onClick={() => { setIsCustom(true); setCustomQty(""); }}
//                             className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
//                                 isCustom
//                                 ? "border-green-600 bg-green-600 text-white shadow-md"
//                                 : "border-slate-200 bg-white text-slate-600 hover:border-green-400"
//                             }`}
//                         >
//                             {isCustom && <Check size={12} strokeWidth={3} />}
//                             Other
//                         </button>
//                     </div>

//                     {isCustom && (
//                         <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
//                             <div className="relative flex items-center gap-2">
//                                 <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                                 <input 
//                                     type="text" 
//                                     placeholder="e.g. 2kg" 
//                                     value={customQty}
//                                     onChange={(e) => setCustomQty(e.target.value)}
//                                     className="w-full pl-9 pr-4 py-2.5 border border-green-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500/20 outline-none transition-all bg-slate-50 focus:bg-white"
//                                 />
//                             </div>
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* Add Button */}
//                 <button 
//                     onClick={handleAddToCart}
//                     disabled={adding}
//                     className="w-full bg-slate-900 text-black py-4 rounded-2xl text-sm font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                     {adding ? <Loader2 className="animate-spin" size={16}/> : <ShoppingCart size={16} />}
//                     {adding ? "Adding..." : `Add to Cart - ₹${calculatedPrice}`}
//                 </button>

//             </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";
// import { ArrowLeft, ShoppingCart, Check, Loader2, Edit3, Star, Truck, ShieldCheck } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // Helper
// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);
  
//   const defaultOptions = ["250g", "500g", "1kg"];
//   const [selectedWeight, setSelectedWeight] = useState("1kg");
//   const [isCustom, setIsCustom] = useState(false);
//   const [customQty, setCustomQty] = useState("");
//   const [calculatedPrice, setCalculatedPrice] = useState(0);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success && data.product) {
//           setVeg(data.product);
//           setCalculatedPrice(data.product.price); 
//           if (data.product.quantity) setSelectedWeight(data.product.quantity);
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   useEffect(() => {
//     if (!veg) return;
//     let pricePerKg = veg.price;
//     if (veg.quantity === "500g") pricePerKg = veg.price * 2;
//     if (veg.quantity === "250g") pricePerKg = veg.price * 4;

//     let multiplier = 1;
//     if (isCustom) {
//         const num = parseFloat(customQty);
//         if (!isNaN(num)) {
//             if (customQty.toLowerCase().includes("g") && !customQty.toLowerCase().includes("kg")) multiplier = num / 1000;
//             else multiplier = num;
//         }
//     } else {
//         if (selectedWeight === "250g") multiplier = 0.25;
//         if (selectedWeight === "500g") multiplier = 0.5;
//         if (selectedWeight === "1kg") multiplier = 1;
//         if (selectedWeight === "2kg") multiplier = 2;
//     }
//     setCalculatedPrice(Math.round(pricePerKg * multiplier));
//   }, [selectedWeight, isCustom, customQty, veg]);

//   const handleAddToCart = async () => {
//     if (!veg) return;
//     const finalQuantity = isCustom ? customQty : selectedWeight;
//     if (isCustom && !customQty.trim()) { alert("Please enter a quantity!"); return; }

//     setAdding(true);
//     try {
//       const payload = {
//         type: "vegetable", itemId: veg._id, name: veg.name, unitPrice: veg.price,
//         quantity: 1, image: veg.image, weightLabel: finalQuantity, totalPrice: calculatedPrice
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-10 h-10 text-green-700 animate-spin mb-3" />
//         <p className="text-gray-500 font-medium">Loading product...</p>
//     </div>
//   );

//   if (!veg) return null;

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] py-24 px-4 md:px-8 font-sans text-slate-900 flex justify-center">
//       <div className="max-w-6xl w-full">
        
//         {/* Breadcrumb / Back */}
//         <button 
//             onClick={() => navigate(location.state?.from || "/vegetables")}
//             className="flex items-center text-slate-500 hover:text-green-700 transition-colors mb-6 text-sm font-semibold"
//         >
//             <ArrowLeft size={18} className="mr-2" /> Back to Market
//         </button>

//         <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden grid md:grid-cols-2 min-h-[600px]">
            
//             {/* LEFT: Product Image Area */}
//             <div className="bg-[#F0FDF4] relative flex items-center justify-center p-10 group">
//                 {/* Decorative Circle */}
//                 <div className="absolute w-[400px] h-[400px] bg-green-200/50 rounded-full blur-3xl"></div>
                
//                 <motion.img 
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     src={getImageUrl(veg.image) || "/products/default.png"} 
//                     alt={veg.name}
//                     className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
//                 />

//                 <div className="absolute top-6 left-6">
//                     <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-green-800 uppercase tracking-wider border border-green-100">
//                         100% Organic
//                     </span>
//                 </div>
//             </div>

//             {/* RIGHT: Details & Logic */}
//             <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                
//                 {/* Header */}
//                 <div className="mb-6 border-b border-slate-100 pb-6">
//                     <div className="flex justify-between items-start">
//                         <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{veg.name}</h1>
//                         <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
//                             <Star fill="currentColor" size={14} />
//                             <span className="text-xs font-bold text-yellow-700">4.9</span>
//                         </div>
//                     </div>
//                     <p className="text-slate-500 text-sm leading-relaxed mt-2">
//                         {veg.description || "Freshly harvested, cleaned, and packed with care. Sourced directly from certified organic farms to ensure the best nutrition for you."}
//                     </p>
//                 </div>

//                 {/* Price Display */}
//                 <div className="mb-8">
//                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Total Price</p>
//                     <div className="flex items-end gap-2">
//                         <span className="text-5xl font-black text-green-700">₹{calculatedPrice}</span>
//                         <span className="text-slate-400 font-medium mb-2 text-sm">/ {isCustom ? customQty : selectedWeight}</span>
//                     </div>
//                 </div>

//                 {/* Quantity Selection */}
//                 <div className="mb-8">
//                     <label className="text-sm font-bold text-slate-900 mb-3 block">Choose Quantity</label>
//                     <div className="flex flex-wrap gap-3">
//                         {defaultOptions.map((option) => (
//                             <button
//                                 key={option}
//                                 onClick={() => { setSelectedWeight(option); setIsCustom(false); }}
//                                 className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
//                                     !isCustom && selectedWeight === option
//                                     ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
//                                     : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
//                                 }`}
//                             >
//                                 {option}
//                             </button>
//                         ))}

//                         <button
//                             onClick={() => { setIsCustom(true); setCustomQty(""); }}
//                             className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
//                                 isCustom
//                                 ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
//                                 : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
//                             }`}
//                         >
//                             Other
//                         </button>
//                     </div>

//                     {/* Custom Input */}
//                     <AnimatePresence>
//                         {isCustom && (
//                             <motion.div 
//                                 initial={{ opacity: 0, height: 0 }} 
//                                 animate={{ opacity: 1, height: "auto" }} 
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="mt-4"
//                             >
//                                 <div className="relative max-w-xs">
//                                     <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                     <input 
//                                         type="text" 
//                                         placeholder="Enter weight (e.g. 2.5kg)" 
//                                         value={customQty}
//                                         onChange={(e) => setCustomQty(e.target.value)}
//                                         className="w-full pl-11 pr-4 py-3 border-2 border-green-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-0 focus:border-green-600 outline-none bg-white transition-colors"
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Action Button */}
//                 <div className="flex gap-4 items-center">
//                     <button 
//                         onClick={handleAddToCart}
//                         disabled={adding}
//                         className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-base font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                         {adding ? <Loader2 className="animate-spin" size={20}/> : <ShoppingCart size={20} />}
//                         {adding ? "Adding to Cart..." : "Add to Cart"}
//                     </button>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
//                     <div className="flex items-center gap-3">
//                         <div className="bg-green-50 p-2 rounded-lg text-green-700"><Truck size={18} /></div>
//                         <div>
//                             <p className="text-xs font-bold text-slate-900">Fast Delivery</p>
//                             <p className="text-[10px] text-slate-500">Within 24 hours</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className="bg-green-50 p-2 rounded-lg text-green-700"><ShieldCheck size={18} /></div>
//                         <div>
//                             <p className="text-xs font-bold text-slate-900">Quality Check</p>
//                             <p className="text-[10px] text-slate-500">100% Fresh Guaranteed</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getProductById, addToCart } from "../api";
// import { ArrowLeft, ShoppingCart, Check, Loader2, Edit3, Star, Truck, ShieldCheck, Heart } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetableDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [veg, setVeg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);
  
//   const defaultOptions = ["250g", "500g", "1kg"];
//   const [selectedWeight, setSelectedWeight] = useState("1kg");
//   const [isCustom, setIsCustom] = useState(false);
//   const [customQty, setCustomQty] = useState("");
//   const [calculatedPrice, setCalculatedPrice] = useState(0);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success && data.product) {
//           setVeg(data.product);
//           setCalculatedPrice(data.product.price); 
//           if (data.product.quantity) setSelectedWeight(data.product.quantity);
//         } else {
//           navigate("/vegetables");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         navigate("/vegetables");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   useEffect(() => {
//     if (!veg) return;
//     let pricePerKg = veg.price;
//     if (veg.quantity === "500g") pricePerKg = veg.price * 2;
//     if (veg.quantity === "250g") pricePerKg = veg.price * 4;

//     let multiplier = 1;
//     if (isCustom) {
//         const num = parseFloat(customQty);
//         if (!isNaN(num)) {
//             if (customQty.toLowerCase().includes("g") && !customQty.toLowerCase().includes("kg")) multiplier = num / 1000;
//             else multiplier = num;
//         }
//     } else {
//         if (selectedWeight === "250g") multiplier = 0.25;
//         if (selectedWeight === "500g") multiplier = 0.5;
//         if (selectedWeight === "1kg") multiplier = 1;
//         if (selectedWeight === "2kg") multiplier = 2;
//     }
//     setCalculatedPrice(Math.round(pricePerKg * multiplier));
//   }, [selectedWeight, isCustom, customQty, veg]);

//   const handleAddToCart = async () => {
//     if (!veg) return;
//     const finalQuantity = isCustom ? customQty : selectedWeight;
//     if (isCustom && !customQty.trim()) { alert("Please enter a quantity!"); return; }

//     setAdding(true);
//     try {
//       const payload = {
//         type: "vegetable",
//         itemId: veg._id, 
//         name: veg.name, 
//         unitPrice: veg.price,
//         quantity: 1, 
//         image: veg.image, 
//         weightLabel: finalQuantity, 
//         totalPrice: calculatedPrice
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//       navigate(location.state?.from || "/vegetables");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-10 h-10 text-green-700 animate-spin mb-3" />
//         <p className="text-gray-500 font-medium">Loading product...</p>
//     </div>
//   );

//   if (!veg) return null;

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] py-24 px-4 md:px-8 font-sans text-slate-900 flex justify-center" style={{marginLeft:"100px",marginRight:"100px"}}>
//       <div className="max-w-6xl w-full">
        
//         {/* Breadcrumb / Back */}
//         <button 
//             onClick={() => navigate(location.state?.from || "/vegetables")}
//             className="flex items-center text-slate-500 hover:text-green-700 transition-colors mb-6 text-sm font-semibold"
//         >
//             <ArrowLeft size={18} className="mr-2" /> Back to Market
//         </button>

//         <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden  min-h-[600px] p-6 gap-8" style={{display:"flex"}}>
            
//             {/* LEFT: Image Inside Card */}
//             <div className="flex items-center justify-center h-full" style={{width:"500px",height:"500px",marginLeft:"20px",marginTop:"20px"}}>
//                 <motion.div 
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-[#F0FDF4] border border-green-100 rounded-[2rem] w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden shadow-inner group"
//                 >
//                     {/* Floating Image */}
//                     <motion.img 
//                         src={getImageUrl(veg.image) || "/products/default.png"} 
//                         alt={veg.name}
//                         className="relative z-10 w-74 h-74  drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" style={{objectFit:"cover"}}
//                     />

//                     {/* Badge Top Left */}
//                     <div className="absolute top-2 left-6">
//                         <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-green-800 uppercase tracking-wider border border-green-100 shadow-sm">
//                             100% Organic
//                         </span>
//                     </div>

//                     {/* Heart Button Top Right */}
//                     <button className="absolute top-6 right-6 p-3 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all">
//                         <Heart size={20} />
//                     </button>
//                 </motion.div>
//             </div>

//             {/* RIGHT: Details & Logic */}
//             <div className="flex flex-col justify-center py-4 pr-4" style={{marginLeft:"50px"}}>
                
//                 {/* Header */}
//                 <div className="mb-6 border-b border-slate-100 pb-6">
//                     <div className="flex justify-between items-start">
//                         <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{veg.name}</h1>
//                         <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
//                             <Star fill="currentColor" size={14} />
//                             <span className="text-xs font-bold text-yellow-700">4.9</span>
//                         </div>
//                     </div>
//                     <p className="text-slate-500 text-sm leading-relaxed mt-2">
//                         {veg.description || "Freshly harvested, cleaned, and packed with care. Sourced directly from certified organic farms to ensure the best nutrition for you."}
//                     </p>
//                 </div>

//                 {/* Price Display */}
//                 <div className="mb-8">
//                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Total Price</p>
//                     <div className="flex items-end gap-2">
//                         <span className="text-5xl font-black text-green-700">₹{calculatedPrice}</span>
//                         <span className="text-slate-400 font-medium mb-2 text-sm">/ {isCustom ? customQty : selectedWeight}</span>
//                     </div>
//                 </div>

//                 {/* Quantity Selection */}
//                 <div className="mb-8">
//                     <label className="text-sm font-bold text-slate-900 mb-3 block">Choose Quantity</label>
//                     <div className="flex flex-wrap gap-3">
//                         {defaultOptions.map((option) => (
//                             <button
//                                 key={option}
//                                 onClick={() => { setSelectedWeight(option); setIsCustom(false); }}
//                                 className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
//                                     !isCustom && selectedWeight === option
//                                     ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
//                                     : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
//                                 }`}
//                             >
//                                 {!isCustom && selectedWeight === option && <Check size={14} strokeWidth={3} />}
//                                 {option}
//                             </button>
//                         ))}

//                         <button
//                             onClick={() => { setIsCustom(true); setCustomQty(""); }}
//                             className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
//                                 isCustom
//                                 ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
//                                 : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
//                             }`}
//                         >
//                             {isCustom && <Check size={14} strokeWidth={3} />}
//                             Other
//                         </button>
//                     </div>

//                     {/* Custom Input */}
//                     <AnimatePresence>
//                         {isCustom && (
//                             <motion.div 
//                                 initial={{ opacity: 0, height: 0 }} 
//                                 animate={{ opacity: 1, height: "auto" }} 
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="mt-4"
//                             >
//                                 <div className="relative max-w-xs">
//                                     <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                                     <input 
//                                         type="text" 
//                                         placeholder="Enter weight (e.g. 2.5kg)" 
//                                         value={customQty}
//                                         onChange={(e) => setCustomQty(e.target.value)}
//                                         className="w-full pl-11 pr-4 py-3 border-2 border-green-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-0 focus:border-green-600 outline-none bg-white transition-colors"
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Action Button */}
//                 <div className="flex gap-4 items-center" style={{width:"160px",marginLeft:"420px"}}>
//                     <button 
//                         onClick={handleAddToCart}
//                         disabled={adding}
//                         className="flex-1  text-white py-4 rounded-2xl text-base font-bold  transition-all flex items-center justify-center gap-3  active:scale-55 disabled:opacity-70 disabled:cursor-not-allowed" style={{backgroundColor:"blue",borderRadius:"20px"}}
//                     >
//                         {adding ? <Loader2 className="animate-spin" size={20}/> : <ShoppingCart size={20} />}
//                         {adding ? "Adding to Cart..." : "Add to Cart"}
//                     </button>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
//                     <div className="flex items-center gap-3">
                       
                       
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className="bg-green-50 p-2 rounded-lg text-green-700"><ShieldCheck size={18} /></div>
//                         <div>
//                             <p className="text-xs font-bold text-slate-900">Quality Check</p>
//                             <p className="text-[10px] text-slate-500">100% Fresh Guaranteed</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getProductById, addToCart } from "../api";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Loader2,
  Edit3,
  Star,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return "/" + path.replace(/^\/+/, "");
};

export default function VegetableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const [veg, setVeg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const defaultOptions = ["250g", "500g", "1kg"];
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [isCustom, setIsCustom] = useState(false);
  const [customQty, setCustomQty] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Product fetch
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (data?.success && data.product) {
          setVeg(data.product);
          setCalculatedPrice(data.product.price);
          if (data.product.quantity) setSelectedWeight(data.product.quantity);
        } else {
          navigate("/vegetables");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        navigate("/vegetables");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Price calculation based on selected weight
  useEffect(() => {
    if (!veg) return;

    let pricePerKg = veg.price;

    // Base quantity → 1kg price derive
    if (veg.quantity === "500g") pricePerKg = veg.price * 2;
    if (veg.quantity === "250g") pricePerKg = veg.price * 4;
    // If veg.quantity == "1kg" or others → already per kg

    let multiplier = 1;

    if (isCustom) {
      const num = parseFloat(customQty);
      if (!isNaN(num)) {
        const q = customQty.toLowerCase();
        if (q.includes("g") && !q.includes("kg")) {
          // e.g. "750g" → 0.75 kg
          multiplier = num / 1000;
        } else {
          // e.g. "2", "2kg" → assume kg multiples
          multiplier = num;
        }
      }
    } else {
      if (selectedWeight === "250g") multiplier = 0.25;
      if (selectedWeight === "500g") multiplier = 0.5;
      if (selectedWeight === "1kg") multiplier = 1;
      if (selectedWeight === "2kg") multiplier = 2;
    }

    setCalculatedPrice(Math.round(pricePerKg * multiplier));
  }, [selectedWeight, isCustom, customQty, veg]);

  const handleAddToCart = async () => {
    if (!veg) return;
    const finalQuantity = isCustom ? customQty : selectedWeight;

    if (isCustom && !customQty.trim()) {
      alert("Please enter a quantity!");
      return;
    }

    setAdding(true);
    try {
      const payload = {
        type: "vegetable",
        itemId: veg._id,
        name: veg.name,

        // ✅ IMPORTANT: use calculatedPrice, not veg.price
        unitPrice: calculatedPrice,
        quantity: 1,

        image: veg.image,
        weightLabel: finalQuantity,

        // optional, backend ignore this and recompute, but keep consistent
        totalPrice: calculatedPrice,
      };

      if (!isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart (guest)");
      } else {
        await addToCart(payload);
        alert("Added to cart");
      }

      navigate(location.state?.from || "/vegetables");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Add to cart failed");
    } finally {
      setAdding(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-green-700 animate-spin mb-3" />
        <p className="text-gray-500 font-medium">Loading product...</p>
      </div>
    );

  if (!veg) return null;

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] py-24 px-4 md:px-8 font-sans text-slate-900 flex justify-center"
      style={{ marginLeft: "100px", marginRight: "100px" }}
    >
      <div className="max-w-6xl w-full">
        {/* Back */}
        <button
          onClick={() => navigate(location.state?.from || "/vegetables")}
          className="flex items-center text-slate-500 hover:text-green-700 transition-colors mb-6 text-sm font-semibold"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Market
        </button>

        <div
          className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden min-h-[600px] p-6 gap-8"
          style={{ display: "flex" }}
        >
          {/* LEFT: Image */}
          <div
            className="flex items-center justify-center h-full"
            style={{
              width: "500px",
              height: "500px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F0FDF4] border border-green-100 rounded-[2rem] w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden shadow-inner group"
            >
              <motion.img
                src={getImageUrl(veg.image) || "/products/default.png"}
                alt={veg.name}
                className="relative z-10 w-74 h-74 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              />

              {/* Badge */}
              <div className="absolute top-2 left-6">
                <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-green-800 uppercase tracking-wider border border-green-100 shadow-sm">
                  100% Organic
                </span>
              </div>

              {/* Heart */}
              <button className="absolute top-6 right-6 p-3 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all">
                <Heart size={20} />
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Details */}
          <div
            className="flex flex-col justify-center py-4 pr-4"
            style={{ marginLeft: "50px" }}
          >
            {/* Header */}
            <div className="mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                  {veg.name}
                </h1>
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star fill="currentColor" size={14} />
                  <span className="text-xs font-bold text-yellow-700">
                    4.9
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                {veg.description ||
                  "Freshly harvested, cleaned, and packed with care. Sourced directly from certified organic farms to ensure the best nutrition for you."}
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                Total Price
              </p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-green-700">
                  Rs.{calculatedPrice}
                </span>
                <span className="text-slate-400 font-medium mb-2 text-sm">
                  / {isCustom ? customQty || "custom" : selectedWeight}
                </span>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <label className="text-sm font-bold text-slate-900 mb-3 block">
                Choose Quantity
              </label>
              <div className="flex flex-wrap gap-3">
                {defaultOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedWeight(option);
                      setIsCustom(false);
                    }}
                    className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
                      !isCustom && selectedWeight === option
                        ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                        : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
                    }`}
                  >
                    {!isCustom && selectedWeight === option && (
                      <Check size={14} strokeWidth={3} />
                    )}
                    {option}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsCustom(true);
                    setCustomQty("");
                  }}
                  className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
                    isCustom
                      ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-green-400 hover:bg-white"
                  }`}
                >
                  {isCustom && <Check size={14} strokeWidth={3} />}
                  Other
                </button>
              </div>

              {/* Custom Input */}
              <AnimatePresence>
                {isCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="relative max-w-xs">
                      <Edit3
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Enter weight (e.g. 2.5kg or 750g)"
                        value={customQty}
                        onChange={(e) => setCustomQty(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-green-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-0 focus:border-green-600 outline-none bg-white transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add to Cart */}
            <div
              className="flex gap-4 items-center"
              style={{ width: "160px", marginLeft: "420px" }}
            >
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 text-white py-4 rounded-2xl text-base font-bold transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: "blue", borderRadius: "20px" }}
              >
                {adding ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ShoppingCart size={20} />
                )}
                {adding ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3" />
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg text-green-700">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Quality Check
                  </p>
                  <p className="text-[10px] text-slate-500">
                    100% Fresh Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}