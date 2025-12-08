// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, User, Leaf } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="bg-green-200  text-gray-800 font-sans" style={{ marginTop: "0px" }} >

//       {/* Hero Section */}
//       <section className="relative bg-green-200 overflow-hidden" >
//         {/* Curved background shape */}
//         <div className="absolute right-0 top-0 w-[700px] h-[700px] bg-gray-200 rounded-l-[50%] -z-10" ></div>

//         <div className="grid md:grid-cols-2 items-center px-8 md:px-16 py-16" style={{ marginTop: "0px", marginLeft: "290px", marginRight: "250px" }}>
//           {/* Left content */}
//           <div className="z-8" style={{ marginTop: "0px" }}>
//             <h1
//               className=" md:text-5xl font-bold mb-4 leading-snug" style={{ fontSize: "60px" }}

//             >
//               Organic & Fresh <br /> Vegetables Delivery
//             </h1>
//             <p className="text-gray-700 mb-6 leading-relaxed ">
//               We deliver farm-fresh vegetables directly to your doorstep. Enjoy
//               organic, healthy, and pesticide-free produce from trusted local farmers.
//             </p>
//             <div className="flex space-x-4">
//               <Link
//                 to="/packages"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full transition"
//               >
//                 Explore Packages
//               </Link>
//               <Link
//                 to="/vegetables"
//                 className="border border-green-600 text-green-700 hover:bg-green-100 font-semibold py-2 px-5 rounded-full transition"
//               >
//                 View Products
//               </Link>
//             </div>
//           </div>

//           {/* Image (delivery scooter) */}
//           <div className="relative flex justify-center md:justify-end mt-10 md:mt-0" >
//             <img
//               src="src/assets/31670091-removebg-preview.png"
//               alt="Vegetable Delivery"
//               className="w-[400px] md:w-[530px] drop-shadow-xl relative -top-10 md:-top-24 object-cover "

//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className=" py-16 px-8 md:px-16 flex flex-col md:flex-row items-center" style={{ marginLeft: "250px", marginRight: "250px", marginTop: "50px", marginBottom: "50px" }} >
//         <img
//           src="src/assets/vvvvvvvvvvv-removebg-preview.png"
//           alt="About Vegetables"
//           className="w-80 md:w-96 rounded-2xl  mb-8 md:mb-0"
//           style={{ width: "350px", height: "250px" }}
//         />
//         <div className="md:ml-10" style={{ marginLeft: "50px" }}>
//           <h2 className="text-3xl font-semibold text-green-800 mb-4" style={{ marginLeft: "30px" }}>About</h2>
//           <p className="text-gray-700 leading-relaxed">
//             VEGPack connects farmers and customers through an online platform
//             that delivers organic and fresh vegetables at fair prices.
//             Our goal is to make healthy eating easy, sustainable, and affordable.
//           </p>
//         </div>
//       </section>


//       {/* Features Section */}
//       <section className="bg-[#E8F5E9] py-12" style={{ marginLeft: "250px", marginRight: "250px" }}>
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-green-800 mb-10">Why Choose Us?</h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

//             <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//               <Leaf className="mx-auto text-green-600 mb-3" size={40} />
//               <h3 className="font-bold text-lg mb-2">Fresh Vegetables</h3>
//               <p className="text-gray-600 text-sm">Harvested daily and delivered straight from farms.</p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//               <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Organic" className="mx-auto w-10 mb-3" />
//               <h3 className="font-bold text-lg mb-2">100% Organic</h3>
//               <p className="text-gray-600 text-sm">Grown without harmful chemicals and pesticides.</p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//               <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="Variety" className="mx-auto w-10 mb-3" />
//               <h3 className="font-bold text-lg mb-2">Flexible Packages</h3>
//               <p className="text-gray-600 text-sm">
//                 Select small, medium, or family-sized packages—tailored to your household needs every week.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//               <img src="https://cdn-icons-png.flaticon.com/512/857/857681.png" alt="Farmers" className="mx-auto w-10 mb-3" />
//               <h3 className="font-bold text-lg mb-2">Support Farmers</h3>
//               <p className="text-gray-600 text-sm">Empowering local farmers through fair trade.</p>
//             </div>

//           </div>
//         </div>
//       </section>




//       {/* Footer */}
//       <footer className="bg-green-800 text-white text-center py-6">
//         <p className="text-sm">&copy; {new Date().getFullYear()} VEGPack. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }


// // src/pages/Home.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X } from "lucide-react";


// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!msg.trim()) return;

//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     const userMsg = msg;
//     setMsg("");

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMsg }),
//       });

//       const data = await res.json();
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: data.reply || "No response" },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: "Server error. Please try again later." },
//       ]);
//     }
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chat]);

//   return (
//     <>
//       {/* ========================== MAIN PAGE =============================== */}
//       <div className="bg-green-200 text-gray-800 font-sans min-h-screen">
//         {/* HERO SECTION */}
//         <section className="relative overflow-hidden">
//           {/* Background circle */}
//           <div className="absolute right-[-120px] top-[-80px] w-[500px] h-[500px] bg-white/60 rounded-full blur-3xl pointer-events-none" />

//           <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
//             <div className="grid md:grid-cols-2 gap-10 items-center">
//               {/* Left: Text */}
//               <div>
//                 <p className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-2">
//                   Farm-fresh groceries, delivered
//                 </p>
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
//                   Organic & Fresh{" "}
//                   <span className="text-green-800">Vegetables</span> at Your
//                   Doorstep
//                 </h1>
//                 <p className="text-gray-700 mb-6 leading-relaxed">
//                   VEGPack connects local farmers directly with you. Get
//                   chemical-free, seasonal vegetables in curated packages or as
//                   individual items, delivered fresh to your home.
//                 </p>

//                 <div className="flex flex-wrap gap-4">
//                   <Link
//                     to="/packages"
//                     className="px-6 py-2.5 bg-green-700 text-white font-semibold rounded-full shadow hover:bg-green-800 transition"
//                   >
//                     Explore Packages
//                   </Link>
//                   <Link
//                     to="/vegetables"
//                     className="px-6 py-2.5 bg-white text-green-800 font-semibold rounded-full border border-green-600 hover:bg-green-50 transition"
//                   >
//                     Browse Vegetables
//                   </Link>
//                 </div>

//                 <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <Leaf className="text-green-700" size={18} />
//                     <span>100% Organic</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-green-700" />
//                     <span>Direct from local farmers</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Image */}
//               <div className="relative flex justify-center md:justify-end">
//                 <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/80 rounded-full shadow-lg flex items-center justify-center">
//                   <img
//                     src="src/assets/31670091-removebg-preview.png"
//                     alt="Vegetable Delivery"
//                     className="w-[90%] h-[90%] object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ABOUT SECTION */}
//         <section className="py-12 md:py-16">
//           <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-8 items-center">
//             <div className="flex justify-center md:justify-start">
//               <img
//                 src="src/assets/vvvvvvvvvvv-removebg-preview.png"
//                 alt="About Vegetables"
//                 className="w-80 md:w-96 rounded-2xl shadow-md"
//               />
//             </div>
//             <div>
//               <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-3">
//                 About VEGPack
//               </h2>
//               <p className="text-gray-700 leading-relaxed mb-3">
//                 VEGPack is a smart vegetable delivery platform that connects
//                 farmers and customers. We ensure fair prices for farmers and
//                 fresh, high‑quality vegetables for customers.
//               </p>
//               <p className="text-gray-700 leading-relaxed">
//                 Choose from flexible weekly or monthly deliveries, curated
//                 packages, and single‑item orders. We support local farmers and
//                 sustainable agriculture while giving you convenience and health
//                 at your doorstep.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES SECTION */}
//         <section className="py-12 bg-[#E8F5E9]">
//           <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
//             <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-8 text-center">
//               Why Choose VEGPack?
//             </h2>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <Leaf className="mx-auto text-green-600 mb-3" size={32} />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Fresh & Organic
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Vegetables harvested on the same day and delivered to you
//                   without harmful chemicals.
//                 </p>
//               </div>

//               <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
//                   alt="Affordable"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Fair Prices
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   No middlemen. Fair pricing for farmers & customers.
//                 </p>
//               </div>

//               <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
//                   alt="Flexible"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Flexible Plans
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Weekly / Monthly subscriptions and custom packages for all
//                   family sizes.
//                 </p>
//               </div>

//               <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
//                   alt="Farmers"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Support Farmers
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Empowering local farmers with direct access to customers.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* REVIEWS / TESTIMONIALS */}
//         <ReviewsSection />

//         {/* FOOTER */}
//         <footer className="bg-green-800 text-white text-center py-6 mt-8">
//           <p className="text-sm">
//             © {new Date().getFullYear()} VEGPack. All Rights Reserved.
//           </p>
//         </footer>
//       </div>

//       {/* ========================== CHAT ICON ============================ */}
//       <button
//         onClick={() => setOpenChat(true)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl z-[9999]"
//       >
//         <MessageCircle size={28} />
//       </button>

//       {/* ========================== CHAT POPUP ========================== */}
//       {openChat && (
//         <div className="fixed bottom-20 right-6 bg-white w-80 h-96 shadow-xl rounded-xl flex flex-col border border-gray-200 z-[99999]">
//           {/* HEADER */}
//           <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-xl">
//             <h3 className="font-semibold text-lg">VEGPack Assistant</h3>
//             <button onClick={() => setOpenChat(false)}>
//               <X size={24} />
//             </button>
//           </div>

//           {/* BODY */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3">
//             {chat.map((c, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-md max-w-[80%] ${
//                   c.from === "user"
//                     ? "bg-green-200 ml-auto text-right"
//                     : "bg-gray-100 mr-auto"
//                 }`}
//               >
//                 {c.text}
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* INPUT */}
//           <div className="p-3 flex space-x-2 border-t">
//             <input
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="flex-1 border p-2 rounded-md text-sm"
//               placeholder="Type your message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md text-sm"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// // src/pages/Home.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X, Truck, ShoppingBag, ShieldCheck } from "lucide-react";
// import ReviewsSection from "../components/ReviewsSection";

// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!msg.trim()) return;

//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     const userMsg = msg;
//     setMsg("");

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMsg }),
//       });

//       const data = await res.json();
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: data.reply || "No response" },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: "Server error. Please try again later." },
//       ]);
//     }
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chat]);

//   return (
//     <>
//       {/* ========================== MAIN LAYOUT =============================== */}
//       <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-white text-gray-800 font-sans">
//         {/* HERO SECTION */}
//         <section className="relative overflow-hidden">
//           {/* Background shapes */}
//           <div className="absolute -right-32 -top-24 w-[420px] h-[420px] bg-white/60 rounded-full blur-3xl pointer-events-none" />
//           <div className="absolute -left-32 bottom-0 w-[380px] h-[380px] bg-green-300/50 rounded-full blur-3xl pointer-events-none" />

//           <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
//             <div className="grid md:grid-cols-2 gap-10 items-center">
//               {/* Left: Text */}
//               <div>
//                 <p className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-2">
//                   Fresh • Organic • Local
//                 </p>
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
//                   Healthy veggies,
//                   <br />
//                   <span className="text-green-800">delivered to your door.</span>
//                 </h1>
//                 <p className="text-gray-700 mb-6 leading-relaxed">
//                   VEGPack brings farm-fresh vegetables directly from trusted
//                   local farmers to your home. Choose curated packages or pick
//                   your own veggies. Fresh, chemical-free, and affordable.
//                 </p>

//                 <div className="flex flex-wrap gap-4 mb-4">
//                   <Link
//                     to="/packages"
//                     className="px-6 py-2.5 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition"
//                   >
//                     Explore Packages
//                   </Link>
//                   <Link
//                     to="/vegetables"
//                     className="px-6 py-2.5 bg-white text-green-800 font-semibold rounded-full border border-green-600 hover:bg-green-50 transition"
//                   >
//                     Browse Vegetables
//                   </Link>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <Leaf className="text-green-700" size={18} />
//                     <span>100% Organic & Seasonal</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Truck className="text-green-700" size={18} />
//                     <span>Quick Doorstep Delivery</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Glass Card with Image & badges */}
//               <div className="flex justify-center md:justify-end">
//                 <div className="relative w-72 md:w-80 lg:w-96">
//                   <div className="bg-white/80 rounded-3xl shadow-xl border border-green-100 p-4 backdrop-blur">
//                     <div className="rounded-2xl overflow-hidden bg-green-50 flex items-center justify-center">
//                       <img
//                         src="src/assets/31670091-removebg-preview.png"
//                         alt="Vegetable Basket"
//                         className="w-full h-64 object-contain"
//                       />
//                     </div>
//                     <div className="mt-3 flex justify-between items-center text-xs text-gray-600">
//                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800">
//                         <Leaf size={14} /> Farm Fresh
//                       </span>
//                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
//                         <ShieldCheck size={14} /> Quality Checked
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ABOUT SECTION */}
//         <section className="py-12 md:py-16">
//           <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-8 items-center">
//             <div className="flex justify-center md:justify-start">
//               <img
//                 src="src/assets/vvvvvvvvvvv-removebg-preview.png"
//                 alt="About VegPack"
//                 className="w-80 md:w-96 rounded-2xl shadow-md bg-white/80"
//               />
//             </div>
//             <div>
//               <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-3">
//                 About VEGPack
//               </h2>
//               <p className="text-gray-700 leading-relaxed mb-3">
//                 VEGPack is a bridge between local farmers and conscious
//                 customers. We ensure farmers get fair pricing, while customers
//                 receive the freshest vegetables harvested just hours before
//                 delivery.
//               </p>
//               <p className="text-gray-700 leading-relaxed">
//                 With flexible subscriptions (weekly / monthly), curated
//                 packages, and customisable options, VEGPack makes healthy eating
//                 simple, sustainable, and affordable.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES / VALUE PROPS */}
//         <section className="py-12 bg-white">
//           <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
//             <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-8 text-center">
//               Why Choose VEGPack?
//             </h2>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <Leaf className="mx-auto text-green-600 mb-3" size={32} />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Fresh & Organic
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Freshly harvested vegetables straight from fields, grown with
//                   minimal or no chemicals.
//                 </p>
//               </div>

//               <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <ShoppingBag className="mx-auto text-green-600 mb-3" size={32} />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Curated Packages
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Choose from pre-designed family packs or create your own mix
//                   based on your weekly needs.
//                 </p>
//               </div>

//               <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
//                   alt="Flexible"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Flexible Plans
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Weekly / Monthly subscriptions that fit students, professionals
//                   and families.
//                 </p>
//               </div>

//               <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-sm hover:shadow-md transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
//                   alt="Farmers"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-1 text-center">
//                   Support Farmers
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center">
//                   Every order directly helps small farmers earn better and grow
//                   sustainable produce.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* REVIEWS / TESTIMONIALS */}
//         <ReviewsSection />

//         {/* FOOTER */}
//         <footer className="bg-green-800 text-white text-center py-6 mt-8">
//           <p className="text-sm">
//             © {new Date().getFullYear()} VEGPack. All Rights Reserved.
//           </p>
//         </footer>
//       </div>

//       {/* ========================== CHAT ICON ============================ */}
//       <button
//         onClick={() => setOpenChat(true)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl z-[9999]"
//       >
//         <MessageCircle size={28} />
//       </button>

//       {/* ========================== CHAT POPUP ========================== */}
//       {openChat && (
//         <div className="fixed bottom-20 right-6 bg-white w-80 h-96 shadow-xl rounded-xl flex flex-col border border-gray-200 z-[99999]">
//           {/* HEADER */}
//           <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-xl">
//             <h3 className="font-semibold text-lg">VEGPack Assistant</h3>
//             <button onClick={() => setOpenChat(false)}>
//               <X size={24} />
//             </button>
//           </div>

//           {/* BODY */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3">
//             {chat.map((c, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-md max-w-[80%] ${
//                   c.from === "user"
//                     ? "bg-green-200 ml-auto text-right"
//                     : "bg-gray-100 mr-auto"
//                 }`}
//               >
//                 {c.text}
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* INPUT */}
//           <div className="p-3 flex space-x-2 border-t">
//             <input
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="flex-1 border p-2 rounded-md text-sm"
//               placeholder="Type your message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md text-sm"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// // }

// // src/pages/Home.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X } from "lucide-react";
// import ReviewsSection from "../components/ReviewsSection";

// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!msg.trim()) return;

//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     const userMsg = msg;
//     setMsg("");

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMsg }),
//       });

//       const data = await res.json();
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: data.reply || "No response" },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: "Server error. Check backend." },
//       ]);
//     }
//   };

//   useEffect(() => {
//     if (chatEndRef.current)
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <>
//       {/* ========================== MAIN PAGE =============================== */}
//       <div className="bg-green-200 text-gray-800 font-sans min-h-screen" >
//         {/* HERO SECTION */}
//         <section className=" overflow-hidden bg-green-200" style={{marginLeft:"350px",marginRight:"200px"}}>
//           {/* right side background shape (desktop) */}
//           <div className="hidden md:block absolute right-0 top-0  bg-gray-200 rounded-l-[50%] -z-10" />

//           <div className="max-w-6xl mx-auto  sm:px-6 lg:px-8 ">
//             <div className="grid md:grid-cols-2 " >
//               {/* Left: Text */}
//               <div style={{marginTop:"150px"}}>
//                 <h1 className="text-6xl sm:text-5xl lg:text-5xl font-bold mb-4 leading-snug text-gray-900">
//                   Organic & Fresh <br /> Vegetables Delivery
//                 </h1>
//                 <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
//                   We deliver farm-fresh vegetables directly to your doorstep.
//                 </p>
//                 <div className="flex flex-wrap gap-4">
//                   <Link
//                     to="/packages"
//                     className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full text-sm sm:text-base"
//                   >
//                     Explore Packages
//                   </Link>
//                   <Link
//                     to="/vegetables"
//                     className="border border-green-600 text-green-700 hover:bg-green-100 font-semibold py-2 px-5 rounded-full text-sm sm:text-base"
//                   >
//                     View Products
//                   </Link>
//                 </div>
//               </div>

//               {/* Right: Image */}
//               <div className=" flex md:justify-end mt-8 md:mt-0">
//                 <img
//                   src="src/assets/Pasted image.png"
//                   alt="Vegetable Delivery"
//                   className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] drop-shadow-xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ABOUT SECTION */}
//         <section className="py-12 sm:py-16">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
//             <div className="flex justify-center md:justify-start">
//               <img
//                 src="src/assets/vvvvvvvvvvv-removebg-preview.png"
//                 alt="About Vegetables"
//                 className="w-64 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 object-cover rounded-2xl shadow-md"
//               />
//             </div>
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-semibold text-green-800 mb-4">
//                 About
//               </h2>
//               <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
//                 VEGPack connects farmers and customers through an online
//                 platform that delivers organic and fresh vegetables at fair
//                 prices. We focus on freshness, sustainability, and
//                 farmer-friendly pricing.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES SECTION */}
//         <section className="bg-[#E8F5E9] py-12">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-2xl sm:text-3xl font-semibold text-green-800 mb-10">
//               Why Choose Us?
//             </h2>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//                 <Leaf className="mx-auto text-green-600 mb-3" size={40} />
//                 <h3 className="font-bold text-lg mb-2">Fresh Vegetables</h3>
//                 <p className="text-gray-600 text-sm">
//                   Harvested daily and delivered straight from farms.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
//                   alt="Organic"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-2">100% Organic</h3>
//                 <p className="text-gray-600 text-sm">
//                   Grown without harmful chemicals.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
//                   alt="Variety"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-2">Flexible Packages</h3>
//                 <p className="text-gray-600 text-sm">
//                   Choose small, medium, or family packs.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
//                   alt="Farmers"
//                   className="mx-auto w-10 mb-3"
//                 />
//                 <h3 className="font-bold text-lg mb-2">Support Farmers</h3>
//                 <p className="text-gray-600 text-sm">
//                   Empowering local farmers through fair trade.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CUSTOMER REVIEWS (ADMIN-APPROVED) */}
//         <ReviewsSection />

//         {/* FOOTER */}
//         <footer className="bg-green-800 text-white text-center py-6 mt-8">
//           <p className="text-sm">
//             © {new Date().getFullYear()} VEGPack. All Rights Reserved.
//           </p>
//         </footer>
//       </div>

//       {/* ========================== CHAT ICON ============================ */}
//       <button
//         onClick={() => setOpenChat(true)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl z-[9999]"
//       >
//         <MessageCircle size={28} />
//       </button>

//       {/* ========================== CHAT POPUP ========================== */}
//       {openChat && (
//         <div className="fixed bottom-20 right-6 bg-white w-72 sm:w-80 h-96 shadow-xl rounded-xl flex flex-col border border-gray-200 z-[99999]">
//           {/* HEADER */}
//           <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-xl">
//             <h3 className="font-semibold text-lg">VEGPack Assistant</h3>
//             <button onClick={() => setOpenChat(false)}>
//               <X size={24} />
//             </button>
//           </div>

//           {/* BODY */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3">
//             {chat.map((c, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-md max-w-[80%] ${
//                   c.from === "user"
//                     ? "bg-green-200 ml-auto text-right"
//                     : "bg-gray-100 mr-auto"
//                 }`}
//               >
//                 {c.text}
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* INPUT */}
//           <div className="p-3 flex space-x-2 border-t">
//             <input
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="flex-1 border p-2 rounded-md text-sm"
//               placeholder="Type your message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md text-sm"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X } from "lucide-react";
// import ReviewsSection from "../components/ReviewsSection";
// // Ensure you have an api utility if needed, or keep fetch
// // import api from "../api"; 

// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!msg.trim()) return;

//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     const userMsg = msg;
//     setMsg("");

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMsg }),
//       });

//       const data = await res.json();
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: data.reply || "No response" },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setChat((prev) => [
//         ...prev,
//         { from: "bot", text: "Server error. Please try again later." },
//       ]);
//     }
//   };

//   useEffect(() => {
//     if (chatEndRef.current)
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <>
//       <div className="bg-green-50 text-gray-800 font-sans min-h-screen">
//         {/* HERO SECTION */}
//         <section className="relative overflow-hidden bg-green-200 pt-24 pb-16 lg:pt-32">
//           {/* Background Shape */}
//           <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 bg-gray-100 rounded-l-[50%] -z-0" />

//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="grid md:grid-cols-2 gap-10 items-center">
//               {/* Left: Text */}
//               <div className="text-center md:text-left">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
//                   Organic & Fresh <br /> 
//                   <span className="text-green-800">Vegetables Delivery</span>
//                 </h1>
//                 <p className="text-gray-700 mb-8 text-lg leading-relaxed">
//                   We deliver farm-fresh vegetables directly to your doorstep.
//                   Healthy living starts here.
//                 </p>
//                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
//                   <Link
//                     to="/packages"
//                     className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-lg"
//                   >
//                     Explore Packages
//                   </Link>
//                   <Link
//                     to="/vegetables"
//                     className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-full transition"
//                   >
//                     View Products
//                   </Link>
//                 </div>
//               </div>

//               {/* Right: Image */}
//               <div className="flex justify-center md:justify-end">
//                 <img
//                   src="src/assets/31670091-removebg-preview.png"
//                   alt="Vegetable Delivery"
//                   className="w-[280px] sm:w-[380px] md:w-[450px] drop-shadow-2xl hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ABOUT SECTION */}
//         <section className="py-16 bg-white">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
//             <div className="flex justify-center md:justify-start">
//               <img
//                 src="src/assets/vvvvvvvvvvv-removebg-preview.png"
//                 alt="About Vegetables"
//                 className="w-full max-w-md object-cover rounded-2xl shadow-lg"
//               />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-green-800 mb-4">
//                 About VEGPack
//               </h2>
//               <p className="text-gray-600 leading-relaxed text-lg">
//                 VEGPack connects farmers and customers through an online
//                 platform that delivers organic and fresh vegetables at fair
//                 prices. We focus on freshness, sustainability, and
//                 farmer-friendly pricing.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES SECTION */}
//         <section className="bg-[#E8F5E9] py-16">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-3xl font-bold text-green-800 mb-12">
//               Why Choose Us?
//             </h2>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { icon: <Leaf size={40} className="text-green-600 mx-auto" />, title: "Fresh Vegetables", desc: "Harvested daily and delivered straight from farms." },
//                 { img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", title: "100% Organic", desc: "Grown without harmful chemicals." },
//                 { img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png", title: "Flexible Packages", desc: "Choose small, medium, or family packs." },
//                 { img: "https://cdn-icons-png.flaticon.com/512/857/857681.png", title: "Support Farmers", desc: "Empowering local farmers through fair trade." }
//               ].map((item, i) => (
//                 <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
//                   <div className="mb-4 h-12 flex items-center justify-center">
//                     {item.icon ? item.icon : <img src={item.img} alt={item.title} className="w-12 mx-auto" />}
//                   </div>
//                   <h3 className="font-bold text-lg mb-2">{item.title}</h3>
//                   <p className="text-gray-600 text-sm">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* REVIEWS */}
//         <ReviewsSection />

//         {/* FOOTER */}
//         <footer className="bg-green-900 text-white text-center py-8 mt-8">
//           <p className="text-sm opacity-80">
//             © {new Date().getFullYear()} VEGPack. All Rights Reserved.
//           </p>
//         </footer>
//       </div>

//       {/* CHAT BUTTON & MODAL (Unchanged but ensure z-index handles overlap) */}
//       <button
//         onClick={() => setOpenChat(true)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl z-50"
//       >
//         <MessageCircle size={28} />
//       </button>

//       {openChat && (
//         <div className="fixed bottom-24 right-6 bg-white w-80 h-96 shadow-2xl rounded-xl flex flex-col border border-gray-200 z-50 overflow-hidden">
//           <div className="bg-green-600 text-white p-3 flex justify-between items-center">
//             <h3 className="font-semibold text-lg">VEGPack Assistant</h3>
//             <button onClick={() => setOpenChat(false)}>
//               <X size={24} />
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//             {chat.map((c, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-lg max-w-[80%] text-sm ${
//                   c.from === "user"
//                     ? "bg-green-600 text-white ml-auto"
//                     : "bg-white border text-gray-800 mr-auto"
//                 }`}
//               >
//                 {c.text}
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>
//           <div className="p-3 flex space-x-2 border-t bg-white">
//             <input
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="flex-1 border p-2 rounded-md text-sm outline-none focus:border-green-500"
//               placeholder="Type your message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md text-sm"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X, ArrowRight, ShoppingCart, Star, Heart, Truck, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
// import { motion } from "framer-motion";
// import ReviewsSection from "../components/ReviewsSection";
// import Footer from "../components/Footer";

// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   // Mock Data
//   const trendingProducts = [
//     { id: 1, name: "Fresh Carrots", price: 40, img: "https://cdn-icons-png.flaticon.com/512/2909/2909808.png", color: "bg-orange-50" },
//     { id: 2, name: "Broccoli", price: 60, img: "https://cdn-icons-png.flaticon.com/512/2909/2909787.png", color: "bg-green-50" },
//     { id: 3, name: "Red Tomatoes", price: 25, img: "https://cdn-icons-png.flaticon.com/512/2909/2909841.png", color: "bg-red-50" },
//     { id: 4, name: "Spinach", price: 30, img: "https://cdn-icons-png.flaticon.com/512/2909/2909832.png", color: "bg-green-50" },
//   ];

//   const sendMessage = async () => {
//     if (!msg.trim()) return;
//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     setMsg("");
//     setTimeout(() => setChat((prev) => [...prev, { from: "bot", text: "Checking stock..." }]), 1000);
//   };

//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <div className="font-sans min-h-screen bg-green-200 text-gray-900 overflow-x-hidden selection:bg-green-900 selection:text-white">
      
//       {/* ================= HERO SECTION (You Liked This) ================= */}
//       <section className="relative pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
           
//            {/* Left Content */}
//            <motion.div 
//              initial={{ opacity: 0, y: 20 }} 
//              animate={{ opacity: 1, y: 0 }} 
//              transition={{ duration: 0.8 }}
//            >
//               <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 mb-6 shadow-sm">
//                  <Sparkles size={14} className="text-yellow-600" fill="currentColor"/>
//                  <span className="text-xs font-bold text-green-900 uppercase tracking-wider">The Future of Freshness</span>
//               </div>

//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-950 leading-[1.1] mb-6 tracking-tight">
//                  Nature's Best, <br/>
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">Delivered Fresh.</span>
//               </h1>
              
//               <p className="text-lg text-green-900/70 mb-8 max-w-lg leading-relaxed font-medium">
//                  Skip the supermarket queue. We bring farm-harvested organic vegetables directly to your doorstep within 24 hours.
//               </p>

//               <div className="flex items-center gap-4">
//                  <Link to="/packages" className="bg-green-950 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
//                     Start Ordering <ArrowRight size={18}/>
//                  </Link>
//                  <Link to="/vegetables" className="bg-white/40 backdrop-blur-md border border-white text-green-950 px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
//                     View Products
//                  </Link>
//               </div>

//               <div className="mt-10 flex items-center gap-4">
//                  <div className="flex -space-x-3">
//                     {[1,2,3,4].map(i => (
//                         <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-green-200 overflow-hidden">
//                             <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user"/>
//                         </div>
//                     ))}
//                  </div>
//                  <div className="text-sm font-bold text-green-900">
//                     <span className="block">Trusted by 10,000+</span>
//                     <span className="text-green-700/60 font-normal">Happy Customers</span>
//                  </div>
//               </div>
//            </motion.div>

//            {/* Right Content (Glassmorphism Card) */}
//            <div className="relative h-[500px] flex items-center justify-center">
//                <motion.div 
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.8 }}
//                   className="relative z-10 w-full max-w-md"
//                >
//                    {/* Main Glass Card */}
//                    <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 shadow-2xl relative">
//                        <img src="src/assets/31670091-removebg-preview.png" alt="Veg Basket" className="w-full drop-shadow-2xl -mt-20 mb-4" />
                       
//                        <div className="space-y-4">
//                           <div className="flex justify-between items-center">
//                              <div>
//                                 <h3 className="text-2xl font-bold text-green-950">Organic Mix Box</h3>
//                                 <p className="text-green-800/60 text-sm">Includes 10+ Varieties</p>
//                              </div>
//                              <span className="text-2xl font-bold text-green-900">₹499</span>
//                           </div>
//                           <button className="w-full py-3 bg-green-900 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg">
//                              Add to Cart
//                           </button>
//                        </div>
//                    </div>

//                    {/* Floating Elements */}
//                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 right-0 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2">
//                        <div className="bg-green-100 p-2 rounded-full"><Leaf size={16} className="text-green-700"/></div>
//                        <span className="font-bold text-sm">100% Organic</span>
//                    </motion.div>

//                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-20 -left-6 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2">
//                        <div className="bg-yellow-100 p-2 rounded-full"><Star size={16} className="text-yellow-600" fill="currentColor"/></div>
//                        <span className="font-bold text-sm">4.9 Rating</span>
//                    </motion.div>
//                </motion.div>
//                {/* Background Glow */}
//                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl scale-75 pointer-events-none"></div>
//            </div>
//         </div>
//       </section>

//       {/* ================= NEW ABOUT SECTION (Modern & Clean) ================= */}
//       <section className="py-24 px-6">
//          <div className="max-w-7xl mx-auto">
//              <div className="grid lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-md rounded-[3rem] p-8 lg:p-12 border border-white/50 shadow-xl">
                 
//                  {/* Image Side */}
//                  <div className="relative order-2 lg:order-1">
//                      <div className="absolute inset-0 bg-green-900 rounded-[2.5rem] rotate-3 opacity-10"></div>
//                      <img 
//                         src="https://images.unsplash.com/photo-1595855709957-40e7318e49dc?w=800&auto=format&fit=crop" 
//                         alt="Farm" 
//                         className="relative rounded-[2.5rem] shadow-2xl border-4 border-white w-full h-[400px] object-cover rotate-[-3deg] hover:rotate-0 transition-transform duration-500" 
//                      />
//                      {/* Floating Badge */}
//                      <div className="absolute -bottom-6 right-6 bg-yellow-400 p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32">
//                          <span className="text-3xl font-black text-green-900">100%</span>
//                          <span className="text-xs font-bold uppercase text-green-900">Natural</span>
//                      </div>
//                  </div>

//                  {/* Text Content */}
//                  <div className="order-1 lg:order-2">
//                      <span className="text-green-700 font-bold uppercase tracking-wider text-sm">Our Story</span>
//                      <h2 className="text-4xl lg:text-5xl font-bold text-green-950 mt-2 mb-6">
//                          Farm to Fork, <br/> Without the Wait.
//                      </h2>
//                      <p className="text-lg text-green-900/80 mb-8 leading-relaxed">
//                          We believe good food shouldn't be complicated. That's why we partner directly with local organic farmers to bring you produce that is harvested at sunrise and delivered by sunset.
//                      </p>
                     
//                      <div className="space-y-4 mb-8">
//                          {[
//                              { title: "Direct from Farmers", desc: "Fair pay & zero middlemen." },
//                              { title: "Zero Pesticides", desc: "Lab tested for safety." },
//                              { title: "Eco-Friendly", desc: "Plastic-free biodegradable packaging." }
//                          ].map((item, i) => (
//                              <div key={i} className="flex items-start gap-4">
//                                  <div className="bg-white p-2 rounded-full shadow-sm text-green-700 mt-1">
//                                      <CheckCircle size={20} />
//                                  </div>
//                                  <div>
//                                      <h4 className="font-bold text-green-950 text-lg">{item.title}</h4>
//                                      <p className="text-green-900/60 text-sm">{item.desc}</p>
//                                  </div>
//                              </div>
//                          ))}
//                      </div>

//                      <Link to="/about" className="inline-block border-2 border-green-950 text-green-950 px-8 py-3 rounded-full font-bold hover:bg-green-950 hover:text-white transition-all">
//                          Read More About Us
//                      </Link>
//                  </div>
//              </div>
//          </div>
//       </section>

//       {/* ================= PRODUCT CAROUSEL (Clean Cards) ================= */}
//       <section className="py-20 px-6">
//          <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-end mb-8">
//                <h2 className="text-3xl font-bold text-green-950">Trending Now 🔥</h2>
//                <Link to="/vegetables" className="text-green-800 font-bold hover:underline flex items-center gap-1">View All <ArrowRight size={16}/></Link>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                {trendingProducts.map((product) => (
//                    <Link to="/vegetables" key={product.id} className="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-white/50 relative overflow-hidden">
                       
//                        {/* Image */}
//                        <div className={`h-48 ${product.color} rounded-2xl flex items-center justify-center mb-4 relative`}>
//                            <img src={product.img} className="w-32 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" alt={product.name}/>
//                            <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition shadow-sm hover:scale-110">
//                                <Heart size={16}/>
//                            </button>
//                        </div>
                       
//                        {/* Details */}
//                        <div>
//                            <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
//                            <div className="flex justify-between items-center mt-3">
//                                <p className="text-green-700 font-bold text-lg">₹{product.price}<span className="text-xs text-gray-400 font-normal">/kg</span></p>
//                                <button className="w-10 h-10 bg-green-950 text-white rounded-full flex items-center justify-center hover:bg-green-800 transition shadow-md group-hover:scale-110">
//                                    <ShoppingCart size={18}/>
//                                </button>
//                            </div>
//                        </div>
//                    </Link>
//                ))}
//             </div>
//          </div>
//       </section>

//       {/* ================= FEATURES GRID ================= */}
//       <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//               <h2 className="text-center text-3xl font-bold text-green-950 mb-12">Why Choose VEGPack?</h2>
//               <div className="grid md:grid-cols-3 gap-8">
//                   {[
//                       { title: "Farm Fresh", desc: "Harvested daily at 6 AM.", icon: <Leaf size={40} />, bg: "bg-green-900 text-white" },
//                       { title: "Fast Delivery", desc: "At your door by 6 PM.", icon: <Truck size={40} />, bg: "bg-white text-green-950" },
//                       { title: "Safe & Clean", desc: "Sanitized packaging.", icon: <ShieldCheck size={40} />, bg: "bg-yellow-400 text-green-950" }
//                   ].map((f, i) => (
//                       <motion.div 
//                         key={i}
//                         whileHover={{ y: -10 }}
//                         className={`${f.bg} p-8 rounded-[2.5rem] shadow-lg border border-transparent ${f.bg.includes("bg-white") ? "border-green-100" : ""}`}
//                       >
//                           <div className="mb-6">{f.icon}</div>
//                           <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
//                           <p className={`opacity-80 text-sm font-medium`}>{f.desc}</p>
//                       </motion.div>
//                   ))}
//               </div>
//           </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <div className="pt-10">
//          <ReviewsSection />
//          <Footer />
//       </div>

//       {/* ================= CHAT WIDGET ================= */}
//       <button onClick={() => setOpenChat(!openChat)} className="fixed bottom-6 right-6 w-14 h-14 bg-green-900 text-white rounded-full shadow-2xl z-50 hover:scale-110 transition-transform flex items-center justify-center border-4 border-green-200">
//         {openChat ? <X size={24} /> : <MessageCircle size={28} />}
//       </button>
      
//       {openChat && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-24 right-6 bg-white w-80 h-96 shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden flex flex-col">
//            <div className="bg-green-900 text-white p-4 flex justify-between items-center">
//               <span className="font-bold text-sm">Support</span>
//               <button onClick={() => setOpenChat(false)}><X size={18}/></button>
//            </div>
//            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
//               {chat.map((c, i) => (
//                  <div key={i} className={`p-3 text-sm rounded-xl max-w-[85%] ${c.from === "user" ? "bg-green-800 text-white ml-auto" : "bg-white border mr-auto"}`}>{c.text}</div>
//               ))}
//               <div ref={chatEndRef}></div>
//            </div>
//            <div className="p-3 border-t flex gap-2 bg-white">
//               <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none" placeholder="Message..." />
//               <button onClick={sendMessage} className="w-9 h-9 bg-green-900 rounded-full flex items-center justify-center text-white"><ArrowRight size={16}/></button>
//            </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Leaf, MessageCircle, X, ArrowRight, ShoppingCart, Star, Heart, Truck, ShieldCheck, Sparkles, CheckCircle, ArrowUpRight } from "lucide-react";
// import { motion } from "framer-motion";
// import ReviewsSection from "../components/ReviewsSection";
// import Footer from "../components/Footer";

// export default function Home() {
//   const [openChat, setOpenChat] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   // Mock Data
//   const trendingProducts = [
//     { id: 1, name: "Carrots", price: 40, img: "https://cdn-icons-png.flaticon.com/512/2909/2909808.png", bg: "bg-orange-100" },
//     { id: 2, name: "Broccoli", price: 60, img: "https://cdn-icons-png.flaticon.com/512/2909/2909787.png", bg: "bg-green-100" },
//     { id: 3, name: "Tomatoes", price: 25, img: "https://cdn-icons-png.flaticon.com/512/2909/2909841.png", bg: "bg-red-100" },
//     { id: 4, name: "Spinach", price: 30, img: "https://cdn-icons-png.flaticon.com/512/2909/2909832.png", bg: "bg-green-50" },
//     { id: 5, name: "Potatoes", price: 35, img: "https://cdn-icons-png.flaticon.com/512/2909/2909820.png", bg: "bg-yellow-100" },
//   ];

//   const sendMessage = async () => {
//     if (!msg.trim()) return;
//     setChat((prev) => [...prev, { from: "user", text: msg }]);
//     setMsg("");
//     setTimeout(() => setChat((prev) => [...prev, { from: "bot", text: "Checking availability..." }]), 1000);
//   };

//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <div className="font-sans min-h-screen  text-gray-900 overflow-x-hidden selection:bg-green-900 selection:text-white" >
      
//       {/* ================= HERO SECTION (Existing Code - Unchanged) ================= */}
//       <section className="relative   px-6" style={{backgroundColor:"#a6e4beff",marginTop:"70PX",paddingTop:"50PX",paddingBottom:"50PX"}}>
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center" style={{paddingLeft:"90PX",paddingRight:"70PX"}}>
//            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//               <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 mb-6 shadow-sm">
//                  <Sparkles size={14} className="text-yellow-600" fill="currentColor"/>
//                  <span className="text-xs font-bold text-green-900 uppercase tracking-wider">The Future of Freshness</span>
//               </div>
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-950 leading-[1.1] mb-6 tracking-tight">
//                  Nature's Best, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">Delivered Fresh.</span>
//               </h1>
//               <p className="text-lg text-green-900/70 mb-8 max-w-lg leading-relaxed font-medium">
//                  Skip the supermarket queue. We bring farm-harvested organic vegetables directly to your doorstep within 24 hours.
//               </p>
//               <div className="flex items-center gap-4">
//                  <Link to="/packages" className="bg-green-950 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
//                     Start Ordering <ArrowRight size={18}/>
//                  </Link>
//                  <Link to="/vegetables" className="bg-white/40 backdrop-blur-md border border-white text-green-950 px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
//                     View Products
//                  </Link>
//               </div>
             
//            </motion.div>
//            <div className="relative h-[500px] flex items-center justify-center">
//                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md">
                   
//                        <img src="src/assets/31670091-removebg-preview.png" alt="Veg Basket" className="w-full drop-shadow-2xl -mt-20 mb-4" />
                      
                  
                   
//                </motion.div>
               
//            </div>
//         </div>
//       </section>

//       {/* ================= ABOUT SECTION (Existing Code - Unchanged) ================= */}
//       <section className="py-24 px-6">
//          <div className="max-w-7xl mx-auto">
//              <div className="grid lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-md rounded-[3rem] p-8 lg:p-12 border border-white/50 shadow-xl">
//                  <div className="relative order-2 lg:order-1">
//                      <div className="absolute inset-0 bg-green-900 rounded-[2.5rem] rotate-3 opacity-10"></div>
//                      <img src="src/assets/Pasted image (2).png" alt="Farm" className="relative rounded-[2.5rem] shadow-2xl border-4 border-white w-full h-[400px] object-cover rotate-[-3deg] hover:rotate-0 transition-transform duration-500" />
//                      <div className="absolute -bottom-6 right-6 bg-yellow-400 p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32">
//                          <span className="text-3xl font-black text-green-900">100%</span><span className="text-xs font-bold uppercase text-green-900">Natural</span>
//                      </div>
//                  </div>
//                  <div className="order-1 lg:order-2">
//                      <span className="text-green-700 font-bold uppercase tracking-wider text-sm">Our Story</span>
//                      <h2 className="text-4xl lg:text-5xl font-bold text-green-950 mt-2 mb-6">Farm to Fork, <br/> Without the Wait.</h2>
//                      <p className="text-lg text-green-900/80 mb-8 leading-relaxed">We believe good food shouldn't be complicated. That's why we partner directly with local organic farmers.</p>
//                      <div className="space-y-4 mb-8">
//                          {[{ title: "Direct from Farmers", desc: "Fair pay & zero middlemen." }, { title: "Zero Pesticides", desc: "Lab tested for safety." }, { title: "Eco-Friendly", desc: "Plastic-free biodegradable packaging." }].map((item, i) => (
//                              <div key={i} className="flex items-start gap-4">
//                                  <div className="bg-white p-2 rounded-full shadow-sm text-green-700 mt-1"><CheckCircle size={20} /></div>
//                                  <div><h4 className="font-bold text-green-950 text-lg">{item.title}</h4><p className="text-green-900/60 text-sm">{item.desc}</p></div>
//                              </div>
//                          ))}
//                      </div>
//                      <Link to="/about" className="inline-block border-2 border-green-950 text-green-950 px-8 py-3 rounded-full font-bold hover:bg-green-950 hover:text-white transition-all">Read More About Us</Link>
//                  </div>
//              </div>
//          </div>
//       </section>

//       {/* ================= NEW: PRODUCT CAROUSEL (Minimal Vertical Tiles) ================= */}
//       <section className="py-20 px-6">
//          <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-end mb-12">
//                <div>
//                   <h2 className="text-4xl font-bold text-green-950">Fresh Arrivals</h2>
//                   <p className="text-green-900/60 mt-2 font-medium">Handpicked this morning.</p>
//                </div>
//                <Link to="/vegetables" className="group flex items-center gap-2 px-6 py-3 rounded-full border border-green-900 text-green-900 font-bold hover:bg-green-900 hover:text-white transition-all">
//                   View Catalog <ArrowUpRight size={18}/>
//                </Link>
//             </div>

//             {/* Horizontal Scroll Container */}
//             <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
//                {trendingProducts.map((product) => (
//                    <Link to="/vegetables" key={product.id} className="min-w-[260px] snap-center group relative">
//                        <div className={`h-[340px] ${product.bg} rounded-[2.5rem] p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-green-900/10`}>
                           
//                            <div className="flex justify-between items-start z-10">
//                                <span className="font-bold text-green-950 text-xl">₹{product.price}</span>
//                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-950 hover:bg-green-950 hover:text-white transition shadow-sm"><ShoppingCart size={18}/></button>
//                            </div>

//                            <img src={product.img} className="w-44 self-center drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 z-10" alt={product.name}/>

//                            <div className="z-10">
//                                <p className="text-xs font-bold uppercase text-green-800/50 mb-1 tracking-wider">Vegetable</p>
//                                <h3 className="text-2xl font-black text-green-950 leading-none">{product.name}</h3>
//                            </div>
                           
//                            {/* Decorative Background Circle */}
//                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
//                        </div>
//                    </Link>
//                ))}
//             </div>
//          </div>
//       </section>

//       {/* ================= NEW: FEATURES (Timeline Style) ================= */}
//       <section className="py-24 px-6">
//           <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              
//               {/* Text Content */}
//               <div>
//                   <h2 className="text-5xl font-bold text-green-950 mb-6">We are Farmers,<br/>Not Traders.</h2>
//                   <p className="text-xl text-green-900/80 font-medium mb-10 leading-relaxed">
//                       Unlike grocery apps that store vegetables in warehouses for days, we follow a <span className="text-green-950 underline decoration-yellow-400 decoration-4">Zero-Inventory Model</span>.
//                   </p>
                  
//                   <div className="space-y-8 relative">
//                       {/* Vertical Line */}
//                       <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-900/20"></div>

//                       <div className="flex gap-6 relative">
//                           <div className="w-12 h-12 bg-green-900 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">1</div>
//                           <div>
//                               <h4 className="text-xl font-bold text-green-950">You Order</h4>
//                               <p className="text-green-900/60">Browse fresh produce and place your order.</p>
//                           </div>
//                       </div>
//                       <div className="flex gap-6 relative">
//                           <div className="w-12 h-12 bg-white text-green-900 border-2 border-green-900 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">2</div>
//                           <div>
//                               <h4 className="text-xl font-bold text-green-950">We Harvest</h4>
//                               <p className="text-green-900/60">Farmers harvest exactly what is ordered.</p>
//                           </div>
//                       </div>
//                       <div className="flex gap-6 relative">
//                           <div className="w-12 h-12 bg-yellow-400 text-green-900 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg z-10">3</div>
//                           <div>
//                               <h4 className="text-xl font-bold text-green-950">Delivered</h4>
//                               <p className="text-green-900/60">Straight to your door within hours.</p>
//                           </div>
//                       </div>
//                   </div>
//               </div>

//               {/* Image Feature */}
//               <div className="relative">
//                   <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop" className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white w-full h-[500px] object-cover" alt="Farmer"/>
                  
//                   <div className="absolute bottom-10 -left-10 bg-green-950 text-white p-8 rounded-[2rem] shadow-xl max-w-[240px]">
//                       <div className="text-yellow-400 mb-2"><Star fill="currentColor" size={20}/></div>
//                       <p className="font-bold text-lg leading-tight">"We ensure fair prices for every farmer."</p>
//                   </div>
//               </div>

//           </div>
//       </section>

//       {/* ================= REVIEWS & FOOTER ================= */}
//       <div className="pt-10 border-t border-green-900/10 mt-10">
//          <ReviewsSection />
         
//       </div>

//       {/* ================= CHAT WIDGET ================= */}
//       <button onClick={() => setOpenChat(!openChat)} className="fixed bottom-8 right-8 w-16 h-16 bg-green-950 text-white rounded-full shadow-2xl z-50 hover:scale-110 transition-transform flex items-center justify-center border-4 border-green-200">
//         {openChat ? <X size={28} /> : <MessageCircle size={32} />}
//       </button>
      
//       {openChat && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-28 right-8 bg-white w-80 h-96 shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden flex flex-col">
//            <div className="bg-green-950 text-white p-4 flex justify-between items-center">
//               <span className="font-bold text-sm">Support</span>
//               <button onClick={() => setOpenChat(false)}><X size={18}/></button>
//            </div>
//            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
//               {chat.map((c, i) => (
//                  <div key={i} className={`p-3 text-sm rounded-xl max-w-[85%] ${c.from === "user" ? "bg-green-800 text-white ml-auto" : "bg-white border mr-auto"}`}>{c.text}</div>
//               ))}
//               <div ref={chatEndRef}></div>
//            </div>
//            <div className="p-3 border-t flex gap-2 bg-white">
//               <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none" placeholder="Message..." />
//               <button onClick={sendMessage} className="w-9 h-9 bg-green-900 rounded-full flex items-center justify-center text-white"><ArrowRight size={16}/></button>
//            </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

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
  Truck,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import ReviewsSection from "../components/ReviewsSection";
import Footer from "../components/Footer";
import about1 from "../assets/about1.jpg"


// 5 images for ABOUT carousel (replace URLs with your own if needed)
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

  // Mock Data for Fresh Arrivals
  const trendingProducts = [
    {
      id: 1,
      name: "Carrots",
      price: 40,
      img: "https://cdn-icons-png.flaticon.com/512/2909/2909808.png",
      bg: "bg-orange-100",
    },
    {
      id: 2,
      name: "Broccoli",
      price: 60,
      img: "https://cdn-icons-png.flaticon.com/512/2909/2909787.png",
      bg: "bg-green-100",
    },
    {
      id: 3,
      name: "Tomatoes",
      price: 25,
      img: "https://cdn-icons-png.flaticon.com/512/2909/2909841.png",
      bg: "bg-red-100",
    },
    {
      id: 4,
      name: "Spinach",
      price: 30,
      img: "https://cdn-icons-png.flaticon.com/512/2909/2909832.png",
      bg: "bg-green-50",
    },
    {
      id: 5,
      name: "Potatoes",
      price: 35,
      img: "https://cdn-icons-png.flaticon.com/512/2909/2909820.png",
      bg: "bg-yellow-100",
    },
  ];

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

  // scroll chat to last message
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // auto-slide about images (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans min-h-screen text-gray-900 overflow-x-hidden selection:bg-green-900 selection:text-white" style={{backgroundColor:"#e3f1e5ff"}}>
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative px-6"
        style={{
          backgroundColor: "#a6e4beff",
          marginTop: "70px",
          paddingTop: "80px",
          paddingBottom: "50px",
          marginLeft:"50px",
          marginRight:"50px",borderRadius:"20px"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">
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
        <div className="max-w-7xl " style={{width:"1800px",marginLeft:"150px"}}>
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-md rounded-[3rem] p-8 lg:p-12  shadow-xl" style={{width:"1500px"}}>
            {/* LEFT: Image Carousel */}
            <div className="relative order-2 lg:order-1">
              {/* bg shadow */}
              <div className="absolute inset-0 bg-green-900 rounded-[2.5rem] rotate-3 opacity-10" />

              <div className="relative rounded-[2.5rem] shadow-2xl border-4 border-white w-full h-[400px] overflow-hidden">
                <img
                  src={aboutImages[aboutIndex]}
                  alt={`Farm ${aboutIndex + 1}`}
                  className=" object-cover transition-transform duration-700 hover:scale-[1.03]" style={{width:"800px",height:"500px"}}
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
                  {
                    title: "Direct from Farmers",
                    desc: "Fair pay & zero middlemen.",
                  },
                  {
                    title: "Zero Pesticides",
                    desc: "Lab tested for safety.",
                  },
                  {
                    title: "Eco-Friendly",
                    desc: "Plastic-free biodegradable packaging.",
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

      {/* ================= FRESH ARRIVALS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-green-950">
                Fresh Arrivals
              </h2>
              <p className="text-green-900/60 mt-2 font-medium">
                Handpicked this morning.
              </p>
            </div>
            <Link
              to="/vegetables"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-green-900 text-green-900 font-bold hover:bg-green-900 hover:text-white transition-all"
            >
              View Catalog <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
            {trendingProducts.map((product) => (
              <Link
                to="/vegetables"
                key={product.id}
                className="min-w-[260px] snap-center group relative"
              >
                <div
                  className={`h-[340px] ${product.bg} rounded-[2.5rem] p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-green-900/10`}
                >
                  <div className="flex justify-between items-start z-10">
                    <span className="font-bold text-green-950 text-xl">
                      ₹{product.price}
                    </span>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-950 hover:bg-green-950 hover:text-white transition shadow-sm">
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  <img
                    src={product.img}
                    className="w-44 self-center drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 z-10"
                    alt={product.name}
                  />

                  <div className="z-10">
                    <p className="text-xs font-bold uppercase text-green-800/50 mb-1 tracking-wider">
                      Vegetable
                    </p>
                    <h3 className="text-2xl font-black text-green-950 leading-none">
                      {product.name}
                    </h3>
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE / PROCESS ================= */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-bold text-green-950 mb-6">
              We are Farmers,
              <br />
              Not Traders.
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
      <div className="pt-10 border-t border-green-900/10 mt-10">
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