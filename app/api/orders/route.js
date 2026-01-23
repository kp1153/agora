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
    
    const result = await turso.execute({
      sql: `INSERT INTO orders (user_name, user_email, user_phone, total_amount, status) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        data.user_name,
        data.user_email,
        data.user_phone,
        data.total_amount,
        data.status || 'pending'
      ]
    });

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'ऑर्डर बनाने में समस्या आई' }, { status: 500 });
  }
}