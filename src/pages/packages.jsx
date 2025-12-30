

// // src/pages/packages.jsx
// import { useEffect, useState, useMemo,memo } from "react";
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
//   Truck,
//   Sparkles,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { duration: 0.2 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/products?type=package&page=1&limit=40");
//         if (res.success) {
//          setPackages(res.products || []);

//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const filteredPackages = useMemo(() => {
//     if (activeCategory === "All") return packages;
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
//     <div
//       className="min-h-screen  font-sans selection:bg-emerald-100 selection:text-emerald-900"
//       style={{ marginTop: "50px", backgroundColor: "#eff1ed", paddingTop: "20px" }}
//     >
//       {/* HERO */}
//       <div
//         className="  px-4 sm:px-6 lg:px-8  border-b border-gray-200"
//         style={{ marginTop: "40px" }}
//       >
//         <div className="max-w-7xl mx-auto">
//           <div
//             className="relative  rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gray-200"
//             style={{ backgroundColor: "#036666" }}
//           >
//             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
//             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

//             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
//               <div className="max-w-xl space-y-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
//                   <Leaf size={14} className="text-emerald-400" />
//                   <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
//                     100% Farm Fresh
//                   </span>
//                 </div>
//                 <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
//                   VEG<span className="text-green">Packs</span>
//                 </h1>
//                 <p className="text-white text-lg leading-relaxed">
//                   Curated vegetable bundles delivered fresh from the farm to your
//                   doorstep. Save time, eat healthy.
//                 </p>
//               </div>

//               <button
//                 onClick={() => navigate("/vegetables")}
//                 className="hidden md:flex group items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:bg-emerald-400 transition-all transform hover:-translate-y-1"
//                 style={{borderRadius:"25px"}}
//               >
//                 <span>View Single Items</span>
//                 <ArrowRight
//                   size={20}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
//         style={{ paddingTop: "50px", paddingBottom: "50px" }}
//       >
//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-3 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
//                 activeCategory === cat
//                   ? "bg-slate-900 text-white border-slate-900 shadow-md"
//                   : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* GRID */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
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

// // Card

// const ProductCard=memo(function ProductCard({pack, index, loadingId, onAdd, onView }){

//   const isLoading = loadingId === pack._id;
//   const discount = index % 3 === 0 ? 20 : 0;
//   const oldPrice = discount > 0 ? Math.round(pack.price * 1.2) : null;

//   return (
//     <motion.div
//       variants={cardVariants}
//       layout
//       whileHover={{ y: -8 }}
//       className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col overflow-hidden"
//     >
//       <div
//         onClick={() => onView(pack._id)}
//         className="relative bg-white overflow-hidden cursor-pointer p-4 flex items-center justify-center border-b border-gray-50"
//         style={{ height: "400px" }}
//       >
//         <img
//           src={pack.image || "https://placehold.co/400x300?text=Fresh+Pack"}
//           alt={pack.name}
//           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
//         />

//         <button className="absolute top-4  w-10 h-10 bg-white  rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
//           <Heart size={18} />
//         </button>
//       </div>

//       <div className="p-2 flex-1 flex flex-col">
//         <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
//           <Star size={14} className="text-yellow-400" fill="currentColor" />
//           <span className="font-semibold">4.9</span>
//         </div>

//         <h3
//           onClick={() => onView(pack._id)}
//           className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors cursor-pointer"
//         >
//           {pack.name}
//         </h3>

//         <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
//           {pack.description ||
//             "A curated selection of seasonal vegetables perfect for healthy meals."}
//         </p>

//         <div className="mt-auto flex items-end justify-between  border-slate-50">
//           <div className="flex flex-col">
//             <div className="flex items-baseline gap-2">
//               <span className="text-xl font-black text-slate-900">
//                 LKR {pack.price}
//               </span>
//               {oldPrice && (
//                 <span className="text-xs text-slate-400 line-through">
//                   LKR {oldPrice}
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={(e) => onAdd(e, pack)}
//             disabled={isLoading}
//             className={`
//               relative h-12 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 font-bold text-sm
//               ${
//                 isLoading
//                   ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                   : "bg-slate-900 text-black hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
//               }
//             `}
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
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
// )
// // Skeleton
// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-[2rem] p-4 border border-gray-100 h-[500px] animate-pulse flex flex-col">
//       <div className="bg-gray-100 w-full h-[300px] rounded-[1.5rem] mb-5"></div>
//       <div className="flex gap-2 mb-4">
//         <div className="h-4 w-12 bg-gray-100 rounded-full"></div>
//         <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
//       </div>
//       <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-3"></div>
//       <div className="h-4 w-full bg-gray-100 rounded-lg mb-2"></div>
//       <div className="flex justify-between items-end mt-auto">
//         <div className="h-8 w-24 bg-gray-100 rounded-lg"></div>
//         <div className="h-12 w-20 bg-gray-100 rounded-2xl"></div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 text-center">
//       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//         <Package size={40} className="text-gray-400" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-900 mb-2">
//         No Packages Found
//       </h3>
//       <p className="text-gray-500 max-w-md">
//         We couldn't find any packages matching your category. Please try
//         selecting "All" or check back later.
//       </p>
//     </div>
//   );
// }


// // src/pages/packages.jsx
// import { useEffect, useState, useMemo, memo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Star,
//   Heart,
//   ShoppingCart,
//   ArrowRight,
//   Package as PackageIcon,
//   Leaf,
//   Truck,
//   Sparkles,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { duration: 0.2 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/products?type=package&page=1&limit=40");
//         if (res.success) {
//           setPackages(res.products || []);
//         }
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const filteredPackages = useMemo(() => {
//     if (activeCategory === "All") return packages;
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
//     };

//     try {
//       // Login இல்லாதவங்க → login page
//       if (!isLoggedIn) {
//         navigate("/login");
//         return;
//       }

//       const res = await api.post("/cart/add", payload);
//       if (res.success) alert("Successfully added to your cart!");
//       else alert(res.message || "Failed to add");
//     } catch (err) {
//       console.error("Add package to cart error:", err);
//       alert("Failed to add to cart");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const categories = ["All", "Best Sellers", "Family Size", "Organic"];

//   return (
//     <div
//       className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900"
//       style={{ marginTop: "50px", backgroundColor: "#eff1ed", paddingTop: "20px" }}
//     >
//       {/* HERO */}
//       <div
//         className="px-4 sm:px-6 lg:px-8 border-b border-gray-200"
//         style={{ marginTop: "40px" }}
//       >
//         <div className="max-w-7xl mx-auto">
//           <div
//             className="relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gray-200"
//             style={{ backgroundColor: "#036666" }}
//           >
//             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
//             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

//             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
//               <div className="max-w-xl space-y-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
//                   <Leaf size={14} className="text-emerald-400" />
//                   <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
//                     100% Farm Fresh
//                   </span>
//                 </div>
//                 <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
//                   VEG<span className="text-green">Packs</span>
//                 </h1>
//                 <p className="text-emerald-50 text-lg leading-relaxed">
//                   Curated vegetable bundles delivered fresh from the farm to your
//                   doorstep. Save time, eat healthy.
//                 </p>
//               </div>

//               <button
//                 onClick={() => navigate("/vegetables")}
//                 className="hidden md:flex group items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:bg-emerald-400 transition-all transform hover:-translate-y-1"
//                 style={{ borderRadius: "25px" }}
//               >
//                 <span>View Single Items</span>
//                 <ArrowRight
//                   size={20}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
//         style={{ paddingTop: "50px", paddingBottom: "50px" }}
//       >
//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-3 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
//                 activeCategory === cat
//                   ? "bg-slate-900 text-white border-slate-900 shadow-md"
//                   : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* GRID */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
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
//                   onView={(id) => navigate(`/package/${id}`, { state: { from: "/packages" } })}
//                 />
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Card
// const ProductCard = memo(function ProductCard({
//   pack,
//   index,
//   loadingId,
//   onAdd,
//   onView,
// }) {
//   const isLoading = loadingId === pack._id;
//   const discount = index % 3 === 0 ? 20 : 0;
//   const oldPrice = discount > 0 ? Math.round(pack.price * 1.2) : null;

//   return (
//     <motion.div
//       variants={cardVariants}
//       layout
//       whileHover={{ y: -8 }}
//       className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col overflow-hidden"
//     >
//       <div
//         onClick={() => onView(pack._id)}
//         className="relative bg-white overflow-hidden cursor-pointer p-4 flex items-center justify-center border-b border-gray-50"
//         style={{ height: "400px" }}
//       >
//         <img
//           src={pack.image || "https://placehold.co/400x300?text=Fresh+Pack"}
//           alt={pack.name}
//           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
//         />

//         <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
//           <Heart size={18} />
//         </button>
//       </div>

//       <div className="p-2 flex-1 flex flex-col">
//         <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
//           <Star size={14} className="text-yellow-400" fill="currentColor" />
//           <span className="font-semibold">4.9</span>
//         </div>

//         <h3
//           onClick={() => onView(pack._id)}
//           className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors cursor-pointer"
//         >
//           {pack.name}
//         </h3>

//         <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
//           {pack.description ||
//             "A curated selection of seasonal vegetables perfect for healthy meals."}
//         </p>

//         <div className="mt-auto flex items-end justify-between border-slate-50">
//           <div className="flex flex-col">
//             <div className="flex items-baseline gap-2">
//               <span className="text-xl font-black text-slate-900">
//                 LKR {pack.price}
//               </span>
//               {oldPrice && (
//                 <span className="text-xs text-slate-400 line-through">
//                   LKR {oldPrice}
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={(e) => onAdd(e, pack)}
//             disabled={isLoading}
//             style={{backgroundColor:"green",borderRadius:"15px"}}
//             className={`
//               relative h-12 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 font-bold text-sm
//               ${
//                 isLoading
//                   ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                   : "bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
//               }
//             `}
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" style={{}}/>
//             ) : (
//               <>
//                 <span>Add</span>
//                 <ShoppingCart size={18}  />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// // Skeleton
// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-[2rem] p-4 border border-gray-100 h-[500px] animate-pulse flex flex-col">
//       <div className="bg-gray-100 w-full h-[300px] rounded-[1.5rem] mb-5"></div>
//       <div className="flex gap-2 mb-4">
//         <div className="h-4 w-12 bg-gray-100 rounded-full"></div>
//         <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
//       </div>
//       <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-3"></div>
//       <div className="h-4 w-full bg-gray-100 rounded-lg mb-2"></div>
//       <div className="flex justify-between items-end mt-auto">
//         <div className="h-8 w-24 bg-gray-100 rounded-lg"></div>
//         <div className="h-12 w-20 bg-gray-100 rounded-2xl"></div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 text-center">
//       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//         <PackageIcon size={40} className="text-gray-400" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-900 mb-2">
//         No Packages Found
//       </h3>
//       <p className="text-gray-500 max-w-md">
//         We couldn't find any packages matching your category. Please try
//         selecting "All" or check back later.
//       </p>
//     </div>
//   );
// }



// src/pages/packages.jsx
import { useEffect, useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  ArrowRight,
  Package as PackageIcon,
  Leaf,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";
import { useAuth } from "../AuthContext";
import "./Packages.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function PackagesPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          "/products?type=package&page=1&limit=40"
        );
        if (res.success) {
          setPackages(res.products || []);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

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
  };

  try {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const res = await api.post("/cart/add", payload);
    if (res.success) {
      // OLD: alert("Successfully added to your cart!");
      // NEW: dispatch event for Navbar
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: { type: "add" } })
      );
    } else {
      alert(res.message || "Failed to add");
    }
  } catch (err) {
    console.error("Add package to cart error:", err);
    alert("Failed to add to cart");
  } finally {
    setLoadingId(null);
  }
};

  const categories = ["All", "Best Sellers", "Family Size", "Organic"];

  return (
    <div className="packages-page min-h-screen font-sans">
      {/* HERO */}
      <section className="packages-hero-wrapper">
        <div className="packages-hero max-w-7xl mx-auto">
          <div className="packages-hero-bg packages-hero-bg--emerald" />
          <div className="packages-hero-bg packages-hero-bg--blue" />

          <div className="packages-hero-inner">
            <div className="packages-hero-left">
              <div className="packages-hero-pill">
                <Leaf
                  size={14}
                  className="text-emerald-300"
                />
                <span>100% Farm Fresh</span>
              </div>
              <h1 className="packages-hero-title">
                VEG<span>Packs</span>
              </h1>
              <p className="packages-hero-subtitle">
                Curated vegetable bundles delivered fresh from the farm
                to your doorstep. Save time, eat healthy.
              </p>
            </div>

            <button
              onClick={() => navigate("/vegetables")}
              className="packages-hero-cta"
            >
              <span>View Single Items</span>
              <ArrowRight
                size={20}
                className="packages-hero-cta__icon"
              />
            </button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="packages-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="packages-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`packages-filter-pill ${
                activeCategory === cat
                  ? "packages-filter-pill--active"
                  : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        {loading ? (
          <div className="packages-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredPackages.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="packages-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pack, index) => (
                <ProductCard
                  key={pack._id}
                  pack={pack}
                  index={index}
                  loadingId={loadingId}
                  onAdd={handleAddToCart}
                  onView={(id) =>
                    navigate(`/package/${id}`, {
                      state: { from: "/packages" },
                    })
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// Product Card
const ProductCard = memo(function ProductCard({
  pack,
  index,
  loadingId,
  onAdd,
  onView,
}) {
  const isLoading = loadingId === pack._id;
  const discount = index % 3 === 0 ? 20 : 0;
  const oldPrice = discount > 0 ? Math.round(pack.price * 1.2) : null;

  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -8 }}
      className="package-card group"
    >
      <div
        onClick={() => onView(pack._id)}
        className="package-card__image-wrap cursor-pointer"
      >
        <img
          src={
            pack.image ||
            "https://placehold.co/400x300?text=Fresh+Pack"
          }
          alt={pack.name}
          className="package-card__image"
        />

        <button className="package-card__fav-btn">
          <Heart size={18} />
        </button>

        {discount > 0 && (
          <div className="package-card__badge">
            -{discount}%
          </div>
        )}
      </div>

      <div className="package-card__body">
        <div className="package-card__rating">
          <Star
            size={14}
            className="text-yellow-400"
            fill="currentColor"
          />
          <span className="font-semibold">4.9</span>
        </div>

        <h3
          onClick={() => onView(pack._id)}
          className="package-card__title"
        >
          {pack.name}
        </h3>

        <p className="package-card__desc">
          {pack.description ||
            "A curated selection of seasonal vegetables perfect for healthy meals."}
        </p>

        <div className="package-card__footer">
          <div className="package-card__price-block">
            <div className="package-card__price-row">
              <span className="package-card__price">
                LKR {pack.price}
              </span>
              {oldPrice && (
                <span className="package-card__old-price">
                  LKR {oldPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => onAdd(e, pack)}
            disabled={isLoading}
            className={`package-add-btn ${
              isLoading ? "package-add-btn--loading" : ""
            }`}
          >
            {isLoading ? (
              <div className="package-add-spinner" />
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
});

// Skeleton
function SkeletonCard() {
  return (
    <div className="package-skeleton">
      <div className="package-skeleton__image" />
      <div className="package-skeleton__meta">
        <div className="package-skeleton__chip" />
        <div className="package-skeleton__chip" />
      </div>
      <div className="package-skeleton__title" />
      <div className="package-skeleton__line" />
      <div className="package-skeleton__footer">
        <div className="package-skeleton__price" />
        <div className="package-skeleton__btn" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="packages-empty">
      <div className="packages-empty__icon">
        <PackageIcon size={40} />
      </div>
      <h3 className="packages-empty__title">
        No Packages Found
      </h3>
      <p className="packages-empty__text">
        We couldn't find any packages matching your category. Please
        try selecting "All" or check back later.
      </p>
    </div>
  );
}