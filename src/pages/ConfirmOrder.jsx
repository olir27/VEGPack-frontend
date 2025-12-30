

// src/pages/ConfirmOrder.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmCODOrder, clearOrderedCartItems } from "../api";

const DELIVERY_CHARGE = 20;

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(false);

  // Order load – state இல்லையென்றால் localStorage fallback
  useEffect(() => {
    if (!order) {
      const savedOrderId = localStorage.getItem("orderId");
      const savedOrderItems = JSON.parse(
        localStorage.getItem("orderItems") || "[]"
      );
      const savedAmount = localStorage.getItem("orderAmount");

      if (!savedOrderId) {
        navigate("/"); // nothing to confirm
      } else {
        setOrder({
          _id: savedOrderId,
          totalAmount: savedAmount ? Number(savedAmount) : undefined,
          items: savedOrderItems,
        });
      }
    }
  }, [order, navigate]);

  if (!order) return null;

  // 🔹 Items subtotal (fallback)
  const subtotal =
    order.items?.reduce((sum, item) => {
      const qty = item.qty ?? item.quantity ?? 1;
      return sum + (item.price || 0) * qty;
    }, 0) || 0;

  const hasStoredTotal =
    typeof order.totalAmount === "number" &&
    !Number.isNaN(order.totalAmount);

  // 🔹 Delivery charge derive:
  //  - new orders → totalAmount = subtotal + DELIVERY_CHARGE
  //  - older orders → fallback = DELIVERY_CHARGE (எந்த items இருந்தாலும்)
  const rawDelivery = hasStoredTotal
    ? order.totalAmount - subtotal
    : order.items && order.items.length
    ? DELIVERY_CHARGE
    : 0;

  const delivery = rawDelivery > 0 ? rawDelivery : 0;

  // 🔹 Final total to show
  const displayTotal = hasStoredTotal ? order.totalAmount : subtotal + delivery;

  const handleConfirmCOD = async () => {
    setLoading(true);
    try {
      const payloadOrderId =
        order._id || order.orderId || localStorage.getItem("orderId");

      const resp = await confirmCODOrder(payloadOrderId);

      if (!resp.success) {
        throw new Error(resp.message || "Failed to confirm");
      }

      const confirmedOrder = resp.order || order;

      // ordered productIds
      const orderedIds =
        confirmedOrder.items
          ?.map(
            (i) => i.productId?.toString?.() || i.productId || i.itemId
          )
          .filter(Boolean) || [];

      // 🔹 Guest cart clean
      const rawCart = localStorage.getItem("cart");
      if (rawCart && orderedIds.length) {
        const cart = JSON.parse(rawCart);
        const newCart = cart.filter(
          (c) =>
            !orderedIds.includes(
              c.itemId?.toString?.() || c.itemId
            )
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      // 🔹 Logged-in DB cart clean
      try {
        if (orderedIds.length) {
          await clearOrderedCartItems(orderedIds);
        }
      } catch (e) {
        console.error("Failed to clear server cart after COD:", e);
      }

      // 🔹 Temporary order keys clean
      localStorage.removeItem("selectedCartItems");
      localStorage.removeItem("orderId");
      localStorage.removeItem("orderAmount");
      // localStorage.removeItem("orderItems"); // வேண்டும்னா later

      alert("COD order confirmed! Order will be processed.");

      navigate("/order-success", { state: { order: confirmedOrder } });
    } catch (err) {
      console.error(err);
      alert(
        "Failed to confirm COD: " +
          (err.message || JSON.stringify(err))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-green-100 p-6"
      style={{ marginTop: "70px" }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Confirm Your Order
        </h2>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      Price: LKR {item.price}
                    </p>
                    {item.quantity && (
                      <p className="text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No items found in this order.
              </p>
            )}
          </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-md " style={{marginTop:"40px",marginLeft:"200px"}}>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Items total</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery charge</span>
              <span>LKR {delivery.toFixed(2)}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-base">Total payable</span>
              <span className="text-xl font-extrabold text-green-600">
                LKR {displayTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        </div>

        {/* 🔹 Professional total breakdown */}
       

        {/* Confirmation Section */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="mb-6 text-gray-700">
            Please confirm that you want to place this order as{" "}
            <strong>Cash on Delivery (COD)</strong>. Once confirmed, we
            will process your order and contact you for delivery
            updates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleConfirmCOD}
              className={`px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
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