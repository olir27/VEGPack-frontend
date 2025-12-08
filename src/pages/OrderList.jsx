import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", config);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Orders</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Order ID</th>
            <th className="border px-2 py-1">User ID</th>
            <th className="border px-2 py-1">Total Amount</th>
            <th className="border px-2 py-1">Payment Status</th>
            <th className="border px-2 py-1">Shipment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="border px-2 py-1">{o._id}</td>
              <td className="border px-2 py-1">{o.userId}</td>
              <td className="border px-2 py-1">{o.totalAmount}</td>
              <td className="border px-2 py-1">{o.paymentStatus}</td>
              <td className="border px-2 py-1">{o.shipmentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
