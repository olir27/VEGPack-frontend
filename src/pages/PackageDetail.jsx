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


// src/pages/PackageDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api, { getProductById } from "../api";
import { useAuth } from "../AuthContext";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, token } = useAuth();

  const [pack, setPack] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

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

  const handleAddToCart = async () => {
    if (!pack) return;

    setAdding(true);
    try {
      const payload = {
        type: "package",
        itemId: pack._id,
        name: pack.name,
        image: pack.image, // இருந்தாலும் use பண்ணமாட்டோம், cart க்கு மட்டும் இருக்கலாம்
        unitPrice: pack.price,
        quantity: Number(qty) || 1,
        vegetables: pack.vegetables?.map((v) => v._id) || [],
      };

      if (!isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart (guest)");
      } else {
        await api.post("/cart/add", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Added to cart");
      }

      const backTo = location.state?.from || "/packages";
      navigate(backTo);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Add to cart failed");
    } finally {
      setAdding(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-700">Loading package...</p>;
  if (!pack) return null;

  const itemsTotal = (pack.vegetables || []).reduce(
    (sum, v) => sum + (v.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-green-200 pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 🔷 Top: Text only (no package image) */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {pack.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-700">
              {pack.description ||
                "Healthy curated package of fresh vegetables for your family."}
            </p>

            {/* Prices */}
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">
                  Package Total Price:{" "}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold shadow">
                  ₹{pack.price}
                </span>
              </p>
              {!!itemsTotal && (
                <p className="text-xs text-gray-500">
                  (Sum of individual items: ₹{itemsTotal})
                </p>
              )}
            </div>

            {/* Quantity select */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm font-medium text-gray-800">
                Package Quantity
              </label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-24 border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
              >
                {adding ? "Adding..." : "Add Package to Cart"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* 🔷 Included vegetables list (with images) */}
        <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-3">
            Vegetables in this Package
          </h2>
          {pack.vegetables && pack.vegetables.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pack.vegetables.map((v) => (
                <div
                  key={v._id}
                  className="flex gap-3 bg-green-50 rounded-xl p-3 border border-green-100"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={v.image || "/products/default.png"}
                      alt={v.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs sm:text-sm">
                    <p className="font-semibold text-gray-900 line-clamp-1">
                      {v.name}
                    </p>
                    <p className="text-gray-600">
                      Qty: {v.quantity || "1kg"}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      ₹{v.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              No vegetables listed in this package.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// // src/pages/PackagesPage.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ShoppingCart, Check, Loader2 } from "lucide-react";

// export default function PackagesPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Popup State
//   const [selectedPack, setSelectedPack] = useState(null);
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await api.get("/products");
//         if (res.success) {
//           const packageList = res.products.filter((p) => p.type === "package");
//           setPackages(packageList);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const handleAddToCart = async (pack) => {
//     if (!isLoggedIn) {
//         navigate("/register");
//         return;
//     }
    
//     setAdding(true);
//     try {
//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image || "",
//         unitPrice: pack.price,
//         quantity: 1,
//         vegetables: pack.vegetables || [],
//         totalPrice: pack.price,
//       };

//       const res = await api.post("/cart", payload);
//       if (res.success) {
//           alert("Added to cart!");
//           setSelectedPack(null); // Close popup after adding
//       } else {
//           alert("Failed to add");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error adding to cart");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex justify-center items-center bg-green-50">
//         <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 font-sans">
//       <h1 className="text-4xl font-black text-center text-slate-900 mb-12 tracking-tight">
//         Curated <span className="text-green-600">Packages</span>
//       </h1>

//       {/* PACKAGE GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {packages.map((pack) => (
//           <motion.div 
//             key={pack._id}
//             whileHover={{ y: -5 }}
//             className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
//             onClick={() => setSelectedPack(pack)} // OPEN POPUP
//           >
//             <div className="h-48 bg-green-50 rounded-2xl mb-4 overflow-hidden relative">
//                 <img 
//                     src={pack.image || "/products/package.png"} 
//                     alt={pack.name}
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm">
//                     ₹{pack.price}
//                 </div>
//             </div>
//             <div className="px-2 pb-2">
//                 <h3 className="text-xl font-bold text-slate-900">{pack.name}</h3>
//                 <p className="text-slate-500 text-sm mt-1 line-clamp-2">{pack.description || "A healthy mix of fresh vegetables."}</p>
//                 <button className="mt-4 w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition-all">
//                     View Details
//                 </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= POPUP MODAL ================= */}
//       <AnimatePresence>
//         {selectedPack && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
//             onClick={() => setSelectedPack(null)} // Close on background click
//           >
//             <motion.div 
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row"
//                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//             >
//                 {/* Close Button */}
//                 <button 
//                     onClick={() => setSelectedPack(null)}
//                     className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-slate-100 z-20 transition"
//                 >
//                     <X size={20} className="text-slate-600" />
//                 </button>

//                 {/* LEFT: Image */}
//                 <div className="w-full md:w-1/2 h-64 md:h-auto bg-green-50 relative">
//                     <img 
//                         src={selectedPack.image || "/products/package.png"} 
//                         alt={selectedPack.name}
//                         className="w-full h-full object-cover"
//                     />
//                 </div>

//                 {/* RIGHT: Content */}
//                 <div className="w-full md:w-1/2 p-8 flex flex-col">
//                     <span className="text-green-600 text-xs font-bold uppercase tracking-wider mb-2">Package Deal</span>
//                     <h2 className="text-3xl font-black text-slate-900 mb-2">{selectedPack.name}</h2>
//                     <p className="text-3xl font-bold text-green-700 mb-4">₹{selectedPack.price}</p>
                    
//                     <p className="text-slate-500 text-sm leading-relaxed mb-6">
//                         {selectedPack.description || "This package contains a selection of fresh, organic vegetables suitable for a family for one week."}
//                     </p>

//                     {/* Includes List (Mock or Real) */}
//                     <div className="mb-6">
//                         <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Includes:</h4>
//                         <div className="flex flex-wrap gap-2">
//                             {selectedPack.vegetables?.length > 0 ? (
//                                 selectedPack.vegetables.map((v, i) => (
//                                     <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
//                                         <Check size={10} /> {v.name || "Veggie"}
//                                     </span>
//                                 ))
//                             ) : (
//                                 <span className="text-slate-400 text-xs italic">Assorted Vegetables</span>
//                             )}
//                         </div>
//                     </div>

//                     {/* Action Button */}
//                     <button 
//                         onClick={() => handleAddToCart(selectedPack)}
//                         disabled={adding}
//                         className="mt-auto w-full bg-slate-900 text-white py-4 rounded-2xl text-sm font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70"
//                     >
//                         {adding ? <Loader2 className="animate-spin" size={18}/> : <ShoppingCart size={18} />}
//                         {adding ? "Adding..." : "Add to Cart"}
//                     </button>
//                 </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }