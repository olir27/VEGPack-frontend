

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
// import { getProductById, addToCart, deleteCartItem } from "../api";
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

//   const editCartIndex = location.state?.editCartIndex ?? null;
//   const editCartItemId = location.state?.editCartItemId ?? null;

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

//  const handleAddToCart = async () => {
//     if (!veg) return;

//     const finalQuantity = isCustom ? customQty : selectedWeight;
//     if (isCustom && !customQty.trim()) {
//       alert("Please enter a quantity!");
//       return;
//     }

//     // Login இல்லாதவங்க → login page
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     setAdding(true);

//     try {
//       // 1 unit = user select பண்ணிய weight (250g / 500g / 1kg / custom)
//       const unitPrice = calculatedPrice;

//       const payload = {
//         type: "vegetable",
//         itemId: veg._id,
//         name: veg.name,
//         image: veg.image,
//         unitPrice,           // இந்த weight கு price
//         quantity: 1,         // 1 unit = finalQuantity
//         weightLabel: finalQuantity,
//       };

//       // edit mode அப்படின்னா பழைய cart row (_id) delete பண்ணி புதியதை add பண்ணுவோம்
//       if (editCartItemId) {
//         try {
//           await deleteCartItem(editCartItemId); // /cart/remove/:id
//         } catch (e) {
//           console.error("Failed to delete old cart item:", e);
//         }
//       }

//       await addToCart(payload);
//       alert(editCartItemId ? "Cart updated" : "Added to cart");

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
//                         <span className="text-4xl font-black text-green-700">LKR {calculatedPrice}</span>
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


// src/pages/VegetablesDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getProductById, addToCart, deleteCartItem } from "../api";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Loader2,
  Edit3,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Leaf,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("data:image")) return path;
  return "/" + path.replace(/^\/+/, "");
};

export default function VegetableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // cart‑லிருந்து edit modeல வந்திருக்கோமா?
  const editCartItemId = location.state?.editCartItemId ?? null;

  const [veg, setVeg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const defaultOptions = ["250g", "500g", "1kg"];
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [isCustom, setIsCustom] = useState(false);
  const [customQty, setCustomQty] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Product load
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (data?.success && data.product) {
          setVeg(data.product);
          // default: product price
          setCalculatedPrice(data.product.price);
          if (data.product.quantity) {
            setSelectedWeight(data.product.quantity);
          }
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

  // Price calculation whenever weight/custom change
  useEffect(() => {
    if (!veg) return;

    // price/weight normalization – veg.price என்பது veg.quantityக்காக
    let pricePerKg = veg.price; // fallback

    if (veg.quantity === "500g") pricePerKg = veg.price * 2; // 0.5kg -> x2
    if (veg.quantity === "250g") pricePerKg = veg.price * 4; // 0.25kg -> x4
    if (veg.quantity === "1kg") pricePerKg = veg.price;

    let multiplier = 1;

    if (isCustom) {
      const txt = customQty.trim().toLowerCase();
      const num = parseFloat(txt);
      if (!Number.isNaN(num)) {
        if (txt.includes("g") && !txt.includes("kg")) {
          multiplier = num / 1000; // grams to kg
        } else {
          multiplier = num; // kg number, e.g. "2", "2kg"
        }
      }
    } else {
      if (selectedWeight === "250g") multiplier = 0.25;
      if (selectedWeight === "500g") multiplier = 0.5;
      if (selectedWeight === "1kg") multiplier = 1;
      if (selectedWeight === "2kg") multiplier = 2;
    }

    const finalPrice = Math.round(pricePerKg * multiplier);
    setCalculatedPrice(finalPrice);
  }, [selectedWeight, isCustom, customQty, veg]);

  const handleAddToCart = async () => {
    if (!veg) return;

    const finalQuantity = isCustom ? customQty : selectedWeight;
    if (isCustom && !customQty.trim()) {
      alert("Please enter a quantity!");
      return;
    }

    // Login இல்லாதவங்க → login page
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setAdding(true);

    try {
      // 1 unit = user select பண்ணிய weight (250g / 500g / 1kg / custom)
      const unitPrice = calculatedPrice;

      const payload = {
        type: "vegetable",
        itemId: veg._id,
        name: veg.name,
        image: veg.image,
        unitPrice,           // இந்த weight கு price
        quantity: 1,         // 1 unit = finalQuantity
        weightLabel: finalQuantity,
      };

      // edit mode அப்படின்னா பழைய cart row (_id) delete பண்ணி புதியதை add பண்ணுவோம்
      if (editCartItemId) {
        try {
          await deleteCartItem(editCartItemId); // /cart/remove/:id
        } catch (e) {
          console.error("Failed to delete old cart item:", e);
        }
      }

      await addToCart(payload);
      alert(editCartItemId ? "Cart updated" : "Added to cart");

      navigate(location.state?.from || "/vegetables");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Add to cart failed");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-green-700 animate-spin mb-3" />
        <p className="text-gray-500 font-medium">Loading product...</p>
      </div>
    );
  }

  if (!veg) return null;

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] py-24 px-4 md:px-8 font-sans text-slate-900 flex justify-center"
      style={{ marginLeft: "100px", marginRight: "100px" }}
    >
      <div className="max-w-6xl w-full">
        {/* Back button */}
        <button
          onClick={() => navigate(location.state?.from || "/vegetables")}
          className="flex items-center text-slate-500 hover:text-green-700 transition-colors mb-6 text-sm font-semibold"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Market
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden min-h-[600px] p-6 gap-8 flex">
          {/* LEFT: Image */}
          <div
            className="flex items-center justify-center h-full"
            style={{ width: "500px", height: "500px", marginLeft: "20px", marginTop: "20px" }}
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

              <div className="absolute top-2 left-6">
                <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-green-800 uppercase tracking-wider border border-green-100 shadow-sm">
                  100% Organic
                </span>
              </div>

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
                  <span className="text-xs font-bold text-yellow-700">4.9</span>
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
                  LKR {calculatedPrice}
                </span>
                <span className="text-slate-400 font-medium mb-2 text-sm">
                  / {isCustom ? customQty || "custom" : selectedWeight}
                </span>
              </div>
            </div>

            {/* Quantity selection */}
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

              {/* Custom input */}
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
                        placeholder="Enter weight (e.g. 2.5kg or 500g)"
                        value={customQty}
                        onChange={(e) => setCustomQty(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-green-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-0 focus:border-green-600 outline-none bg-white transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add to Cart Button */}
            <div
              className="flex gap-4 items-center"
              style={{ width: "200px", marginLeft: "420px" }}
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
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-700">
                  <Leaf size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Farm Fresh
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Delivered within 24 hours of harvest
                  </p>
                </div>
              </div>
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