"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'होम', href: '/' },
    { name: 'सभी पुस्तकें', href: '/books' },
    { name: 'साहित्य', href: '/books?category=साहित्य' },
    { name: 'कविता', href: '/books?category=कविता' },
    { name: 'उपन्यास', href: '/books?category=उपन्यास' },
    { name: 'कहानी संग्रह', href: '/books?category=कहानी संग्रह' },
    { name: 'किताब छपवाएं', href: '/publish-with-us' },
    { name: 'ब्लॉग', href: '/blog' },
    { name: 'संपर्क करें', href: '/contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.id)
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-blue-700 shadow-md sticky top-0 z-50">
      <style dangerouslySetInnerHTML={{__html: `
        .menu-scroll::-webkit-scrollbar { height: 8px; }
        .menu-scroll::-webkit-scrollbar-track { background: #1d4ed8; }
        .menu-scroll::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 6px; }
        .menu-scroll::-webkit-scrollbar-thumb:hover { background: #60a5fa; }
      `}} />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            
            <Link href="/" className="flex-1 text-center">
              <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                अगोरा प्रकाशन
              </h1>
            </Link>
            
            <div className="flex-1 flex items-center justify-end gap-4">
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
                className="p-2 rounded-md text-white hover:bg-blue-600 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`pt-1 pb-2 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <div className="hidden md:flex flex-nowrap w-full overflow-x-auto pb-2 menu-scroll gap-2">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    text-white text-center font-medium rounded-md whitespace-nowrap min-w-[120px]
                    px-3 py-2 text-sm
                    hover:bg-blue-600
                    ${isActive(item.href) ? "bg-blue-600 ring-1 ring-white" : ""}
                  `}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    text-white text-center font-medium rounded-md whitespace-nowrap min-w-[120px]
                    px-3 py-2 text-sm
                    hover:bg-blue-600
                    ${activeSection === item.id ? "bg-blue-600 ring-1 ring-yellow-400" : ""}
                  `}
                >
                  {item.name}
                </button>
              )
            )}
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors text-center"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors text-center"
                    >
                      {item.name}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;