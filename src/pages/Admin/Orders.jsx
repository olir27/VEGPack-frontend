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


import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Truck, 
  CheckCircle, 
  Clock, 
  Package, 
  ChevronRight,
  RefreshCcw
} from "lucide-react";
import api from "../../api";

// --- Sub-Component: Status Badge ---
const StatusBadge = ({ status }) => {
  // Fallback to "Pending" if status is undefined
  const safeStatus = status || "Pending";

  const styles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    Pending: <Clock size={14} className="mr-1.5" />,
    Processing: <RefreshCcw size={14} className="mr-1.5" />,
    Shipped: <Truck size={14} className="mr-1.5" />,
    Delivered: <CheckCircle size={14} className="mr-1.5" />,
  };

  const defaultStyle = "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[safeStatus] || defaultStyle}`}>
      {icons[safeStatus]}
      {safeStatus}
    </span>
  );
};

// --- Main Component ---
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Fetch Logic
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/orders");
      if (res.success) {
        // Ensure orders is always an array
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
    setOrders(orders.map(o => o._id === id ? { ...o, shipmentStatus: status } : o));

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
      // Safe navigation for nested properties
      const customerName = order.userId?.name || order.customer?.name || "";
      const orderId = order._id || "";
      
      const matchesSearch = 
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === "All" || order.shipmentStatus === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  // Calculate Stats (FIXED: Added || 0 to prevent crashes)
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.shipmentStatus === "Pending").length,
    revenue: orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans text-slate-800">
      
      {/* --- Header Section --- */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Order Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track all customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchOrders} className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-slate-600 transition-all shadow-sm">
            <RefreshCcw size={18} />
          </button>
          <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2">
            <Package size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
            {/* Fixed .toLocaleString() crash */}
            <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{stats.revenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Package size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pending Action</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.pending}</h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto">
            {["All", "Pending", "Shipped", "Delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search customer or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">Order ID / Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">Loading orders...</td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {o.userId?.name || o.customer?.name || "Guest Customer"}
                        </span>
                        <span className="text-xs text-slate-500 font-mono mt-0.5">
                          #{o._id?.slice(-6).toUpperCase() || "###"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {/* FIXED: Added safe check for totalAmount */}
                      ₹{(o.totalAmount || 0).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        o.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {o.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={o.shipmentStatus} />
                    </td>
                    <td className="p-4 text-right">
                      {statusFlow[o.shipmentStatus] ? (
                        <button
                          onClick={() => updateStatus(o._id, statusFlow[o.shipmentStatus])}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm group-hover:shadow-md"
                        >
                          Move to {statusFlow[o.shipmentStatus]}
                          <ChevronRight size={14} />
                        </button>
                      ) : (
                         <span className="text-xs text-gray-400 italic mr-2">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Package size={48} className="mb-3 text-gray-200" />
                      <p>No orders found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-slate-500">
          <span>Showing {filteredOrders.length} orders</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}