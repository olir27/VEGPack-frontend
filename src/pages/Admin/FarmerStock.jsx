// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function FarmerStock() {
//   const [stocks,setStocks] = useState([]);

//   const fetchStocks = async()=> {
//     const res = await api.get("/admin/farmer-stock");
//     if(res.success) setStocks(res.stocks);
//   };

//   useEffect(()=>{ fetchStocks(); }, []);

//   const approve = async id => { await api.put(`/admin/farmer-stock/approve/${id}`); fetchStocks(); };
//   const reject = async id => { await api.delete(`/admin/farmer-stock/reject/${id}`); fetchStocks(); };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Farmer Stock</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2">Farmer</th>
//               <th className="p-2">Product</th>
//               <th className="p-2">Quantity</th>
//               <th className="p-2">Approved</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map(s=>(
//               <tr key={s._id} className="border-b">
//                 <td className="p-2">{s.farmer.name}</td>
//                 <td className="p-2">{s.productName}</td>
//                 <td className="p-2">{s.quantity}</td>
//                 <td className="p-2">{s.approved ? "Yes" : "No"}</td>
//                 <td className="p-2 space-x-2">
//                   {!s.approved && <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={()=>approve(s._id)}>Approve</button>}
//                   <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>reject(s._id)}>Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaCheck, FaTimes } from "react-icons/fa";

// export default function FarmerStock() {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all, pending, approved

//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmer-stock");
//       if (res.success) setStocks(res.stocks);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   const approveStock = async (id) => {
//     try {
//       await api.put(`/admin/farmer-stock/approve/${id}`);
//       alert("Stock approved!");
//       fetchStocks();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve stock");
//     }
//   };

//   const rejectStock = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this stock?")) return;
//     try {
//       await api.delete(`/admin/farmer-stock/reject/${id}`);
//       alert("Stock rejected!");
//       fetchStocks();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reject stock");
//     }
//   };

//   const filteredStocks = stocks.filter((s) => {
//     if (filter === "pending") return !s.approved;
//     if (filter === "approved") return s.approved;
//     return true;
//   });

//   if (loading) return <p className="text-center">Loading stocks...</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Farmer Stock Management</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setFilter("all")}
//             className={`px-4 py-2 rounded ${
//               filter === "all" ? "bg-green-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("pending")}
//             className={`px-4 py-2 rounded ${
//               filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Pending
//           </button>
//           <button
//             onClick={() => setFilter("approved")}
//             className={`px-4 py-2 rounded ${
//               filter === "approved" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Approved
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Farmer Name</th>
//               <th className="p-3 text-left">Vegetable</th>
//               <th className="p-3 text-left">Quantity</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStocks.map((stock) => (
//               <tr key={stock._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{stock.farmer?.name || "Unknown"}</td>
//                 <td className="p-3 font-semibold">{stock.vegetable}</td>
//                 <td className="p-3">{stock.quantity}</td>
//                 <td className="p-3">₹{stock.price}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       stock.approved
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {stock.approved ? "Approved" : "Pending"}
//                   </span>
//                 </td>
//                 <td className="p-3 flex gap-2">
//                   {!stock.approved && (
//                     <button
//                       onClick={() => approveStock(stock._id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
//                     >
//                       <FaCheck /> Approve
//                     </button>
//                   )}
//                   <button
//                     onClick={() => rejectStock(stock._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
//                   >
//                     <FaTimes /> Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// // src/pages/Admin/FarmerStock.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function FarmerStock() {
//   const [stocks, setStocks] = useState([]);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [productForm, setProductForm] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     description: "",
//     image: "",
//   });
//   const [showModal, setShowModal] = useState(false);

//   const fetchStocks = async () => {
//     try {
//       const res = await api.get("/admin/farmer-stock");
//       if (res.success) {
//         // Approved stock only
//         const approved = (res.stocks || []).filter((s) => s.approved);
//         setStocks(approved);
//       }
//     } catch (err) {
//       console.error("Fetch farmer stock error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   const openAddProductModal = (stock) => {
//     setSelectedStock(stock);
//     setProductForm({
//       name: stock.vegetable,
//       price: stock.price,
//       quantity: stock.quantity,
//       description: "",
//       image: "",
//     });
//     setShowModal(true);
//   };

//   const handleCreateProduct = async () => {
//     if (!productForm.name || !productForm.price || !productForm.quantity) {
//       alert("Name, price and quantity are required");
//       return;
//     }
//     try {
//       await api.post("/admin/products", {
//         name: productForm.name,
//         price: Number(productForm.price),
//         quantity: productForm.quantity,
//         type: "vegetable",
//         description: productForm.description,
//         image: productForm.image,
//       });
//       alert("Product added to VegPack successfully");
//       setShowModal(false);
//       setSelectedStock(null);
//       fetchStocks();
//     } catch (err) {
//       console.error("Create product from stock error:", err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-green-800">Approved Farmer Stock</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         These are stocks approved from farmers. Convert them into VegPack
//         vegetables by creating products.
//       </p>
//       <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
//         <table className="min-w-full text-sm">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2 text-left">Farmer</th>
//               <th className="p-2 text-left">Product</th>
//               <th className="p-2 text-left">Quantity</th>
//               <th className="p-2 text-left">Price</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((s) => (
//               <tr key={s._id} className="border-b hover:bg-green-50">
//                 <td className="p-2">{s.farmer?.name}</td>
//                 <td className="p-2">{s.vegetable}</td>
//                 <td className="p-2">{s.quantity}</td>
//                 <td className="p-2">₹{s.price}</td>
//                 <td className="p-2">
//                   <button
//                     className="bg-green-600 text-white px-3 py-1 rounded-full text-xs hover:bg-green-700"
//                     onClick={() => openAddProductModal(s)}
//                   >
//                     Add as VegPack Product
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {stocks.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="p-3 text-center text-gray-500">
//                   No approved stocks found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Product Modal */}
//       {showModal && selectedStock && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">
//               Add Product from Stock
//             </h3>
//             <p className="text-sm text-gray-600 mb-3">
//               Farmer: <b>{selectedStock.farmer?.name}</b> –{" "}
//               <b>{selectedStock.vegetable}</b>
//             </p>
//             <div className="grid grid-cols-1 gap-3 text-sm">
//               <input
//                 className="p-2 border rounded-xl"
//                 placeholder="Name"
//                 value={productForm.name}
//                 onChange={(e) =>
//                   setProductForm((p) => ({ ...p, name: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded-xl"
//                 placeholder="Price"
//                 type="number"
//                 value={productForm.price}
//                 onChange={(e) =>
//                   setProductForm((p) => ({ ...p, price: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded-xl"
//                 placeholder="Quantity (e.g. 1kg)"
//                 value={productForm.quantity}
//                 onChange={(e) =>
//                   setProductForm((p) => ({ ...p, quantity: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded-xl"
//                 placeholder="Image URL"
//                 value={productForm.image}
//                 onChange={(e) =>
//                   setProductForm((p) => ({ ...p, image: e.target.value }))
//                 }
//               />
//               <textarea
//                 className="p-2 border rounded-xl resize-none"
//                 placeholder="Description (optional)"
//                 rows={3}
//                 value={productForm.description}
//                 onChange={(e) =>
//                   setProductForm((p) => ({
//                     ...p,
//                     description: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
//                 onClick={() => {
//                   setShowModal(false);
//                   setSelectedStock(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 text-sm"
//                 onClick={handleCreateProduct}
//               >
//                 Add Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useMemo } from "react";
// import { 
//   Search, Filter, Sprout, ArrowRight, PackagePlus, 
//   DollarSign, Scale, Image as ImageIcon, X, 
//   CheckCircle, AlertCircle, RefreshCcw, Package,
//   LayoutDashboard, Users, Settings, ChevronRight
// } from "lucide-react";
// import api from "../../api";

// // --- 1. SHARED COMPONENTS (For consistency) ---

// const Toast = ({ message, type, onClose }) => {
//   if (!message) return null;
//   return (
//     <div className="fixed bottom-6 right-6 z-[60] animate-fade-in-up">
//       <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
//         type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-red-600 text-white border-red-500'
//       }`}>
//         {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
//         <span className="font-medium text-sm">{message}</span>
//         <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14}/></button>
//       </div>
//     </div>
//   );
// };

// const FarmerAvatar = ({ name }) => {
//   const safeName = name || "Farmer";
//   const initials = safeName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
//   return (
//     <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shadow-sm border border-white">
//       {initials}
//     </div>
//   );
// };

// const SkeletonRow = () => (
//   <tr className="animate-pulse border-b border-slate-50">
//     <td className="p-5"><div className="flex gap-3"><div className="h-10 w-10 bg-slate-200 rounded-full"></div><div className="h-4 w-24 bg-slate-200 rounded mt-3"></div></div></td>
//     <td className="p-5"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
//     <td className="p-5"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
//     <td className="p-5"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
//     <td className="p-5"><div className="h-8 w-24 bg-slate-200 rounded float-right"></div></td>
//   </tr>
// );

// // --- 2. MAIN COMPONENT ---

// export default function FarmerStock() {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState({ message: "", type: "" });
//   const [selectedStock, setSelectedStock] = useState(null);
  
//   // Form State
//   const [productForm, setProductForm] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     description: "",
//     image: "",
//   });

//   // --- API Calls ---
//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmer-stock");
//       if (res.success) {
//         // Filter for approved stocks only
//         const approved = (res.stocks || []).filter((s) => s.approved);
//         setStocks(approved);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       showToast("Failed to fetch stock data", "error");
//     } finally {
//       setTimeout(() => setLoading(false), 600);
//     }
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   const showToast = (msg, type) => {
//     setNotification({ message: msg, type });
//     setTimeout(() => setNotification({ message: "", type: "" }), 3000);
//   };

//   // --- Handlers ---
//   const openAddProductModal = (stock) => {
//     setSelectedStock(stock);
//     setProductForm({
//       name: stock.vegetable, // Auto-fill from stock
//       price: stock.price,    // Auto-fill suggested price
//       quantity: stock.quantity,
//       description: `Fresh ${stock.vegetable} sourced directly from ${stock.farmer?.name || 'our partner farmers'}.`,
//       image: "",
//     });
//   };

//   const handleCreateProduct = async () => {
//     if (!productForm.name || !productForm.price || !productForm.quantity) {
//       showToast("Please fill in all required fields", "error");
//       return;
//     }
    
//     try {
//       await api.post("/admin/products", {
//         name: productForm.name,
//         price: Number(productForm.price),
//         quantity: productForm.quantity,
//         type: "vegetable",
//         description: productForm.description,
//         image: productForm.image,
//       });
      
//       showToast("Product published to store successfully!", "success");
//       setSelectedStock(null); // Close modal
//       fetchStocks(); // Refresh list
//     } catch (err) {
//       console.error("Create error:", err);
//       showToast("Failed to create product", "error");
//     }
//   };

//   // --- Logic & Calculations ---
//   const totalValue = stocks.reduce((acc, curr) => acc + (curr.price * 1), 0); // Assuming price is unit price

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      
     

//       {/* Main Content */}
//       <main className="flex-1 lg:ml-64 p-4 sm:p-8">
        
//         {/* Header */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inventory Intake</h1>
//             <p className="text-slate-500 mt-1">Process approved farmer stocks into retail products.</p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={fetchStocks} className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 shadow-sm transition-all">
//               <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
//             </button>
//           </div>
//         </header>

//         {/* Stats Banner */}
//         <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-emerald-900/20 relative overflow-hidden">
//           <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
//           <div className="relative z-10 flex items-center gap-6">
//              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
//                <PackagePlus size={32} className="text-emerald-300" />
//              </div>
//              <div>
//                <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Pending Processing</p>
//                <h2 className="text-3xl font-bold mt-1">{stocks.length} Stocks Available</h2>
//              </div>
//              <div className="h-12 w-px bg-white/20 mx-2"></div>
//              <div>
//                 <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Estimated Value</p>
//                 <h2 className="text-3xl font-bold mt-1">₹{totalValue.toLocaleString()}</h2>
//              </div>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
//           <div className="p-5 border-b border-slate-100 flex justify-between items-center">
//             <h3 className="font-bold text-slate-800">Approved Stock List</h3>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//               <input type="text" placeholder="Search crops..." className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
//                   <th className="p-5">Source Farmer</th>
//                   <th className="p-5">Crop Name</th>
//                   <th className="p-5">Available Qty</th>
//                   <th className="p-5">Acquisition Cost</th>
//                   <th className="p-5 text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                    <><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
//                 ) : stocks.length > 0 ? (
//                   stocks.map((s) => (
//                     <tr key={s._id} className="hover:bg-slate-50/50 transition-colors group">
//                       <td className="p-5">
//                         <div className="flex items-center gap-3">
//                           <FarmerAvatar name={s.farmer?.name} />
//                           <div className="flex flex-col">
//                             <span className="font-semibold text-slate-900 text-sm">{s.farmer?.name || "Unknown Farmer"}</span>
//                             <span className="text-xs text-slate-400">Verified Source</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100">
//                           <Sprout size={14} />
//                           {s.vegetable}
//                         </span>
//                       </td>
//                       <td className="p-5 font-medium text-slate-700">{s.quantity}</td>
//                       <td className="p-5 font-medium text-slate-700">₹{s.price}</td>
//                       <td className="p-5 text-right">
//                         <button
//                           onClick={() => openAddProductModal(s)}
//                           className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-black text-xs font-bold rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 hover:shadow-emerald-200 group-hover:translate-x-[-5px]"
//                         >
//                           Process Stock <ArrowRight size={14} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="p-16 text-center">
//                       <div className="flex flex-col items-center justify-center text-slate-400">
//                         <div className="bg-slate-50 p-4 rounded-full mb-3">
//                           <Sprout size={32} className="text-slate-300" />
//                         </div>
//                         <p className="text-slate-900 font-medium">No approved stocks</p>
//                         <p className="text-sm mt-1">Wait for farmer submissions to be approved.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* MODAL: Convert Stock to Product */}
//         {selectedStock && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedStock(null)} />
            
//             <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden flex flex-col max-h-[90vh]">
              
//               {/* Modal Header */}
//               <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-bold text-black">Publish Product</h3>
//                   <p className="text-xs text-slate-500 mt-0.5">Convert raw stock into sellable inventory.</p>
//                 </div>
//                 <button onClick={() => setSelectedStock(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
//                   <X size={20} />
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6 overflow-y-auto">
                
//                 {/* Context Badge */}
//                 <div className="mb-6 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between">
//                    <div className="flex items-center gap-3">
//                      <div className="bg-white p-2 rounded-lg border border-amber-100 shadow-sm">
//                        <Sprout size={18} className="text-amber-600" />
//                      </div>
//                      <div>
//                        <p className="text-xs text-amber-800 font-bold uppercase">Source Stock</p>
//                        <p className="text-sm text-amber-900 font-medium">{selectedStock.vegetable} from {selectedStock.farmer?.name}</p>
//                      </div>
//                    </div>
//                    <div className="text-right">
//                      <p className="text-xs text-amber-800 font-bold uppercase">Orig. Cost</p>
//                      <p className="text-sm text-amber-900 font-medium">₹{selectedStock.price}</p>
//                    </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div className="col-span-2 md:col-span-1">
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Product Name</label>
//                     <div className="relative">
//                       <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                       <input
//                         type="text"
//                         value={productForm.name}
//                         onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
//                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm transition-all font-medium text-slate-900"
//                         placeholder="e.g. Organic Carrots"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-span-2 md:col-span-1">
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Selling Price (₹)</label>
//                     <div className="relative">
//                       <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                       <input
//                         type="number"
//                         value={productForm.price}
//                         onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
//                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm transition-all font-medium text-slate-900"
//                         placeholder="0.00"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-span-2 md:col-span-1">
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Quantity Unit</label>
//                     <div className="relative">
//                       <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                       <input
//                         type="text"
//                         value={productForm.quantity}
//                         onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
//                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm transition-all font-medium text-slate-900"
//                         placeholder="e.g. 1kg Pack"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-span-2 md:col-span-1">
//                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Product Image URL</label>
//                     <div className="relative">
//                       <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                       <input
//                         type="text"
//                         value={productForm.image}
//                         onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
//                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm transition-all font-medium text-slate-900 text-ellipsis"
//                         placeholder="https://..."
//                       />
//                     </div>
//                   </div>

//                   <div className="col-span-2">
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Description</label>
//                     <textarea
//                       rows={3}
//                       value={productForm.description}
//                       onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
//                       className="w-full p-4 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm transition-all font-medium text-slate-900 resize-none"
//                       placeholder="Describe the product details..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
//                 <button 
//                   onClick={() => setSelectedStock(null)}
//                   className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={handleCreateProduct}
//                   className="px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
//                 >
//                   <PackagePlus size={18} />
//                   Process & Publish
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <Toast message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

//       </main>
//     </div>
//   );
// }


// import { useState, useEffect, useMemo } from "react";
// import { 
//   Search, Filter, Sprout, ArrowRight, PackagePlus, 
//   DollarSign, Scale, Image as ImageIcon, X, 
//   CheckCircle, AlertCircle, RefreshCcw, Package,
//   LayoutGrid, List, TrendingUp, Leaf, Info, ChevronRight
// } from "lucide-react";
// import api from "../../api";

// // --- 1. UI COMPONENTS ---

// const ViewToggle = ({ view, setView }) => (
//   <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
//     <button 
//       onClick={() => setView('list')}
//       className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
//     >
//       <List size={18} />
//     </button>
//     <button 
//       onClick={() => setView('grid')}
//       className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
//     >
//       <LayoutGrid size={18} />
//     </button>
//   </div>
// );

// const QualityBadge = ({ quality }) => {
//   // Mock quality score visual
//   const score = quality || 95;
//   return (
//     <div className="flex items-center gap-1">
//       <div className="flex gap-0.5">
//         {[1,2,3,4,5].map(i => (
//           <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
//         ))}
//       </div>
//       <span className="text-[10px] font-bold text-slate-400 ml-1">A-GRADE</span>
//     </div>
//   );
// };

// // --- 2. MAIN PAGE ---

// export default function FarmerStock() {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("list"); // 'list' | 'grid'
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [notification, setNotification] = useState(null);

//   // Form State
//   const [productForm, setProductForm] = useState({
//     name: "", price: "", quantity: "", description: "", image: ""
//   });

//   // --- Fetch Data ---
//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmer-stock");
//       if (res.success) {
//         const approved = (res.stocks || []).filter((s) => s.approved);
//         setStocks(approved);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setTimeout(() => setLoading(false), 800);
//     }
//   };

//   useEffect(() => { fetchStocks(); }, []);

//   // --- Actions ---
//   const openModal = (stock) => {
//     setSelectedStock(stock);
//     setProductForm({
//       name: stock.vegetable,
//       price: Math.ceil(stock.price * 1.2), // Auto-suggest 20% margin
//       quantity: stock.quantity,
//       description: `Freshly harvested ${stock.vegetable} from local farms.`,
//       image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=200", // Placeholder
//     });
//   };

//   const handleCreate = async () => {
//     try {
//       await api.post("/admin/products", { ...productForm, type: "vegetable", price: Number(productForm.price) });
//       setNotification({ type: 'success', msg: 'Product published successfully!' });
//       setSelectedStock(null);
//       fetchStocks();
//       setTimeout(() => setNotification(null), 3000);
//     } catch (err) {
//       setNotification({ type: 'error', msg: 'Failed to publish product.' });
//     }
//   };

//   // --- Stats ---
//   const stats = {
//     count: stocks.length,
//     value: stocks.reduce((a, b) => a + (b.price || 0), 0),
//     avgPrice: stocks.length ? Math.round(stocks.reduce((a, b) => a + (b.price || 0), 0) / stocks.length) : 0
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 relative overflow-hidden">
      
//       {/* Background Mesh Gradient */}
//       <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-slate-50/50 to-transparent pointer-events-none" />

//       <div className="flex relative z-10">
      
//         {/* Content */}
//         <main className="flex-1 lg:ml-20 xl:ml-64 p-6 lg:p-10">
          
//           {/* Header & Actions */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
//             <div>
//               <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-2">
//                 <span className="px-2 py-0.5 bg-emerald-100 rounded-md">Admin Access</span>
//                 <ChevronRight size={14} />
//                 <span>Inventory Management</span>
//               </div>
//               <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Farmer Stock Intake</h1>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <div className="relative group">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input 
//                   type="text" 
//                   placeholder="Search crops..." 
//                   className="pl-10 pr-4 py-3 w-64 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
//                 />
//               </div>
//               <ViewToggle view={viewMode} setView={setViewMode} />
//               <button onClick={fetchStocks} className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
//                 <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
//               </button>
//             </div>
//           </div>

//           {/* Smart Stats Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
//               {/* <div className="absolute top-0 right-0 p-4 opacity-5"><Package size={100} /></div> */}
//               <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Actionable Stock</p>
//               <div className="flex items-end gap-2 mt-1">
//                 <h2 className="text-3xl font-bold text-slate-900">{stats.count}</h2>
//                 <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold mb-1">Requires Action</span>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
//               {/* <div className="absolute top-0 right-0 p-4 opacity-5"><DollarSign size={100} /></div> */}
//               <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Potential Revenue</p>
//               <div className="flex items-end gap-2 mt-1">
//                 <h2 className="text-3xl font-bold text-emerald-700">₹{(stats.value * 1.2).toLocaleString()}</h2>
//                 {/* <span className="flex items-center text-xs text-emerald-600 mb-1 font-bold"><TrendingUp size={12} className="mr-1"/> +20% Est.</span> */}
//               </div>
//             </div>

//              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
//               <div className="relative z-10">
//                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">System Status</p>
//                  <div className="flex items-center gap-2 mt-2">
//                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
//                    <span className="font-medium">Intake Operational</span>
//                  </div>
//               </div>
//               {/* Decorative circles */}
//               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
//             </div>
//           </div>

//           {/* --- LIST VIEW --- */}
//           {viewMode === 'list' && (
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
//                     <th className="p-5">Farmer / Source</th>
//                     <th className="p-5">Product Details</th>
//                     <th className="p-5">Stock Qty</th>
//                     <th className="p-5">Buy Price</th>
//                     <th className="p-5 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {stocks.map((s) => (
//                     <tr key={s._id} className="hover:bg-emerald-50/30 transition-colors group">
//                       <td className="p-5">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">👨‍🌾</div>
//                           <div>
//                             <p className="font-bold text-slate-900 text-sm">{s.farmer?.name}</p>
//                             <QualityBadge />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-sm font-medium border border-slate-200 inline-flex items-center gap-2">
//                           <Leaf size={12} className="text-emerald-600"/> {s.vegetable}
//                         </span>
//                       </td>
//                       <td className="p-5 font-medium text-slate-700">{s.quantity}</td>
//                       <td className="p-5 font-mono text-slate-600">₹{s.price}</td>
//                       <td className="p-5 text-right">
//                         <button onClick={() => openModal(s)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm">
//                           Process
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* --- GRID VIEW --- */}
//           {viewMode === 'grid' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {stocks.map((s) => (
//                 <div key={s._id} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="">
//                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">👨‍🌾</div>
//                        <div>
//                          <p className="text-sm font-bold text-slate-900">{s.farmer?.name}</p>
                        
//                        </div>
//                     </div>
//                     <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">{s.vegetable}</span>
//                   </div>
                  
//                   <div className="flex-1 bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-xs text-slate-400 uppercase font-bold">Quantity</span>
//                       <span className="text-sm font-bold text-slate-800">{s.quantity}</span>
//                     </div>
//                     <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
//                       <div className="bg-emerald-500 h-full w-3/4"></div>
//                     </div>
//                     <div className="mt-3 flex justify-between items-center">
//                       <span className="text-xs text-slate-400 uppercase font-bold">Cost</span>
//                       <span className="text-lg font-bold text-slate-900">₹{s.price}</span>
//                     </div>
//                   </div>

//                   <button 
//                     onClick={() => openModal(s)}
//                     className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
//                   >
//                     Convert to Product <ArrowRight size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {stocks.length === 0 && !loading && (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Sprout size={40} className="text-slate-300" />
//               </div>
//               <p className="text-slate-500">No stocks currently available.</p>
//             </div>
//           )}

//         </main>
//       </div>

//       {/* --- 3. PRODUCT BUILDER MODAL --- */}
//       {selectedStock && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40">
//           <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
            
//             {/* LEFT: Editor */}
//             <div className="w-full md:w-1/2 p-8 overflow-y-auto border-r border-slate-100 bg-white">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">Product Builder</h2>
//                   <p className="text-slate-500 text-sm">Configure listing details.</p>
//                 </div>
//                 <button onClick={() => setSelectedStock(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X size={18}/></button>
//               </div>

//               <div className="space-y-5">
//                 {/* Source Info */}
//                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
//                   <div>
//                     <p className="text-xs font-bold text-slate-400 uppercase">Source</p>
//                     <p className="text-sm font-bold text-slate-800">{selectedStock.farmer?.name}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs font-bold text-slate-400 uppercase">Base Cost</p>
//                     <p className="text-sm font-bold text-slate-800">₹{selectedStock.price}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Product Title</label>
//                   <input className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium" 
//                     value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Price (₹)</label>
//                     <input type="number" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
//                       value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Unit</label>
//                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
//                       value={productForm.quantity} onChange={e => setProductForm({...productForm, quantity: e.target.value})} />
//                   </div>
//                 </div>

//                  <div>
//                   <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Image URL</label>
//                   <input className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium text-sm"
//                     placeholder="https://..." value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Description</label>
//                   <textarea rows={4} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
//                     value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
//                 <button onClick={() => setSelectedStock(null)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
//                 <button onClick={handleCreate} className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all transform active:scale-95">Publish Product</button>
//               </div>
//             </div>

//             {/* RIGHT: Real-time Preview */}
//             <div className="hidden md:flex w-1/2 bg-slate-50 p-8 flex-col justify-center items-center border-l border-slate-200 relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
//               <div className="relative z-10 w-full max-w-xs">
//                 <p className="text-center text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Live App Preview</p>
                
//                 {/* The Card Preview */}
//                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
//                   <div className="h-48 bg-slate-200 relative">
//                     {productForm.image ? (
//                       <img src={productForm.image} className="w-full h-full object-cover" alt="Preview" />
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-slate-400"><ImageIcon size={32} /></div>
//                     )}
//                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
//                        {productForm.quantity || "1 Unit"}
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <h3 className="textflex items-center justify-between-lg font-bold text-slate-900 mb-1">{productForm.name || "Product Name"}</h3>
//                     <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{productForm.description || "Description will appear here..."}</p>
//                     <div className="flex items-center justify-between">
                    
//                       <div>
//                         <p className="text-xs text-slate-400 line-through">₹{Math.round(Number(productForm.price) * 1.1)}</p>
//                         <p className="text-xl font-bold text-emerald-600">₹{productForm.price || "0"}</p>
//                       </div>
//                       <button className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg">
//                         <PackagePlus size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notification Toast */}
//       {notification && (
//         <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up z-[60]">
//           {notification.type === 'success' ? <CheckCircle className="text-emerald-400" /> : <AlertCircle className="text-red-400" />}
//           <p className="font-medium">{notification.msg}</p>
//         </div>
//       )}

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { 
  Search, Sprout, ArrowRight, Package, 
  DollarSign, X, CheckCircle, RefreshCcw, 
  Leaf, MoreHorizontal, Zap
} from "lucide-react";
import api from "../../api";

// --- 0. CUSTOM ANIMATIONS & STYLES ---
const CustomStyles = () => (
  <style>{`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
      50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
    }
    .card-entry { animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    
    /* Custom Scrollbar for modal */
    .thin-scroll::-webkit-scrollbar { width: 6px; }
    .thin-scroll::-webkit-scrollbar-track { background: #f1f5f9; }
    .thin-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  `}</style>
);

// --- 1. DYNAMIC THEME ENGINE ---
const getTheme = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("tomato") || n.includes("chilli") || n.includes("apple") || n.includes("red")) 
    return { 
      gradient: "from-rose-400 to-orange-500", 
      bg: "bg-rose-50", 
      text: "text-rose-600",
      shadow: "group-hover:shadow-rose-200",
      icon: "🍅"
    };
  if (n.includes("potato") || n.includes("onion") || n.includes("ginger")) 
    return { 
      gradient: "from-amber-400 to-yellow-500", 
      bg: "bg-amber-50", 
      text: "text-amber-700",
      shadow: "group-hover:shadow-amber-200",
      icon: "🥔"
    };
  if (n.includes("carrot") || n.includes("pumpkin")) 
    return { 
      gradient: "from-orange-400 to-red-400", 
      bg: "bg-orange-50", 
      text: "text-orange-700",
      shadow: "group-hover:shadow-orange-200",
      icon: "🥕"
    };
  if (n.includes("brinjal") || n.includes("beet") || n.includes("onion")) 
    return { 
      gradient: "from-purple-500 to-indigo-500", 
      bg: "bg-purple-50", 
      text: "text-purple-700",
      shadow: "group-hover:shadow-purple-200",
      icon: "🍆"
    };
  
  // Default Green (Leafy)
  return { 
    gradient: "from-emerald-400 to-teal-500", 
    bg: "bg-emerald-50", 
    text: "text-emerald-700",
    shadow: "group-hover:shadow-emerald-200",
    icon: "🥬"
  };
};

export default function FarmerStock() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Form
  const [productForm, setProductForm] = useState({ name: "", price: "", quantity: "", description: "", image: "" });

  // Fetch
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/farmer-stock");
      if (res.success) setStocks((res.stocks || []).filter((s) => s.approved));
    } catch (err) { console.error(err); } 
    finally { setTimeout(() => setLoading(false), 800); }
  };

  useEffect(() => { fetchStocks(); }, []);

  // Actions
  const openModal = (stock) => {
    setSelectedStock(stock);
    setProductForm({
      name: stock.vegetable,
      price: Math.ceil(stock.price * 1.2),
      quantity: stock.quantity,
      description: `Fresh ${stock.vegetable} sourced from ${stock.farmer?.name}.`,
      image: `https://source.unsplash.com/200x200/?${stock.vegetable}`,
    });
  };

  const handleCreate = async () => {
    try {
      await api.post("/admin/products", { ...productForm, type: "vegetable", price: Number(productForm.price) });
      setNotification("Product Published Successfully!");
      setSelectedStock(null);
      fetchStocks();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen  font-sans text-slate-800 pb-20 relative overflow-x-hidden" style={{backgroundColor:"#a5ddaaff",padding:"30px",borderRadius:"20px"}}>
      <CustomStyles />
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/80 to-transparent -z-10"></div>
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>

      {/* --- HEADER --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg shadow-slate-900/20">
            <Sprout size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Farmer Stock</h1>
            <p className="text-xs text-slate-500 font-medium">Live Inventory Feed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3" >
          <div className="hidden md:flex items-center bg-white  rounded-full px-4 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all">
            <Search size={14} className="text-slate-400 mr-2"/>
            <input placeholder="Search..." className="bg-transparent outline-none text-sm w-32 lg:w-48" />
          </div>
          <button onClick={fetchStocks} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 transition-transform active:rotate-180">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* --- COMPACT CARD GRID --- */}
      <div className="p-6 max-w-[1600px] mx-auto"  >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" >
          
          {loading ? (
             [...Array(10)].map((_, i) => (
               <div key={i} className="h-36 bg-white rounded-2xl border border-slate-100 animate-pulse shadow-sm"></div>
             ))
          ) : (
            stocks.map((s, idx) => {
              const theme = getTheme(s.vegetable);
              return (
                <div 
                  key={s._id}
                  onClick={() => openModal(s)}
                  style={{ animationDelay: `${idx * 50}ms`,borderRadius:"20px",backgroundColor:"#f5eef5ff"}}
                  
                  className={`card-entry group relative  rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme.shadow} border border-slate-100 overflow-hidden`}
                >
                  {/* Gradient Border Top */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradient}`} ></div>
                  
                  {/* Card Body */}
                  <div className="flex justify-between items-start mb-2" >
                    <div className={`w-11 h-11 rounded-2xl ${theme.bg} flex items-center justify-center text-2xl shadow-inner`} >
                      {theme.icon} 
                    </div>
                    <div className="text-right">
                       <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock</span>
                       <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold border border-slate-200">
                         {s.quantity}
                       </span>
                    </div>
                  </div>

                  <div className="mt-2" >
                    <h3 className="font-bold text-slate-800 text-sm truncate">{s.vegetable}</h3>
                    <p className="text-xs text-slate-400 truncate mb-4">From {s.farmer?.name}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-100">
                      <div>
                         <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Price</span>
                         <span className={`text-base font-bold ${theme.text}`}>₹{s.price}</span>
                      </div>
                      
                      {/* Animated Button */}
                      <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-slate-900/30 hover:bg-emerald-500">
                        <ArrowRight size={14} />
                      </button>
                      
                      {/* Placeholder for non-hover state */}
                      <div className="w-8 h-8 flex items-center justify-center group-hover:opacity-0 transition-opacity absolute right-4 bottom-4 text-slate-300">
                        <MoreHorizontal size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {!loading && stocks.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium">No incoming stock requests.</p>
          </div>
        )}
      </div>

      {/* --- SLICK MODAL (Compact & Clean) --- */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            {/* Dynamic Header */}
            <div className={`px-8 py-6 bg-gradient-to-r ${getTheme(selectedStock.vegetable).gradient} text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 translate-x-2 -translate-y-2">
                <Leaf size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Publishing</p>
                    <h2 className="text-3xl font-bold">{selectedStock.vegetable}</h2>
                  </div>
                  <button onClick={() => setSelectedStock(null)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-md transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                     👨‍🌾 {selectedStock.farmer?.name}
                  </span>
                  <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium">
                     Ref: #{selectedStock._id.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-5 overflow-y-auto thin-scroll" style={{borderRadius:"10px"}}>
              
              {/* Input Group 1 */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Product Name</label>
                <input 
                  className="w-full mt-1.5 p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  value={productForm.name}
                  onChange={e => setProductForm({...productForm, name: e.target.value})}
                />
              </div>

              {/* Input Group 2 (Row) */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Price (₹)</label>
                  <div className="relative mt-1.5">
                    <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input 
                      type="number"
                      className="w-full pl-10 p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                      value={productForm.price}
                      onChange={e => setProductForm({...productForm, price: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Quantity</label>
                  <input 
                    className="w-full mt-1.5 p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                    value={productForm.quantity}
                    onChange={e => setProductForm({...productForm, quantity: e.target.value})}
                  />
                </div>
              </div>

              {/* Input Group 3 */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Image URL</label>
                <input 
                   placeholder="https://..."
                   className="w-full mt-1.5 p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-600 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                   value={productForm.image}
                   onChange={e => setProductForm({...productForm, image: e.target.value})}
                />
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button 
                  onClick={handleCreate}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-xl shadow-slate-900/20 hover:bg-emerald-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={18} className="fill-current" /> Publish to Store
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[60] animate-slideUp">
          <div className="bg-emerald-500 rounded-full p-1"><CheckCircle size={14} /></div>
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}
    </div>
  );
}