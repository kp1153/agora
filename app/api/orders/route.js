import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// सभी ऑर्डर्स लाने के लिए (GET)
export async function GET() {
  try {
    const result = await turso.execute('SELECT * FROM orders ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'ऑर्डर्स लोड नहीं हो सके' }, { status: 500 });
  }
}

// नया ऑर्डर बनाने के लिए (POST)
export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('📦 Received order data:', data);
    
    const result = await turso.execute({
      sql: `INSERT INTO orders (user_name, user_email, user_phone, total_amount, status) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        data.customerName,      // ✅ Changed from data.user_name
        data.email,             // ✅ Changed from data.user_email
        data.phone,             // ✅ Changed from data.user_phone
        data.totalAmount,       // ✅ Changed from data.total_amount
        data.status || 'pending'
      ]
    });

    console.log('✅ Order created with ID:', result.lastInsertRowid);
    
    return NextResponse.json({ 
      success: true, 
      orderId: Number(result.lastInsertRowid) 
    }, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json({ error: 'ऑर्डर बनाने में समस्या आई' }, { status: 500 });
  }
}