// import { useState } from "react";
// import Products from "./Products";
// import Farmers from "./Farmers";
// import FarmerStock from "./FarmerStock";
// import Orders from "./Orders";
// import Users from "./Users";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("products");

//   const renderTab = () => {
//     switch (activeTab) {
//       case "products": return <Products />;
//       case "farmers": return <Farmers />;
//       case "farmer-stock": return <FarmerStock />;
//       case "orders": return <Orders />;
//       case "users": return <Users />;
//       default: return <Products />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-green-600 text-white p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <nav className="space-x-4">
//           {["products","farmers","farmer-stock","orders","users"].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-3 py-1 rounded ${activeTab === tab ? "bg-white text-green-600 font-semibold" : "hover:bg-green-700"}`}
//             >
//               {tab.replace("-", " ").toUpperCase()}
//             </button>
//           ))}
//         </nav>
//       </header>
//       <main className="p-6">{renderTab()}</main>
//     </div>
//   );
// }


// import { useState } from "react";
// import { FaUsers, FaBoxOpen, FaWarehouse, FaShoppingCart } from "react-icons/fa";
// import Users from "./Users";
// import Products from "./Products";
// import Farmers from "./Farmers";
// import Orders from "./Orders";
// import FarmerStock from "./FarmerStock";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("products");

//   const tabs = [
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "users", label: "Users", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Farmer Stock", icon: <FaWarehouse /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "products":
//         return <Products />;
//       case "users":
//         return <Users />;
//       case "farmers":
//         return <Farmers />;
//       case "farmerStock":
//         return <FarmerStock />;
//       case "orders":
//         return <Orders />;
//       default:
//         return <Products />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-200 p-4 flex flex-col space-y-4">
//         <h2 className="text-2xl font-bold text-green-800 mb-6">Admin Dashboard</h2>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold hover:bg-green-300 transition ${
//               activeTab === tab.id ? "bg-green-300" : ""
//             }`}
//           >
//             {tab.icon}
//             {tab.label}
//           </button>
//         ))}
//       </aside>

//       {/* Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {renderContent()}
//       </main>
//     </div>
//   );
// }



// import { useState } from "react";
// import { FaUsers, FaBoxOpen, FaWarehouse, FaShoppingCart } from "react-icons/fa";
// import Users from "./Users";
// import Products from "./Products";
// import Farmers from "./Farmers";
// import Orders from "./Orders";
// import FarmerStock from "./FarmerStock";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");

//   const tabs = [
//     { id: "overview", label: "Overview" },
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "users", label: "Users", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Farmer Stock", icon: <FaWarehouse /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "products":
//         return <Products />;
//       case "users":
//         return <Users />;
//       case "farmers":
//         return <Farmers />;
//       case "farmerStock":
//         return <FarmerStock />;
//       case "orders":
//         return <Orders />;
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//             <div className="p-6 bg-green-100 rounded shadow text-center">
//               <h2 className="text-xl font-bold">Products</h2>
//               <p>Manage all products</p>
//             </div>
//             <div className="p-6 bg-green-100 rounded shadow text-center">
//               <h2 className="text-xl font-bold">Users</h2>
//               <p>Manage all users</p>
//             </div>
//             <div className="p-6 bg-green-100 rounded shadow text-center">
//               <h2 className="text-xl font-bold">Farmers</h2>
//               <p>Manage all farmers</p>
//             </div>
//             <div className="p-6 bg-green-100 rounded shadow text-center">
//               <h2 className="text-xl font-bold">Farmer Stock</h2>
//               <p>Approve or reject stock</p>
//             </div>
//             <div className="p-6 bg-green-100 rounded shadow text-center">
//               <h2 className="text-xl font-bold">Orders</h2>
//               <p>View all orders</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-200 p-4 flex flex-col space-y-4">
//         <h2 className="text-2xl font-bold text-green-800 mb-6">Admin Dashboard</h2>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold hover:bg-green-300 transition ${
//               activeTab === tab.id ? "bg-green-300" : ""
//             }`}
//           >
//             {tab.icon}
//             {tab.label}
//           </button>
//         ))}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">{renderContent()}</main>
//     </div>
//   );
// }



// // ============= ADMIN DASHBOARD - AdminDashboard.jsx =============
// import { useState } from "react";
// import { FaUsers, FaBoxOpen, FaWarehouse, FaShoppingCart, FaTachometerAlt, FaStar } from "react-icons/fa";
// import Overview from "./OverView";
// import Products from "./Products";
// import Users from "./Users";
// import Farmers from "./Farmers";
// import FarmerStock from "./FarmerStock";
// import Orders from "./Orders";
// import AdminReviews from "./AdminReviews"; 

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");

//   const tabs = [
//     { id: "overview", label: "Overview", icon: <FaTachometerAlt /> },
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "users", label: "Users", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Farmer Stock", icon: <FaWarehouse /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//     { id: "reviews", label: "Reviews", icon: <FaStar /> },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <Overview />;
//       case "products":
//         return <Products />;
//       case "users":
//         return <Users />;
//       case "farmers":
//         return <Farmers />;
//       case "farmerStock":
//         return <FarmerStock />;
//       case "orders":
//         return <Orders />;
//          case "reviews":
//       return <AdminReviews />;
//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-800 text-white p-4 flex flex-col space-y-2 sticky top-0 h-screen overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
//               activeTab === tab.id
//                 ? "bg-green-600 shadow-lg"
//                 : "hover:bg-green-700"
//             }`}
//           >
//             <span className="text-xl">{tab.icon}</span>
//             {tab.label}
//           </button>
//         ))}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
//     </div>
//   );
// }


// src/pages/Admin/AdminDashboard.jsx
// import { useState } from "react";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaWarehouse,
//   FaShoppingCart,
//   FaTachometerAlt,
//   FaStar,
//   FaLeaf,
//   FaSignOutAlt,
// } from "react-icons/fa";

// import Overview from "./OverView";
// import Products from "./Products";
// import Users from "./Users";
// import Farmers from "./Farmers";
// import FarmerStock from "./FarmerStock";
// import Orders from "./Orders";
// import AdminReviews from "./AdminReviews";
// import { useAuth } from "../../AuthContext";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const { logout } = useAuth();

//   const tabs = [
//     { id: "overview", label: "Dashboard", icon: <FaTachometerAlt /> },
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//     { id: "users", label: "Users", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Farmer Stock", icon: <FaWarehouse /> },
//     { id: "reviews", label: "Reviews", icon: <FaStar /> },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <Overview />;
//       case "products":
//         return <Products />;
//       case "orders":
//         return <Orders />;
//       case "users":
//         return <Users />;
//       case "farmers":
//         return <Farmers />;
//       case "farmerStock":
//         return <FarmerStock />;
//       case "reviews":
//         return <AdminReviews />;
//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F3F2FF] flex" style={{paddingTop:"90px",paddingBottom:"200px"}}>
//       {/* ==== SIDEBAR ==== */}
//       <aside className="w-64 bg-[#111827] text-white flex flex-col py-6 px-4">
//         {/* Logo / Brand */}
//         <div className="flex items-center gap-3 mb-8 px-2">
//           <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//             <FaLeaf className="text-white" />
//           </div>
//           <div>
//             <p className="text-xs uppercase tracking-wide text-gray-400">
//               VegPack
//             </p>
//             <h1 className="text-lg font-bold">Admin Panel</h1>
//           </div>
//         </div>

//         {/* Nav items */}
//         <nav className="flex-1 space-y-1">
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
//                   isActive
//                     ? "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-lg"
//                     : "text-gray-300 hover:bg-[#1F2933]"
//                 }`}
//               >
//                 <span className="text-lg">{tab.icon}</span>
//                 <span>{tab.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         {/* Logout button bottom */}
//         <button
//           onClick={logout}
//           className="mt-4 flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 hover:bg-[#1F2933] px-3 py-2 rounded-xl transition-colors"
//         >
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </button>
//       </aside>

//       {/* ==== MAIN CONTENT ==== */}
//       <main className="flex-1 p-6 md:p-8">
//         {/* Top bar */}
//         <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Overview of VegPack admin statistics and management.
//             </p>
//           </div>

//           {/* Search + profile placeholder */}
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-3 pr-3 py-2 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
//                 A
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Inner big card */}
//         <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-gray-100 min-h-[70vh]">
//           {renderContent()}
//         </div>
//       </main>
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
//     <div className="space-y-6" style={{paddingTop:"150px"}}>
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


// // src/pages/Admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaWarehouse,
//   FaShoppingCart,
//   FaTachometerAlt,
//   FaStar,
//   FaLeaf,
//   FaSignOutAlt,
//   FaShoppingBag,
// } from "react-icons/fa";

// import { useAuth } from "../../AuthContext";
// import api from "../../api";

// // மற்ற admin pages
// import Products from "./Products";
// import Users from "./Users";
// import Farmers from "./Farmers";
// import FarmerStock from "./FarmerStock";
// import Orders from "./Orders";
// import AdminReviews from "./AdminReviews";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const { logout } = useAuth();

//   // ====== Dashboard stats from backend ======
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalVegetables: 0,
//     totalPackages: 0,
//     totalFarmers: 0,
//     approvedFarmers: 0,
//     pendingFarmers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loadingStats, setLoadingStats] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoadingStats(true);

//         const [usersRes, productsRes, farmersRes, stockRes, ordersRes] =
//           await Promise.all([
//             api.get("/admin/users"),
//             api.get("/admin/products"),
//             api.get("/admin/farmers"),
//             api.get("/admin/farmer-stock"),
//             api.get("/admin/orders"),
//           ]);

//         const users = usersRes.users || [];
//         const products = productsRes.products || [];
//         const farmers = farmersRes.farmers || [];
//         const allOrders = ordersRes.orders || [];

//         const customers = users.filter((u) => u.role === "customer");

//         const vegetables = products.filter((p) => p.type === "vegetable");
//         const packages = products.filter((p) => p.type === "package");

//         const approvedFarmers = farmers.filter((f) => f.approved).length;
//         const pendingFarmers = farmers.filter((f) => !f.approved).length;

//         const totalRevenue = allOrders.reduce(
//           (sum, o) => sum + (o.totalAmount || 0),
//           0
//         );

//         setOrders(allOrders);
//         setStats({
//           totalUsers: users.length,
//           totalCustomers: customers.length,
//           totalProducts: products.length,
//           totalVegetables: vegetables.length,
//           totalPackages: packages.length,
//           totalFarmers: farmers.length,
//           approvedFarmers,
//           pendingFarmers,
//           totalOrders: allOrders.length,
//           totalRevenue,
//         });
//       } catch (err) {
//         console.error("Admin dashboard stats error:", err);
//       } finally {
//         setLoadingStats(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const tabs = [
//     { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//     { id: "users", label: "Customers", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Farmer Stock", icon: <FaWarehouse /> },
//     { id: "reviews", label: "Reviews", icon: <FaStar /> },
//   ];

//   const renderOtherTabs = () => {
//     switch (activeTab) {
//       case "products":
//         return <Products />;
//       case "orders":
//         return <Orders />;
//       case "users":
//         return <Users />;
//       case "farmers":
//         return <Farmers />;
//       case "farmerStock":
//         return <FarmerStock />;
//       case "reviews":
//         return <AdminReviews />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#EAE6FF] flex justify-center items-center py-6 px-3">
//       {/* ===== OUTER WHITE CARD (layout+border+radius like image) ===== */}
//       <div className="w-full max-w-6xl h-[85vh] bg-white rounded-[32px] shadow-[0_24px_80px_rgba(15,23,42,0.35)] flex overflow-hidden">
//         {/* ============ SIDEBAR ============ */}
//         <aside className="w-60 bg-[#0B1020] text-white flex flex-col py-6 px-4">
//           {/* Logo / Brand */}
//           <div className="flex items-center gap-3 mb-10 px-1">
//             <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4ADE80] to-[#16A34A] flex items-center justify-center shadow-lg">
//               <FaLeaf className="text-white" />
//             </div>
//             <div>
//               <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                 VegPack
//               </p>
//               <h1 className="text-lg font-bold tracking-tight">Admin</h1>
//             </div>
//           </div>

//           {/* Menu */}
//           <nav className="flex-1 space-y-1">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
//                     isActive
//                       ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg"
//                       : "text-gray-300 hover:bg-[#111827]"
//                   }`}
//                 >
//                   <span className="text-lg">{tab.icon}</span>
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Logout */}
//           <button
//             onClick={logout}
//             className="mt-4 flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 hover:bg-[#111827] px-3 py-2 rounded-xl transition-colors"
//           >
//             <FaSignOutAlt />
//             <span>Logout</span>
//           </button>
//         </aside>

//         {/* ============ MAIN AREA ============ */}
//         <main className="flex-1 flex flex-col bg-[#F8F9FF]">
//           {/* Top bar */}
//           <div className="flex flex-wrap justify-between items-center px-6 pt-5 pb-3 border-b border-gray-100">
//             <div>
//               <h2 className="text-xl md:text-2xl font-bold text-[#111827]">
//                 {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
//               </h2>
//               <p className="text-xs text-gray-500 mt-1">
//                 Overview of VegPack performance.
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Search box */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search…"
//                   className="pl-3 pr-3 py-2 rounded-full border border-gray-300 text-xs bg-white outline-none focus:ring-2 focus:ring-[#6366F1]"
//                 />
//               </div>
//               {/* Avatar */}
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] text-white flex items-center justify-center text-sm font-bold shadow-md">
//                 A
//               </div>
//             </div>
//           </div>

//           {/* Inner scrollable content */}
//           <div className="flex-1 overflow-y-auto px-5 pb-5">
//             {activeTab === "dashboard" ? (
//               <DashboardView stats={stats} orders={orders} loading={loadingStats} />
//             ) : (
//               <div className="bg-white rounded-2xl shadow-md p-4 mt-4">
//                 {renderOtherTabs()}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* =================================================
//    DASHBOARD VIEW – inside card (image-style UI)
//    ================================================= */
// function DashboardView({ stats, orders, loading }) {
//   if (loading) return <p className="mt-4 text-center">Loading dashboard…</p>;

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
//     <div className="space-y-5 mt-4">
//       {/* ====== TOP CARDS (Daily visitor / Orders / Sales / Profit style) ====== */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <TopCard
//           bg="#22C55E"
//           title="Customers"
//           value={stats.totalCustomers}
//           sub="+5% vs last week"
//         />
//         <TopCard
//           bg="#6366F1"
//           title="Total Orders"
//           value={stats.totalOrders}
//           sub="+3% vs last week"
//         />
//         <TopCard
//           bg="#F59E0B"
//           title="Total Sales"
//           value={`₹${stats.totalRevenue.toFixed(0)}`}
//           sub="+12% vs last week"
//         />
//         <TopCard
//           bg="#EC4899"
//           title="Profit (approx)"
//           value={`₹${(stats.totalRevenue * 0.3).toFixed(0)}`}
//           sub="-2% vs last week"
//         />
//       </div>

//       {/* ====== SECOND ROW: veg / packages / farmers ====== */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <SummaryCard
//           title="Vegetables"
//           value={stats.totalVegetables}
//           color="#22C55E"
//           bg="bg-[#DCFCE7]"
//           icon={<FaBoxOpen />}
//           subtitle="Single vegetable items"
//         />
//         <SummaryCard
//           title="Packages"
//           value={stats.totalPackages}
//           color="#6366F1"
//           bg="bg-[#E0E7FF]"
//           icon={<FaBoxOpen />}
//           subtitle="Combo packages"
//         />
//         <SummaryCard
//           title="Farmers"
//           value={stats.totalFarmers}
//           color="#F97316"
//           bg="bg-[#FFEDD5]"
//           icon={<FaWarehouse />}
//           subtitle={`Approved ${stats.approvedFarmers} / Pending ${stats.pendingFarmers}`}
//         />
//       </div>

//       {/* ====== GRAPH + RIGHT STATUS COLUMN ====== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
//         {/* Graph + Recent orders */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* GRAPH CARD – image மாதிரி */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//             <div className="flex justify-between items-center mb-3">
//               <div>
//                 <p className="text-xs uppercase text-gray-500 tracking-wide">
//                   Total Sales
//                 </p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   ₹{stats.totalRevenue.toFixed(2)}
//                 </p>
//               </div>
//               <button className="text-[11px] px-3 py-1 rounded-full bg-gray-100 text-gray-600">
//                 Last 12 Months
//               </button>
//             </div>

//             {/* Wave graph + tooltip */}
//             <div className="relative h-40 bg-[#F4F5FF] rounded-2xl overflow-hidden border border-indigo-100">
//               {/* Area graph */}
//               <svg
//                 viewBox="0 0 100 40"
//                 preserveAspectRatio="none"
//                 className="absolute inset-0 text-[#6366F1]"
//               >
//                 <path
//                   d="
//                     M0,30 
//                     C10,24 20,26 30,20 
//                     C40,22 50,14 60,19 
//                     C70,11 80,16 90,9 
//                     C95,12 100,13 100,40 
//                     L0,40 Z
//                   "
//                   fill="url(#gradDashboard)"
//                   stroke="none"
//                 />
//                 <path
//                   d="
//                     M0,30 
//                     C10,24 20,26 30,20 
//                     C40,22 50,14 60,19 
//                     C70,11 80,16 90,9 
//                     C95,12 100,13
//                   "
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                 />
//                 <defs>
//                   <linearGradient
//                     id="gradDashboard"
//                     x1="0"
//                     x2="0"
//                     y1="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="0%"
//                       stopColor="#6366F1"
//                       stopOpacity="0.45"
//                     />
//                     <stop
//                       offset="100%"
//                       stopColor="#F4F5FF"
//                       stopOpacity="1"
//                     />
//                   </linearGradient>
//                 </defs>
//               </svg>

//               {/* Highlight tooltip (center) */}
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <div className="bg-[#111827] text-white text-xs px-3 py-1.5 rounded-xl shadow-lg mb-16">
//                   <p className="font-semibold">
//                     ₹{(stats.totalRevenue / 12 || 0).toFixed(0)}
//                   </p>
//                   <p className="text-[10px] text-gray-300 text-center">
//                     Avg / Month
//                   </p>
//                 </div>
//               </div>

//               {/* red dot */}
//               <div
//                 className="absolute w-3 h-3 rounded-full bg-[#6366F1] border-2 border-white shadow"
//                 style={{ left: "55%", top: "35%" }}
//               />

//               {/* x-axis */}
//               <div className="absolute inset-x-6 bottom-2 flex justify-between text-[10px] text-gray-400">
//                 <span>Jan</span>
//                 <span>Feb</span>
//                 <span>Mar</span>
//                 <span>Apr</span>
//                 <span>May</span>
//                 <span>Jun</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Orders table */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-sm font-semibold text-gray-800">
//                 Recent Orders
//               </h3>
//               <span className="text-xs text-gray-400">
//                 Showing {recentOrders.length} latest
//               </span>
//             </div>
//             <div className="overflow-x-auto text-sm">
//               <table className="min-w-full">
//                 <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                   <tr>
//                     <th className="px-3 py-2 text-left">ID</th>
//                     <th className="px-3 py-2 text-left">Name</th>
//                     <th className="px-3 py-2 text-left">Date</th>
//                     <th className="px-3 py-2 text-right">Amount</th>
//                     <th className="px-3 py-2 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentOrders.map((o) => (
//                     <tr
//                       key={o._id}
//                       className="border-b last:border-b-0 hover:bg-gray-50"
//                     >
//                       <td className="px-3 py-2 text-xs text-gray-500">
//                         #{o._id.slice(-6)}
//                       </td>
//                       <td className="px-3 py-2">
//                         {o.userId?.name ||
//                           o.shippingAddress?.name ||
//                           "N/A"}
//                       </td>
//                       <td className="px-3 py-2 text-xs text-gray-500">
//                         {new Date(o.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-3 py-2 text-right font-semibold">
//                         ₹{o.totalAmount}
//                       </td>
//                       <td className="px-3 py-2 text-xs">
//                         <span
//                           className={`px-2 py-1 rounded-full font-medium ${
//                             o.shipmentStatus === "Delivered"
//                               ? "bg-emerald-100 text-emerald-700"
//                               : o.shipmentStatus === "Processing" ||
//                                 o.shipmentStatus === "Shipped"
//                               ? "bg-indigo-100 text-indigo-700"
//                               : "bg-amber-100 text-amber-700"
//                           }`}
//                         >
//                           {o.shipmentStatus}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {recentOrders.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="px-3 py-3 text-center text-gray-500 text-xs"
//                       >
//                         No recent orders.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN – Sale Status donut + PDF card */}
//         <div className="space-y-4">
//           {/* Sale Status Donut */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">
//               Sale Status
//             </h3>
//             <div className="flex items-center justify-center my-2">
//               <div className="relative w-24 h-24">
//                 <div
//                   className="w-full h-full rounded-full"
//                   style={{
//                     background:
//                       "conic-gradient(#22C55E 0 150deg,#6366F1 150deg 270deg,#F59E0B 270deg 360deg)",
//                   }}
//                 />
//                 <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-[10px] text-gray-500 font-medium text-center">
//                     Active
//                     <br />
//                     Orders
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-1 text-xs text-gray-600 mt-2">
//               <LegendDot color="#22C55E" label={`Completed : ${completed}`} />
//               <LegendDot
//                 color="#6366F1"
//                 label={`Processing : ${processing}`}
//               />
//               <LegendDot color="#F59E0B" label={`Pending : ${pending}`} />
//             </div>
//           </div>

//           {/* PDF Report style card */}
//           <div className="bg-gradient-to-br from-[#F97316] to-[#EF4444] rounded-2xl shadow-md p-4 text-white flex flex-col justify-between h-40">
//             <div>
//               <p className="text-[10px] uppercase tracking-wide text-white/80">
//                 PDF Report
//               </p>
//               <p className="text-lg font-bold mt-1">Download Monthly</p>
//               <p className="text-[11px] mt-1 text-white/85">
//                 Get complete sales, orders & farmer reports in one click.
//               </p>
//             </div>
//             <button className="self-start mt-2 text-xs px-3 py-1 rounded-full bg-white text-[#EF4444] font-semibold shadow-sm hover:bg-gray-100">
//               Download
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- helper components ---------- */

// function TopCard({ bg, title, value, sub }) {
//   return (
//     <div
//       className="rounded-2xl px-4 py-3 text-white shadow-lg flex flex-col justify-between"
//       style={{ backgroundColor: bg }}
//     >
//       <p className="text-xs opacity-80">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//       <p className="text-[11px] mt-1 opacity-80">{sub}</p>
//     </div>
//   );
// }

// function SummaryCard({ title, value, color, bg, icon, subtitle }) {
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
//         <p className="text-xl font-bold" style={{ color }}>
//           {value}
//         </p>
//         {subtitle && (
//           <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>
//         )}
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



// import { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaWarehouse,
//   FaShoppingCart,
//   FaTachometerAlt,
//   FaStar,
//   FaLeaf,
//   FaSignOutAlt,
//   FaSearch,
//   FaBell,
//   FaArrowUp,
//   FaArrowDown,
//   FaEllipsisH,
//   FaCheckCircle,
//   FaClock,
//   FaShippingFast,
// } from "react-icons/fa";

// import { useAuth } from "../../AuthContext";
// import api from "../../api";

// // Import your sub-pages
// import Products from "./Products";
// import Users from "./Users";
// import Farmers from "./Farmers";
// import FarmerStock from "./FarmerStock";
// import Orders from "./Orders";
// import AdminReviews from "./AdminReviews";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const { logout } = useAuth();

//   // ====== State ======
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalVegetables: 0,
//     totalPackages: 0,
//     totalFarmers: 0,
//     approvedFarmers: 0,
//     pendingFarmers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loadingStats, setLoadingStats] = useState(true);

//   // ====== Fetch Data ======
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoadingStats(true);
//         // Simulate a slight delay for smooth loading UI if data is too fast
//         // await new Promise(r => setTimeout(r, 500)); 

//         const [usersRes, productsRes, farmersRes, stockRes, ordersRes] =
//           await Promise.all([
//             api.get("/admin/users"),
//             api.get("/admin/products"),
//             api.get("/admin/farmers"),
//             api.get("/admin/farmer-stock"),
//             api.get("/admin/orders"),
//           ]);

//         const users = usersRes.users || [];
//         const products = productsRes.products || [];
//         const farmers = farmersRes.farmers || [];
//         const allOrders = ordersRes.orders || [];

//         const customers = users.filter((u) => u.role === "customer");
//         const vegetables = products.filter((p) => p.type === "vegetable");
//         const packages = products.filter((p) => p.type === "package");
//         const approvedFarmers = farmers.filter((f) => f.approved).length;
//         const pendingFarmers = farmers.filter((f) => !f.approved).length;
//         const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

//         setOrders(allOrders);
//         setStats({
//           totalUsers: users.length,
//           totalCustomers: customers.length,
//           totalProducts: products.length,
//           totalVegetables: vegetables.length,
//           totalPackages: packages.length,
//           totalFarmers: farmers.length,
//           approvedFarmers,
//           pendingFarmers,
//           totalOrders: allOrders.length,
//           totalRevenue,
//         });
//       } catch (err) {
//         console.error("Admin dashboard stats error:", err);
//       } finally {
//         setLoadingStats(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // ====== Navigation Data ======
//   const tabs = [
//     { id: "dashboard", label: "Overview", icon: <FaTachometerAlt /> },
//     { id: "products", label: "Products", icon: <FaBoxOpen /> },
//     { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
//     { id: "users", label: "Customers", icon: <FaUsers /> },
//     { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
//     { id: "farmerStock", label: "Inventory", icon: <FaLeaf /> },
//     { id: "reviews", label: "Reviews", icon: <FaStar /> },
//   ];

//   // ====== Render Content ======
//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <DashboardHome stats={stats} orders={orders} loading={loadingStats} />;
//       case "products": return <Products />;
//       case "orders": return <Orders />;
//       case "users": return <Users />;
//       case "farmers": return <Farmers />;
//       case "farmerStock": return <FarmerStock />;
//       case "reviews": return <AdminReviews />;
//       default: return <DashboardHome stats={stats} orders={orders} loading={loadingStats} />;
//     }
//   };

//   return (
//     <div className="flex h-screen  font-sans text-slate-800 overflow-hidden">
//       {/* ============ SIDEBAR ============ */}
//       <aside className="w-20 lg:w-64  border-r border-gray-200 flex flex-col justify-between transition-all duration-300 z-20 shadow-sm" style={{width:"250px",backgroundColor:"#023a10ff"}}>
//         <div>
//           {/* Logo */}
//           <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6  border-gray-100"  style={{paddingTop:"150px"}}>
//             <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
//               <FaLeaf className="text-white text-xl" />
//             </div>
//             <div className="hidden lg:block ">
//               <h1 className="text-lg font-bold text-white leading-tight">VegPack</h1>
//               <span className="text-[10px] uppercase font-semibold tracking-wider text-white">Admin Panel</span>
//             </div>
//           </div>

//           {/* Nav Links */}
//           <nav className="mt-6 px-2 space-y-1" >
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`group relative w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-emerald-50 text-white"
//                       : "text-white hover:bg-gray-50 hover:text-slate-900"
//                   }`}
//                 >
//                   {/* Active Indicator Line */}
//                   {isActive && (
//                     <div className="absolute left-0 h-8 w-1 bg-emerald-500 rounded-r-full" />
//                   )}
                  
//                   <span className={`text-xl ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`}>
//                     {tab.icon}
//                   </span>
//                   <span className={`hidden lg:block ml-3 text-sm font-medium ${isActive ? "font-semibold" : ""}`}>
//                     {tab.label}
//                   </span>
                  
//                   {/* Tooltip for small screens */}
//                   <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
//                     {tab.label}
//                   </div>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Logout */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={logout}
//             className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl text-white hover:bg-red-50 hover:text-red-500 transition-colors"
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span className="hidden lg:block text-sm font-medium">Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* ============ MAIN CONTENT AREA ============ */}
//       <div className="flex-1 flex flex-col overflow-hidden relative" style={{paddingTop:"100px"}}>
//         {/* Decorative Background Blob */}
//         <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10" style={{}} />

//         {/* Header */}
//         <header className="h-20 flex items-center justify-between px-6 lg:px-8 z-10">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800">
//               {tabs.find((t) => t.id === activeTab)?.label}
//             </h2>
//             <p className="text-xs text-slate-500 hidden md:block">
//               Welcome back, Admin. Here's what's happening today.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Search Bar */}
//             <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-100 transition-all w-64">
//               <FaSearch className="text-gray-400 text-sm" />
//               <input 
//                 type="text" 
//                 placeholder="Search anything..." 
//                 className="bg-transparent  outline-none text-sm ml-2 w-full placeholder-gray-400 text-slate-700"
//                 style={{borderColor:"white"}}
//               />
//             </div>

//             {/* Notification */}
//             <button className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 shadow-sm transition-all">
//               <FaBell />
//               <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
//             </button>

//             {/* Profile */}
//             <div className="flex items-center gap-3 pl-2 cursor-pointer">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 p-[2px]">
//                 <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
//                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff" alt="Admin" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content Scrollable Area */}
//         <main className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* =================================================
//    DASHBOARD HOME COMPONENT (Bento Grid Style)
//    ================================================= */
// function DashboardHome({ stats, orders, loading }) {
//   if (loading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400">
//         <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
//         <p className="text-sm font-medium animate-pulse">Syncing Dashboard Data...</p>
//       </div>
//     );
//   }

//   // Calculations for display
//   const recentOrders = orders.slice(0, 6);
//   const completedOrders = orders.filter((o) => o.shipmentStatus === "Delivered").length;
//   const pendingOrders = orders.filter((o) => o.shipmentStatus !== "Delivered").length;
  
//   // Calculate percentage for circular chart
//   const completionRate = orders.length > 0 ? (completedOrders / orders.length) * 100 : 0;

//   return (
//     <div className="max-w-7xl mx-auto space-y-6 mt-2">
      
//       {/* 1. Key Metrics Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
//         <StatCard 
//           title="Total Revenue" 
//           value={`₹${stats.totalRevenue.toLocaleString()}`} 
//           trend="+12.5%" 
//           trendUp={true}
//           icon={<FaLeaf />}
//           color="emerald"
          
//         />
        
//         <StatCard 
//           title="Total Orders" 
//           value={stats.totalOrders} 
//           trend="+4.3%" 
//           trendUp={true}
//           icon={<FaShoppingCart />}
//           color="blue"
//         />
//         <StatCard 
//           title="Active Customers" 
//           value={stats.totalCustomers} 
//           trend="-1.2%" 
//           trendUp={false}
//           icon={<FaUsers />}
//           color="orange"
//         />
//         <StatCard 
//           title="Farmers" 
//           value={stats.totalFarmers} 
//           subValue={`${stats.pendingFarmers} Pending`}
//           trend="Active" 
//           trendUp={true}
//           icon={<FaWarehouse />}
//           color="indigo"
//         />
//       </div>

//       {/* 2. Middle Section: Charts & Stats Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Left: Revenue Graph (Custom SVG) */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h3 className="text-lg font-bold text-slate-800">Revenue Analytics</h3>
//               <p className="text-sm text-slate-500">Income over the last 7 months</p>
//             </div>
//             <select className="bg-gray-50 border border-gray-200 text-slate-600 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer">
//               <option>Last 7 Months</option>
//               <option>This Year</option>
//             </select>
//           </div>

//           {/* CSS/SVG Chart Visualization */}
//           <div className="relative h-64 w-full mt-4 group">
//             {/* Grid Lines */}
//             <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300 font-medium">
//               {[40000, 30000, 20000, 10000, 0].map((val) => (
//                 <div key={val} className="border-b border-dashed border-gray-100 w-full h-full flex items-end pb-1">
//                   <span>{val > 0 ? `${val/1000}k` : 0}</span>
//                 </div>
//               ))}
//             </div>

//             {/* The Graph Curve */}
//             <div className="absolute inset-0 ml-8">
//                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
//                   <defs>
//                     <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
//                       <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
//                       <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
//                     </linearGradient>
//                   </defs>
//                   <path 
//                     d="M0,50 L0,35 C15,30 25,40 40,25 C55,10 65,20 80,15 C90,10 95,5 100,10 L100,50 Z" 
//                     fill="url(#chartGradient)" 
//                   />
//                   <path 
//                     d="M0,35 C15,30 25,40 40,25 C55,10 65,20 80,15 C90,10 95,5 100,10" 
//                     fill="none" 
//                     stroke="#10B981" 
//                     strokeWidth="1.5" 
//                     strokeLinecap="round"
//                     className="drop-shadow-md"
//                   />
//                   {/* Interactive Points */}
//                    <circle cx="40" cy="25" r="1.5" fill="white" stroke="#10B981" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                    <circle cx="80" cy="15" r="1.5" fill="white" stroke="#10B981" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                </svg>
//             </div>
            
//             {/* X Axis Labels */}
//             <div className="absolute bottom-[-20px] left-8 right-0 flex justify-between text-xs text-gray-400">
//                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
//             </div>
//           </div>
//         </div>

//         {/* Right: Order Status / Quick Action */}
//         <div className="flex flex-col gap-6">
//             {/* Order Status Card */}
//             <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
//                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4"></div>
//                <h3 className="text-lg font-bold text-slate-800 mb-4 z-10">Order Success Rate</h3>
               
//                {/* Donut Chart Simulation */}
//                <div className="relative w-36 h-36 mb-4">
//                   <svg className="w-full h-full" viewBox="0 0 36 36">
//                     <path
//                       className="text-gray-100"
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none" stroke="currentColor" strokeWidth="3"
//                     />
//                     <path
//                       className="text-emerald-500 drop-shadow-lg"
//                       strokeDasharray={`${completionRate}, 100`}
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
//                     />
//                   </svg>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-2xl font-bold text-slate-800">{completionRate.toFixed(0)}%</span>
//                     <span className="text-[10px] text-slate-400 uppercase tracking-wide">Completed</span>
//                   </div>
//                </div>
               
//                <div className="w-full flex justify-between text-sm px-4">
//                   <div className="flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//                     <span className="text-slate-600">Done: <span className="font-semibold">{completedOrders}</span></span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-gray-300"></span>
//                     <span className="text-slate-600">Pending: <span className="font-semibold">{pendingOrders}</span></span>
//                   </div>
//                </div>
//             </div>

//             {/* Mini Stock Widget */}
//             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
//                 <FaBoxOpen className="absolute right-4 bottom-4 text-slate-700 text-6xl opacity-50 rotate-12" />
//                 <p className="text-slate-300 text-xs font-medium uppercase tracking-wide mb-1">Inventory Alert</p>
//                 <h4 className="text-2xl font-bold mb-2">{stats.totalVegetables} Items</h4>
//                 <p className="text-xs text-slate-400 mb-4">Vegetables & Packages currently active across all farmers.</p>
//                 <button className="text-xs bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
//                   Manage Stock
//                 </button>
//             </div>
//         </div>
//       </div>

//       {/* 3. Recent Orders Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50">
//           <div>
//              <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
//              <p className="text-xs text-slate-500">Latest transactions from customers</p>
//           </div>
//           <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
//             View All <FaShoppingCart className="text-xs" />
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-slate-600">
//             <thead className="bg-gray-50/50 text-xs uppercase font-semibold text-slate-400">
//               <tr>
//                 <th className="px-6 py-4">Order ID</th>
//                 <th className="px-6 py-4">Customer</th>
//                 <th className="px-6 py-4">Date</th>
//                 <th className="px-6 py-4 text-center">Amount</th>
//                 <th className="px-6 py-4 text-center">Status</th>
//                 <th className="px-6 py-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {recentOrders.length > 0 ? (
//                 recentOrders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50/80 transition-colors group">
//                     <td className="px-6 py-4 font-medium text-slate-700">
//                       #{order._id.slice(-6).toUpperCase()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
//                            {(order.userId?.name?.[0] || "U").toUpperCase()}
//                         </div>
//                         <span className="font-medium text-slate-700">{order.userId?.name || "Unknown"}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-slate-500">
//                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </td>
//                     <td className="px-6 py-4 text-center font-semibold text-slate-700">
//                       ₹{order.totalAmount}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <StatusBadge status={order.shipmentStatus} />
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
//                         <FaEllipsisH />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
//                     No orders found.
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

// /* =================================================
//    SUB COMPONENTS (Atomic Design)
//    ================================================= */

// function StatCard({ title, value, subValue, trend, trendUp, icon, color }) {
//   // Color maps for dynamic theming
//   const colorStyles = {
//     emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
//     blue: "bg-blue-50 text-blue-600 ring-blue-100",
//     orange: "bg-orange-50 text-orange-600 ring-orange-100",
//     indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
//   };

//   return (
//     <div className="bg-white rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
//       <div className="flex justify-between items-start mb-4">
//         <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ring-4 ring-opacity-50 ${colorStyles[color]}`}>
//           {icon}
//         </div>
//         {trend && (
//            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//              trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//            }`}>
//               {trendUp ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
//               {trend}
//            </div>
//         )}
//       </div>
//       <div>
//         <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
//         <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
//         {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   let styles = "";
//   let icon = null;

//   switch (status) {
//     case "Delivered":
//       styles = "bg-emerald-100 text-emerald-700 border border-emerald-200";
//       icon = <FaCheckCircle className="mr-1.5" />;
//       break;
//     case "Shipped":
//       styles = "bg-blue-100 text-blue-700 border border-blue-200";
//       icon = <FaShippingFast className="mr-1.5" />;
//       break;
//     case "Processing":
//       styles = "bg-indigo-100 text-indigo-700 border border-indigo-200";
//       icon = <FaClock className="mr-1.5" />;
//       break;
//     default:
//       styles = "bg-amber-100 text-amber-700 border border-amber-200";
//       icon = <FaClock className="mr-1.5" />;
//   }

//   return (
//     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles}`}>
//       {icon}
//       {status}
//     </span>
//   );
// }



import { useState, useEffect } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaTachometerAlt,
  FaStar,
  FaLeaf,
  FaSignOutAlt,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
  FaCheckCircle,
  FaClock,
  FaShippingFast,
} from "react-icons/fa";

import { useAuth } from "../../AuthContext";
import api from "../../api";

import Products from "./Products";
import Users from "./Users";
import Farmers from "./Farmers";
import FarmerStock from "./FarmerStock";
import Orders from "./Orders";
import AdminReviews from "./AdminReviews";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalVegetables: 0,
    totalPackages: 0,
    totalFarmers: 0,
    approvedFarmers: 0,
    pendingFarmers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);

        const [usersRes, productsRes, farmersRes, stockRes, ordersRes] =
          await Promise.all([
            api.get("/admin/users"),
            api.get("/admin/products"),
            api.get("/admin/farmers"),
            api.get("/admin/farmer-stock"),
            api.get("/admin/orders"),
          ]);

        const users = usersRes.users || [];
        const products = productsRes.products || [];
        const farmers = farmersRes.farmers || [];
        const allOrders = ordersRes.orders || [];

        const customers = users.filter((u) => u.role === "customer");
        const vegetables = products.filter((p) => p.type === "vegetable");
        const packages = products.filter((p) => p.type === "package");
        const approvedFarmers = farmers.filter((f) => f.approved).length;
        const pendingFarmers = farmers.filter((f) => !f.approved).length;
        const totalRevenue = allOrders.reduce(
          (sum, o) => sum + (o.totalAmount || 0),
          0
        );

        setOrders(allOrders);
        setStats({
          totalUsers: users.length,
          totalCustomers: customers.length,
          totalProducts: products.length,
          totalVegetables: vegetables.length,
          totalPackages: packages.length,
          totalFarmers: farmers.length,
          approvedFarmers,
          pendingFarmers,
          totalOrders: allOrders.length,
          totalRevenue,
        });
      } catch (err) {
        console.error("Admin dashboard stats error:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: "dashboard", label: "Overview", icon: <FaTachometerAlt /> },
    { id: "products", label: "Products", icon: <FaBoxOpen /> },
    { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "farmers", label: "Farmers", icon: <FaWarehouse /> },
    { id: "farmerStock", label: "FarmerStock", icon: <FaLeaf /> },
    { id: "reviews", label: "Reviews", icon: <FaStar /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardHome
            stats={stats}
            orders={orders}
            loading={loadingStats}
          />
        );
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      case "farmers":
        return <Farmers />;
      case "farmerStock":
        return <FarmerStock />;
      case "reviews":
        return <AdminReviews />;
      default:
        return (
          <DashboardHome
            stats={stats}
            orders={orders}
            loading={loadingStats}
          />
        );
    }
  };

  return (
    <div className="admin-layout flex h-screen font-sans text-slate-800 overflow-hidden" style={{paddingTop:"100px"}}>
      {/* SIDEBAR */}
      <aside className="admin-sidebar flex flex-col justify-between z-20">
        <div>
          {/* Logo */}
          <div className="admin-logo-row h-20 flex items-center justify-center lg:justify-start lg:px-6">
            <div className="admin-logo-icon w-10 h-10 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div className="hidden lg:block ml-3">
              <h1 className="text-lg font-bold text-white leading-tight">
                VegPack
              </h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-100">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 px-2 space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-btn group relative w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive ? "nav-btn--active" : ""
                  }`}
                >
                  {isActive && (
                    <div className="nav-btn__active-bar" />
                  )}

                  <span className="nav-btn__icon text-xl">
                    {tab.icon}
                  </span>
                  <span className="nav-btn__label hidden lg:block ml-3 text-sm font-medium">
                    {tab.label}
                  </span>

                  {/* Tooltip for small screens */}
                  <div className="lg:hidden nav-btn__tooltip">
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="admin-sidebar-footer p-4">
          <button
            onClick={logout}
            className="logout-btn w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="hidden lg:block text-sm font-medium">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-main flex-1 flex flex-col overflow-hidden relative">
        <div className="admin-top-gradient absolute top-0 left-0 w-full h-64 -z-10" />

        <main className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/* ============================
   DASHBOARD HOME
   ============================ */
function DashboardHome({ stats, orders, loading }) {
  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400">
        <div className="h-12 w-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium animate-pulse">
          Syncing Dashboard Data...
        </p>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 6);
  const completedOrders = orders.filter(
    (o) => o.shipmentStatus === "Delivered"
  ).length;
  const pendingOrders = orders.filter(
    (o) => o.shipmentStatus !== "Delivered"
  ).length;
  const completionRate =
    orders.length > 0
      ? (completedOrders / orders.length) * 100
      : 0;

  return (
    <div className="dashboard-home mx-auto space-y-6 mt-2">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          trend="+12.5%"
          trendUp={true}
          icon={<FaLeaf />}
          variant="emerald"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          trend="+4.3%"
          trendUp={true}
          icon={<FaShoppingCart />}
          variant="blue"
        />
        <StatCard
          title="Active Customers"
          value={stats.totalCustomers}
          trend="-1.2%"
          trendUp={false}
          icon={<FaUsers />}
          variant="orange"
        />
        <StatCard
          title="Farmers"
          value={stats.totalFarmers}
          subValue={`${stats.pendingFarmers} Pending`}
          trend="Active"
          trendUp={true}
          icon={<FaWarehouse />}
          variant="indigo"
        />
      </div>

      {/* Charts + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Revenue Analytics
              </h3>
              <p className="text-sm text-slate-500">
                Income over the last 7 months
              </p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-slate-600 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer">
              <option>Last 7 Months</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="relative h-64 w-full mt-4 group">
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300 font-medium">
              {[40000, 30000, 20000, 10000, 0].map((val) => (
                <div
                  key={val}
                  className="border-b border-dashed border-gray-100 w-full h-full flex items-end pb-1"
                >
                  <span>{val > 0 ? `${val / 1000}k` : 0}</span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 ml-8">
              <svg
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10B981"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor="#10B981"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 L0,35 C15,30 25,40 40,25 C55,10 65,20 80,15 C90,10 95,5 100,10 L100,50 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,35 C15,30 25,40 40,25 C55,10 65,20 80,15 C90,10 95,5 100,10"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
                <circle
                  cx="40"
                  cy="25"
                  r="1.5"
                  fill="white"
                  stroke="#10B981"
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <circle
                  cx="80"
                  cy="15"
                  r="1.5"
                  fill="white"
                  stroke="#10B981"
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </svg>
            </div>
            <div className="absolute bottom-[-20px] left-8 right-0 flex justify-between text-xs text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Order Success + Inventory */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-4 z-10">
              Order Success Rate
            </h3>
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-emerald-500 drop-shadow-lg"
                  strokeDasharray={`${completionRate}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">
                  {completionRate.toFixed(0)}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Completed
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between text-sm px-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-600">
                  Done:{" "}
                  <span className="font-semibold">
                    {completedOrders}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="text-slate-600">
                  Pending:{" "}
                  <span className="font-semibold">
                    {pendingOrders}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <FaBoxOpen className="absolute right-4 bottom-4 text-slate-700 text-6xl opacity-50 rotate-12" />
            <p className="text-slate-300 text-xs font-medium uppercase tracking-wide mb-1">
              Inventory Alert
            </p>
            <h4 className="text-2xl font-bold mb-2">
              {stats.totalVegetables} Items
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Vegetables & Packages currently active across all
              farmers.
            </p>
            <button className="text-xs bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Manage Stock
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Recent Orders
            </h3>
            <p className="text-xs text-slate-500">
              Latest transactions from customers
            </p>
          </div>
          <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
            View All <FaShoppingCart className="text-xs" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-gray-50/50 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-slate-700">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {(order.userId?.name?.[0] || "U").toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-700">
                        {order.userId?.name || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">
                    LKR {order.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.shipmentStatus} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
                      <FaEllipsisH />
                    </button>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value, subValue, trend, trendUp, icon, variant }) {
  const designs = {
    emerald:
      "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30",
    blue: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30",
    orange:
      "bg-gradient-to-br from-pink-400 to-red-500 shadow-orange-500/30",
    indigo:
      "bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30",
  };

  const currentDesign = designs[variant] || designs.emerald;

  return (
    <div
      className={`${currentDesign} stat-card rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shadow-sm border border-white/10">
            {icon}
          </div>
          {trend && (
            <div
              className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-white/90 ${
                trendUp
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {trendUp ? (
                <FaArrowUp size={10} />
              ) : (
                <FaArrowDown size={10} />
              )}
              {trend}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          {subValue && (
            <p className="text-xs text-white/70 mt-1">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  let styles = "";
  let icon = null;

  switch (status) {
    case "Delivered":
      styles =
        "bg-emerald-100 text-emerald-700 border border-emerald-200";
      icon = <FaCheckCircle className="mr-1.5" />;
      break;
    case "Shipped":
      styles = "bg-blue-100 text-blue-700 border border-blue-200";
      icon = <FaShippingFast className="mr-1.5" />;
      break;
    case "Processing":
      styles =
        "bg-indigo-100 text-indigo-700 border border-indigo-200";
      icon = <FaClock className="mr-1.5" />;
      break;
    default:
      styles =
        "bg-amber-100 text-amber-700 border border-amber-200";
      icon = <FaClock className="mr-1.5" />;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles}`}
    >
      {icon}
      {status}
    </span>
  );
}