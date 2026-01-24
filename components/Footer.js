'use client';

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#004d5c] bg-[#006680]">
      <div className="max-w-6xl mx-auto px-4 py-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          
          <div>
            <h3 className="font-bold mb-3 text-base">संपर्क</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <FaPhone className="mt-1 flex-shrink-0" />
                <span>094790 60031</span>
              </div>
              <div className="flex items-start gap-2">
                <FaEnvelope className="mt-1 flex-shrink-0" />
                <span>agoraprakashan001@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold mb-3 text-base">पता</h3>
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
              <span>ग्राम अहिरान, पोस्ट चमाँव, शिवपुर, वाराणसी-221003, उत्तर प्रदेश, भारत</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-base">सोशल मीडिया</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/agoraprakashan12" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://www.instagram.com/agoraprakashan" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://twitter.com/AgoraPrakashan" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#004d5c] mt-4 pt-3 text-center text-xs">
          <p className="text-gray-200">
            © {new Date().getFullYear()} अगोरा प्रकाशन • वेबसाइट:{" "}
            <a href="https://www.web-developer-kp.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              web-developer-kp.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}