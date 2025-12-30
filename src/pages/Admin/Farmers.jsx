// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Farmers() {
//   const [farmers,setFarmers] = useState([]);

//   const fetchFarmers = async()=> {
//     const res = await api.get("/admin/farmers");
//     if(res.success) setFarmers(res.farmers);
//   };

//   useEffect(()=>{ fetchFarmers(); }, []);

//   const approve = async id => { await api.put(`/admin/farmers/approve/${id}`); fetchFarmers(); };
//   const reject = async id => { await api.delete(`/admin/farmers/reject/${id}`); fetchFarmers(); };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Farmers</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Approved</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {farmers.map(f=>(
//               <tr key={f._id} className="border-b">
//                 <td className="p-2">{f.name}</td>
//                 <td className="p-2">{f.email}</td>
//                 <td className="p-2">{f.approved ? "Yes" : "No"}</td>
//                 <td className="p-2 space-x-2">
//                   {!f.approved && <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={()=>approve(f._id)}>Approve</button>}
//                   <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>reject(f._id)}>Reject</button>
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

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all farmers
//   const fetchFarmers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmers");
//       if (res.success) setFarmers(res.farmers);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchFarmers(); }, []);

//   // Approve farmer
//   const handleApproveFarmer = async (id) => {
//     await api.put(`/admin/farmers/approve/${id}`);
//     fetchFarmers();
//   };

//   // Reject farmer
//   const handleRejectFarmer = async (id) => {
//     await api.delete(`/admin/farmers/reject/${id}`);
//     fetchFarmers();
//   };

//   // Approve stock
//   const handleApproveStock = async (stockId) => {
//     await api.put(`/admin/farmer-stock/approve/${stockId}`);
//     fetchFarmers();
//   };

//   // Reject stock
//   const handleRejectStock = async (stockId) => {
//     await api.delete(`/admin/farmer-stock/reject/${stockId}`);
//     fetchFarmers();
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Farmers</h2>

//       {loading ? (
//         <div className="text-center py-10 text-gray-500">Loading...</div>
//       ) : (
//         <div className="space-y-6">
//           {farmers.map(f => (
//             <div key={f._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
//               {/* Farmer Info */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold">{f.name}</h3>
//                   <p className="text-gray-500">{f.email}</p>
//                   <p className={`mt-1 font-semibold ${f.approved ? "text-green-600" : "text-red-600"}`}>
//                     {f.approved ? "Approved" : "Pending Approval"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {!f.approved && (
//                     <>
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         onClick={() => handleApproveFarmer(f._id)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         onClick={() => handleRejectFarmer(f._id)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Farmer Stock Table */}
//               <div>
//                 <h4 className="font-semibold mb-2">Products/Stock</h4>
//                 {f.stock && f.stock.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full border rounded">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="p-2 text-left">Name</th>
//                           <th className="p-2 text-left">Price</th>
//                           <th className="p-2 text-left">Quantity</th>
//                           <th className="p-2 text-left">Approved</th>
//                           <th className="p-2 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {f.stock.map(stock => (
//                           <tr key={stock._id} className="border-b hover:bg-gray-50 transition">
//                             <td className="p-2">{stock.name}</td>
//                             <td className="p-2">₹{stock.price}</td>
//                             <td className="p-2">{stock.quantity}</td>
//                             <td className="p-2">{stock.approved ? "Yes" : "No"}</td>
//                             <td className="p-2 space-x-2">
//                               {!stock.approved && (
//                                 <>
//                                   <button
//                                     className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
//                                     onClick={() => handleApproveStock(stock._id)}
//                                   >
//                                     Approve
//                                   </button>
//                                   <button
//                                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                                     onClick={() => handleRejectStock(stock._id)}
//                                   >
//                                     Reject
//                                   </button>
//                                 </>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No stock submitted yet.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all farmers with their stock
//   const fetchFarmers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmers"); // backend should populate stock
//       if (res.success) setFarmers(res.farmers);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchFarmers(); }, []);

//   // Approve / Reject farmer
//   const handleApproveFarmer = async (id) => { await api.put(`/admin/farmers/approve/${id}`); fetchFarmers(); };
//   const handleRejectFarmer = async (id) => { await api.delete(`/admin/farmers/reject/${id}`); fetchFarmers(); };

//   // Approve / Reject stock
//   const handleApproveStock = async (stockId) => { await api.put(`/admin/farmer-stock/approve/${stockId}`); fetchFarmers(); };
//   const handleRejectStock = async (stockId) => { await api.delete(`/admin/farmer-stock/reject/${stockId}`); fetchFarmers(); };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Farmers Dashboard</h2>

//       {loading ? (
//         <div className="text-center py-10 text-gray-500">Loading...</div>
//       ) : (
//         <div className="space-y-6">
//           {farmers.map(f => (
//             <div key={f._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
//               {/* Farmer Info */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold">{f.name}</h3>
//                   <p className="text-gray-500">{f.email}</p>
//                   <p className={`mt-1 font-semibold ${f.approved ? "text-green-600" : "text-red-600"}`}>
//                     {f.approved ? "Approved" : "Pending Approval"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {!f.approved && (
//                     <>
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         onClick={() => handleApproveFarmer(f._id)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         onClick={() => handleRejectFarmer(f._id)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Farmer Stock Table */}
//               <div>
//                 <h4 className="font-semibold mb-2">Products / Stock</h4>
//                 {f.stock && f.stock.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full border rounded">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="p-2 text-left">Name</th>
//                           <th className="p-2 text-left">Price</th>
//                           <th className="p-2 text-left">Quantity</th>
//                           <th className="p-2 text-left">Approved</th>
//                           <th className="p-2 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {f.stock.map(stock => (
//                           <tr key={stock._id} className="border-b hover:bg-gray-50 transition">
//                             <td className="p-2">{stock.name}</td>
//                             <td className="p-2">₹{stock.price}</td>
//                             <td className="p-2">{stock.quantity}</td>
//                             <td className="p-2">{stock.approved ? "Yes" : "No"}</td>
//                             <td className="p-2 space-x-2">
//                               {!stock.approved && (
//                                 <>
//                                   <button
//                                     className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
//                                     onClick={() => handleApproveStock(stock._id)}
//                                   >
//                                     Approve
//                                   </button>
//                                   <button
//                                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                                     onClick={() => handleRejectStock(stock._id)}
//                                   >
//                                     Reject
//                                   </button>
//                                 </>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No stock submitted yet.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch all farmers along with their stock
//   const fetchFarmers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmers");
//       if (res.data.success) {
//         setFarmers(res.data.farmers);
//       } else {
//         console.error("Failed to fetch farmers:", res.data.message);
//         setMessage(res.data.message || "Failed to fetch farmers");
//       }
//     } catch (err) {
//       console.error("Error fetching farmers:", err);
//       setMessage("Server error while fetching farmers");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchFarmers();
//   }, []);

//   // Approve / Reject farmer
//   const handleApproveFarmer = async (id) => {
//     try {
//       const res = await api.put(`/admin/farmers/approve/${id}`);
//       if (res.data.success) fetchFarmers();
//     } catch (err) {
//       console.error("Error approving farmer:", err);
//     }
//   };

//   const handleRejectFarmer = async (id) => {
//     try {
//       const res = await api.delete(`/admin/farmers/reject/${id}`);
//       if (res.data.success) fetchFarmers();
//     } catch (err) {
//       console.error("Error rejecting farmer:", err);
//     }
//   };

//   // Approve / Reject stock
//   const handleApproveStock = async (stockId) => {
//     try {
//       const res = await api.put(`/admin/farmer-stock/approve/${stockId}`);
//       if (res.data.success) fetchFarmers();
//     } catch (err) {
//       console.error("Error approving stock:", err);
//     }
//   };

//   const handleRejectStock = async (stockId) => {
//     try {
//       const res = await api.delete(`/admin/farmer-stock/reject/${stockId}`);
//       if (res.data.success) fetchFarmers();
//     } catch (err) {
//       console.error("Error rejecting stock:", err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Farmers Dashboard</h2>

//       {message && <p className="text-red-600 mb-4">{message}</p>}

//       {loading ? (
//         <div className="text-center py-10 text-gray-500">Loading...</div>
//       ) : (
//         <div className="space-y-6">
//           {farmers.length === 0 && <p className="text-gray-500">No farmers found.</p>}

//           {farmers.map((farmer) => (
//             <div key={farmer._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
//               {/* Farmer Info */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold">{farmer.user?.name}</h3>
//                   <p className="text-gray-500">{farmer.user?.email}</p>
//                   <p
//                     className={`mt-1 font-semibold ${
//                       farmer.approved ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {farmer.approved ? "Approved" : "Pending Approval"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {!farmer.approved && (
//                     <>
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         onClick={() => handleApproveFarmer(farmer._id)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         onClick={() => handleRejectFarmer(farmer._id)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Farmer Stock Table */}
//               <div>
//                 <h4 className="font-semibold mb-2">Products / Stock</h4>
//                 {farmer.stock && farmer.stock.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full border rounded">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="p-2 text-left">Name</th>
//                           <th className="p-2 text-left">Price</th>
//                           <th className="p-2 text-left">Quantity</th>
//                           <th className="p-2 text-left">Status</th>
//                           <th className="p-2 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {farmer.stock.map((stock) => (
//                           <tr key={stock._id} className="border-b hover:bg-gray-50 transition">
//                             <td className="p-2">{stock.name}</td>
//                             <td className="p-2">₹{stock.price}</td>
//                             <td className="p-2">{stock.quantity}</td>
//                             <td className="p-2">
//                               {stock.approved ? "Approved" : "Pending"}
//                             </td>
//                             <td className="p-2 space-x-2">
//                               {!stock.approved && (
//                                 <>
//                                   <button
//                                     className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
//                                     onClick={() => handleApproveStock(stock._id)}
//                                   >
//                                     Approve
//                                   </button>
//                                   <button
//                                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                                     onClick={() => handleRejectStock(stock._id)}
//                                   >
//                                     Reject
//                                   </button>
//                                 </>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No stock submitted yet.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Farmer() {
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
//       <h2 className="text-xl font-bold mb-4">Farmers</h2>
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


// //  FARMERS.JSX (WITH APPROVE/REJECT + VIEW DETAILS) 
// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [farmerProducts, setFarmerProducts] = useState([]);

//   const fetchFarmers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/farmers");
//       if (res.success) setFarmers(res.farmers);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFarmers();
//   }, []);

//   const approveFarmer = async (id) => {
//     try {
//       await api.put(`/admin/farmers/approve/${id}`);
//       alert("Farmer approved!");
//       fetchFarmers();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve farmer");
//     }
//   };

//   const rejectFarmer = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this farmer?")) return;
//     try {
//       await api.delete(`/admin/farmers/reject/${id}`);
//       alert("Farmer rejected!");
//       fetchFarmers();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reject farmer");
//     }
//   };

//   const viewFarmerDetails = async (farmer) => {
//     setSelectedFarmer(farmer);
//     try {
//       const res = await api.get(`/admin/farmer-stock?farmerId=${farmer._id}`);
//       setFarmerProducts(res.stocks || []);
//     } catch (err) {
//       console.error(err);
//       setFarmerProducts([]);
//     }
//   };

//   if (loading) return <p className="text-center">Loading farmers...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Manage Farmers</h2>

//       {/* Farmers Table */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {farmers.map((farmer) => (
//               <tr key={farmer._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{farmer.name}</td>
//                 <td className="p-3">{farmer.email}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       farmer.approved
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {farmer.approved ? "Approved" : "Pending"}
//                   </span>
//                 </td>
//                 <td className="p-3 flex gap-2">
//                   <button
//                     onClick={() => viewFarmerDetails(farmer)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
//                   >
//                     <FaEye /> View
//                   </button>
//                   {!farmer.approved && (
//                     <button
//                       onClick={() => approveFarmer(farmer._id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
//                     >
//                       <FaCheck /> Approve
//                     </button>
//                   )}
//                   <button
//                     onClick={() => rejectFarmer(farmer._id)}
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

//       {/* Farmer Details Modal */}
//       {selectedFarmer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-2xl font-bold">Farmer Details</h3>
//               <button
//                 onClick={() => setSelectedFarmer(null)}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="mb-6 p-4 bg-gray-50 rounded">
//               <p className="mb-2">
//                 <strong>Name:</strong> {selectedFarmer.name}
//               </p>
//               <p className="mb-2">
//                 <strong>Email:</strong> {selectedFarmer.email}
//               </p>
//               <p className="mb-2">
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={`px-2 py-1 rounded text-sm ${
//                     selectedFarmer.approved
//                       ? "bg-green-200 text-green-800"
//                       : "bg-yellow-200 text-yellow-800"
//                   }`}
//                 >
//                   {selectedFarmer.approved ? "Approved" : "Pending"}
//                 </span>
//               </p>
//             </div>

//             <h4 className="text-xl font-bold mb-3">Products Added by Farmer</h4>
//             {farmerProducts.length === 0 ? (
//               <p className="text-gray-500">No products yet</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="p-2 border">Vegetable</th>
//                       <th className="p-2 border">Quantity</th>
//                       <th className="p-2 border">Price</th>
//                       <th className="p-2 border">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {farmerProducts.map((product) => (
//                       <tr key={product._id} className="border">
//                         <td className="p-2 border">{product.vegetable}</td>
//                         <td className="p-2 border">{product.quantity}</td>
//                         <td className="p-2 border">₹{product.price}</td>
//                         <td className="p-2 border">
//                           <span
//                             className={`px-2 py-1 rounded text-xs ${
//                               product.approved
//                                 ? "bg-green-200 text-green-800"
//                                 : "bg-yellow-200 text-yellow-800"
//                             }`}
//                           >
//                             {product.approved ? "Approved" : "Pending"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/pages/Admin/Farmers.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [stocks, setStocks] = useState([]);

//   const fetchFarmers = async () => {
//     try {
//       const res = await api.get("/admin/farmers");
//       if (res.success) setFarmers(res.farmers);
//     } catch (err) {
//       console.error("Fetch farmers error:", err);
//     }
//   };

//   const fetchStocks = async () => {
//     try {
//       const res = await api.get("/admin/farmer-stock");
//       if (res.success) setStocks(res.stocks);
//     } catch (err) {
//       console.error("Fetch farmer stock error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchFarmers();
//     fetchStocks();
//   }, []);

//   const approveStock = async (id) => {
//     try {
//       await api.put(`/admin/farmer-stock/approve/${id}`);
//       fetchStocks();
//     } catch (err) {
//       console.error("Approve stock error:", err);
//     }
//   };

//   const rejectStock = async (id) => {
//     try {
//       await api.delete(`/admin/farmer-stock/reject/${id}`);
//       fetchStocks();
//     } catch (err) {
//       console.error("Reject stock error:", err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-green-800">Farmers</h2>
//       <div className="space-y-4">
//         {farmers.map((farmer) => {
//           const farmerStocks = stocks.filter(
//             (s) => s.farmer?._id === farmer._id && !s.approved
//           );

//           return (
//             <div
//               key={farmer._id}
//               className="bg-white rounded-xl shadow border border-gray-100 p-4"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {farmer.name}
//                   </h3>
//                   <p className="text-xs text-gray-600">{farmer.email}</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Pending Products:{" "}
//                   <span className="font-semibold">
//                     {farmerStocks.length}
//                   </span>
//                 </p>
//               </div>

//               {farmerStocks.length > 0 ? (
//                 <div className="overflow-x-auto mt-2">
//                   <table className="min-w-full text-xs">
//                     <thead className="bg-green-600 text-white">
//                       <tr>
//                         <th className="p-2 text-left">Product</th>
//                         <th className="p-2 text-left">Quantity</th>
//                         <th className="p-2 text-left">Price</th>
//                         <th className="p-2 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {farmerStocks.map((s) => (
//                         <tr key={s._id} className="border-b">
//                           <td className="p-2">{s.vegetable}</td>
//                           <td className="p-2">{s.quantity}</td>
//                           <td className="p-2">₹{s.price}</td>
//                           <td className="p-2 space-x-2">
//                             <button
//                               className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
//                               onClick={() => approveStock(s._id)}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
//                               onClick={() => rejectStock(s._id)}
//                             >
//                               Reject
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-xs text-gray-500 mt-1">
//                   No pending products from this farmer.
//                 </p>
//               )}
//             </div>
//           );
//         })}

//         {farmers.length === 0 && (
//           <p className="text-gray-600 text-sm">No farmers found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// // src/pages/Admin/Farmers.jsx
// import { useState, useEffect } from "react";
// import { 
//   Search, 
//   CheckCircle2, 
//   XCircle, 
//   Users, 
//   Package, 
//   Sprout, 
//   AlertCircle 
// } from "lucide-react";
// import api from "../../api";

// export default function Farmers() {
//   const [farmers, setFarmers] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [resFarmers, resStocks] = await Promise.all([
//         api.get("/admin/farmers"),
//         api.get("/admin/farmer-stock")
//       ]);

//       if (resFarmers.success) setFarmers(resFarmers.farmers);
//       if (resStocks.success) setStocks(resStocks.stocks);
//     } catch (err) {
//       console.error("Data fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const approveStock = async (id) => {
//     try {
//       await api.put(`/admin/farmer-stock/approve/${id}`);
//       // Optimistic update for faster UI
//       setStocks((prev) => prev.map(s => s._id === id ? { ...s, approved: true } : s));
//       // Re-fetch to ensure sync
//       fetchData(); 
//     } catch (err) {
//       console.error("Approve stock error:", err);
//     }
//   };

//   const rejectStock = async (id) => {
//     if(!window.confirm("Are you sure you want to reject this stock listing?")) return;
//     try {
//       await api.delete(`/admin/farmer-stock/reject/${id}`);
//       setStocks((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Reject stock error:", err);
//     }
//   };

//   // Filter Logic
//   const filteredFarmers = farmers.filter(farmer => 
//     farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Stats Calculation
//   const totalPending = stocks.filter(s => !s.approved).length;
//   const totalFarmers = farmers.length;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
//       {/* --- Header Section --- */}
//       <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
//         <div>
//           <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
//             Farmer Management
//           </h2>
//           <p className="text-gray-500 mt-1 text-sm">
//             Manage registered farmers and approve their product listings.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="flex gap-3">
//           <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
//             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//               <Users size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 font-medium uppercase">Farmers</p>
//               <p className="text-xl font-bold text-gray-800">{totalFarmers}</p>
//             </div>
//           </div>
//           <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
//             <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
//               <Package size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 font-medium uppercase">Pending</p>
//               <p className="text-xl font-bold text-gray-800">{totalPending}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- Search Bar --- */}
//       <div className="relative mb-8">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Search className="h-5 w-5 text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm"
//           placeholder="Search farmers by name or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* --- Main Grid Content --- */}
//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
//           {[1, 2, 3].map((n) => (
//             <div key={n} className="h-64 bg-gray-200 rounded-2xl"></div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredFarmers.map((farmer) => {
//             const pendingStocks = stocks.filter(
//               (s) => s.farmer?._id === farmer._id && !s.approved
//             );

//             return (
//               <div
//                 key={farmer._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 border border-gray-100 overflow-hidden transition-all duration-300 group flex flex-col"
//               >
//                 {/* Card Header */}
//                 <div className="p-5 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
//                   <div className="flex justify-between items-start">
//                     <div className="flex items-center gap-3">
//                       {/* Avatar Generator based on name */}
//                       <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
//                         {farmer.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors">
//                           {farmer.name}
//                         </h3>
//                         <p className="text-xs text-gray-500 font-mono">
//                           {farmer.email}
//                         </p>
//                       </div>
//                     </div>
//                     {pendingStocks.length > 0 ? (
//                       <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
//                         {pendingStocks.length} Pending
//                       </span>
//                     ) : (
//                       <span className="bg-gray-100 text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
//                         Clear
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Card Body (Stock List) */}
//                 <div className="p-5 flex-1 flex flex-col">
//                   {pendingStocks.length > 0 ? (
//                     <div className="space-y-3">
//                       <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//                         Approvals Needed
//                       </h4>
//                       {pendingStocks.map((s) => (
//                         <div
//                           key={s._id}
//                           className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-green-200 transition-colors"
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <div className="flex items-center gap-2">
//                               <Sprout size={16} className="text-green-600" />
//                               <span className="font-semibold text-gray-700 text-sm">
//                                 {s.vegetable}
//                               </span>
//                             </div>
//                             <span className="text-emerald-700 font-bold text-sm">
//                               ₹{s.price}
//                             </span>
//                           </div>
                          
//                           <div className="flex justify-between items-center mt-3">
//                             <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
//                               Qty: {s.quantity}
//                             </span>
                            
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => approveStock(s._id)}
//                                 className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
//                                 title="Approve"
//                               >
//                                 <CheckCircle2 size={18} />
//                               </button>
//                               <button
//                                 onClick={() => rejectStock(s._id)}
//                                 className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
//                                 title="Reject"
//                               >
//                                 <XCircle size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="h-full flex flex-col items-center justify-center text-center py-6 opacity-60">
//                       <CheckCircle2 size={40} className="text-green-200 mb-2" />
//                       <p className="text-sm text-gray-400">All caught up!</p>
//                       <p className="text-xs text-gray-300">No pending items for this farmer.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && filteredFarmers.length === 0 && (
//         <div className="text-center py-20">
//           <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Search size={32} className="text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900">No farmers found</h3>
//           <p className="text-gray-500 max-w-sm mx-auto mt-2">
//             We couldn't find any farmers matching your search. Try adjusting your filters.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/Admin/Farmers.jsx
import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Users,
  Package,
  Sprout,
} from "lucide-react";
import api from "../../api";
import "./Farmers.css";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resFarmers, resStocks] = await Promise.all([
        api.get("/admin/farmers"),
        api.get("/admin/farmer-stock"),
      ]);

      if (resFarmers.success) setFarmers(resFarmers.farmers || []);
      if (resStocks.success) setStocks(resStocks.stocks || []);
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveStock = async (id) => {
    try {
      await api.put(`/admin/farmer-stock/approve/${id}`);
      setStocks((prev) =>
        prev.map((s) => (s._id === id ? { ...s, approved: true } : s))
      );
      fetchData();
    } catch (err) {
      console.error("Approve stock error:", err);
    }
  };

  const rejectStock = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to reject this stock listing?"
      )
    )
      return;
    try {
      await api.delete(`/admin/farmer-stock/reject/${id}`);
      setStocks((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Reject stock error:", err);
    }
  };

  // Filter Logic
  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      farmer.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalPending = stocks.filter((s) => !s.approved).length;
  const totalFarmers = farmers.length;

  return (
    <div className="farmers-page">
      <div className="farmers-container custom-scrollbar">
        {/* Header + Stats */}
        <div className="farmers-header">
          <div>
            <h2 className="farmers-header__title">
              Farmer Management
            </h2>
            <p className="farmers-header__subtitle">
              Manage registered farmers and approve their product
              listings.
            </p>
          </div>

          <div className="farmers-stats">
            <div className="farmers-stat-card farmers-stat-card--farmers">
              <div>
                <p className="farmers-stat-label">Farmers</p>
                <p className="farmers-stat-value">{totalFarmers}</p>
              </div>
              <div className="farmers-stat-icon farmers-stat-icon--blue">
                <Users size={20} />
              </div>
            </div>
            <div className="farmers-stat-card farmers-stat-card--pending">
              <div>
                <p className="farmers-stat-label">Pending</p>
                <p className="farmers-stat-value">{totalPending}</p>
              </div>
              <div className="farmers-stat-icon farmers-stat-icon--amber">
                <Package size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="farmers-search">
          <span className="farmers-search__icon">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="farmers-search__input"
            placeholder="Search farmers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="farmers-skeleton-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="farmer-skeleton-card" />
            ))}
          </div>
        ) : (
          <>
            {filteredFarmers.length > 0 ? (
              <div className="farmers-grid">
                {filteredFarmers.map((farmer) => {
                  const pendingStocks = stocks.filter(
                    (s) =>
                      s.farmer?._id === farmer._id && !s.approved
                  );

                  return (
                    <div
                      key={farmer._id}
                      className="farmer-card"
                    >
                      {/* Card Header */}
                      <div className="farmer-card__header">
                        <div className="farmer-header-main">
                          <div className="farmer-avatar">
                            {farmer.name
                              ?.charAt(0)
                              .toUpperCase() || "F"}
                          </div>
                          <div>
                            <h3 className="farmer-name">
                              {farmer.name}
                            </h3>
                            <p className="farmer-email">
                              {farmer.email}
                            </p>
                          </div>
                        </div>
                        {pendingStocks.length > 0 ? (
                          <span className="farmer-badge farmer-badge--pending">
                            {pendingStocks.length} Pending
                          </span>
                        ) : (
                          <span className="farmer-badge farmer-badge--clear">
                            Clear
                          </span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="farmer-card__body">
                        {pendingStocks.length > 0 ? (
                          <div className="farmer-approvals">
                            <h4 className="farmer-approvals__title">
                              Approvals Needed
                            </h4>
                            {pendingStocks.map((s) => (
                              <div
                                key={s._id}
                                className="stock-card"
                              >
                                <div className="stock-card__top">
                                  <div className="stock-main">
                                    <Sprout
                                      size={16}
                                      className="stock-main__icon"
                                    />
                                    <span className="stock-main__name">
                                      {s.vegetable}
                                    </span>
                                  </div>
                                  <span className="stock-price">
                                    LKR {s.price}
                                  </span>
                                </div>

                                <div className="stock-card__bottom">
                                  <span className="stock-qty">
                                    Qty: {s.quantity}
                                  </span>
                                  <div className="stock-actions">
                                    <button
                                      onClick={() =>
                                        approveStock(s._id)
                                      }
                                      className="stock-btn stock-btn--approve"
                                      title="Approve"
                                    >
                                      <CheckCircle2 size={18} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        rejectStock(s._id)
                                      }
                                      className="stock-btn stock-btn--reject"
                                      title="Reject"
                                    >
                                      <XCircle size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="farmer-empty">
                            <CheckCircle2
                              size={40}
                              className="farmer-empty__icon"
                            />
                            <p className="farmer-empty__text">
                              All caught up!
                            </p>
                            <p className="farmer-empty__sub">
                              No pending items for this farmer.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty state for no farmers after filter
              <div className="farmers-empty-state">
                <div className="farmers-empty-icon">
                  <Search size={32} />
                </div>
                <h3 className="farmers-empty-title">
                  No farmers found
                </h3>
                <p className="farmers-empty-sub">
                  We couldn't find any farmers matching your search.
                  Try adjusting your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}