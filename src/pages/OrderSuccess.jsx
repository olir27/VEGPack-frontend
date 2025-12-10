// import { useLocation, useNavigate } from "react-router-dom";

// export default function OrderSuccess() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 text-center max-w-lg mx-auto">
//       <h2 className="text-3xl font-bold text-green-600">
//         🎉 Order Successful!
//       </h2>

//       <p className="mt-3 text-gray-700">
//         Your order has been placed successfully.
//       </p>

//       <div className="bg-white p-4 rounded shadow mt-4 space-y-2">
//         <p><b>Payment Method:</b> {state?.method}</p>
//         <p><b>Total Paid:</b> ₹{state?.total}</p>
//         <p><b>Delivery Address:</b></p>
//         <p>{state?.address}</p>
//       </div>

//       <button
//         onClick={() => navigate("/")}
//         className="bg-green-600 text-white px-4 py-2 rounded mt-5"
//       >
//         Go to Home
//       </button>
//     </div>
//   );
// }



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function OrderSuccessful() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Clear cart & checkout info
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("checkoutSubtotal");
//     localStorage.removeItem("checkoutPaymentMethod");
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow max-w-md text-center space-y-4">
//         <h2 className="text-2xl font-bold text-green-600">Order Successful!</h2>
//         <p>Thank you for your purchase. Your order has been placed successfully.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//         >
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// export default function OrderSuccess() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const order = state?.order || {};
//   return (
//     <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow max-w-xl text-center">
//         <h2 className="text-2xl font-bold mb-2">Order Placed</h2>
//         <p className="mb-4">Thank you — your order was placed successfully.</p>
//         <p><strong>Order ID:</strong> {order._id || order.orderId}</p>
//         <div className="mt-6">
//           <button onClick={() => navigate("/profile")} className="px-4 py-2 rounded bg-blue-600 text-white">View Orders</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate } from "react-router-dom";

// export default function OrderSuccess() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const order = state?.order || {};
//   const orderId = order._id || order.orderId || state?.orderId; // 🔴 add this

//   return (
//     <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow max-w-xl text-center">
//         <h2 className="text-2xl font-bold mb-2">Order Placed</h2>
//         <p className="mb-4">Thank you — your order was placed successfully.</p>
        
//         <p><strong>Order ID:</strong> {orderId}</p>

//         <div className="mt-6">
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded bg-blue-600 text-white"
//           >
//             View Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";

// export default function OrderSuccess() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     let initialOrder = null;

//     if (state?.order) {
//       // COD / Card இரண்டிலும் இப்போ வந்துடும்
//       initialOrder = state.order;
//     } else {
//       // fallback: localStorage use pannalam (browser refresh போன்ற case)
//       const id = state?.orderId || localStorage.getItem("orderId");
//       const amount = localStorage.getItem("orderAmount");
//       const items = JSON.parse(localStorage.getItem("orderItems") || "[]");

//       if (!id || !items.length) {
//         navigate("/");
//         return;
//       }

//       initialOrder = {
//         _id: id,
//         totalAmount: amount,
//         items,
//       };
//     }

//     setOrder(initialOrder);

//     // Temp data clear
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("orderId");
//     localStorage.removeItem("orderAmount");
//     localStorage.removeItem("orderItems");
//   }, [state, navigate]);

//   if (!order) return null;

//   const address = order.shippingAddress || {};
//   const orderId = order._id || order.orderId;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={28} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               Order Placed Successfully!
//             </h2>
//             <p className="text-gray-500 mt-1">
//               Thank you for shopping with <span className="font-semibold">VEGPack</span>.
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
//             <p className="font-semibold text-gray-800 break-all">{orderId}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</p>
//             <p className="font-semibold text-green-700 text-lg">₹{order.totalAmount}</p>
//           </div>
//           {order.paymentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">Payment</p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                 {order.paymentStatus}
//               </span>
//             </div>
//           )}
//           {order.shipmentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">Shipment</p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//                 {order.shipmentStatus}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Items list */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-gray-800">
//             Products in your order
//           </h3>
//           <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//             {order.items?.map((item, idx) => {
//               const qty = item.qty ?? item.quantity ?? 1;
//               return (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
//                 >
//                   <img
//                     src={item.image || "https://via.placeholder.com/80"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-md border"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">{item.name}</p>
//                     <p className="text-sm text-gray-500">Qty: {qty}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Price</p>
//                     <p className="font-semibold text-gray-800">
//                       ₹{item.price * qty}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Address (if available) */}
//         {address?.address && (
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Delivery Address
//             </h3>
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">{address.name}</span>
//               {address.phone && <> · {address.phone}</>}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{address.address}</p>
//             {address.landmark && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Landmark: {address.landmark}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap justify-between gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const state = location.state || {};
//     let o = state.order || null;

//     // Stripe Checkout redirect – no state, only query params & localStorage
//     if (!o) {
//       const orderIdFromQuery = searchParams.get("orderId");
//       const items = JSON.parse(localStorage.getItem("orderItems") || "[]");
//       const totalAmount = localStorage.getItem("orderAmount");

//       if (orderIdFromQuery && items.length) {
//         o = { _id: orderIdFromQuery, items, totalAmount };
//       }
//     }

//     if (!o) {
//       navigate("/");
//       return;
//     }

//     setOrder(o);

//     // clear temp order data
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("orderId");
//     localStorage.removeItem("orderAmount");
//     localStorage.removeItem("orderItems");
//   }, [location.state, searchParams, navigate]);

//   if (!order) return null;

//   const orderId = order._id || order.orderId;
//   const address = order.shippingAddress || {};

//   // 🔴 Online payment ஆனதா? Stripe Checkout session_id / paid flag check
//   const hasStripeSession = !!searchParams.get("session_id");
//   const paidFlag = searchParams.get("paid") === "1";
//   // const hasPaymentIntent = !!location.state?.paymentIntent;
//   const isOnlinePaid = hasStripeSession || paidFlag;

//   // message:
// {isOnlinePaid
//   ? "Your online payment was successful and your order is confirmed."
//   : "Your order has been placed. Please keep cash ready for delivery."
// }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={28} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               Order Placed Successfully!
//             </h2>
//             {isOnlinePaid ? (
//               <p className="text-green-600 mt-1 font-semibold">
//                 Your online payment was successful and your order is confirmed.
//               </p>
//             ) : (
//               <p className="text-gray-600 mt-1">
//                 Your order has been placed. Please keep cash ready for delivery.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">
//               {orderId}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Total Amount
//             </p>
//             <p className="font-semibold text-green-700 text-lg">
//               ₹{order.totalAmount}
//             </p>
//           </div>
//         </div>

//         {/* Items list */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-gray-800">
//             Products in your order
//           </h3>
//           <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//             {order.items?.map((item, idx) => {
//               const qty = item.qty ?? item.quantity ?? 1;
//               return (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
//                 >
//                   <img
//                     src={item.image || "https://via.placeholder.com/80"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-md border"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">{item.name}</p>
//                     <p className="text-sm text-gray-500">Qty: {qty}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Price</p>
//                     <p className="font-semibold text-gray-800">
//                       ₹{item.price * qty}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Delivery address */}
//         {address?.address && (
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Delivery Address
//             </h3>
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">{address.name}</span>
//               {address.phone && <> · {address.phone}</>}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{address.address}</p>
//             {address.landmark && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Landmark: {address.landmark}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap justify-between gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";

// export default function OrderSuccess() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // Stripe success_urlல் இருந்து வரும் query params
//   const orderId = searchParams.get("orderId");
//   const paid = searchParams.get("paid") === "1";
//   const sessionId = searchParams.get("session_id");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
//         {/* Icon + Heading */}
//         <div className="flex flex-col items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {paid ? "Payment Successful" : "Order Placed"}
//             </h2>
//             <p className="text-gray-600 mt-1">
//               {paid
//                 ? "Your online payment was successful and your order has been confirmed."
//                 : "Your order has been placed successfully."}
//             </p>
//           </div>
//         </div>

//         {/* Order Info */}
//         <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
//           <p className="text-xs text-gray-500 uppercase tracking-wide">
//             Order ID
//           </p>
//           <p className="font-semibold text-gray-800 break-all">
//             {orderId || "Not available"}
//           </p>

//           {sessionId && (
//             <>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mt-3">
//                 Stripe Session
//               </p>
//               <p className="text-xs text-gray-500 break-all">
//                 {sessionId}
//               </p>
//             </>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // 1️⃣ COD flow: ConfirmOrder.jsx -> navigate("/order-success", { state: { order } })
//   const orderFromState = location.state?.order || null;

//   // Debug log (optional, first time check panna)
//   console.log("OrderSuccess orderFromState:", orderFromState);

//   // 2️⃣ Card / Stripe flow: ?orderId=...&paid=1&session_id=...
//   const orderIdFromQuery = searchParams.get("orderId");
//   const paidFlagFromQuery = searchParams.get("paid") === "1";
//   const sessionId = searchParams.get("session_id");

//   // 3️⃣ Final Order ID (CODக்கு stateல இருந்து, Cardக்கு queryல இருந்து)
//   const orderId =
//     orderFromState?._id ||
//     orderFromState?.orderId ||
//     orderIdFromQuery ||
//     "";

//   // 4️⃣ Payment type detect
//   const isOnlinePaid =
//     paidFlagFromQuery ||
//     orderFromState?.paymentStatus === "Paid" ||
//     orderFromState?.deliveryMethod === "CARD";

//   const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
//   const subtitle = isOnlinePaid
//     ? "Your online payment was successful and your order has been confirmed."
//     : "Your order has been placed successfully. Please keep cash ready for delivery.";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
//         {/* Icon + Heading */}
//         <div className="flex flex-col items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {title}
//             </h2>
//             <p className="text-gray-600 mt-1">{subtitle}</p>
//           </div>
//         </div>

//         {/* Order Info */}
//         <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">
//               {orderId || "Not available"}
//             </p>
//           </div>

//           {sessionId && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
//                 Stripe Session
//               </p>
//               <p className="text-xs text-gray-500 break-all">
//                 {sessionId}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // 1️⃣ COD flow: ConfirmOrder.jsx -> navigate("/order-success", { state: { order } })
//   const orderFromState = location.state?.order || null;

//   // Debug log (optional, first time check panna)
//   console.log("OrderSuccess orderFromState:", orderFromState);

//   // 2️⃣ Card / Stripe flow: ?orderId=...&paid=1&session_id=...
//   const orderIdFromQuery = searchParams.get("orderId");
//   const paidFlagFromQuery = searchParams.get("paid") === "1";
//   const sessionId = searchParams.get("session_id");

//   // 3️⃣ Final Order ID (CODக்கு stateல இருந்து, Cardக்கு queryல இருந்து)
//   const orderId =
//     orderFromState?._id ||
//     orderFromState?.orderId ||
//     orderIdFromQuery ||
//     "";

//   // 4️⃣ Payment type detect
//   const isOnlinePaid =
//     paidFlagFromQuery ||
//     orderFromState?.paymentStatus === "Paid" ||
//     orderFromState?.deliveryMethod === "CARD";

//   const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
//   const subtitle = isOnlinePaid
//     ? "Your online payment was successful and your order has been confirmed."
//     : "Your order has been placed successfully. Please keep cash ready for delivery.";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
//         {/* Icon + Heading */}
//         <div className="flex flex-col items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {title}
//             </h2>
//             <p className="text-gray-600 mt-1">{subtitle}</p>
//           </div>
//         </div>

//         {/* Order Info */}
//         <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">
//               {orderId || "Not available"}
//             </p>
//           </div>

//           {sessionId && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
//                 Stripe Session
//               </p>
//               <p className="text-xs text-gray-500 break-all">
//                 {sessionId}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { confirmCheckoutSession } from "../api";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [order, setOrder] = useState(null);
//   const [confirming, setConfirming] = useState(false);

//   // 1️⃣ Order data load (COD: state.order, Card: localStorage + query)
//   useEffect(() => {
//     const state = location.state || {};
//     let o = state.order || null;

//     // If no order in state (Stripe Checkout redirect case)
//     if (!o) {
//       const orderIdFromQuery = searchParams.get("orderId");
//       const items = JSON.parse(localStorage.getItem("orderItems") || "[]");
//       const totalAmount = localStorage.getItem("orderAmount");

//       if (orderIdFromQuery && items.length) {
//         o = { _id: orderIdFromQuery, items, totalAmount };
//       }
//     }

//     if (!o) {
//       // nothing to show
//       navigate("/");
//       return;
//     }

//     setOrder(o);

//     // clear temp data (cart & temp order info)
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("orderId");
//     localStorage.removeItem("orderAmount");
//     localStorage.removeItem("orderItems");
//   }, [location.state, searchParams, navigate]);

//   // 2️⃣ Stripe Checkout session confirm → backend update (Paid, shipment, payment record, email, cart clear)
//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     if (!sessionId) return;

//     (async () => {
//       try {
//         setConfirming(true);
//         const res = await confirmCheckoutSession(sessionId); // POST /api/payments/checkout-success
//         if (res?.success && res.order) {
//           // Merge updated order (especially paymentStatus, shipmentStatus)
//           setOrder((prev) => ({
//             ...(prev || {}),
//             ...res.order,
//           }));
//         }
//       } catch (e) {
//         console.error("Checkout confirm failed:", e);
//       } finally {
//         setConfirming(false);
//       }
//     })();
//   }, [searchParams]);

//   if (!order) return null;

//   // 3️⃣ Compute orderId, payment type, totals
//   const orderIdFromQuery = searchParams.get("orderId");
//   const orderId = order._id || order.orderId || orderIdFromQuery || "";

//   const paidFlagFromQuery = searchParams.get("paid") === "1";
//   const isOnlinePaid =
//     paidFlagFromQuery ||
//     order.paymentStatus === "Paid" ||
//     order.deliveryMethod === "CARD";

//   const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
//   const subtitle = isOnlinePaid
//     ? "Your online payment was successful and your order has been confirmed."
//     : "Your order has been placed successfully. Please keep cash ready for delivery.";

//   const items = order.items || [];
//   const computedTotal =
//     order.totalAmount ??
//     items.reduce((sum, item) => {
//       const qty = item.qty ?? item.quantity ?? 1;
//       return sum + (item.price || 0) * qty;
//     }, 0);

//   const address = order.shippingAddress || {};
//   const sessionId = searchParams.get("session_id");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {title}
//             </h2>
//             <p className="text-gray-600 mt-1">{subtitle}</p>
//             {confirming && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Updating payment status...
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">
//               {orderId || "Not available"}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Total Amount
//             </p>
//             <p className="font-semibold text-green-700 text-lg">
//               ₹{computedTotal}
//             </p>
//           </div>
//           {order.paymentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Payment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                 {order.paymentStatus}
//               </span>
//             </div>
//           )}
//           {order.shipmentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Shipment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//                 {order.shipmentStatus}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Items list with images */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-gray-800">
//             Products in your order
//           </h3>
//           <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//             {items.map((item, idx) => {
//               const qty = item.qty ?? item.quantity ?? 1;
//               return (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
//                 >
//                   <img
//                     src={item.image || "https://via.placeholder.com/80"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-md border"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">{item.name}</p>
//                     <p className="text-sm text-gray-500">Qty: {qty}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Price</p>
//                     <p className="font-semibold text-gray-800">
//                       ₹{(item.price || 0) * qty}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Address */}
//         {address?.address && (
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Delivery Address
//             </h3>
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">{address.name}</span>
//               {address.phone && <> · {address.phone}</>}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{address.address}</p>
//             {address.landmark && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Landmark: {address.landmark}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Stripe session info (optional debug) */}
//         {sessionId && (
//           <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 break-all">
//             Stripe Session ID: {sessionId}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap justify-between gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { confirmCheckoutSession } from "../api";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [order, setOrder] = useState(null);
//   const [confirming, setConfirming] = useState(false);

//   // 1️⃣ Try to build order object from state + localStorage + query
//   useEffect(() => {
//     const stateOrder = location.state?.order || null;
//     const orderIdFromQuery = searchParams.get("orderId");
//     const itemsFromLS = JSON.parse(localStorage.getItem("orderItems") || "[]");
//     const totalFromLS = localStorage.getItem("orderAmount");

//     let combined = stateOrder || null;

//     // If no order in state (Stripe redirect), try to build minimal order
//     if (!combined && (orderIdFromQuery || itemsFromLS.length || totalFromLS)) {
//       combined = {
//         ...(orderIdFromQuery ? { _id: orderIdFromQuery } : {}),
//         ...(itemsFromLS.length ? { items: itemsFromLS } : {}),
//         ...(totalFromLS ? { totalAmount: Number(totalFromLS) } : {}),
//       };
//     }

//     // Even if combined null, we DON'T redirect home – just show generic success
//     setOrder(combined || {});

//     // clear temp data (safe)
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("orderId");
//     localStorage.removeItem("orderAmount");
//     localStorage.removeItem("orderItems");
//   }, [location.state, searchParams]);

//   // 2️⃣ If Stripe Checkout used, confirm session with backend (updates Paid, shipment, etc.)
//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     if (!sessionId) return;

//     (async () => {
//       try {
//         setConfirming(true);
//         const res = await confirmCheckoutSession(sessionId);
//         if (res?.success && res.order) {
//           setOrder((prev) => ({
//             ...(prev || {}),
//             ...res.order,
//           }));
//         }
//       } catch (e) {
//         console.error("Checkout confirm failed:", e);
//       } finally {
//         setConfirming(false);
//       }
//     })();
//   }, [searchParams]);

//   // 3️⃣ Derive fields
//   const orderIdFromQuery = searchParams.get("orderId");
//   const sessionId = searchParams.get("session_id");
//   const paidFlagFromQuery = searchParams.get("paid") === "1";

//   const orderId =
//     order?._id || order?.orderId || orderIdFromQuery || "Not available";

//   const isOnlinePaid =
//     paidFlagFromQuery ||
//     order?.paymentStatus === "Paid" ||
//     order?.deliveryMethod === "CARD";

//   const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
//   const subtitle = isOnlinePaid
//     ? "Your online payment was successful and your order has been confirmed."
//     : "Your order has been placed successfully. Please keep cash ready for delivery.";

//   const items = order?.items || [];
//   const computedTotal =
//     order?.totalAmount ??
//     items.reduce((sum, item) => {
//       const qty = item.qty ?? item.quantity ?? 1;
//       return sum + (item.price || 0) * qty;
//     }, 0);

//   const address = order?.shippingAddress || {};

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {title}
//             </h2>
//             <p className="text-gray-600 mt-1">{subtitle}</p>
//             {confirming && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Updating payment status...
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">{orderId}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Total Amount
//             </p>
//             <p className="font-semibold text-green-700 text-lg">
//               ₹{computedTotal || 0}
//             </p>
//           </div>
//           {order?.paymentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Payment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                 {order.paymentStatus}
//               </span>
//             </div>
//           )}
//           {order?.shipmentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Shipment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//                 {order.shipmentStatus}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Items list (if available) */}
//         {items.length > 0 && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">
//               Products in your order
//             </h3>
//             <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//               {items.map((item, idx) => {
//                 const qty = item.qty ?? item.quantity ?? 1;
//                 return (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
//                   >
//                     <img
//                       src={item.image || "https://via.placeholder.com/80"}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">{item.name}</p>
//                       <p className="text-sm text-gray-500">Qty: {qty}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500">Price</p>
//                       <p className="font-semibold text-gray-800">
//                         ₹{(item.price || 0) * qty}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Address (if available) */}
//         {address?.address && (
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Delivery Address
//             </h3>
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">{address.name}</span>
//               {address.phone && <> · {address.phone}</>}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{address.address}</p>
//             {address.landmark && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Landmark: {address.landmark}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Stripe session info (optional) */}
//         {sessionId && (
//           <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 break-all">
//             Stripe Session ID: {sessionId}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap justify-between gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/pages/OrderSuccess.jsx
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { confirmCheckoutSession } from "../api";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [order, setOrder] = useState(null);
  const [confirming, setConfirming] = useState(false);

  // 1️⃣ State + localStorage + query எல்லாம் சேர்த்து order object தயாரிக்க
  useEffect(() => {
    const stateOrder = location.state?.order || null;
    const orderIdFromQuery = searchParams.get("orderId");
    const itemsFromLS = JSON.parse(localStorage.getItem("orderItems") || "[]");
    const totalFromLS = localStorage.getItem("orderAmount");

    let combined = stateOrder || null;

    if (!combined && (orderIdFromQuery || itemsFromLS.length || totalFromLS)) {
      combined = {
        ...(orderIdFromQuery ? { _id: orderIdFromQuery } : {}),
        ...(itemsFromLS.length ? { items: itemsFromLS } : {}),
        ...(totalFromLS ? { totalAmount: Number(totalFromLS) } : {}),
      };
    }

    setOrder(combined || {});

    // clean up
    localStorage.removeItem("selectedCartItems");
    localStorage.removeItem("orderId");
    localStorage.removeItem("orderAmount");
    localStorage.removeItem("orderItems");
  }, [location.state, searchParams]);

  // 2️⃣ Stripe Checkout session confirm (if session_id present)
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    (async () => {
      try {
        setConfirming(true);
        const res = await confirmCheckoutSession(sessionId);
        if (res?.success && res.order) {
          setOrder((prev) => ({
            ...(prev || {}),
            ...res.order,
          }));
        }
      } catch (e) {
        console.error("Checkout confirm failed:", e);
      } finally {
        setConfirming(false);
      }
    })();
  }, [searchParams]);

  // 3️⃣ Derived fields
  const orderIdFromQuery = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const paidFlagFromQuery = searchParams.get("paid") === "1";

  const orderId =
    order?._id || order?.orderId || orderIdFromQuery || "Not available";

  const isOnlinePaid =
    paidFlagFromQuery ||
    order?.paymentStatus === "Paid" ||
    order?.deliveryMethod === "CARD";

  const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
  const subtitle = isOnlinePaid
    ? "Your online payment was successful and your order has been confirmed."
    : "Your order has been placed successfully. Please keep cash ready for delivery.";

  const items = order?.items || [];

  const computedTotal =
    order?.totalAmount ??
    items.reduce((sum, item) => {
      const qty = item.qty ?? item.quantity ?? 1;
      return sum + (item.price || 0) * qty;
    }, 0);

  const address = order?.shippingAddress || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10" style={{paddingTop:"80px"}}>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-3">
            <FaCheckCircle className="text-green-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title}
            </h2>
            <p className="text-gray-600 mt-1">{subtitle}</p>
            {confirming && (
              <p className="text-xs text-gray-500 mt-1">
                Updating payment status...
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Order ID
            </p>
            <p className="font-semibold text-gray-800 break-all">{orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Amount
            </p>
            <p className="font-semibold text-green-700 text-lg">
              ₹{computedTotal || 0}
            </p>
          </div>
          {order?.paymentStatus && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Payment
              </p>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                {order.paymentStatus}
              </span>
            </div>
          )}
          {order?.shipmentStatus && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Shipment
              </p>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                {order.shipmentStatus}
              </span>
            </div>
          )}
        </div>

        {/* Items list */}
        {items.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Products in your order
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item, idx) => {
                const qty = item.qty ?? item.quantity ?? 1;

                // ✅ Qty label – vegetable weight support
                let qtyLabel;
                if (item.type === "vegetable" && item.weightLabel) {
                  if (qty > 1) {
                    qtyLabel = `${qty} × ${item.weightLabel}`;
                  } else {
                    qtyLabel = item.weightLabel;
                  }
                } else {
                  qtyLabel = qty;
                }

                const lineTotal = (item.price || 0) * qty;

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.type || "product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {qtyLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-semibold text-gray-800">
                        LKR {lineTotal || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Address */}
        {address?.address && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delivery Address
            </h3>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{address.name}</span>
              {address.phone && <> · {address.phone}</>}
            </p>
            <p className="text-sm text-gray-600 mt-1">{address.address}</p>
            {address.landmark && (
              <p className="text-xs text-gray-500 mt-1">
                Landmark: {address.landmark}
              </p>
            )}
          </div>
        )}

        {/* Stripe session info (optional) */}
        {sessionId && (
          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 break-all">
            Stripe Session ID: {sessionId}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}