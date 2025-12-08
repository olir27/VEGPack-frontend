// // src/pages/PackagesPage.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { useState, useEffect } from "react";
// import api from "../api";

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [packages, setPackages] = useState([]);
//   const [loadingId, setLoadingId] = useState(null);
//   const [loadingPackages, setLoadingPackages] = useState(true);

//   // Fetch packages from backend
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await api.get("/products"); // backend: GET /api/products
//         if (res.success) {
//           // Only type 'package'
//           const packageList = res.products.filter((p) => p.type === "package");
//           setPackages(packageList);
//         } else {
//           console.error("Failed to fetch packages:", res.message);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoadingPackages(false);
//       }
//     };
//     fetchPackages();
//   }, []);


// const handleAddClick = (id) => {
//   if (!isLoggedIn) {
//     navigate("/register");
//     return;
//   }
//   navigate(`/package/${id}`, { state: { from: "/packages" } });
// };


//   const handleAddToCart = async (pack) => {
//     setLoadingId(pack._id);
//     const payload = {
//       type: "package",
//       itemId: pack._id,
//       name: pack.name,
//       image: pack.image || "", // optional fallback
//       unitPrice: pack.price,
//       quantity: 1,
//       vegetables: pack.vegetables || [],
//       totalPrice: pack.price,
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart!");
//         setLoadingId(null);
//         return;
//       }

//       const res = await api.post("/cart", payload);
//       if (res.success) alert("Added to cart!");
//       else alert("Failed to add to cart");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add to cart");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   if (loadingPackages) return <p className="text-center mt-10">Loading packages...</p>;

//   if (packages.length === 0)
//     return <p className="text-center mt-10">No packages available at the moment.</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen p-8" style={{marginTop:"50px"}}>
//       <h1 className="text-4xl font-bold text-center mb-10 text-green-700">Vegetable Packages</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {packages.map((pack) => (
//           <div key={pack._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col">
//             <div className="relative">
//               <img
//                 src={pack.image || "https://via.placeholder.com/300"}
//                 alt={pack.name}
//                 className="w-full h-48 object-cover"
//               />
//               <span className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 ₹{pack.price}
//               </span>
//             </div>

//             <div className="p-4 flex-1 flex flex-col justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">{pack.name}</h2>
//                 <p className="text-gray-500 mt-1">{pack.quantity || ""}</p>
//                 <p className="mt-2 text-gray-600 text-sm line-clamp-3">{pack.description || ""}</p>
//               </div>

//               <div className="mt-4 flex flex-col gap-2">
//                 <button
//                   onClick={() => handleAddClick(pack._id)}
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                   View Details
//                 </button>

              
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // src/pages/packages.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);

//   // ========= FETCH PACKAGES FROM BACKEND =========
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         // /api/products → productController.getProducts → { success, products }
//         const res = await api.get("/products");
//         if (res.success) {
//           // case-insensitive filter for "package"
//           const packageList = (res.products || []).filter(
//             (p) => (p.type || "").toLowerCase() === "package"
//           );
//           setPackages(packageList);
//         } else {
//           console.error("Failed to fetch packages:", res.message);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // ========= NAVIGATE TO DETAIL =========
//   const handleViewDetails = (id) => {
//     navigate(`/package/${id}`, { state: { from: "/packages" } });
//   };

//   // ========= ADD TO CART =========
//   const handleAddToCart = async (pack) => {
//     setLoadingId(pack._id);
//     const payload = {
//       type: "package",
//       itemId: pack._id,
//       name: pack.name,
//       image: pack.image || "",
//       unitPrice: pack.price,
//       quantity: 1,
//       vegetables: pack.vegetables || [],
//       totalPrice: pack.price,
//     };

//     try {
//       // Guest → localStorage cart
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//         return;
//       }

//       // Logged‑in → backend cart
//       const res = await api.post("/cart/add", payload);
//       if (res.success) {
//         alert("Added to cart!");
//       } else {
//         alert(res.message || "Failed to add to cart");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Failed to add to cart");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   // ========= LOADING UI =========
//   if (loading)
//     return (
//       <div className="min-h-screen bg-[#F3F4FB] flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-violet-300 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#F3F4FB] pt-28 pb-16 px-4 sm:px-6 lg:px-10">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* ========== HEADER (Top Seller Products UI) ========== */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//               Top Seller Packs
//             </h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Curated VegPack combos that customers love every week.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/vegetables")}
//             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6C2BD9] text-white text-sm font-semibold shadow-md hover:bg-[#5B21D6] transition-colors"
//           >
//             View All Products
//             <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* ========== CARD GRID ========== */}
//         {packages.length === 0 ? (
//           <p className="text-center text-slate-500 mt-10">
//             No packages available at the moment.
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {packages.map((pack, index) => {
//               // Just for UI: some fake discount %
//               const discountPercent =
//                 index % 3 === 0 ? 20 : index % 3 === 1 ? 15 : 10;
//               const oldPrice = Math.round(
//                 Number(pack.price || 0) * (1 + discountPercent / 100)
//               );

//               return (
//                 <motion.div
//                   key={pack._id}
//                   whileHover={{ y: -4 }}
//                   className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-100 p-4 flex flex-col hover:shadow-[0_18px_60px_rgba(15,23,42,0.18)] transition-all cursor-pointer"
//                 >
//                   {/* IMAGE AREA */}
//                   <div className="relative bg-gradient-to-br from-[#F9F5FF] to-[#EEF2FF] rounded-[20px] h-44 flex items-center justify-center mb-3 overflow-hidden">
//                     {/* Offer tag */}
//                     <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-semibold shadow-sm">
//                       {discountPercent}% off
//                     </span>
//                     {/* Favourite icon (just visual) */}
//                     <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-400 hover:text-[#EC4899] hover:bg-white transition-colors shadow-sm">
//                       <Heart size={16} />
//                     </button>

//                     <img
//                       src={pack.image || "https://via.placeholder.com/200x200"}
//                       alt={pack.name}
//                       className="max-h-32 object-contain drop-shadow-xl"
//                     />
//                   </div>

//                   {/* TEXT CONTENT */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold mb-1">
//                         Veg Pack
//                       </p>
//                       <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
//                         {pack.name}
//                       </h3>
//                       <p className="text-xs text-slate-500 mb-2 line-clamp-2">
//                         {pack.description ||
//                           "Balanced mix of fresh vegetables for everyday cooking."}
//                       </p>

//                       {/* Rating row */}
//                       <div className="flex items-center gap-1 text-[11px] text-slate-600 mb-1.5">
//                         <Star
//                           size={14}
//                           className="text-[#FACC15]"
//                           fill="currentColor"
//                         />
//                         <span className="font-semibold">4.9</span>
//                         <span className="text-slate-400">• Popular choice</span>
//                       </div>
//                     </div>

//                     {/* PRICE ROW */}
//                     <div className="mt-2 flex items-end justify-between">
//                       <div>
//                         <p className="text-[11px] text-slate-400 uppercase tracking-[0.12em]">
//                           Starting at
//                         </p>
//                         <p className="text-sm font-bold text-slate-900">
//                           LKR {pack.price}
//                         </p>
//                         <p className="text-[11px] text-slate-400 line-through">
//                           LKR {oldPrice}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleAddToCart(pack)}
//                         disabled={loadingId === pack._id}
//                         className="w-9 h-9 rounded-full bg-[#6C2BD9] text-white flex items-center justify-center shadow-md hover:bg-[#5B21D6] disabled:opacity-60"
//                       >
//                         {loadingId === pack._id ? (
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         ) : (
//                           <ShoppingCart size={17} />
//                         )}
//                       </button>
//                     </div>

//                     {/* FOOTER ACTIONS */}
//                     <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
//                       <button
//                         onClick={() => handleViewDetails(pack._id)}
//                         className="flex-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
//                       >
//                         View Details
//                       </button>
//                       <button
//                         onClick={() => handleAddToCart(pack)}
//                         disabled={loadingId === pack._id}
//                         className="flex-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6C2BD9] text-white hover:bg-[#5B21D6] disabled:opacity-60"
//                       >
//                         {loadingId === pack._id ? "Adding..." : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // src/pages/packages.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);

//   // ========= FETCH PACKAGES FROM BACKEND (page=1, limit=500) =========
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         // important: big limit so all products load
//         const res = await api.get("/products?page=1&limit=500");
//         if (res.success) {
//           const packageList = (res.products || []).filter(
//             (p) => (p.type || "").toLowerCase() === "package"
//           );
//           setPackages(packageList);
//         } else {
//           console.error("Failed to fetch packages:", res.message);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const handleViewDetails = (id) => {
//     navigate(`/package/${id}`, { state: { from: "/packages" } });
//   };

//   const handleAddToCart = async (pack) => {
//     setLoadingId(pack._id);
//     const payload = {
//       type: "package",
//       itemId: pack._id,
//       name: pack.name,
//       image: pack.image || "",
//       unitPrice: pack.price,
//       quantity: 1,
//       vegetables: pack.vegetables || [],
//       totalPrice: pack.price,
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//         return;
//       }

//       const res = await api.post("/cart/add", payload);
//       if (res.success) {
//         alert("Added to cart!");
//       } else {
//         alert(res.message || "Failed to add to cart");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Failed to add to cart");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-[#F3F4FB] flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-violet-300 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#F3F4FB] pt-28 pb-16 px-4 sm:px-6 lg:px-10">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* HEADER like "Top Seller Products" */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//               Top Seller Packs
//             </h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Curated VegPack combos that customers love every week.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/vegetables")}
//             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6C2BD9] text-white text-sm font-semibold shadow-md hover:bg-[#5B21D6] transition-colors"
//           >
//             View All Products
//             <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* CARD GRID */}
//         {packages.length === 0 ? (
//           <p className="text-center text-slate-500 mt-10">
//             No packages available at the moment.
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {packages.map((pack, index) => {
//               const discountPercent =
//                 index % 3 === 0 ? 20 : index % 3 === 1 ? 15 : 10;
//               const oldPrice = Math.round(
//                 Number(pack.price || 0) * (1 + discountPercent / 100)
//               );

//               return (
//                 <motion.div
//                   key={pack._id}
//                   whileHover={{ y: -4 }}
//                   className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-100 p-4 flex flex-col hover:shadow-[0_18px_60px_rgba(15,23,42,0.18)] transition-all cursor-pointer" style={{width:"400px",height:"350px"}}
//                 >
//                   {/* Image area */}
//                   <div className="relative bg-gradient-to-br from-[#F9F5FF] to-[#EEF2FF] rounded-[20px] h-44 flex items-center justify-center mb-3 overflow-hidden" style={{width:"300px",height:"200px"}}>
//                     {/* Offer tag */}
//                     <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-semibold shadow-sm">
//                       {discountPercent}% off
//                     </span>
//                     {/* Favourite icon */}
//                     <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-400 hover:text-[#EC4899] hover:bg-white transition-colors shadow-sm">
//                       <Heart size={16} />
//                     </button>

//                     <img
//                       src={pack.image || "https://via.placeholder.com/200x200"}
//                       alt={pack.name}
//                       className="max-h-32 object-contain drop-shadow-xl"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold mb-1">
//                         Veg Pack
//                       </p>
//                       <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
//                         {pack.name}
//                       </h3>
//                       <p className="text-xs text-slate-500 mb-2 line-clamp-2">
//                         {pack.description ||
//                           "Balanced mix of fresh vegetables for everyday cooking."}
//                       </p>

//                       {/* Rating row */}
//                       <div className="flex items-center gap-1 text-[11px] text-slate-600 mb-1.5">
//                         <Star
//                           size={14}
//                           className="text-[#FACC15]"
//                           fill="currentColor"
//                         />
//                         <span className="font-semibold">4.9</span>
//                         <span className="text-slate-400">
//                           • Popular choice
//                         </span>
//                       </div>
//                     </div>

//                     {/* Price row */}
//                     <div className="mt-2 flex items-end justify-between">
//                       <div>
//                         <p className="text-[11px] text-slate-400 uppercase tracking-[0.12em]">
//                           Starting at
//                         </p>
//                         <p className="text-sm font-bold text-slate-900">
//                           LKR {pack.price}
//                         </p>
//                         <p className="text-[11px] text-slate-400 line-through">
//                           LKR {oldPrice}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleAddToCart(pack)}
//                         disabled={loadingId === pack._id}
//                         className="w-9 h-9 rounded-full bg-[#6C2BD9] text-white flex items-center justify-center shadow-md hover:bg-[#5B21D6] disabled:opacity-60"
//                       >
//                         {loadingId === pack._id ? (
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         ) : (
//                           <ShoppingCart size={17} />
//                         )}
//                       </button>
//                     </div>

//                     {/* Footer buttons */}
//                     <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
//                       <button
//                         onClick={() => handleViewDetails(pack._id)}
//                         className="flex-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
//                       >
//                         View Details
//                       </button>
//                       <button
//                         onClick={() => handleAddToCart(pack)}
//                         disabled={loadingId === pack._id}
//                         className="flex-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6C2BD9] text-white hover:bg-[#5B21D6] disabled:opacity-60"
//                       >
//                         {loadingId === pack._id ? "Adding..." : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   Star, 
//   Heart, 
//   ShoppingCart, 
//   ArrowRight, 
//   Package, 
//   Info,
//   Check
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);

//   // ========= FETCH PACKAGES =========
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/products?page=1&limit=500");
//         if (res.success) {
//           const packageList = (res.products || []).filter(
//             (p) => (p.type || "").toLowerCase() === "package"
//           );
//           setPackages(packageList);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const handleViewDetails = (id) => {
//     navigate(`/package/${id}`, { state: { from: "/packages" } });
//   };

//   const handleAddToCart = async (e, pack) => {
//     e.stopPropagation(); // Prevent card click
//     setLoadingId(pack._id);
    
//     const payload = {
//       type: "package",
//       itemId: pack._id,
//       name: pack.name,
//       image: pack.image || "",
//       unitPrice: pack.price,
//       quantity: 1,
//       vegetables: pack.vegetables || [],
//       totalPrice: pack.price,
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         // You might want to use a toast notification here instead of alert
//         alert("Added to cart (guest)");
//         return;
//       }

//       const res = await api.post("/cart/add", payload);
//       if (res.success) {
//         alert("Added to cart!");
//       } else {
//         alert(res.message || "Failed to add to cart");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-12">
        
//         {/* === HEADER SECTION === */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
//           <div className="max-w-2xl">
//             <div className="flex items-center gap-2 mb-2">
//                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
//                  Fresh Harvest
//                </span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
//               Curated Vegetable Packs
//             </h1>
//             <p className="text-gray-500 mt-3 text-lg leading-relaxed">
//               Expertly selected combinations of fresh vegetables, perfect for your weekly needs. Save time and money with our bundles.
//             </p>
//           </div>
          
//           <button
//             onClick={() => navigate("/vegetables")}
//             className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition-all"
//           >
//             Explore Single Items
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         {/* === CONTENT GRID === */}
//         {loading ? (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {[1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}
//           </div>
//         ) : packages.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <Package size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900">No Packages Found</h3>
//             <p className="text-gray-500">Check back later for new bundles.</p>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             <AnimatePresence>
//               {packages.map((pack, index) => {
//                 // Fake discount logic for UI demo
//                 const discountPercent = index % 3 === 0 ? 20 : index % 3 === 1 ? 15 : 10;
//                 const oldPrice = Math.round(Number(pack.price || 0) * (1 + discountPercent / 100));

//                 return (
//                   <ProductCard 
//                     key={pack._id} 
//                     pack={pack} 
//                     oldPrice={oldPrice} 
//                     discountPercent={discountPercent} 
//                     loadingId={loadingId}
//                     onAdd={handleAddToCart}
//                     onView={handleViewDetails}
//                   />
//                 );
//               })}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // === SUB-COMPONENTS FOR CLEANER CODE ===

// function ProductCard({ pack, oldPrice, discountPercent, loadingId, onAdd, onView }) {
//   const isLoading = loadingId === pack._id;

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       whileHover={{ y: -8 }}
//       className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col overflow-hidden relative"
//     >
//       {/* Image Area */}
//       <div 
//         onClick={() => onView(pack._id)}
//         className="relative h-56 bg-[#F8FAFC] flex items-center justify-center overflow-hidden cursor-pointer"
//       >
//         {/* Badges */}
//         <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//           <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md uppercase tracking-wider">
//             {discountPercent}% OFF
//           </span>
//         </div>
        
//         {/* Wishlist Button */}
//         <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 flex items-center justify-center hover:text-red-500 hover:bg-white transition-all shadow-sm">
//           <Heart size={18} />
//         </button>

//         <img
//           src={pack.image || "https://via.placeholder.com/300?text=Pack"}
//           alt={pack.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
//         />
        
//         {/* Overlay on hover */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
//       </div>

//       {/* Content Area */}
//       <div className="p-5 flex-1 flex flex-col">
//         {/* Rating */}
//         <div className="flex items-center gap-1 mb-2">
//           <Star size={14} className="text-amber-400 fill-amber-400" />
//           <span className="text-xs font-bold text-gray-700">4.9</span>
//           <span className="text-xs text-gray-400 mx-1">•</span>
//           <span className="text-xs text-gray-400">120+ sold</span>
//         </div>

//         {/* Title & Desc */}
//         <div className="mb-4 flex-1 cursor-pointer" onClick={() => onView(pack._id)}>
//           <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
//             {pack.name}
//           </h3>
//           <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
//             {pack.description || "A perfect mix of fresh vegetables for your daily cooking needs."}
//           </p>
//         </div>

//         {/* Price & Action */}
//         <div className="flex items-end justify-between pt-4 border-t border-gray-50">
//           <div>
//             <p className="text-xs text-gray-400 font-medium line-through mb-0.5">
//               LKR {oldPrice}
//             </p>
//             <p className="text-xl font-extrabold text-emerald-700">
//               LKR {pack.price}
//             </p>
//           </div>

//           <button
//             onClick={(e) => onAdd(e, pack)}
//             disabled={isLoading}
//             className={`
//               relative overflow-hidden rounded-2xl h-11 px-5 flex items-center gap-2 font-bold text-sm shadow-lg transition-all active:scale-95
//               ${isLoading 
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                 : "bg-gray-900 text-white hover:bg-emerald-600 hover:shadow-emerald-200"
//               }
//             `}
//           >
//             {isLoading ? (
//                <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                   <span>Adding...</span>
//                </div>
//             ) : (
//               <>
//                 <span>Add</span>
//                 <ShoppingCart size={18} />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-3xl border border-gray-100 p-4 h-[400px] flex flex-col animate-pulse">
//       <div className="bg-gray-200 h-48 rounded-2xl mb-4 w-full"></div>
//       <div className="space-y-3 flex-1">
//         <div className="flex gap-2">
//           <div className="bg-gray-200 h-4 w-12 rounded"></div>
//           <div className="bg-gray-200 h-4 w-12 rounded"></div>
//         </div>
//         <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
//         <div className="bg-gray-200 h-4 w-full rounded"></div>
//         <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
//       </div>
//       <div className="flex justify-between items-end mt-4">
//         <div className="bg-gray-200 h-8 w-24 rounded"></div>
//         <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   Star, 
//   Heart, 
//   ShoppingCart, 
//   ArrowRight, 
//   Package, 
//   Filter,
//   Zap,
//   Leaf,
//   Truck
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1, 
//     transition: { staggerChildren: 0.1 } 
//   }
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
// };

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);
  
//   // UI States
//   const [activeCategory, setActiveCategory] = useState("All");

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/products?page=1&limit=500");
//         if (res.success) {
//           const packageList = (res.products || []).filter(
//             (p) => (p.type || "").toLowerCase() === "package"
//           );
//           setPackages(packageList);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // Simulate filtering (since API returns all)
//   const filteredPackages = useMemo(() => {
//     if (activeCategory === "All") return packages;
//     // Simple logic to simulate random categorization for demo purposes
//     // In a real app, you would check p.category or p.tags
//     return packages.filter((_, i) => {
//       if (activeCategory === "Best Sellers") return i % 2 === 0;
//       if (activeCategory === "Family Size") return i % 3 === 0;
//       if (activeCategory === "Organic") return i % 2 !== 0;
//       return true;
//     });
//   }, [packages, activeCategory]);

//   const handleAddToCart = async (e, pack) => {
//     e.stopPropagation();
//     setLoadingId(pack._id);
    
//     const payload = {
//       type: "package",
//       itemId: pack._id,
//       name: pack.name,
//       image: pack.image || "",
//       unitPrice: pack.price,
//       quantity: 1,
//       vegetables: pack.vegetables || [],
//       totalPrice: pack.price,
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         // You would typically use a toast library here
//         alert("Added to cart (guest mode)"); 
//         return;
//       }

//       const res = await api.post("/cart/add", payload);
//       if (res.success) alert("Successfully added to your cart!");
//       else alert(res.message || "Failed to add");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const categories = ["All", "Best Sellers", "Family Size", "Organic"];

//   return (
//     <div className="min-h-screen bg-[#F8F9FC] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
//       {/* === HERO BANNER === */}
//       <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative bg-gray-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gray-200">
//             {/* Background Pattern */}
//             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
//             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

//             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
//               <div className="max-w-xl space-y-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
//                   <Leaf size={14} className="text-emerald-400" />
//                   <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">100% Farm Fresh</span>
//                 </div>
//                 <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
//                   Premium Veg<span className="text-emerald-400">Packs</span><br/>
//                   Curated for You.
//                 </h1>
//                 <p className="text-gray-400 text-lg leading-relaxed">
//                   Save time and eat healthier with our expert-curated bundles. Delivered fresh from the farm to your doorstep within 24 hours.
//                 </p>
                
//                 {/* Value Props */}
//                 <div className="flex gap-6 pt-4 text-white/80">
//                   <div className="flex items-center gap-2">
//                     <Truck size={18} /> <span className="text-sm font-medium">Free Delivery</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Zap size={18} /> <span className="text-sm font-medium">Same Day</span>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <button onClick={() => navigate('/vegetables')} className="hidden md:flex group items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:bg-emerald-400 transition-all transform hover:-translate-y-1">
//                 <span>View Single Items</span>
//                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
//         {/* === FILTER TABS === */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`
//                   px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
//                   ${activeCategory === cat 
//                     ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105" 
//                     : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"}
//                 `}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
          
//           <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500">
//              <Filter size={16} />
//              <span>Showing {filteredPackages.length} Bundles</span>
//           </div>
//         </div>

//         {/* === PRODUCT GRID === */}
//         {loading ? (
//            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//              {[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}
//            </div>
//         ) : filteredPackages.length === 0 ? (
//           <EmptyState />
//         ) : (
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//           >
//             <AnimatePresence mode="popLayout">
//               {filteredPackages.map((pack, index) => (
//                 <ProductCard 
//                   key={pack._id} 
//                   pack={pack} 
//                   index={index}
//                   loadingId={loadingId}
//                   onAdd={handleAddToCart}
//                   onView={(id) => navigate(`/package/${id}`)}
//                 />
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// // === PREMIUM COMPONENTS ===

// function ProductCard({ pack, index, loadingId, onAdd, onView }) {
//   const isLoading = loadingId === pack._id;
  
//   // Calculate fake discount for visuals
//   const discount = index % 3 === 0 ? 20 : 0;
//   const oldPrice = discount > 0 ? Math.round(pack.price * 1.2) : null;

//   return (
//     <motion.div 
//       variants={cardVariants}
//       layout
//       whileHover={{ y: -10 }}
//       className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col overflow-hidden"
//     >
//       {/* Image Container */}
//       <div 
//         onClick={() => onView(pack._id)}
//         className="relative aspect-[4/3] bg-gray-50 overflow-hidden cursor-pointer"
//       >
//         <img 
//           src={pack.image || "https://placehold.co/400x300?text=Fresh+Pack"} 
//           alt={pack.name}
//           className=" object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out" style={{height:"00px",width:"400px"}}
//         />
        
//         {/* Floating Badges */}
//         <div className="absolute top-4 left-4 flex flex-col gap-2">
//            {discount > 0 && (
//              <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-rose-500/30">
//                -{discount}% Sale
//              </span>
//            )}
//            {index % 2 !== 0 && (
//              <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30">
//                Organic
//              </span>
//            )}
//         </div>

//         {/* Wishlist Button */}
//         <button className="absolute top-4 right-4 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
//           <Heart size={18} />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="p-6 flex-1 flex flex-col">
//         <div className="flex items-center gap-1 mb-2">
//            <Star size={14} className="fill-amber-400 text-amber-400" />
//            <span className="text-xs font-bold text-gray-800">4.8</span>
//            <span className="text-xs text-gray-400">(86 reviews)</span>
//         </div>

//         <h3 
//           onClick={() => onView(pack._id)}
//           className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors cursor-pointer"
//         >
//           {pack.name}
//         </h3>
        
//         <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
//           {pack.description || "A curated selection of seasonal vegetables perfect for healthy meals."}
//         </p>

//         {/* Price & Action Footer */}
//         <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-50">
//           <div className="flex flex-col">
//             {oldPrice && (
//               <span className="text-xs text-gray-400 line-through font-medium">LKR {oldPrice}</span>
//             )}
//             <span className="text-xl font-extrabold text-gray-900">
//               LKR {pack.price}
//             </span>
//           </div>

//           <button
//             onClick={(e) => onAdd(e, pack)}
//             disabled={isLoading}
//             className={`
//               relative h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300
//               ${isLoading 
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                 : "bg-gray-900 text-white hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-110"
//               }
//             `}
//           >
//             {isLoading ? (
//                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <ShoppingCart size={20} />
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-[2rem] p-4 border border-gray-100 h-[420px] animate-pulse flex flex-col">
//       <div className="bg-gray-200 w-full h-48 rounded-[1.5rem] mb-5"></div>
//       <div className="flex gap-2 mb-4">
//         <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
//         <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
//       </div>
//       <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3"></div>
//       <div className="h-4 w-full bg-gray-200 rounded-lg mb-2"></div>
//       <div className="h-4 w-2/3 bg-gray-200 rounded-lg mb-auto"></div>
//       <div className="flex justify-between items-end mt-4">
//         <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
//         <div className="h-12 w-12 bg-gray-200 rounded-2xl"></div>
//       </div>
//     </div>
//   )
// }

// function EmptyState() {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 text-center">
//       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//         <Package size={40} className="text-gray-400" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-900 mb-2">No Packages Found</h3>
//       <p className="text-gray-500 max-w-md">
//         We couldn't find any packages matching your category. Please try selecting "All" or check back later.
//       </p>
//     </div>
//   )
// }


import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowRight, 
  Package, 
  Filter,
  Zap,
  Leaf,
  Truck,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";
import { useAuth } from "../AuthContext";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function PackagesPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  
  // UI States
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products?page=1&limit=500");
        if (res.success) {
          const packageList = (res.products || []).filter(
            (p) => (p.type || "").toLowerCase() === "package"
          );
          setPackages(packageList);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Filter Logic
  const filteredPackages = useMemo(() => {
    if (activeCategory === "All") return packages;
    return packages.filter((_, i) => {
      if (activeCategory === "Best Sellers") return i % 2 === 0;
      if (activeCategory === "Family Size") return i % 3 === 0;
      if (activeCategory === "Organic") return i % 2 !== 0;
      return true;
    });
  }, [packages, activeCategory]);

  const handleAddToCart = async (e, pack) => {
    e.stopPropagation();
    setLoadingId(pack._id);
    
    const payload = {
      type: "package",
      itemId: pack._id,
      name: pack.name,
      image: pack.image || "",
      unitPrice: pack.price,
      quantity: 1,
      vegetables: pack.vegetables || [],
      totalPrice: pack.price,
    };

    try {
      if (!isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart (guest mode)"); 
        return;
      }

      const res = await api.post("/cart/add", payload);
      if (res.success) alert("Successfully added to your cart!");
      else alert(res.message || "Failed to add");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const categories = ["All", "Best Sellers", "Family Size", "Organic"];

  return (
    <div className="min-h-screen  font-sans selection:bg-emerald-100 selection:text-emerald-900" style={{marginTop:"50px",backgroundColor:"#eff1ed",paddingTop:"20px"}}>
      
      {/* === HERO BANNER (Premium Dark Theme) === */}
      <div className="  px-4 sm:px-6 lg:px-8  border-b border-gray-200" style={{marginTop:"40px"}}>
        <div className="max-w-7xl mx-auto" > 
          <div className="relative  rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gray-200" style={{backgroundColor:"#036666"}}>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                  <Leaf size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">100% Farm Fresh</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
                   VEG<span className="text-green">Packs</span>
                </h1>
                <p className="text-white text-lg leading-relaxed">
                  Curated vegetable bundles delivered fresh from the farm to your doorstep. Save time, eat healthy.
                </p>
                
               
              </div>

              <button onClick={() => navigate('/vegetables')} className="hidden md:flex group items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:bg-emerald-400 transition-all transform hover:-translate-y-1">
                <span>View Single Items</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" style={{paddingTop:"50px",paddingBottom:"50px"}}>
        
        
      

        {/* === PRODUCT GRID === */}
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
           </div>
        ) : filteredPackages.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pack, index) => (
                <ProductCard 
                  key={pack._id} 
                  pack={pack} 
                  index={index}
                  loadingId={loadingId}
                  onAdd={handleAddToCart}
                  onView={(id) => navigate(`/package/${id}`)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// === PREMIUM PRODUCT CARD ===

function ProductCard({ pack, index, loadingId, onAdd, onView }) {
  const isLoading = loadingId === pack._id;
  
  // Fake Discount for UI Demo
  const discount = index % 3 === 0 ? 20 : 0;
  const oldPrice = discount > 0 ? Math.round(pack.price * 1.2) : null;

  return (
    <motion.div 
      variants={cardVariants}
      layout
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col overflow-hidden"
    >
      {/* 
         IMAGE CONTAINER
         - Background is white to show the full image cleanly.
         - object-contain ensures the image is not cropped.
         - height is fixed to 300px as requested.
      */}
      <div 
        onClick={() => onView(pack._id)}
        className="relative bg-white overflow-hidden cursor-pointer p-4 flex items-center justify-center border-b border-gray-50"
        style={{ height: "400px" }} // Fixed Height
      >
        <img 
          src={pack.image || "https://placehold.co/400x300?text=Fresh+Pack"} 
          alt={pack.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out" 
        />
        
        {/* Floating Badges */}
       
        {/* Wishlist Button */}
        <button className="absolute top-4  w-10 h-10 bg-white  rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 flex-1 flex flex-col">
        {/* Rating */}
       

        {/* Title */}
        <h3 
          onClick={() => onView(pack._id)}
          className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors cursor-pointer"
        >
          {pack.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
          {pack.description || "A curated selection of seasonal vegetables perfect for healthy meals."}
        </p>

        {/* Price & Action Footer */}
        <div className="mt-auto flex items-end justify-between  border-slate-50">
          <div className="flex flex-col">
           
            <span className="text-xl font-black text-slate-900">
              LKR {pack.price}
            </span>
          </div>

          <button
            onClick={(e) => onAdd(e, pack)}
            disabled={isLoading}
            className={`
              relative h-12 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 font-bold text-sm
              ${isLoading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-slate-900 text-black hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
              }
            `}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Add</span>
                <ShoppingCart size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Loader for polished feel
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] p-4 border border-gray-100 h-[500px] animate-pulse flex flex-col">
      <div className="bg-gray-100 w-full h-[300px] rounded-[1.5rem] mb-5"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-4 w-12 bg-gray-100 rounded-full"></div>
        <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-3"></div>
      <div className="h-4 w-full bg-gray-100 rounded-lg mb-2"></div>
      <div className="flex justify-between items-end mt-auto">
        <div className="h-8 w-24 bg-gray-100 rounded-lg"></div>
        <div className="h-12 w-20 bg-gray-100 rounded-2xl"></div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Package size={40} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No Packages Found</h3>
      <p className="text-gray-500 max-w-md">
        We couldn't find any packages matching your category. Please try selecting "All" or check back later.
      </p>
    </div>
  )
}