// src/components/ReviewsSection.jsx
import { useEffect, useState } from "react";
import api from "../api";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   // Inside ReviewsSection.jsx
const fetchReviews = async () => {
  try {
    const res = await api.get("/reviews");
    
    setReviews(res.reviews || []); 
  } catch (err) {
    console.error("Fetch reviews error:", err);
  } finally {
    setLoading(false);
  }

    };
    fetchReviews();
  }, []);

  if (loading) return null;
  if (!reviews.length) return null; // reviews இல்லனா இது section show ஆகாது

  return (
    <section className="py-12 px-4 md:px-16 bg-[#E8F5E9]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6 text-center">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < r.rating
                        ? "text-yellow-500 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-800 mb-3">“{r.comment}”</p>
              <p className="text-xs text-gray-600 mt-auto">
                —{" "}
                <span className="font-semibold">
                  {r.customer?.name || "Customer"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}