


// src/pages/PackageDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import {
//   ArrowLeft,
//   ShoppingBag,
//   Minus,
//   Plus,
//   Leaf,
//   Star,
//   ShieldCheck,
//   Truck,
//   ShoppingCart,
// } from "lucide-react";
// import api, { getProductById, addToCart, deleteCartItem } from "../api";
// import { useAuth } from "../AuthContext";

// export default function PackageDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const editCartIndex = location.state?.editCartIndex ?? null;      // guest index
//   const editCartItemId = location.state?.editCartItemId ?? null;    // logged-in cart _id

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

//     const quantityNumber = Number(qty) || 1;
//     if (quantityNumber < 1) return;

//     // Login இல்லாதவங்க → login page
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     setAdding(true);
//     try {
//       const unitPrice = pack.price;

//       const payload = {
//         type: "package",
//         itemId: pack._id,
//         name: pack.name,
//         image: pack.image || "",
//         unitPrice,
//         quantity: quantityNumber,
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

//       const backTo = location.state?.from || "/packages";
//       navigate(backTo);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Failed to add to cart");
//     } finally {
//       setAdding(false);
//     }
//   };

//   if (loading) return <LoadingScreen />;
//   if (!pack) return null;

//   const currentQty = Number(qty) || 1;
//   const totalAmount = (pack.price || 0) * currentQty;

//   return (
//     <div className="min-h-screen bg-[#FDFCF8] font-sans text-slate-800">
//       {/* Background Decor */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[100px]" />
//         <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[80px]" />
//       </div>

//       {/* Navbar */}
//       <nav className="fixed top-0 w-full z-40 px-4 py-4 pointer-events-none">
//         <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white shadow-lg shadow-slate-200/50 text-slate-600 hover:text-green-700 hover:scale-105 transition-all duration-300"
//           >
//             <ArrowLeft size={20} strokeWidth={2.5} />
//           </button>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
//           {/* LEFT: Image */}
//           <div className="relative">
//             <div className="lg:sticky lg:top-28 space-y-6">
//               <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white bg-white">
//                 <img
//                   src={
//                     pack.image ||
//                     "https://placehold.co/600x600?text=Fresh+Package"
//                   }
//                   alt={pack.name}
//                   className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-in-out"
//                 />

//                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
//                   <Star
//                     size={16}
//                     className="text-orange-400 fill-orange-400"
//                   />
//                   <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
//                     Premium Bundle
//                   </span>
//                 </div>
//               </div>

//               <div className="hidden lg:flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
//                 <div className="flex flex-col items-center gap-2">
//                   <Leaf className="text-green-600" />
//                   <span className="text-xs font-semibold">
//                     100% Organic
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center gap-2">
//                   <Truck className="text-blue-600" />
//                   <span className="text-xs font-semibold">
//                     Fast Delivery
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center gap-2">
//                   <ShieldCheck className="text-slate-600" />
//                   <span className="text-xs font-semibold">
//                     Quality Verified
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Details */}
//           <div className="flex flex-col justify-center space-y-10">
//             {/* Header */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 text-green-700 font-bold text-sm tracking-wide uppercase">
//                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                 In Stock & Fresh
//               </div>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
//                 {pack.name}
//               </h1>
//               <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-lg">
//                 {pack.description ||
//                   "A perfectly curated selection of seasonal vegetables, hand-picked from local farms to ensure maximum freshness for your family."}
//               </p>
//             </div>

//             {/* Price Row */}
//             <div className="flex items-baseline gap-4">
//               <span className="text-3xl font-bold text-slate-900">
//                 LKR {pack.price.toLocaleString()}
//               </span>
//               <span className="text-lg text-slate-400 line-through decoration-slate-300">
//                 LKR {(pack.price * 1.2).toLocaleString()}
//               </span>
//               <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
//                 SAVE 20%
//               </span>
//             </div>

//             <hr className="border-slate-100" />

//             {/* What's inside */}
//             <div className="space-y-5">
//               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//                 What's Inside the Box
//                 <span className="bg-slate-100 text-slate-500 text-xs py-1 px-2 rounded-full">
//                   {pack.vegetables?.length || 0} Items
//                 </span>
//               </h3>

//               {/* Qty selector */}
//               <div className="flex items-center bg-slate-100 rounded-full p-1 h-14 shadow-inner">
//                 <button
//                   onClick={() =>
//                     setQty((prev) => Math.max(1, prev - 1))
//                   }
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
//                 >
//                   <Minus size={18} strokeWidth={3} />
//                 </button>
//                 <span className="w-12 text-center font-bold text-lg text-slate-800">
//                   {qty}
//                 </span>
//                 <button
//                   onClick={() => setQty((prev) => prev + 1)}
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
//                 >
//                   <Plus size={18} strokeWidth={3} />
//                 </button>
//               </div>

//               {/* Total */}
//               <div className="hidden sm:flex flex-col">
//                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//                   Total to pay
//                 </span>
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-3xl font-black text-slate-900">
//                     LKR {totalAmount.toLocaleString()}
//                   </span>
//                   <span className="text-sm font-medium text-slate-500">
//                     / {currentQty}{" "}
//                     {currentQty > 1 ? "packs" : "pack"}
//                   </span>
//                 </div>
//               </div>

//               {/* Add to cart */}
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding}
//                 className="flex-1 sm:flex-none h-14 px-8 rounded-full bg-slate-900 hover:bg-green-600 text-white font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-green-600/30 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed" style={{backgroundColor:"green"}}
//               >
//                 {adding ? (
//                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <span>Add to Cart</span>
//                     <ShoppingCart
//                       size={20}
//                       fill="currentColor"
//                       className="hidden sm:block opacity-50"
//                     />
//                   </>
//                 )}
//               </button>

//               {/* Items */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{marginBottom:"20px"}} >
//                 {pack.vegetables?.map((v, idx) => (
//                   <div
//                     key={v._id || idx}
//                     className="group flex items-center gap-3 p-2 pr-4 bg-white  shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300" style={{borderRadius:"15px"}}
//                   >
//                     <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0" >
//                       <img
//                         src={
//                           v.image ||
//                           (v.vegetable && v.vegetable.image) ||
//                           "https://placehold.co/100x100"
//                         }
//                         alt={v.name}
//                         className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform"
                        
//                       />
//                     </div>
//                     <div className="flex-1" style={{borderRadius:"15px"}}>
//                       <p className="font-bold text-slate-800 text-sm">
//                         {v.name}
//                       </p>
//                       <p className="text-xs text-slate-500 font-medium">
//                         Qty: {v.quantity}
//                       </p>
//                     </div>
//                     <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
//                       LKR {v.price}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="h-20 lg:hidden" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function LoadingScreen() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative w-20 h-20">
//           <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
//           <Leaf
//             className="absolute inset-0 m-auto text-green-600 animate-pulse"
//             size={24}
//           />
//         </div>
//         <p className="text-slate-400 font-medium tracking-widest text-sm uppercase">
//           Loading Freshness...
//         </p>
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
  Truck,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../AuthContext";
import { getProductById, addToCart, deleteCartItem } from "../api";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // edit modeல் வந்திருப்போமா?
  const editCartItemId = location.state?.editCartItemId ?? null;

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

    const quantityNumber = Number(qty) || 1;
    if (quantityNumber < 1) return;

    // Login இல்லாதவங்க → login page
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      const unitPrice = pack.price;

      const payload = {
        type: "package",
        itemId: pack._id,
        name: pack.name,
        image: pack.image || "",
        unitPrice,
        quantity: quantityNumber,
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

      const backTo = location.state?.from || "/packages";
      navigate(backTo);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!pack) return null;

  const currentQty = Number(qty) || 1;
  const totalAmount = (pack.price || 0) * currentQty;

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-slate-800">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[80px]" />
      </div>

      {/* Back nav */}
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
          {/* LEFT: Image */}
          <div className="relative">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white bg-white">
                <img
                  src={
                    pack.image ||
                    "https://placehold.co/600x600?text=Fresh+Package"
                  }
                  alt={pack.name}
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                  <Star
                    size={16}
                    className="text-orange-400 fill-orange-400"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Premium Bundle
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center gap-2">
                  <Leaf className="text-green-600" />
                  <span className="text-xs font-semibold">
                    100% Organic
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Truck className="text-blue-600" />
                  <span className="text-xs font-semibold">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="text-slate-600" />
                  <span className="text-xs font-semibold">
                    Quality Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock & Fresh
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {pack.name}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-lg">
                {pack.description ||
                  "A perfectly curated selection of seasonal vegetables, hand-picked from local farms to ensure maximum freshness for your family."}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-bold text-slate-900">
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

            {/* Quantity selector & total */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                How many packs?
              </h3>

              {/* Qty selector */}
              <div className="flex items-center bg-slate-100 rounded-full p-1 h-14 shadow-inner">
                <button
                  onClick={() =>
                    setQty((prev) => Math.max(1, prev - 1))
                  }
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="w-12 text-center font-bold text-lg text-slate-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Total */}
              <div className="hidden sm:flex flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Total to pay
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    LKR {totalAmount.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    / {currentQty} {currentQty > 1 ? "packs" : "pack"}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 sm:flex-none h-14 px-8 rounded-full bg-slate-900 hover:bg-green-600 text-white font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-green-600/30 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                 style={{backgroundColor:"green"}}
             >
                {adding ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <ShoppingCart
                      size={20}
                      fill="currentColor"
                      className="hidden sm:block opacity-50"
                    />
                  </>
                )}
              </button>

              {/* Items inside package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" >
                {pack.vegetables?.map((v, idx) => (
                  <div
                    key={v._id || idx}
                    className="group flex items-center gap-3 p-2 pr-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300" style={{borderRadius:"15px"}}
                  >
                    <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={
                          v.image ||
                          (v.vegetable && v.vegetable.image) ||
                          "https://placehold.co/100x100"
                        }
                        alt={v.name || v.vegetable?.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm">
                        {v.name || v.vegetable?.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Qty: {v.quantity}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      LKR {v.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-20 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
          <Leaf
            className="absolute inset-0 m-auto text-green-600 animate-pulse"
            size={24}
          />
        </div>
        <p className="text-slate-400 font-medium tracking-widest text-sm uppercase">
          Loading Freshness...
        </p>
      </div>
    </div>
  );
}