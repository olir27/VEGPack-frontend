// // src/pages/Admin/AdminReviews.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";
// import { Star } from "lucide-react";

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReviews = async () => {
//     try {
//       const res = await api.get("/reviews/admin/all"); // GET /api/reviews/admin/all
//       setReviews(res.reviews || []);
//     } catch (err) {
//       console.error("Fetch all reviews error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       await api.put(`/reviews/approve/${id}`); // PUT /api/reviews/approve/:id
//       fetchReviews();
//     } catch (err) {
//       console.error("Approve review error:", err);
//     }
//   };

//   if (loading) return <p>Loading reviews...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-green-800">
//         Customer Reviews
//       </h2>
//       <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
//         <table className="min-w-full text-sm">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2 text-left">Product</th>
//               <th className="p-2 text-left">Customer</th>
//               <th className="p-2 text-left">Rating</th>
//               <th className="p-2 text-left">Comment</th>
//               <th className="p-2 text-left">Approved</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((r) => (
//               <tr key={r._id} className="border-b hover:bg-green-50">
//                 <td className="p-2">{r.product?.name || "-"}</td>
//                 <td className="p-2">
//                   {r.customer?.name} ({r.customer?.email})
//                 </td>
//                 <td className="p-2">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         className={
//                           i < r.rating
//                             ? "text-yellow-500 fill-yellow-400"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                   </div>
//                 </td>
//                 <td className="p-2 max-w-xs">
//                   <span className="line-clamp-2">{r.comment}</span>
//                 </td>
//                 <td className="p-2">{r.approved ? "Yes" : "No"}</td>
//                 <td className="p-2">
//                   {!r.approved && (
//                     <button
//                       className="px-3 py-1 bg-green-600 text-white rounded-full text-xs hover:bg-green-700"
//                       onClick={() => handleApprove(r._id)}
//                     >
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {reviews.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="p-3 text-center text-gray-500">
//                   No reviews found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import api from "../../api";
// import { 
//   Star, CheckCircle, XCircle, MessageSquare, 
//   Search, Trash2, RefreshCcw, ShieldCheck, 
//   User, MoreHorizontal, Filter, ThumbsUp
// } from "lucide-react";

// // --- 0. CUSTOM CSS (Subtle & Professional) ---
// const CustomStyles = () => (
//   <style>{`
//     .fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; transform: translateY(10px); }
//     @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
    
//     .line-clamp-3 {
//       display: -webkit-box;
//       -webkit-line-clamp: 3;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }
//   `}</style>
// );

// // --- 1. COMPONENTS ---

// const RatingStars = ({ rating }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map((star) => (
//       <Star 
//         key={star} 
//         size={13} 
//         className={star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} 
//       />
//     ))}
//   </div>
// );

// const StatusChip = ({ isApproved }) => {
//   if (isApproved) {
//     return (
//       <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
//         <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Published
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
//       <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
//     </span>
//   );
// };

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("pending");
//   const [search, setSearch] = useState("");
//   const [notification, setNotification] = useState(null);

//   // --- API FETCH ---
//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/reviews/admin/all");
//       if (res.reviews) setReviews(res.reviews);
//     } catch (err) { console.error(err); } 
//     finally { setTimeout(() => setLoading(false), 600); }
//   };

//   useEffect(() => { fetchReviews(); }, []);

//   // --- ACTIONS ---
//   const handleApprove = async (id) => {
//     const updated = reviews.map(r => r._id === id ? { ...r, approved: true } : r);
//     setReviews(updated);
//     setNotification("Review approved successfully.");
//     try { await api.put(`/reviews/approve/${id}`); } catch (err) { fetchReviews(); }
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleDelete = async (id) => {
//     if(!confirm("Are you sure you want to delete this review?")) return;
//     setReviews(reviews.filter(r => r._id !== id));
//     setNotification("Review deleted.");
//     // await api.delete(...)
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // --- FILTERING ---
//   const filtered = useMemo(() => {
//     return reviews.filter(r => {
//       const matchesSearch = (r.product?.name + r.customer?.name).toLowerCase().includes(search.toLowerCase());
//       if (filter === "all") return matchesSearch;
//       if (filter === "approved") return matchesSearch && r.approved;
//       if (filter === "pending") return matchesSearch && !r.approved;
//       return true;
//     });
//   }, [reviews, search, filter]);

//   // Stats
//   const stats = {
//     total: reviews.length,
//     pending: reviews.filter(r => !r.approved).length,
//     avg: (reviews.reduce((a,b) => a + b.rating, 0) / (reviews.length || 1)).toFixed(1)
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
//       <CustomStyles />

//       {/* --- HEADER (Corporate Style) --- */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
//         <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//               Reviews
//               <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-xs font-medium border border-slate-200">Admin</span>
//             </h1>
//             <p className="text-xs text-slate-500 mt-1">Manage customer feedback and ratings.</p>
//           </div>

//           <div className="flex items-center gap-3">
//              <div className="relative">
//                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
//                <input 
//                  placeholder="Search reviews..."
//                  value={search}
//                  onChange={e => setSearch(e.target.value)}
//                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-slate-400 focus:ring-0 outline-none w-64 transition-all"
//                />
//              </div>
//              <button onClick={fetchReviews} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
//                <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
//              </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="px-6 flex gap-6 border-t border-slate-100">
//           {[
//             { id: 'pending', label: 'Pending Approval', count: stats.pending },
//             { id: 'approved', label: 'Published', count: null },
//             { id: 'all', label: 'All Reviews', count: stats.total },
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setFilter(tab.id)}
//               className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
//                 filter === tab.id 
//                   ? "border-slate-900 text-slate-900" 
//                   : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
//               }`}
//             >
//               {tab.label}
//               {tab.count !== null && (
//                 <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main className="p-6 max-w-7xl mx-auto">
        
//         {/* Quick Stats Row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
//              <div>
//                <p className="text-xs font-bold text-slate-500 uppercase">Pending</p>
//                <h3 className="text-2xl font-bold text-slate-900">{stats.pending}</h3>
//              </div>
//              <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600"><ShieldCheck size={20}/></div>
//           </div>
//           <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
//              <div>
//                <p className="text-xs font-bold text-slate-500 uppercase">Avg Rating</p>
//                <h3 className="text-2xl font-bold text-slate-900">{stats.avg}</h3>
//              </div>
//              <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Star size={20}/></div>
//           </div>
//           <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
//              <div>
//                <p className="text-xs font-bold text-slate-500 uppercase">Total</p>
//                <h3 className="text-2xl font-bold text-slate-900">{stats.total}</h3>
//              </div>
//              <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600"><MessageSquare size={20}/></div>
//           </div>
//         </div>

//         {/* Grid Layout */}
//         {loading ? (
//           <div className="text-center py-12 text-slate-400">Loading data...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {filtered.map((r, i) => (
//               <div 
//                 key={r._id} 
//                 style={{ animationDelay: `${i * 50}ms` }}
//                 className="fade-in bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col"
//               >
//                 {/* Card Header */}
//                 <div className="p-4 border-b border-slate-50 flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
//                       {r.customer?.name?.[0] || "U"}
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-bold text-slate-900">{r.customer?.name || "Guest"}</h4>
//                       <p className="text-xs text-slate-400">{r.customer?.email || "No email"}</p>
//                     </div>
//                   </div>
//                   <StatusChip isApproved={r.approved} />
//                 </div>

//                 {/* Card Body */}
//                 <div className="p-4 flex-1">
//                   <div className="mb-2"><RatingStars rating={r.rating} /></div>
//                   <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
//                     <p className="text-sm text-slate-700 leading-relaxed line-clamp-3 italic">"{r.comment}"</p>
//                   </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
//                   <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[60%]">
//                     <div className="min-w-[4px] h-[4px] bg-slate-400 rounded-full"></div>
//                     <span className="truncate font-medium">{r.product?.name || "Unknown Product"}</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {!r.approved && (
//                       <button 
//                         onClick={() => handleApprove(r._id)}
//                         className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 transition-colors shadow-sm"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     <button 
//                       onClick={() => handleDelete(r._id)}
//                       className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && filtered.length === 0 && (
//           <div className="text-center py-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
//               <Filter className="text-slate-400" size={24} />
//             </div>
//             <h3 className="text-slate-900 font-bold">No reviews found</h3>
//             <p className="text-slate-500 text-sm mt-1">Clear filters to see more results.</p>
//           </div>
//         )}
//       </main>

//       {/* Professional Toast */}
//       {notification && (
//         <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium animate-bounce z-50">
//           <CheckCircle size={16} className="text-emerald-400" />
//           {notification}
//         </div>
//       )}

//     </div>
//   );
// }



// import { useState, useEffect, useMemo } from "react";
// import api from "../../api";
// import { 
//   Star, CheckCircle, XCircle, MessageSquare, 
//   Search, Trash2, RefreshCcw, ShieldAlert, 
//   Filter, TrendingUp, BarChart3
// } from "lucide-react";

// // --- 0. CUSTOM STYLES ---
// const CustomStyles = () => (
//   <style>{`
//     .card-enter { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
//     @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
//     .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
//     .glass-header { background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); }
//   `}</style>
// );

// // --- 1. HELPERS ---
// const RatingStars = ({ rating }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map((star) => (
//       <Star 
//         key={star} 
//         size={14} 
//         className={star <= rating ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "fill-slate-200 text-slate-200"} 
//       />
//     ))}
//   </div>
// );

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("pending");
//   const [search, setSearch] = useState("");
//   const [notification, setNotification] = useState(null);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/reviews/admin/all");
//       if (res.reviews) setReviews(res.reviews);
//     } catch (err) { console.error(err); } 
//     finally { setTimeout(() => setLoading(false), 600); }
//   };

//   useEffect(() => { fetchReviews(); }, []);

//   // --- ACTIONS ---
//   const handleApprove = async (id) => {
//     const updated = reviews.map(r => r._id === id ? { ...r, approved: true } : r);
//     setReviews(updated);
//     setNotification({ type: 'success', msg: 'Review Published Successfully' });
//     try { await api.put(`/reviews/approve/${id}`); } catch (err) { fetchReviews(); }
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // const handleDelete = async (id) => {
//   //   if(!confirm("Permanently delete this review?")) return;
//   //   setReviews(reviews.filter(r => r._id !== id));
//   //   setNotification({ type: 'error', msg: 'Review Deleted' });
//   //   setTimeout(() => setNotification(null), 3000);
//   // };

//   const handleDelete = async (id) => {
//   if (!confirm("Permanently delete this review?")) return;
//   try {
//     await api.delete(`/reviews/${id}`);
//     setReviews((prev) => prev.filter((r) => r._id !== id));
//     setNotification({ type: "error", msg: "Review Deleted" });
//   } catch (err) {
//     console.error("Delete review error:", err);
//     setNotification({ type: "error", msg: "Delete failed" });
//   } finally {
//     setTimeout(() => setNotification(null), 3000);
//   }
// };

//   // --- LOGIC ---
//   const filtered = useMemo(() => {
//     return reviews.filter(r => {
//       const matchesSearch = (r.product?.name + r.customer?.name + r.comment).toLowerCase().includes(search.toLowerCase());
//       if (filter === "all") return matchesSearch;
//       if (filter === "approved") return matchesSearch && r.approved;
//       if (filter === "pending") return matchesSearch && !r.approved;
//       return true;
//     });
//   }, [reviews, search, filter]);

//   const stats = {
//     total: reviews.length,
//     pending: reviews.filter(r => !r.approved).length,
//     avg: (reviews.reduce((a,b) => a + b.rating, 0) / (reviews.length || 1)).toFixed(1)
//   };

//   return (
//     <div className="min-h-screen bg-indigo-50/30 font-sans text-slate-800 pb-20 selection:bg-indigo-200 selection:text-indigo-900">
//       <CustomStyles />

//       {/* --- HEADER (Dark Gradient) --- */}
//       <header className="sticky top-0 z-30 glass-header border-b border-slate-700 shadow-lg text-white">
//         <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
          
//           {/* Brand Area */}
//           <div>
//             <h1 className="text-xl font-bold flex items-center gap-2 tracking-tight">
//               <MessageSquare className="text-indigo-400" size={22} />
//               Review <span className="text-indigo-200">Hub</span>
//             </h1>
//             <p className="text-xs text-slate-400 mt-1 font-medium">Monitor and moderate user feedback</p>
//           </div>

//           {/* Search Bar */}
//           <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 focus-within:border-indigo-500 transition-colors w-full md:w-auto">
//              <Search className="text-slate-400 ml-2" size={16}/>
//              <input 
//                placeholder="Search customers or products..."
//                value={search}
//                onChange={e => setSearch(e.target.value)}
//                className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full md:w-64 px-2"
//              />
//           </div>

//           {/* Refresh */}
//           <button onClick={fetchReviews} className="p-2.5 bg-slate-800 rounded-lg hover:bg-indigo-600 text-slate-300 hover:text-white transition-all">
//             <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
//           </button>
//         </div>

//         {/* Filter Tabs (Integrated into Header) */}
//         <div className="px-6 flex gap-1 mt-1 overflow-x-auto">
//           {[
//             { id: 'pending', label: 'Pending Approval', count: stats.pending },
//             { id: 'approved', label: 'Published', count: null },
//             { id: 'all', label: 'All Reviews', count: stats.total },
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setFilter(tab.id)}
//               className={`px-4 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
//                 filter === tab.id 
//                   ? "border-indigo-400 text-white bg-slate-800/50 rounded-t-lg" 
//                   : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-t-lg"
//               }`}
//             >
//               {tab.label}
//               {tab.count !== null && (
//                 <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === tab.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </header>

//       {/* --- STATS SECTION (Colorful Cards) --- */}
//       <div className="px-6 py-8 max-w-[1600px] mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
//           {/* Card 1: Action Required */}
//           <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 transform hover:-translate-y-1 transition-transform">
//             <div className="absolute right-0 top-0 p-4 opacity-20"><ShieldAlert size={80} /></div>
//             <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">Pending Action</p>
//             <div className="flex items-end gap-2">
//               <h2 className="text-4xl font-bold">{stats.pending}</h2>
//               <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">Reviews</span>
//             </div>
//           </div>

//           {/* Card 2: Rating */}
//           <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 transform hover:-translate-y-1 transition-transform">
//             <div className="absolute right-0 top-0 p-4 opacity-20"><TrendingUp size={80} /></div>
//             <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Avg. Rating</p>
//             <div className="flex items-end gap-2">
//               <h2 className="text-4xl font-bold">{stats.avg}</h2>
//               <div className="flex pb-1.5 text-amber-300">
//                  {[...Array(5)].map((_,i) => <Star key={i} size={14} className={i < Math.round(stats.avg) ? "fill-current" : "opacity-30"} />)}
//               </div>
//             </div>
//           </div>

//           {/* Card 3: Total */}
//           <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 transform hover:-translate-y-1 transition-transform">
//              <div className="absolute right-0 top-0 p-4 opacity-20"><BarChart3 size={80} /></div>
//              <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Total Feedback</p>
//              <div className="flex items-end gap-2">
//                <h2 className="text-4xl font-bold">{stats.total}</h2>
//                <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">+12% this week</span>
//              </div>
//           </div>
//         </div>

//         {/* --- REVIEWS GRID --- */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//              {[1,2,3].map(i => <div key={i} className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((r, i) => (
//               <div 
//                 key={r._id} 
//                 style={{ animationDelay: `${i * 75}ms` }}
//                 className={`card-enter group bg-white rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col relative overflow-hidden ${
//                   !r.approved ? "border-amber-200 shadow-amber-100/50" : "border-slate-200 hover:border-indigo-300"
//                 }`}
//               >
//                 {/* Status Strip */}
//                 <div className={`h-1.5 w-full ${!r.approved ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>

//                 {/* Card Body */}
//                 <div className="p-6 flex flex-col h-full">
                  
//                   {/* User Header */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm text-white ${
//                         !r.approved ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-slate-700 to-slate-900'
//                       }`}>
//                         {r.customer?.name?.[0] || "U"}
//                       </div>
//                       <div>
//                         <h4 className="text-sm font-bold text-slate-900">{r.customer?.name || "Guest"}</h4>
//                         <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{r.customer?.email ? "Verified Buyer" : "Guest"}</p>
//                       </div>
//                     </div>
//                     <RatingStars rating={r.rating} />
//                   </div>

//                   {/* Comment Bubble */}
//                   <div className="flex-1 mb-5">
//                     <div className="relative">
//                       <span className="absolute -top-2 -left-2 text-4xl text-slate-100 font-serif leading-none">“</span>
//                       <p className="text-sm text-slate-600 leading-relaxed relative z-10 italic line-clamp-3">
//                          {r.comment}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Product Footprint */}
//                   <div className="bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100 flex items-center gap-2">
//                     <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
//                     <div className="overflow-hidden">
//                        <p className="text-[10px] font-bold text-slate-400 uppercase">Product Ref</p>
//                        <p className="text-xs font-bold text-indigo-900 truncate w-full">{r.product?.name || "Product Removed"}</p>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex items-center gap-2 pt-2">
//                     {!r.approved ? (
//                       <button 
//                         onClick={() => handleApprove(r._id)}
//                         className="flex-1 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
//                       >
//                         <CheckCircle size={14} /> Approve
//                       </button>
//                     ) : (
//                       <div className="flex-1 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-default">
//                         <CheckCircle size={14} /> Published
//                       </div>
//                     )}
                    
//                     <button 
//                       onClick={() => handleDelete(r._id)}
//                       className="p-2 text-slate-400 border border-slate-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
//                       title="Delete Review"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
        
//         {!loading && filtered.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-24 opacity-50">
//             <div className="bg-white p-4 rounded-full shadow-md mb-3"><Filter size={32} className="text-slate-300"/></div>
//             <p className="text-slate-500 font-medium">No reviews found.</p>
//           </div>
//         )}
//       </div>

//       {/* Toast Notification */}
//       {notification && (
//         <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 text-white font-bold text-sm animate-bounce z-50 ${
//           notification.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
//         }`}>
//           {notification.type === 'success' ? <CheckCircle size={18} /> : <Trash2 size={18} />}
//           {notification.msg}
//         </div>
//       )}

//     </div>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import api from "../../api";
import {
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search,
  Trash2,
  RefreshCcw,
  ShieldAlert,
  Filter,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import "./Reviews.css";

// --- Helpers ---
const RatingStars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={14}
        className={
          star <= rating
            ? "fill-amber-400 text-amber-400 drop-shadow-sm"
            : "fill-slate-200 text-slate-200"
        }
      />
    ))}
  </div>
);

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews/admin/all");
      if (res.reviews) setReviews(res.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // --- Actions ---
  const handleApprove = async (id) => {
    const updated = reviews.map((r) =>
      r._id === id ? { ...r, approved: true } : r
    );
    setReviews(updated);
    setNotification({
      type: "success",
      msg: "Review Published Successfully",
    });
    try {
      await api.put(`/reviews/approve/${id}`);
    } catch (err) {
      fetchReviews();
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setNotification({ type: "error", msg: "Review Deleted" });
    } catch (err) {
      console.error("Delete review error:", err);
      setNotification({ type: "error", msg: "Delete failed" });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // --- Filtering ---
  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const text =
        (r.product?.name || "") +
        (r.customer?.name || "") +
        (r.comment || "");
      const matchesSearch = text
        .toLowerCase()
        .includes(search.toLowerCase());

      if (filter === "all") return matchesSearch;
      if (filter === "approved") return matchesSearch && r.approved;
      if (filter === "pending") return matchesSearch && !r.approved;
      return true;
    });
  }, [reviews, search, filter]);

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => !r.approved).length,
    avg: (
      reviews.reduce((a, b) => a + (b.rating || 0), 0) /
      (reviews.length || 1)
    ).toFixed(1),
  };

  return (
    <div className="reviews-page min-h-screen font-sans text-slate-800 pb-20 selection:bg-indigo-200 selection:text-indigo-900"  style={{borderRadius:"20px"}}>
      {/* HEADER */}
      <header className="sticky top-0 z-30 glass-header border-b border-slate-700 shadow-lg text-white" >
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-5" >
          {/* Brand */}
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2 tracking-tight">
              <MessageSquare className="text-indigo-400" size={22} />
              Review <span className="text-indigo-200">Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Monitor and moderate user feedback
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 focus-within:border-indigo-500 transition-colors w-full md:w-auto">
            <Search className="text-slate-400 ml-2" size={16} />
            <input
              placeholder="Search customers or products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full md:w-64 px-2"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={fetchReviews}
            className="p-2.5 bg-slate-800 rounded-lg hover:bg-indigo-600 text-slate-300 hover:text-white transition-all"
          >
            <RefreshCcw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 flex gap-1 mt-1 overflow-x-auto">
          {[
            {
              id: "pending",
              label: "Pending Approval",
              count: stats.pending,
            },
            { id: "approved", label: "Published", count: null },
            { id: "all", label: "All Reviews", count: stats.total },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                filter === tab.id
                  ? "border-indigo-400 text-white bg-slate-800/50 rounded-t-lg"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-t-lg"
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === tab.id
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* STATS */}
      <div className="px-6 py-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pending */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 transform hover:-translate-y-1 transition-transform">
            <div className="absolute right-0 top-0 p-4 opacity-20">
              <ShieldAlert size={80} />
            </div>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">
              Pending Action
            </p>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold">{stats.pending}</h2>
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                Reviews
              </span>
            </div>
          </div>

          {/* Avg Rating */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 transform hover:-translate-y-1 transition-transform">
            <div className="absolute right-0 top-0 p-4 opacity-20">
              <TrendingUp size={80} />
            </div>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">
              Avg. Rating
            </p>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold">{stats.avg}</h2>
              <div className="flex pb-1.5 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(stats.avg)
                        ? "fill-current"
                        : "opacity-30"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 transform hover:-translate-y-1 transition-transform">
            <div className="absolute right-0 top-0 p-4 opacity-20">
              <BarChart3 size={80} />
            </div>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
              Total Feedback
            </p>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold">{stats.total}</h2>
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                +12% this week
              </span>
            </div>
          </div>
        </div>

        {/* REVIEWS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <div
                key={r._id}
                style={{ animationDelay: `${i * 75}ms` }}
                className={`card-enter review-card group bg-white rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col relative overflow-hidden ${
                  !r.approved
                    ? "border-amber-200 shadow-amber-100/50"
                    : "border-slate-200 hover:border-indigo-300"
                }`}
              >
                {/* Status strip */}
                <div
                  className={`h-1.5 w-full ${
                    !r.approved ? "bg-amber-400" : "bg-emerald-500"
                  }`}
                />

                <div className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm text-white ${
                          !r.approved
                            ? "bg-gradient-to-br from-amber-500 to-orange-500"
                            : "bg-gradient-to-br from-slate-700 to-slate-900"
                        }`}
                      >
                        {r.customer?.name?.[0] || "U"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {r.customer?.name || "Guest"}
                        </h4>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                          {r.customer?.email
                            ? "Verified Buyer"
                            : "Guest"}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={r.rating} />
                  </div>

                  {/* Comment */}
                  <div className="flex-1 mb-5">
                    <div className="relative">
                      <span className="absolute -top-2 -left-2 text-4xl text-slate-100 font-serif leading-none">
                        “
                      </span>
                      <p className="text-sm text-slate-600 leading-relaxed relative z-10 italic line-clamp-3">
                        {r.comment}
                      </p>
                    </div>
                  </div>

                  {/* Product ref */}
                  <div className="bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100 flex items-center gap-2">
                    <div className="w-1 h-8 bg-indigo-500 rounded-full" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Product Ref
                      </p>
                      <p className="text-xs font-bold text-indigo-900 truncate w-full">
                        {r.product?.name || "Product Removed"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    {!r.approved ? (
                      <button
                        onClick={() => handleApprove(r._id)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                    ) : (
                      <div className="flex-1 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-default">
                        <CheckCircle size={14} /> Published
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(r._id)}
                      className="p-2 text-slate-400 border border-slate-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                      title="Delete Review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 opacity-50">
            <div className="bg-white p-4 rounded-full shadow-md mb-3">
              <Filter size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">
              No reviews found.
            </p>
          </div>
        )}
      </div>

      {/* Toast */}
      {notification && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 text-white font-bold text-sm animate-bounce z-50 ${
            notification.type === "success"
              ? "bg-emerald-600"
              : "bg-rose-600"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <Trash2 size={18} />
          )}
          {notification.msg}
        </div>
      )}
    </div>
  );
}