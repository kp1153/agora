'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'डैशबोर्ड', path: '/admin', icon: '📊' },
    { name: 'सभी किताबें', path: '/admin/books', icon: '📚' },
    { name: 'नई किताब जोड़ें', path: '/admin/books/new', icon: '➕' },
    { name: 'ऑर्डर्स', path: '/admin/orders', icon: '🛒' },
    { name: 'कैटेगरी', path: '/admin/categories', icon: '📁' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* साइडबार */}
      <aside className={`bg-teal-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-full`}>
        {/* लोगो */}
        <div className="p-4 border-b border-teal-800">
          <Link href="/admin" className="block">
            <h2 className={`font-bold ${sidebarOpen ? 'text-2xl' : 'text-sm text-center'}`}>
              {sidebarOpen ? '🏛️ अगोरा एडमिन' : '🏛️'}
            </h2>
          </Link>
        </div>

        {/* मेन्यू आइटम्स */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                pathname === item.path 
                  ? 'bg-teal-600 shadow-lg' 
                  : 'hover:bg-teal-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* साइडबार टॉगल */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-6 left-4 bg-teal-700 hover:bg-teal-600 p-2 rounded-lg transition-colors"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* मुख्य कंटेंट */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* टॉप बार */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-600">एडमिन पैनल</h1>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                🏠 साइट देखें
              </Link>
              <span className="text-gray-700 font-medium">स्वागत है, एडमिन</span>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                लॉगआउट
              </button>
            </div>
          </div>
        </header>

        {/* पेज कंटेंट */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}