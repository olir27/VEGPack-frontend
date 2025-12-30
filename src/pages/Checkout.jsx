

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
//     (sum, item) =>
//       sum + (item.totalPrice ?? item.unitPrice * (item.quantity || 1)),
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
//         qty: item.quantity || 1,
//         image: item.image,
//         weightLabel: item.weightLabel || "",
//         type: item.type || "",
//       })),
//       shippingAddress: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//       },
//       // Required by backend Order schema
//       deliveryOption: customer.deliveryOption, // e.g. "Weekly - 2 times"
//       deliveryDate: customer.deliveryDate, // string; Mongoose will cast to Date
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
//     <div className="min-h-screen  p-6" style={{paddingTop:"100px",width:"800px",marginLeft:"550px"}}>
//       <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow space-y-6 bg-green-100" >
//         <h2 className="text-2xl font-bold">Checkout</h2>

//         {/* Customer Details */}
//         <div className="border p-4 rounded bg-white" >
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
//         <div className="border p-4 rounded bg-white">
//           <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
//           {cartItems.map((item, index) => {
//             const isVeg = item.type === "vegetable";

//             // Qty label (same logic as Cart)
//             let qtyLabel;
//             if (isVeg && item.weightLabel) {
//               if ((item.quantity || 1) > 1) {
//                 qtyLabel = `${item.quantity} × ${item.weightLabel}`;
//               } else {
//                 qtyLabel = item.weightLabel;
//               }
//             } else {
//               qtyLabel = item.quantity || 1;
//             }

//             const lineTotal =
//               item.totalPrice ??
//               item.unitPrice * (item.quantity || 1);

//             return (
//               <div
//                 key={item.itemId || item._id || index}
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
//                     <p className="text-sm text-gray-500 capitalize">
//                       {item.type}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p>Qty: {qtyLabel}</p>
//                   <p>LKR:{lineTotal}</p>
//                 </div>
//               </div>
//             );
//           })}
//           <p className="text-right font-semibold mt-2">
//             Subtotal: Rs.{subtotal.toFixed(2)}
//           </p>
//         </div>

//         {/* Payment Method */}
//         <div className="border p-4 rounded space-y-2 bg-white">
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
//               : "bg-green-600 text-white hover:bg-yellow-700"
//           }`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder, createCheckoutSession } from "../api";
// import { 
//   CreditCard, 
//   Banknote, 
//   MapPin, 
//   Phone, 
//   User, 
//   Calendar, 
//   CheckCircle2, 
//   ShieldCheck, 
//   ArrowRight,
//   Loader2,
//   Edit2,
//   ShoppingBag
// } from "lucide-react";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // --- Logic remains the same ---
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) {
//       setCustomer(JSON.parse(savedCustomer));
//     } else {
//       navigate("/customer-details");
//       return;
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

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice ?? item.unitPrice * (item.quantity || 1)),
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method to proceed.");
//       return;
//     }

//     const orderData = {
//       items: cartItems.map((item) => ({
//         productId: item.itemId || item._id,
//         name: item.name,
//         price: item.unitPrice,
//         qty: item.quantity || 1,
//         image: item.image,
//         weightLabel: item.weightLabel || "",
//         type: item.type || "",
//       })),
//       shippingAddress: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//       },
//       deliveryOption: customer.deliveryOption,
//       deliveryDate: customer.deliveryDate,
//       deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//       totalAmount: subtotal,
//     };

//     setLoading(true);
//     try {
//       const data = await createOrder(orderData);
//       if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

//       const { _id: orderId, totalAmount } = data.order;

//       localStorage.setItem("orderId", orderId);
//       localStorage.setItem("orderAmount", totalAmount);
//       localStorage.setItem("orderItems", JSON.stringify(data.order.items));

//       if (paymentMethod === "COD") {
//         navigate("/confirm-order", { state: { order: data.order } });
//       } else if (paymentMethod === "Online") {
//         const sessionRes = await createCheckoutSession(orderId);
//         if (!sessionRes || !sessionRes.url) throw new Error("Payment initialization failed");
//         window.location.href = sessionRes.url;
//       }
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <h1 className="text-3xl font-extrabold text-gray-900">Secure Checkout</h1>
//           <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
//             <ShieldCheck size={16} />

//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

//           {/* --- LEFT COLUMN: Details & Payment --- */}
//           <div className="lg:col-span-7 space-y-6">

//             {/* 1. Shipping Information */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                   <MapPin size={20} className="text-gray-500" /> Shipping Details
//                 </h2>
//                 <button 
//                   onClick={() => navigate("/customer-details")}
//                   className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                 >
//                   <Edit2 size={14} /> Edit
//                 </button>
//               </div>

//               <div className="p-6 grid sm:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <User size={18} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Name</p>
//                       <p className="font-medium text-gray-900">{customer.name}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Phone size={18} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone</p>
//                       <p className="font-medium text-gray-900">{customer.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <MapPin size={18} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Address</p>
//                       <p className="font-medium text-gray-900">{customer.address}</p>
//                       {customer.landmark && <p className="text-sm text-gray-500 mt-1">Near: {customer.landmark}</p>}
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Calendar size={18} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Expected Delivery</p>
//                       <p className="font-medium text-green-700">{customer.deliveryDate}</p>
//                       <p className="text-xs text-gray-500">{customer.deliveryOption}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Payment Method */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden" style={{marginBottom:"50px"}}>
//                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                   <CreditCard size={20} className="text-gray-500" /> Payment Method
//                 </h2>
//               </div>

//               <div className="p-6 space-y-4">

//                 {/* Option: COD */}
//                 <div 
//                   onClick={() => setPaymentMethod("COD")}
//                   className={`relative group flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
//                     paymentMethod === "COD" 
//                     ? "border-green-500 bg-green-50/50" 
//                     : "border-gray-200 hover:border-green-200 bg-white"
//                   }`}
//                 >
//                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "COD" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
//                     <Banknote size={24} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900">Cash on Delivery</p>
//                     <p className="text-sm text-gray-500">Pay with cash when your order arrives.</p>
//                   </div>
//                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "COD" ? "border-green-600" : "border-gray-300"}`}>
//                     {paymentMethod === "COD" && <div className="w-3 h-3 bg-green-600 rounded-full" />}
//                   </div>
//                 </div>

//                 {/* Option: Online */}
//                 <div 
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`relative group flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
//                     paymentMethod === "Online" 
//                     ? "border-blue-500 bg-blue-50/50" 
//                     : "border-gray-200 hover:border-blue-200 bg-white"
//                   }`}
//                 >
//                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "Online" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
//                     <CreditCard size={24} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900">Online Payment</p>
//                     <p className="text-sm text-gray-500">Secure payment via Stripe (Credit/Debit Card).</p>
//                   </div>
//                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "Online" ? "border-blue-600" : "border-gray-300"}`}>
//                     {paymentMethod === "Online" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* --- RIGHT COLUMN: Order Summary --- */}
//           <div className="lg:col-span-5">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <ShoppingBag size={20} /> Order Summary
//               </h2>

//               {/* Items List (Scrollable if needed) */}
//               <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
//                 {cartItems.map((item, index) => {
//                   const lineTotal = item.totalPrice ?? item.unitPrice * (item.quantity || 1);
//                   const qtyLabel = item.weightLabel 
//                     ? ((item.quantity > 1) ? `${item.quantity} x ${item.weightLabel}` : item.weightLabel)
//                     : item.quantity;

//                   return (
//                     <div key={index} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
//                       <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                         <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</p>
//                           <p className="font-bold text-gray-900 text-sm">Rs.{lineTotal}</p>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1 capitalize">{item.type}</p>
//                         <p className="text-xs text-gray-600 mt-1">Qty: {qtyLabel}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping & Handling</span>
//                   <span className="font-medium text-green-600">Free</span>
//                 </div>

//                 <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-300 mt-4">
//                   <span className="text-lg font-bold text-gray-900">Total to Pay</span>
//                   <span className="text-2xl font-extrabold text-gray-900">Rs.{subtotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Place Order Button */}
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98] ${
//                   loading 
//                     ? "bg-gray-300 text-gray-500 cursor-wait" 
//                     : paymentMethod 
//                       ? "bg-gray-900 text-white hover:bg-black hover:shadow-xl" 
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" /> Processing...
//                   </>
//                 ) : (
//                   <>
//                     Confirm Order <ArrowRight size={20} />
//                   </>
//                 )}
//               </button>

//               {!paymentMethod && (
//                 <p className="text-center text-xs text-red-500 mt-3 font-medium">
//                   * Please select a payment method above
//                 </p>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createOrder, createCheckoutSession } from "../api";
// import { 
//   CreditCard, 
//   Banknote, 
//   MapPin, 
//   Phone, 
//   User, 
//   Calendar, 
//   ShieldCheck, 
//   ArrowRight,
//   Loader2,
//   Edit2,
//   ShoppingBag,
//   Sparkles
// } from "lucide-react";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   // --- Logic Same as before ---
//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     if (savedCustomer) {
//       setCustomer(JSON.parse(savedCustomer));
//     } else {
//       navigate("/customer-details");
//       return;
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

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.totalPrice ?? item.unitPrice * (item.quantity || 1)),
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method!");
//       return;
//     }

//     const orderData = {
//       items: cartItems.map((item) => ({
//         productId: item.itemId || item._id,
//         name: item.name,
//         price: item.unitPrice,
//         qty: item.quantity || 1,
//         image: item.image,
//         weightLabel: item.weightLabel || "",
//         type: item.type || "",
//       })),
//       shippingAddress: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address,
//         landmark: customer.landmark || "",
//       },
//       deliveryOption: customer.deliveryOption,
//       deliveryDate: customer.deliveryDate,
//       deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
//       totalAmount: subtotal,
//     };

//     setLoading(true);
//     try {
//       const data = await createOrder(orderData);
//       if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

//       const { _id: orderId, totalAmount } = data.order;
//       localStorage.setItem("orderId", orderId);
//       localStorage.setItem("orderAmount", totalAmount);
//       localStorage.setItem("orderItems", JSON.stringify(data.order.items));

//       if (paymentMethod === "COD") {
//         navigate("/confirm-order", { state: { order: data.order } });
//       } else if (paymentMethod === "Online") {
//         const sessionRes = await createCheckoutSession(orderId);
//         if (sessionRes?.url) window.location.href = sessionRes.url;
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Failed to place order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // Background with soft Green Gradient
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 font-sans text-gray-800 pt-28 pb-12 px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* Page Title */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//           <div>
//             <h1 className="text-4xl font-extrabold text-emerald-900 drop-shadow-sm flex items-center gap-3">
//               <Sparkles className="text-yellow-500 fill-yellow-500" /> Checkout
//             </h1>
//             <p className="text-emerald-700 mt-2 font-medium">Almost there! Complete your order.</p>
//           </div>

//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-emerald-700 border border-emerald-100">
//             <ShieldCheck className="w-5 h-5 text-emerald-500" />
//             <span className="text-sm font-bold">100% Secure Payment</span>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-8 items-start">

//           {/* --- LEFT SIDE: Forms --- */}
//           <div className="lg:col-span-7 space-y-8">

//             {/* 1. Shipping Details Card */}
//             <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 overflow-hidden">
//               {/* Colorful Header */}
//               <div className=" px-6 py-4 flex justify-between items-center" style={{backgroundColor:"#4d3407ff"}}>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">
//                   <MapPin className="text-emerald-200" /> Shipping Address
//                 </h2>
//                 <button 
//                   onClick={() => navigate("/customer-details")}
//                   className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm transition flex items-center gap-1"
//                 >
//                   <Edit2 size={14} /> Change
//                 </button>
//               </div>

//               <div className="p-6 grid sm:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
//                       <User size={20} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400 font-bold uppercase">Name</p>
//                       <p className="font-bold text-gray-800">{customer.name}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                       <Phone size={20} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400 font-bold uppercase">Phone</p>
//                       <p className="font-bold text-gray-800">{customer.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-1">
//                       <MapPin size={20} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400 font-bold uppercase">Delivery Address</p>
//                       <p className="font-bold text-gray-800 leading-snug">{customer.address}</p>
//                       {customer.landmark && <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded">Near: {customer.landmark}</span>}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
//                       <Calendar size={20} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
//                       <p className="font-bold text-gray-800">{customer.deliveryDate}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Payment Method Card */}
//             <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 overflow-hidden" style={{marginBottom:"50px"}}>
//                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//                 <h2 className="text-lg font-bold text-black flex items-center gap-2">
//                   <CreditCard className="text-blue-200" /> Payment Method
//                 </h2>
//               </div>

//               <div className="p-6 space-y-4">

//                 {/* COD Option */}
//                 <div 
//                   onClick={() => setPaymentMethod("COD")}
//                   className={`group flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
//                     paymentMethod === "COD" 
//                     ? "border-emerald-500 bg-emerald-50 shadow-md" 
//                     : "border-gray-100 hover:border-emerald-300 hover:shadow-sm"
//                   }`}
//                 >
//                   <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${paymentMethod === "COD" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"}`}>
//                     <Banknote size={28} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800 text-lg">Cash on Delivery</p>
//                     <p className="text-sm text-gray-500">Pay cash upon receiving your order.</p>
//                   </div>
//                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "COD" ? "border-emerald-500" : "border-gray-300"}`}>
//                     {paymentMethod === "COD" && <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm" />}
//                   </div>
//                 </div>

//                 {/* Online Option */}
//                 <div 
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`group flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
//                     paymentMethod === "Online" 
//                     ? "border-blue-500 bg-blue-50 shadow-md" 
//                     : "border-gray-100 hover:border-blue-300 hover:shadow-sm"
//                   }`}
//                 >
//                   <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
//                     <CreditCard size={28} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800 text-lg">Online Payment</p>
//                     <p className="text-sm text-gray-500">Secure credit/debit card payment.</p>
//                   </div>
//                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "Online" ? "border-blue-600" : "border-gray-300"}`}>
//                     {paymentMethod === "Online" && <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm" />}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* --- RIGHT SIDE: Summary --- */}
//           <div className="lg:col-span-5">
//             <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 sticky top-28 overflow-hidden">

//               {/* Header */}
//               <div className="bg-gray-900 p-6 text-white">
//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                   <ShoppingBag className="text-yellow-400" /> Order Summary
//                 </h2>
//                 <p className="text-gray-400 text-sm mt-1">{cartItems.length} items in your bag</p>
//               </div>

//               <div className="p-6">
//                 {/* Items */}
//                 <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-6">
//                   {cartItems.map((item, index) => {
//                      const lineTotal = item.totalPrice ?? item.unitPrice * (item.quantity || 1);
//                      return (
//                       <div key={index} className="flex gap-4 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg p-2 transition">
//                         <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm bg-white" />
//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <p className="font-bold text-gray-800">{item.name}</p>
//                             <p className="font-bold text-emerald-700">Rs.{lineTotal}</p>
//                           </div>
//                           <p className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
//                             {item.quantity} x {item.weightLabel || "Qty"}
//                           </p>
//                         </div>
//                       </div>
//                      );
//                   })}
//                 </div>

//                 {/* Total */}
//                 <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
//                   <div className="flex justify-between mb-2 text-gray-600">
//                     <span>Subtotal</span>
//                     <span>Rs.{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between mb-4 text-emerald-600 font-medium">
//                     <span>Shipping</span>
//                     <span>Free</span>
//                   </div>
//                   <div className="border-t border-emerald-200 pt-3 flex justify-between items-center">
//                     <span className="font-bold text-xl text-emerald-900">Total</span>
//                     <span className="font-extrabold text-2xl text-emerald-700">Rs.{subtotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Button */}
//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={loading}
//                   className={`w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 ${
//                     loading 
//                       ? "bg-gray-300 text--500 cursor-wait" 
//                       : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-orange-300"
//                   }`}
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : <>Place Order <ArrowRight /></>}
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
//       `}</style>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder, createCheckoutSession } from "../api";
import {
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  User,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Edit2,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { useAuth } from "../AuthContext";  // ⬅️ ADD


export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();   // ⬅️ ADD

  const DELIVERY_CHARGE = 20;

  const [customer, setCustomer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Logic Same as before ---
  useEffect(() => {
    if (!user?._id) return; // safety

    const key = `customerDetails_${user._id}`;
    const savedCustomer = localStorage.getItem(key);

    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    } else {
      navigate("/customer-details");
      return;
    }

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
  }, [user, location.state, navigate]);

  if (!customer || cartItems.length === 0) return null;

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.totalPrice ?? item.unitPrice * (item.quantity || 1)),
    0
  );

  const deliveryCharge = cartItems.length > 0 ? DELIVERY_CHARGE : 0;
  const grandTotal = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

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
        district: customer.district,
        landmark: customer.landmark || "",
      },
      deliveryOption: customer.deliveryOption,
      deliveryDate: customer.deliveryDate,
      deliveryMethod: paymentMethod === "Online" ? "CARD" : "COD",
      totalAmount: grandTotal,
    };

    setLoading(true);
    try {
      const data = await createOrder(orderData);
      if (!data || !data.order) throw new Error(data?.message || "Order creation failed");

      const { _id: orderId, totalAmount } = data.order;
      localStorage.setItem("orderId", orderId);
      localStorage.setItem("orderAmount", totalAmount);
      localStorage.setItem("orderItems", JSON.stringify(data.order.items));

      if (paymentMethod === "COD") {
        navigate("/confirm-order", { state: { order: data.order } });
      } else if (paymentMethod === "Online") {
        const sessionRes = await createCheckoutSession(orderId);
        if (sessionRes?.url) window.location.href = sessionRes.url;
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background with soft Green Gradient
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 font-sans text-gray-800 pt-28 pb-12 px-4" style={{ paddingTop: "130px", paddingBottom: "50px" }}>
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-emerald-900 drop-shadow-sm flex items-center gap-3">
              <Sparkles className="text-yellow-500 fill-yellow-500" /> Checkout
            </h1>
            <p className="text-emerald-700 mt-2 font-medium">Almost there! Complete your order.</p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-emerald-700 border border-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />

          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* --- LEFT SIDE: Forms --- */}
          <div className="lg:col-span-7 space-y-8">

            {/* 1. Shipping Details Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 overflow-hidden" style={{ borderRadius: "15px" }}>
              {/* Colorful Header */}
              <div className=" px-6 py-4 flex justify-between items-center bg-gray-800 " >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="text-emerald-200" /> Shipping Address
                </h2>
                <button
                  onClick={() => navigate("/customer-details")}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm transition flex items-center gap-1"
                >
                  <Edit2 size={14} /> Change
                </button>
              </div>

              <div className="p-6 grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Name</p>
                      <p className="font-bold text-gray-800">{customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Phone</p>
                      <p className="font-bold text-gray-800">{customer.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Delivery Address</p>
                      <p className="font-bold text-gray-800 leading-snug">{customer.address}</p>
                      {customer.landmark && <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded">Near: {customer.landmark}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
                      <p className="font-bold text-gray-800">{customer.deliveryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 overflow-hidden" style={{ borderRadius: "15px" }}>
              <div className="bg-gray-800  px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 ">
                  <CreditCard className="text-blue-200" /> Payment Method
                </h2>
              </div>

              <div className="p-6 space-y-4">

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === "COD"
                      ? "border-emerald-500 bg-emerald-50 shadow-md"
                      : "border-gray-100 hover:border-emerald-300 hover:shadow-sm"
                    }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${paymentMethod === "COD" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"}`}>
                    <Banknote size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay cash upon receiving your order.</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "COD" ? "border-emerald-500" : "border-gray-300"}`}>
                    {paymentMethod === "COD" && <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm" />}
                  </div>
                </div>

                {/* Online Option */}
                <div
                  onClick={() => setPaymentMethod("Online")}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === "Online"
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-100 hover:border-blue-300 hover:shadow-sm"
                    }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                    <CreditCard size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">Online Payment</p>
                    <p className="text-sm text-gray-500">Secure credit/debit card payment.</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "Online" ? "border-blue-600" : "border-gray-300"}`}>
                    {paymentMethod === "Online" && <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm" />}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Summary --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 sticky top-28 overflow-hidden" style={{ borderRadius: "15px" }}>

              {/* Header */}
              <div className="bg-gray-800 p-6 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-yellow-400" /> Order Summary
                </h2>
                <p className="text-gray-400 text-sm mt-1">{cartItems.length} items in your bag</p>
              </div>

              <div className="p-6">
                {/* Items */}
                <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-6">
                  {cartItems.map((item, index) => {
                    const lineTotal = item.totalPrice ?? item.unitPrice * (item.quantity || 1);
                    return (
                      <div key={index} className="flex gap-4 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg p-2 transition">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm bg-white" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="font-bold text-emerald-700">LKR {lineTotal}</p>
                          </div>
                          <p className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
                            {item.quantity} x {item.weightLabel || "Qty"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Subtotal</span>
                    <span>LKR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-emerald-600 font-medium">
                    <span>Delivery</span>
                    <span>LKR {deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-emerald-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-xl text-emerald-900">Total</span>
                    <span className="font-extrabold text-2xl text-emerald-700">
                      LKR {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 ${loading
                      ? "bg-gray-300 text-gray-500 cursor-wait"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-orange-300"
                    }`}
                  style={{ backgroundColor: "green" }}
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Place Order <ArrowRight /></>}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
      `}</style>
    </div>
  );
}