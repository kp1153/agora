import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// एक ऑर्डर की डिटेल्स लाने के लिए (GET)
export async function GET(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    
    const result = await turso.execute({
      sql: 'SELECT * FROM orders WHERE id = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'ऑर्डर नहीं मिला' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'ऑर्डर लोड नहीं हो सका' }, { status: 500 });
  }
}

// ऑर्डर अपडेट करने के लिए (PUT)
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    const data = await request.json();

    await turso.execute({
      sql: `UPDATE orders SET status = ? WHERE id = ?`,
      args: [data.status, slug]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'ऑर्डर अपडेट नहीं हो सका' }, { status: 500 });
  }
}

// ऑर्डर डिलीट करने के लिए (DELETE)
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    
    await turso.execute({
      sql: 'DELETE FROM orders WHERE id = ?',
      args: [slug]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'ऑर्डर डिलीट नहीं हो सका' }, { status: 500 });
  }
}