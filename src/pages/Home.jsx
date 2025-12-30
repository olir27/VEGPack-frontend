

// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  MessageCircle,
  X,
  ArrowRight,
  ShoppingCart,
  Star,
  Heart, 
  CheckCircle,
  Sparkles,  
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import ReviewsSection from "../components/ReviewsSection";
import Footer from "../components/Footer";
import api from "../api";
import { useAuth } from "../AuthContext";

// 5 images for ABOUT carousel (you can replace with imported assets)
const aboutImages = [
  "src/assets/about7.jpeg",
  "src/assets/about8.jpeg",
  "src/assets/about3.jpeg",
  "src/assets/about4.jpeg",
  "src/assets/about5.jpeg",
];

export default function Home() {
  const [openChat, setOpenChat] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  // ABOUT carousel state
  const [aboutIndex, setAboutIndex] = useState(0);
  const nextAbout = () =>
    setAboutIndex((prev) => (prev + 1) % aboutImages.length);
  const prevAbout = () =>
    setAboutIndex((prev) =>
      prev === 0 ? aboutImages.length - 1 : prev - 1
    );

  // Fresh Arrivals from backend (packages)
  const [freshPackages, setFreshPackages] = useState([]);
  const [freshLoading, setFreshLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const { isLoggedIn } = useAuth();

  // Chat auto‑scroll
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // ABOUT auto-slide (5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Fresh Arrivals (packages) from backend
  useEffect(() => {
    const fetchFresh = async () => {
      try {
        setFreshLoading(true);
        const res = await api.get("/products?page=1&limit=500");
        if (res.success) {
          const pkgs = (res.products || []).filter(
            (p) => (p.type || "").toLowerCase() === "package"
          );
          // Top 5 packages
          setFreshPackages(pkgs.slice(0, 5));
        } else {
          console.error("Fetch products failed:", res.message);
        }
      } catch (err) {
        console.error("Fresh arrivals fetch error:", err);
      } finally {
        setFreshLoading(false);
      }
    };
    fetchFresh();
  }, []);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    setChat((prev) => [...prev, { from: "user", text: msg }]);
    setMsg("");
    setTimeout(
      () =>
        setChat((prev) => [
          ...prev,
          { from: "bot", text: "Checking availability..." },
        ]),
      1000
    );
  };

  // Add package card to cart
  const handleAddPackageToCart = async (pack) => {
    setAddingId(pack._id);
    const payload = {
      type: "package",
      itemId: pack._id,
      name: pack.name,
      image: pack.image || "",
      unitPrice: pack.price,
      quantity: 1,
      vegetables: pack.vegetables || [],
      totalPrice: pack.price,
    };

    try {
      if (!isLoggedIn) {
        // guest → localStorage cart
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(payload);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart (guest)");
      } else {
        // logged‑in → backend
        const res = await api.post("/cart/add", payload);
        if (res.success) {
          alert("Added to cart");
        } else {
          alert(res.message || "Failed to add to cart");
        }
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div
      className="font-sans min-h-screen text-gray-900 overflow-x-hidden selection:bg-green-900 selection:text-white"
      style={{ backgroundColor: "#e3f1e5ff" }}
    >
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative px-6"
        style={{
          backgroundColor: "#a6e4beff",
          marginTop: "70px",
          paddingTop: "80px",
          paddingBottom: "50px",
          marginLeft: "50px",
          marginRight: "50px",
          borderRadius: "20px",
        }}
      >
        <div
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
          style={{ paddingLeft: "90px", paddingRight: "70px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 mb-6 shadow-sm">
              <Sparkles
                size={14}
                className="text-yellow-600"
                fill="currentColor"
              />
              <span className="text-xs font-bold text-green-900 uppercase tracking-wider">
                The Future of Freshness
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-950 leading-[1.1] mb-6 tracking-tight">
              Nature&apos;s Best,
              <br />{" "}
              <span className="" style={{color:"green"}}>
                Delivered Fresh.
              </span>
            </h1>
            <p className="text-lg text-green-900/70 mb-8 max-w-lg leading-relaxed font-medium">
              Skip the supermarket queue. We bring farm‑harvested organic
              vegetables directly to your doorstep within 24 hours.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/packages"
                className="bg-green-950 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
              >
                Start Ordering <ArrowRight size={18} />
              </Link>
              <Link
                to="/vegetables"
                className="bg-white/40 backdrop-blur-md border border-white text-green-950 px-8 py-4 rounded-full font-bold hover:bg-white transition-colors"
              >
                View Products
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[500px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-md"
            >
              <img
                src="src/assets/31670091-removebg-preview.png"
                alt="Veg Basket"
                className="w-full drop-shadow-2xl -mt-20 mb-4"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION – CAROUSEL ================= */}
      <section className="py-24 px-6">
        <div
          className="max-w-7xl"
          style={{ width: "1800px", marginLeft: "150px" }}
        >
          <div
            className="grid lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-md rounded-[3rem] p-8 lg:p-12  shadow-xl"
            style={{ width: "1500px" }}
          >
            {/* LEFT: Image Carousel */}
            <div className="relative order-2 lg:order-1">
              {/* bg shadow */}
              <div className="absolute inset-0 bg-green-900 rounded-[2.5rem] rotate-3 opacity-10" />

              <div className="relative rounded-[2.5rem] shadow-2xl border-4 border-white w-full h-[400px] overflow-hidden">
                <img
                  src={aboutImages[aboutIndex]}
                  alt={`Farm ${aboutIndex + 1}`}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  style={{ width: "800px", height: "500px" }}
                />

                {/* arrows */}
                <button
                  onClick={prevAbout}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md text-slate-600 hover:bg-green-600 hover:text-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextAbout}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md text-slate-600 hover:bg-green-600 hover:text-white transition"
                >
                  <ChevronRight size={18} />
                </button>

                {/* dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {aboutImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAboutIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full border transition ${
                        idx === aboutIndex
                          ? "bg-green-500 border-green-500"
                          : "bg-white border-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* badge */}
              <div className="absolute -bottom-6 right-6 bg-yellow-400 p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32">
                <span className="text-3xl font-black text-green-900">
                  100%
                </span>
                <span className="text-xs font-bold uppercase text-green-900">
                  Natural
                </span>
              </div>
            </div>

            {/* RIGHT: Text */}
            <div className="order-1 lg:order-2">
              <span className="text-green-700 font-bold uppercase tracking-wider text-sm">
                Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-green-950 mt-2 mb-6">
                Farm to Fork, <br /> Without the Wait.
              </h2>
              <p className="text-lg text-green-900/80 mb-8 leading-relaxed">
                We believe good food shouldn't be complicated. That's why we
                partner directly with local organic farmers.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { title: "Packages System", desc: "" },
                  { title: "Scheduled delivery", desc: "" },
                  {
                    title: "Direct delivery",
                    desc: "",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-full shadow-sm text-green-700 mt-1">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-950 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-green-900/60 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-block border-2 border-green-950 text-green-950 px-8 py-3 rounded-full font-bold hover:bg-green-950 hover:text-white transition-all"
              >
                Read More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FRESH ARRIVALS – now shows PACKAGES from backend ================= */}
      
          {/* <div className="flex justify-between items-end mb-12"> */}
           {/*  */}
              {/* <h2 className="text-4xl font-bold text-green-950">
                Fresh Arrivals
              </h2> */}
              {/* <p className="text-green-900/60 mt-2 font-medium">
                Top VegPack packages, freshly curated.
              </p> */}
            {/* </div> */}
            {/* <Link
              to="/packages"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-green-900 text-green-900 font-bold hover:bg-green-900 hover:text-white transition-all"
            >
              View All Packs <ArrowUpRight size={18} />
            </Link> */}
          {/* </div> */}

          
        
            {/* ================= FRESH ARRIVALS (Redesigned) ================= */}
      <section className="relative py-24 overflow-hidden">
        {/* Decorative Background for this section */}
        <div className="absolute inset-0 bg-green-50/50 -z-10" />
        <div className="absolute -left-20 top-20 w-96 h-96 bg-green-200/30 rounded-full blur-[100px] -z-10" />
        <div className="absolute -right-20 bottom-20 w-96 h-96 bg-yellow-100/40 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-green-600 font-bold tracking-wider uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
                New Harvest
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-green-950 mt-3 leading-tight">
                Fresh Arrivals
              </h2>
              <p className="text-green-800/60 mt-2 text-lg font-medium max-w-md">
                Hand-picked vegetable packages, harvested just for you.
              </p>
            </div>
            <Link
              to="/packages"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-green-950 text-white font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Explore All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Carousel */}
          {freshLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[280px] h-[400px] bg-white/50 animate-pulse rounded-[2.5rem]" />
              ))}
            </div>
          ) : freshPackages.length === 0 ? (
            <div className="text-center py-20 bg-white/40 rounded-[3rem] border border-white">
              <p className="text-green-800 text-lg font-medium">Coming soon! The farmers are harvesting.</p>
            </div>
          ) : (
            <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-2 scrollbar-hide snap-x snap-mandatory">
              {freshPackages.map((pack) => (
                <div
                  key={pack._id}
                  className="group relative min-w-[300px] md:min-w-[320px] snap-center bg-white rounded-[2.5rem] p-5 shadow-lg shadow-green-900/5 hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-2 transition-all duration-500 border border-green-50/50 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-34 w-full bg-[#F3F6F4] rounded-[2rem] overflow-hidden flex items-center justify-center mb-6">
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm z-10">
                      FRESH
                    </div>
                    {/* Fav Button */}
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10">
                      <Heart size={20} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Heart size={20} className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                    </button>
                    
                    {/* Image */}
                    <img
                      src={pack.image || "https://via.placeholder.com/250"}
                      alt={pack.name}
                      className="w-48 h-48 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col px-2">
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-bold text-slate-700">4.9</span>
                      <span className="text-xs text-slate-400">(120 reviews)</span>
                    </div>

                    <h3 className="text-xl font-bold text-green-950 mb-1 leading-tight line-clamp-1">
                      {pack.name}
                    </h3>
                    <p className="text-sm text-green-900/50 font-medium mb-4 line-clamp-2">
                      {pack.vegetables?.map(v => v.vegetableId?.name).join(", ") || "Mixed organic vegetables"}
                    </p>

                    {/* Footer: Price & Add Button */}
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Price</p>
                        <p className="text-2xl font-black text-green-700">
                          Rs.{pack.price}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddPackageToCart(pack)}
                        disabled={addingId === pack._id}
                        className="relative w-14 h-14 rounded-full bg-green-950 text-white flex items-center justify-center shadow-lg hover:bg-green-800 hover:scale-105 active:scale-95 transition-all duration-300 group/btn overflow-hidden" style={{backgroundColor:"green"}}
                      >
                         {addingId === pack._id ? (
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         ) : (
                           <>
                             <ShoppingCart size={24} className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-10 group-hover/btn:opacity-0"  />
                             <div className="absolute inset-0 flex items-center justify-center translate-y-10 opacity-0 group-hover/btn:translate-y-0 group-hover/btn:opacity-100 transition-all duration-300 z-10">
                               <span className="text-xs font-bold ">ADD</span>
                             </div>
                           </>
                         )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
     

      {/* ================= TIMELINE / PROCESS ================= */}
      <section className="py-24 px-6" style={{marginLeft:"100px",marginRight:"100px"}}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-bold text-green-950 mb-6">
              Farmers can supply 
              <br />
              vegetables 
            </h2>
            <p className="text-xl text-green-900/80 font-medium mb-10 leading-relaxed">
              Unlike grocery apps that store vegetables in warehouses for days,
              we follow a{" "}
              <span className="text-green-950 underline decoration-yellow-400 decoration-4">
                Zero-Inventory Model
              </span>
              .
            </p>

            <div className="space-y-8 relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-900/20" />

              <div className="flex gap-6 relative">
                <div className="w-12 h-12 bg-green-900 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-green-950">
                    You Order
                  </h4>
                  <p className="text-green-900/60">
                    Browse fresh produce and place your order.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 relative">
                <div className="w-12 h-12 bg-white text-green-900 border-2 border-green-900 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-green-950">
                    We Harvest
                  </h4>
                  <p className="text-green-900/60">
                    Farmers harvest exactly what is ordered.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 relative">
                <div className="w-12 h-12 bg-yellow-400 text-green-900 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-green-950">
                    Delivered
                  </h4>
                  <p className="text-green-900/60">
                    Straight to your door within hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop"
              className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white w-full h-[500px] object-cover"
              alt="Farmer"
            />

            <div className="absolute bottom-10 -left-10 bg-green-950 text-white p-8 rounded-[2rem] shadow-xl max-w-[240px]">
              <div className="text-yellow-400 mb-2">
                <Star fill="currentColor" size={20} />
              </div>
              <p className="font-bold text-lg leading-tight">
                "We ensure fair prices for every farmer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <div className="pt-10 border-t border-green-900/10 mt-10" style={{borderRadius:"10px"}}>
        <ReviewsSection />
      </div>

      {/* ================= CHAT WIDGET ================= */}
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-950 text-white rounded-full shadow-2xl z-50 hover:scale-110 transition-transform flex items-center justify-center border-4 border-green-200"
      >
        {openChat ? <X size={28} /> : <MessageCircle size={32} />}
      </button>

      {openChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-28 right-8 bg-white w-80 h-96 shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden flex flex-col"
        >
          <div className="bg-green-950 text-white p-4 flex justify-between items-center">
            <span className="font-bold text-sm">Support</span>
            <button onClick={() => setOpenChat(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`p-3 text-sm rounded-xl max-w-[85%] ${
                  c.from === "user"
                    ? "bg-green-800 text-white ml-auto"
                    : "bg-white border mr-auto"
                }`}
              >
                {c.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none"
              placeholder="Message..."
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 bg-green-900 rounded-full flex items-center justify-center text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

    
    </div>
  );
}  