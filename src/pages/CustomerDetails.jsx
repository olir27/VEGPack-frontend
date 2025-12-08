// // src/pages/CustomerDetails.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDetails() {
//   const [address, setAddress] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const saved = localStorage.getItem("deliveryAddress");
//     if (saved) setAddress(saved);
//   }, []);

//   const handleSave = () => {
//     if (!address.trim()) {
//       alert("Please enter address");
//       return;
//     }

//     localStorage.setItem("deliveryAddress", address);
//     navigate("/checkout");
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-green-800 mb-4">Delivery Address</h2>

//       <textarea
//         className="w-full border p-3 rounded"
//         rows={5}
//         placeholder="Enter full delivery address..."
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />

//       <div className="mt-4 flex gap-3">
//         <button
//           onClick={handleSave}
//           className="bg-green-600 text-white px-5 py-2 rounded"
//         >
//           Save Address
//         </button>

//         <button
//           onClick={() => navigate("/checkout")}
//           className="bg-gray-200 px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/CustomerDetails.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// export default function CustomerDetails() {
//   const navigate = useNavigate();
//   const { token } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     landmark: "",
//     deliveryOption: "Home Delivery",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();

//     if (!form.name || !form.phone || !form.address) {
//       setError("Name, Phone and Address are required.");
//       return;
//     }

//     // Save to localStorage
//     localStorage.setItem("customerDetails", JSON.stringify(form));

//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Customer Details</h2>

//         {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

//         <form className="flex flex-col gap-3" onSubmit={handleSave}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email (Optional)"
//             value={form.email}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <textarea
//             name="address"
//             placeholder="Delivery Address"
//             value={form.address}
//             onChange={handleChange}
//             className="border p-2 rounded h-24"
//           ></textarea>

//           <input
//             type="text"
//             name="landmark"
//             placeholder="Landmark (Optional)"
//             value={form.landmark}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <select
//             name="deliveryOption"
//             value={form.deliveryOption}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Home Delivery">Home Delivery</option>
//             <option value="Shop Pickup">Shop Pickup</option>
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 mt-3"
//           >
//             Save & Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDetails() {
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     landmark: "",
//     deliveryOption: "Home Delivery",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Name, phone and address are required.");
//       return;
//     }

//     localStorage.setItem("customerDetails", JSON.stringify(customer));
//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         <div className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="name"
//             value={customer.name}
//             onChange={handleChange}
//             placeholder="Full Name *"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             value={customer.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={customer.phone}
//             onChange={handleChange}
//             placeholder="Phone Number *"
//             className="border p-2 rounded w-full"
//           />
//           <textarea
//             name="address"
//             value={customer.address}
//             onChange={handleChange}
//             placeholder="Delivery Address *"
//             className="border p-2 rounded w-full resize-none"
//           />
//           <input
//             type="text"
//             name="landmark"
//             value={customer.landmark}
//             onChange={handleChange}
//             placeholder="Landmark (Optional)"
//             className="border p-2 rounded w-full"
//           />

//           <select
//             name="deliveryOption"
//             value={customer.deliveryOption}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option>Home Delivery</option>
//             <option>Pickup from Shop</option>
//           </select>

//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-2 font-semibold"
//           >
//             Save & Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDetails() {
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     landmark: "",
//     deliveryOption: "Home Delivery",
//   });

//   const [error, setError] = useState("");

//   // Load existing customer details from localStorage
//   useEffect(() => {
//     const savedDetails = localStorage.getItem("customerDetails");
//     if (savedDetails) {
//       setCustomer(JSON.parse(savedDetails));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!customer.name || !customer.phone || !customer.address) {
//       setError("Name, phone and address are required.");
//       return;
//     }

//     // Save to localStorage
//     localStorage.setItem("customerDetails", JSON.stringify(customer));

//     // Redirect to checkout
//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         <div className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="name"
//             value={customer.name}
//             onChange={handleChange}
//             placeholder="Full Name *"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             value={customer.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={customer.phone}
//             onChange={handleChange}
//             placeholder="Phone Number *"
//             className="border p-2 rounded w-full"
//           />
//           <textarea
//             name="address"
//             value={customer.address}
//             onChange={handleChange}
//             placeholder="Delivery Address *"
//             className="border p-2 rounded w-full resize-none"
//           />
//           <input
//             type="text"
//             name="landmark"
//             value={customer.landmark}
//             onChange={handleChange}
//             placeholder="Landmark (Optional)"
//             className="border p-2 rounded w-full"
//           />

//           <select
//             name="deliveryOption"
//             value={customer.deliveryOption}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option>Home Delivery</option>
//             <option>Pickup from Shop</option>
//           </select>

//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-2 font-semibold"
//           >
//             Save & Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDetails() {
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     landmark: "Home",
//     district: "",
//     deliveryDate: "",
//     deliveryOption: "Home Delivery",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const savedDetails = localStorage.getItem("customerDetails");
//     if (savedDetails) {
//       setCustomer(JSON.parse(savedDetails));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!customer.name || !customer.phone || !customer.address || !customer.district || !customer.deliveryDate) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     localStorage.setItem("customerDetails", JSON.stringify(customer));
//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow rounded-lg p-6 w-full max-w-lg flex flex-col gap-4">
//         <h2 className="text-2xl font-bold mb-4 text-center">Customer Details</h2>
//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         {/* Box 1: Name & Phone */}
//         <div className="border p-4 rounded-lg flex flex-col gap-3">
//           <h3 className="font-semibold text-lg">Personal Info</h3>
//           <input
//             type="text"
//             name="name"
//             value={customer.name}
//             onChange={handleChange}
//             placeholder="Full Name *"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={customer.phone}
//             onChange={handleChange}
//             placeholder="Phone Number *"
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         {/* Box 2: Delivery Address & Landmark */}
//         <div className="border p-4 rounded-lg flex flex-col gap-3">
//           <h3 className="font-semibold text-lg">Delivery Address</h3>
//           <input
//             type="text"
//             name="district"
//             value={customer.district}
//             onChange={handleChange}
//             placeholder="District *"
//             className="border p-2 rounded w-full"
//           />
//           <textarea
//             name="address"
//             value={customer.address}
//             onChange={handleChange}
//             placeholder="Address *"
//             className="border p-2 rounded w-full resize-none"
//           />
//           <select
//             name="landmark"
//             value={customer.landmark}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option>Home</option>
//             <option>Shop</option>
//             <option>Temple</option>
//             <option>Restaurant</option>
//             <option>Other</option>
//           </select>
//         </div>

//         {/* Box 3: Delivery Date & Option */}
//         <div className="border p-4 rounded-lg flex flex-col gap-3">
//           <h3 className="font-semibold text-lg">Delivery Info</h3>
//           <input
//             type="date"
//             name="deliveryDate"
//             value={customer.deliveryDate}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           />
//           <select
//             name="deliveryOption"
//             value={customer.deliveryOption}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option>Weekly</option>
//             <option>Monthly</option>
//           </select>
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-2 font-semibold"
//         >
//           Save & Continue
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DELIVERY_OPTIONS = [
  { value: "Weekly - 2 times", label: "Weekly (2 times)" },
  { value: "Weekly - 3 times", label: "Weekly (3 times)" },
  { value: "Monthly - 4 times", label: "Monthly (4 times)" },
  { value: "Monthly - 6 times", label: "Monthly (6 times)" },
  { value: "Monthly - 8 times", label: "Monthly (8 times)" },
];

export default function CustomerDetails() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    landmark: "Home", // radio default
    deliveryDate: "",
    deliveryOption: DELIVERY_OPTIONS[0].value, // default Weekly - 2 times
  });

  const [error, setError] = useState("");

  // Load from localStorage if already filled
  useEffect(() => {
    const savedDetails = localStorage.getItem("customerDetails");
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails);
        setCustomer((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = () => {
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.district.trim() ||
      !customer.deliveryDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    localStorage.setItem("customerDetails", JSON.stringify(customer));
    navigate("/checkout");
  };

  return (
    <div className=" bg-[#86C18F] flex items-center justify-center py-10 px-4" style={{paddingTop:"50px",paddingBottom:"50px",width:"800px",marginLeft:"550px"}}>
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ marginTop: "60px" }}
      >
        {/* Inner green container */}
        <div
          className="m-4 bg-[#D4EFD6] rounded-2xl p-6 md:p-8 space-y-6"
          style={{ padding: "40px" }}
        >
          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
          )}

          {/* ========== INFORMATION ========== */}
          <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2B6C2C] mb-4">
              Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {/* ========== ADDRESS DETAILS ========== */}
          <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2B6C2C] mb-4">
              Address Details
            </h2>

            {/* Delivery Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                name="address"
                value={customer.address}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            {/* District */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={customer.district}
                onChange={handleChange}
                className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Landmark radios */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Landmark (optional)
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                {["Home", "Shop", "Temple", "Restaurant", "Other"].map(
                  (label) => (
                    <label
                      key={label}
                      className="inline-flex items-center gap-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="landmark"
                        value={label}
                        checked={customer.landmark === label}
                        onChange={handleChange}
                        className="accent-green-600"
                      />
                      <span>{label}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </section>

          {/* ========== DELIVERY INFO ========== */}
          <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
            <div className="space-y-4">
              {/* Delivery Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={customer.deliveryDate}
                  onChange={handleChange}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Delivery Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Option
                </label>
                <select
                  name="deliveryOption"
                  value={customer.deliveryOption}
                  onChange={handleChange}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                >
                  {DELIVERY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleSubmit}
              className="bg-[#218838] text-black px-10 py-2 rounded-xl shadow-md hover:bg-[#1b6f30] transition-colors font-semibold" style={{width:"100px",fontSize:"20px"}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}