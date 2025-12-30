

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
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create Stripe Payment Intent
      const { clientSecret } = await createPaymentIntent({ orderId, amount });
        if (!clientSecret) throw new Error("Client secret not returned from server");

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
         throw new Error("Payment failed");
      }
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
        <p className="mb-4">Pay Rs.{amount} for your order</p>
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
