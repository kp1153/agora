'use client';

import { useState, useEffect } from 'react';
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

  // Razorpay script load करो
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Razorpay order बनाओ
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });

      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert('पेमेंट शुरू नहीं हो सका। दोबारा कोशिश करें।');
        setLoading(false);
        return;
      }

      // Step 2: Razorpay checkout खोलो
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'आपकी बुक स्टोर',
        description: 'पुस्तक खरीदी',
        order_id: orderData.id,
        handler: async function (response) {
          // Step 3: Payment verify करो
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Step 4: Order database में save करो
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...formData,
                items: cart,
                totalAmount: totalPrice,
                status: 'paid',
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              })
            });

            const savedOrder = await saveOrderRes.json();

            if (savedOrder.success) {
              clearCart();
              router.push(`/order-success/${savedOrder.orderId}`);
            }
          } else {
            alert('पेमेंट वेरिफिकेशन फेल। कृपया सपोर्ट से संपर्क करें।');
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#0d9488'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      razorpay.on('payment.failed', function (response) {
        alert('पेमेंट फेल हो गया। दोबारा कोशिश करें।');
        setLoading(false);
      });

    } catch (error) {
      console.error('Error:', error);
      alert('कुछ गड़बड़ हो गई। दोबारा कोशिश करें।');
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
          <form onSubmit={handlePayment} className="space-y-4">
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
              {loading ? 'प्रोसेस हो रहा है...' : 'पेमेंट करें'}
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