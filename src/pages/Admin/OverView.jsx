
// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaUsers, FaBoxOpen, FaTractor, FaShoppingBag } from "react-icons/fa";

// export default function Overview() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalFarmers: 0,
//     totalOrders: 0,
//     pendingFarmers: 0,
//     pendingStock: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [users, products, farmers, stock, orders] = await Promise.all([
//           api.get("/admin/users"),
//           api.get("/admin/products"),
//           api.get("/admin/farmers"),
//           api.get("/admin/farmer-stock"),
//           api.get("/admin/orders"),
//         ]);

//         setStats({
//           totalUsers: users.users?.length || 0,
//           totalProducts: products.products?.length || 0,
//           totalFarmers: farmers.farmers?.length || 0,
//           totalOrders: orders.orders?.length || 0,
//           pendingFarmers: farmers.farmers?.filter((f) => !f.approved)?.length || 0,
//           pendingStock: stock.stocks?.filter((s) => !s.approved)?.length || 0,
//         });
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <p className="text-center">Loading statistics...</p>;

//   const cards = [
//     { title: "Total Users", value: stats.totalUsers, icon: <FaUsers />, color: "bg-blue-500" },
//     { title: "Total Products", value: stats.totalProducts, icon: <FaBoxOpen />, color: "bg-green-500" },
//     { title: "Total Farmers", value: stats.totalFarmers, icon: <FaTractor />, color: "bg-yellow-500" },
//     { title: "Total Orders", value: stats.totalOrders, icon: <FaShoppingBag />, color: "bg-purple-500" },
//     { title: "Pending Farmers", value: stats.pendingFarmers, icon: <FaTractor />, color: "bg-orange-500" },
//     { title: "Pending Stock", value: stats.pendingStock, icon: <FaBoxOpen />, color: "bg-red-500" },
    
//   ];

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className={`${card.color} text-white p-6 rounded-lg shadow-lg flex items-center gap-4`}
//           >
//             <div className="text-5xl">{card.icon}</div>
//             <div>
//               <h3 className="text-2xl font-bold">{card.value}</h3>
//               <p className="text-sm opacity-90">{card.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// // src/pages/Admin/OverView.jsx
// import { useEffect, useState } from "react";
// import api from "../../api";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaTractor,
//   FaShoppingBag,
//   FaShoppingCart,
// } from "react-icons/fa";

// export default function OverView() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalFarmers: 0,
//     totalOrders: 0,
//     pendingFarmers: 0,
//     pendingStock: 0,
//     totalRevenue: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [users, products, farmers, stock, ordersRes] = await Promise.all([
//           api.get("/admin/users"),
//           api.get("/admin/products"),
//           api.get("/admin/farmers"),
//           api.get("/admin/farmer-stock"),
//           api.get("/admin/orders"),
//         ]);

//         const allOrders = ordersRes.orders || [];
//         const totalRevenue = allOrders.reduce(
//           (sum, o) => sum + (o.totalAmount || 0),
//           0
//         );

//         setOrders(allOrders);

//         setStats({
//           totalUsers: users.users?.length || 0,
//           totalProducts: products.products?.length || 0,
//           totalFarmers: farmers.farmers?.length || 0,
//           totalOrders: allOrders.length,
//           pendingFarmers:
//             farmers.farmers?.filter((f) => !f.approved)?.length || 0,
//           pendingStock:
//             stock.stocks?.filter((s) => !s.approved)?.length || 0,
//           totalRevenue,
//         });
//       } catch (err) {
//         console.error("Dashboard stats error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <p className="text-center">Loading dashboard…</p>;

//   // Sale status counts
//   const completed = orders.filter(
//     (o) => o.shipmentStatus === "Delivered"
//   ).length;
//   const processing = orders.filter(
//     (o) =>
//       o.shipmentStatus === "Processing" || o.shipmentStatus === "Shipped"
//   ).length;
//   const pending = orders.filter(
//     (o) => o.shipmentStatus === "Pending"
//   ).length;

//   const recentOrders = orders.slice(0, 5);

//   return (
//     <div className="space-y-6">
//       {/* ================== TOP SUMMARY CARDS ================== */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <SummaryCard
//           title="Total Users"
//           value={stats.totalUsers}
//           subLabel="+ Customers & Admins"
//           color="bg-[#E0F7FA]"
//           accent="text-[#00838F]"
//           icon={<FaUsers />}
//         />
//         <SummaryCard
//           title="Total Products"
//           value={stats.totalProducts}
//           subLabel="Veg & Packages"
//           color="bg-[#EDE7F6]"
//           accent="text-[#5E35B1]"
//           icon={<FaBoxOpen />}
//         />
//         <SummaryCard
//           title="Total Orders"
//           value={stats.totalOrders}
//           subLabel="All time"
//           color="bg-[#FFF3E0]"
//           accent="text-[#F57C00]"
//           icon={<FaShoppingCart />}
//         />
//         <SummaryCard
//           title="Total Sales"
//           value={`₹${stats.totalRevenue.toFixed(2)}`}
//           subLabel="Revenue"
//           color="bg-[#FFEBEE]"
//           accent="text-[#C62828]"
//           icon={<FaShoppingBag />}
//         />
//       </div>

//       {/* ================== MIDDLE SECTION: GRAPH + SIDEBAR CARDS ================== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//         {/* LEFT 2/3: Mini graph & total sales info */}
//         <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-5 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <p className="text-xs uppercase text-gray-500 tracking-wide">
//                 Total Sales
//               </p>
//               <p className="text-2xl font-bold text-gray-800">
//                 ₹{stats.totalRevenue.toFixed(2)}
//               </p>
//             </div>
//             <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700">
//               {stats.totalOrders} Orders
//             </span>
//           </div>

//           {/* Simple fake line graph using SVG (for visual look) */}
//           <div className="mt-2 h-40 bg-white rounded-xl border border-indigo-100 relative overflow-hidden">
//             <div className="absolute inset-0 opacity-75">
//               <svg
//                 viewBox="0 0 100 40"
//                 preserveAspectRatio="none"
//                 className="w-full h-full text-indigo-400"
//               >
//                 <polyline
//                   fill="url(#grad)"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                   points="0,30 10,25 20,27 30,20 40,23 50,15 60,19 70,12 80,18 90,10 100,14 100,40 0,40"
//                 />
//                 <defs>
//                   <linearGradient
//                     id="grad"
//                     x1="0"
//                     x2="0"
//                     y1="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="0%"
//                       stopColor="#6366f1"
//                       stopOpacity="0.4"
//                     />
//                     <stop
//                       offset="100%"
//                       stopColor="#ffffff"
//                       stopOpacity="1"
//                     />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//             <div className="absolute inset-x-4 bottom-2 flex justify-between text-[10px] text-gray-400">
//               <span>Jan</span>
//               <span>Mar</span>
//               <span>May</span>
//               <span>Jul</span>
//               <span>Sep</span>
//               <span>Nov</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT 1/3: Sale status donut + profile card */}
//         <div className="space-y-4">
//           {/* Sale status (donut) */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Sale Status
//             </h3>
//             <div className="flex items-center justify-center my-2">
//               <div className="relative w-28 h-28">
//                 <div
//                   className="w-full h-full rounded-full"
//                   style={{
//                     background:
//                       "conic-gradient(#22c55e 0 150deg,#6366f1 150deg 270deg,#f97316 270deg 360deg)",
//                   }}
//                 />
//                 <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-xs text-gray-500 font-medium text-center">
//                     Active
//                     <br />
//                     Orders
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-1 text-xs text-gray-600 mt-2">
//               <LegendDot color="#22c55e" label={`Completed: ${completed}`} />
//               <LegendDot color="#6366f1" label={`Processing: ${processing}`} />
//               <LegendDot color="#f97316" label={`Pending: ${pending}`} />
//             </div>
//           </div>

//           {/* Small profile / info card */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
//               A
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-semibold text-gray-800">
//                 Admin (You)
//               </p>
//               <p className="text-xs text-gray-500">
//                 Manage products, orders & users from one place.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================== RECENT ORDERS TABLE ================== */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-sm font-semibold text-gray-800">
//             Recent Orders
//           </h3>
//           <span className="text-xs text-gray-400">
//             Showing {recentOrders.length} latest
//           </span>
//         </div>

//         <div className="overflow-x-auto text-sm">
//           <table className="min-w-full">
//             <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//               <tr>
//                 <th className="px-3 py-2 text-left">ID</th>
//                 <th className="px-3 py-2 text-left">Customer</th>
//                 <th className="px-3 py-2 text-left">Date</th>
//                 <th className="px-3 py-2 text-right">Amount</th>
//                 <th className="px-3 py-2 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((o) => (
//                 <tr
//                   key={o._id}
//                   className="border-b last:border-b-0 hover:bg-gray-50"
//                 >
//                   <td className="px-3 py-2 text-xs text-gray-500">
//                     #{o._id.slice(-6)}
//                   </td>
//                   <td className="px-3 py-2">
//                     {o.userId?.name || o.shippingAddress?.name || "N/A"}
//                   </td>
//                   <td className="px-3 py-2 text-xs text-gray-500">
//                     {new Date(o.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-3 py-2 text-right font-semibold">
//                     ₹{o.totalAmount}
//                   </td>
//                   <td className="px-3 py-2 text-xs">
//                     <span
//                       className={`px-2 py-1 rounded-full font-medium ${
//                         o.shipmentStatus === "Delivered"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : o.shipmentStatus === "Processing" ||
//                             o.shipmentStatus === "Shipped"
//                           ? "bg-indigo-100 text-indigo-700"
//                           : "bg-amber-100 text-amber-700"
//                       }`}
//                     >
//                       {o.shipmentStatus}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {recentOrders.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-3 py-3 text-center text-gray-500 text-xs"
//                   >
//                     No recent orders.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- small UI helpers ---------- */
// function SummaryCard({ title, value, subLabel, color, accent, icon }) {
//   return (
//     <div
//       className={`rounded-2xl ${color} p-4 flex items-center gap-3 shadow-sm border border-white/70`}
//     >
//       <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-lg text-gray-700">
//         {icon}
//       </div>
//       <div>
//         <p className="text-xs uppercase tracking-wide text-gray-500">
//           {title}
//         </p>
//         <p className={`text-xl font-bold ${accent}`}>{value}</p>
//         <p className="text-[11px] text-gray-500">{subLabel}</p>
//       </div>
//     </div>
//   );
// }

// function LegendDot({ color, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span
//         className="w-3 h-3 rounded-full"
//         style={{ backgroundColor: color }}
//       />
//       <span>{label}</span>
//     </div>
//   );
// }



// // src/pages/Admin/OverView.jsx
// import { useEffect, useState } from "react";
// import api from "../../api";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaTractor,
//   FaShoppingBag,
//   FaShoppingCart,
// } from "react-icons/fa";

// export default function OverView() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalFarmers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [users, products, farmers, stock, ordersRes] = await Promise.all([
//           api.get("/admin/users"),
//           api.get("/admin/products"),
//           api.get("/admin/farmers"),
//           api.get("/admin/farmer-stock"),
//           api.get("/admin/orders"),
//         ]);

//         const allOrders = ordersRes.orders || [];
//         const totalRevenue = allOrders.reduce(
//           (sum, o) => sum + (o.totalAmount || 0),
//           0
//         );

//         setOrders(allOrders);

//         setStats({
//           totalUsers: users.users?.length || 0,
//           totalProducts: products.products?.length || 0,
//           totalFarmers: farmers.farmers?.length || 0,
//           totalOrders: allOrders.length,
//           totalRevenue,
//         });
//       } catch (err) {
//         console.error("Dashboard stats error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <p className="text-center">Loading dashboard…</p>;

//   const completed = orders.filter(
//     (o) => o.shipmentStatus === "Delivered"
//   ).length;
//   const processing = orders.filter(
//     (o) =>
//       o.shipmentStatus === "Processing" || o.shipmentStatus === "Shipped"
//   ).length;
//   const pending = orders.filter(
//     (o) => o.shipmentStatus === "Pending"
//   ).length;

//   const recentOrders = orders.slice(0, 5);

//   return (
//     <div className="space-y-6">
//       {/* ====== TOP SUMMARY CARDS (Daily visitor / Orders / Sales) ====== */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <SummaryCard
//           title="Total Users"
//           value={stats.totalUsers}
//           color="#22C55E"
//           bg="bg-[#DCFFE6]"
//           icon={<FaUsers />}
//           percent="+5%"
//         />
//         <SummaryCard
//           title="Total Products"
//           value={stats.totalProducts}
//           color="#6366F1"
//           bg="bg-[#E5E7FF]"
//           icon={<FaBoxOpen />}
//           percent="+3%"
//         />
//         <SummaryCard
//           title="Total Orders"
//           value={stats.totalOrders}
//           color="#F59E0B"
//           bg="bg-[#FFF4D6]"
//           icon={<FaShoppingCart />}
//           percent="+12%"
//         />
//         <SummaryCard
//           title="Total Sales"
//           value={`₹${stats.totalRevenue.toFixed(0)}`}
//           color="#EC4899"
//           bg="bg-[#FFE4EF]"
//           icon={<FaShoppingBag />}
//           percent="+8%"
//         />
//       </div>

//       {/* ====== GRAPH + RIGHT SIDEBAR ====== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//         {/* Graph block */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <p className="text-xs uppercase text-gray-500 tracking-wide">
//                 Total Sales
//               </p>
//               <p className="text-2xl font-bold text-gray-800">
//                 ₹{stats.totalRevenue.toFixed(2)}
//               </p>
//             </div>
//             <button className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
//               Last 12 Months
//             </button>
//           </div>

//           {/* simple wave graph */}
//           <div className="relative h-40 bg-gradient-to-b from-[#EEF2FF] to-white rounded-2xl overflow-hidden border border-indigo-100">
//             <svg
//               viewBox="0 0 100 40"
//               preserveAspectRatio="none"
//               className="absolute inset-0 text-[#6366F1]"
//             >
//               <polyline
//                 fill="url(#grad2)"
//                 stroke="currentColor"
//                 strokeWidth="1"
//                 points="0,28 10,22 20,24 30,18 40,22 50,14 60,19 70,11 80,16 90,9 100,13 100,40 0,40"
//               />
//               <defs>
//                 <linearGradient id="grad2" x1="0" x2="0" y1="0" y2="1">
//                   <stop
//                     offset="0%"
//                     stopColor="#6366F1"
//                     stopOpacity="0.45"
//                   />
//                   <stop
//                     offset="100%"
//                     stopColor="#EEF2FF"
//                     stopOpacity="1"
//                   />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <div className="absolute inset-x-6 bottom-2 flex justify-between text-[10px] text-gray-400">
//               <span>Jan</span>
//               <span>Mar</span>
//               <span>May</span>
//               <span>Jul</span>
//               <span>Sep</span>
//               <span>Nov</span>
//             </div>
//           </div>
//         </div>

//         {/* Right column: Sale status + profile card */}
//         <div className="space-y-4">
//           {/* Sale Status Donut */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Sale Status
//             </h3>
//             <div className="flex items-center justify-center my-2">
//               <div className="relative w-28 h-28">
//                 <div
//                   className="w-full h-full rounded-full"
//                   style={{
//                     background:
//                       "conic-gradient(#22C55E 0 150deg,#6366F1 150deg 270deg,#F59E0B 270deg 360deg)",
//                   }}
//                 />
//                 <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-[11px] text-gray-500 font-medium text-center">
//                     Active
//                     <br />
//                     Orders
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-1 text-xs text-gray-600 mt-2">
//               <LegendDot color="#22C55E" label={`Completed : ${completed}`} />
//               <LegendDot color="#6366F1" label={`Processing : ${processing}`} />
//               <LegendDot color="#F59E0B" label={`Pending : ${pending}`} />
//             </div>
//           </div>

//           {/* Profile card (right side) */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white font-semibold shadow-md">
//               A
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-semibold text-gray-800">
//                 Admin (You)
//               </p>
//               <p className="text-xs text-gray-500">
//                 Manage all VegPack orders, products and users from here.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ====== RECENT ORDERS TABLE ====== */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-2">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-sm font-semibold text-gray-800">
//             Recent Orders
//           </h3>
//           <span className="text-xs text-gray-400">
//             Showing {recentOrders.length} latest
//           </span>
//         </div>

//         <div className="overflow-x-auto text-sm">
//           <table className="min-w-full">
//             <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//               <tr>
//                 <th className="px-3 py-2 text-left">ID</th>
//                 <th className="px-3 py-2 text-left">Customer</th>
//                 <th className="px-3 py-2 text-left">Date</th>
//                 <th className="px-3 py-2 text-right">Amount</th>
//                 <th className="px-3 py-2 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((o) => (
//                 <tr
//                   key={o._id}
//                   className="border-b last:border-b-0 hover:bg-gray-50"
//                 >
//                   <td className="px-3 py-2 text-xs text-gray-500">
//                     #{o._id.slice(-6)}
//                   </td>
//                   <td className="px-3 py-2">
//                     {o.userId?.name || o.shippingAddress?.name || "N/A"}
//                   </td>
//                   <td className="px-3 py-2 text-xs text-gray-500">
//                     {new Date(o.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-3 py-2 text-right font-semibold">
//                     ₹{o.totalAmount}
//                   </td>
//                   <td className="px-3 py-2 text-xs">
//                     <span
//                       className={`px-2 py-1 rounded-full font-medium ${
//                         o.shipmentStatus === "Delivered"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : o.shipmentStatus === "Processing" ||
//                             o.shipmentStatus === "Shipped"
//                           ? "bg-indigo-100 text-indigo-700"
//                           : "bg-amber-100 text-amber-700"
//                       }`}
//                     >
//                       {o.shipmentStatus}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {recentOrders.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-3 py-3 text-center text-gray-500 text-xs"
//                   >
//                     No recent orders.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* --- small UI helpers --- */
// function SummaryCard({ title, value, color, bg, icon, percent }) {
//   return (
//     <div
//       className={`${bg} rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-white/70`}
//     >
//       <div
//         className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg"
//         style={{ color }}
//       >
//         {icon}
//       </div>
//       <div className="flex-1">
//         <p className="text-xs uppercase tracking-wide text-gray-500">
//           {title}
//         </p>
//         <div className="flex justify-between items-end mt-1">
//           <p className="text-xl font-bold" style={{ color }}>
//             {value}
//           </p>
//           <span className="text-[11px] text-gray-500">{percent}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function LegendDot({ color, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span
//         className="w-3 h-3 rounded-full"
//         style={{ backgroundColor: color }}
//       />
//       <span>{label}</span>
//     </div>
//   );
// }