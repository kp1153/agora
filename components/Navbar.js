'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const menuItems = [
    { name: 'होम', href: '/' },
    { name: 'सभी पुस्तकें', href: '/books' },
    { name: 'साहित्य', href: '/books?category=साहित्य' },
    { name: 'कविता', href: '/books?category=कविता' },
    { name: 'उपन्यास', href: '/books?category=उपन्यास' },
    { name: 'कहानी संग्रह', href: '/books?category=कहानी संग्रह' },
    { name: 'हमारे साथ प्रकाशित करें', href: '/publish-with-us' },
    { name: 'ब्लॉग', href: '/blog' },
    { name: 'संपर्क करें', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="bg-blue-700 -mx-4 px-4 py-4">
  <div className="flex items-center justify-between">
    <Link href="/" className="flex-1 text-center">
      <span className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        अगोरा प्रकाशन
      </span>
    </Link>
    
    <div className="flex items-center gap-4">
      <button className="text-white hover:text-gray-200">
        🔍
      </button>
      <Link href="/cart" className="relative text-white hover:text-gray-200">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
      <Link href="/auth/login" className="text-white hover:text-gray-200">
        👤
      </Link>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  </div>
</div>

        <div className="hidden md:flex justify-center py-2 overflow-x-auto menu-scroll">
          <div className="flex flex-nowrap gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}