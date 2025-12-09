// // src/pages/PackageDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api, { getProductById } from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackageDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn,token } = useAuth();

//   const [pack, setPack] = useState(null);
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
//           setPack(data?.product);
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

//   const handleAddToCart = async () => {
//     setAdding(true);
//     try {
//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image,
//         unitPrice: pack.price,
//         quantity: Number(qty) || 1,
//         vegetables: pack.vegetables?.map(v => v._id) || [],
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         // const res = await api.post("/cart", payload);
//         // if (res.data.success) alert("Added to cart");
//         await api.post("/cart/add", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Added to cart");
//       }

//       const backTo = location.state?.from || "/packages";
//       navigate(backTo);
//     } catch (err) {
//       console.error(err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-12">Loading...</p>;
//   if (!pack) return null;

//   return (
//     <div className="max-w-4xl mx-auto p-6" style={{marginTop:"100px"}} >
//       <div className="bg-white rounded-lg shadow p-6">
//         <img src={pack.image || "https://via.placeholder.com/400x300"} alt={pack.name} className="w-full h-64 object-cover rounded" />
//         <h1 className="text-2xl font-bold mt-4">{pack.name}</h1>
//         <p className="text-green-700 font-semibold mt-2 text-xl">₹{pack.price}</p>
//         <p className="mt-3 text-gray-600">{pack.description || "Healthy vegetable package."}</p>

//         <div className="mt-4">
//           <h2 className="font-semibold">Includes:</h2>
//           <ul className="list-disc ml-6">
//             {pack.vegetables?.map(v => (
//               <li key={v._id}>{v.name} - ₹{v.price}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-6 flex items-center gap-4">
//           <label className="font-medium">Quantity</label>
//           <input
//             type="number"
//             min="1"
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//             className="w-24 border rounded p-2"
//           />
//         </div>

//         <div className="mt-6 flex gap-3">
//           <button onClick={handleAddToCart} disabled={adding} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
//             {adding ? "Adding..." : "Add to Cart"}
//           </button>
//           <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/PackageDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api, { getProductById } from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackageDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [pack, setPack] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setPack(data.product);
//         } else {
//           navigate("/packages");
//         }
//       } catch (err) {
//         console.error("Error fetching package:", err);
//         navigate("/packages");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = async () => {
//     if (!pack) return;

//     setAdding(true);
//     try {
//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image, // இருந்தாலும் use பண்ணமாட்டோம், cart க்கு மட்டும் இருக்கலாம்
//         unitPrice: pack.price,
//         quantity: Number(qty) || 1,
//         vegetables: pack.vegetables?.map((v) => v._id) || [],
//       };

//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await api.post("/cart/add", payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         alert("Added to cart");
//       }

//       const backTo = location.state?.from || "/packages";
//       navigate(backTo);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-20 text-gray-700">Loading package...</p>;
//   if (!pack) return null;

//   const itemsTotal = (pack.vegetables || []).reduce(
//     (sum, v) => sum + (v.price || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
//         {/* 🔷 Top: Text only (no package image) */}
//         <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6">
//           <div className="space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {pack.name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-700">
//               {pack.description ||
//                 "Healthy curated package of fresh vegetables for your family."}
//             </p>

//             {/* Prices */}
//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-800">
//                 <span className="font-semibold">
//                   Package Total Price:{" "}
//                 </span>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold shadow">
//                   ₹{pack.price}
//                 </span>
//               </p>
//               {!!itemsTotal && (
//                 <p className="text-xs text-gray-500">
//                   (Sum of individual items: ₹{itemsTotal})
//                 </p>
//               )}
//             </div>

//             {/* Quantity select */}
//             <div className="mt-4 flex items-center gap-3">
//               <label className="text-sm font-medium text-gray-800">
//                 Package Quantity
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={qty}
//                 onChange={(e) => setQty(e.target.value)}
//                 className="w-24 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="mt-4 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
//               >
//                 {adding ? "Adding..." : "Add Package to Cart"}
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

//         {/* 🔷 Included vegetables list (with images) */}
//         <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 sm:p-6">
//           <h2 className="text-xl font-semibold text-green-900 mb-3">
//             Vegetables in this Package
//           </h2>
//           {pack.vegetables && pack.vegetables.length > 0 ? (
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {pack.vegetables.map((v) => (
//                 <div
//                   key={v._id}
//                   className="flex gap-3 bg-green-50 rounded-xl p-3 border border-green-100"
//                 >
//                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
//                     <img
//                       src={v.image || "/products/default.png"}
//                       alt={v.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 text-xs sm:text-sm">
//                     <p className="font-semibold text-gray-900 line-clamp-1">
//                       {v.name}
//                     </p>
//                     <p className="text-gray-600">
//                       Qty: {v.quantity || "1kg"}
//                     </p>
//                     <p className="text-gray-700 font-semibold">
//                       ₹{v.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-600">
//               No vegetables listed in this package.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/PackageDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api, { getProductById } from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackageDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth(); // ✅ token remove pannalaam (cookie-based)

//   const [pack, setPack] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Fetch package by ID
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setPack(data.product);
//         } else {
//           navigate("/packages");
//         }
//       } catch (err) {
//         console.error("Error fetching package:", err);
//         navigate("/packages");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   // Add package to cart
//   const handleAddToCart = async () => {
//     if (!pack) return;

//     const quantityNumber = Number(qty) || 1;
//     if (quantityNumber < 1) {
//       alert("Quantity must be at least 1");
//       return;
//     }

//     setAdding(true);
//     try {
//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image || "",
//         unitPrice: pack.price,
//         quantity: quantityNumber,
//         vegetables: (pack.vegetables || []).map((v) => v._id) || [],
//         totalPrice: pack.price * quantityNumber,
//       };

//       if (!isLoggedIn) {
//         // Guest cart → localStorage
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         // Logged‑in user → backend cart (cookie auth)
//         const res = await api.post("/cart/add", payload);
//         if (res.success) {
//           alert("Added to cart");
//         } else {
//           alert(res.message || "Add to cart failed");
//         }
//       }

//       const backTo = location.state?.from || "/packages";
//       navigate(backTo);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert(err.message || "Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-20 text-gray-700">Loading package...</p>
//     );
//   if (!pack) return null;

//   const itemsTotal = (pack.vegetables || []).reduce(
//     (sum, v) => sum + (v.price || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
//         {/* Top: Package intro */}
//         <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6">
//           <div className="space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {pack.name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-700">
//               {pack.description ||
//                 "Healthy curated package of fresh vegetables for your family."}
//             </p>

//             {/* Prices */}
//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-800">
//                 <span className="font-semibold">Package Total Price: </span>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold shadow">
//                   LKR {pack.price}
//                 </span>
//               </p>
//               {!!itemsTotal && (
//                 <p className="text-xs text-gray-500">
//                   (Sum of individual items: LKR {itemsTotal})
//                 </p>
//               )}
//             </div>

//             {/* Quantity select */}
//             <div className="mt-4 flex items-center gap-3">
//               <label className="text-sm font-medium text-gray-800">
//                 Package Quantity
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={qty}
//                 onChange={(e) => setQty(e.target.value)}
//                 className="w-24 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="mt-4 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60"
//               >
//                 {adding ? "Adding..." : "Add Package to Cart"}
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

//         {/* Included vegetables list */}
//         <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 sm:p-6">
//           <h2 className="text-xl font-semibold text-green-900 mb-3">
//             Vegetables in this Package
//           </h2>
//           {pack.vegetables && pack.vegetables.length > 0 ? (
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {pack.vegetables.map((v) => (
//                 <div
//                   key={v._id}
//                   className="flex gap-3 bg-green-50 rounded-xl p-3 border border-green-100"
//                 >
//                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
//                     <img
//                       src={v.image || "/products/default.png"}
//                       alt={v.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 text-xs sm:text-sm">
//                     <p className="font-semibold text-gray-900 line-clamp-1">
//                       {v.name}
//                     </p>
//                     <p className="text-gray-600">
//                       Qty: {v.quantity || "1kg"}
//                     </p>
//                     <p className="text-gray-700 font-semibold">
//                       LKR {v.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-600">
//               No vegetables listed in this package.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/pages/PackageDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api, { getProductById } from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackageDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [pack, setPack] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   // Fetch package by ID
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductById(id);
//         if (data?.success) {
//           setPack(data.product);
//         } else {
//           navigate("/packages");
//         }
//       } catch (err) {
//         console.error("Error fetching package:", err);
//         navigate("/packages");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   // Add package to cart
//   const handleAddToCart = async () => {
//     if (!pack) return;

//     const quantityNumber = Number(qty) || 1;
//     if (quantityNumber < 1) {
//       alert("Quantity must be at least 1");
//       return;
//     }

//     setAdding(true);
//     try {
//       // Calculate total price based on current quantity
//       const calculatedTotalPrice = pack.price * quantityNumber;

//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image || "",
//         unitPrice: pack.price,
//         quantity: quantityNumber,
//         vegetables: (pack.vegetables || []).map((v) => v._id) || [],
//         totalPrice: calculatedTotalPrice, // Sending updated total price
//       };

//       if (!isLoggedIn) {
//         // Guest cart
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         // Logged-in user
//         const res = await api.post("/cart/add", payload);
//         if (res.success) {
//           alert("Added to cart");
//         } else {
//           alert(res.message || "Add to cart failed");
//         }
//       }

//       const backTo = location.state?.from || "/packages";
//       navigate(backTo);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert(err.message || "Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-20 text-gray-700">Loading package...</p>
//     );
//   if (!pack) return null;

//   // --- 🔥 PRICE CALCULATION LOGIC 🔥 ---
//   // Quantity மாறும் போது மொத்த விலையும் மாறும்
//   const currentQty = Number(qty) || 1;
//   const totalAmount = (pack.price || 0) * currentQty;

//   const itemsTotal = (pack.vegetables || []).reduce(
//     (sum, v) => sum + (v.price || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-green-200 pt-20 pb-10">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
//         {/* Top: Package intro */}
//         <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6">
//           <div className="space-y-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               {pack.name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-700">
//               {pack.description ||
//                 "Healthy curated package of fresh vegetables for your family."}
//             </p>

//             {/* --- PRICE DISPLAY SECTION --- */}
//             <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-semibold text-gray-600">Unit Price:</span>
//                 <span className="text-gray-900 font-bold">LKR {pack.price}</span>
//               </div>
              
//               <div className="flex justify-between items-center border-t border-green-200 pt-2">
//                 <span className="text-lg font-bold text-gray-800">Total Payable:</span>
//                 <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white text-lg font-bold shadow animate-pulse">
//                   {/* இங்கே தான் விலை மாறும் */}
//                   LKR {totalAmount.toLocaleString()} 
//                 </span>
//               </div>
//             </div>

//             {/* --- QUANTITY SELECTOR --- */}
//             <div className="mt-6 flex items-center gap-4">
//               <label className="text-sm font-bold text-gray-800">
//                 Quantity:
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 <button 
//                   onClick={() => setQty(prev => Math.max(1, Number(prev) - 1))}
//                   className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border-r border-gray-300 font-bold text-gray-600"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   min="1"
//                   value={qty}
//                   onChange={(e) => setQty(Number(e.target.value))}
//                   className="w-16 text-center p-2 text-sm font-bold focus:outline-none"
//                 />
//                 <button 
//                   onClick={() => setQty(prev => Number(prev) + 1)}
//                   className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 font-bold text-gray-600"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-green-700 transition disabled:opacity-60 shadow-lg"
//               >
//                 {adding ? "Adding..." : `Add to Cart - LKR ${totalAmount}`}
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-5 py-3 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Included vegetables list */}
//         <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 sm:p-6">
//           <h2 className="text-xl font-semibold text-green-900 mb-3">
//             Vegetables in this Package
//           </h2>
//           {pack.vegetables && pack.vegetables.length > 0 ? (
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {pack.vegetables.map((v) => (
//                 <div
//                   key={v._id}
//                   className="flex gap-3 bg-green-50 rounded-xl p-3 border border-green-100"
//                 >
//                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-gray-200">
//                     <img
//                       // Handle nested image structure if needed
//                       src={v.image || (v.vegetable && v.vegetable.image) || "https://placehold.co/100x100?text=No+Img"}
//                       alt={v.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 text-xs sm:text-sm">
//                     <p className="font-semibold text-gray-900 line-clamp-1">
//                       {v.name}
//                     </p>
//                     <p className="text-gray-600">
//                       Qty: {v.quantity || "1kg"}
//                     </p>
//                     <p className="text-gray-700 font-semibold">
//                       LKR {v.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-600">
//               No vegetables listed in this package.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/PackageDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Leaf, 
  Star, 
  ShieldCheck, 
  Truck 
} from "lucide-react";
import api, { getProductById } from "../api";
import { useAuth } from "../AuthContext";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const [pack, setPack] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // --- Fetch Logic ---
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (data?.success) {
          setPack(data.product);
        } else {
          navigate("/packages");
        }
      } catch (err) {
        console.error("Error fetching package:", err);
        navigate("/packages");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // --- Add to Cart Logic ---
  const handleAddToCart = async () => {
    if (!pack) return;
    const quantityNumber = Number(qty) || 1;
    if (quantityNumber < 1) return;

    setAdding(true);
    try {
      const calculatedTotalPrice = pack.price * quantityNumber;
      const payload = {
        type: "package",
        itemId: pack._id,
        name: pack.name,
        image: pack.image || "",
        unitPrice: pack.price,
        quantity: quantityNumber,
        vegetables: (pack.vegetables || []).map((v) => v._id) || [],
        totalPrice: calculatedTotalPrice,
      };

      if (!isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        await api.post("/cart/add", payload);
      }

      // Small delay for visual feedback before navigating
      setTimeout(() => {
        const backTo = location.state?.from || "/packages";
        navigate(backTo);
      }, 500);
      
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!pack) return null;

  // Calculation
  const currentQty = Number(qty) || 1;
  const totalAmount = (pack.price || 0) * currentQty;

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-slate-800">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[80px]" />
      </div>

      {/* --- Navbar (Floating) --- */}
      <nav className="fixed top-0 w-full z-40 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white shadow-lg shadow-slate-200/50 text-slate-600 hover:text-green-700 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT: Immersive Product Image (Sticky) --- */}
          <div className="relative">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white bg-white">
                <img
                  src={pack.image || "https://placehold.co/600x600?text=Fresh+Package"}
                  alt={pack.name}
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                  <Star size={16} className="text-orange-400 fill-orange-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Premium Bundle</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="hidden lg:flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center gap-2">
                  <Leaf className="text-green-600" />
                  <span className="text-xs font-semibold">100% Organic</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Truck className="text-blue-600" />
                  <span className="text-xs font-semibold">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="text-slate-600" />
                  <span className="text-xs font-semibold">Quality Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Details & Actions --- */}
          <div className="flex flex-col justify-center space-y-10">
            
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock & Fresh
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {pack.name}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-lg">
                {pack.description || "A perfectly curated selection of seasonal vegetables, hand-picked from local farms to ensure maximum freshness for your family."}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-slate-900">
                LKR {pack.price.toLocaleString()}
              </span>
              <span className="text-lg text-slate-400 line-through decoration-slate-300">
                LKR {(pack.price * 1.2).toLocaleString()}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                SAVE 20%
              </span>
            </div>

            <hr className="border-slate-100" />

            {/* What's Inside (Grid) */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                What's Inside the Box
                <span className="bg-slate-100 text-slate-500 text-xs py-1 px-2 rounded-full">
                  {pack.vegetables?.length || 0} Items
                </span>
              </h3>

               <div className="flex items-center bg-slate-100 rounded-full p-1 h-14 shadow-inner">
              <button 
                onClick={() => setQty(prev => Math.max(1, prev - 1))}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
              >
                <Minus size={18} strokeWidth={3} />
              </button>
              <span className="w-12 text-center font-bold text-lg text-slate-800">{qty}</span>
              <button 
                onClick={() => setQty(prev => prev + 1)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="hidden sm:flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total to pay</span>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-black text-slate-900">
                 LKR {totalAmount.toLocaleString()}
               </span>
               <span className="text-sm font-medium text-slate-500">
                 / {currentQty} {currentQty > 1 ? 'packs' : 'pack'}
               </span>
            </div>
          </div>


           <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 sm:flex-none h-14 px-8 rounded-full bg-slate-900 hover:bg-green-600 text-black font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-green-600/30 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {adding ? (
                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                 <>
                   <span>Add to Cart</span>
                   <span className="bg-white/20 px-2 py-0.5 rounded text-sm sm:hidden">
                     LKR {totalAmount.toLocaleString()}
                   </span>
                   <ShoppingBag size={20} fill="currentColor" className="hidden sm:block opacity-50" />
                 </>
               )}
            </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pack.vegetables?.map((v, idx) => (
                  <div 
                    key={v._id || idx} 
                    className="group flex items-center gap-3 p-2 pr-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={v.image || (v.vegetable && v.vegetable.image) || "https://placehold.co/100x100"} 
                        alt={v.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm">{v.name}</p>
                      <p className="text-xs text-slate-500 font-medium">Qty: {v.quantity}</p>
                    </div>
                    <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      LKR {v.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPACER for Mobile Fixed Bottom Bar */}
            <div className="h-20 lg:hidden" />

          </div>
        </div>
      </div>

      {/* --- FLOATING ACTION BAR (Desktop & Mobile) --- */}
      {/* On Mobile: Fixed at bottom. On Desktop: Sticky at bottom or inline. Here we make it a polished fixed bar at bottom for both for a modern "App" feel */}
      <div className=" left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200 p-4 sm:px-8 sm:py-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Total Price Display */}
          

          <div className="w-full sm:w-auto flex items-center gap-4">
            {/* Qty Selector */}
           

            {/* Add Button */}
           
          </div>
        </div>
      </div>

    </div>
  );
}

// Simple Loading Component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
           <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
           <Leaf className="absolute inset-0 m-auto text-green-600 animate-pulse" size={24} />
        </div>
        <p className="text-slate-400 font-medium tracking-widest text-sm uppercase">Loading Freshness...</p>
      </div>
    </div>
  );
}