// import { useEffect, useState } from "react";
// import api from "../../api";

// export default function Orders() {
//   const [orders,setOrders] = useState([]);

//   const fetchOrders = async()=> {
//     const res = await api.get("/admin/orders");
//     if(res.success) setOrders(res.orders);
//   };

//   useEffect(()=>{ fetchOrders(); }, []);

//   const updateStatus = async (id, status) => {
//     await api.put(`/admin/orders/${id}`, { shipmentStatus: status });
//     fetchOrders();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Orders</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2">Customer</th>
//               <th className="p-2">Total</th>
//               <th className="p-2">Shipment</th>
//               <th className="p-2">Payment</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(o=>(
//               <tr key={o._id} className="border-b">
//                 <td className="p-2">{o.userId?.name}</td>
//                 <td className="p-2">₹{o.totalAmount}</td>
//                 <td className="p-2">{o.shipmentStatus}</td>
//                 <td className="p-2">{o.paymentStatus}</td>
//                 <td className="p-2 space-x-2">
//                   {o.shipmentStatus==="Pending" && <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={()=>updateStatus(o._id,"Processing")}>Process</button>}
//                   {o.shipmentStatus==="Processing" && <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={()=>updateStatus(o._id,"Shipped")}>Ship</button>}
//                   {o.shipmentStatus==="Shipped" && <button className="bg-gray-600 text-white px-2 py-1 rounded" onClick={()=>updateStatus(o._id,"Delivered")}>Deliver</button>}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // src/pages/Admin/Orders.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/admin/orders");
//       if (res.success) setOrders(res.orders);
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await api.put(`/admin/orders/${id}`, { shipmentStatus: status });
//       fetchOrders();
//     } catch (err) {
//       console.error("Update status error:", err);
//     }
//   };

//   const statusFlow = {
//     Pending: "Processing",
//     Processing: "Shipped",
//     Shipped: "Delivered",
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-green-800">Orders</h2>
//       <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
//         <table className="min-w-full text-sm">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2 text-left">Customer</th>
//               <th className="p-2 text-left">Total</th>
//               <th className="p-2 text-left">Payment</th>
//               <th className="p-2 text-left">Shipment</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((o) => (
//               <tr key={o._id} className="border-b hover:bg-green-50">
//                 <td className="p-2">
//                   {o.userId?.name || o.customer?.name || "N/A"}
//                 </td>
//                 <td className="p-2">₹{o.totalAmount}</td>
//                 <td className="p-2">{o.paymentStatus}</td>
//                 <td className="p-2">{o.shipmentStatus}</td>
//                 <td className="p-2 space-x-2">
//                   {statusFlow[o.shipmentStatus] && (
//                     <button
//                       className="px-3 py-1 bg-green-600 text-white rounded-full text-xs hover:bg-green-700"
//                       onClick={() =>
//                         updateStatus(o._id, statusFlow[o.shipmentStatus])
//                       }
//                     >
//                       Mark as {statusFlow[o.shipmentStatus]}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {orders.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="p-3 text-center text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // src/pages/Admin/Orders.jsx
// import { useState, useEffect, useMemo } from "react";
// import {
//   Search,
//   Truck,
//   CheckCircle,
//   Clock,
//   Package,
//   ChevronRight,
//   RefreshCcw,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
// } from "lucide-react";
// import api from "../../api";

// // --- Sub-Component: Status Badge ---
// const StatusBadge = ({ status }) => {
//   const safeStatus = status || "Pending";

//   const styles = {
//     Pending: "bg-amber-50 text-amber-700 border-amber-200",
//     Processing: "bg-blue-50 text-blue-700 border-blue-200",
//     Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
//     Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     Cancelled: "bg-red-50 text-red-700 border-red-200",
//   };

//   const icons = {
//     Pending: <Clock size={14} className="mr-1.5" />,
//     Processing: <RefreshCcw size={14} className="mr-1.5" />,
//     Shipped: <Truck size={14} className="mr-1.5" />,
//     Delivered: <CheckCircle size={14} className="mr-1.5" />,
//   };

//   const defaultStyle = "bg-gray-50 text-gray-700 border-gray-200";

//   return (
//     <span
//       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[safeStatus] || defaultStyle
//         }`}
//     >
//       {icons[safeStatus]}
//       {safeStatus}
//     </span>
//   );
// };

// // 🔹 Helper: amount compute
// const getOrderAmount = (order) => {
//   if (typeof order.totalAmount === "number") return order.totalAmount;
//   if (!Array.isArray(order.items)) return 0;
//   return order.items.reduce((sum, item) => {
//     const qty = item.qty ?? item.quantity ?? 1;
//     return sum + (item.price || 0) * qty;
//   }, 0);
// };

// // 🔹 Helper: small summary for table cell
// const getItemSummary = (order) => {
//   if (!order.items || !order.items.length) return "No items";
//   const names = order.items.map(
//     (it) => it.name || it.productId?.name || "Item"
//   );
//   if (names.length <= 2) return names.join(", ");
//   return names.slice(0, 2).join(", ") + ` +${names.length - 2} more`;
// };

// // --- Main Component ---
// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // ✅ new

//   // Fetch Logic
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/orders");
//       if (res.success) {
//         setOrders(Array.isArray(res.orders) ? res.orders : []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Update Logic
//   const updateStatus = async (id, status) => {
//     const originalOrders = [...orders];
//     setOrders(
//       orders.map((o) =>
//         o._id === id ? { ...o, shipmentStatus: status } : o
//       )
//     );

//     try {
//       await api.put(`/admin/orders/${id}`, { shipmentStatus: status });
//     } catch (err) {
//       console.error("Update status error:", err);
//       setOrders(originalOrders);
//       alert("Failed to update status");
//     }
//   };

//   const statusFlow = {
//     Pending: "Processing",
//     Processing: "Shipped",
//     Shipped: "Delivered",
//   };

//   // Filter Logic
//   const filteredOrders = useMemo(() => {
//     if (!orders) return [];
//     return orders.filter((order) => {
//       const customerName = order.userId?.name || order.customer?.name || "";
//       const orderId = order._id || "";

//       const matchesSearch =
//         customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         orderId.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesTab =
//         activeTab === "All" || order.shipmentStatus === activeTab;

//       return matchesSearch && matchesTab;
//     });
//   }, [orders, searchTerm, activeTab]);

//   // Stats
//   const stats = {
//     total: orders.length,
//     pending: orders.filter((o) => o.shipmentStatus === "Pending").length,
//     revenue: orders.reduce((acc, curr) => acc + getOrderAmount(curr), 0),
//   };

//   // Row click → expand/collapse
//   const toggleExpand = (orderId) => {
//     setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-6 font-sans text-slate-800">
//       {/* --- Header Section --- */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900">
//             Order Management
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage and track all customer orders.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={fetchOrders}
//             className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-slate-600 transition-all shadow-sm"
//           >
//             <RefreshCcw size={18} />
//           </button>
//           <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2">
//             <Package size={18} />
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* --- Stats Cards --- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//           <div>
//             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
//               Total Revenue
//             </p>
//             <h3 className="text-2xl font-bold text-slate-900 mt-1">
//               ₹{stats.revenue.toLocaleString()}
//             </h3>
//           </div>
//           <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
//             <CheckCircle size={24} />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//           <div>
//             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
//               Total Orders
//             </p>
//             <h3 className="text-2xl font-bold text-slate-900 mt-1">
//               {stats.total}
//             </h3>
//           </div>
//           <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
//             <Package size={24} />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//           <div>
//             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
//               Pending Action
//             </p>
//             <h3 className="text-2xl font-bold text-slate-900 mt-1">
//               {stats.pending}
//             </h3>
//           </div>
//           <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
//             <Clock size={24} />
//           </div>
//         </div>
//       </div>

//       {/* --- Table Container --- */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
//         {/* Toolbar */}
//         <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto">
//             {["All", "Pending", "Shipped", "Delivered"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-500 hover:text-slate-700"
//                   }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <div className="relative w-full sm:w-64">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search customer or ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm outline-none transition-all"
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
//                 <th className="p-4">Order ID / Customer</th>
//                 <th className="p-4">Items</th>
//                 <th className="p-4">Amount</th>
//                 <th className="p-4">Payment</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="p-8 text-center text-slate-500">
//                     Loading orders...
//                   </td>
//                 </tr>
//               ) : filteredOrders.length > 0 ? (
//                 filteredOrders.map((o) => {
//                   const amount = getOrderAmount(o);
//                   const itemSummary = getItemSummary(o);
//                   const isExpanded = expandedOrderId === o._id;
//                   const addr = o.shippingAddress || {};

//                   return (
//                     <>
//                       {/* MAIN ROW */}
//                       <tr
//                         key={o._id}
//                         className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
//                         onClick={() => toggleExpand(o._id)}
//                       >
//                         <td className="p-4">
//                           <div className="flex flex-col">
//                             <span className="font-medium text-slate-900">
//                               {o.userId?.name ||
//                                 o.customer?.name ||
//                                 addr.name ||
//                                 "Guest Customer"}
//                             </span>
//                             <span className="text-xs text-slate-500 font-mono mt-0.5">
//                               #{o._id?.slice(-6).toUpperCase() || "###"}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="p-4 text-sm text-slate-600">
//                           {itemSummary}
//                         </td>

//                         <td className="p-4 font-medium text-slate-700">
//                           ₹{amount.toLocaleString()}
//                         </td>

//                         <td className="p-4">
//                           <span
//                             className={`text-xs font-medium px-2 py-1 rounded ${o.paymentStatus === "Paid"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-gray-100 text-gray-600"
//                               }`}
//                           >
//                             {o.paymentStatus || "Pending"}
//                           </span>
//                         </td>

//                         <td className="p-4">
//                           <StatusBadge status={o.shipmentStatus} />
//                         </td>

//                         <td className="p-4 text-right">
//                           {statusFlow[o.shipmentStatus] ? (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 updateStatus(
//                                   o._id,
//                                   statusFlow[o.shipmentStatus]
//                                 );
//                               }}
//                               className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm group-hover:shadow-md"
//                             >
//                               Move to {statusFlow[o.shipmentStatus]}
//                               <ChevronRight size={14} />
//                             </button>
//                           ) : (
//                             <span className="text-xs text-gray-400 italic mr-2">
//                               Completed
//                             </span>
//                           )}
//                         </td>
//                       </tr>

//                       {/* EXPANDED DETAIL ROW */}
//                       {isExpanded && (
//                         <tr>
//                           <td colSpan={6} className="bg-gray-50/70 p-4">
//                             <div className="grid md:grid-cols-2 gap-4">
//                               {/* Customer / Delivery Details */}
//                               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
//                                   Customer & Delivery
//                                 </h4>
//                                 <div className="space-y-2 text-sm text-slate-700">
//                                   <div className="flex items-center gap-2">
//                                     <User size={14} className="text-slate-400" />
//                                     <span>
//                                       {addr.name ||
//                                         o.userId?.name ||
//                                         "Unknown Name"}
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-2">
//                                     <Phone
//                                       size={14}
//                                       className="text-slate-400"
//                                     />
//                                     <span>
//                                       {addr.phone || "No phone provided"}
//                                     </span>
//                                   </div>

//                                   {/* 🔹 District */}
//                                   <div className="flex items-center gap-2">
//                                     <MapPin size={14} className="text-slate-400" />
//                                     <span>{addr.district || "No district"}</span>
//                                   </div>

//                                   <div className="flex items-start gap-2">
//                                     <MapPin size={14} className="text-slate-400 mt-0.5" />
//                                     <span className="text-xs leading-relaxed">
//                                       {addr.address || "No address"}
//                                       {addr.landmark
//                                         ? ` (Landmark: ${addr.landmark})`
//                                         : ""}
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-2 text-xs mt-2 text-slate-500">
//                                     <Calendar
//                                       size={14}
//                                       className="text-slate-400"
//                                     />
//                                     <span>
//                                       {o.deliveryDate
//                                         ? new Date(
//                                           o.deliveryDate
//                                         ).toLocaleDateString()
//                                         : "No date"}
//                                       {" • "}
//                                       {o.deliveryOption || "No option"}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Order Items */}
//                               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
//                                   Order Items
//                                 </h4>
//                                 {o.items && o.items.length ? (
//                                   <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
//                                     {o.items.map((item, idx) => {
//                                       const qty =
//                                         item.qty ?? item.quantity ?? 1;
//                                       const lineTotal =
//                                         (item.price || 0) * qty;
//                                       const weightLabel =
//                                         item.type === "vegetable" &&
//                                           item.weightLabel
//                                           ? item.weightLabel
//                                           : qty;

//                                       return (
//                                         <div
//                                           key={idx}
//                                           className="flex items-center justify-between text-xs py-2 border-b last:border-0 border-gray-100"
//                                         >
//                                           <div className="flex items-center gap-2">
//                                             <div className="w-7 h-7 rounded bg-gray-100 overflow-hidden flex items-center justify-center text-[10px] text-gray-400">
//                                               <Package size={14} />
//                                             </div>
//                                             <div>
//                                               <p className="font-semibold text-slate-800">
//                                                 {item.name ||
//                                                   item.productId?.name ||
//                                                   "Item"}
//                                               </p>
//                                               <p className="text-[11px] text-slate-500">
//                                                 Qty: {qty}{" "}
//                                                 {item.weightLabel
//                                                   ? `(${item.weightLabel})`
//                                                   : ""}
//                                               </p>
//                                             </div>
//                                           </div>
//                                           <div className="text-right">
//                                             <p className="font-semibold text-slate-800">
//                                               Rs.{lineTotal}
//                                             </p>
//                                             <p className="text-[11px] text-slate-400">
//                                               Rs.{item.price || 0} each
//                                             </p>
//                                           </div>
//                                         </div>
//                                       );
//                                     })}
//                                   </div>
//                                 ) : (
//                                   <p className="text-xs text-slate-400">
//                                     No items in this order.
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="p-12 text-center">
//                     <div className="flex flex-col items-center justify-center text-gray-400">
//                       <Package size={48} className="mb-3 text-gray-200" />
//                       <p>No orders found matching your criteria.</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-slate-500">
//           <span>Showing {filteredOrders.length} orders</span>
//           <div className="flex gap-2">
//             <button className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50" disabled>
//               Prev
//             </button>
//             <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/Admin/Orders.jsx
import React, { useState, useEffect, useMemo, Fragment } from "react";
import {
  Search,
  Truck,
  CheckCircle,
  Clock,
  Package,
  ChevronRight,
  RefreshCcw,
  User,
  Phone,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import api from "../../api";
import "./Orders.css";

// --- Sub-Component: Status Badge ---
const StatusBadge = ({ status }) => {
  const safeStatus = status || "Pending";

  const icons = {
    Pending: <Clock size={14} />,
    Processing: <RefreshCcw size={14} />,
    Shipped: <Truck size={14} />,
    Delivered: <CheckCircle size={14} />,
    Cancelled: <X size={14} />,
  };

  const variantClass = {
    Pending: "status-badge--pending",
    Processing: "status-badge--processing",
    Shipped: "status-badge--shipped",
    Delivered: "status-badge--delivered",
    Cancelled: "status-badge--cancelled",
  }[safeStatus];

  return (
    <span className={`status-badge ${variantClass || ""}`}>
      {icons[safeStatus] && <span className="status-badge__icon">{icons[safeStatus]}</span>}
      {safeStatus}
    </span>
  );
};

// --- Helpers ---
const getOrderAmount = (order) => {
  if (typeof order.totalAmount === "number") return order.totalAmount;
  if (!Array.isArray(order.items)) return 0;
  return order.items.reduce((sum, item) => {
    const qty = item.qty ?? item.quantity ?? 1;
    return sum + (item.price || 0) * qty;
  }, 0);
};

const getItemSummary = (order) => {
  if (!order.items || !order.items.length) return "No items";
  const names = order.items.map(
    (it) => it.name || it.productId?.name || "Item"
  );
  if (names.length <= 2) return names.join(", ");
  return names.slice(0, 2).join(", ") + ` +${names.length - 2} more`;
};

// --- Main Component ---
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Fetch Logic
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/orders");
      if (res.success) {
        setOrders(Array.isArray(res.orders) ? res.orders : []);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Logic
  const updateStatus = async (id, status) => {
    const originalOrders = [...orders];
    setOrders(
      orders.map((o) =>
        o._id === id ? { ...o, shipmentStatus: status } : o
      )
    );

    try {
      await api.put(`/admin/orders/${id}`, { shipmentStatus: status });
    } catch (err) {
      console.error("Update status error:", err);
      setOrders(originalOrders);
      alert("Failed to update status");
    }
  };

  const statusFlow = {
    Pending: "Processing",
    Processing: "Shipped",
    Shipped: "Delivered",
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order) => {
      const customerName = order.userId?.name || order.customer?.name || "";
      const orderId = order._id || "";

      const matchesSearch =
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab =
        activeTab === "All" || order.shipmentStatus === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.shipmentStatus === "Pending").length,
    revenue: orders.reduce((acc, curr) => acc + getOrderAmount(curr), 0),
  };

  // Expand / collapse
  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const tabs = ["All", "Pending", "Shipped", "Delivered"];

  return (
    <div className="orders-page" style={{borderRadius:"20px"}}>
      <div className="orders-container custom-scrollbar">
        {/* Header */}
        <div className="orders-header">
          <div className="orders-title">
            <h1>Order Management</h1>
            <p>Manage and track all customer orders.</p>
          </div>
          <div className="orders-header-actions">
            <button
              onClick={fetchOrders}
              className="btn-icon btn-refresh"
              title="Refresh orders"
            >
              <RefreshCcw size={18} />
            </button>
            <button className="btn btn-primary btn-with-icon">
              <Package size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="orders-stats-grid">
          <div className="orders-stat-card orders-stat-card--revenue">
            <div>
              <p className="orders-stat-label">Total Revenue</p>
              <p className="orders-stat-value">
                LKR {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="orders-stat-icon orders-stat-icon--emerald">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="orders-stat-card orders-stat-card--orders">
            <div>
              <p className="orders-stat-label">Total Orders</p>
              <p className="orders-stat-value">{stats.total}</p>
            </div>
            <div className="orders-stat-icon orders-stat-icon--indigo">
              <Package size={24} />
            </div>
          </div>
          <div className="orders-stat-card orders-stat-card--pending">
            <div>
              <p className="orders-stat-label">Pending Action</p>
              <p className="orders-stat-value">{stats.pending}</p>
            </div>
            <div className="orders-stat-icon orders-stat-icon--amber">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="orders-toolbar">
          <div className="status-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={
                  "status-tab" +
                  (activeTab === tab ? " status-tab--active" : "")
                }
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="search-box">
            <span className="search-icon">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search customer or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Table */}
        <div className="orders-table-card">
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID / Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="orders-loading-cell">
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((o) => {
                    const amount = getOrderAmount(o);
                    const itemSummary = getItemSummary(o);
                    const isExpanded = expandedOrderId === o._id;
                    const addr = o.shippingAddress || {};

                    return (
                      <Fragment key={o._id}>
                        {/* MAIN ROW */}
                        <tr
                          className="order-row"
                          onClick={() => toggleExpand(o._id)}
                        >
                          <td>
                            <div className="order-main-cell">
                              <div className="order-customer">
                                <span className="order-customer__name">
                                  {o.userId?.name ||
                                    o.customer?.name ||
                                    addr.name ||
                                    "Guest Customer"}
                                </span>
                                <span className="order-customer__id">
                                  #{o._id?.slice(-6).toUpperCase() || "###"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="order-items-cell">
                            {itemSummary}
                          </td>
                          <td className="order-amount-cell">
                            LKR {amount.toLocaleString()}
                          </td>
                          <td>
                            <span
                              className={
                                "payment-pill " +
                                (o.paymentStatus === "Paid"
                                  ? "payment-pill--paid"
                                  : "payment-pill--pending")
                              }
                            >
                              {o.paymentStatus || "Pending"}
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={o.shipmentStatus} />
                          </td>
                          <td className="text-right">
                            {statusFlow[o.shipmentStatus] ? (
                              <button
                                className="progress-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus(
                                    o._id,
                                    statusFlow[o.shipmentStatus]
                                  );
                                }}
                              >
                                <span>
                                  Move to {statusFlow[o.shipmentStatus]}
                                </span>
                                <ChevronRight size={14} />
                              </button>
                            ) : (
                              <span className="order-completed-label">
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>

                        {/* EXPANDED DETAIL ROW */}
                        {isExpanded && (
                          <tr className="orders-expand-row">
                            <td colSpan={6} className="orders-expand-cell">
                              <div className="expand-grid">
                                {/* Customer / Delivery */}
                                <div className="detail-card">
                                  <h4 className="detail-card__title">
                                    Customer &amp; Delivery
                                  </h4>
                                  <div className="detail-list">
                                    <div className="detail-row">
                                      <User className="detail-row__icon" size={14} />
                                      <span>
                                        {addr.name ||
                                          o.userId?.name ||
                                          "Unknown Name"}
                                      </span>
                                    </div>
                                    <div className="detail-row">
                                      <Phone
                                        className="detail-row__icon"
                                        size={14}
                                      />
                                      <span>
                                        {addr.phone || "No phone provided"}
                                      </span>
                                    </div>
                                    <div className="detail-row">
                                      <MapPin
                                        className="detail-row__icon"
                                        size={14}
                                      />
                                      <span>
                                        {addr.district || "No district"}
                                      </span>
                                    </div>
                                    <div className="detail-row detail-row--multiline">
                                      <MapPin
                                        className="detail-row__icon"
                                        size={14}
                                      />
                                      <span>
                                        {addr.address || "No address"}
                                        {addr.landmark
                                          ? ` (Landmark: ${addr.landmark})`
                                          : ""}
                                      </span>
                                    </div>
                                    <div className="detail-row detail-row--meta">
                                      <Calendar
                                        className="detail-row__icon"
                                        size={14}
                                      />
                                      <span>
                                        {o.deliveryDate
                                          ? new Date(
                                              o.deliveryDate
                                            ).toLocaleDateString()
                                          : "No date"}
                                        {" • "}
                                        {o.deliveryOption || "No option"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div className="detail-card">
                                  <h4 className="detail-card__title">
                                    Order Items
                                  </h4>
                                  {o.items && o.items.length ? (
                                    <div className="order-items-list custom-scrollbar">
                                      {o.items.map((item, idx) => {
                                        const qty =
                                          item.qty ?? item.quantity ?? 1;
                                        const lineTotal =
                                          (item.price || 0) * qty;

                                        return (
                                          <div
                                            key={idx}
                                            className="order-item-row"
                                          >
                                            <div className="order-item-main">
                                              <div className="order-item-icon">
                                                <Package size={14} />
                                              </div>
                                              <div>
                                                <p className="order-item-name">
                                                  {item.name ||
                                                    item.productId?.name ||
                                                    "Item"}
                                                </p>
                                                <p className="order-item-meta">
                                                  Qty: {qty}{" "}
                                                  {item.weightLabel
                                                    ? `(${item.weightLabel})`
                                                    : ""}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="order-item-price">
                                              <p className="order-item-price__total">
                                                LKR {lineTotal}
                                              </p>
                                              <p className="order-item-price__each">
                                                LKR {item.price || 0} each
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <p className="order-items-empty">
                                      No items in this order.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="orders-empty-cell">
                      <div className="orders-empty-state">
                        <Package size={48} />
                        <p>No orders found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Simple pagination placeholder */}
          <div className="orders-table-footer">
            <span className="orders-footer-info">
              Showing {filteredOrders.length} orders
            </span>
            <div className="orders-footer-buttons">
              <button className="btn-pill" disabled>
                Prev
              </button>
              <button className="btn-pill">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}