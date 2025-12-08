// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Components
// import Navbar from "./components/Navbar";

// // Pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOtp from "./pages/VerifyOtp";
// import ResetPassword from "./pages/ResetPassword";
// import VegetablesPage from "./pages/VegetablesPage"; 
// import VegetableDetail from "./pages/VegetablesDetails";
// import PackagesPage from "./pages/packages";
// import PackageDetail from "./pages/PackageDetail";
// import CartPage from "./pages/card";
// import Profile from "./pages/profile";
// import Checkout from "./pages/Checkout";
// import CustomerDetails from "./pages/CustomerDetails";
// import PaymentMethod from "./pages/PaymentMethod";
// import OrderSuccess from "./pages/OrderSuccess";
// import CardPayment from "./pages/CardPayment";
// import ConfirmOrder from "./pages/ConfirmOrder";

// // Auth
// import { useAuth } from "./AuthContext";

// export default function App() {
//   const { isLoggedIn, loading } = useAuth();

//   // 🟢 Prevent incorrect redirects while AuthContext loads
//   if (loading) return null;

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />

//         <Routes>

//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset" element={<ResetPassword />} />

//           {/* VEGETABLES */}
//           <Route path="/vegetables" element={<VegetablesPage />} />
//           <Route path="/vegetable/:id" element={<VegetableDetail />} />

//           {/* PACKAGES */}
//           <Route path="/packages" element={<PackagesPage />} />
//           <Route
//             path="/package/:id"
//             element={isLoggedIn ? <PackageDetail /> : <Navigate to="/login" />}
//           />

//           {/* CART */}
//           <Route path="/cart" element={<CartPage /> }/>
          

//           {/* CHECKOUT */}
//           <Route
//             path="/checkout"
//             element={ <Checkout />}/>
//           <Route
//             path="/customer-details"
//             element={isLoggedIn ? <CustomerDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <PaymentMethod /> : <Navigate to="/login" />}
//           />

//           <Route path="/order-success" element={<OrderSuccess />} />
//           <Route path="/card-payment" element={<CardPayment />} />
//           <Route path="/confirm-order" element={<ConfirmOrder />} />

//           {/* PROFILE */}
//           <Route
//             path="/profile"
//             element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//           />

//           {/* DEFAULT REDIRECT */}
//           <Route path="*" element={<Navigate to="/" />} />

//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }



// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Components
// import Navbar from "./components/Navbar";

// // Pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOtp from "./pages/VerifyOtp";
// import ResetPassword from "./pages/ResetPassword";
// import VegetablesPage from "./pages/VegetablesPage"; 
// import VegetableDetail from "./pages/VegetablesDetails";
// import PackagesPage from "./pages/packages";
// import PackageDetail from "./pages/PackageDetail";
// import CartPage from "./pages/card";
// import Profile from "./pages/profile";
// import Checkout from "./pages/Checkout";
// import CustomerDetails from "./pages/CustomerDetails";

// import OrderSuccess from "./pages/OrderSuccess";
// import CardPayment from "./pages/CardPayment";
// import ConfirmOrder from "./pages/ConfirmOrder";
// import FarmerPage from "./pages/farmers";

// // Auth
// import { useAuth } from "./AuthContext";


// // Initialize Stripe (use your **publishable key**)
// const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

// export default function App() {
//   const { isLoggedIn, loading } = useAuth();

//   if (loading) return null;

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />

//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset" element={<ResetPassword />} />
//           <Route path="/farmer" element={<FarmerPage/>}/>

//           {/* VEGETABLES */}
//           <Route path="/vegetables" element={<VegetablesPage />} />
//           <Route path="/vegetable/:id" element={<VegetableDetail />} />

//           {/* PACKAGES */}
//           <Route path="/packages" element={<PackagesPage />} />
//           <Route
//             path="/package/:id"
//             element={isLoggedIn ? <PackageDetail /> : <Navigate to="/login" />}
//           />

//           {/* CART */}
//           <Route path="/cart" element={<CartPage />} />

//           {/* CHECKOUT */}
//           <Route path="/checkout" element={<Checkout />} />
//           <Route
//             path="/customer-details"
//             element={isLoggedIn ? <CustomerDetails /> : <Navigate to="/login" />}
//           />
        

//           {/* STRIPE CARD PAYMENT */}
//           <Route
//             path="/card-payment"
//             element={
//               <Elements stripe={stripePromise}>
//                 <CardPayment />
//               </Elements>
//             }
//           />

//           {/* COD CONFIRMATION */}
//           <Route path="/confirm-order" element={<ConfirmOrder />} />

//           {/* ORDER SUCCESS */}
//           <Route path="/order-success" element={<OrderSuccess />} />

//           {/* PROFILE */}
//           <Route
//             path="/profile"
//             element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//           />

//           {/* DEFAULT REDIRECT */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }



// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Components
// import Navbar from "./components/Navbar";

// // Pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOtp from "./pages/VerifyOtp";
// import ResetPassword from "./pages/ResetPassword";
// import VegetablesPage from "./pages/VegetablesPage"; 
// import VegetableDetail from "./pages/VegetablesDetails";
// import PackagesPage from "./pages/packages";
// import PackageDetail from "./pages/PackageDetail";
// import CartPage from "./pages/card";
// import Profile from "./pages/profile";
// import Checkout from "./pages/Checkout";
// import CustomerDetails from "./pages/CustomerDetails";
// import OrderSuccess from "./pages/OrderSuccess";
// import CardPayment from "./pages/CardPayment";
// import ConfirmOrder from "./pages/ConfirmOrder";
// import FarmersPage from "./pages/farmers";
// import AdminDashboard from "./pages/AdminDashboard";
// // import FarmerDashboard from "./pages/FarmerDashboard"; // Protected farmer dashboard
// // import FarmerProducts from "./pages/FarmerProducts"; // Optional: view farmer's products

// // Auth
// import { useAuth } from "./AuthContext";


// // Initialize Stripe
// const stripePromise = loadStripe("pk_test_51SNsYS8HwuBN6APZAFuN4dPp2nX32fKlQfKz7gFB9FqwpFU0KeZ8xzWML0KAHFkD9JEck3jIcF90dIgF9WWjKIHG005iTzMMmh");

// export default function App() {
//   const { isLoggedIn, loading, user } = useAuth();

//   if (loading) return null; // Wait until auth is loaded

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />

//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset" element={<ResetPassword />} />
//           <Route path="/admin" element={<AdminDashboard/>}/>

//           {/* FARMERS */}
//           <Route path="/farmer" element={<FarmersPage />} />
//           {/* <Route
//             path="/farmer/dashboard"
//             element={
//               isLoggedIn && user?.role === "farmer" ? (
//                 <FarmerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           /> */}
//           {/* <Route path="/farmers/:id/products" element={<FarmerProducts />} /> */}

//           {/* VEGETABLES */}
//           <Route path="/vegetables" element={<VegetablesPage />} />
//           <Route path="/vegetable/:id" element={<VegetableDetail />} />

//           {/* PACKAGES */}
//           <Route path="/packages" element={<PackagesPage />} />
//           <Route
//             path="/package/:id"
//             element={isLoggedIn ? <PackageDetail /> : <Navigate to="/login" />}
//           />

//           {/* CART */}
//           <Route path="/cart" element={<CartPage />} />

//           {/* CHECKOUT */}
//           <Route path="/checkout" element={<Checkout />} />
//           <Route
//             path="/customer-details"
//             element={isLoggedIn ? <CustomerDetails /> : <Navigate to="/login" />}
//           />

//           {/* STRIPE CARD PAYMENT */}
//           <Route
//             path="/card-payment"
//             element={
//               <Elements stripe={stripePromise}>
//                 <CardPayment />
//               </Elements>
//             }
//           />

//           {/* COD CONFIRMATION */}
//           <Route path="/confirm-order" element={<ConfirmOrder />} />

//           {/* ORDER SUCCESS */}
//           <Route path="/order-success" element={<OrderSuccess />} />

//           {/* PROFILE */}
//           <Route
//             path="/profile"
//             element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//           />

//           {/* DEFAULT REDIRECT */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import VegetablesPage from "./pages/VegetablesPage";
import VegetableDetail from "./pages/VegetablesDetails";
import PackagesPage from "./pages/packages";
import PackageDetail from "./pages/PackageDetail";
import CartPage from "./pages/card";
import Profile from "./pages/profile";
import Checkout from "./pages/Checkout";
import CustomerDetails from "./pages/CustomerDetails";
import OrderSuccess from "./pages/OrderSuccess";
import CardPayment from "./pages/CardPayment";
import ConfirmOrder from "./pages/ConfirmOrder";
import FarmersPage from "./pages/farmersDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import RegisterFarmer from "./pages/RegisterFarmer";
import { useAuth } from "./AuthContext";
import Farmer from "./pages/farmersDashboard";
import FarmerDashboard from "./pages/farmersDashboard";
import Footer from "./components/Footer";

// ✅ Stripe Publishable Key (frontend safe)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51SNsYS8HwuBN6APZAFuN4dPp2nX32fKlQfKz7gFB9FqwpFU0KeZ8xzWML0KAHFkD9JEck3jIcF90dIgF9WWjKIHG005iTzMMmh"
);

export default function App() {
  const { isLoggedIn, loading, user } = useAuth();

  if (loading) return null; // Wait until auth is loaded

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-200">
        <Navbar />
        

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/register-farmer" element={<RegisterFarmer />} /> 
          {/* <Route path="/farmer-dashboard" element={<FarmerDashboard />} /> */}
          <Route path="/farmer-dashboard" element={isLoggedIn && user?.role === "farmer"? <FarmerDashboard />: <Navigate to="/login" />}/>
          
          <Route path="/admin" element={isLoggedIn && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}/>

          {/* FARMERS */}
        
          {/* Add protected farmer routes if needed */}

          {/* VEGETABLES */}
          <Route path="/vegetables" element={<VegetablesPage />} />
          <Route path="/vegetable/:id" element={<VegetableDetail />} />

          {/* PACKAGES */}
          <Route path="/packages" element={<PackagesPage />} />
          <Route
            path="/package/:id"
            element={isLoggedIn ? <PackageDetail /> : <Navigate to="/login" />}
          />

          {/* CART */}
          <Route path="/cart" element={<CartPage />} />

          {/* CHECKOUT */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
/>
          <Route
            path="/customer-details"
            element={isLoggedIn ? <CustomerDetails /> : <Navigate to="/login" />}
          />

          {/* STRIPE CARD PAYMENT */}
         
          {/* COD CONFIRMATION */}
          <Route path="/confirm-order" element={<ConfirmOrder />} />

          {/* ORDER SUCCESS */}
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />

          {/* DEFAULT REDIRECT */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

// ...

// export default function App() {
//   const { isLoggedIn, loading, user } = useAuth();

//   if (loading) return null;

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-200">
//         <Navbar />

//         <Routes>
//           {/* PUBLIC */}
//           <Route path="/" element={<Home />} />

//           {/* If logged in → redirect away */}
//           <Route
//             path="/register"
//             element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/login"
//             element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/register-farmer"
//             element={!isLoggedIn ? <RegisterFarmer /> : <Navigate to="/" />}
//           />

//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset" element={<ResetPassword />} />

//           {/* Farmer/Admin guarded */}
//           <Route
//             path="/farmer-dashboard"
//             element={
//               isLoggedIn && user?.role === "farmer" ? (
//                 <FarmerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isLoggedIn && user?.role === "admin" ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* Products */}
//           <Route path="/vegetables" element={<VegetablesPage />} />
//           <Route path="/vegetable/:id" element={<VegetableDetail />} />

//           <Route path="/packages" element={<PackagesPage />} />
//           <Route
//             path="/package/:id"
//             element={isLoggedIn ? <PackageDetail /> : <Navigate to="/login" />}
//           />

//           {/* Cart / Checkout */}
//           <Route path="/cart" element={<CartPage />} />
//           <Route
//             path="/checkout"
//             element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/customer-details"
//             element={
//               isLoggedIn ? <CustomerDetails /> : <Navigate to="/login" />
//             }
//           />

//           {/* COD confirm & success */}
//           <Route path="/confirm-order" element={<ConfirmOrder />} />
//           <Route path="/order-success" element={<OrderSuccess />} />

//           {/* Profile */}
//           <Route
//             path="/profile"
//             element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//           />

//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }