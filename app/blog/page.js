'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      // Only show published blogs
      const published = data.filter(blog => blog.status === 'published');
      setBlogs(published);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    'कविता', 'कहानी', 'पत्रकारिता', 'समाज विज्ञान', 
    'स्त्री अध्ययन', 'शिक्षा', 'सामाजिक न्याय', 
    'आत्मकथा', 'लोक साहित्य', 'कला'
  ];

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">लोड हो रहा है...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">ब्लॉग</h1>
          <p className="text-xl text-gray-600">आयोजन, समाचार और विचार</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === ''
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            सभी
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-20">
            कोई ब्लॉग नहीं मिला
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                {blog.featured_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-3">
                      {blog.category}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(blog.created_at).toLocaleDateString('hi-IN')}</span>
                    {blog.author_name && <span>{blog.author_name}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}