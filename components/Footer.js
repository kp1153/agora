'use client';

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-teal-600 mt-16 bg-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-900">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaPhone className="text-teal-700" />
            <span>094790 60031</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-teal-700" />
            <span>agoraprakashan001@gmail.com</span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6 text-2xl text-teal-700">
          <a href="https://www.facebook.com/agoraprakashan12" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-black cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/agoraprakashan" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-black cursor-pointer" />
          </a>
          <a href="https://twitter.com/AgoraPrakashan" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-black cursor-pointer" />
          </a>
        </div>

        <p className="text-sm mt-8">
          मन-चित लगाकार वेबसाइट विकसित करने वाले:{" "}
          <a
            href="https://www.web-developer-kp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-teal-600"
          >
            www.web-developer-kp.com
          </a>
        </p>

        <p className="mt-4 text-xs text-gray-700">
          © {new Date().getFullYear()} अगोरा प्रकाशन — सर्वाधिकार सुरक्षित
        </p>
      </div>
    </footer>
  );
}