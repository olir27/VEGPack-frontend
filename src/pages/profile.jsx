
// // src/pages/Profile.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api, {
//   changePassword as changePasswordApi,
//   addReviewForProduct,
// } from "../api";
// import { useAuth } from "../AuthContext";
// import {
//   User as UserIcon,
//   ShoppingBag,
//   MapPin,
//   Shield,
//   Clock,
//   ArrowRight,
// } from "lucide-react";

// export default function Profile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);
//   const [customerDetails, setCustomerDetails] = useState(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("customerDetails");
//     if (saved) setCustomerDetails(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/orders/my-orders");
//         setOrders(res.orders || []);
//       } catch (err) {
//         console.error("Fetch my orders error:", err);
//       } finally {
//         setLoadingOrders(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   const roleLabel =
//     user.role === "admin"
//       ? "Admin"
//       : user.role === "farmer"
//       ? "Farmer"
//       : "Customer";

//   const totalOrders = orders.length;
//   const lastOrder = totalOrders > 0 ? orders[0] : null;

//   return (
//     <div className="min-h-screen bg-green-200 py-8 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
//               {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 {user.name || "User"}
//               </h1>
//               <p className="text-gray-700 text-sm">{user.email}</p>
//               <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
//                 <UserIcon size={14} />
//                 {roleLabel}
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             {user.role === "farmer" && (
//               <button
//                 onClick={() => navigate("/farmer-dashboard")}
//                 className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition shadow-sm"
//               >
//                 Farmer Dashboard
//               </button>
//             )}
//             {user.role === "admin" && (
//               <button
//                 onClick={() => navigate("/admin")}
//                 className="px-4 py-2 rounded-full bg-green-800 text-white text-sm font-semibold hover:bg-green-900 transition shadow-sm"
//               >
//                 Admin Dashboard
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Top Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <StatCard
//             label="Member Since"
//             value={
//               user.createdAt
//                 ? new Date(user.createdAt).toLocaleDateString()
//                 : "N/A"
//             }
//             icon={<Clock size={18} />}
//           />
//           <StatCard
//             label="Total Orders"
//             value={loadingOrders ? "…" : totalOrders}
//             icon={<ShoppingBag size={18} />}
//           />
//           <StatCard
//             label="Last Order"
//             value={
//               lastOrder
//                 ? new Date(lastOrder.createdAt).toLocaleDateString()
//                 : "No orders yet"
//             }
//             icon={<ArrowRight size={18} />}
//           />
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-200">
//             <TabPill
//               label="Overview"
//               value="overview"
//               active={activeTab}
//               onClick={setActiveTab}
//             />
//             <TabPill
//               label="My Orders"
//               value="orders"
//               active={activeTab}
//               onClick={setActiveTab}
//             />
//             <TabPill
//               label="Security"
//               value="security"
//               active={activeTab}
//               onClick={setActiveTab}
//             />
//           </div>
//         </div>

//         {/* Tab content */}
//         <div className="mt-4">
//           {activeTab === "overview" && (
//             <OverviewTab user={user} customerDetails={customerDetails} />
//           )}

//           {activeTab === "orders" && (
//             <OrdersTab
//               orders={orders}
//               loading={loadingOrders}
//               navigate={navigate}
//             />
//           )}

//           {activeTab === "security" && <SecurityTab />}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Small UI components ---------- */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="bg-[#E8F5E9] rounded-2xl p-4 flex items-center gap-3 border border-green-100 shadow-sm">
//       <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-800">
//         {icon}
//       </div>
//       <div className="flex flex-col text-sm">
//         <span className="text-gray-600">{label}</span>
//         <span className="font-semibold text-gray-900 mt-0.5">{value}</span>
//       </div>
//     </div>
//   );
// }

// function TabPill({ label, value, active, onClick }) {
//   const isActive = active === value;
//   return (
//     <button
//       onClick={() => onClick(value)}
//       className={`px-4 py-1.5 text-sm font-semibold rounded-full transition ${
//         isActive
//           ? "bg-green-600 text-white shadow-sm"
//           : "text-gray-700 hover:bg-green-100"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function InfoRow({ label, value }) {
//   return (
//     <div className="flex flex-col text-sm">
//       <span className="text-gray-500">{label}</span>
//       <span className="font-medium text-gray-900">{value}</span>
//     </div>
//   );
// }

// /* ---------- Overview Tab ---------- */

// function OverviewTab({ user, customerDetails }) {
//   const roleLabel =
//     user.role === "admin"
//       ? "Admin"
//       : user.role === "farmer"
//       ? "Farmer"
//       : "Customer";

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Account Info */}
//       <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 space-y-3 shadow-sm">
//         <h2 className="text-sm font-semibold text-green-800 mb-1">
//           Account Overview
//         </h2>
//         <InfoRow label="Role" value={roleLabel} />
//         <InfoRow
//           label="Member Since"
//           value={
//             user.createdAt
//               ? new Date(user.createdAt).toLocaleDateString()
//               : "N/A"
//           }
//         />
//       </section>

//       {/* Customer Delivery Details */}
//       {user.role === "customer" && (
//         <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 shadow-sm">
//           <h2 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
//             <MapPin size={16} /> Default Delivery Details
//           </h2>
//           {customerDetails ? (
//             <div className="space-y-1 text-sm text-gray-800">
//               <p>
//                 <strong>Name:</strong> {customerDetails.name}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {customerDetails.phone}
//               </p>
//               <p>
//                 <strong>District:</strong> {customerDetails.district}
//               </p>
//               <p>
//                 <strong>Address:</strong> {customerDetails.address}
//               </p>
//               <p>
//                 <strong>Delivery Date:</strong> {customerDetails.deliveryDate}
//               </p>
//               <p>
//                 <strong>Delivery Option:</strong>{" "}
//                 {customerDetails.deliveryOption}
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-600 text-sm">
//               No delivery details saved yet. Enter them during checkout; they
//               will appear here.
//             </p>
//           )}
//         </section>
//       )}

//       {/* Farmer Info */}
//       {user.role === "farmer" && (
//         <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 shadow-sm lg:col-span-2">
//           <h2 className="text-sm font-semibold text-green-800 mb-1">
//             Farmer Panel
//           </h2>
//           <p className="text-sm text-gray-700">
//             Manage your stock, pending approvals, and sales analytics from the
//             Farmer Dashboard.
//           </p>
//         </section>
//       )}
//     </div>
//   );
// }

// /* ---------- Orders Tab (2-column with review button) ---------- */

// function OrdersTab({ orders, loading, navigate }) {
//   const [showReview, setShowReview] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null); // { productId, name }
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [err, setErr] = useState("");

//   const openReviewModal = (productId, name) => {
//     setSelectedProduct({ productId, name });
//     setRating(5);
//     setComment("");
//     setMsg("");
//     setErr("");
//     setShowReview(true);
//   };

//   const closeReviewModal = () => {
//     setShowReview(false);
//     setSelectedProduct(null);
//     setRating(5);
//     setComment("");
//     setMsg("");
//     setErr("");
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setErr("");

//     if (!selectedProduct?.productId) {
//       setErr("No product selected");
//       return;
//     }
//     if (!rating || !comment.trim()) {
//       setErr("Rating and comment are required");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const res = await addReviewForProduct(
//         selectedProduct.productId,
//         rating,
//         comment
//       );
//       if (res.success) {
//         setMsg(
//           res.message ||
//             "Review submitted! It will be visible after admin approval."
//         );
//         setTimeout(() => {
//           closeReviewModal();
//         }, 1200);
//       } else {
//         setErr(res.message || "Failed to submit review");
//       }
//     } catch (e) {
//       console.error("Submit review error:", e);
//       setErr(e.message || "Failed to submit review");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-green-800">
//         <ShoppingBag size={18} /> My Orders
//       </h2>
//       {loading ? (
//         <p>Loading your orders...</p>
//       ) : orders.length === 0 ? (
//         <p className="text-gray-600 text-sm">You have no orders yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="p-4 rounded-2xl border border-green-100 bg-[#E8F5E9] hover:bg-green-100 hover:shadow-md transition"
//             >
//               <div className="flex justify-between items-center mb-1">
//                 <p className="font-semibold text-sm text-gray-900">
//                   Order ID: {order._id}
//                 </p>
//                 <p className="text-gray-500 text-xs">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex flex-wrap justify-between items-center text-xs md:text-sm gap-2 text-gray-800 mb-2">
//                 <p>
//                   <strong>Total:</strong> ₹{order.totalAmount}
//                 </p>
//                 <p>
//                   <strong>Payment:</strong> {order.paymentStatus}
//                 </p>
//                 <p>
//                   <strong>Shipment:</strong> {order.shipmentStatus}
//                 </p>
//               </div>

//               {/* Items list + Write Review button for each product */}
//               <div className="mt-2 border-t border-green-100 pt-2 space-y-1">
//                 {order.items?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between items-center text-xs text-gray-700"
//                   >
//                     <div>
//                       <span className="font-medium">{item.name}</span>{" "}
//                       <span className="text-gray-500">
//                         (x{item.qty || item.quantity || 1})
//                       </span>
//                     </div>
//                     <button
//                       onClick={() =>
//                         openReviewModal(item.productId, item.name)
//                       }
//                       className="text-green-700 font-semibold hover:underline"
//                     >
//                       Write Review
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Review Modal */}
//       {showReview && selectedProduct && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               Write a Review
//             </h3>
//             <p className="text-sm text-gray-700 mb-3">
//               Product:{" "}
//               <span className="font-semibold">
//                 {selectedProduct.name}
//               </span>
//             </p>

//             <form onSubmit={handleSubmitReview} className="space-y-3">
//               <div>
//                 <label className="block text-sm mb-1">Rating</label>
//                 <select
//                   value={rating}
//                   onChange={(e) => setRating(Number(e.target.value))}
//                   className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   {[5, 4, 3, 2, 1].map((r) => (
//                     <option key={r} value={r}>
//                       {r} / 5
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm mb-1">Comment</label>
//                 <textarea
//                   rows={3}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
//                   placeholder="Share your experience..."
//                 />
//               </div>

//               {msg && <p className="text-green-700 text-sm">{msg}</p>}
//               {err && <p className="text-red-600 text-sm">{err}</p>}

//               <div className="flex justify-end gap-2 mt-2">
//                 <button
//                   type="button"
//                   onClick={closeReviewModal}
//                   className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-semibold hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
//                     submitting
//                       ? "bg-gray-400 text-white cursor-not-allowed"
//                       : "bg-green-600 text-white hover:bg-green-700"
//                   }`}
//                 >
//                   {submitting ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>

//               <p className="text-xs text-gray-500 mt-1">
//                 Your review will be visible after admin approval.
//               </p>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Security Tab ---------- */

// function SecurityTab() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [err, setErr] = useState("");

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setErr("");

//     if (!currentPassword || !newPassword || !confirm) {
//       setErr("All fields are required");
//       return;
//     }
//     if (newPassword !== confirm) {
//       setErr("New passwords do not match");
//       return;
//     }
//     if (newPassword.length < 8) {
//       setErr("New password must be at least 8 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await changePasswordApi(currentPassword, newPassword);
//       if (res.success) {
//         setMsg(res.message || "Password changed successfully");
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirm("");
//       } else {
//         setErr(res.message || "Failed to change password");
//       }
//     } catch (e) {
//       console.error(e);
//       setErr(e.message || "Failed to change password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-green-800">
//         <Shield size={18} /> Security
//       </h2>
//       <p className="text-sm text-gray-700 mb-4">
//         Change your account password regularly to keep your account secure.
//       </p>

//       <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
//         <div>
//           <label className="block text-sm mb-1">Current Password</label>
//           <input
//             type="password"
//             className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1">New Password</label>
//           <input
//             type="password"
//             className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1">Confirm New Password</label>
//           <input
//             type="password"
//             className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//           />
//         </div>

//         {msg && <p className="text-green-700 text-sm">{msg}</p>}
//         {err && <p className="text-red-600 text-sm">{err}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 rounded-full text-sm font-semibold ${
//             loading
//               ? "bg-gray-400 text-white cursor-not-allowed"
//               : "bg-green-600 text-white hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Changing..." : "Change Password"}
//         </button>
//       </form>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api, { addReviewForProduct } from "../api"; // API import
// import { useAuth } from "../AuthContext";
// import {
//     Search, Bell, User, MapPin,
//     Star, Mail, Check,
//     ShoppingBag, Shield, ChevronDown, ChevronUp, Package, X, Loader2
// } from "lucide-react";

// export default function Profile() {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const [activeTab, setActiveTab] = useState("about"); // 'about', 'orders', 'security'
//     const [orders, setOrders] = useState([]);
//     const [loadingOrders, setLoadingOrders] = useState(true);
//     const [customerDetails, setCustomerDetails] = useState(null);

//     // --- Review States ---
//     const [expandedOrderId, setExpandedOrderId] = useState(null); // To toggle order details
//     const [reviewModal, setReviewModal] = useState(null); // Stores product data for review
//     const [rating, setRating] = useState(5);
//     const [comment, setComment] = useState("");
//     const [reviewStatus, setReviewStatus] = useState({ loading: false, msg: "", err: "" });

//     // --- Data Fetching ---
//     useEffect(() => {
//   if (!user?._id) return;

//   const key = `customerDetails_${user._id}`;
//   const saved = localStorage.getItem(key);

//   if (saved) {
//     setCustomerDetails(JSON.parse(saved));
//   } else {
//     setCustomerDetails(null);
//   }

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders/my-orders");
//       setOrders(res.orders || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   fetchOrders();
// }, [user]);

//     if (!user) { navigate("/login"); return null; }

//     const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

//     // --- Handlers ---
//     const toggleOrder = (orderId) => {
//         setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//     };

//     const openReviewModal = (item) => {
//         setReviewModal(item);
//         setRating(5);
//         setComment("");
//         setReviewStatus({ loading: false, msg: "", err: "" });
//     };

//     const submitReview = async (e) => {
//         e.preventDefault();
//         setReviewStatus({ loading: true, msg: "", err: "" });

//         try {
//             const res = await addReviewForProduct(reviewModal.productId, rating, comment);
//             if (res.success) {
//                 setReviewStatus({ loading: false, msg: "Review Submitted Successfully!", err: "" });
//                 setTimeout(() => setReviewModal(null), 1500);
//             } else {
//                 setReviewStatus({ loading: false, msg: "", err: res.message || "Failed to submit." });
//             }
//         } catch (err) {
//             setReviewStatus({ loading: false, msg: "", err: err.message || "Error occurred." });
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#3B99FC] py-8 px-4 flex justify-center font-sans text-gray-800" style={{ paddingTop: "110px" }}>

//             {/* Main Container Card */}
//             <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col min-h-[800px]">

//                 {/* --- 1. HEADER (Top Bar) --- */}
//                 <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white sticky top-0 z-20">
//                     <div className="flex items-center gap-12">
//                         <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-full bg-[#3B99FC] flex items-center justify-center">
//                                 <div className="w-3 h-3 bg-white rounded-full rounded-tr-none"></div>
//                             </div>
//                             <span className="font-bold text-xl text-gray-800 tracking-tight">MyProfile</span>
//                         </div>




//                     </div>

//                     <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
//                         <span className="hidden md:block hover:text-[#3B99FC] cursor-pointer">Find products</span>
//                         <span className="hidden md:block hover:text-[#3B99FC] cursor-pointer">Messages</span>
//                         <div className="flex items-center gap-3">
//                             <span className="hidden md:block">My Account</span>
//                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
//                                 <div className="w-full h-full bg-[#3B99FC] flex items-center justify-center text-white text-xs font-bold">
//                                     {user.name[0].toUpperCase()}
//                                 </div>
//                                 <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- 2. MAIN BODY --- */}
//                 <div className="flex flex-col md:flex-row flex-1">

//                     {/* ====== LEFT COLUMN (Photo & Static Info) ====== */}
//                     <div className="w-full md:w-1/3 p-8 border-r border-gray-100 bg-white">
//                         <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-8 relative group">

//                         </div>

//                         <div className="mb-8">
//                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Saved Address</h4>
//                             {customerDetails ? (
//                                 <div className="mb-4">
//                                     <div className="flex items-center justify-between">
//                                         <span className="font-bold text-gray-800 text-lg">{customerDetails.district}</span>

//                                     </div>
//                                     <p className="text-gray-500 text-sm mt-1">{customerDetails.address}</p>
//                                     <p className="text-gray-400 text-xs mt-1">{customerDetails.phone}</p>
//                                 </div>
//                             ) : (
//                                 <div className="text-gray-400 text-sm italic">No default address set.</div>
//                             )}
//                         </div>

//                         <div>
//                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Actions</h4>
//                             <ul className="space-y-2 text-sm text-gray-600 font-medium">
//                                 {user.role === 'farmer' && (
//                                     <li onClick={() => navigate('/farmer-dashboard')} className="cursor-pointer hover:text-[#3B99FC]">Farmer Dashboard</li>
//                                 )}
//                                 {user.role === 'admin' && (
//                                     <li onClick={() => navigate('/admin')} className="cursor-pointer hover:text-[#3B99FC]">Admin Panel</li>
//                                 )}
//                                 <li className="cursor-pointer hover:text-[#3B99FC]">Payment Methods</li>
//                                 {/* <li onClick={() => navigate('/login')} className="cursor-pointer text-red-500 hover:text-red-600 mt-4">Log Out</li> */}
//                                 <li
//                                     onClick={() => {
//                                         logout();
//                                         navigate("/login");
//                                     }}
//                                     className="cursor-pointer text-red-500 hover:text-red-600 mt-4"
//                                 >
//                                     Log Out
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* ====== RIGHT COLUMN (Details & Tabs) ====== */}
//                     <div className="w-full md:w-2/3 p-8 md:p-12 bg-white relative">

//                         {/* Profile Header Info */}
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <div className="flex items-center gap-4">
//                                     <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
//                                     <div className="flex items-center text-gray-400 text-sm">
//                                         <MapPin size={14} className="mr-1" />
//                                         {customerDetails ? customerDetails.district : "Sri Lanka"}
//                                     </div>
//                                 </div>
//                                 <p className="text-[#3B99FC] font-medium mt-1">{roleLabel}</p>
//                             </div>
//                             <div className="hidden sm:block text-gray-300">
//                                 <User size={24} />
//                             </div>
//                         </div>

//                         {/* Ratings Placeholder */}
//                         <div className="flex items-center gap-1 mb-8">
//                             <span className="font-bold text-2xl text-gray-800 mr-2">4.9</span>
//                             {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#3B99FC" className="text-[#3B99FC]" />)}
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex items-center gap-4 mb-10">
//                             <button className="bg-[#E3F2FD] text-[#3B99FC] px-6 py-2.5 rounded shadow-sm font-bold text-sm flex items-center gap-2 hover:bg-[#3B99FC] hover:text-white transition-colors">
//                                 <Mail size={16} /> Messages
//                             </button>
//                             <button className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-2.5 rounded shadow-sm font-bold text-sm flex items-center gap-2 hover:bg-gray-100">
//                                 <Check size={16} /> Contacts
//                             </button>
//                         </div>


//                         {/* TABS NAVIGATION */}
//                         <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
//                             {['about', 'orders', 'security'].map((tab) => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => setActiveTab(tab)}
//                                     className={`pb-3 text-sm font-bold flex items-center gap-2 capitalize transition-all ${activeTab === tab
//                                             ? "text-[#3B99FC] border-b-2 border-[#3B99FC]"
//                                             : "text-gray-400 hover:text-gray-600"
//                                         }`}
//                                 >
//                                     {tab === 'about' && <User size={16} />}
//                                     {tab === 'orders' && <ShoppingBag size={16} />}
//                                     {tab === 'security' && <Shield size={16} />}
//                                     {tab}
//                                 </button>
//                             ))}
//                         </div>


//                         {/* TAB CONTENT */}
//                         <div className="animate-in fade-in duration-300">

//                             {/* --- TAB: ABOUT --- */}
//                             {activeTab === 'about' && (
//                                 <div>
//                                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contact Information</h3>
//                                     <div className="space-y-4 max-w-lg">
//                                         <div className="grid grid-cols-3">
//                                             <span className="text-sm font-bold text-gray-800">Phone:</span>
//                                             <span className="col-span-2 text-sm text-[#3B99FC] font-medium cursor-pointer">
//                                                 {customerDetails ? customerDetails.phone : "N/A"}
//                                             </span>
//                                         </div>
//                                         <div className="grid grid-cols-3">
//                                             <span className="text-sm font-bold text-gray-800">E-mail:</span>
//                                             <span className="col-span-2 text-sm text-[#3B99FC] font-medium cursor-pointer">{user.email}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* --- TAB: ORDERS (With Working Review Logic) --- */}
//                             {activeTab === 'orders' && (
//                                 <div>
//                                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Recent Order History</h3>

//                                     {loadingOrders ? (
//                                         <div className="text-center py-10"><Loader2 className="animate-spin mx-auto text-[#3B99FC]" /></div>
//                                     ) : orders.length === 0 ? (
//                                         <p className="text-gray-400 text-sm">No orders yet.</p>
//                                     ) : (
//                                         <div className="space-y-4">
//                                             {orders.map(order => (
//                                                 <div key={order._id} className="border border-gray-100 rounded bg-white overflow-hidden transition-all">

//                                                     {/* Order Header (Clickable) */}
//                                                     <div
//                                                         onClick={() => toggleOrder(order._id)}
//                                                         className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer"
//                                                     >
//                                                         <div>
//                                                             <p className="font-bold text-gray-800 text-sm">Order #{order._id.slice(-6).toUpperCase()}</p>
//                                                             <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
//                                                         </div>
//                                                         <div className="flex items-center gap-6">
//                                                             <div className="text-right">
//                                                                 <p className="font-bold text-[#3B99FC] text-sm">Rs. {order.totalAmount}</p>
//                                                                 <p className={`text-[10px] font-bold uppercase mt-1 ${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>
//                                                                     {order.paymentStatus}
//                                                                 </p>
//                                                             </div>
//                                                             {expandedOrderId === order._id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
//                                                         </div>
//                                                     </div>

//                                                     {/* Expanded Items (For Review) */}
//                                                     {expandedOrderId === order._id && (
//                                                         <div className="p-4 border-t border-gray-100 bg-white">
//                                                             <p className="text-xs font-bold text-gray-400 uppercase mb-3">Items in this order</p>
//                                                             <div className="space-y-3">
//                                                                 {order.items?.map((item, idx) => (
//                                                                     <div key={idx} className="flex justify-between items-center group">
//                                                                         <div className="flex items-center gap-3">
//                                                                             <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400">
//                                                                                 <Package size={14} />
//                                                                             </div>
//                                                                             <div>
//                                                                                 <p className="text-sm font-bold text-gray-800">{item.name}</p>
//                                                                                 <p className="text-xs text-gray-500">Qty: {item.qty || 1}</p>
//                                                                             </div>
//                                                                         </div>
//                                                                         <button
//                                                                             onClick={(e) => { e.stopPropagation(); openReviewModal(item); }}
//                                                                             className="text-xs font-bold text-[#3B99FC] border border-[#3B99FC] px-3 py-1 rounded hover:bg-[#3B99FC] hover:text-white transition-colors"
//                                                                         >
//                                                                             Write Review
//                                                                         </button>
//                                                                     </div>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* --- TAB: SECURITY --- */}
//                             {activeTab === 'security' && (
//                                 <div className="text-center py-10 text-gray-400 text-sm">
//                                     Security settings are managed via API integration.
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* --- REVIEW MODAL (Popup) --- */}
//             {reviewModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//                     <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
//                         <div className="bg-[#3B99FC] px-6 py-4 flex justify-between items-center">
//                             <h3 className="font-bold text-white text-lg">Rate Product</h3>
//                             <button onClick={() => setReviewModal(null)} className="text-white hover:opacity-80"><X size={20} /></button>
//                         </div>

//                         <form onSubmit={submitReview} className="p-6 space-y-5">
//                             <div className="text-center">
//                                 <p className="text-xs text-gray-400 uppercase font-bold mb-1">Product</p>
//                                 <p className="font-bold text-lg text-gray-900">{reviewModal.name}</p>
//                             </div>

//                             <div className="flex justify-center gap-2">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                     <button
//                                         key={star}
//                                         type="button"
//                                         onClick={() => setRating(star)}
//                                         className={`transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
//                                     >
//                                         <Star size={32} fill="currentColor" />
//                                     </button>
//                                 ))}
//                             </div>

//                             <div>
//                                 <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Review</label>
//                                 <textarea
//                                     value={comment}
//                                     onChange={(e) => setComment(e.target.value)}
//                                     className="w-full border border-gray-200 rounded p-3 text-sm focus:border-[#3B99FC] focus:ring-1 focus:ring-[#3B99FC] outline-none resize-none"
//                                     rows="3"
//                                     placeholder="Share your experience..."
//                                 ></textarea>
//                             </div>

//                             {/* Status Messages */}
//                             {reviewStatus.msg && <div className="p-2 bg-green-50 text-green-600 text-xs font-bold text-center rounded">{reviewStatus.msg}</div>}
//                             {reviewStatus.err && <div className="p-2 bg-red-50 text-red-600 text-xs font-bold text-center rounded">{reviewStatus.err}</div>}

//                             <button
//                                 type="submit"
//                                 disabled={reviewStatus.loading}
//                                 className="w-full bg-[#3B99FC] hover:bg-blue-600 text-white font-bold py-3 rounded shadow-md transition disabled:opacity-50"
//                             >
//                                 {reviewStatus.loading ? "Submitting..." : "Submit Review"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { addReviewForProduct } from "../api";
import { useAuth } from "../AuthContext";
import {
  Search,
  Bell,
  User,
  MapPin,
  Star,
  Mail,
  Check,
  ShoppingBag,
  Shield,
  ChevronDown,
  ChevronUp,
  Package,
  X,
  Loader2,
} from "lucide-react";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("about"); // 'about', 'orders', 'security'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(null);

  // Review States
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState({
    loading: false,
    msg: "",
    err: "",
  });

  // Data Fetching
  useEffect(() => {
    if (!user?._id) return;

    const key = `customerDetails_${user._id}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setCustomerDetails(JSON.parse(saved));
    } else {
      setCustomerDetails(null);
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const roleLabel =
    user.role.charAt(0).toUpperCase() + user.role.slice(1);

  // Handlers
  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const openReviewModal = (item) => {
    setReviewModal(item);
    setRating(5);
    setComment("");
    setReviewStatus({ loading: false, msg: "", err: "" });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewStatus({ loading: true, msg: "", err: "" });

    try {
      const res = await addReviewForProduct(
        reviewModal.productId,
        rating,
        comment
      );
      if (res.success) {
        setReviewStatus({
          loading: false,
          msg: "Review Submitted Successfully!",
          err: "",
        });
        setTimeout(() => setReviewModal(null), 1500);
      } else {
        setReviewStatus({
          loading: false,
          msg: "",
          err: res.message || "Failed to submit.",
        });
      }
    } catch (err) {
      setReviewStatus({
        loading: false,
        msg: "",
        err: err.message || "Error occurred.",
      });
    }
  };

  return (
    <div className="profile-page min-h-screen py-8 px-4 flex justify-center font-sans text-gray-800" style={{paddingTop:"100px"}}>
      {/* Main Container Card */}
      <div className="profile-shell w-full max-w-6xl flex flex-col min-h-[780px]">
        {/* HEADER */}
        <div className="profile-header h-20 flex items-center justify-between px-6 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="profile-logo-icon">
                <div className="profile-logo-dot" />
              </div>
              <span className="profile-logo-text">
                My<span>Profile</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-200">
            <span className="hidden md:block profile-header-link">
              Find products
            </span>
            <span className="hidden md:block profile-header-link">
              Messages
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden md:block">My Account</span>
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">
                  {user.name[0].toUpperCase()}
                </div>
                <div className="profile-avatar-status" />
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* LEFT COLUMN */}
          <div className="profile-sidebar w-full md:w-1/3 p-6 md:p-8 border-r border-gray-100">
            {/* User card */}
            <div className="profile-sidebar-card mb-8">
              <div className="profile-sidebar-card__header">
                <div className="profile-sidebar-avatar">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="profile-sidebar-name">
                    {user.name}
                  </p>
                  <p className="profile-sidebar-role">
                    {roleLabel}
                  </p>
                </div>
              </div>
              <div className="profile-sidebar-email">
                <Mail size={14} />
                <span>{user.email}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <h4 className="profile-section-title">
                Saved Address
              </h4>
              {customerDetails ? (
                <div className="profile-address-card">
                  <div className="flex items-center justify-between mb-1">
                    <span className="profile-address-district">
                      {customerDetails.district}
                    </span>
                  </div>
                  <p className="profile-address-text">
                    {customerDetails.address}
                  </p>
                  <p className="profile-address-phone">
                    {customerDetails.phone}
                  </p>
                </div>
              ) : (
                <div className="text-gray-400 text-sm italic">
                  No default address set.
                </div>
              )}
            </div>

            {/* Actions */}
            <div>
              <h4 className="profile-section-title">
                Actions
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 font-medium">
                {user.role === "farmer" && (
                  <li
                    onClick={() => navigate("/farmer-dashboard")}
                    className="profile-action-link"
                  >
                    Farmer Dashboard
                  </li>
                )}
                {user.role === "admin" && (
                  <li
                    onClick={() => navigate("/admin")}
                    className="profile-action-link"
                  >
                    Admin Panel
                  </li>
                )}
                <li className="profile-action-link">
                  Payment Methods
                </li>
                <li
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="profile-action-link profile-action-link--danger mt-4"
                >
                  Log Out
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-main w-full md:w-2/3 p-6 md:p-12 relative">
            {/* Profile main header */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="profile-main-name">
                    {user.name}
                  </h1>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {customerDetails
                      ? customerDetails.district
                      : "Sri Lanka"}
                  </div>
                </div>
                <p className="profile-main-role">{roleLabel}</p>
              </div>
              <div className="hidden sm:block text-gray-300">
                <User size={24} />
              </div>
            </div>

            {/* Ratings (placeholder) */}
            <div className="flex items-center gap-1 mb-8">
              <span className="profile-rating-score">4.9</span>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#3B99FC"
                  className="text-[#3B99FC]"
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button className="profile-cta primary">
                <Mail size={16} /> Messages
              </button>
              <button className="profile-cta ghost">
                <Check size={16} /> Contacts
              </button>
            </div>

            {/* Tabs */}
            <div className="profile-tabs border-b border-gray-200 mb-8">
              {["about", "orders", "security"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`profile-tab ${
                    activeTab === tab
                      ? "profile-tab--active"
                      : ""
                  }`}
                >
                  {tab === "about" && <User size={16} />}
                  {tab === "orders" && <ShoppingBag size={16} />}
                  {tab === "security" && <Shield size={16} />}
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="profile-tab-content">
              {/* ABOUT */}
              {activeTab === "about" && (
                <div>
                  <h3 className="profile-subtitle">
                    Contact Information
                  </h3>
                  <div className="space-y-4 max-w-lg">
                    <div className="grid grid-cols-3">
                      <span className="profile-field-label">
                        Phone:
                      </span>
                      <span className="col-span-2 profile-field-value">
                        {customerDetails
                          ? customerDetails.phone
                          : "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="profile-field-label">
                        E-mail:
                      </span>
                      <span className="col-span-2 profile-field-value">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {activeTab === "orders" && (
                <div>
                  <h3 className="profile-subtitle">
                    Recent Order History
                  </h3>

                  {loadingOrders ? (
                    <div className="text-center py-10">
                      <Loader2 className="animate-spin mx-auto text-[#3B99FC]" />
                    </div>
                  ) : orders.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No orders yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="order-card"
                        >
                          {/* Header */}
                          <div
                            onClick={() =>
                              toggleOrder(order._id)
                            }
                            className="order-card__header"
                          >
                            <div>
                              <p className="order-card__id">
                                Order #
                                {order._id
                                  .slice(-6)
                                  .toUpperCase()}
                              </p>
                              <p className="order-card__date">
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="order-card__amount">
                                  Rs. {order.totalAmount}
                                </p>
                                <p
                                  className={`order-card__payment ${
                                    order.paymentStatus ===
                                    "Paid"
                                      ? "order-card__payment--paid"
                                      : "order-card__payment--pending"
                                  }`}
                                >
                                  {order.paymentStatus}
                                </p>
                              </div>
                              {expandedOrderId === order._id ? (
                                <ChevronUp
                                  size={18}
                                  className="text-gray-400"
                                />
                              ) : (
                                <ChevronDown
                                  size={18}
                                  className="text-gray-400"
                                />
                              )}
                            </div>
                          </div>

                          {/* Items */}
                          {expandedOrderId === order._id && (
                            <div className="order-card__body">
                              <p className="order-card__items-title">
                                Items in this order
                              </p>
                              <div className="space-y-3">
                                {order.items?.map(
                                  (item, idx) => (
                                    <div
                                      key={idx}
                                      className="order-item-row"
                                    >
                                      <div className="order-item-main">
                                        <div className="order-item-avatar">
                                          <Package size={14} />
                                        </div>
                                        <div>
                                          <p className="order-item-name">
                                            {item.name}
                                          </p>
                                          <p className="order-item-qty">
                                            Qty:{" "}
                                            {item.qty || 1}
                                          </p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openReviewModal(
                                            item
                                          );
                                        }}
                                        className="order-item-review-btn"
                                      >
                                        Write Review
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  Security settings are managed via API integration.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {reviewModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <div className="profile-modal__header">
              <h3>Rate Product</h3>
              <button
                onClick={() => setReviewModal(null)}
                className="profile-modal__close"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={submitReview}
              className="profile-modal__body"
            >
              <div className="text-center">
                <p className="profile-modal__product-label">
                  Product
                </p>
                <p className="profile-modal__product-name">
                  {reviewModal.name}
                </p>
              </div>

              <div className="profile-modal__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`profile-star-btn ${
                      rating >= star
                        ? "profile-star-btn--active"
                        : ""
                    }`}
                  >
                    <Star
                      size={32}
                      fill="currentColor"
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="profile-modal__label">
                  Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  className="profile-modal__textarea"
                  rows="3"
                  placeholder="Share your experience..."
                />
              </div>

              {reviewStatus.msg && (
                <div className="profile-modal__status profile-modal__status--success">
                  {reviewStatus.msg}
                </div>
              )}
              {reviewStatus.err && (
                <div className="profile-modal__status profile-modal__status--error">
                  {reviewStatus.err}
                </div>
              )}

              <button
                type="submit"
                disabled={reviewStatus.loading}
                className="profile-modal__submit"
              >
                {reviewStatus.loading
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}