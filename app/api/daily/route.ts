import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_DAILY_API || 'http://localhost:8000/api/v2/daily/latest';
  try {
    const res = await fetch(backendUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'backend fetch failed' }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
