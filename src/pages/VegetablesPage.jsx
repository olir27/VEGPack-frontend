

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


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, Info } from "lucide-react";
// import { useAuth } from "../AuthContext";
// import { getProducts, addToCart } from "../api";

// // Image helper
// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http") || path.startsWith("data:image")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const limit = 20;
//   const [totalPages, setTotalPages] = useState(1);

//   /* ------------------ Debounce Search ------------------ */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//       setPage(1);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [search]);

//   /* ------------------ Fetch Vegetables ------------------ */
//   useEffect(() => {
//     const fetchVegetables = async () => {
//       try {
//         setLoading(true);

//         const res = await getProducts(page, limit, {
//           type: "vegetable",
//           search: debouncedSearch,
//         });

//         if (res?.success) {
//           setVegetables(res.products || []);
//           setTotalPages(res.totalPages || 1);
//         } else {
//           setVegetables([]);
//         }
//       } catch (err) {
//         console.error("Fetch vegetables error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVegetables();
//   }, [page, debouncedSearch]);

//      // Filter logic
//   const lowerSearch = search.toLowerCase();
//   const filteredList = lowerSearch
//     ? vegetables.filter((veg) =>
//         veg.name.toLowerCase().includes(lowerSearch)
//       )
//     :vegetables;


//   /* ------------------ Handlers ------------------ */
//   const handleDetailsClick = (id) => {
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//   const handleAddToCart = async (veg) => {
//     const payload = {
//       type: "vegetable",
//       itemId: veg._id,
//       name: veg.name,
//       unitPrice: veg.price,
//       quantity: 1,
//       image: veg.image,
//       weightLabel: veg.quantity || "1kg",
//     };

//     try {
//       if (!isLoggedIn) {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         cart.push(payload);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Added to cart");
//       } else {
//         await addToCart(payload);
//         alert("Added to cart");
//       }
//     } catch (err) {
//       console.error(err);
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


//   /* ------------------ UI ------------------ */
//   return (
//     <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8" style={{paddingTop:"100px"}}>
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto text-center mb-10">
//         <h2 className="text-4xl font-extrabold mb-3">
//           Fresh <span className="text-green-600">Market</span>
//         </h2>
//         <p className="text-gray-500">
//           Handpicked organic vegetables delivered fresh to your kitchen
//         </p>

//         {/* SEARCH */}
//         <div className="mt-8 relative max-w-md mx-auto">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search vegetables..."
//             className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>



//       {/* ALL + NAME CHIPS */}
//       {vegetables.length > 0 && (
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

//           {vegetables.map((veg) => (
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

//       {/* LOADING */}
//       {loading && (
//         <div className="text-center py-20 text-gray-500">
//           Loading vegetables...
//         </div>
//       )}

//       {/* EMPTY */}
//       {!loading && vegetables.length === 0 && (
//         <div className="text-center py-20">
//           <Info size={40} className="mx-auto text-gray-400 mb-3" />
//           <h3 className="font-bold text-lg">No vegetables found</h3>
//           <p className="text-gray-500">Try another search</p>
//         </div>
//       )}

//       {/* GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {vegetables.map((veg) => (
//           <div
//             key={veg._id}
//             className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all flex flex-col h-[380px]"
//              style={{borderRadius:"15px"}}
//           >
//             {/* IMAGE */}
//             <div
//               className="h-48 bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
//               onClick={() => handleDetailsClick(veg._id)}
//             >
//               <img
//                 loading="lazy"
//                 src={
//                   getImageUrl(veg.image) ||
//                   "https://via.placeholder.com/400x300?text=VegPack"
//                 }
//                 alt={veg.name}
//                 className="w-full h-full object-cover hover:scale-110 transition-transform"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="flex-1 flex flex-col justify-between mt-3">
//               <div>
//                 <div className="flex justify-between mb-1">
//                   <h3
//                     className="font-bold cursor-pointer hover:text-green-600"
//                     onClick={() => handleDetailsClick(veg._id)}
//                   >
//                     {veg.name}
//                   </h3>
//                   <span className="text-sm bg-green-50 text-green-700 px-2 rounded">
//                     {veg.quantity || "1kg"}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-500 line-clamp-2">
//                   {veg.description || "Fresh and organic vegetables"}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mt-4 pt-3 border-t">
//                 <p className="font-bold text-lg">Rs.{veg.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(veg)}
//                   className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-green-600"
//                 >
//                   <ShoppingCart size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-4 mt-12">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => p - 1)}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <span className="px-4 py-2 font-bold">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => p + 1)}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, Info } from "lucide-react";
// import { useAuth } from "../AuthContext";
// import { getProducts, addToCart } from "../api";

// /* ------------------ Image helper ------------------ */
// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http") || path.startsWith("data:image")) return path;
//   return "/" + path.replace(/^\/+/, "");
// };

// export default function VegetablesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [vegetables, setVegetables] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const limit = 20;
//   const [totalPages, setTotalPages] = useState(1);

//   /* ------------------ Fetch Vegetables ------------------ */
//   useEffect(() => {
//     const fetchVegetables = async () => {
//       try {
//         setLoading(true);

//         const res = await getProducts(page, limit, {
//           type: "vegetable", // ✅ backend filter
//         });

//         if (res?.success) {
//           // ✅ frontend safety filter (IMPORTANT)
//           const onlyVegetables = (res.products || []).filter(
//             (p) => p.type === "vegetable"
//           );

//           setVegetables(onlyVegetables);
//           setTotalPages(res.totalPages || 1);
//         } else {
//           setVegetables([]);
//         }
//       } catch (err) {
//         console.error("Fetch vegetables error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVegetables();
//   }, [page]);

//   /* ------------------ SEARCH FILTER ------------------ */
//   const filteredVegetables = useMemo(() => {
//     if (!search) return vegetables;

//     return vegetables.filter((veg) =>
//       veg.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [vegetables, search]);

//   /* ------------------ UNIQUE NAME CHIPS ------------------ */
//   const nameChips = useMemo(() => {
//     return [...new Set(vegetables.map((v) => v.name))];
//   }, [vegetables]);

//   /* ------------------ Handlers ------------------ */
//   const handleDetailsClick = (id) => {
//     navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
//   };

//  const handleAddToCart = async (veg) => {
//   const payload = { ... };

//   try {
//     if (!isLoggedIn) {
//       navigate("/login");               // 🔴 redirect
//       return;
//     }

//     await addToCart(payload);
//     alert("Added to cart");
//   } catch (err) {
//     alert("Add to cart failed");
//   }
// };

//   const handleAllClick = () => {
//     setSearch("");
//     setPage(1);
//   };

//   const handleChipClick = (name) => {
//     setSearch(name);
//     setPage(1);
//   };

//   /* ------------------ UI ------------------ */
//   return (
//     <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8" style={{paddingTop:"100px"}}>
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto text-center mb-10">
//         <h2 className="text-4xl font-extrabold mb-3">
//           Fresh <span className="text-green-600">Market</span>
//         </h2>
//         <p className="text-gray-500">
//           Handpicked organic vegetables delivered fresh
//         </p>

//         {/* SEARCH */}
//         <div className="mt-8 relative max-w-md mx-auto">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{marginLeft:"30px"}}/>
//           <input
//             type="text"
//             placeholder="Search vegetables..."
//             className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-green-500"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{paddingLeft:"60px"}}
//           />
//         </div>
//       </div>

//       {/* NAME CHIPS */}
//       {nameChips.length > 0 && (
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10">
//           <button
//             onClick={handleAllClick}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//               search === ""
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//             }`}
//           >
//             All Vegetables
//           </button>

//           {nameChips.map((name) => (
//             <button
//               key={name}
//               onClick={() => handleChipClick(name)}
//               className={`px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all ${
//                 search === name
//                   ? "bg-green-600 text-white"
//                   : "bg-white hover:border-green-500"
//               }`}
//             >
//               {name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* LOADING */}
//       {loading && <div className="text-center py-20">Loading...</div>}

//       {/* EMPTY */}
//       {!loading && filteredVegetables.length === 0 && (
//         <div className="text-center py-20">
//           <Info className="mx-auto mb-2 text-gray-400" size={40} />
//           <p>No vegetables found</p>
//         </div>
//       )}

//       {/* GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredVegetables.map((veg) => (
//           <div key={veg._id} className="bg-white  p-4 shadow" style={{borderRadius:"20px"}}>
//             <div
//               className="h-48 bg-gray-100 rounded overflow-hidden cursor-pointer"
//               onClick={() => handleDetailsClick(veg._id)}
//             >
//               <img
//                 src={
//                   getImageUrl(veg.image) ||
//                   "https://via.placeholder.com/300"
//                 }
//                 alt={veg.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//               <div className="flex">
//             <h3 className="font-bold mt-2">{veg.name}</h3>
//             <p className="bg-green-50 text-green-700 text-l font-bold px-2 py-1 rounded-md"  style={{marginLeft:"150px"}}>
//               {veg.quantity || "1kg"}
//             </p>
//             </div>
//              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
//                     {veg.description ||
//                       "Fresh, organic"}
//              </p>
//             <div className="flex justify-between items-center mt-3">
//               <p className="text-xl font-bold text-gray-900">LKR {veg.price}</p>
              

//               <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleDetailsClick(veg._id)}
//                       className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
//                     >
//                       View Details
//                     </button>

//                     <button
//                       onClick={() => handleAddToCart(veg)}
//                       className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
//                       title="Add to cart"
//                     >
//                       <ShoppingCart size={18} />
//                     </button>
//                   </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-4 " style={{marginTop:"15px",marginBottom:"10px"}}>
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 border rounded"
//           >
//             Previous
//           </button>

//           <span className="font-bold">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 border rounded"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/VegetablesPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Info } from "lucide-react";
import { useAuth } from "../AuthContext";
import { getProducts, addToCart } from "../api";

/* ------------------ Image helper ------------------ */
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("data:image")) return path;
  return "/" + path.replace(/^\/+/, "");
};

export default function VegetablesPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [vegetables, setVegetables] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 20;
  const [totalPages, setTotalPages] = useState(1);

  /* ------------------ Fetch Vegetables ------------------ */
  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        setLoading(true);

        // type filter backendக்கு pass பண்ணுறது
        const res = await getProducts(page, limit, { type: "vegetable" });

        if (res?.success) {
          const onlyVegetables = (res.products || []).filter(
            (p) => p.type === "vegetable"
          );
          setVegetables(onlyVegetables);
          setTotalPages(res.totalPages || 1);
        } else {
          setVegetables([]);
        }
      } catch (err) {
        console.error("Fetch vegetables error:", err);
        setVegetables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVegetables();
  }, [page]);

  /* ------------------ SEARCH FILTER ------------------ */
  const filteredVegetables = useMemo(() => {
    if (!search) return vegetables;

    return vegetables.filter((veg) =>
      veg.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [vegetables, search]);

  /* ------------------ UNIQUE NAME CHIPS ------------------ */
  const nameChips = useMemo(() => {
    return [...new Set(vegetables.map((v) => v.name))];
  }, [vegetables]);

  /* ------------------ Handlers ------------------ */
  const handleDetailsClick = (id) => {
    navigate(`/vegetable/${id}`, { state: { from: "/vegetables" } });
  };

  const handleAddToCart = async (veg) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const payload = {
      type: "vegetable",
      itemId: veg._id,
      name: veg.name,
      unitPrice: veg.price,
      quantity: 1,
      image: veg.image,
      weightLabel: veg.quantity || "1kg",
    };

    try {
      await addToCart(payload);
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
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

  /* ------------------ UI ------------------ */
  return (
    <div
      className="min-h-screen bg-[#F3F4F6] pt-28 pb-20 px-4 md:px-8"
      style={{ paddingTop: "100px" }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-3">
          Fresh <span className="text-green-600">Market</span>
        </h2>
        <p className="text-gray-500">
          Handpicked organic vegetables delivered fresh
        </p>

        {/* SEARCH */}
        <div className="mt-8 relative max-w-md mx-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            style={{ marginLeft: "30px" }}
          />
          <input
            type="text"
            placeholder="Search vegetables..."
            className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "60px" }}
          />
        </div>
      </div>

      {/* NAME CHIPS */}
      {nameChips.length > 0 && (
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={handleAllClick}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              search === ""
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Vegetables
          </button>

          {nameChips.map((name) => (
            <button
              key={name}
              onClick={() => handleChipClick(name)}
              className={`px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all ${
                search === name
                  ? "bg-green-600 text-white"
                  : "bg-white hover:border-green-500"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredVegetables.length === 0 && (
        <div className="text-center py-20">
          <Info className="mx-auto mb-2 text-gray-400" size={40} />
          <p>No vegetables found</p>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
        {filteredVegetables.map((veg) => {
          const qtyLabel = veg.quantity || "1kg";
          return (
            <div
              key={veg._id}
              className="bg-white p-4 shadow rounded-2xl flex flex-col"
              style={{borderRadius:"25px"}}
            >
              <div
                className="h-48 bg-gray-100 rounded overflow-hidden cursor-pointer"
                onClick={() => handleDetailsClick(veg._id)}
              >
                <img
                  src={
                    getImageUrl(veg.image) ||
                    "https://via.placeholder.com/300"
                  }
                  alt={veg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex mt-2 items-center">
                <h3 className="font-bold">{veg.name}</h3>
                <p
                  className="bg-green-50 text-green-700 text-sm font-bold px-2 py-1 rounded-md ml-auto"
                >
                  {qtyLabel}
                </p>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {veg.description || "Fresh, organic"}
              </p>
              <div className="flex justify-between items-center mt-auto pt-2">
                <p className="text-xl font-bold text-gray-900">
                  LKR {veg.price}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDetailsClick(veg._id)}
                    className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                  >
                    View Details
                  </button>

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
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          className="flex justify-center gap-4"
          style={{ marginTop: "15px", marginBottom: "10px" }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}