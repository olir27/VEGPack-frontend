// import { useEffect, useState } from "react";
// import api from "../api";

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await api.get("/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUser(res.data.user);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!user) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow p-6 rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Profile</h2>

//       <p className="text-lg"><b>Name:</b> {user.name}</p>
//       <p className="text-lg"><b>Email:</b> {user.email}</p>
//       <p className="text-lg"><b>Role:</b> {user.role}</p>
//     </div>
//   );
// }

// // src/pages/Profile.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../AuthContext";
// import {
//   User as UserIcon,
//   ShoppingBag,
//   MapPin,
//   Shield,
// } from "lucide-react";

// export default function Profile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);
//   const [customerDetails, setCustomerDetails] = useState(null);

//   // Load customerDetails from localStorage (for customers)
//   useEffect(() => {
//     const saved = localStorage.getItem("customerDetails");
//     if (saved) {
//       setCustomerDetails(JSON.parse(saved));
//     }
//   }, []);

//   // Fetch current user's orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/orders/my-orders"); // { success, orders }
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
//     // Normally /profile is protected, but just in case
//     navigate("/login");
//     return null;
//   }

//   const roleLabel =
//     user.role === "admin"
//       ? "Admin"
//       : user.role === "farmer"
//       ? "Farmer"
//       : "Customer";

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b pb-4">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
//               {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {user.name || "User"}
//               </h1>
//               <p className="text-gray-600 text-sm">{user.email}</p>
//               <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                 {roleLabel}
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {user.role === "farmer" && (
//               <button
//                 onClick={() => navigate("/farmer-dashboard")}
//                 className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
//               >
//                 Go to Farmer Dashboard
//               </button>
//             )}
//             {user.role === "admin" && (
//               <button
//                 onClick={() => navigate("/admin")}
//                 className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
//               >
//                 Go to Admin Dashboard
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 border-b mb-4">
//           <TabButton
//             label="Overview"
//             value="overview"
//             active={activeTab}
//             onClick={setActiveTab}
//             icon={<UserIcon size={16} />}
//           />
//           <TabButton
//             label="My Orders"
//             value="orders"
//             active={activeTab}
//             onClick={setActiveTab}
//             icon={<ShoppingBag size={16} />}
//           />
//           <TabButton
//             label="Security"
//             value="security"
//             active={activeTab}
//             onClick={setActiveTab}
//             icon={<Shield size={16} />}
//           />
//         </div>

//         {/* Tab Content */}
//         {activeTab === "overview" && (
//           <OverviewTab
//             user={user}
//             customerDetails={customerDetails}
//           />
//         )}

//         {activeTab === "orders" && (
//           <OrdersTab
//             orders={orders}
//             loading={loadingOrders}
//             navigate={navigate}
//           />
//         )}

//         {activeTab === "security" && (
//           <SecurityTab />
//         )}
//       </div>
//     </div>
//   );
// }

// /* -------------------- Tab Button Component -------------------- */

// function TabButton({ label, value, active, onClick, icon }) {
//   const isActive = active === value;
//   return (
//     <button
//       onClick={() => onClick(value)}
//       className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition ${
//         isActive
//           ? "border-green-600 text-green-700"
//           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//       }`}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// }

// /* -------------------- Overview Tab -------------------- */

// function OverviewTab({ user, customerDetails }) {
//   return (
//     <div className="space-y-6">
//       {/* Basic Info */}
//       <section>
//         <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
//         <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
//           <InfoRow label="Full Name" value={user.name || "N/A"} />
//           <InfoRow label="Email" value={user.email || "N/A"} />
//           <InfoRow
//             label="Role"
//             value={
//               user.role === "admin"
//                 ? "Admin"
//                 : user.role === "farmer"
//                 ? "Farmer"
//                 : "Customer"
//             }
//           />
//           <InfoRow
//             label="Joined"
//             value={
//               user.createdAt
//                 ? new Date(user.createdAt).toLocaleDateString()
//                 : "N/A"
//             }
//           />
//         </div>
//       </section>

//       {/* Customer Delivery Details (for customers) */}
//       {user.role === "customer" && (
//         <section>
//           <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
//             <MapPin size={18} /> Default Delivery Details
//           </h2>
//           {customerDetails ? (
//             <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
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
//             <p className="text-gray-500 text-sm">
//               No delivery details saved yet. You can enter them during
//               checkout, and they will appear here.
//             </p>
//           )}
//         </section>
//       )}

//       {/* Farmer Info */}
//       {user.role === "farmer" && (
//         <section>
//           <h2 className="text-lg font-semibold mb-2">
//             Farmer Information
//           </h2>
//           <p className="text-sm text-gray-600">
//             You can manage your stock and view requests in the Farmer
//             Dashboard.
//           </p>
//         </section>
//       )}
//     </div>
//   );
// }

// function InfoRow({ label, value }) {
//   return (
//     <div className="flex flex-col text-sm">
//       <span className="text-gray-500">{label}</span>
//       <span className="font-medium text-gray-800">{value}</span>
//     </div>
//   );
// }

// /* -------------------- Orders Tab -------------------- */

// function OrdersTab({ orders, loading, navigate }) {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-3">My Orders</h2>
//       {loading ? (
//         <p>Loading your orders...</p>
//       ) : orders.length === 0 ? (
//         <p className="text-gray-500 text-sm">
//           You have no orders yet.
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="p-4 rounded-lg border hover:shadow-lg cursor-pointer transition-shadow bg-gray-50"
//               onClick={() =>
//                 navigate(`/order/${order._id}`, { state: { order } })
//               }
//             >
//               <div className="flex justify-between items-center mb-1">
//                 <p className="font-semibold text-sm">
//                   Order ID: {order._id}
//                 </p>
//                 <p className="text-gray-500 text-xs">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex flex-wrap justify-between items-center text-xs md:text-sm gap-2">
//                 <p>
//                   <strong>Total:</strong> ₹{order.totalAmount}
//                 </p>
//                 <p>
//                   <strong>Payment:</strong> {order.paymentStatus}
//                 </p>
//                 <p>
//                   <strong>Shipment:</strong> {order.shipmentStatus}
//                 </p>
//                 <p className="text-gray-500">
//                   <strong>Method:</strong> {order.deliveryMethod}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------------------- Security Tab (placeholder) -------------------- */

// function SecurityTab() {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-3">Security</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         Change password and manage your account security (future
//         enhancement).
//       </p>
//       <p className="text-xs text-gray-400">
//         You can reuse your existing "Forgot Password / Reset Password"
//         flow to allow changing password from here later.
//       </p>
//     </div>
//   );
// }


// src/pages/Profile.jsx
// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, {
  changePassword as changePasswordApi,
  addReviewForProduct,
} from "../api";
import { useAuth } from "../AuthContext";
import {
  User as UserIcon,
  ShoppingBag,
  MapPin,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("customerDetails");
    if (saved) setCustomerDetails(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.orders || []);
      } catch (err) {
        console.error("Fetch my orders error:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const roleLabel =
    user.role === "admin"
      ? "Admin"
      : user.role === "farmer"
      ? "Farmer"
      : "Customer";

  const totalOrders = orders.length;
  const lastOrder = totalOrders > 0 ? orders[0] : null;

  return (
    <div className="min-h-screen bg-green-200 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {user.name || "User"}
              </h1>
              <p className="text-gray-700 text-sm">{user.email}</p>
              <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                <UserIcon size={14} />
                {roleLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {user.role === "farmer" && (
              <button
                onClick={() => navigate("/farmer-dashboard")}
                className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition shadow-sm"
              >
                Farmer Dashboard
              </button>
            )}
            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 rounded-full bg-green-800 text-white text-sm font-semibold hover:bg-green-900 transition shadow-sm"
              >
                Admin Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Member Since"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"
            }
            icon={<Clock size={18} />}
          />
          <StatCard
            label="Total Orders"
            value={loadingOrders ? "…" : totalOrders}
            icon={<ShoppingBag size={18} />}
          />
          <StatCard
            label="Last Order"
            value={
              lastOrder
                ? new Date(lastOrder.createdAt).toLocaleDateString()
                : "No orders yet"
            }
            icon={<ArrowRight size={18} />}
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-200">
            <TabPill
              label="Overview"
              value="overview"
              active={activeTab}
              onClick={setActiveTab}
            />
            <TabPill
              label="My Orders"
              value="orders"
              active={activeTab}
              onClick={setActiveTab}
            />
            <TabPill
              label="Security"
              value="security"
              active={activeTab}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-4">
          {activeTab === "overview" && (
            <OverviewTab user={user} customerDetails={customerDetails} />
          )}

          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              loading={loadingOrders}
              navigate={navigate}
            />
          )}

          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Small UI components ---------- */

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-[#E8F5E9] rounded-2xl p-4 flex items-center gap-3 border border-green-100 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-800">
        {icon}
      </div>
      <div className="flex flex-col text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-900 mt-0.5">{value}</span>
      </div>
    </div>
  );
}

function TabPill({ label, value, active, onClick }) {
  const isActive = active === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-1.5 text-sm font-semibold rounded-full transition ${
        isActive
          ? "bg-green-600 text-white shadow-sm"
          : "text-gray-700 hover:bg-green-100"
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

/* ---------- Overview Tab ---------- */

function OverviewTab({ user, customerDetails }) {
  const roleLabel =
    user.role === "admin"
      ? "Admin"
      : user.role === "farmer"
      ? "Farmer"
      : "Customer";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Account Info */}
      <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 space-y-3 shadow-sm">
        <h2 className="text-sm font-semibold text-green-800 mb-1">
          Account Overview
        </h2>
        <InfoRow label="Role" value={roleLabel} />
        <InfoRow
          label="Member Since"
          value={
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"
          }
        />
      </section>

      {/* Customer Delivery Details */}
      {user.role === "customer" && (
        <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 shadow-sm">
          <h2 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
            <MapPin size={16} /> Default Delivery Details
          </h2>
          {customerDetails ? (
            <div className="space-y-1 text-sm text-gray-800">
              <p>
                <strong>Name:</strong> {customerDetails.name}
              </p>
              <p>
                <strong>Phone:</strong> {customerDetails.phone}
              </p>
              <p>
                <strong>District:</strong> {customerDetails.district}
              </p>
              <p>
                <strong>Address:</strong> {customerDetails.address}
              </p>
              <p>
                <strong>Delivery Date:</strong> {customerDetails.deliveryDate}
              </p>
              <p>
                <strong>Delivery Option:</strong>{" "}
                {customerDetails.deliveryOption}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              No delivery details saved yet. Enter them during checkout; they
              will appear here.
            </p>
          )}
        </section>
      )}

      {/* Farmer Info */}
      {user.role === "farmer" && (
        <section className="bg-[#E8F5E9] rounded-2xl p-4 border border-green-100 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-green-800 mb-1">
            Farmer Panel
          </h2>
          <p className="text-sm text-gray-700">
            Manage your stock, pending approvals, and sales analytics from the
            Farmer Dashboard.
          </p>
        </section>
      )}
    </div>
  );
}

/* ---------- Orders Tab (2-column with review button) ---------- */

function OrdersTab({ orders, loading, navigate }) {
  const [showReview, setShowReview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // { productId, name }
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const openReviewModal = (productId, name) => {
    setSelectedProduct({ productId, name });
    setRating(5);
    setComment("");
    setMsg("");
    setErr("");
    setShowReview(true);
  };

  const closeReviewModal = () => {
    setShowReview(false);
    setSelectedProduct(null);
    setRating(5);
    setComment("");
    setMsg("");
    setErr("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!selectedProduct?.productId) {
      setErr("No product selected");
      return;
    }
    if (!rating || !comment.trim()) {
      setErr("Rating and comment are required");
      return;
    }

    try {
      setSubmitting(true);
      const res = await addReviewForProduct(
        selectedProduct.productId,
        rating,
        comment
      );
      if (res.success) {
        setMsg(
          res.message ||
            "Review submitted! It will be visible after admin approval."
        );
        setTimeout(() => {
          closeReviewModal();
        }, 1200);
      } else {
        setErr(res.message || "Failed to submit review");
      }
    } catch (e) {
      console.error("Submit review error:", e);
      setErr(e.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-green-800">
        <ShoppingBag size={18} /> My Orders
      </h2>
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 text-sm">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 rounded-2xl border border-green-100 bg-[#E8F5E9] hover:bg-green-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-sm text-gray-900">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap justify-between items-center text-xs md:text-sm gap-2 text-gray-800 mb-2">
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentStatus}
                </p>
                <p>
                  <strong>Shipment:</strong> {order.shipmentStatus}
                </p>
              </div>

              {/* Items list + Write Review button for each product */}
              <div className="mt-2 border-t border-green-100 pt-2 space-y-1">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs text-gray-700"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>{" "}
                      <span className="text-gray-500">
                        (x{item.qty || item.quantity || 1})
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        openReviewModal(item.productId, item.name)
                      }
                      className="text-green-700 font-semibold hover:underline"
                    >
                      Write Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReview && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Write a Review
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Product:{" "}
              <span className="font-semibold">
                {selectedProduct.name}
              </span>
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} / 5
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Comment</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Share your experience..."
                />
              </div>

              {msg && <p className="text-green-700 text-sm">{msg}</p>}
              {err && <p className="text-red-600 text-sm">{err}</p>}

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                    submitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Your review will be visible after admin approval.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Security Tab ---------- */

function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!currentPassword || !newPassword || !confirm) {
      setErr("All fields are required");
      return;
    }
    if (newPassword !== confirm) {
      setErr("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setErr("New password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await changePasswordApi(currentPassword, newPassword);
      if (res.success) {
        setMsg(res.message || "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirm("");
      } else {
        setErr(res.message || "Failed to change password");
      }
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-green-800">
        <Shield size={18} /> Security
      </h2>
      <p className="text-sm text-gray-700 mb-4">
        Change your account password regularly to keep your account secure.
      </p>

      <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">Current Password</label>
          <input
            type="password"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm New Password</label>
          <input
            type="password"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {msg && <p className="text-green-700 text-sm">{msg}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}