'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);

  const sliderImages = Array.from({ length: 10 }, (_, i) => `/images/${i + 1}.jpg`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  async function fetchAllBooks() {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <div className="w-full">
      
      {/* Slider with Sidebars - 50% */}
      <div className="relative w-full h-[50vh] bg-gray-900 overflow-hidden flex">
        
        {/* Left Sidebar - Featured Books */}
        <div className="w-1/5 bg-[#006680] p-2 overflow-y-auto">
          <h3 className="text-white text-xs font-bold mb-2 text-center">फीचर्ड</h3>
          <div className="space-y-2">
            {books.filter(b => b.featured).slice(0, 5).map((book) => (
              <div key={book.id} className="bg-white rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Center - Main Slider */}
        <div className="relative w-3/5 h-full">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full text-2xl">←</button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full text-2xl">→</button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Popular Books */}
        <div className="w-1/5 bg-[#006680] p-2 overflow-y-auto">
          <h3 className="text-white text-xs font-bold mb-2 text-center">लोकप्रिय</h3>
          <div className="space-y-2">
            {books.filter(b => b.stock > 10).slice(0, 5).map((book) => (
              <div key={book.id} className="bg-white rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Books Section - 50% */}
      <div className="h-[50vh] bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">सभी पुस्तकें</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-gray-200">
                  <img src={book.cover_image} alt={book.title} className="w-full h-full object-contain" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-1">{book.author}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-teal-600">₹{book.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${book.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {book.stock > 0 ? '✓' : '✗'}
                    </span>
                  </div>
                  <button disabled={book.stock === 0} className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-1.5 rounded text-sm font-semibold">
                    🛒 कार्ट
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}