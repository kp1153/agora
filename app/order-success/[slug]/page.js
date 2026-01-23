import Link from 'next/link';

async function getOrder(orderId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data; // data.order नहीं, सिर्फ data
  } catch (error) {
    return null;
  }
}

export default async function OrderSuccessPage({ params }) {
  const resolvedParams = await params;
  const order = await getOrder(resolvedParams.id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">ऑर्डर नहीं मिला</h1>
        <Link href="/" className="text-teal-600 hover:underline">
          होम पर वापस जाएं
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            ऑर्डर सफलतापूर्वक प्लेस हो गया!
          </h1>
          <p className="text-gray-600">
            ऑर्डर नंबर: <span className="font-semibold">#{order.id}</span>
          </p>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">ग्राहक की जानकारी</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>नाम:</strong> {order.customerName}</p>
            <p><strong>ईमेल:</strong> {order.email}</p>
            <p><strong>फोन:</strong> {order.phone}</p>
            <p><strong>पता:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">ऑर्डर की किताबें</h2>
          {order.items && JSON.parse(order.items).map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b">
              <span>{item.title} × {item.quantity}</span>
              <span className="font-semibold">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="bg-teal-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between text-xl font-bold">
            <span>कुल राशि:</span>
            <span className="text-teal-600">₹{order.totalAmount}</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            हम जल्द ही आपसे संपर्क करेंगे। धन्यवाद!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
            >
              होम पर जाएं
            </Link>
            <Link
              href="/books"
              className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50"
            >
              खरीदारी जारी रखें
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}