// import React from "react";
// import { Link } from "react-router-dom";
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-green-900 text-white pt-16  rounded-t-[40px]  mb-0 ">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          
//           {/* Brand */}
//           <div style={{marginLeft:"50px"}}> 
//             <h2 className="text-3xl font-bold text-green-400 mb-4">VEGPack</h2>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Delivering freshness from the farm directly to your table. We believe in organic, sustainable, and healthy living for everyone.
//             </p>
//             <div className="flex gap-4 mt-6">
//               <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Facebook size={18} /></a>
//               <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Instagram size={18} /></a>
//               <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Twitter size={18} /></a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div style={{marginLeft:"200px"}}>
//             <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Quick Links</h3>
//             <ul className="space-y-3 text-gray-300 text-sm">
//               <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
//               <li><Link to="/vegetables" className="hover:text-green-400 transition"> Vegetables</Link></li>
//               <li><Link to="/packages" className="hover:text-green-400 transition">Packages</Link></li>
//               <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
//               <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Support */}
//           {/* <div>
//             <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Support</h3>
//             <ul className="space-y-3 text-gray-300 text-sm">
//               <li><Link to="/faq" className="hover:text-green-400 transition">FAQs</Link></li>
//               <li><Link to="/shipping" className="hover:text-green-400 transition">Shipping Policy</Link></li>
//               <li><Link to="/returns" className="hover:text-green-400 transition">Returns & Refunds</Link></li>
//               <li><Link to="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link></li>
//             </ul>
//           </div> */}

//           {/* Contact */}
//           <div style={{paddingLeft:"200px"}}>
//             <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Contact Us</h3>
//             <ul className="space-y-4 text-gray-300 text-sm">
//               <li className="flex items-start gap-3">
                
//                 <span>123, Green Street Agri Park, Chennai - 600001</span>
//               </li>
//               <li className="flex items-center gap-3">
                
//                 <span>+91 98765 43210</span>
//               </li>
//               <li className="flex items-center gap-3">
               
//                 <span>support@vegpack.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-green-800 pt-8 text-center text-gray-400 text-sm">
//           <p>© {new Date().getFullYear()} VEGPack. All Rights Reserved. Made with 🌱 for a healthier world.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }



// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Top grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-brand">
            <div className="footer-logo-row">
              <div className="footer-logo-pill">
                <span>V</span>
              </div>
              <div>
                <h2 className="footer-logo-text">
                  VEG<span>Pack</span>
                </h2>
                <p className="footer-tagline">
                  Fresh. Local. Sustainable.
                </p>
              </div>
            </div>

            <p className="footer-body-text">
              Delivering freshness from the farm directly to your table.
              We believe in organic, sustainable, and healthy living for
              everyone.
            </p>

            <div className="footer-socials">
              <a
                href="#"
                aria-label="Facebook"
                className="footer-social-btn"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="footer-social-btn"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="footer-social-btn"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vegetables" className="footer-link">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/packages" className="footer-link">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li>
                <Link to="/faq" className="footer-link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="footer-link"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="footer-link"
                >
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="footer-link"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li className="footer-contact-row">
                <MapPin size={16} />
                <span>
                  No.465.selvanagar,
                  <br />
                  Kilinochchi
                </span>
              </li>
              <li className="footer-contact-row">
                <Phone size={16} />
                <span>0753456789</span>
              </li>
              <li className="footer-contact-row">
                <Mail size={16} />
                <span>vegpack@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {year} VEGPack. All Rights Reserved. Made with 🌱 for a
            healthier world.
          </p>
        </div>
      </div>
    </footer>
  );
}