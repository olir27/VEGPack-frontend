// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) navigate("/login");

//     // If user came from cart → clear saved address
//     if (location.state?.fromCart) {
//       localStorage.removeItem("deliveryAddress");
//     }

//     // Load saved address (if exists)
//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);

//     const ids = JSON.parse(localStorage.getItem("checkoutItemIds") || "[]");

//     (async () => {
//       try {
//         const res = await api.get("/cart");
//         const found = res.data.items.filter(it => ids.includes(it._id));
//         setItems(found);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   const subtotal = items.reduce((s, it) => s + Number(it.totalPrice), 0);
//   const total = subtotal + DELIVERY_CHARGE;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-4">Checkout</h2>

//       <div className="bg-white p-4 rounded shadow">

//         <label className="font-semibold">Delivery Address</label>

//         <div
//           className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer"
//           onClick={() => navigate("/customer-details")}
//         >
//           {address ? address : "Click to add delivery address"}
//         </div>

//         {/* Items */}
//         <div className="mt-4">
//           <h3 className="font-semibold">Items</h3>

//           <div className="mt-2 space-y-3">
//             {items.map(it => (
//               <div key={it._id} className="flex items-center gap-3">
//                 <img src={it.image} className="w-20 h-16 object-cover rounded" />
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">₹{it.totalPrice}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Total */}
//         <div className="mt-4 border-t pt-3">
//           <div className="flex justify-between">
//             Subtotal: <span>₹{subtotal.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between">
//             Delivery: <span>₹{DELIVERY_CHARGE}</span>
//           </div>

//           <div className="flex justify-between font-bold mt-2">
//             Total: <span>₹{total.toFixed(2)}</span>
//           </div>

//           <div className="mt-4 flex gap-3">
//                <button
//   onClick={() => navigate("/payment", { state: { address, total } })}
//   className="bg-green-600 text-white px-5 py-2 rounded"
// >
//   Order
// </button>


//             <button
//               onClick={() => navigate("/cart", { state: { fromCheckout: true } })}
//               className="bg-gray-200 px-4 py-2 rounded"
//             >
//               Back to Cart
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const items = location.state?.items || [];

//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const subtotal = items.reduce((sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity), 0);
//   const deliveryCharge = 20;
//   const total = subtotal + deliveryCharge;

//   const handleCheckout = async () => {
//     if (!isLoggedIn) return alert("Please log in to checkout");
//     if (!address.trim()) return alert("Please enter delivery address");

//     setLoading(true);
//     try {
//       const itemIds = items.map((i) => i._id).filter(Boolean); // only for logged-in items
//       const res = await api.post("/cart/checkout", { itemIds, address, deliveryCharge });
//       if (res.data.success) {
//         alert("Order placed successfully!");
//         navigate("/orders"); // redirect to order page
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Checkout failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//         <textarea
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full border rounded p-3 h-24"
//           placeholder="Enter your address"
//         />

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//           <ul className="divide-y">
//             {items.map((i, idx) => (
//               <li key={i._id || idx} className="flex justify-between py-2">
//                 <span>{i.name} x {i.quantity}</span>
//                 <span>₹{i.totalPrice || i.unitPrice * i.quantity}</span>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between mt-4">
//             <p className="font-semibold">Subtotal:</p>
//             <p>₹{subtotal}</p>
//           </div>
//           <div className="flex justify-between mt-1">
//             <p className="font-semibold">Delivery:</p>
//             <p>₹{deliveryCharge}</p>
//           </div>
//           <div className="flex justify-between mt-2 text-lg font-bold">
//             <p>Total:</p>
//             <p>₹{total}</p>
//           </div>
//         </div>

//         <button
//           onClick={handleCheckout}
//           disabled={loading}
//           className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const items = location.state?.items || [];

//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const subtotal = items.reduce((sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity), 0);
//   const deliveryCharge = 20;
//   const total = subtotal + deliveryCharge;

//   const handleCheckout = async () => {
//     if (!isLoggedIn) return alert("Please log in to checkout");
//     if (!address.trim()) return alert("Please enter delivery address");

//     setLoading(true);
//     try {
//       const itemIds = items.map((i) => i._id).filter(Boolean); 
//       const res = await api.post("/cart/checkout", { itemIds, address, deliveryCharge });
//       if (res.data.success) {
//         alert("Order placed successfully!");
//         navigate("/orders");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Checkout failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//         <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded p-3 h-24" placeholder="Enter your address" />

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//           <ul className="divide-y">
//             {items.map((i, idx) => (
//               <li key={i._id || idx} className="flex justify-between py-2">
//                 <span>{i.name} x {i.quantity}</span>
//                 <span>₹{i.totalPrice || i.unitPrice * i.quantity}</span>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between mt-4"><p className="font-semibold">Subtotal:</p><p>₹{subtotal}</p></div>
//           <div className="flex justify-between mt-1"><p className="font-semibold">Delivery:</p><p>₹{deliveryCharge}</p></div>
//           <div className="flex justify-between mt-2 text-lg font-bold"><p>Total:</p><p>₹{total}</p></div>
//         </div>

//         <button onClick={handleCheckout} disabled={loading} className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }




// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../AuthContext";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) navigate("/login");

//     // Load saved address
//     const savedAddress = localStorage.getItem("deliveryAddress");
//     if (savedAddress) setAddress(savedAddress);

//     const fetchCartItems = async () => {
//       try {
//         let cartItems = [];

//         if (isLoggedIn) {
//           // Fetch from backend
//           const res = await api.get("/cart");
//           const checkoutIds = JSON.parse(localStorage.getItem("checkoutItemIds") || "[]");
//           cartItems = res.items.filter((item) => checkoutIds.includes(item._id));
//         } else {
//           // Guest cart from localStorage
//           const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//           cartItems = guestCart;
//         }

//         setItems(cartItems);
//       } catch (err) {
//         console.error("Failed to fetch cart items:", err);
//       }
//     };

//     fetchCartItems();
//   }, [isLoggedIn]);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || (i.unitPrice * i.quantity)),
//     0
//   );
//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = () => {
//     if (!address) return alert("Please add delivery address");
//     navigate("/payment", { state: { items, address, total } });
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-4">Checkout</h2>

//       <div className="bg-white p-4 rounded shadow">

//         {/* Delivery Address */}
//         <label className="font-semibold">Delivery Address</label>
//         <div
//           className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer"
//           onClick={() => navigate("/customer-details")}
//         >
//           {address ? address : "Click to add delivery address"}
//         </div>

//         {/* Items */}
//         <div className="mt-4">
//           <h3 className="font-semibold">Items</h3>
//           <div className="mt-2 space-y-3">
//             {items.map((it) => (
//               <div key={it._id} className="flex items-center gap-3">
//                 <img src={it.image || "https://via.placeholder.com/80"} className="w-20 h-16 object-cover rounded" />
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">₹{it.totalPrice || (it.unitPrice * it.quantity)}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Total */}
//         <div className="mt-4 border-t pt-3 space-y-1">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal.toFixed(2)}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold mt-2">Total: <span>₹{total.toFixed(2)}</span></div>

//           <div className="mt-4 flex gap-3">
//             <button
//               onClick={handleOrder}
//               className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               Place Order
//             </button>

//             <button
//               onClick={() => navigate("/cart")}
//               className="bg-gray-200 px-4 py-2 rounded"
//             >
//               Back to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) {
//       return navigate("/cart");
//     }

//     setItems(passedItems);

//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);
//   }, []);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = () => {
//     if (!address) return alert("Please add delivery address");

//     navigate("/payment", { state: { items, address, total } });
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-4">Checkout</h2>

//       <div className="bg-white p-4 rounded shadow">

//         <label className="font-semibold">Delivery Address</label>

//         <div
//           className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer"
//           onClick={() => navigate("/customer-details")}
//         >
//           {address || "Click to add delivery address"}
//         </div>

//         <div className="mt-4">
//           <h3 className="font-semibold">Items</h3>

//           <div className="mt-2 space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <img src={it.image} className="w-20 h-16 object-cover rounded" />

//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>

//                     <div className="font-semibold">
//                       ₹{it.totalPrice || it.unitPrice * it.quantity}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4 border-t pt-3 space-y-1">
//           <div className="flex justify-between">
//             Subtotal: <span>₹{subtotal}</span>
//           </div>

//           <div className="flex justify-between">
//             Delivery: <span>₹{DELIVERY_CHARGE}</span>
//           </div>

//           <div className="flex justify-between font-bold mt-2">
//             Total: <span>₹{total}</span>
//           </div>

//           <div className="mt-4 flex gap-3">
//             <button
//               onClick={handleOrder}
//               className="bg-green-600 text-white px-5 py-2 rounded"
//             >
//               Place Order
//             </button>

//             <button
//               onClick={() => navigate("/cart")}
//               className="bg-gray-200 px-4 py-2 rounded"
//             >
//               Back to Cart
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) return navigate("/cart");

//     setItems(passedItems);

//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);
//   }, [isLoggedIn, location.state, navigate]);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!address) return alert("Please add delivery address");

//     try {
//       const payload = { items, address, deliveryCharge: DELIVERY_CHARGE, total };

//       const res = await api.post("/cart/checkout", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) navigate("/order-success");
//     } catch (err) {
//       console.error("Order failed", err);
//       alert("Order failed. Try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* Delivery Address */}
//         <div>
//           <label className="font-semibold">Delivery Address</label>
//           <div
//             className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
//             onClick={() => navigate("/customer-details")}
//           >
//             {address || "Click to add delivery address"}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image}
//                   alt={it.name}
//                   className="w-20 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{it.totalPrice || it.unitPrice * it.quantity}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-3 space-y-2">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold text-lg">Total: <span>₹{total}</span></div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleOrder}
//             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
//           >
//             Place Order
//           </button>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





// src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) {
//       navigate("/cart");
//       return;
//     }

//     setItems(passedItems);

//     const savedAddress = localStorage.getItem("deliveryAddress");
//     if (savedAddress) setAddress(savedAddress);
//   }, [isLoggedIn, location.state, navigate]);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!address.trim()) {
//       alert("Please add delivery address");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         items,
//         address,
//         deliveryCharge: DELIVERY_CHARGE,
//         total,
//       };

//       const res = await api.post("/cart/checkout", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res?.success) {
//         alert("Order placed successfully!");
//         navigate("/payment");
//       } else {
//         alert(res?.message || "Order failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Order failed", err);
//       alert(err?.message || "Order failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* Delivery Address */}
//         <div>
//           <label className="font-semibold">Delivery Address</label>
//           <div
//             className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
//             onClick={() => navigate("/customer-details")}
//           >
//             {address || "Click to add delivery address"}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image || "https://via.placeholder.com/80"}
//                   alt={it.name}
//                   className="w-20 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{it.totalPrice || it.unitPrice * it.quantity}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-3 space-y-2">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold text-lg">Total: <span>₹{total}</span></div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={handleOrder}
//             disabled={loading}
//             className={`bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             Back to Cart
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) return navigate("/cart");

//     setItems(passedItems);

//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);
//   }, [isLoggedIn, location.state, navigate]);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!address) return alert("Please add delivery address");
//     if (!token) return alert("You are not logged in");

//     try {
//       const payload = { items, address, deliveryCharge: DELIVERY_CHARGE, total };
//       const res = await api.checkoutCart(payload); // Using api function

//       // res is already unwrapped in api.js interceptor
//       if (res.success) {
//         navigate("/order-success");
//       } else {
//         alert(res.message || "Order failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Order failed", err);
//       alert(err.message || "Order failed. Try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* Delivery Address */}
//         <div>
//           <label className="font-semibold">Delivery Address</label>
//           <div
//             className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
//             onClick={() => navigate("/customer-details")}
//           >
//             {address || "Click to add delivery address"}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image || "/fallback.png"} // fallback image
//                   alt={it.name}
//                   className="w-20 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{it.totalPrice || it.unitPrice * it.quantity}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-3 space-y-2">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold text-lg">Total: <span>₹{total}</span></div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleOrder}
//             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
//           >
//             Place Order
//           </button>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { checkoutCart } from "../api"; // ✅ import the function correctly

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) return navigate("/cart");

//     setItems(passedItems);

//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);
//   }, [isLoggedIn, location.state, navigate]);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!address) return alert("Please add delivery address");
//     if (!token) return alert("You must be logged in to place an order");

//     try {
//       const payload = { items, address, deliveryCharge: DELIVERY_CHARGE, total };

//       const res = await checkoutCart(payload); // ✅ use imported function

//       if (res.success) {
//         navigate("/order-success");
//       } else {
//         alert(res.message || "Order failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Order failed", err);
//       alert(err.message || "Order failed. Try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* Delivery Address */}
//         <div>
//           <label className="font-semibold">Delivery Address</label>
//           <div
//             className="w-full border p-3 mt-2 rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
//             onClick={() => navigate("/customer-details")}
//           >
//             {address || "Click to add delivery address"}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image || "https://via.placeholder.com/80"} // placeholder fallback
//                   alt={it.name}
//                   className="w-20 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">{it.name}</div>
//                       <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{it.totalPrice || it.unitPrice * it.quantity}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-3 space-y-2">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold text-lg">Total: <span>₹{total}</span></div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleOrder}
//             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
//           >
//             Place Order
//           </button>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { checkoutCart } from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [details, setDetails] = useState(null);

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const passedItems = location.state?.items;
//     if (!passedItems || passedItems.length === 0) return navigate("/cart");
//     setItems(passedItems);

//     const saved = localStorage.getItem("customerDetails");
//     if (saved) setDetails(JSON.parse(saved));
//   }, []);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!details) return alert("Please fill address details first");
//     if (!token) return alert("You must be logged in");

//     const payload = {
//       items,
//       customerDetails: details,
//       deliveryCharge: DELIVERY_CHARGE,
//       total,
//     };

//     try {
//       const res = await checkoutCart(payload);
//       if (res.success) navigate("/payment-method");
//       else alert(res.message || "Order failed");
//     } catch (err) {
//       alert("Order failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* CUSTOMER DETAILS CARD */}
//         <div>
//           <h3 className="font-semibold text-lg mb-2">Delivery Information</h3>
//           <div
//             className="border p-3 rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
//             onClick={() => navigate("/customer-details")}
//           >
//             {details ? (
//               <div className="space-y-1">
//                 <div><strong>Name:</strong> {details.name}</div>
//                 <div><strong>Phone:</strong> {details.phone}</div>
//                 <div><strong>Address:</strong> {details.address}</div>
//                 <div><strong>District:</strong> {details.district}</div>
//                 <div><strong>Landmark:</strong> {details.landmark}</div>
//                 <div><strong>Type:</strong> {details.addressType}</div>
//                 <div><strong>Date:</strong> {details.deliveryDate}</div>
//                 <div><strong>Plan:</strong> {details.deliveryPlan}</div>
//               </div>
//             ) : (
//               "Click to add delivery details"
//             )}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image || "https://via.placeholder.com/80"}
//                   className="w-20 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <div className="font-semibold">{it.name}</div>
//                   <div className="text-sm text-gray-600">
//                     Qty: {it.quantity}
//                   </div>
//                 </div>
//                 <div className="font-semibold">
//                   ₹{it.totalPrice || it.unitPrice * it.quantity}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-3 space-y-2">
//           <div className="flex justify-between">Subtotal: <span>₹{subtotal}</span></div>
//           <div className="flex justify-between">Delivery: <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between font-bold text-lg">Total: <span>₹{total}</span></div>
//         </div>

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { checkoutCart } from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, token } = useAuth();

//   const [items, setItems] = useState([]);
//   const [details, setDetails] = useState(null);

//   const DELIVERY_CHARGE = 20;

//   useEffect(() => {
//     if (!isLoggedIn) return navigate("/login");

//     const cartItems = location.state?.items;
//     if (!cartItems) return navigate("/cart");

//     setItems(cartItems);

//     const savedDetails = localStorage.getItem("customerDetails");
//     if (savedDetails) setDetails(JSON.parse(savedDetails));
//   }, []);

//   const subtotal = items.reduce(
//     (sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity),
//     0
//   );

//   const total = subtotal + DELIVERY_CHARGE;

//   const handleOrder = async () => {
//     if (!details) return alert("Add customer details!");

//     const payload = {
//       items,
//       name: details.name,
//       phone: details.phone,
//       address: details.address,
//       district: details.district,
//       landmark: details.landmark,
//       addressType: details.addressType,
//       deliveryDate: details.deliveryDate,
//       deliveryPlan: details.deliveryPlan,
//       deliveryCharge: DELIVERY_CHARGE,
//       total,
//     };

//     try {
//       const res = await checkoutCart(payload);

//       if (res.success) {
//         navigate("/payment-method");
//       } else {
//         alert(res.message || "Order failed");
//       }
//     } catch (err) {
//       alert("Order failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">

//       <h2 className="text-3xl font-bold text-green-700 mb-6">Checkout</h2>

//       <div className="bg-white p-6 rounded shadow space-y-6">

//         {/* Customer details */}
//         <div>
//           <h3 className="font-semibold mb-2">Delivery Information</h3>

//           <div
//             className="border p-4 rounded bg-gray-50 cursor-pointer"
//             onClick={() => navigate("/customer-details")}
//           >
//             {details ? (
//               <div>
//                 <div className="font-bold">{details.name} ({details.phone})</div>
//                 <div>{details.address}</div>
//                 <div>{details.district}</div>
//                 <div className="text-sm text-gray-600">
//                   Landmark: {details.landmark || "None"}
//                 </div>
//                 <div className="text-sm">Type: {details.addressType}</div>
//                 <div className="mt-2 text-sm text-green-700 font-semibold">
//                   Delivery: {details.deliveryDate} — {details.deliveryPlan}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-gray-600">Click to add delivery details</div>
//             )}
//           </div>
//         </div>

//         {/* Items */}
//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <div className="space-y-3">
//             {items.map((it, i) => (
//               <div key={i} className="flex items-center gap-3 border p-2 rounded">
//                 <img
//                   src={it.image || "https://via.placeholder.com/80"}
//                   className="w-20 h-16 rounded object-cover"
//                 />
//                 <div className="flex-1">
//                   <div className="font-semibold">{it.name}</div>
//                   <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
//                 </div>
//                 <div className="font-semibold">
//                   ₹{it.totalPrice || it.unitPrice * it.quantity}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between mb-2">Subtotal <span>₹{subtotal}</span></div>
//           <div className="flex justify-between mb-2">Delivery <span>₹{DELIVERY_CHARGE}</span></div>
//           <div className="flex justify-between text-lg font-bold">
//             Total <span>₹{total}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
//         >
//           Place Order
//         </button>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const savedDetails = localStorage.getItem("customerDetails");
//     if (!savedDetails) {
//       navigate("/customer-details");
//       return;
//     }
//     setCustomer(JSON.parse(savedDetails));

//     // fetch cart items
//     loadCart();
//   }, []);

//   const loadCart = async () => {
//     try {
//       const res = await api.get("/cart");
//       setCartItems(res.data.cart || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleOrder = async () => {
//     if (!customer.address || !customer.phone) {
//       setError("Address and phone number required");
//       return;
//     }

//     try {
//       const res = await api.post("/cart/checkout", {
//         name: customer.name,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark,
//         deliveryOption: customer.deliveryOption,
//       });

//       if (res.data.success) {
//         setSuccess("Order placed successfully!");
//         localStorage.removeItem("customerDetails");
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded mb-4">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded mb-4">
//           <h3 className="text-lg font-semibold mb-2">Your Cart</h3>

//           {cartItems.length === 0 ? (
//             <p>No items in cart.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex justify-between border-b py-2"
//               >
//                 <span>{item.name}</span>
//                 <span>Qty: {item.quantity}</span>
//                 <span>Rs. {item.price * item.quantity}</span>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Error & Success */}
//         {error && <p className="text-red-600 mb-3">{error}</p>}
//         {success && <p className="text-green-600 mb-3">{success}</p>}

//         {/* Place Order */}
//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const savedDetails = localStorage.getItem("customerDetails");
//     if (savedDetails) setCustomer(JSON.parse(savedDetails));
//     else navigate("/customer-details");

//     // **Only set cart items if state exists and not already set**
//     if (location.state?.items && cartItems.length === 0) {
//       setCartItems(location.state.items);
//     }
//   }, [location.state, navigate, cartItems.length]);

//   const handleOrder = async () => {
//     if (!customer?.name || !customer?.phone || !customer?.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     try {
//       const res = await api.post("/cart/checkout", {
//         ...customer,
//         items: cartItems,
//       });

//       if (res.data.success) {
//         setSuccess("Order placed successfully!");
//         localStorage.removeItem("customerDetails");
//         navigate("/"); // redirect home or order confirmation
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           {/* Pass selected items when navigating */}
//           <button
//             onClick={() =>
//               navigate("/customer-details", { state: { items: cartItems } })
//             }
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && (
//             <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//           )}
//         </div>

//         {/* Error & Success */}
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     // Load customer details
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     // Load selected items from localStorage
//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//     else setCartItems([]);
//   }, [navigate]);

//   const handleOrder = async () => {
//   if (!customer?.name || !customer?.phone || !customer?.address) {
//     setError("Please complete your customer details.");
//     return;
//   }

//   // FIX: Convert saved cartItems to correct backend format
//   const formattedItems = cartItems.map((item) => ({
//     itemId: item.itemId || item._id,   // IMPORTANT FIX
//     name: item.name,
//     type: item.type,
//     image: item.image,
//     quantity: item.quantity,
//     unitPrice: item.unitPrice,
//     totalPrice: item.totalPrice || (item.unitPrice * item.quantity),
//   }));

//   try {
//     const res = await api.post("/cart/checkout", {
//       name: customer.name,
//       email: customer.email,
//       phone: customer.phone,
//       address: customer.address,
//       landmark: customer.landmark,
//       deliveryOption: customer.deliveryOption,
//       paymentMethod: customer.paymentMethod || "COD",
//       items: formattedItems,    // <-- FIXED
//     });

//     // api.js returns data only, so res.success is correct
//     if (res.success) {
//       setSuccess("Order placed successfully!");
//       localStorage.removeItem("customerDetails");
//       localStorage.removeItem("selectedCartItems");
//       navigate("/");
//     } else {
//       setError("Order failed. Try again.");
//     }
//   } catch (err) {
//     setError(err.message || "Order failed");
//   }
// };


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Selected Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && (
//             <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//           )}
//         </div>

//         {/* Error & Success */}
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     // Load customer details
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else return navigate("/customer-details");

//     // Load selected items from localStorage
//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   // FIX: Prevent rendering before customer is loaded
//   if (!customer) return null;

//   // Calculate subtotal
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // ===========================
//   // PLACE ORDER
//   // ===========================
//   const handleOrder = async () => {
//     if (!customer?.name || !customer?.phone || !customer?.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     // FIX: Convert items to backend-compatible format
//     const formattedItems = cartItems.map((item) => ({
//       itemId: item.itemId || item._id, // important fix
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         name: customer.name,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark,
//         deliveryOption: customer.deliveryOption,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       // api.js returns only data
//       if (res.success) {
//         setSuccess("Order placed successfully!");
//         localStorage.removeItem("customerDetails");
//         localStorage.removeItem("selectedCartItems");
//         navigate("/");
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* ===========================
//            CUSTOMER DETAILS
//         ============================ */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* ===========================
//            SELECTED ITEMS
//         ============================ */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>

//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.itemId || item._id}
//                 className="flex items-center justify-between border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}

//           {cartItems.length > 0 && (
//             <p className="text-right font-semibold mt-2">
//               Subtotal: ₹{subtotal}
//             </p>
//           )}
//         </div>

//         {/* Error & Success Messages */}
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     // Load customer details
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else return navigate("/customer-details");

//     // Load selected items from localStorage
//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   // Prevent rendering before customer is loaded
//   if (!customer) return null;

//   // Calculate subtotal
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // ===========================
//   // PLACE ORDER
//   // ===========================
//   const handleOrder = async () => {
//     if (!customer?.name || !customer?.phone || !customer?.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     // Format items for backend
//     const formattedItems = cartItems.map((item) => ({
//       itemId: item.itemId || item._id, // important fix
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         name: customer.name,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark,
//         deliveryOption: customer.deliveryOption,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       if (res.success) {
//         setSuccess("Order placed successfully!");

//         // 1.5 second wait before redirect
//         setTimeout(() => {
//           localStorage.removeItem("customerDetails");
//           localStorage.removeItem("selectedCartItems");
//           navigate("/");
//         }, 1500);
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* CUSTOMER DETAILS */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* SELECTED ITEMS */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.itemId || item._id}
//                 className="flex items-center justify-between border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && (
//             <p className="text-right font-semibold mt-2">
//               Subtotal: ₹{subtotal}
//             </p>
//           )}
//         </div>

//         {/* Error & Success Messages */}
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else return navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handleOrder = async () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     const formattedItems = cartItems.map((item) => ({
//       itemId: item.itemId || item._id,
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         ...customer,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       if (res.success) {
//         if (res.paymentMethod === "COD") {
//           // COD: Show order success immediately
//           setSuccess("Order placed successfully!");
//           setTimeout(() => {
//             localStorage.removeItem("customerDetails");
//             localStorage.removeItem("selectedCartItems");
//             navigate("/order-success", { state: { orderId: res.orderId } });
//           }, 1500);
//         } else {
//           // Online payment: redirect to payment gateway page
//           navigate("/card-payment", { state: { orderId: res.orderId, amount: res.amount } });
//         }
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button onClick={handleOrder} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     // Load customer details
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else return navigate("/customer-details");

//     // Load selected cart items
//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   // Subtotal calculation
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // Place Order
//   const handleOrder = async () => {
//     setError("");
//     setSuccess("");

//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     // Format items for backend
//     const formattedItems = cartItems.map((item) => ({
//       itemId: item.itemId || item._id,
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         name: customer.name,
//         email: customer.email || "",
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//         deliveryOption: customer.deliveryOption || "Home Delivery",
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       if (res.success) {
//         if (res.paymentMethod === "COD") {
//           setSuccess("Order placed successfully!");
//           setTimeout(() => {
//             localStorage.removeItem("customerDetails");
//             localStorage.removeItem("selectedCartItems");
//             navigate("/order-success", { state: { orderId: res.orderId } });
//           }, 1500);
//         } else {
//           // Online payment redirect
//           navigate("/card-payment", { state: { orderId: res.orderId, amount: res.amount } });
//         }
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption || "Home Delivery"}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && (
//             <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//           )}
//         </div>

//         {/* Messages */}
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// // }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     try {
//       // Load customer details safely
//       const savedCustomer = localStorage.getItem("customerDetails");
//       if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//       else return navigate("/customer-details");

//       // Load selected cart items
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//     } catch (err) {
//       console.error("LocalStorage load error:", err);
//       setError("Failed to load saved data. Please try again.");
//     }
//   }, [navigate]);

//   // Prevent rendering if customer is not loaded
//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handleOrder = async () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     // Format items for backend
//     const formattedItems = cartItems.map((item) => ({
//       itemId: item.itemId || item._id,
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         ...customer,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       if (res.success) {
//         if (res.paymentMethod === "COD") {
//           setSuccess("Order placed successfully!");
//           // Wait 1.5 seconds before redirecting
//           setTimeout(() => {
//             try {
//               localStorage.removeItem("customerDetails");
//               localStorage.removeItem("selectedCartItems");
//             } catch (err) {
//               console.error("LocalStorage remove error:", err);
//             }
//             navigate("/order-success", { state: { orderId: res.orderId } });
//           }, 1500);
//         } else {
//           // Online payment: redirect to payment page
//           navigate("/card-payment", { state: { orderId: res.orderId, amount: res.amount } });
//         }
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Checkout API error:", err);
//       setError(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else return navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handleOrder = async () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     const formattedItems = cartItems.map(item => ({
//       itemId: item.itemId || item._id,
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         ...customer,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//       });

//       if (res.success) {
//         if (res.paymentMethod === "COD") {
//           // COD → show success & redirect
//           setSuccess("Order placed successfully!");
//           setTimeout(() => {
//             localStorage.removeItem("customerDetails");
//             localStorage.removeItem("selectedCartItems");
//             navigate("/order-success", { state: { orderId: res.orderId } });
//           }, 1500);
//         } else {
//           // Card/Online → go to payment page
//           navigate("/card-payment", { state: { orderId: res.orderId, amount: res.amount } });
//         }
//       } else {
//         setError("Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Order failed");
//       console.error("Checkout API error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Selected Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Load customer details and cart items from localStorage
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handleOrder = async () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Please complete your customer details.");
//       return;
//     }

//     const formattedItems = cartItems.map(item => ({
//       itemId: item.itemId || item._id,
//       name: item.name,
//       type: item.type,
//       image: item.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
//     }));

//     try {
//       const res = await api.post("/cart/checkout", {
//         ...customer,
//         paymentMethod: customer.paymentMethod || "COD",
//         items: formattedItems,
//         amount: subtotal,
//       });

//       if (res.success) {
//         if (res.paymentMethod === "COD") {
//           setSuccess("Order placed successfully!");
//           setTimeout(() => {
//             localStorage.removeItem("customerDetails");
//             localStorage.removeItem("selectedCartItems");
//             navigate("/order-success", { state: { orderId: res.orderId } });
//           }, 1500);
//         } else {
//           // Navigate to card payment page with Stripe session
//           navigate("/card-payment", { state: { sessionId: res.sessionId } });
//         }
//       } else {
//         setError(res.message || "Order failed. Try again.");
//       }
//     } catch (err) {
//       setError(err.message || "Checkout failed");
//       console.error("Checkout API error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Selected Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       alert("Please complete your customer details.");
//       return;
//     }

//     // Save subtotal in localStorage for Payment page
//     localStorage.setItem("checkoutSubtotal", subtotal);
    
//     // Navigate to Payment Method page
//     navigate("/payment");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           {customer.landmark && <p><strong>Landmark:</strong> {customer.landmark}</p>}
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>

//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Selected Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Continue to Payment
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = (paymentMethod) => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       alert("Please complete your customer details.");
//       return;
//     }

//     // Save checkout info for Payment page
//     localStorage.setItem("checkoutSubtotal", subtotal);
//     localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//     // Navigate to Payment page
//     navigate("/payment");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? <p>No items selected.</p> :
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           }
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Buttons */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => handlePlaceOrder("COD")}
//             className="w-1/2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//           >
//             Pay on Delivery
//           </button>
//           <button
//             onClick={() => handlePlaceOrder("Online")}
//             className="w-1/2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
//           >
//             Pay Online
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       alert("Please complete your customer details.");
//       return;
//     }

//     // Save checkout info in localStorage
//     localStorage.setItem("checkoutSubtotal", subtotal);
//     localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//     if (paymentMethod === "COD") navigate("/confirm-order");
//     else navigate("/card-payment");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? <p>No items selected.</p> :
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           }
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Method Selection */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={() => setPaymentMethod("COD")}
//               />
//               Cash on Delivery
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Online"
//                 checked={paymentMethod === "Online"}
//                 onChange={() => setPaymentMethod("Online")}
//               />
//               Card / Online Payment
//             </label>
//           </div>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState(""); // empty initially

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     const savedItems = localStorage.getItem("selectedCartItems");

//     if (!savedCustomer) navigate("/customer-details");
//     else setCustomer(JSON.parse(savedCustomer));

//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }

//     // Save checkout info for next page
//     localStorage.setItem("checkoutSubtotal", subtotal);
//     localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//     // Navigate based on payment method
//     if (paymentMethod === "COD") navigate("/confirm-order");
//     else navigate("/stripe-payment");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? <p>No items selected.</p> :
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           }
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Method Selection */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-6 mt-2">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={() => setPaymentMethod("COD")}
//                 className="cursor-pointer"
//               />
//               Cash on Delivery
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Online"
//                 checked={paymentMethod === "Online"}
//                 onChange={() => setPaymentMethod("Online")}
//                 className="cursor-pointer"
//               />
//               Card / Online Payment
//             </label>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={!paymentMethod || cartItems.length === 0}
//           className={`w-full py-2 rounded-lg font-semibold text-white ${paymentMethod ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState(""); // empty initially

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     const savedItems = localStorage.getItem("selectedCartItems");

//     if (!savedCustomer) navigate("/customer-details");
//     else setCustomer(JSON.parse(savedCustomer));

//     if (savedItems) setCartItems(JSON.parse(savedItems));
//   }, [navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }

//     localStorage.setItem("checkoutSubtotal", subtotal);
//     localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//     if (paymentMethod === "COD") navigate("/confirm-order");
//     else navigate("/card-payment");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Mini Order Summary */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//           {cartItems.length === 0 ? (
//             <p>No items selected.</p>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex justify-between py-1 border-b">
//                 <div>{item.name} x {item.quantity}</div>
//                 <div>₹ {item.totalPrice || item.unitPrice * item.quantity}</div>
//               </div>
//             ))
//           )}
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Method Selection */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-6 mt-2">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={() => setPaymentMethod("COD")}
//                 className="cursor-pointer"
//               />
//               Cash on Delivery
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Online"
//                 checked={paymentMethod === "Online"}
//                 onChange={() => setPaymentMethod("Online")}
//                 className="cursor-pointer"
//               />
//               Card / Online Payment
//             </label>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={!paymentMethod || cartItems.length === 0}
//           className={`w-full py-2 rounded-lg font-semibold text-white ${
//             paymentMethod ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (!savedCustomer) return navigate("/customer-details");
//     setCustomer(JSON.parse(savedCustomer));

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) {
//       const items = JSON.parse(savedItems);
//       setCartItems(items);
//       setSubtotal(items.reduce((sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity), 0));
//     }
//   }, [navigate]);

//   const handlePlaceOrder = () => {
//     if (!paymentMethod) return alert("Please select a payment method.");
//     localStorage.setItem("checkoutSubtotal", subtotal);
//     localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//     if (paymentMethod === "COD") navigate("/confirm-order");
//     else navigate("/card-payment");
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button onClick={() => navigate("/customer-details")} className="mt-2 text-blue-600 underline">Edit Details</button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? <p>No items selected.</p> :
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           }
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200"}`}
//             >Cash on Delivery</button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//             >Pay Online</button>
//           </div>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (!savedCustomer) return navigate("/customer-details");
//     setCustomer(JSON.parse(savedCustomer));

//     const savedItems = localStorage.getItem("selectedCartItems");
//     if (savedItems) {
//       const items = JSON.parse(savedItems);
//       setCartItems(items);
//       setSubtotal(items.reduce((sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity), 0));
//     }
//   }, [navigate]);

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) return alert("Please select a payment method.");

//     try {
//       // Create order in backend
//       const res = await axios.post("http://localhost:5000/api/orders/create", {
//         customer,
//         items: cartItems,
//         paymentMethod,
//         subtotal,
//       });

//       const orderId = res.data.order._id;
//       localStorage.setItem("orderId", JSON.stringify(orderId));
//       localStorage.setItem("checkoutSubtotal", subtotal);
//       localStorage.setItem("checkoutPaymentMethod", paymentMethod);

//       if (paymentMethod === "COD") navigate("/confirm-order");
//       else navigate("/card-payment");
//     } catch (err) {
//       console.error("Order creation error:", err);
//       alert("Failed to create order. Try again.");
//     }
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button onClick={() => navigate("/customer-details")} className="mt-2 text-blue-600 underline">Edit Details</button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.length === 0 ? <p>No items selected.</p> :
//             cartItems.map(item => (
//               <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//                 <div className="flex items-center gap-3">
//                   <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {item.quantity}</p>
//                   <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//                 </div>
//               </div>
//             ))
//           }
//           {cartItems.length > 0 && <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>}
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200"}`}
//             >Cash on Delivery</button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//             >Pay Online</button>
//           </div>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");

//   // Load customer & cart items
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     // Get selected cart items from navigation state or localStorage fallback
//     if (location.state?.items) setCartItems(location.state.items);
//     else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//       else navigate("/cart");
//     }
//   }, [location.state, navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

// const handlePlaceOrder = async () => {
//   if (!paymentMethod) return alert("Select a payment method!");

//   const orderData = {
//     customer,
//     items: cartItems,
//     paymentMethod,
//     subtotal,
//   };

//   try {
//     // Use fetch instead of api.post
//     const res = await fetch("http://localhost:5000/api/orders/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData)
//     });

//     const data = await res.json();
//     console.log("Order response:", data);

//     const orderId = data.order._id;
//     localStorage.setItem("orderId", JSON.stringify(orderId));

//     if (paymentMethod === "COD") navigate("/confirm-order");
//     else navigate("/card-payment");
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     alert("Failed to create order. Try again.");
//   }
// };



//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Your Selected Items</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Cash on Delivery
//             </button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Online Payment
//             </button>
//           </div>
//         </div>

//         {/* Place Order */}
//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load customer & cart items
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     if (location.state?.items) setCartItems(location.state.items);
//     else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//       else navigate("/cart");
//     }
//   }, [location.state, navigate]);

//   if (!customer) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // const handlePlaceOrder = async () => {
//   //   if (!paymentMethod) return alert("Select a payment method!");

//   //   const orderData = {
//   //     customer,
//   //     items: cartItems,
//   //     paymentMethod,
//   //     subtotal,
//   //   };

//   //   setLoading(true);
//   //   try {
//   //     const res = await fetch("http://localhost:5000/api/orders/create", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(orderData),
//   //     });

//   //     const data = await res.json();
//   //     console.log("Order response:", data);

//   //     if (!res.ok) throw new Error(data.message || "Order creation failed");

//   //     const orderId = data.order._id;
//   //     localStorage.setItem("orderId", JSON.stringify(orderId));

//   //     if (paymentMethod === "COD") navigate("/confirm-order");
//   //     else navigate("/card-payment");
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert(err.message || "Failed to create order. Try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const handlePlaceOrder = async () => {
//   if (!paymentMethod) return alert("Select a payment method!");

//   const orderData = {
//     customer,
//     items: cartItems,
//     paymentMethod,
//     subtotal,
//   };

//   setLoading(true);
//   try {
//     const res = await fetch("http://localhost:5000/api/orders/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });

//     const data = await res.json();
//     console.log("Order response:", data);

//     if (!res.ok) throw new Error(data.message || "Order creation failed");

//     const orderId = data.order._id;

//     // Save order ID & amount
//     localStorage.setItem("orderId", orderId);
//     localStorage.setItem("orderAmount", subtotal);

//     /** ================================
//      *  COD FLOW
//      * ================================ */
//     if (paymentMethod === "COD") {
//       navigate("/cod-confirm");
//       return;
//     }

//     /** ================================
//      *  ONLINE PAYMENT FLOW
//      * ================================ */
//     navigate("/card-payment");
//   } catch (err) {
//     console.error(err);
//     alert(err.message || "Failed to create order. Try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Cash on Delivery
//             </button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Online Payment
//             </button>
//           </div>
//         </div>

//         {/* Place Order */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load customer & cart items from localStorage
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     if (location.state?.items) setCartItems(location.state.items);
//     else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//       else navigate("/cart");
//     }
//   }, [location.state, navigate]);

//   if (!customer) return null;

//   // Calculate subtotal
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // Place Order
//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) return alert("Select a payment method!");

//     const orderData = {
//       customer,
//       items: cartItems,
//       paymentMethod,
//       subtotal,
//     };

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/orders/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // include credentials if backend uses cookies
//         credentials: "include",
//         body: JSON.stringify(orderData),
//       });

//       const text = await res.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         console.error("Response parse error:", text);
//         throw new Error("Invalid server response");
//       }

//       if (!res.ok) {
//         console.error("Order creation error:", data);
//         throw new Error(data.message || "Order creation failed");
//       }

//       const orderId = data.order._id;

//       // Save order info
//       localStorage.setItem("orderId", orderId);
//       localStorage.setItem("orderAmount", subtotal);

//       /** =========================
//        *  COD FLOW
//        * ========================= */
//       if (paymentMethod === "COD") {
//         navigate("/confirm-order");
//         return;
//       }

//       /** =========================
//        *  ONLINE PAYMENT FLOW (Stripe)
//        * ========================= */
//       navigate("/card-payment");

//     } catch (err) {
//       console.error("Fetch failed:", err);
//       alert("Failed to place order: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={item.image || "https://via.placeholder.com/60"}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Cash on Delivery
//             </button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Online Payment
//             </button>
//           </div>
//         </div>

//         {/* Place Order */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder } from "../api"; // Make sure this points to your API file

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load customer & cart items from localStorage or location state
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) {
//       setCustomer(JSON.parse(savedCustomer));
//     } else {
//       navigate("/customer-details");
//     }

//     if (location.state?.items) {
//       setCartItems(location.state.items);
//     } else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) {
//         setCartItems(JSON.parse(savedItems));
//       } else {
//         navigate("/cart");
//       }
//     }
//   }, [location.state, navigate]);

//   if (!customer || cartItems.length === 0) return null;

//   // Calculate subtotal
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//     0
//   );

//   // Place Order function
// const handlePlaceOrder = async () => {
//   if (!paymentMethod) {
//     alert("Select a payment method!");
//     return;
//   }

//   const orderData = {
//     items: cartItems.map(item => ({
//       productId: item.itemId || item._id,
//       name: item.name,
//       price: item.unitPrice,
//       qty: item.quantity,
//     })),
//     shippingAddress: {
//       name: customer.name,
//       phone: customer.phone,
//       address: customer.address,
//       landmark: customer.landmark || "",
//     },
//     deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//     totalAmount: cartItems.reduce(
//       (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
//       0
//     ),
//   };

//   setLoading(true);

// try {
//   const data = await createOrder(orderData);
//   console.log("Order response:", data); // debug

//   if (!data || !data.order) {
//     throw new Error(data?.message || "Order creation failed");
//   }

//   const orderId = data.order._id;
//   const totalAmount = data.order.totalAmount;

//   localStorage.setItem("orderId", orderId);
//   localStorage.setItem("orderAmount", totalAmount);

//   if (paymentMethod === "COD") {
//     navigate("/confirm-order");
//   } else {
//     navigate("/card-payment", { state: { orderId, amount: totalAmount } });
//   }
// } catch (err) {
//   console.error("Order creation failed:", err);
//   if (err.response) {
//     console.error("Backend response:", err.response.data);
//     alert("Failed to place order: " + (err.response.data.message || err.message));
//   } else {
//     alert("Failed to place order: " + err.message);
//   }
// }

// };





//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={item.image || "https://via.placeholder.com/60"}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice || item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Cash on Delivery
//             </button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               Online Payment
//             </button>
//           </div>
//         </div>

//         {/* Place Order */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder } from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     if (location.state?.items) setCartItems(location.state.items);
//     else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//       else navigate("/cart");
//     }
//   }, [location.state, navigate]);

//   if (!customer || cartItems.length === 0) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice ?? item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) return alert("Select a payment method!");

//     const orderData = {
//       items: cartItems.map((item) => ({
//         productId: item.itemId || item._id,
//         name: item.name,
//         price: item.unitPrice,
//         qty: item.quantity,
//       })),
//       shippingAddress: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//       },
//       deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//       totalAmount: subtotal,
//     };

//     setLoading(true);
//     try {
//       const data = await createOrder(orderData);
//       // createOrder returns { success: true, order: {...} }
//       if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

//       const { _id: orderId, totalAmount } = data.order;
//       localStorage.setItem("orderId", orderId);
//       localStorage.setItem("orderAmount", totalAmount);

//       if (paymentMethod === "COD") {
//         navigate("/confirm-order", { state: { order: data.order } });
//       } else {
//         navigate("/card-payment", { state: { orderId, amount: totalAmount } });
//       }
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert("Failed to place order: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold">Checkout</h2>

//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <button onClick={() => navigate("/customer-details")} className="mt-2 text-blue-600 underline">
//             Edit Details
//           </button>
//         </div>

//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map((item) => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice ?? item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200"}`}>
//               Cash on Delivery
//             </button>
//             <button onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
//               Online Payment
//             </button>
//           </div>
//         </div>

//         <button onClick={handlePlaceOrder} disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}>
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder, createCheckoutSession } from "../api";


// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
//     else navigate("/customer-details");

//     if (location.state?.items) setCartItems(location.state.items);
//     else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) setCartItems(JSON.parse(savedItems));
//       else navigate("/cart");
//     }
//   }, [location.state, navigate]);

//   if (!customer || cartItems.length === 0) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice ?? item.unitPrice * item.quantity),
//     0
//   );
   
// // const handlePlaceOrder = async () => {
// //   if (!paymentMethod) return alert("Select a payment method!");

// //   const orderData = {
// //     items: cartItems.map((item) => ({
// //       productId: item.itemId || item._id,
// //       name: item.name,
// //       price: item.unitPrice,
// //       qty: item.quantity,
// //       image: item.image,
// //     })),
// //     shippingAddress: {
// //       name: customer.name,
// //       phone: customer.phone,
// //       address: customer.address,
// //       landmark: customer.landmark || "",
// //     },
// //     deliveryOption: customer.deliveryOption,
// //     deliveryDate: customer.deliveryDate,
// //     deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
// //     totalAmount: subtotal,
// //   };

// //   setLoading(true);
// //   try {
// //     const data = await createOrder(orderData);
// //     if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

// //     const { _id: orderId, totalAmount } = data.order;

// //     // Save for later use if needed
// //     localStorage.setItem("orderId", orderId);
// //     localStorage.setItem("orderAmount", totalAmount);
// //     localStorage.setItem("orderItems", JSON.stringify(data.order.items));

// //     if (paymentMethod === "COD") {
// //       // COD → Confirm order page
// //       navigate("/confirm-order", { state: { order: data.order } });
// //     } else if (paymentMethod === "Online") {
// //       // 🔴 CARD/ONLINE → create Stripe Checkout session & redirect to Stripe
// //       const sessionRes = await createCheckoutSession(orderId);
// //       if (!sessionRes || !sessionRes.url) {
// //         throw new Error(sessionRes?.message || "Unable to start payment");
// //       }

// //       // 👉 இங்க தான் Stripe‑ஓட hosted page க்கு போறோம்
// //       window.location.href = sessionRes.url; // this is https://checkout.stripe.com/...
// //     }
// //   } catch (err) {
// //     console.error("Order creation failed:", err);
// //     alert("Failed to place order: " + (err.message || JSON.stringify(err)));
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// const handlePlaceOrder = async () => {
//   if (!paymentMethod) return alert("Select a payment method!");

//   const orderData = {
//     items: cartItems.map((item) => ({
//       productId: item.itemId || item._id,
//       name: item.name,
//       price: item.unitPrice,
//       qty: item.quantity,
//       image: item.image,
//     })),
//     shippingAddress: {
//       name: customer.name,
//       phone: customer.phone,
//       address: customer.address,
//       landmark: customer.landmark || "",
//     },
//     deliveryOption: customer.deliveryOption,
//     deliveryDate: customer.deliveryDate,
//     deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//     totalAmount: subtotal,
//   };

//   setLoading(true);
//   try {
//     const data = await createOrder(orderData);
//     if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

//     const { _id: orderId, totalAmount } = data.order;

//     // for fallback / OrderSuccess
//     localStorage.setItem("orderId", orderId);
//     localStorage.setItem("orderAmount", totalAmount);
//     localStorage.setItem("orderItems", JSON.stringify(data.order.items));

//     if (paymentMethod === "COD") {
//       // ✅ COD → Confirm order page
//       navigate("/confirm-order", { state: { order: data.order } });
//     } else if (paymentMethod === "Online") {
//       // ✅ Online (card) → Stripe Checkout (hosted page)
//       const sessionRes = await createCheckoutSession(orderId);
//       if (!sessionRes || !sessionRes.url) {
//         throw new Error(sessionRes?.message || "Unable to start payment");
//       }
//       window.location.href = sessionRes.url; // 👉 goes to https://checkout.stripe.com/...
//     }
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     alert("Failed to place order: " + (err.message || JSON.stringify(err)));
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Email:</strong> {customer.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <button onClick={() => navigate("/customer-details")} className="mt-2 text-blue-600 underline">
//             Edit Details
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map((item) => (
//             <div key={item.itemId || item._id} className="flex items-center justify-between border-b py-2">
//               <div className="flex items-center gap-3">
//                 <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.totalPrice ?? item.unitPrice * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-200"}`}>
//               Cash on Delivery
//             </button>
//             <button onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
//               Online Payment
//             </button>
//           </div>
//         </div>

//         <button onClick={handlePlaceOrder} disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}>
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder, createCheckoutSession } from "../api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load customer details + selected items
//   useEffect(() => {
//     // 1) Customer details
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) {
//       setCustomer(JSON.parse(savedCustomer));
//     } else {
//       navigate("/customer-details");
//       return;
//     }

//     // 2) Selected cart items
//     if (location.state?.items) {
//       setCartItems(location.state.items);
//     } else {
//       const savedItems = localStorage.getItem("selectedCartItems");
//       if (savedItems) {
//         setCartItems(JSON.parse(savedItems));
//       } else {
//         navigate("/cart");
//       }
//     }
//   }, [location.state, navigate]);

//   if (!customer || cartItems.length === 0) return null;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice ?? item.unitPrice * item.quantity),
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) {
//       alert("Select a payment method!");
//       return;
//     }

//     // Build order payload to match backend schema
//     const orderData = {
//       items: cartItems.map((item) => ({
//         productId: item.itemId || item._id,
//         name: item.name,
//         price: item.unitPrice,
//         qty: item.quantity,
//         image: item.image,
//       })),
//       shippingAddress: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//       },
//       // Required by backend Order schema
//       deliveryOption: customer.deliveryOption,   // e.g. "Weekly" / "Monthly"
//       deliveryDate: customer.deliveryDate,       // string; Mongoose will cast to Date
//       deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//       totalAmount: subtotal,
//     };

//     setLoading(true);
//     try {
//       const data = await createOrder(orderData); // POST /api/orders/create
//       if (!data || !data.order) {
//         throw new Error(data?.message || "Order creation failed");
//       }

//       const { _id: orderId, totalAmount } = data.order;

//       // Save for OrderSuccess fallback (especially for Stripe redirect)
//       localStorage.setItem("orderId", orderId);
//       localStorage.setItem("orderAmount", totalAmount);
//       localStorage.setItem("orderItems", JSON.stringify(data.order.items));

//       if (paymentMethod === "COD") {
//         // COD → Confirm order page
//         navigate("/confirm-order", { state: { order: data.order } });
//       } else if (paymentMethod === "Online") {
//         // Card → create Stripe Checkout Session & redirect to stripe.com
//         const sessionRes = await createCheckoutSession(orderId); // POST /api/payments/checkout-session
//         if (!sessionRes || !sessionRes.url) {
//           throw new Error(sessionRes?.message || "Unable to start payment");
//         }
//         window.location.href = sessionRes.url; // goes to https://checkout.stripe.com/...
//       }
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert("Failed to place order: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
//         <h2 className="text-2xl font-bold">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//           <p>
//             <strong>Name:</strong> {customer.name}
//           </p>
//           <p>
//             <strong>Phone:</strong> {customer.phone}
//           </p>
//           <p>
//             <strong>Address:</strong> {customer.address}
//           </p>
//           {customer.district && (
//             <p>
//               <strong>District:</strong> {customer.district}
//             </p>
//           )}
//           <p>
//             <strong>Delivery Date:</strong> {customer.deliveryDate}
//           </p>
//           <p>
//             <strong>Delivery Option:</strong> {customer.deliveryOption}
//           </p>
//           <button
//             onClick={() => navigate("/customer-details")}
//             className="mt-2 text-blue-600 underline"
//           >
//             Edit Details
//           </button>
//         </div>

//         {/* Selected Items */}
//         <div className="border p-4 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map((item) => (
//             <div
//               key={item.itemId || item._id}
//               className="flex items-center justify-between border-b py-2"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={item.image || "https://via.placeholder.com/60"}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.type}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p>Qty: {item.quantity}</p>
//                 <p>
//                   ₹{item.totalPrice ?? item.unitPrice * item.quantity}
//                 </p>
//               </div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">
//             Subtotal: ₹{subtotal}
//           </p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2">
//           <h3 className="text-lg font-semibold">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setPaymentMethod("COD")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${
//                 paymentMethod === "COD"
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               Cash on Delivery
//             </button>
//             <button
//               onClick={() => setPaymentMethod("Online")}
//               className={`w-1/2 py-2 rounded-lg font-semibold ${
//                 paymentMethod === "Online"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               Online Payment (Card)
//             </button>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-yellow-600 text-white hover:bg-yellow-700"
//           }`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// src/pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder, createCheckoutSession } from "../api";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [customer, setCustomer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Load customer details + selected items
  useEffect(() => {
    // 1) Customer details
    const savedCustomer = localStorage.getItem("customerDetails");
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    } else {
      navigate("/customer-details");
      return;
    }

    // 2) Selected cart items
    if (location.state?.items) {
      setCartItems(location.state.items);
    } else {
      const savedItems = localStorage.getItem("selectedCartItems");
      if (savedItems) {
        setCartItems(JSON.parse(savedItems));
      } else {
        navigate("/cart");
      }
    }
  }, [location.state, navigate]);

  if (!customer || cartItems.length === 0) return null;

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.totalPrice ?? item.unitPrice * (item.quantity || 1)),
    0
  );

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Select a payment method!");
      return;
    }

    // Build order payload to match backend schema
    const orderData = {
      items: cartItems.map((item) => ({
        productId: item.itemId || item._id,
        name: item.name,
        price: item.unitPrice,
        qty: item.quantity || 1,
        image: item.image,
        weightLabel: item.weightLabel || "",
        type: item.type || "",
      })),
      shippingAddress: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        landmark: customer.landmark || "",
      },
      // Required by backend Order schema
      deliveryOption: customer.deliveryOption, // e.g. "Weekly - 2 times"
      deliveryDate: customer.deliveryDate, // string; Mongoose will cast to Date
      deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
      totalAmount: subtotal,
    };

    setLoading(true);
    try {
      const data = await createOrder(orderData); // POST /api/orders/create
      if (!data || !data.order) {
        throw new Error(data?.message || "Order creation failed");
      }

      const { _id: orderId, totalAmount } = data.order;

      // Save for OrderSuccess fallback (especially for Stripe redirect)
      localStorage.setItem("orderId", orderId);
      localStorage.setItem("orderAmount", totalAmount);
      localStorage.setItem("orderItems", JSON.stringify(data.order.items));

      if (paymentMethod === "COD") {
        // COD → Confirm order page
        navigate("/confirm-order", { state: { order: data.order } });
      } else if (paymentMethod === "Online") {
        // Card → create Stripe Checkout Session & redirect to stripe.com
        const sessionRes = await createCheckoutSession(orderId); // POST /api/payments/checkout-session
        if (!sessionRes || !sessionRes.url) {
          throw new Error(sessionRes?.message || "Unable to start payment");
        }
        window.location.href = sessionRes.url; // goes to https://checkout.stripe.com/...
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to place order: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-6" style={{paddingTop:"100px",width:"800px",marginLeft:"550px"}}>
      <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow space-y-6 bg-green-100" >
        <h2 className="text-2xl font-bold">Checkout</h2>

        {/* Customer Details */}
        <div className="border p-4 rounded bg-white" >
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          {customer.district && (
            <p>
              <strong>District:</strong> {customer.district}
            </p>
          )}
          <p>
            <strong>Delivery Date:</strong> {customer.deliveryDate}
          </p>
          <p>
            <strong>Delivery Option:</strong> {customer.deliveryOption}
          </p>
          <button
            onClick={() => navigate("/customer-details")}
            className="mt-2 text-blue-600 underline"
          >
            Edit Details
          </button>
        </div>

        {/* Selected Items */}
        <div className="border p-4 rounded bg-white">
          <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
          {cartItems.map((item, index) => {
            const isVeg = item.type === "vegetable";

            // Qty label (same logic as Cart)
            let qtyLabel;
            if (isVeg && item.weightLabel) {
              if ((item.quantity || 1) > 1) {
                qtyLabel = `${item.quantity} × ${item.weightLabel}`;
              } else {
                qtyLabel = item.weightLabel;
              }
            } else {
              qtyLabel = item.quantity || 1;
            }

            const lineTotal =
              item.totalPrice ??
              item.unitPrice * (item.quantity || 1);

            return (
              <div
                key={item.itemId || item._id || index}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p>Qty: {qtyLabel}</p>
                  <p>LKR:{lineTotal}</p>
                </div>
              </div>
            );
          })}
          <p className="text-right font-semibold mt-2">
            Subtotal: Rs.{subtotal.toFixed(2)}
          </p>
        </div>

        {/* Payment Method */}
        <div className="border p-4 rounded space-y-2 bg-white">
          <h3 className="text-lg font-semibold">Select Payment Method</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("COD")}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                paymentMethod === "COD"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod("Online")}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                paymentMethod === "Online"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Online Payment (Card)
            </button>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-yellow-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}