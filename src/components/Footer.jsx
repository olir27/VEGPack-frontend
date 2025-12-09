import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-16  rounded-t-[40px]  mb-0 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-green-400 mb-4">VEGPack</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Delivering freshness from the farm directly to your table. We believe in organic, sustainable, and healthy living for everyone.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Facebook size={18} /></a>
              <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Instagram size={18} /></a>
              <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{marginLeft:"90px"}}>
            <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/vegetables" className="hover:text-green-400 transition"> Vegetables</Link></li>
              <li><Link to="/packages" className="hover:text-green-400 transition">Packages</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Support</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link to="/faq" className="hover:text-green-400 transition">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-green-400 transition">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-green-400 transition">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link></li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-green-700 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-green-400 mt-1" size={18} />
                <span>123, Green Street, <br/> Agri Park, Chennai - 600001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-green-400" size={18} />
                <span>support@vegpack.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} VEGPack. All Rights Reserved. Made with 🌱 for a healthier world.</p>
        </div>
      </div>
    </footer>
  );
}