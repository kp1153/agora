'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);

  const sliderImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.JPG',
    '/images/8.JPG',
    '/images/9.JPG',
    '/images/10.JPG',
  ];

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

  const featuredBooks = books.filter(b => b.featured === true).slice(0, 5);
  const popularBooks = books.filter(b => b.popular === true).slice(0, 5);

  return (
    <div className="w-full">
      
      {/* Slider with Sidebars */}
      <div className="relative w-full h-[65vh] md:h-[75vh] bg-white overflow-hidden flex">
        
        {/* Left Sidebar - Featured Books */}
        <div className="hidden md:flex md:flex-col w-[18%] bg-[#006680] p-4 overflow-y-auto">
          <h3 className="text-white text-base font-bold mb-4 text-center border-b-2 border-white/30 pb-2">फीचर्ड</h3>
          <div className="space-y-4">
            {featuredBooks.length > 0 ? (
              featuredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg">
                  <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{book.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/70 text-sm text-center mt-8">कोई फीचर्ड किताब नहीं</p>
            )}
          </div>
        </div>

        {/* Center - Main Slider */}
        <div className="relative w-full md:w-[64%] h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-6">
                <img 
                  src={img} 
                  alt={`Slide ${index + 1}`} 
                  className="max-w-[90%] max-h-[90%] object-contain drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>
          ))}

          <button onClick={prevSlide} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full text-2xl md:text-3xl transition-all shadow-xl hover:shadow-2xl z-10 hover:scale-110">←</button>
          <button onClick={nextSlide} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full text-2xl md:text-3xl transition-all shadow-xl hover:shadow-2xl z-10 hover:scale-110">→</button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-teal-600 w-10' : 'bg-gray-400 w-2.5 hover:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Popular Books */}
        <div className="hidden md:flex md:flex-col w-[18%] bg-[#006680] p-4 overflow-y-auto">
          <h3 className="text-white text-base font-bold mb-4 text-center border-b-2 border-white/30 pb-2">लोकप्रिय</h3>
          <div className="space-y-4">
            {popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg">
                  <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{book.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/70 text-sm text-center mt-8">कोई लोकप्रिय किताब नहीं</p>
            )}
          </div>
        </div>
      </div>

      {/* All Books Section */}
      <div className="min-h-[50vh] bg-gray-50 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">सभी पुस्तकें</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-gray-200">
                  <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
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