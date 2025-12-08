

// // src/pages/card.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { getCart, deleteCartItem } from "../api";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // checkbox selection state (index → true/false)
//   const [selectedItems, setSelectedItems] = useState({});

//   // ---------- Fetch cart ----------
//   useEffect(() => {
//     const fetchCart = async () => {
//       setLoading(true);
//       try {
//         if (isLoggedIn) {
//           // Logged-in user → DB cart
//           const res = await getCart(); // { success, items: [...] }
//           setCartItems(res.items || []);
//         } else {
//           // Guest → localStorage
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

//   // ---------- Selection toggle ----------
//   const handleSelect = (idx) => {
//     setSelectedItems((prev) => ({
//       ...prev,
//       [idx]: !prev[idx],
//     }));
//   };

//   // ---------- Remove item ----------
//   const handleRemove = async (idx) => {
//     const updated = [...cartItems];
//     const removedItem = updated.splice(idx, 1)[0];

//     try {
//       if (isLoggedIn && removedItem?._id) {
//         // Logged-in: delete from DB cart
//         await deleteCartItem(removedItem._id);
//       } else {
//         // Guest: update localStorage cart
//         localStorage.setItem("cart", JSON.stringify(updated));
//       }

//       setCartItems(updated);

//       // remove from selected state if it was checked
//       setSelectedItems((prev) => {
//         const copy = { ...prev };
//         delete copy[idx];
//         return copy;
//       });
//     } catch (err) {
//       console.error("Delete cart item error:", err);
//       alert("Failed to remove item from cart");
//     }
//   };

//   // ---------- Edit (go to product details) ----------
//   const handleEdit = (item) => {
//     if (item.type === "vegetable") navigate(`/vegetable/${item.itemId}`);
//     else if (item.type === "package") navigate(`/package/${item.itemId}`);
//   };

//   // ---------- Subtotal for selected items ----------
//   const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
//     if (!selectedItems[idx]) return sum;

//     const lineTotal =
//       item.totalPrice || item.unitPrice * (item.quantity || 1);

//     return sum + lineTotal;
//   }, 0);

//   // ---------- Checkout ----------
//   const handleCheckout = () => {
//     const itemsToCheckout = cartItems.filter((_, idx) => selectedItems[idx]);
//     if (!itemsToCheckout.length) {
//       alert("Select items first!");
//       return;
//     }

//     // Save selected items for /checkout page
//     localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));

//     navigate("/checkout", { state: { items: itemsToCheckout } });
//   };

//   // ---------- Render ----------
//   if (loading)
//     return <p className="text-center mt-12">Loading cart...</p>;

//   if (!cartItems.length)
//     return (
//       <p className="text-center mt-12 text-gray-600">
//         Your cart is empty.
//       </p>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       <div className="bg-white shadow rounded-lg p-6 space-y-4">
//         {cartItems.map((item, idx) => {
//           // ✅ Qty label logic:
//           let qtyLabel;
//           if (item.type === "vegetable" && item.weightLabel) {
//             // Vegetable with weight
//             if ((item.quantity || 1) > 1) {
//               qtyLabel = `${item.quantity} × ${item.weightLabel}`;
//             } else {
//               qtyLabel = item.weightLabel; // e.g. "500g"
//             }
//           } else {
//             // Package or others → normal numeric
//             qtyLabel = item.quantity || 1;
//           }

//           const lineTotal =
//             item.totalPrice || item.unitPrice * (item.quantity || 1);

//           return (
//             <div
//               key={item._id || idx}
//               className="flex items-center justify-between border-b py-4"
//             >
//               <div className="flex items-center gap-4">
//                 <input
//                   type="checkbox"
//                   checked={!!selectedItems[idx]}
//                   onChange={() => handleSelect(idx)}
//                 />

//                 <img
//                   src={item.image || "https://via.placeholder.com/100"}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded"
//                 />

//                 <div>
//                   <h2 className="font-semibold text-lg">{item.name}</h2>
//                   <p className="text-green-700 font-semibold mt-1">
//                     ₹{item.unitPrice}
//                   </p>
//                   <p className="text-gray-500 text-sm capitalize">
//                     {item.type}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <p className="font-semibold">
//                   Qty: {qtyLabel} | ₹{lineTotal}
//                 </p>

//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleRemove(idx)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}

//         <div className="flex justify-between items-center mt-6">
//           <p className="text-xl font-semibold">
//             Subtotal: ₹{selectedSubtotal}
//           </p>
//           <button
//             onClick={handleCheckout}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


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
//       setSelectedItems((prev) => { const copy = { ...prev }; delete copy[idx]; return copy; });
//     } catch (err) { alert("Failed to remove item"); }
//   };

//   const handleEdit = (item) => {
//     if (item.type === "vegetable") navigate(`/vegetable/${item.itemId}`);
//     else if (item.type === "package") navigate(`/package/${item.itemId}`);
//   };

//   const handleCheckout = () => {
//     const itemsToCheckout = cartItems.filter((_, idx) => selectedItems[idx]);
//     if (!itemsToCheckout.length) { alert("Select items first!"); return; }
//     localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));
//     navigate("/checkout", { state: { items: itemsToCheckout } });
//   };

//   // Calculations
//   const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
//     if (!selectedItems[idx]) return sum;
//     return sum + (item.totalPrice || item.unitPrice * (item.quantity || 1));
//   }, 0);
//   const effectiveDelivery = selectedSubtotal > 0 ? DELIVERY_CHARGE : 0;
//   const totalAmount = selectedSubtotal + effectiveDelivery;

//   if (loading) return <div className="min-h-screen flex items-center justify-center bg-green-300 text-white"  >Loading...</div>;

//   return (
//     <div className=" bg-[#86C18F] flex items-center justify-center py-10 px-4 font-sans" >

//       {/* Main White Card Container */}
//       <div className="  bg-white rounded-lg shadow-2xl overflow-hidden pb-8" style={{marginTop:"120px"}} >

//         {/* Inner Green Container */}
//         <div className="m-4 bg-[#D4EFD6] rounded-lg p-6" style={{width:"1000px",padding:"100px"}}>

//           {/* Header */}
//           <h1 className="text-center text-xl text-gray-800 font-medium mb-2">My Cart</h1>
//           <div className="h-px bg-gray-400 w-full mb-4 opacity-50"></div>

//           {/* Empty State */}
//           {cartItems.length === 0 ? (
//             <p className="text-center text-gray-500 py-10">Cart is empty</p>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item, idx) => {
//                 const isSelected = !!selectedItems[idx];
//                 const qtyLabel = item.weightLabel || (item.quantity > 1 ? `${item.quantity} qty` : "1 qty");
//                 const lineTotal = item.totalPrice || item.unitPrice * (item.quantity || 1);

//                 return (
//                   <div key={idx} className="flex items-center gap-4">
//                     {/* Custom Checkbox */}
//                     <div
//                       onClick={() => handleSelect(idx)}
//                       className="cursor-pointer w-6 h-6 flex items-center justify-center"
//                     >
//                       {isSelected ? <Check size={24} className="text-black stroke-[3]" /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>}
//                     </div>

//                     {/* Item Card */}
//                     <div className=" flex items-start gap-8"  >
//                       {/* Image */}
//                       <img
//                         src={item.image || "https://via.placeholder.com/80"}
//                         alt={item.name}
//                         className=" object-cover rounded-md bg-white shadow-sm" style={{width:"200px"}}
//                       />

//                       {/* Details */}
//                       <div className="" style={{marginTop:"20px",fontSize:"25px"}} >
//                         <p className="text-blue-800 font-medium">{item.name}</p>
//                         <p className="text-gray-700 text-sm">{qtyLabel}</p>
//                         <p className="text-gray-900 font-semibold mt-1">{lineTotal}</p>
//                       </div>

//                       {/* Buttons */}
//                       <div className="flex  " style={{marginTop:"60px",fontSize:"15px"}}>
//                         <button
//                           onClick={() => handleEdit(item)}
//                           className=" text-white  px-3 py-0.5 rounded shadow-sm hover:opacity-80" style={{backgroundColor:"#109999ff"}}
//                         >
//                           edit
//                         </button>
//                         <button
//                           onClick={() => handleRemove(idx)}
//                           className="bg-[#7B7BF0] text-white  px-3 py-0.5 rounded shadow-sm hover:opacity-80 " style={{backgroundColor:"#dd0808ff",marginLeft:"10px"}}
//                         >
//                           delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <div className="h-px bg-gray-400 w-full my-6 opacity-50"></div>

//           {/* Summary Section */}
//           <div className="space-y-3 text-sm text-gray-800 pl-4">
//             <div className="flex items-center">
//               <span className="w-32">Sub total</span>
//               <span className="font-medium">: {selectedSubtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-32">Delivery Charge</span>
//               <span className="font-medium">: {effectiveDelivery.toFixed(2)}</span>
//             </div>
//             <div className="h-px bg-gray-400 w-48 my-1"></div>
//             <div className="flex items-center text-base font-semibold">
//               <span className="w-32">Total amount</span>
//               <span>: {totalAmount.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Checkout Button */}
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={handleCheckout}
//               className="bg-[#469835] text-black px-10 py-2 rounded shadow-md hover:bg-[#3a7c2b] transition-colors font-medium"
//             >
//               Check out
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/card.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getCart, deleteCartItem } from "../api";
import { Check } from "lucide-react";

const DELIVERY_CHARGE = 20;

export default function CartPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({}); // idx -> bool

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const res = await getCart();
          setCartItems(res.items || []);
        } else {
          const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(guestCart);
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn]);

  // Handlers
  const handleSelect = (idx) => {
    setSelectedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleRemove = async (idx) => {
    const updated = [...cartItems];
    const removedItem = updated.splice(idx, 1)[0];
    try {
      if (isLoggedIn && removedItem?._id) await deleteCartItem(removedItem._id);
      else localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
      setSelectedItems((prev) => {
        const copy = { ...prev };
        delete copy[idx];
        return copy;
      });
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handleEdit = (item) => {
    if (item.type === "vegetable") navigate(`/vegetable/${item.itemId}`);
    else if (item.type === "package") navigate(`/package/${item.itemId}`);
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((_, idx) => selectedItems[idx]);
    if (!itemsToCheckout.length) {
      alert("Select items first!");
      return;
    }
    localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));
    navigate("/checkout", { state: { items: itemsToCheckout } });
  };

  // Calculations (selected items மட்டும்)
  const selectedSubtotal = cartItems.reduce((sum, item, idx) => {
    if (!selectedItems[idx]) return sum;
    return sum + (item.totalPrice || item.unitPrice * (item.quantity || 1));
  }, 0);
  const effectiveDelivery = selectedSubtotal > 0 ? DELIVERY_CHARGE : 0;
  const totalAmount = selectedSubtotal + effectiveDelivery;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-300 text-white">
        Loading...
      </div>
    );

  return (
    <div >
      <div className="bg-[#86C18F] flex items-center justify-center py-10 px-4 font-sans" >
        {/* Main White Card Container */}
        <div
          className=" rounded-lg shadow-2xl overflow-hidden pb-8"
          style={{ marginTop: "120px", backgroundColor: "#75ca95ff",marginBottom:"50px"}}
        >
          {/* Inner Green Container */}
          <div
            className="m-4 bg-[#D4EFD6] rounded-lg p-6"
            style={{ width: "900px", paddingTop: "30px", paddingRight: "50px" }}
          >
            {/* Header */}
            <h1 className="text-center  text-white-800 font-medium mb-2" style={{ fontSize: "30px" }}>
              My Cart
            </h1>
            <div className="h-px bg-gray-400 w-full mb-4 opacity-50" />

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Cart is empty</p>
            ) : (
              <div className="space-y-4" >
                {cartItems.map((item, idx) => {
                  const isSelected = !!selectedItems[idx];
                  const qtyLabel =
                    item.weightLabel ||
                    (item.quantity > 1 ? `${item.quantity} qty` : "1 qty");
                  const lineTotal =
                    item.totalPrice || item.unitPrice * (item.quantity || 1);

                  return (
                    <div key={idx} className="flex items-center gap-4">
                      {/* Custom Checkbox */}
                      <div
                        onClick={() => handleSelect(idx)}
                        className="cursor-pointer w-6 h-6 flex items-center justify-center"
                      >
                        {isSelected ? (
                          <Check
                            size={24}
                            className="text-black stroke-[3]"
                          />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
                        )}
                      </div>

                      {/* Item Card */}
                      <div className="flex-1 bg-[#C3F3A1] rounded-2xl p-3 flex items-center gap-4 shadow-md border border-green-200" style={{ backgroundColor: "#f3f8f4ff", borderRadius: "15px" }}>
                        {/* Image */}
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                          className="object-cover rounded-md bg-white shadow-sm"
                          style={{ width: "100px" }}
                        />

                        {/* Content: left text + right actions */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Details */}
                          <div
                            style={{ marginTop: "20px", fontSize: "25px" }}
                          >
                            <p className="text-blue-800 font-medium">
                              {item.name}
                            </p>
                            <p className="text-gray-700 text-sm">{qtyLabel}</p>
                            <p className="text-gray-900 font-semibold mt-1">
                              Rs.{lineTotal}
                            </p>
                          </div>

                          {/* Buttons (same vertical center for all rows) */}
                          <div
                            className="flex gap-2"
                            style={{ fontSize: "15px" }}
                          >
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-white px-3 py-0.5 rounded shadow-sm hover:opacity-80"
                              style={{ backgroundColor: "#46ce63ff" }}
                            >
                              edit
                            </button>
                            <button
                              onClick={() => handleRemove(idx)}
                              className="text-white px-3 py-0.5 rounded shadow-sm hover:opacity-80"
                              style={{ backgroundColor: "#dd0808ff" }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="h-px bg-gray-400 w-full my-6 opacity-50" />

           

            <div
              className="space-y-3 text-xl text-gray-800 pl-4"
              style={{ marginLeft: "100px" }}
            >
              <div className="flex items-center">
                <span className="w-40">Sub total</span>          {/* label column */}
                <span className="w-4 text-center">:</span>       {/* colon column */}
                <span className="font-medium">
                  {selectedSubtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center" >
                <span className="w-40">Delivery Charge</span>
                <span className="w-4 text-center">:</span>
                <span className="font-medium">
                  {effectiveDelivery.toFixed(2)}
                </span>
              </div>

              <div className="h-px bg-black-400 w-48 my-1"  style={{color:"black"}}/>
              <hr style={{width:"250px"}}></hr>

              <div className="flex items-center font-semibold">
                <span className="w-40">Total amount</span>
                <span className="w-4 text-center">:</span>
                <span>{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCheckout}
                className="bg-[#469835] text-black px-10 py-2 rounded shadow-md  transition-colors" style={{fontSize:"30px",backgroundColor:"#b9e455ff",padding:"10px",width:"240px",borderRadius:"10px"}}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}