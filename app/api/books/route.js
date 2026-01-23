import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// सभी किताबें लाने के लिए (GET)
export async function GET() {
  try {
    const result = await turso.execute('SELECT * FROM books ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'किताबें लोड नहीं हो सकीं' }, { status: 500 });
  }
}

// नई किताब जोड़ने के लिए (POST)
export async function POST(request) {
  try {
    const data = await request.json();
    
    const result = await turso.execute({
      sql: `INSERT INTO books (title, author, category, price, description, cover_image, isbn, pages, publisher, published_date, stock, featured) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        data.title,
        data.author,
        data.category,
        data.price,
        data.description || null,
        data.cover_image || null,
        data.isbn || null,
        data.pages || null,
        data.publisher || null,
        data.published_date || null,
        data.stock || 0,
        data.featured || 0
      ]
    });

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ error: 'किताब जोड़ने में समस्या आई' }, { status: 500 });
  }
}