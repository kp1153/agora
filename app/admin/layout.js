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
    <div className="min-h-screen bg-gray-100 flex">
      {/* साइडबार */}
      <aside className={`bg-gray-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        {/* लोगो */}
        <div className="p-4 border-b border-gray-700">
          <h2 className={`font-bold ${sidebarOpen ? 'text-xl' : 'text-sm text-center'}`}>
            {sidebarOpen ? 'अगोरा प्रकाशक' : 'AP'}
          </h2>
        </div>

        {/* मेन्यू आइटम्स */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 hover:bg-gray-800 transition ${
                pathname === item.path ? 'bg-blue-600' : ''
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* टॉगल बटन */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-4 left-4 bg-gray-700 p-2 rounded"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* मुख्य कंटेंट */}
      <div className="flex-1">
        {/* टॉप बार */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">एडमिन पैनल</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">स्वागत है, एडमिन</span>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              लॉगआउट
            </button>
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