
// // src/pages/OrderSuccess.jsx
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { confirmCheckoutSession } from "../api";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [order, setOrder] = useState(null);
//   const [confirming, setConfirming] = useState(false);

//   // 1️⃣ State + localStorage + query எல்லாம் சேர்த்து order object தயாரிக்க
//   useEffect(() => {
//     const stateOrder = location.state?.order || null;
//     const orderIdFromQuery = searchParams.get("orderId");
//     const itemsFromLS = JSON.parse(localStorage.getItem("orderItems") || "[]");
//     const totalFromLS = localStorage.getItem("orderAmount");

//     let combined = stateOrder || null;

//     if (!combined && (orderIdFromQuery || itemsFromLS.length || totalFromLS)) {
//       combined = {
//         ...(orderIdFromQuery ? { _id: orderIdFromQuery } : {}),
//         ...(itemsFromLS.length ? { items: itemsFromLS } : {}),
//         ...(totalFromLS ? { totalAmount: Number(totalFromLS) } : {}),
//       };
//     }

//     setOrder(combined || {});

//     // clean up
//     localStorage.removeItem("selectedCartItems");
//     localStorage.removeItem("orderId");
//     localStorage.removeItem("orderAmount");
//     localStorage.removeItem("orderItems");
//   }, [location.state, searchParams]);

//   // 2️⃣ Stripe Checkout session confirm (if session_id present)
//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     if (!sessionId) return;

//     (async () => {
//       try {
//         setConfirming(true);
//         const res = await confirmCheckoutSession(sessionId);
//         if (res?.success && res.order) {
//           setOrder((prev) => ({
//             ...(prev || {}),
//             ...res.order,
//           }));
//         }
//       } catch (e) {
//         console.error("Checkout confirm failed:", e);
//       } finally {
//         setConfirming(false);
//       }
//     })();
//   }, [searchParams]);

//   // 3️⃣ Derived fields
//   const orderIdFromQuery = searchParams.get("orderId");
//   const sessionId = searchParams.get("session_id");
//   const paidFlagFromQuery = searchParams.get("paid") === "1";

//   const orderId =
//     order?._id || order?.orderId || orderIdFromQuery || "Not available";

//   const isOnlinePaid =
//     paidFlagFromQuery ||
//     order?.paymentStatus === "Paid" ||
//     order?.deliveryMethod === "CARD";

//   const title = isOnlinePaid ? "Payment Successful" : "Order Placed";
//   const subtitle = isOnlinePaid
//     ? "Your online payment was successful and your order has been confirmed."
//     : "Your order has been placed successfully. Please keep cash ready for delivery.";

//   const items = order?.items || [];

//   const computedTotal =
//     order?.totalAmount ??
//     items.reduce((sum, item) => {
//       const qty = item.qty ?? item.quantity ?? 1;
//       return sum + (item.price || 0) * qty;
//     }, 0);

//   const address = order?.shippingAddress || {};

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-10" style={{paddingTop:"80px"}}>
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 rounded-full p-3">
//             <FaCheckCircle className="text-green-600" size={32} />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               {title}
//             </h2>
//             <p className="text-gray-600 mt-1">{subtitle}</p>
//             {confirming && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Updating payment status...
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between gap-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Order ID
//             </p>
//             <p className="font-semibold text-gray-800 break-all">{orderId}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">
//               Total Amount
//             </p>
//             <p className="font-semibold text-green-700 text-lg">
//               ₹{computedTotal || 0}
//             </p>
//           </div>
//           {order?.paymentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Payment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                 {order.paymentStatus}
//               </span>
//             </div>
//           )}
//           {order?.shipmentStatus && (
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide">
//                 Shipment
//               </p>
//               <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//                 {order.shipmentStatus}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Items list */}
//         {items.length > 0 && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">
//               Products in your order
//             </h3>
//             <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//               {items.map((item, idx) => {
//                 const qty = item.qty ?? item.quantity ?? 1;

//                 // ✅ Qty label – vegetable weight support
//                 let qtyLabel;
//                 if (item.type === "vegetable" && item.weightLabel) {
//                   if (qty > 1) {
//                     qtyLabel = `${qty} × ${item.weightLabel}`;
//                   } else {
//                     qtyLabel = item.weightLabel;
//                   }
//                 } else {
//                   qtyLabel = qty;
//                 }

//                 const lineTotal = (item.price || 0) * qty;

//                 return (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
//                   >
//                     <img
//                       src={item.image || "https://via.placeholder.com/80"}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">
//                         {item.name}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize">
//                         {item.type || "product"}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {qtyLabel}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500">Price</p>
//                       <p className="font-semibold text-gray-800">
//                         LKR {lineTotal || 0}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Address */}
//         {address?.address && (
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Delivery Address
//             </h3>
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold">{address.name}</span>
//               {address.phone && <> · {address.phone}</>}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{address.address}</p>
//             {address.landmark && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Landmark: {address.landmark}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Stripe session info (optional) */}
//         {sessionId && (
//           <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 break-all">
//             Stripe Session ID: {sessionId}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap justify-between gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/OrderSuccess.jsx
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmCheckoutSession } from "../api";
import {
  Check,
  ShoppingBag,
  MapPin,
  ArrowRight,
  FileText,
  Calendar,
  CreditCard,
  Truck,
  Loader2
} from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [order, setOrder] = useState(null);
  const [confirming, setConfirming] = useState(false);

  // -------- INITIAL LOAD: state / query / localStorage merge --------
  useEffect(() => {
    const stateOrder = location.state?.order || null;
    const orderIdFromQuery = searchParams.get("orderId");
    const itemsFromLS = JSON.parse(localStorage.getItem("orderItems") || "[]");
    const totalFromLS = localStorage.getItem("orderAmount");

    let combined = stateOrder || null;

    if (!combined && (orderIdFromQuery || itemsFromLS.length || totalFromLS)) {
      combined = {
        ...(orderIdFromQuery ? { _id: orderIdFromQuery } : {}),
        ...(itemsFromLS.length ? { items: itemsFromLS } : {}),
        ...(totalFromLS ? { totalAmount: Number(totalFromLS) } : {}),
      };
    }

    setOrder(combined || {});

    // Cleanup temp storage
    localStorage.removeItem("selectedCartItems");
    localStorage.removeItem("orderId");
    localStorage.removeItem("orderAmount");
    localStorage.removeItem("orderItems");
  }, [location.state, searchParams]);

  // -------- Stripe Checkout success (if session_id in URL) --------
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    (async () => {
      try {
        setConfirming(true);
        const res = await confirmCheckoutSession(sessionId);
        if (res?.success && res.order) {
          setOrder((prev) => ({ ...(prev || {}), ...res.order }));
        }
      } catch (e) {
        console.error("Checkout confirm failed:", e);
      } finally {
        setConfirming(false);
      }
    })();
  }, [searchParams]);

  if (!order) return null;

  // -------- Derived data --------
  const orderIdFromQuery = searchParams.get("orderId");
  const paidFlagFromQuery = searchParams.get("paid") === "1";

  const orderId =
    order?._id || order?.orderId || orderIdFromQuery || "Pending...";

  const items = Array.isArray(order?.items) ? order.items : [];

  // subtotal (fallback)
  const subtotal = items.reduce((sum, item) => {
    const qty = item.qty ?? item.quantity ?? 1;
    const price = item.price ?? item.unitPrice ?? 0;
    return sum + price * qty;
  }, 0);

  const hasStoredTotal =
    typeof order.totalAmount === "number" &&
    !Number.isNaN(order.totalAmount);

  const computedTotal = hasStoredTotal ? order.totalAmount : subtotal;

  const address = order?.shippingAddress || {};
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isOnlinePaid =
    paidFlagFromQuery ||
    order?.paymentStatus === "Paid" ||
    order?.deliveryMethod === "CARD";

  const title = isOnlinePaid
    ? "Payment Successful!"
    : "Order Placed Successfully!";

  const customerName =
    address.name || order?.userId?.name || "Customer";

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ marginTop: "50px" }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-600 -z-10"></div>

      <div className="max-w-xl w-full">
        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
          {/* 1. Header */}
          <div className="bg-white pt-10 pb-6 text-center px-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 shadow-sm ring-4 ring-white">
              {confirming ? (
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
              ) : (
                <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900">
              {title}
            </h1>
            <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
              Thank you for your purchase. We have received your order and
              will begin processing it immediately.
            </p>
          </div>

          {/* 2. Key Stats Grid (Customer + Date) */}
          <div className="px-8 pb-6">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Customer
                </p>
                <p className="font-semibold text-sm text-gray-800 break-all">
                  {customerName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Date
                </p>
                <div className="flex items-center justify-end gap-1 text-gray-800 font-semibold text-sm">
                  <Calendar size={12} className="text-gray-400" />{" "}
                  {todayDate}
                </div>
              </div>

              <div className="col-span-2 h-px bg-gray-200 my-1" />

              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Payment
                </p>
                <div className="flex items-center gap-1.5">
                  <CreditCard size={14} className="text-emerald-600" />
                  <span className="text-sm font-bold text-gray-800">
                    {isOnlinePaid ? "Online / Card" : "Cash on Delivery"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Total
                </p>
                <p className="text-lg font-extrabold text-emerald-600">
                  LKR {computedTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Order items list */}
          {items.length > 0 && (
            <div className="px-8 mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag size={16} /> Order Items
              </h3>
              <div className="max-h-[220px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {items.map((item, idx) => {
                  const qty = item.qty ?? item.quantity ?? 1;
                  const price = item.price ?? item.unitPrice ?? 0;
                  const lineTotal = price * qty;

                  let qtyLabel = qty;
                  if (item.type === "vegetable" && item.weightLabel) {
                    qtyLabel =
                      qty > 1
                        ? `${qty} × ${item.weightLabel}`
                        : item.weightLabel;
                  }

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0"
                    >
                      <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={
                            item.image || "https://via.placeholder.com/80"
                          }
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate">
                          {item.name || item.productId?.name || "Item"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Qty: {qtyLabel}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">
                        LKR {lineTotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Delivery info (if address available) */}
          {address?.address && (
            <div className="px-8 pb-8">
              <div className="bg-blue-50 rounded-xl p-4 flex gap-3 border border-blue-100">
                <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm h-fit">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900">
                    Delivery Details
                  </h4>
                  <p className="text-xs text-blue-700 mt-1 font-medium">
                    {address.name}
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
                    {address.address}
                  </p>
                  {address.district && (
                    <p className="text-xs text-blue-600 mt-0.5">
                      District: {address.district}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Ticket Edge */}
          <div className="relative h-4 bg-gray-50 -mt-1">
            <div className="absolute top-0 w-full border-t border-dashed border-gray-300"></div>
          </div>

          {/* 5. Footer actions */}
          <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/vegetables")}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-black transition-all hover:-translate-y-1"
            >
              <ArrowRight size={16} /> Continue Shopping
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              <FileText size={16} /> View Orders
            </button>
          </div>
        </div>

        <p className="text-center text-emerald-100 text-xs mt-6 opacity-80">
          A confirmation email has been sent to your registered address.
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
      `}</style>
    </div>
  );
}