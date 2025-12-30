

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const DELIVERY_OPTIONS = [
//   { value: "Weekly - 2 times", label: "Weekly (2 times)" },
//   { value: "Weekly - 3 times", label: "Weekly (3 times)" },
//   { value: "Monthly - 4 times", label: "Monthly (4 times)" },
//   { value: "Monthly - 6 times", label: "Monthly (6 times)" },
//   { value: "Monthly - 8 times", label: "Monthly (8 times)" },
// ];

// export default function CustomerDetails() {
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     district: "",
//     landmark: "Home", // radio default
//     deliveryDate: "",
//     deliveryOption: DELIVERY_OPTIONS[0].value, // default Weekly - 2 times
//   });

//   const [error, setError] = useState("");

//   // Load from localStorage if already filled
//   useEffect(() => {
//     const savedDetails = localStorage.getItem("customerDetails");
//     if (savedDetails) {
//       try {
//         const parsed = JSON.parse(savedDetails);
//         setCustomer((prev) => ({
//           ...prev,
//           ...parsed,
//         }));
//       } catch {
//         // ignore parse error
//       }
//     }
//   }, []);

//   // Generic handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleSubmit = () => {
//     if (
//       !customer.name.trim() ||
//       !customer.phone.trim() ||
//       !customer.address.trim() ||
//       !customer.district.trim() ||
//       !customer.deliveryDate
//     ) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     localStorage.setItem("customerDetails", JSON.stringify(customer));
//     navigate("/checkout");
//   };

//   return (
//     <div className=" bg-[#86C18F] flex items-center justify-center py-10 px-4" style={{paddingTop:"50px",paddingBottom:"50px",width:"800px",marginLeft:"550px"}}>
//       <div
//         className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
//         style={{ marginTop: "60px" }}
//       >
//         {/* Inner green container */}
//         <div
//           className="m-4 bg-[#D4EFD6] rounded-2xl p-6 md:p-8 space-y-6"
//           style={{ padding: "40px" }}
//         >
//           {/* Error */}
//           {error && (
//             <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
//           )}

//           {/* ========== INFORMATION ========== */}
//           <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
//             <h2 className="text-xl md:text-2xl font-semibold text-[#2B6C2C] mb-4">
//               Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={customer.name}
//                   onChange={handleChange}
//                   className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={customer.phone}
//                   onChange={handleChange}
//                   className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* ========== ADDRESS DETAILS ========== */}
//           <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
//             <h2 className="text-xl md:text-2xl font-semibold text-[#2B6C2C] mb-4">
//               Address Details
//             </h2>

//             {/* Delivery Address */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Delivery Address
//               </label>
//               <textarea
//                 name="address"
//                 value={customer.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 resize-none"
//               />
//             </div>

//             {/* District */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 District
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 value={customer.district}
//                 onChange={handleChange}
//                 className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             {/* Landmark radios */}
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-1">
//                 Landmark (optional)
//               </p>
//               <div className="flex flex-wrap gap-4 text-sm text-gray-700">
//                 {["Home", "Shop", "Temple", "Restaurant", "Other"].map(
//                   (label) => (
//                     <label
//                       key={label}
//                       className="inline-flex items-center gap-1 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name="landmark"
//                         value={label}
//                         checked={customer.landmark === label}
//                         onChange={handleChange}
//                         className="accent-green-600"
//                       />
//                       <span>{label}</span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* ========== DELIVERY INFO ========== */}
//           <section className="bg-[#E6F3E6] rounded-xl p-4 md:p-6 border border-[#C5E0C5]">
//             <div className="space-y-4">
//               {/* Delivery Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Date
//                 </label>
//                 <input
//                   type="date"
//                   name="deliveryDate"
//                   value={customer.deliveryDate}
//                   onChange={handleChange}
//                   className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               {/* Delivery Option */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Option
//                 </label>
//                 <select
//                   name="deliveryOption"
//                   value={customer.deliveryOption}
//                   onChange={handleChange}
//                   className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   {DELIVERY_OPTIONS.map((opt) => (
//                     <option key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </section>

//           {/* Save Button */}
//           <div className="flex justify-center pt-2">
//             <button
//               onClick={handleSubmit}
//               className="bg-[#218838] text-black px-10 py-2 rounded-xl shadow-md hover:bg-[#1b6f30] transition-colors font-semibold" style={{width:"100px",fontSize:"20px"}}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/CustomerDetails.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const DELIVERY_OPTIONS = [
  { value: "Weekly - 2 times", label: "Weekly (2 times)" },
  { value: "Weekly - 3 times", label: "Weekly (3 times)" },
  { value: "Monthly - 4 times", label: "Monthly (4 times)" },
  { value: "Monthly - 6 times", label: "Monthly (6 times)" },
  { value: "Monthly - 8 times", label: "Monthly (8 times)" },
];

export default function CustomerDetails() {
  const navigate = useNavigate();
  const { user } = useAuth(); // 🔑 current user

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    landmark: "Home", // radio default
    deliveryDate: "",
    deliveryOption: DELIVERY_OPTIONS[0].value,
  });
  const [error, setError] = useState("");

  // per‑user storage key
  const storageKey = user ? `customerDetails_${user._id}` : null;

  // FIRST LOAD – இந்த user க்கு already save பண்ணி இருந்தா load பண்ணு
  useEffect(() => {
    if (!storageKey) return;

    const savedDetails = localStorage.getItem(storageKey);
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
  }, [storageKey]);

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

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(customer));
    }

    navigate("/checkout");
  };

  return (
    <div
      className=" bg-[#86C18F] flex items-center justify-center py-10 px-4"
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
        width: "800px",
        marginLeft: "550px",
      }}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ marginTop: "60px" }}
      >
        <div
          className="m-4 bg-[#D4EFD6] rounded-2xl p-6 md:p-8 space-y-6"
          style={{ padding: "40px" }}
        >
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

          <div className="flex justify-center pt-2">
            <button
              onClick={handleSubmit}
              className="bg-[#218838] text-black px-10 py-2 rounded-xl shadow-md hover:bg-[#1b6f30] transition-colors font-semibold"
              style={{ width: "100px", fontSize: "20px" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}