import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-900 to-gray-800 text-gray-300 py-8  px-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo / Branding */}
        <div className="text-white font-bold text-xl">
          MyWebsite
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-4 text-sm md:text-base">
          <li>
            <a href="/" className="hover:text-white transition-colors">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition-colors">About</a>
          </li>
          <li>
            <a href="/services" className="hover:text-white transition-colors">Services</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
