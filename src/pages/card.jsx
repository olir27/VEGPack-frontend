

// // src/pages/card.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getCart, deleteCartItem } from "../api";
// import { Check } from "lucide-react";

// const DELIVERY_CHARGE = 20;

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({}); // idx -> bool

//   // Fetch cart
//   useEffect(() => {
//     const fetchCart = async () => {
//       setLoading(true);
//       try {
//         if (isLoggedIn) {
//           const res = await getCart();
//           setCartItems(res.items || []);
//         } else {
//           const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//           setCartItems(guestCart);
//         }
//       } catch (err) {
//         console.error("Fetch cart error:", err);
//         setCartItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, [isLoggedIn]);

//   // Handlers
//   const handleSelect = (idx) => {
//     setSelectedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const handleRemove = async (idx) => {
//     const updated = [...cartItems];
//     const removedItem = updated.splice(idx, 1)[0];
//     try {
//       if (isLoggedIn && removedItem?._id) await deleteCartItem(removedItem._id);
//       else localStorage.setItem("cart", JSON.stringify(updated));
//       setCartItems(updated);
//       setSelectedItems((prev) => {
//         const copy = { ...prev };
//         delete copy[idx];
//         return copy;
//       });
//     } catch (err) {
//       alert("Failed to remove item");
//     }
//   };

//   const handleEdit = (item) => {
//     if (item.type === "vegetable") navigate(`/vegetable/${item.itemId}`);
//     else if (item.type === "package") navigate(`/package/${item.itemId}`);
//   };

//   const handleCheckout = () => {
//     const itemsToCheckout = cartItems.filter((_, idx) => selectedItems[idx]);
//     if (!itemsToCheckout.length) {
//       alert("Select items first!");
//       return;
//     }
//     localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));
//     navigate("/checkout", { state: { items: itemsToCheckout } });
//   };

//   // Calculations (selected items மட்டும்)
//   const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
//     if (!selectedItems[idx]) return sum;
//     return sum + (item.totalPrice || item.unitPrice * (item.quantity || 1));
//   }, 0);
//   const effectiveDelivery = selectedSubtotal > 0 ? DELIVERY_CHARGE : 0;
//   const totalAmount = selectedSubtotal + effectiveDelivery;

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-300 text-white">
//         Loading...
//       </div>
//     );

//   return (
//     <div >
//       <div className="bg-[#86C18F] flex items-center justify-center py-10 px-4 font-sans" >
//         {/* Main White Card Container */}
//         <div
//           className=" rounded-lg shadow-2xl overflow-hidden pb-8"
//           style={{ marginTop: "120px", backgroundColor: "#75ca95ff",marginBottom:"50px"}}
//         >
//           {/* Inner Green Container */}
//           <div
//             className="m-4 bg-[#D4EFD6] rounded-lg p-6"
//             style={{ width: "900px", paddingTop: "30px", paddingRight: "50px" }}
//           >
//             {/* Header */}
//             <h1 className="text-center  text-white-800 font-medium mb-2" style={{ fontSize: "30px" }}>
//               My Cart
//             </h1>
//             <div className="h-px bg-gray-400 w-full mb-4 opacity-50" />

//             {/* Empty State */}
//             {cartItems.length === 0 ? (
//               <p className="text-center text-gray-500 py-10">Cart is empty</p>
//             ) : (
//               <div className="space-y-4" >
//                 {cartItems.map((item, idx) => {
//                   const isSelected = !!selectedItems[idx];
//                   const qtyLabel =
//                     item.weightLabel ||
//                     (item.quantity > 1 ? `${item.quantity} qty` : "1 qty");
//                   const lineTotal =
//                     item.totalPrice || item.unitPrice * (item.quantity || 1);

//                   return (
//                     <div key={idx} className="flex items-center gap-4">
//                       {/* Custom Checkbox */}
//                       <div
//                         onClick={() => handleSelect(idx)}
//                         className="cursor-pointer w-6 h-6 flex items-center justify-center"
//                       >
//                         {isSelected ? (
//                           <Check
//                             size={24}
//                             className="text-black stroke-[3]"
//                           />
//                         ) : (
//                           <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
//                         )}
//                       </div>

//                       {/* Item Card */}
//                       <div className="flex-1 bg-[#C3F3A1] rounded-2xl p-3 flex items-center gap-4 shadow-md border border-green-200" style={{ backgroundColor: "#f3f8f4ff", borderRadius: "15px" }}>
//                         {/* Image */}
//                         <img
//                           src={item.image || "https://via.placeholder.com/80"}
//                           alt={item.name}
//                           className="object-cover rounded-md bg-white shadow-sm"
//                           style={{ width: "100px" }}
//                         />

//                         {/* Content: left text + right actions */}
//                         <div className="flex-1 flex items-center justify-between">
//                           {/* Details */}
//                           <div
//                             style={{ marginTop: "20px", fontSize: "25px" }}
//                           >
//                             <p className="text-blue-800 font-medium">
//                               {item.name}
//                             </p>
//                             <p className="text-gray-700 text-sm">{qtyLabel}</p>
//                             <p className="text-gray-900 font-semibold mt-1">
//                               Rs.{lineTotal}
//                             </p>
//                           </div>

//                           {/* Buttons (same vertical center for all rows) */}
//                           <div
//                             className="flex gap-2"
//                             style={{ fontSize: "15px" }}
//                           >
//                             <button
//                               onClick={() => handleEdit(item)}
//                               className="text-white px-3 py-0.5 rounded shadow-sm hover:opacity-80"
//                               style={{ backgroundColor: "#46ce63ff" }}
//                             >
//                               edit
//                             </button>
//                             <button
//                               onClick={() => handleRemove(idx)}
//                               className="text-white px-3 py-0.5 rounded shadow-sm hover:opacity-80"
//                               style={{ backgroundColor: "#dd0808ff" }}
//                             >
//                               delete
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             <div className="h-px bg-gray-400 w-full my-6 opacity-50" />

           

//             <div
//               className="space-y-3 text-xl text-gray-800 pl-4"
//               style={{ marginLeft: "100px" }}
//             >
//               <div className="flex items-center">
//                 <span className="w-40">Sub total</span>          {/* label column */}
//                 <span className="w-4 text-center">:</span>       {/* colon column */}
//                 <span className="font-medium">
//                   {selectedSubtotal.toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex items-center" >
//                 <span className="w-40">Delivery Charge</span>
//                 <span className="w-4 text-center">:</span>
//                 <span className="font-medium">
//                   {effectiveDelivery.toFixed(2)}
//                 </span>
//               </div>

//               <div className="h-px bg-black-400 w-48 my-1"  style={{color:"black"}}/>
//               <hr style={{width:"250px"}}></hr>

//               <div className="flex items-center font-semibold">
//                 <span className="w-40">Total amount</span>
//                 <span className="w-4 text-center">:</span>
//                 <span>{totalAmount.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleCheckout}
//                 className="bg-[#469835] text-black px-10 py-2 rounded shadow-md  transition-colors" style={{fontSize:"30px",backgroundColor:"#b9e455ff",padding:"10px",width:"240px",borderRadius:"10px"}}
//               >
//                 Check Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getCart, deleteCartItem } from "../api";
// import { 
//   Check, 
//   Trash2, 
//   Edit3, 
//   ShoppingBag, 
//   ArrowRight, 
//   Truck,
//   Package
// } from "lucide-react";

// const DELIVERY_CHARGE = 20;

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({});

//   // --- Data Fetching ---
//   useEffect(() => {
//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       if (!isLoggedIn) {
//         navigate("/login");
//         return;
//       }
//       const res = await getCart();
//       setCartItems(res.items || []);
//     } catch (err) {
//       console.error("Fetch cart error:", err);
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchCart();
// }, [isLoggedIn, navigate]);


//   // --- Handlers ---
//   const handleSelect = (idx) => {
//     setSelectedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const handleSelectAll = () => {
//     const allSelected = cartItems.length > 0 && cartItems.every((_, idx) => selectedItems[idx]);
//     if (allSelected) {
//       setSelectedItems({});
//     } else {
//       const newSelection = {};
//       cartItems.forEach((_, idx) => { newSelection[idx] = true; });
//       setSelectedItems(newSelection);
//     }
//   };

//   const handleRemove = async (idx) => {
//     const updated = [...cartItems];
//     const removedItem = updated[idx];
    
//     updated.splice(idx, 1);
//     setCartItems(updated);
//     setSelectedItems((prev) => {
//       const copy = { ...prev };
//       delete copy[idx];
//       return copy;
//     });

//     try {
//       if (isLoggedIn && removedItem?._id) await deleteCartItem(removedItem._id);
//       else localStorage.setItem("cart", JSON.stringify(updated));
//     } catch (err) {
//       alert("Failed to delete.");
//     }
//   };

//   const handleEdit = (item, idx) => {
//   if (item.type === "vegetable") {
//     navigate(`/vegetable/${item.itemId}`, {
//       state: {
//         from: "/cart",
//         editCartIndex: idx,          // guest cart index
//         editCartItemId: item._id || null, // logged-in cart item _id
//       },
//     });
//   } else if (item.type === "package") {
//     navigate(`/package/${item.itemId}`, {
//       state: {
//         from: "/cart",
//         editCartIndex: idx,
//         editCartItemId: item._id || null,
//       },
//     });
//   }
// };

//   const handleCheckout = () => {
//     const itemsToCheckout = cartItems.filter((_, idx) => selectedItems[idx]);
//     if (!itemsToCheckout.length) return;
//     localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));
//     navigate("/checkout", { state: { items: itemsToCheckout } });
//   };

//   // --- Calculations ---
//   const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
//     if (!selectedItems[idx]) return sum;
//     return sum + (item.totalPrice || item.unitPrice * (item.quantity || 1));
//   }, 0);
  
//   const effectiveDelivery = selectedSubtotal > 0 ? DELIVERY_CHARGE : 0;
//   const totalAmount = selectedSubtotal + effectiveDelivery;
//   const selectedCount = Object.values(selectedItems).filter(Boolean).length;
//   const isAllSelected = cartItems.length > 0 && selectedCount === cartItems.length;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
//           <div className="h-4 w-32 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // Main Container with proper spacing to avoid overlap with Navbar
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800 pt-28 pb-12 px-4" style={{marginBottom:"50px"}}>
//       <div className="max-w-7xl mx-auto">
        
//         {/* Page Heading */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-gray-200 pb-4 gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
//             <p className="text-gray-500 mt-1 text-sm">
//               Review your selected items
//             </p>
//           </div>
//           <div className="text-left sm:text-right">
//             <span className="text-2xl font-bold text-gray-900">{cartItems.length}</span>
//             <span className="text-gray-500 ml-1">Items</span>
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           // Empty State
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center">
//             <ShoppingBag className="w-16 h-16 text-green-200 mb-4" />
//             <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
//             <button onClick={() => navigate('/')} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           // --- FLEXBOX LAYOUT (Fixes the overlapping issue) ---
//           <div className="flex flex-col lg:flex-row gap-8 items-start">
            
//             {/* LEFT SIDE: Cart Items (Takes remaining space) */}
//             <div className="flex-1 w-full">
              
//               {/* Select All */}
//               <div className="mb-4">
//                 <button 
//                   onClick={handleSelectAll}
//                   className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
//                 >
//                   <div className={`w-5 h-5 rounded border flex items-center justify-center ${isAllSelected ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
//                     {isAllSelected && <Check size={14} className="text-white stroke-[3]" />}
//                   </div>
//                   Select All
//                 </button>
//               </div>

//               {/* Items List */}
//               <div className="space-y-4" >
//                 {cartItems.map((item, idx) => {
//                   const isSelected = !!selectedItems[idx];
//                   const lineTotal = item.totalPrice || item.unitPrice * (item.quantity || 1);

//                   return (
//                     <div 
//                       key={idx} 
//                       className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
//                         isSelected ? 'border-green-500 ring-1 ring-green-500/20' : 'border-gray-100 hover:border-green-300'
//                       }`}
//                       style={{borderRadius:"15px",marginBottom:"20px"}}
//                     >
//                       <div className="flex items-center gap-4">
//                         {/* Checkbox */}
//                         <div onClick={() => handleSelect(idx)} className="cursor-pointer">
//                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                             isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
//                           }`}>
//                             {isSelected && <Check size={14} className="text-white stroke-[4]" />}
//                           </div>
//                         </div>

//                         {/* Image */}
//                         <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
//                           <img
//                             src={item.image || "https://via.placeholder.com/150"}
//                             alt={item.name}
//                             className="w-full h-full object-cover"
//                             style={{backgroundColor:"gray"}}
//                           />
//                         </div>

//                         {/* Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start">
//                             <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate pr-2">{item.name}</h3>
//                             <span><p className="text-base sm:text-lg font-bold text-gray-900">LKR {lineTotal}</p></span>
//                           </div>
                          
//                           <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                             <Package size={14} /> 
//                             {item.weightLabel || (item.quantity > 1 ? `${item.quantity} qty` : "1 qty")}
//                           </p>

//                           <div className="flex items-center gap-3 mt-3">
//                             <button onClick={() => handleEdit(item, idx)} className="text-xs sm:text-sm font-medium text-gray-500 hover:text-green-600 flex items-center gap-1">
//                               <Edit3 size={14} /> Edit
//                             </button>
//                             <div className="w-px h-3 bg-gray-300"></div>
//                             <button onClick={() => handleRemove(idx)} className="text-xs sm:text-sm font-medium text-red-400 hover:text-red-600 flex items-center gap-1">
//                               <Trash2 size={14} /> Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* RIGHT SIDE: Summary (Fixed Width on Desktop) */}
//             <div className="w-full lg:w-[380px] flex-shrink-0" style={{marginTop:"50px"}}>
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-28" style={{borderRadius:"15px"}}>
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

//                 <div className="space-y-3 text-sm text-gray-600">
//                   <div className="flex justify-between">
//                     <span>Subtotal ({selectedCount} items)</span>
//                     <span className="font-semibold text-gray-900">LKR {selectedSubtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Delivery</span>
//                     <span className="font-semibold text-green-600">
//                        {selectedSubtotal > 0 ? `+ LKR ${DELIVERY_CHARGE}` : 'LKR 0.00'}
//                     </span>
//                   </div>
//                   <div className="border-t border-dashed border-gray-200 my-3"></div>
//                   <div className="flex justify-between items-end">
//                     <span className="font-bold text-lg text-gray-800">Total</span>
//                     <span className="text-2xl font-extrabold text-gray-900">LKR {totalAmount.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   disabled={selectedCount === 0}
//                   className={`w-full mt-6 py-3.5 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all ${
//                     selectedCount > 0 
//                       ? 'bg-gray-900 text-white hover:bg-black shadow-lg hover:-translate-y-1' 
//                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Checkout <ArrowRight size={18} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getCart, deleteCartItem } from "../api";
import {
  Check,
  Trash2,
  Edit3,
  ShoppingBag,
  ArrowRight,
  Package,
} from "lucide-react";
import "./Cart.css";

const DELIVERY_CHARGE = 20;

export default function CartPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }
        const res = await getCart();
        setCartItems(res.items || []);
      } catch (err) {
        console.error("Fetch cart error:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn, navigate]);

  // --- Handlers ---
  const handleSelect = (idx) => {
    setSelectedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectAll = () => {
    const allSelected =
      cartItems.length > 0 &&
      cartItems.every((_, idx) => selectedItems[idx]);
    if (allSelected) {
      setSelectedItems({});
    } else {
      const newSelection = {};
      cartItems.forEach((_, idx) => {
        newSelection[idx] = true;
      });
      setSelectedItems(newSelection);
    }
  };

  const handleRemove = async (idx) => {
    const updated = [...cartItems];
    const removedItem = updated[idx];

    updated.splice(idx, 1);
    setCartItems(updated);
    setSelectedItems((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });

    try {
      if (isLoggedIn && removedItem?._id)
        await deleteCartItem(removedItem._id);
      else localStorage.setItem("cart", JSON.stringify(updated));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleEdit = (item, idx) => {
    if (item.type === "vegetable") {
      navigate(`/vegetable/${item.itemId}`, {
        state: {
          from: "/cart",
          editCartIndex: idx,
          editCartItemId: item._id || null,
        },
      });
    } else if (item.type === "package") {
      navigate(`/package/${item.itemId}`, {
        state: {
          from: "/cart",
          editCartIndex: idx,
          editCartItemId: item._id || null,
        },
      });
    }
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (_, idx) => selectedItems[idx]
    );
    if (!itemsToCheckout.length) return;
    localStorage.setItem(
      "selectedCartItems",
      JSON.stringify(itemsToCheckout)
    );
    navigate("/checkout", { state: { items: itemsToCheckout } });
  };

  // --- Calculations ---
  const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
    if (!selectedItems[idx]) return sum;
    return (
      sum +
      (item.totalPrice || item.unitPrice * (item.quantity || 1))
    );
  }, 0);

  const effectiveDelivery =
    selectedSubtotal > 0 ? DELIVERY_CHARGE : 0;
  const totalAmount = selectedSubtotal + effectiveDelivery;
  const selectedCount = Object.values(selectedItems).filter(
    Boolean
  ).length;
  const isAllSelected =
    cartItems.length > 0 &&
    selectedCount === cartItems.length;

  if (loading) {
    return (
      <div className="cart-page min-h-screen flex items-center justify-center">
        <div className="cart-loading">
          <div className="cart-loading__icon" />
          <div className="cart-loading__line" />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page min-h-screen pt-28 pb-12 px-4 font-sans text-gray-800" style={{paddingTop:"100px"}}>
      <div className="cart-shell max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">
              Review your selected items
            </p>
          </div>
          <div className="cart-count">
            <span>{cartItems.length}</span>
            <span>Items</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag className="cart-empty__icon" />
            <h2 className="cart-empty__title">
              Your cart is empty
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cart-empty__btn"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* LEFT: Items (narrower) */}
            <div className="cart-items">
              {/* Select All */}
              <div className="cart-select-all">
                <button
                  onClick={handleSelectAll}
                  className="cart-select-all__btn"
                >
                  <div
                    className={`cart-checkbox ${
                      isAllSelected
                        ? "cart-checkbox--checked"
                        : ""
                    }`}
                  >
                    {isAllSelected && (
                      <Check
                        size={14}
                        className="cart-checkbox__icon"
                      />
                    )}
                  </div>
                  <span>Select All</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item, idx) => {
                  const isSelected = !!selectedItems[idx];
                  const lineTotal =
                    item.totalPrice ||
                    item.unitPrice * (item.quantity || 1);

                  return (
                    <div
                      key={idx}
                      className={`cart-item ${
                        isSelected
                          ? "cart-item--selected"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Checkbox */}
                        <div
                          onClick={() => handleSelect(idx)}
                          className="cursor-pointer"
                        >
                          <div
                            className={`cart-checkbox cart-checkbox--round ${
                              isSelected
                                ? "cart-checkbox--checked"
                                : ""
                            }`}
                          >
                            {isSelected && (
                              <Check
                                size={14}
                                className="cart-checkbox__icon"
                              />
                            )}
                          </div>
                        </div>

                        {/* Image */}
                        <div className="cart-item__image-wrap">
                          <img
                            src={
                              item.image ||
                              "https://via.placeholder.com/150"
                            }
                            alt={item.name}
                            className="cart-item__image"
                          />
                        </div>

                        {/* Details */}
                        <div className="cart-item__body">
                          <div className="flex justify-between items-start">
                            <h3 className="cart-item__title">
                              {item.name}
                            </h3>
                            <p className="cart-item__amount">
                              LKR {lineTotal}
                            </p>
                          </div>

                          <p className="cart-item__meta">
                            <Package size={14} />{" "}
                            {item.weightLabel ||
                              (item.quantity > 1
                                ? `${item.quantity} qty`
                                : "1 qty")}
                          </p>

                          <div className="cart-item__actions">
                            <button
                              onClick={() =>
                                handleEdit(item, idx)
                              }
                              className="cart-item__action cart-item__action--edit"
                            >
                              <Edit3 size={14} /> Edit
                            </button>
                            <div className="cart-item__divider" />
                            <button
                              onClick={() =>
                                handleRemove(idx)
                              }
                              className="cart-item__action cart-item__action--remove"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Summary (wider) */}
            <div className="cart-summary-wrapper">
              <div className="cart-summary">
                <h2 className="cart-summary__title">
                  Order Summary
                </h2>

                <div className="cart-summary__rows">
                  <div className="cart-summary__row">
                    <span>
                      Subtotal ({selectedCount} items)
                    </span>
                    <span className="cart-summary__value">
                      LKR {selectedSubtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery</span>
                    <span className="cart-summary__delivery">
                      {selectedSubtotal > 0
                        ? `+ LKR ${DELIVERY_CHARGE}`
                        : "LKR 0.00"}
                    </span>
                  </div>
                  <div className="cart-summary__divider" />
                  <div className="cart-summary__row cart-summary__row--total">
                    <span>Total</span>
                    <span className="cart-summary__total">
                      LKR {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={selectedCount === 0}
                  className={`cart-summary__btn ${
                    selectedCount === 0
                      ? "cart-summary__btn--disabled"
                      : ""
                  }`}
                >
                  Checkout <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}