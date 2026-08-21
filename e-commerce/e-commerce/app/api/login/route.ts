import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';
import { signToken } from '@/app/lib/jwt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email ?? '';
    const password = body?.password ?? '';

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM users WHERE email = ?`, [email]);

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name, contact: user.contact });

    return NextResponse.json(
      {
        success: true,
        message: 'Logged in successfully!',
        token,
      },
      { status: 200 }
    );

    // const response = NextResponse.json({ success: true, message: 'Logged in successfully!', token }, { status: 200 });
    // response.cookies.set({
    //   name: 'token',
    //   value: token,
    //   httpOnly: true,
    //   path: '/',
    //   maxAge: 60 * 60 * 24,
    //   sameSite: 'lax',
    // });

    // return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
