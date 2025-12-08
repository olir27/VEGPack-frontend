// import { useLocation, useNavigate } from "react-router-dom";

// export default function ConfirmOrder() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const subtotal = state?.subtotal || 0;
//   const delivery = state?.delivery || 0;
//   const total = state?.total || 0;
//   const address = state?.address;

//   const confirm = () => {
//     navigate("/order-success", {
//       state: { total, address, method: "Cash on Delivery" },
//     });
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-4">
//         Confirm Order
//       </h2>

//       <div className="bg-white p-4 rounded shadow space-y-2">
//         <h3 className="font-semibold">Delivery Address</h3>
//         <p>{address}</p>

//         <div className="mt-4">
//           <div className="flex justify-between">
//             Subtotal: <span>₹{subtotal}</span>
//           </div>
//           <div className="flex justify-between">
//             Delivery: <span>₹{delivery}</span>
//           </div>
//           <div className="flex justify-between font-bold">
//             Total: <span>₹{total}</span>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={confirm}
//         className="bg-green-600 text-white w-full py-3 rounded mt-5"
//       >
//         Confirm Order
//       </button>

//       <button
//         onClick={() => navigate(-1)}
//         className="bg-gray-200 px-4 py-2 rounded mt-4 w-full"
//       >
//         Back
//       </button>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api"; // your backend axios instance

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const subtotal = localStorage.getItem("checkoutSubtotal");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     const savedCart = localStorage.getItem("selectedCartItems");

//     if (!savedCustomer || !savedCart) navigate("/checkout");
//     else {
//       setCustomer(JSON.parse(savedCustomer));
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, [navigate]);

//   const handleConfirmOrder = async () => {
//     try {
//       const res = await api.post("/orders", {
//         customer,
//         items: cartItems,
//         paymentMethod: "COD",
//         subtotal
//       });
//       if (res.status === 201) navigate("/order-successful");
//     } catch (err) {
//       console.error(err);
//       alert("Order failed. Please try again.");
//     }
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
//         <h2 className="text-2xl font-bold">Confirm Your Order</h2>
//         <p><strong>Name:</strong> {customer.name}</p>
//         <p><strong>Phone:</strong> {customer.phone}</p>
//         <p><strong>Address:</strong> {customer.address}</p>
//         <p><strong>Subtotal:</strong> ₹{subtotal}</p>
//         <button
//           onClick={handleConfirmOrder}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//         >
//           Confirm Order
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const subtotal = localStorage.getItem("checkoutSubtotal");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     const savedCart = localStorage.getItem("selectedCartItems");

//     if (!savedCustomer || !savedCart) navigate("/checkout");
//     else {
//       setCustomer(JSON.parse(savedCustomer));
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, [navigate]);

//   const handleConfirmOrder = async () => {
//     setLoading(true);
//     try {
//       const res = await api.post("/orders", {
//         customer,
//         items: cartItems,
//         paymentMethod: "COD",
//         subtotal,
//       });
//       if (res.status === 201) navigate("/order-successful");
//     } catch (err) {
//       console.error(err);
//       alert("Order failed. Please try again.");
//     }
//     setLoading(false);
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
//         <h2 className="text-2xl font-bold">Confirm Your Order</h2>
//         <p><strong>Name:</strong> {customer.name}</p>
//         <p><strong>Phone:</strong> {customer.phone}</p>
//         <p><strong>Address:</strong> {customer.address}</p>
//         <p><strong>Subtotal:</strong> ₹{subtotal}</p>
//         <button
//           onClick={handleConfirmOrder}
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
//         >
//           {loading ? "Processing..." : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const subtotal = localStorage.getItem("checkoutSubtotal");

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("customerDetails");
//     const savedCart = localStorage.getItem("selectedCartItems");

//     if (!savedCustomer || !savedCart) navigate("/checkout");
//     else {
//       setCustomer(JSON.parse(savedCustomer));
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, [navigate]);

//   const handleConfirmOrder = async () => {
//     setLoading(true);
//     try {
//       const res = await api.post("/orders-success", {
//         customer,
//         items: cartItems,
//         paymentMethod: "COD",
//         subtotal,
//       });
//       if (res.status === 201) navigate("/order-success");
//     } catch (err) {
//       console.error(err);
//       alert("Order failed. Please try again.");
//     }
//     setLoading(false);
//   };

//   if (!customer) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded shadow max-w-lg w-full space-y-6 p-6">
//         <h2 className="text-2xl font-bold text-center">Confirm Your Order</h2>

//         {/* Customer Info */}
//         <div className="border p-4 rounded">
//           <h3 className="font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//         </div>

//         {/* Cart Items */}
//         <div className="border p-4 rounded">
//           <h3 className="font-semibold mb-2">Order Summary</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex justify-between py-1 border-b">
//               <div>{item.name} x {item.quantity}</div>
//               <div>₹ {item.totalPrice || item.unitPrice * item.quantity}</div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>

//         <button
//           onClick={handleConfirmOrder}
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
//         >
//           {loading ? "Processing..." : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmCODOrder = async () => {
//       try {
//         const orderId = JSON.parse(localStorage.getItem("orderId"));
//         await axios.post("http://localhost:5000/api/orders/cod", { orderId });
//         navigate("/order-success");
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     confirmCODOrder();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h2 className="text-xl font-semibold">Confirming your order...</h2>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const [orderId, setOrderId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedOrderId = JSON.parse(localStorage.getItem("orderId") || null);
//     if (!storedOrderId) return navigate("/checkout");
//     setOrderId(storedOrderId);
//   }, [navigate]);

//   const handleConfirm = async () => {
//     if (!orderId) return;

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:5000/api/orders/confirm-cod`, { orderId });
//       navigate("/order-success");
//     } catch (err) {
//       console.error("COD confirmation error:", err);
//       alert("Failed to confirm order. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
//         <p className="mb-6">Your order will be delivered via Cash on Delivery.</p>
//         <button
//           onClick={handleConfirm}
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/ConfirmOrder.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { confirmCODOrder } from "../api";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [order, setOrder] = useState(location.state?.order || null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!order) {
//       const savedOrderId = localStorage.getItem("orderId");
//       if (!savedOrderId) {
//         navigate("/"); // nothing to confirm
//       } else {
//         // minimal fallback: show order id only
//         setOrder({ _id: savedOrderId, totalAmount: localStorage.getItem("orderAmount") });
//       }
//     }
//   }, [order, navigate]);

//   const handleConfirmCOD = async () => {
//     setLoading(true);
//     try {
//       const payloadOrderId = order._id || order.orderId || localStorage.getItem("orderId");
//       const resp = await confirmCODOrder(payloadOrderId);
//       if (resp.success) {
//         // Clear cart / nav to success page
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");
//         alert("COD order confirmed! Order will be processed.");
//         navigate("/order-success", { state: { order: resp.order } });
//       } else {
//         throw new Error(resp.message || "Failed to confirm");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to confirm COD: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!order) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Confirm Cash on Delivery</h2>

//         <p className="mb-2"><strong>Order ID:</strong> {order._id}</p>
//         <p className="mb-4"><strong>Total:</strong> ₹{order.totalAmount}</p>

//         <div className="space-y-3">
//           <p>Please confirm that you want to place this order as <strong>Cash on Delivery (COD)</strong>. After confirmation, we will process your order and contact you for delivery updates.</p>

//           <div className="flex gap-3">
//             <button onClick={handleConfirmCOD}
//               className={`px-4 py-2 rounded bg-green-600 text-white ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"}`} disabled={loading}>
//               {loading ? "Confirming..." : "Confirm COD"}
//             </button>
//             <button onClick={() => navigate("/checkout")} className="px-4 py-2 rounded bg-gray-200">
//               Back to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { confirmCODOrder } from "../api";

// export default function ConfirmOrder() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [order, setOrder] = useState(location.state?.order || null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!order) {
//       const savedOrderId = localStorage.getItem("orderId");
//       const savedOrderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
//       if (!savedOrderId) {
//         navigate("/"); // nothing to confirm
//       } else {
//         // fallback with minimal info
//         setOrder({
//           _id: savedOrderId,
//           totalAmount: localStorage.getItem("orderAmount"),
//           items: savedOrderItems,
//         });
//       }
//     }
//   }, [order, navigate]);

//   const handleConfirmCOD = async () => {
//     setLoading(true);
//     try {
//       const payloadOrderId = order._id || order.orderId || localStorage.getItem("orderId");
//       const resp = await confirmCODOrder(payloadOrderId);
//       if (resp.success) {
//         // Clear cart / navigate to success page
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");
//         localStorage.removeItem("orderItems");
//         alert("COD order confirmed! Order will be processed.");
//         navigate("/order-success", { state: { order: resp.order } });
//       } else {
//         throw new Error(resp.message || "Failed to confirm");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to confirm COD: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!order) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Confirm Cash on Delivery</h2>

       

//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
//           <div className="space-y-3">
//             {order.items && order.items.length > 0 ? (
//               order.items.map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-4 p-2 border rounded">
//                   <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                   <div className="flex-1">
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-gray-600">₹{item.price}</p>
//                   </div>
                  
//                 </div>
//               ))
//             ) : (
//               <p>No items found in this order.</p>
//             )}
//           </div>
//         </div>

//         <p className="mb-4 text-lg font-bold"><strong>Total:</strong> ₹{order.totalAmount}</p>

//         <div className="space-y-3">
//           <p>Please confirm that you want to place this order as <strong>Cash on Delivery (COD)</strong>. After confirmation, we will process your order and contact you for delivery updates.</p>

//           <div className="flex gap-3">
//             <button
//               onClick={handleConfirmCOD}
//               className={`px-4 py-2 rounded bg-green-600 text-white ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"}`}
//               disabled={loading}
//             >
//               {loading ? "Confirming..." : "Confirm COD"}
//             </button>
//             <button onClick={() => navigate("/checkout")} className="px-4 py-2 rounded bg-gray-200">
//               Back to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmCODOrder } from "../api";
import { clearOrderedCartItems } from "../api";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!order) {
      const savedOrderId = localStorage.getItem("orderId");
      const savedOrderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
      if (!savedOrderId) {
        navigate("/"); // nothing to confirm
      } else {
        setOrder({
          _id: savedOrderId,
          totalAmount: localStorage.getItem("orderAmount"),
          items: savedOrderItems,
        });
      }
    }
  }, [order, navigate]);

 
const handleConfirmCOD = async () => {
  setLoading(true);
  try {
    const payloadOrderId = order._id || order.orderId || localStorage.getItem("orderId");
    const resp = await confirmCODOrder(payloadOrderId); // api.js -> { orderId: payloadOrderId }

    if (resp.success) {
      // cart/session cleanup if you want
      localStorage.removeItem("selectedCartItems");
      localStorage.removeItem("orderId");
      localStorage.removeItem("orderAmount");
      // localStorage.removeItem("orderItems"); // id show panna vendumna later clear pannalaam

      alert("COD order confirmed! Order will be processed.");

      // 🔴 IMPORTANT: order object state‑la pass pannanum
      navigate("/order-success", { state: { order: resp.order } });
    } else {
      throw new Error(resp.message || "Failed to confirm");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to confirm COD: " + (err.message || JSON.stringify(err)));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-green-100 p-6" style={{marginTop:"70px"}}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Confirm Your Order</h2>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    {item.quantity && <p className="text-gray-600">Qty: {item.quantity}</p>}
                  </div>
                 
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items found in this order.</p>
            )}
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-6 mb-6">
          <p className="text-xl font-semibold text-gray-800">Total Amount:</p>
          <p className="text-2xl font-bold text-green-600">LKR {order.totalAmount}</p>
        </div>

        {/* Confirmation Section */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="mb-6 text-gray-700">
            Please confirm that you want to place this order as <strong>Cash on Delivery (COD)</strong>. Once confirmed, we will process your order and contact you for delivery updates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleConfirmCOD}
              className={`px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Confirming..." : "Confirm COD"}
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 rounded-xl bg-gray-200 font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Back to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
