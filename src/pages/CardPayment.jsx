// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function CardPayment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const total = state?.total || 0;
//   const address = state?.address;

//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");

//   const payNow = () => {
//     if (!name || !number || !expiry || !cvv) {
//       alert("Please fill all card details");
//       return;
//     }

//     navigate("/order-success", {
//       state: { total, address, method: "Card Payment" },
//     });
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-3xl font-bold text-green-800 mb-4">
//         Card Payment
//       </h2>

//       <div className="bg-white p-4 rounded shadow space-y-4">
//         <input
//           type="text"
//           placeholder="Name on Card"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="text"
//           placeholder="Card Number"
//           maxLength={16}
//           value={number}
//           onChange={(e) => setNumber(e.target.value)}
//           className="w-full border p-3 rounded"
//         />

//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="MM/YY"
//             value={expiry}
//             onChange={(e) => setExpiry(e.target.value)}
//             className="w-1/2 border p-3 rounded"
//           />
//           <input
//             type="password"
//             placeholder="CVV"
//             maxLength={3}
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             className="w-1/2 border p-3 rounded"
//           />
//         </div>

//         <button
//           onClick={payNow}
//           className="bg-green-600 text-white w-full py-3 rounded"
//         >
//           Pay Now ₹{total}
//         </button>
//       </div>

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
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import api from "../api";

// const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const subtotal = localStorage.getItem("checkoutSubtotal");
//   const customer = JSON.parse(localStorage.getItem("customerDetails"));
//   const cartItems = JSON.parse(localStorage.getItem("selectedCartItems"));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     try {
//       // Create PaymentIntent on backend
//       const { data } = await api.post("/payments/create-payment-intent", {
//         amount: subtotal * 100, // in cents/paise
//         currency: "INR",
//       });

//       const clientSecret = data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: customer.name,
//             email: customer.email,
//           },
//         },
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           // Save order
//           await api.post("/orders", {
//             customer,
//             items: cartItems,
//             paymentMethod: "Online",
//             subtotal,
//             paymentId: result.paymentIntent.id
//           });
//           navigate("/order-successful");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 space-y-4">
//       <h2 className="text-2xl font-bold">Card Payment</h2>
//       <CardElement className="border p-2 rounded" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
//       >
//         {loading ? "Processing..." : `Pay ₹${subtotal}`}
//       </button>
//     </form>
//   );
// }

// export default function StripePayment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import api from "../api";

// const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const subtotal = localStorage.getItem("checkoutSubtotal");
//   const customer = JSON.parse(localStorage.getItem("customerDetails"));
//   const cartItems = JSON.parse(localStorage.getItem("selectedCartItems"));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Create PaymentIntent on backend
//       const { data } = await api.post("/payments/create-payment-intent", {
//         amount: subtotal * 100, // in paise
//         currency: "INR",
//       });

//       // 2️⃣ Confirm card payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: customer.name,
//             email: customer.email,
//           },
//         },
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         // 3️⃣ Save order to backend
//         await api.post("/orders", {
//           customer,
//           items: cartItems,
//           paymentMethod: "Online",
//           subtotal,
//           paymentId: result.paymentIntent.id,
//         });
//         navigate("/order-successful");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 space-y-4">
//       <h2 className="text-2xl font-bold">Card Payment</h2>
//       <CardElement className="border p-2 rounded" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Processing..." : `Pay ₹${subtotal}`}
//       </button>
//     </form>
//   );
// }

// export default function StripePayment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import api from "../api";

// const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const subtotal = localStorage.getItem("checkoutSubtotal");
//   const customer = JSON.parse(localStorage.getItem("customerDetails"));
//   const cartItems = JSON.parse(localStorage.getItem("selectedCartItems"));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       const { data } = await api.post("/payments/create-payment-intent", {
//         amount: subtotal * 100,
        
//       });

//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: customer.name,
//             email: customer.email,
//           },
//         },
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         await api.post("/orders", {
//           customer,
//           items: cartItems,
//           paymentMethod: "Online",
//           subtotal,
//           paymentId: result.paymentIntent.id,
//         });
//         navigate("/order-successful");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       {/* Order Summary */}
//       <div className="bg-white rounded shadow max-w-lg w-full p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>

//         <div className="border p-4 rounded space-y-2">
//           <h3 className="font-semibold mb-2">Customer Details</h3>
//           <p><strong>Name:</strong> {customer.name}</p>
//           <p><strong>Phone:</strong> {customer.phone}</p>
//           <p><strong>Address:</strong> {customer.address}</p>
//           <p><strong>Delivery Option:</strong> {customer.deliveryOption}</p>
//         </div>

//         <div className="border p-4 rounded mt-4">
//           <h3 className="font-semibold mb-2">Items</h3>
//           {cartItems.map(item => (
//             <div key={item.itemId || item._id} className="flex justify-between py-1 border-b">
//               <div>{item.name} x {item.quantity}</div>
//               <div>₹ {item.totalPrice || item.unitPrice * item.quantity}</div>
//             </div>
//           ))}
//           <p className="text-right font-semibold mt-2">Subtotal: ₹{subtotal}</p>
//         </div>
//       </div>

//       {/* Card Payment */}
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg w-full space-y-4">
//         <h2 className="text-xl font-bold">Card Payment</h2>
//         <CardElement className="border p-2 rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Processing..." : `Pay ₹${subtotal}`}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default function StripePayment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

// export default function StripePayment() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState("");
//   const subtotal = JSON.parse(localStorage.getItem("checkoutSubtotal") || 0);
//   const orderId = JSON.parse(localStorage.getItem("orderId") || null);

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/payments/create-intent", { amount: subtotal, orderId });
//         setClientSecret(res.data.clientSecret);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     createPaymentIntent();
//   }, [subtotal, orderId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) return;

//     const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card }
//     });

//     if (error) {
//       alert(error.message);
//     } else if (paymentIntent.status === "succeeded") {
//       // Update order in backend
//       await axios.post("http://localhost:5000/api/payments/confirm", {
//         orderId,
//         paymentIntentId: paymentIntent.id
//       });

//       navigate("/order-success");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <CardElement className="p-2 border rounded" />
//           <button
//             type="submit"
//             disabled={!stripe}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
//           >
//             Pay ₹{subtotal}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

// export default function CardPayment() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load subtotal and orderId from localStorage
//   const subtotal = JSON.parse(localStorage.getItem("checkoutSubtotal") || 0);
//   const orderId = JSON.parse(localStorage.getItem("orderId") || null);

//   // Create payment intent on component mount
//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       if (!subtotal || !orderId) return navigate("/checkout");

//       try {
//         const res = await axios.post("http://localhost:5000/api/payments/create-intent", {
//           amount: subtotal,
//           orderId,
//           currency: "inr",
//         });
//         setClientSecret(res.data.clientSecret);
//       } catch (err) {
//         console.error("Error creating payment intent:", err);
//         alert("Failed to initialize payment. Try again.");
//         navigate("/checkout");
//       }
//     };
//     createPaymentIntent();
//   }, [subtotal, orderId, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) return;

//     setLoading(true);

//     try {
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         alert(error.message);
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         // Confirm payment in backend
//         await axios.post("http://localhost:5000/api/payments/confirm", {
//           orderId,
//           paymentIntentId: paymentIntent.id,
//         });

//         navigate("/order-success");
//       }
//     } catch (err) {
//       console.error("Stripe payment error:", err);
//       alert("Payment failed. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>

//         <p className="mb-4">Subtotal: <strong>₹{subtotal}</strong></p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-2 rounded">
//             <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
//           </div>

//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : `Pay ₹${subtotal}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

// export default function CardPayment() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   const subtotal = JSON.parse(localStorage.getItem("checkoutSubtotal") || 0);
//   const orderId = JSON.parse(localStorage.getItem("orderId") || null);

//   useEffect(() => {
//     if (!subtotal || !orderId) return navigate("/checkout");

//     const createPaymentIntent = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/payments/create-intent", {
//           amount: subtotal,
//           orderId,
//           currency: "inr",
//         });
//         setClientSecret(res.data.clientSecret);
//       } catch (err) {
//         console.error("Error creating payment intent:", err);
//         alert("Payment initialization failed");
//         navigate("/checkout");
//       }
//     };

//     createPaymentIntent();
//   }, [subtotal, orderId, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     const card = elements.getElement(CardElement);
//     if (!card) return;

//     try {
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         alert(error.message);
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         await axios.post("http://localhost:5000/api/payments/confirm", {
//           orderId,
//           paymentIntentId: paymentIntent.id,
//         });

//         navigate("/order-success");
//       }
//     } catch (err) {
//       console.error("Stripe payment error:", err);
//       alert("Payment failed. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//         <p className="mb-4">Subtotal: <strong>₹{subtotal}</strong></p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-2 rounded">
//             <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
//           </div>

//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : `Pay ₹${subtotal}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";

// export default function CardPayment() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState(0);
//   const [orderId, setOrderId] = useState("");

//   // Fetch values from localStorage
//   useEffect(() => {
//     const savedAmount = localStorage.getItem("orderAmount");
//     const savedOrderId = localStorage.getItem("orderId");

//     if (!savedAmount || !savedOrderId) {
//       navigate("/checkout");
//       return;
//     }

//     setAmount(savedAmount);
//     setOrderId(savedOrderId);

//     // Create payment intent
//     const createIntent = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/payment/create-intent", {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: savedAmount,
//             orderId: savedOrderId,
//             currency: "inr",
//           }),
//         });

//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         alert("Unable to create payment session");
//         navigate("/checkout");
//       }
//     };

//     createIntent();
//   }, []);

//   // Handle Payment
//   const handlePayment = async () => {
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);

//     // Confirm payment with Stripe
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       setLoading(false);
//       alert(result.error.message);
//       return;
//     }

//     // If payment successful → update backend
//     if (result.paymentIntent.status === "succeeded") {
//       await fetch("http://localhost:5000/api/payment/confirm", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderId,
//           paymentIntentId: result.paymentIntent.id,
//         }),
//       });

//       localStorage.removeItem("orderId");
//       localStorage.removeItem("orderAmount");

//       navigate("/order-success");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-20 bg-white shadow-md p-6 rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Card Payment</h2>

//       <p className="text-center text-lg mb-4">Amount: ₹{amount}</p>

//       <div className="border p-4 rounded mb-4">
//         <CardElement className="p-2" />
//       </div>

//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-2 rounded-lg text-lg"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";

// // 👉 Add your public key here
// const stripePromise = loadStripe("pk_test_51SNsYS8HwuBN6APZAFuN4dPp2nX32fKlQfKz7gFB9FqwpFU0KeZ8xzWML0KAHFkD9JEck3jIcF90dIgF9WWjKIHG005iTzMMmh");

// function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState(0);
//   const [orderId, setOrderId] = useState("");

//   useEffect(() => {
//     const savedAmount = localStorage.getItem("orderAmount");
//     const savedOrderId = localStorage.getItem("orderId");

//     if (!savedAmount || !savedOrderId) {
//       navigate("/checkout");
//       return;
//     }

//     setAmount(savedAmount);
//     setOrderId(savedOrderId);

//     const createIntent = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/payment/create-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: savedAmount,
//             orderId: savedOrderId,
//             currency: "inr",
//           }),
//         });

//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         alert("Unable to create payment session");
//         navigate("/checkout");
//       }
//     };

//     createIntent();
//   }, []);

//   const handlePayment = async () => {
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       setLoading(false);
//       alert(result.error.message);
//       return;
//     }

//     if (result.paymentIntent.status === "succeeded") {
//       await fetch("http://localhost:5000/api/payment/confirm", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderId,
//           paymentIntentId: result.paymentIntent.id,
//         }),
//       });

//       localStorage.removeItem("orderId");
//       localStorage.removeItem("orderAmount");

//       navigate("/order-success");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-20 bg-white shadow-md p-6 rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Card Payment</h2>

//       <p className="text-center text-lg mb-4">Amount: ₹{amount}</p>

//       <div className="border p-4 rounded mb-4">
//         <CardElement className="p-2" />
//       </div>

//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-2 rounded-lg text-lg"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }

// export default function CardPayment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }

// // src/pages/CardPayment.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api";
// import api from "../api";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY); // set in .env

// function CheckoutForm({ orderId, amount }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     const initPayment = async () => {
//       try {
//         const resp = await createPaymentIntent({ orderId, amount });
//         // backend should return { clientSecret }
//         if (mounted) setClientSecret(resp.clientSecret);
//       } catch (err) {
//         console.error("Failed to create payment intent:", err);
//         alert("Unable to initiate payment. Please try again.");
//       }
//     };
//     initPayment();
//     return () => { mounted = false; };
//   }, [orderId, amount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     if (!clientSecret) return alert("Payment not initialized.");

//     setLoading(true);
//     try {
//       const card = elements.getElement(CardElement);
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         console.error(error);
//         alert(error.message || "Payment failed");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent && paymentIntent.status === "succeeded") {
//         // Optionally notify backend about successful payment or update order status
//         // For example: POST /api/payments/confirm { orderId, paymentIntentId }
//         // Clear cart
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");

//         navigate("/order-success", { state: { orderId, paymentIntent } });
//       } else {
//         alert("Payment not completed. Status: " + (paymentIntent?.status || "unknown"));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//       <p className="mb-2"><strong>Order:</strong> {orderId}</p>
//       <p className="mb-4"><strong>Amount:</strong> ₹{amount}</p>

//       {!clientSecret ? (
//         <p>Preparing payment...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-3 rounded">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>

//           <button type="submit" disabled={!stripe || loading}
//             className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
//             {loading ? "Processing..." : `Pay ₹${amount}`}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function CardPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const state = location.state || {};
//   const orderId = state.orderId || localStorage.getItem("orderId");
//   const amount = state.amount || localStorage.getItem("orderAmount");

//   useEffect(() => {
//     if (!orderId || !amount) {
//       alert("No order found, redirecting to cart.");
//       navigate("/cart");
//     }
//   }, [orderId, amount, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} amount={Number(amount)} />
//         </Elements>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api";
// import api from "../api";

// // ✅ Use Vite environment variable
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// function CheckoutForm({ orderId, amount }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     const initPayment = async () => {
//       try {
//         const resp = await createPaymentIntent({ orderId, amount });

//         if (mounted) {
//           setClientSecret(resp.clientSecret);
//         }
//       } catch (err) {
//         console.error("Failed to create payment intent:", err);
//         alert("Unable to initiate payment. Please try again.");
//       }
//     };

//     initPayment();
//     return () => { mounted = false };
//   }, [orderId, amount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     if (!clientSecret) return alert("Payment not initialized.");

//     setLoading(true);
//     try {
//       const card = elements.getElement(CardElement);

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         console.error(error);
//         alert(error.message || "Payment failed.");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");

//         navigate("/order-success", { state: { orderId, paymentIntent } });
//       } else {
//         alert("Payment not completed. Status: " + paymentIntent.status);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>

//       <p className="mb-2"><strong>Order:</strong> {orderId}</p>
//       <p className="mb-4"><strong>Amount:</strong> ₹{amount}</p>

//       {!clientSecret ? (
//         <p>Preparing payment...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-3 rounded">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>

//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//           >
//             {loading ? "Processing..." : `Pay ₹${amount}`}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function CardPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state || {};
//   const orderId = state.orderId || localStorage.getItem("orderId");
//   const amount = state.amount || localStorage.getItem("orderAmount");

//   useEffect(() => {
//     if (!orderId || !amount) {
//       alert("No order found, redirecting to cart.");
//       navigate("/cart");
//     }
//   }, [orderId, amount, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} amount={Number(amount)} />
//         </Elements>
//       </div>
//     </div>
//   );
// }


// // src/pages/CardPayment.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api";

// // ✅ Vite requires VITE_ prefix for frontend env variables
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// function CheckoutForm({ orderId, amount }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Initialize Stripe payment intent
//   useEffect(() => {
//     let mounted = true;
//     const initPayment = async () => {
//       try {
//         const resp = await createPaymentIntent({ orderId, amount });
//         if (!resp || !resp.clientSecret) throw new Error("No clientSecret returned from backend");
//         if (mounted) setClientSecret(resp.clientSecret);
//       } catch (err) {
//         console.error("Failed to create payment intent:", err);
//         alert("Unable to initiate payment. Please try again.");
//       }
//     };
//     initPayment();
//     return () => { mounted = false };
//   }, [orderId, amount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     if (!clientSecret) return alert("Payment not initialized.");

//     setLoading(true);
//     try {
//       const card = elements.getElement(CardElement);
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         console.error(error);
//         alert(error.message || "Payment failed.");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         // Clear cart and local storage
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");

//         // Redirect to order success page
//         navigate("/order-success", { state: { orderId, paymentIntent } });
//       } else {
//         alert("Payment not completed. Status: " + paymentIntent.status);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//       <p className="mb-2"><strong>Order:</strong> {orderId}</p>
//       <p className="mb-4"><strong>Amount:</strong> ₹{amount}</p>

//       {!clientSecret ? (
//         <p>Preparing payment...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-3 rounded">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>

//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//           >
//             {loading ? "Processing..." : `Pay ₹${amount}`}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function CardPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const state = location.state || {};
//   const orderId = state.orderId || localStorage.getItem("orderId");
//   const amount = state.amount || localStorage.getItem("orderAmount");

//   useEffect(() => {
//     if (!orderId || !amount) {
//       alert("No order found, redirecting to cart.");
//       navigate("/cart");
//     }
//   }, [orderId, amount, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} amount={Number(amount)} />
//         </Elements>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api";

// // Use Vite environment variable for Stripe publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// function CheckoutForm({ orderId, amount }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const initPayment = async () => {
//       try {
//         const resp = await createPaymentIntent({ orderId, amount });
//         setClientSecret(resp.clientSecret);
//       } catch (err) {
//         console.error("Failed to create payment intent:", err);
//         alert("Unable to initiate payment. Please try again.");
//       }
//     };

//     if (orderId && amount) initPayment();
//   }, [orderId, amount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);
//     try {
//       const card = elements.getElement(CardElement);
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         console.error(error);
//         alert(error.message || "Payment failed.");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");
//         navigate("/order-success", { state: { orderId, paymentIntent } });
//       } else {
//         alert("Payment not completed. Status: " + paymentIntent.status);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//       <p className="mb-2"><strong>Order:</strong> {orderId}</p>
//       <p className="mb-4"><strong>Amount:</strong> ₹{amount}</p>

//       {!clientSecret ? (
//         <p>Preparing payment...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-3 rounded">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//           >
//             {loading ? "Processing..." : `Pay ₹${amount}`}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function CardPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const state = location.state || {};
//   const orderId = state.orderId || localStorage.getItem("orderId");
//   const amount = state.amount || localStorage.getItem("orderAmount");

//   useEffect(() => {
//     if (!orderId || !amount) {
//       alert("No order found, redirecting to cart.");
//       navigate("/cart");
//     }
//   }, [orderId, amount, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} amount={Number(amount)} />
//         </Elements>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// function CheckoutForm({ orderId, amount }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const initPayment = async () => {
//       try {
//         const resp = await createPaymentIntent({ orderId, amount });
//         setClientSecret(resp.clientSecret);
//       } catch (err) {
//         console.error("Failed to create payment intent:", err);
//         alert("Unable to initiate payment. Please try again.");
//       }
//     };
//     if (orderId && amount) initPayment();
//   }, [orderId, amount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);
//     try {
//       const card = elements.getElement(CardElement);
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card },
//       });

//       if (error) {
//         alert(error.message || "Payment failed.");
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");
//         navigate("/order-success", { state: { orderId, paymentIntent } });
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
//       <p><strong>Order:</strong> {orderId}</p>
//       <p><strong>Amount:</strong> ₹{amount}</p>

//       {!clientSecret ? (
//         <p>Preparing payment...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-3 rounded">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//           >
//             {loading ? "Processing..." : `Pay ₹${amount}`}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function CardPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state || {};
//   const orderId = state.orderId || localStorage.getItem("orderId");
//   const amount = state.amount || localStorage.getItem("orderAmount");

//   useEffect(() => {
//     if (!orderId || !amount) navigate("/cart");
//   }, [orderId, amount, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} amount={Number(amount)} />
//         </Elements>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent, confirmPayment } from "../api";

// export default function CardPayment() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { orderId, amount } = location.state || {};
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!orderId || !amount) navigate("/checkout");
//   }, [orderId, amount, navigate]);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Create payment intent on backend
//       const { clientSecret } = await createPaymentIntent({ orderId, amount });

//       // 2️⃣ Confirm card payment using Stripe
//       const cardElement = elements.getElement(CardElement);
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement },
//       });

//       if (error) throw error;

//       if (paymentIntent.status === "succeeded") {
//         // 3️⃣ Confirm payment in backend
//         await confirmPayment({ orderId, paymentIntentId: paymentIntent.id });

//         // 4️⃣ Clear cart & navigate to success page
//         localStorage.removeItem("selectedCartItems");
//         localStorage.removeItem("orderId");
//         localStorage.removeItem("orderAmount");
//         localStorage.removeItem("orderItems");

//         alert("Payment successful!");
//         navigate("/order-success", { state: { orderId } });
//       } else {
//         throw new Error("Payment failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment error: " + (err.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
//         <p className="mb-4">Pay ₹{amount} for your order</p>
//         <form onSubmit={handlePayment} className="space-y-4">
//           <div className="border p-2 rounded">
//             <CardElement />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || loading}
//             className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, confirmPayment,clearOrderedCartItems  } from "../api";


export default function CardPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, amount } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId || !amount) navigate("/checkout");
  }, [orderId, amount, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      // 1️⃣ Create Stripe Payment Intent
      const { clientSecret } = await createPaymentIntent({ orderId, amount });

      // 2️⃣ Confirm payment with card
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card},
      });

       if (error) {
      alert(error.message || "Payment failed.");
      return;
    }

     
      if (paymentIntent.status === "succeeded") {
  // 🔴 backend‑ல order update + order details வாங்குறது
  const confirmed = await confirmPayment({
    orderId,
    paymentIntentId: paymentIntent.id,
  });

  const order = confirmed.order || null;

   if (order && order.items) {
        const orderedIds = order.items.map(
          (i) => i.productId?.toString?.() || i.productId || i.itemId
        );

      const rawCart = localStorage.getItem("cart");
        if (rawCart) {
          const cart = JSON.parse(rawCart);
          const newCart = cart.filter(
            (c) => !orderedIds.includes(c.itemId?.toString?.() || c.itemId)
          );
          localStorage.setItem("cart", JSON.stringify(newCart));
        }

        // Logged-in cart (DB)
        try {
          if (orderedIds.length) {
            await clearOrderedCartItems(orderedIds);
          }
        } catch (e) {
          console.error("Failed to clear server cart:", e);
        }
      }

  // Cart related க்ளீன் பண்ணலாம், orderItems மட்டும் OrderSuccess க்கு காத்திருக்கட்டும்
  localStorage.removeItem("selectedCartItems");
  localStorage.removeItem("orderId");
  localStorage.removeItem("orderAmount");
  // orderItems remove panna koodadhu, OrderSuccess handle pannum

  navigate("/order-success", { state: { order, paymentIntent } });

      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
        <p className="mb-4">Pay LKR {amount} for your order</p>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="border p-2 rounded">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
