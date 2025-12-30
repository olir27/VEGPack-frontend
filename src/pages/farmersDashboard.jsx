


// import { useState, useEffect } from "react";
// import api from "../api";
// import { useAuth } from "../AuthContext";
// import {
//   Sprout,
//   Leaf,
//   Package,
//   Clock,
//   CheckCircle,
//   Loader2,
// } from "lucide-react";

// export default function FarmerDashboard() {
//   const { user } = useAuth();

//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     vegetable: "",
//     quantity: "",
//     price: "",
//   });
//   const [loadingAdd, setLoadingAdd] = useState(false);
//   const [loadingStocks, setLoadingStocks] = useState(true);
//   const [message, setMessage] = useState("");

//   const fetchApprovedProducts = async () => {
//     try {
//       if (!user?._id) return;
//       const res = await api.get(`/farmer-stock/farmer/${user._id}`);
//       if (res.success) setApprovedProducts(res.stocks || []);
//     } catch (err) {
//       console.error("Fetch approved stocks error:", err);
//     }
//   };

//   const fetchPendingProducts = async () => {
//     try {
//       const res = await api.get("/farmer-stock/my-pending");
//       if (res.success) setPendingProducts(res.stocks || []);
//     } catch (err) {
//       console.error("Fetch pending stocks error:", err);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       setLoadingStocks(true);
//       await Promise.all([fetchApprovedProducts(), fetchPendingProducts()]);
//       setLoadingStocks(false);
//     };
//     load();
//   }, [user]);

//   const handleAddProduct = async () => {
//     setMessage("");

//     if (
//       !newProduct.vegetable.trim() ||
//       !newProduct.quantity.trim() ||
//       !newProduct.price.trim()
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     // Price can be "150" or "150/kg" etc. → extract first number
//     const priceText = newProduct.price.trim();
//     const match = priceText.match(/\d+(\.\d+)?/);
//     if (!match) {
//       setMessage("Please include a number in price (e.g. 150 or 150/kg)");
//       return;
//     }
//     const priceNumber = parseFloat(match[0]);
//     if (Number.isNaN(priceNumber) || priceNumber <= 0) {
//       setMessage("Please enter a valid positive price");
//       return;
//     }

//     setLoadingAdd(true);
//     try {
//       const payload = {
//         vegetable: newProduct.vegetable.trim(),
//         quantity: newProduct.quantity.trim(), // e.g. "200g", "5kg", "200g/5kg"
//         price: priceNumber, // numeric LKR
//       };

//       const createdStock = await api.post("/farmer-stock", payload);

//       setPendingProducts((prev) => [...prev, createdStock]);
//       setMessage("Stock added! Waiting for admin approval.");
//       setNewProduct({ vegetable: "", quantity: "", price: "" });
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setMessage(err.message || "Error adding product");
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   const totalPending = pendingProducts.length;
//   const totalApproved = approvedProducts.length;

//   const farmerName = user?.name || "Farmer";

//   return (
//     <div
//       className="min-h-screen  px-4 py-6"
//       style={{ paddingTop: "100px",backgroundColor:"#e3f1e8ff"}}
//     >
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* HEADER / HERO */}
//         <div className=" backdrop-blur-md rounded-3xl shadow-lg border border-emerald-100 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{marginLeft:"100px",marginRight:"100px",borderRadius:"10px",backgroundColor:"#055a53ff",color:"white",height:"150px"}}>
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md text-white text-2xl font-bold">
//               {farmerName[0]?.toUpperCase() || "F"}
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
//                 Farmer Dashboard
//               </p>
//               <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
//                 Hello, {farmerName} 👨‍🌾
//               </h1>
//               <p className="text-sm text-slate-500">
//                 Add your fresh vegetables and track stock approvals in real
//                 time.
//               </p>
//             </div>
//           </div>

//           {/* Quick stats */}
//           <div className="flex flex-wrap gap-3" >
//             <StatChip
//               icon={<Clock size={16} />}
//               label="Pending Stocks"
//               value={totalPending}
//               color=" text-amber-700 border-amber-100"
//             />
//             <StatChip
//               icon={<CheckCircle size={16} />}
//               label="Approved Stocks"
//               value={totalApproved}
//               color="bg-emerald-50 text-emerald-700 border-emerald-100"
//             />
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: Add Stock Card */}
//           <div className="lg:col-span-1">
//             <div className=" backdrop-blur rounded-3xl shadow-md border border-emerald-100 p-8 space-y-4" style={{backgroundColor:"#c7dbdaff",borderRadius:"15px",marginLeft:"200px",width:"600px"}}>
//               <div className="flex items-center gap-3 mb-1">
//                 <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
//                   <Sprout size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900">
//                     Add New Stock
//                   </h2>
//                   <p className="text-xs text-slate-500">
//                     Quantity & price will be shown to customers after admin
//                     approval.
//                   </p>
//                 </div>
//               </div>

//               {message && (
//                 <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
//                   {message}
//                 </p>
//               )}

//               <div className="space-y-3 mt-2">
//                 {/* Vegetable Name */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-600">
//                     Vegetable Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. Tomato, Brinjal"
//                     value={newProduct.vegetable}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         vegetable: e.target.value,
//                       })
//                     }
//                     className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
//                   />
//                 </div>

//                 {/* Quantity */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-600">
//                     Quantity (Display)
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. 200g, 5kg, 200g/5kg"
//                     value={newProduct.quantity}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         quantity: e.target.value,
//                       })
//                     }
//                     className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
//                   />
//                   <p className="text-[11px] text-slate-400">
//                     This text will be shown exactly to customers.
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-600">
//                     Price (LKR)
//                   </label>
//                   <div className="flex ">
//                     <div className="flex-1 relative">
                     
//                       <input
//                         type="text"
//                         placeholder="e.g. 150 or 150/kg"
//                         value={newProduct.price}
//                         onChange={(e) =>
//                           setNewProduct({
//                             ...newProduct,
//                             price: e.target.value,
//                           })
//                         }
//                         className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-gray text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
//                       />
//                     </div>
//                   </div>
//                   <p className="text-[11px] text-slate-400">
//                     First number will be used (e.g.{" "}
//                     <span className="font-semibold">150</span> from{" "}
//                     <span className="italic">150/kg</span>).
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleAddProduct}
//                   disabled={loadingAdd}
//                   className="w-full mt-2 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
//                 >
//                   {loadingAdd ? (
//                     <>
//                       <Loader2 className="animate-spin" size={16} />
//                       Adding...
//                     </>
//                   ) : (
//                     <>
                     
//                       Add Stock
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Pending + Approved lists */}
//           <div className="lg:col-span-2 space-y-5" style={{marginLeft:"250px",width:"650px"}}>
//             {/* Pending Stocks */}
//             <div className=" backdrop-blur rounded-3xl shadow-md border border-amber-100 p-6" style={{backgroundColor:"#caeedaff",borderRadius:"10px",color:"black"}}>
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
//                     <Clock size={16} />
//                   </div>
//                   <div>
//                     <h2 className="text-sm font-semibold text-slate-900">
//                       Pending Stocks
//                     </h2>
//                     <p className="text-[11px] text-slate-500">
//                       Waiting for admin approval
//                     </p>
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
//                   {totalPending} pending
//                 </span>
//               </div>

//               {loadingStocks ? (
//                 <SkeletonRows />
//               ) : pendingProducts.length === 0 ? (
//                 <EmptyState
//                   icon={Clock}
//                   text="No pending stocks. Add new stock to see it here."
//                 />
//               ) : (
//                 <div className="overflow-x-auto mt-2">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="bg-amber-50 text-amber-800 text-xs uppercase tracking-wide">
//                         <th className="px-3 py-2 text-left">Vegetable</th>
//                         <th className="px-3 py-2 text-left">Quantity</th>
//                         <th className="px-3 py-2 text-left">Price (LKR)</th>
//                         <th className="px-3 py-2 text-left">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-amber-50">
//                       {pendingProducts.map((p) => (
//                         <tr key={p._id} className="hover:bg-amber-50/60">
//                           <td className="px-3 py-2 font-medium text-slate-800">
//                             {p.vegetable}
//                           </td>
//                           <td className="px-3 py-2 text-slate-600">
//                             {p.quantity}
//                           </td>
//                           <td className="px-3 py-2 text-slate-700">
//                             LKR {p.price}
//                           </td>
//                           <td className="px-3 py-2">
//                             <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
//                               <Clock size={12} />
//                               Waiting Approval
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Approved Stocks */}
//             <div className="bg-white/90 backdrop-blur rounded-3xl shadow-md border border-emerald-100 p-4" style={{backgroundColor:"#f1f3eaff",borderRadius:"10px",color:"black"}}>
//               <div className="flex items-center justify-between mb-3" >
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
//                     <Package size={16} />
//                   </div>
//                   <div>
//                     <h2 className="text-sm font-semibold text-slate-900">
//                       Approved Stocks
//                     </h2>
//                     <p className="text-[11px] text-slate-500">
//                       Visible to customers in store
//                     </p>
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
//                   {totalApproved} approved
//                 </span>
//               </div>

//               {loadingStocks ? (
//                 <SkeletonRows />
//               ) : approvedProducts.length === 0 ? (
//                 <EmptyState
//                   icon={Package}
//                   text="No approved stocks yet. Admin approval required."
//                 />
//               ) : (
//                 <div className="overflow-x-auto mt-2">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="bg-emerald-50 text-emerald-800 text-xs uppercase tracking-wide">
//                         <th className="px-3 py-2 text-left">Vegetable</th>
//                         <th className="px-3 py-2 text-left">Quantity</th>
//                         <th className="px-3 py-2 text-left">Price (LKR)</th>
//                         <th className="px-3 py-2 text-left">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-emerald-50">
//                       {approvedProducts.map((p) => (
//                         <tr key={p._id} className="hover:bg-emerald-50/60">
//                           <td className="px-3 py-2 font-medium text-slate-800">
//                             {p.vegetable}
//                           </td>
//                           <td className="px-3 py-2 text-slate-600">
//                             {p.quantity}
//                           </td>
//                           <td className="px-3 py-2 text-slate-700">
//                             LKR {p.price}
//                           </td>
//                           <td className="px-3 py-2">
//                             <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
//                               <CheckCircle size={12} />
//                               Approved
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Small UI helpers */

// function StatChip({ icon, label, value, color }) {
//   return (
//     <div
//       className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-semibold border ${color}`}
//     >
//       <div className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center text-[11px] shadow-sm">
//         {icon}
//       </div>
//       <div className="flex flex-col">
//         <span className="text-[10px] uppercase tracking-wide opacity-70">
//           {label}
//         </span>
//         <span className="text-sm">{value}</span>
//       </div>
//     </div>
//   );
// }

// function SkeletonRows() {
//   return (
//     <div className="space-y-2 mt-2">
//       {[1, 2, 3].map((i) => (
//         <div
//           key={i}
//           className="h-10 rounded-xl bg-slate-100 animate-pulse"
//         ></div>
//       ))}
//     </div>
//   );
// }

// function EmptyState({ icon: Icon, text }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-8 text-slate-400">
//       <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
//         <Icon size={22} />
//       </div>
//       <p className="text-xs md:text-sm text-slate-500 text-center">{text}</p>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import {
  Sprout,
  Package,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import "./FarmerDashboard.css";

export default function FarmerDashboard() {
  const { user } = useAuth();

  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    vegetable: "",
    quantity: "",
    price: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [message, setMessage] = useState("");
  const [stockTab, setStockTab] = useState("pending"); // 'pending' | 'approved'

  const fetchApprovedProducts = async () => {
    try {
      if (!user?._id) return;
      const res = await api.get(`/farmer-stock/farmer/${user._id}`);
      if (res.success) setApprovedProducts(res.stocks || []);
    } catch (err) {
      console.error("Fetch approved stocks error:", err);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      const res = await api.get("/farmer-stock/my-pending");
      if (res.success) setPendingProducts(res.stocks || []);
    } catch (err) {
      console.error("Fetch pending stocks error:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoadingStocks(true);
      await Promise.all([fetchApprovedProducts(), fetchPendingProducts()]);
      setLoadingStocks(false);
    };
    load();
  }, [user]);

  const handleAddProduct = async () => {
    setMessage("");

    if (
      !newProduct.vegetable.trim() ||
      !newProduct.quantity.trim() ||
      !newProduct.price.trim()
    ) {
      setMessage("All fields are required");
      return;
    }

    const priceText = newProduct.price.trim();
    const match = priceText.match(/\d+(\.\d+)?/);
    if (!match) {
      setMessage("Please include a number in price (e.g. 150 or 150/kg)");
      return;
    }
    const priceNumber = parseFloat(match[0]);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setMessage("Please enter a valid positive price");
      return;
    }

    setLoadingAdd(true);
    try {
      const payload = {
        vegetable: newProduct.vegetable.trim(),
        quantity: newProduct.quantity.trim(),
        price: priceNumber,
      };

      const createdStock = await api.post("/farmer-stock", payload);
      setPendingProducts((prev) => [...prev, createdStock]);
      setMessage("Stock added! Waiting for admin approval.");
      setNewProduct({ vegetable: "", quantity: "", price: "" });
      setStockTab("pending");
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(err.message || "Error adding product");
    } finally {
      setLoadingAdd(false);
    }
  };

  const totalPending = pendingProducts.length;
  const totalApproved = approvedProducts.length;
  const farmerName = user?.name || "Farmer";

  // Pick list based on active tab
  const activeList =
    stockTab === "pending" ? pendingProducts : approvedProducts;

  return (
    <div className="farmer-layout min-h-screen px-4 py-8" style={{paddingTop:"100px"}}>
      <div className="farmer-shell max-w-6xl mx-auto space-y-6">
        {/* HERO */}
        <section className="farmer-hero-card flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="farmer-hero-avatar">
              {farmerName[0]?.toUpperCase() || "F"}
            </div>
            <div>
              <p className="farmer-hero-pill">
                Farmer Workspace
              </p>
              <h1 className="farmer-hero-title">
                Welcome back, {farmerName}
              </h1>
              <p className="farmer-hero-sub">
                Publish fresh harvests and see when they go live in the
                store.
              </p>
            </div>
          </div>

          <div className="farmer-hero-stats">
            <StatChip
              icon={<Clock size={16} />}
              label="Pending Stocks"
              value={totalPending}
              variant="amber"
            />
            <StatChip
              icon={<CheckCircle size={16} />}
              label="Approved Stocks"
              value={totalApproved}
              variant="emerald"
            />
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{marginLeft:"200px"}}>
          {/* Add stock panel */}
          <div className="lg:col-span-1">
            <div className="farmer-panel farmer-panel--add">
              <header className="farmer-panel__header">
                <div className="farmer-panel__icon">
                  <Sprout size={20} />
                </div>
                <div>
                  <h2 className="farmer-panel__title" style={{color:"black"}}>
                    Add New Stock
                  </h2>
                  <p className="farmer-panel__subtitle">
                    Submit details for admin approval. Once approved, it
                    appears in store.
                  </p>
                </div>
              </header>

              {message && (
                <p className="farmer-alert">
                  {message}
                </p>
              )}

              <div className="space-y-3 mt-3">
                <div className="space-y-1">
                  <label className="farmer-label">
                    Vegetable Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomato, Brinjal"
                    value={newProduct.vegetable}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        vegetable: e.target.value,
                      })
                    }
                    className="farmer-input"
                  />
                </div>

                <div className="space-y-1">
                  <label className="farmer-label">
                    Quantity (Display)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200g, 5kg, 200g/5kg"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        quantity: e.target.value,
                      })
                    }
                    className="farmer-input"
                  />
                  <p className="farmer-help">
                    This text will be shown exactly to customers.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="farmer-label">
                    Price (LKR)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 150 or 150/kg"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    className="farmer-input"
                  />
                  <p className="farmer-help">
                    First number will be used (e.g.{" "}
                    <span className="font-semibold">150</span> from{" "}
                    <span className="italic">150/kg</span>).
                  </p>
                </div>

                <button
                  onClick={handleAddProduct}
                  disabled={loadingAdd}
                  className="farmer-btn-submit"
                >
                  {loadingAdd ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Adding...
                    </>
                  ) : (
                    <>Add Stock</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stocks panel with tabs */}
          <div className="lg:col-span-2" style={{marginLeft:"50px"}}>
            <div className="farmer-panel farmer-panel--stocks" >
              <header className="farmer-panel__header justify-between">
                <div>
                  <h2 className="farmer-panel__title" style={{color:"black"}}>
                    Your Stock Listings
                  </h2>
                  <p className="farmer-panel__subtitle">
                    Switch between pending and approved stocks.
                  </p>
                </div>
                <div className="stock-tabs">
                  <button
                    type="button"
                    onClick={() => setStockTab("pending")}
                    className={`stock-tab ${
                      stockTab === "pending"
                        ? "stock-tab--active"
                        : ""
                    }`}
                  >
                    Pending ({totalPending})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStockTab("approved")}
                    className={`stock-tab ${
                      stockTab === "approved"
                        ? "stock-tab--active"
                        : ""
                    }`}
                  >
                    Approved ({totalApproved})
                  </button>
                </div>
              </header>

              {loadingStocks ? (
                <SkeletonRows />
              ) : activeList.length === 0 ? (
                <div className="mt-4">
                  <EmptyState
                    icon={stockTab === "pending" ? Clock : Package}
                    text={
                      stockTab === "pending"
                        ? "No pending stocks. Add new stock to see it here."
                        : "No approved stocks yet. Admin approval required."
                    }
                  />
                </div>
              ) : (
                <div className="mt-4 space-y-3" >
                  {activeList.map((item) => (
                    <StockCard
                      key={item._id}
                      item={item}
                      isPending={stockTab === "pending"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* Small UI helpers */

function StatChip({ icon, label, value, variant }) {
  return (
    <div className={`fd-chip fd-chip--${variant}`}>
      <div className="fd-chip__icon">{icon}</div>
      <div className="flex flex-col">
        <span className="fd-chip__label">{label}</span>
        <span className="fd-chip__value">{value}</span>
      </div>
    </div>
  );
}

function StockCard({ item, isPending }) {
  return (
    <div className="stock-card" style={{backgroundColor:"#37795aff"}}>
      <div className="stock-card__main">
        <div>
          <p className="stock-card__title">{item.vegetable}</p>
          <p className="stock-card__sub">
            Qty: {item.quantity} • LKR {item.price}
          </p>
        </div>
        <div className="stock-card__badge">
          {isPending ? (
            <>
              <Clock size={13} />
              <span>Waiting Approval</span>
            </>
          ) : (
            <>
              <CheckCircle size={13} />
              <span>Approved</span>
            </>
          )}
        </div>
      </div>
      <div className="stock-card__meta" >
        <span className="stock-card__meta-pill">
          Ref: {item._id.slice(-6).toUpperCase()}
        </span>
        <span className="stock-card__meta-pill">
          Created:{" "}
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-3 mt-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-12 rounded-xl bg-slate-100 animate-pulse"
        />
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="fd-empty">
      <div className="fd-empty__icon">
        <Icon size={22} />
      </div>
      <p className="fd-empty__text">{text}</p>
    </div>
  );
}