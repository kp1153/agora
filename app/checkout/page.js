'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cart,
        totalAmount: totalPrice,
        status: 'pending'
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
      router.push(`/order-success/${data.orderId}`);
      } else {
        alert('ऑर्डर प्लेस नहीं हो पाया। कृपया दोबारा कोशिश करें।');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('कुछ गड़बड़ हो गई। दोबारा कोशिश करें।');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">आपकी कार्ट खाली है</h1>
        <a href="/books" className="text-teal-600 hover:underline">
          खरीदारी जारी रखें
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">चेकआउट</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">डिलीवरी की जानकारी</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="customerName"
              placeholder="पूरा नाम *"
              required
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="ईमेल *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              placeholder="फोन नंबर *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              name="address"
              placeholder="पूरा पता *"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="शहर *"
                required
                value={formData.city}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="state"
                placeholder="राज्य *"
                required
                value={formData.state}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <input
              type="text"
              name="pincode"
              placeholder="पिन कोड *"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
            >
              {loading ? 'प्लेस कर रहे हैं...' : 'ऑर्डर प्लेस करें'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">ऑर्डर समरी</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-3 pb-3 border-b">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">मात्रा: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between text-xl font-bold">
                <span>कुल राशि:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}