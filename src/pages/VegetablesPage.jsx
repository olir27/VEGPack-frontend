// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/products");
//         if (res.success) {
//           const vegs = res?.products?.filter((p) => p.type === "vegetable");
//           setVegetables(vegs);
//           console.log(vegs, "data fetched")
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filteredVeg = vegetables.filter((veg) =>
//     veg.name.toLowerCase().includes(search.toLowerCase())
//   );


// const handleAddClick = (id) => {
//   if (!isLoggedIn) {
//     navigate("/register");
//     return;
//   }
//   navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
// };




//   if (loading) return <p className="text-center mt-10">Loading vegetables...</p>;

//   return (
//     <div className="bg-white mt-10 px-6 max-w-6xl mx-auto" style={{marginTop:"100px"}}>
//       <h2 className=" font-bold text-green-800 mb-4 text-center" style={{fontSize:"50px"}}> Our Vegetables</h2>

//       <input
//         type="text"
//         placeholder="Search vegetables..."
//         className="w-full p-3 mb-6 border rounded shadow"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ maxWidth: "400px", margin: "0 auto", borderRadius: "20px" }}
//       />

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredVeg.map((veg) => (
//           <div
//             key={veg._id}
//             className="bg-white p-4 rounded shadow hover:shadow-lg transition text-center"
//           >
//             <img
//               src={veg.image || "/src/assets/default.png"}
//               alt={veg.name}
//               className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h3 className="text-xl font-semibold">{veg.name}</h3>
//             <p className="text-gray-600">{veg.quantity}</p>
//             <p className="text-white font-semibold bg-red-600 p-2 rounded-full mt-1" style={{marginLeft:"330px",width:"50px"}}>₹{veg.price}</p>

//             <button
//               onClick={() => handleAddClick(veg._id)}
//               className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//             >
//               ADD
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, ShoppingCart, Plus } from "lucide-react";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/products");
//         if (res.success) {
//           const vegs = res?.products?.filter((p) => p.type === "vegetable");
//           setVegetables(vegs);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filteredVeg = vegetables.filter((veg) =>
//     veg.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAddClick = (id) => {
//     if (!isLoggedIn) {
//       navigate("/register");
//       return;
//     }
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   // Animation
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   if (loading) return (
//     <div className="min-h-screen flex justify-center items-center bg-green-50">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] py-24 px-4 md:px-8 font-sans">
      
//       {/* ================= HEADER ================= */}
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
//           Fresh <span className="text-green-600">Vegetables</span>
//         </h2>
//         <p className="text-gray-500 max-w-lg mx-auto">
//           Handpicked from organic farms and delivered fresh to your kitchen.
//         </p>

//         {/* Search Bar */}
//         <div className="mt-8 relative max-w-md mx-auto">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//                 type="text"
//                 placeholder="Search for carrots, broccoli..."
//                 className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//             />
//         </div>
//       </div>

//       {/* ================= PRODUCT GRID ================= */}
//       <motion.div 
//         className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//         initial="hidden"
//         animate="visible"
//       >
//         <AnimatePresence>
//           {filteredVeg.map((veg) => (
//             <motion.div
//               key={veg._id}
//               variants={cardVariants}
//               layout
//               whileHover={{ y: -5 }}
//               className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative group"
//             >
//               {/* Price Badge */}
//               <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full z-10">
//                   ₹{veg.price} / kg
//               </div>

//               {/* Image */}
//               <div className="h-48 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
//                   <img 
//                     src={veg.image || "/src/assets/default.png"} 
//                     alt={veg.name}
//                     className="w-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
//                   />
//               </div>

//               {/* Content */}
//               <div className="text-center flex-1 flex flex-col">
//                   <h3 className="text-lg font-bold text-gray-900">{veg.name}</h3>
//                   <p className="text-sm text-gray-500 mb-4">{veg.quantity || "1 kg"}</p>
                  
//                   {/* Add Button */}
//                   <button
//                     onClick={() => handleAddClick(veg._id)}
//                     className="mt-auto w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-600 transition-all flex items-center justify-center gap-2"
//                   >
//                       <Plus size={16} /> Add to Cart
//                   </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Empty State */}
//       {filteredVeg.length === 0 && (
//           <div className="text-center py-20 text-gray-400">
//               <p>No vegetables found matching "{search}"</p>
//           </div>
//       )}

//     </div>
//   );
// }



// // src/pages/VegetablesPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../AuthContext";
// import { Search } from "lucide-react";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/products");
//         if (res.success) {
//           const vegs = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );
//           setVegetables(vegs);
//         }
//       } catch (err) {
//         console.error("Fetch vegetables error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filteredVeg = vegetables.filter((veg) =>
//     veg.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAddClick = (id) => {
//     if (!isLoggedIn) {
//       navigate("/register");
//       return;
//     }
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   if (loading)
//     return <p className="text-center mt-16 text-gray-600">Loading vegetables...</p>;

//   return (
//     <div className="min-h-screen bg-green-200 pt-16 pb-10">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
//             Vegetables
//           </h2>
//           <p className="text-sm sm:text-base text-gray-700">
//             Browse our fresh, organic vegetables and add them to your cart.
//           </p>
//         </div>

//         {/* Search bar */}
//         <div className="flex justify-center mb-6">
//           <div className="relative w-full max-w-md">
//             <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
//               <Search size={16} />
//             </span>
//             <input
//               type="text"
//               placeholder="Search vegetables..."
//               className="w-full pl-9 pr-3 py-2 rounded-full border border-green-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Grid of vegetables */}
//         {filteredVeg.length === 0 ? (
//           <p className="text-center text-gray-600 mt-8">
//             No vegetables found for “{search}”.
//           </p>
//         ) : (
//           <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredVeg.map((veg) => (
//               <div
//                 key={veg._id}
//                 className="bg-white rounded-2xl shadow-sm border border-green-100 p-3 sm:p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition"
//               >
//                 {/* Image */}
//                 <div className="w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-green-50 mb-3">
//                   <img
//                     src={veg.image || "/products/default.png"}
//                     alt={veg.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 flex flex-col">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
//                     {veg.name}
//                   </h3>
//                   <p className="text-xs text-gray-500 mb-1">
//                     {veg.description || "Fresh and organic vegetable."}
//                   </p>

//                   <div className="flex items-center justify-between mt-1 mb-2">
//                     <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
//                       {veg.quantity || "1kg"}
//                     </span>
//                     <span className="text-lg font-bold text-red-600">
//                       ₹{veg.price}
//                     </span>
//                   </div>

//                   {/* Add button */}
//                   <button
//                     onClick={() => handleAddClick(veg._id)}
//                     className="mt-auto w-full bg-green-600 text-white py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
//                   >
//                     View & Add
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// // src/pages/VegetablesPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../AuthContext";
// import { Search } from "lucide-react";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/products");
//         if (res.success) {
//           const vegs = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );
//           setVegetables(vegs);
//         }
//       } catch (err) {
//         console.error("Fetch vegetables error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filteredVeg = vegetables.filter((veg) =>
//     veg.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAddClick = (id) => {
//     if (!isLoggedIn) {
//       navigate("/register");
//       return;
//     }
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-20 text-gray-700 font-medium">
//         Loading vegetables...
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-green-100 pt-20 pb-10">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-2">
//             Fresh Vegetables
//           </h2>
//           <p className="text-sm sm:text-base text-gray-700">
//             Pick from a wide range of fresh and organic vegetables.
//           </p>
//         </div>

//         {/* Modern Search bar */}
//         <div className="flex justify-center mb-8">
//           <div className="w-full max-w-xl bg-white/90 border border-green-300 rounded-2xl shadow-md flex items-center px-3 py-2">
//             <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-100 text-green-700 mr-2">
//               <Search size={18} />
//             </span>
//             <input
//               type="text"
//               placeholder="Search vegetables by name..."
//               className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={{borderColor:"green"}}
//             />
//           </div>
//         </div>

//         {/* Grid of vegetables */}
//         {filteredVeg.length === 0 ? (
//           <p className="text-center text-gray-700 mt-8">
//             No vegetables found for “{search}”.
//           </p>
//         ) : (
//           <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
//             {filteredVeg.map((veg) => (
//               <div
//                 key={veg._id}
//                 className="bg-white rounded-2xl shadow-sm border border-green-100 p-3 sm:p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition transform"
//               >
//                 {/* Image */}
//                 <div className="w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-green-50 mb-3">
//                   <img
//                     src={veg.image || "/products/default.png"}
//                     alt={veg.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 flex flex-col">
//                   {/* Name */}
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1">
//                     {veg.name}
//                   </h3>

//                   {/* Description (small) */}
//                   <p className="text-xs text-gray-500 mb-1 line-clamp-2">
//                     {veg.description || "Fresh, local and healthy vegetable."}
//                   </p>

//                   {/* Quantity + Price */}
//                   <div className="flex items-center justify-between mt-1 mb-2">
//                     {/* Unit / quantity */}
//                     <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-semibold">
//                       {veg.quantity || "1kg"}
//                     </span>

//                     {/* Price – visually standout */}
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm sm:text-base font-bold shadow-md">
//                       ₹{veg.price}
//                     </span>
//                   </div>

//                   {/* Add button */}
//                   <button
//                     onClick={() => handleAddClick(veg._id)}
//                     className="mt-auto w-full bg-green-600 text-white py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
//                   >
//                     View & Add
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // src/pages/VegetablesPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, Info } from "lucide-react";
// import { useAuth } from "../AuthContext";
// import { getProducts } from "../api";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [allVegetables, setAllVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const limit = 20; // ஒவ்வொரு பக்கத்திலும் 20 veg

//   useEffect(() => {
//     const fetchVegetables = async () => {
//       try {
//         setLoading(true);
//         const res = await getProducts(1, 1000); // எல்லா products→ filter veg
//         if (res.success) {
//           const vegs = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );
//           setAllVegetables(vegs);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVegetables();
//   }, []);

//   // Filter logic
//   const lowerSearch = search.toLowerCase();
//   const filteredList = lowerSearch
//     ? allVegetables.filter((veg) =>
//         veg.name.toLowerCase().includes(lowerSearch)
//       )
//     : allVegetables;

//   // Pagination logic (filtered data மீது)
//   const totalPages = Math.max(1, Math.ceil(filteredList.length / limit));
//   const startIndex = (page - 1) * limit;
//   const displayedVeg = filteredList.slice(startIndex, startIndex + limit);

//   // Handlers
//   const handleCardClick = (id) => {
//     if (!isLoggedIn) return navigate("/register");
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   const handleAllClick = () => {
//     setSearch("");
//     setPage(1);
//   };

//   const handleChipClick = (name) => {
//     setSearch(name);
//     setPage(1);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8 font-sans text-gray-900" style={{paddingTop:"100px"}}>
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
//           Fresh <span className="text-green-600">Market</span>
//         </h2>
//         <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
//           Handpicked organic vegetables delivered fresh to your kitchen.
//         </p>

//         {/* SEARCH BAR */}
//         <div className="mt-8 relative max-w-md mx-auto">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             style={{marginLeft:"20px"}}
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search vegetables..."
//             className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
//             style={{paddingLeft:"50px"}}
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {/* ALL + NAME CHIPS (எல்லா pagesலும்) */}
//       {allVegetables.length > 0 && (
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10" style={{marginTop:"30px"}}>
//           {/* All button */}
//           <button
//             onClick={handleAllClick}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//               search === "" && page === 1
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//             }`}
//           >
//             All Vegetables
//           </button>

//           {/* All vegetable name chips */}
//           {allVegetables.map((veg) => (
//             <button
//               key={veg._id}
//               onClick={() => handleChipClick(veg.name)}
//               className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all"
//             >
//               {veg.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
//         {displayedVeg.length > 0 ? (
//           displayedVeg.map((veg) => (
//             <div
//               key={veg._id}
//               className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-[380px] group relative"
//               style={{borderRadius:"25px"}}
//             >
//               {/* Image Container */}
//               <div
//                 className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden cursor-pointer"
//                 onClick={() => handleCardClick(veg._id)}
//               >
//                 <img
//                   src={veg.image || "/products/default.png"}
//                   alt={veg.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 {/* Quick Action Overlay */}
//                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
//                     View Details
//                   </button>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <div className="flex justify-between items-start mb-1">
//                     <h3
//                       className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-600 transition-colors line-clamp-1"
//                       onClick={() => handleCardClick(veg._id)}
//                     >
//                       {veg.name}
//                     </h3>
//                     <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
//                       {veg.quantity || "1kg"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 line-clamp-2 mb-3">
//                     {veg.description ||
//                       "Fresh, organic, and locally sourced produce for your daily needs."}
//                   </p>
//                 </div>

//                 {/* Footer: Price & Button */}
//                 <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
//                   <p className="text-lg font-bold text-gray-900">
//                     ₹{veg.price}
//                   </p>
                  
//                   <button
//                     onClick={() => handleCardClick(veg._id)}
//                     className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
//                   >
//                     <ShoppingCart size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20">
//             <div className="inline-block p-4 rounded-full bg-gray-100 mb-3 text-gray-400">
//               <Info size={32} />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900">
//               No vegetables found
//             </h3>
//             <p className="text-gray-500">Try adjusting your search filters.</p>
//           </div>
//         )}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-12" style={{marginTop:"40px",marginBottom:"30px"}}>
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
            
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 text-sm font-bold text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





{/* <button style={{fontSize:"12px",backgroundColor:"green",color:"white",padding:"5px",borderRadius:"10px"}}>View Details</button> */}



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, Info } from "lucide-react";
// import { useAuth } from "../AuthContext";
// import { getProducts, addToCart } from "../api";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [allVegetables, setAllVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const limit = 20; // 20 veg per page

//   useEffect(() => {
//     const fetchVegetables = async () => {
//       try {
//         setLoading(true);
//         const res = await getProducts(1, 1000); // load upto 1000
//         if (res.success) {
//           const vegs = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );
//           setAllVegetables(vegs);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVegetables();
//   }, []);

//   // Filter logic
//   const lowerSearch = search.toLowerCase();
//   const filteredList = lowerSearch
//     ? allVegetables.filter((veg) =>
//         veg.name.toLowerCase().includes(lowerSearch)
//       )
//     : allVegetables;

//   // Pagination logic
//   const totalPages = Math.max(1, Math.ceil(filteredList.length / limit));
//   const startIndex = (page - 1) * limit;
//   const displayedVeg = filteredList.slice(startIndex, startIndex + limit);

//   // Navigate to details (always)
//   const handleDetailsClick = (id) => {
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   // Add to cart (no navigate)
//   const handleAddToCart = async (veg) => {
//     // const payload = {
//     //   type: "vegetable",
//     //   itemId: veg._id,
//     //   name: veg.name,
//     //   unitPrice: veg.price,
//     //   quantity: 1,
//     //   image: veg.image,
//     // };
//     const payload = {
//   type: "vegetable",
//   itemId: veg._id,
//   name: veg.name,
//   unitPrice: veg.price,
//   quantity: 1,
//   image: veg.image,
//   weightLabel: veg.quantity || "1kg",   // ✅ add இதை
// };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//       // ❌ navigate("/cart") நீக்கப்பட்டுள்ளது
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     }
//   };

//   const handleAllClick = () => {
//     setSearch("");
//     setPage(1);
//   };

//   const handleChipClick = (name) => {
//     setSearch(name);
//     setPage(1);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50" >
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" ></div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8 font-sans text-gray-900" style={{paddingTop:"100px"}}>
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
//           Fresh <span className="text-green-600">Market</span>
//         </h2>
//         <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
//           Handpicked organic vegetables delivered fresh to your kitchen.
//         </p>

//         {/* SEARCH BAR */}
//         <div className="mt-8 relative max-w-md mx-auto">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={20}
//              style={{marginLeft:"20px"}}
//           />
//           <input
//             type="text"
//             placeholder="Search vegetables..."
//             className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
//             value={search}
//              style={{paddingLeft:"50px"}}
            
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {/* ALL + NAME CHIPS */}
//       {allVegetables.length > 0 && (
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10" style={{marginTop:"30px"}}>
//           <button
//             onClick={handleAllClick}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//               search === "" && page === 1
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//             }`}
//           >
//             All Vegetables
//           </button>

//           {allVegetables.map((veg) => (
//             <button
//               key={veg._id}
//               onClick={() => handleChipClick(veg.name)}
//               className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all"
//             >
//               {veg.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {displayedVeg.length > 0 ? (
//           displayedVeg.map((veg) => (
//             <div
//               key={veg._id}
//               style={{borderRadius:"20PX"}}
//               className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-[380px] group relative"
//             >
//               {/* Image Container */}
//               <div
//                 className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden cursor-pointer"
//                 onClick={() => handleDetailsClick(veg._id)}
//               >
//                 <img
//                   src={veg.image || "/products/default.png"}
//                   alt={veg.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <div className="flex justify-between items-start mb-1">
//                     <h3
//                       className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-600 transition-colors line-clamp-1"
//                       onClick={() => handleDetailsClick(veg._id)}
//                     >
//                       {veg.name}
//                     </h3>
//                     <span className="bg-green-50 text-green-700 text-l font-bold px-2 py-1 rounded-md">
//                       {veg.quantity || "1kg"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 line-clamp-2 mb-3">
//                     {veg.description ||
//                       "Fresh, organic, and locally sourced produce for your daily needs."}
//                   </p>
//                 </div>

//                 {/* Footer: Price + View Details + Add */}
//                 <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
//                   <p className="text-xl font-bold text-gray-900">
//                     ₹{veg.price}
//                   </p>

//                   <div className="flex items-center gap-2">
//                     {/* View Details button (நடு பகுதியில்) */}
//                     <button
//                       onClick={() => handleDetailsClick(veg._id)}
//                       className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
//                     >
//                       View Details
//                     </button>

//                     {/* Add to cart icon */}
//                     <button
//                       onClick={() => handleAddToCart(veg)}
//                       className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
//                       title="Add to cart"
//                     >
//                       <ShoppingCart size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20">
//             <div className="inline-block p-4 rounded-full bg-gray-100 mb-3 text-gray-400">
//               <Info size={32} />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900">
//               No vegetables found
//             </h3>
//             <p className="text-gray-500">Try adjusting your search filters.</p>
//           </div>
//         )}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-12" style={{marginTop:"40px",marginBottom:"30px"}}>
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 text-sm font-bold text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/pages/VegetablesPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, Info } from "lucide-react";
// import { useAuth } from "../AuthContext";
// import { getProducts, addToCart } from "../api";

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [allVegetables, setAllVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const limit = 20; // 20 veg per page

//   useEffect(() => {
//     const fetchVegetables = async () => {
//       try {
//         setLoading(true);
//         const res = await getProducts(1, 1000); // upto 1000 products
//         if (res.success) {
//           const vegs = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );
//           setAllVegetables(vegs);
//         } else {
//           console.error("Get products failed:", res.message);
//         }
//       } catch (err) {
//         console.error("Fetch vegetables error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVegetables();
//   }, []);

//   // Filter logic
//   const lowerSearch = search.toLowerCase();
//   const filteredList = lowerSearch
//     ? allVegetables.filter((veg) =>
//         veg.name.toLowerCase().includes(lowerSearch)
//       )
//     : allVegetables;

//   // Pagination logic
//   const totalPages = Math.max(1, Math.ceil(filteredList.length / limit));
//   const startIndex = (page - 1) * limit;
//   const displayedVeg = filteredList.slice(startIndex, startIndex + limit);

//   // Navigate to details
//   const handleDetailsClick = (id) => {
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   // Add to cart (quick add)
//   const handleAddToCart = async (veg) => {
//     const payload = {
//       type: "vegetable",
//       itemId: veg._id,
//       name: veg.name,
//       unitPrice: veg.price,
//       quantity: 1,
//       image: veg.image,
//       // Qty label for cart display
//       weightLabel: veg.quantity || "1kg",
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart (guest)");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Add to cart failed");
//     }
//   };

//   const handleAllClick = () => {
//     setSearch("");
//     setPage(1);
//   };

//   const handleChipClick = (name) => {
//     setSearch(name);
//     setPage(1);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   return (
//     <div
//       className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8 font-sans text-gray-900"
//       style={{ paddingTop: "100px" }}
//     >
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
//           Fresh <span className="text-green-600">Market</span>
//         </h2>
//         <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
//           Handpicked organic vegetables delivered fresh to your kitchen.
//         </p>

//         {/* SEARCH BAR */}
//         <div className="mt-8 relative max-w-md mx-auto">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={20}
//             style={{ marginLeft: "20px" }}
//           />
//           <input
//             type="text"
//             placeholder="Search vegetables..."
//             className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
//             value={search}
//             style={{ paddingLeft: "50px" }}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {/* ALL + NAME CHIPS */}
//       {allVegetables.length > 0 && (
//         <div
//           className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10"
//           style={{ marginTop: "30px" }}
//         >
//           <button
//             onClick={handleAllClick}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//               search === "" && page === 1
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//             }`}
//           >
//             All Vegetables
//           </button>

//           {allVegetables.map((veg) => (
//             <button
//               key={veg._id}
//               onClick={() => handleChipClick(veg.name)}
//               className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all"
//             >
//               {veg.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {displayedVeg.length > 0 ? (
//           displayedVeg.map((veg) => (
//             <div
//               key={veg._id}
//               style={{ borderRadius: "20PX" }}
//               className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-[380px] group relative"
//             >
//               {/* Image Container */}
//               <div
//                 className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden cursor-pointer"
//                 onClick={() => handleDetailsClick(veg._id)}
//               >
//                 <img
//                   src={
//                     veg.image && veg.image.trim()
//                       ? veg.image
//                       : "https://via.placeholder.com/400x300?text=VegPack"
//                   }
//                   alt={veg.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <div className="flex justify-between items-start mb-1">
//                     <h3
//                       className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-600 transition-colors line-clamp-1"
//                       onClick={() => handleDetailsClick(veg._id)}
//                     >
//                       {veg.name}
//                     </h3>
//                     <span className="bg-green-50 text-green-700 text-l font-bold px-2 py-1 rounded-md">
//                       {veg.quantity || "1kg"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 line-clamp-2 mb-3">
//                     {veg.description ||
//                       "Fresh, organic, and locally sourced produce for your daily needs."}
//                   </p>
//                 </div>

//                 {/* Footer: Price + View Details + Add */}
//                 <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
//                   <p className="text-xl font-bold text-gray-900">
//                     ₹{veg.price}
//                   </p>

//                   <div className="flex items-center gap-2">
//                     {/* View Details button */}
//                     <button
//                       onClick={() => handleDetailsClick(veg._id)}
//                       className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
//                     >
//                       View Details
//                     </button>

//                     {/* Add to cart icon */}
//                     <button
//                       onClick={() => handleAddToCart(veg)}
//                       className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
//                       title="Add to cart"
//                     >
//                       <ShoppingCart size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20">
//             <div className="inline-block p-4 rounded-full bg-gray-100 mb-3 text-gray-400">
//               <Info size={32} />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900">
//               No vegetables found
//             </h3>
//             <p className="text-gray-500">Try adjusting your search filters.</p>
//           </div>
//         )}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div
//           className="flex justify-center gap-2 mt-12"
//           style={{ marginTop: "40px", marginBottom: "30px" }}
//         >
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 text-sm font-bold text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/VegetablesPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Info } from "lucide-react";
import { useAuth } from "../AuthContext";
import { getProducts, addToCart } from "../api";

// Convert relative "products/xxx.jpg" → "/products/xxx.jpg"
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return "/" + path.replace(/^\/+/, "");
};

export default function VegetablesPage() {
   console.log("🔍 VegetablesPage mounted");  
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [allVegetables, setAllVegetables] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20; // 20 veg per page

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        setLoading(true);
        const res = await getProducts(1, 1000); // upto 1000 products
        if (res.success) {
          const vegs = (res.products || []).filter(
            (p) => p.type === "vegetable"
          );
          setAllVegetables(vegs);
        } else {
          console.error("Get products failed:", res.message);
        }
      } catch (err) {
        console.error("Fetch vegetables error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVegetables();
  }, []);

  // Filter logic
  const lowerSearch = search.toLowerCase();
  const filteredList = lowerSearch
    ? allVegetables.filter((veg) =>
        veg.name.toLowerCase().includes(lowerSearch)
      )
    : allVegetables;

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredList.length / limit));
  const startIndex = (page - 1) * limit;
  const displayedVeg = filteredList.slice(startIndex, startIndex + limit);

  // Navigate to details
  const handleDetailsClick = (id) => {
    navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
  };

  // Add to cart (quick add)
  const handleAddToCart = async (veg) => {
    const payload = {
      type: "vegetable",
      itemId: veg._id,
      name: veg.name,
      unitPrice: veg.price,
      quantity: 1,
      image: veg.image,
      // Qty label for cart display
      weightLabel: veg.quantity || "1kg",
    };

    try {
      if (!isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart (guest)");
      } else {
        await addToCart(payload);
        alert("Added to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Add to cart failed");
    }
  };

  const handleAllClick = () => {
    setSearch("");
    setPage(1);
  };

  const handleChipClick = (name) => {
    setSearch(name);
    setPage(1);
  };

  // if (loading)
  //   return (
  //     <div className="min-h-screen flex justify-center items-center bg-gray-50">
  //       <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
  //     </div>
  //   );
  if (loading) return <div>Loading test...</div>;

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8 font-sans text-gray-900"
      style={{ paddingTop: "100px" }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Fresh <span className="text-green-600">Market</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
          Handpicked organic vegetables delivered fresh to your kitchen.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-8 relative max-w-md mx-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
            style={{ marginLeft: "20px" }}
          />
          <input
            type="text"
            placeholder="Search vegetables..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            value={search}
            style={{ paddingLeft: "50px" }}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* ALL + NAME CHIPS */}
      {allVegetables.length > 0 && (
        <div
          className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10"
          style={{ marginTop: "30px" }}
        >
          <button
            onClick={handleAllClick}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              search === "" && page === 1
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Vegetables
          </button>

          {allVegetables.map((veg) => (
            <button
              key={veg._id}
              onClick={() => handleChipClick(veg.name)}
              className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all"
            >
              {veg.name}
            </button>
          ))}
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedVeg.length > 0 ? (
          displayedVeg.map((veg) => (
            <div
              key={veg._id}
              style={{ borderRadius: "20PX" }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-[380px] group relative"
            >
              {/* Image Container */}
              <div
                className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden cursor-pointer"
                onClick={() => handleDetailsClick(veg._id)}
              >
                <img
                  src={
                    getImageUrl(veg.image) ||
                    "https://via.placeholder.com/400x300?text=VegPack"
                  }
                  alt={veg.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-600 transition-colors line-clamp-1"
                      onClick={() => handleDetailsClick(veg._id)}
                    >
                      {veg.name}
                    </h3>
                    <span className="bg-green-50 text-green-700 text-l font-bold px-2 py-1 rounded-md">
                      {veg.quantity || "1kg"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {veg.description ||
                      "Fresh, organic, and locally sourced produce for your daily needs."}
                  </p>
                </div>

                {/* Footer: Price + View Details + Add */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <p className="text-xl font-bold text-gray-900">
                    Rs.{veg.price}
                  </p>

                  <div className="flex items-center gap-2">
                    {/* View Details button */}
                    <button
                      onClick={() => handleDetailsClick(veg._id)}
                      className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                    >
                      View Details
                    </button>

                    {/* Add to cart icon */}
                    <button
                      onClick={() => handleAddToCart(veg)}
                      className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                      title="Add to cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-3 text-gray-400">
              <Info size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No vegetables found
            </h3>
            <p className="text-gray-500">Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          className="flex justify-center gap-2 mt-12"
          style={{ marginTop: "40px", marginBottom: "30px" }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-bold text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}