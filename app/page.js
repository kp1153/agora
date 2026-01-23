'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

async function getFeaturedBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/books`, {
      cache: 'no-store'
    });
    const books = await res.json();
    return books.filter(book => book.featured).slice(0, 6);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getLatestBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/books`, {
      cache: 'no-store'
    });
    const books = await res.json();
    return books.slice(0, 8);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const featured = await getFeaturedBooks();
      const latest = await getLatestBooks();
      setFeaturedBooks(featured);
      setLatestBooks(latest);
      setLoading(false);
    }
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">लोड हो रहा है...</div>;
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">अगोरा हिंदी प्रकाशक</h1>
          <p className="text-xl mb-8">हिंदी साहित्य की दुनिया में आपका स्वागत है</p>
          <Link 
            href="/books"
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            सभी पुस्तकें देखें
          </Link>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">फीचर्ड पुस्तकें</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredBooks.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    {book.cover_image ? (
                      <img 
                        src={book.cover_image} 
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-6xl">📚</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                      <p className="text-lg font-bold text-teal-600">₹{book.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">नवीनतम पुस्तकें</h2>
          {latestBooks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">अभी कोई पुस्तक उपलब्ध नहीं है</p>
              <p className="text-gray-400 mt-2">जल्द ही नई पुस्तकें जोड़ी जाएंगी</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestBooks.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    {book.cover_image ? (
                      <img 
                        src={book.cover_image} 
                        alt={book.title}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                        <span className="text-6xl">📚</span>
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-teal-600 font-semibold">{book.category}</span>
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 mt-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-teal-600">₹{book.price}</p>
                        {book.stock > 0 ? (
                          <span className="text-xs text-green-600 font-semibold">स्टॉक में</span>
                        ) : (
                          <span className="text-xs text-red-600 font-semibold">स्टॉक खत्म</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">श्रेणियाँ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['साहित्य', 'कविता', 'उपन्यास', 'कहानी संग्रह', 'निबंध', 'आत्मकथा'].map((cat) => (
              <Link 
                key={cat}
                href={`/books?category=${cat}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-4xl mb-3">📖</div>
                <h3 className="font-semibold text-gray-800">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}