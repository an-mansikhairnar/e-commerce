import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body?.name;
    const email = body?.email ?? '';
    const contact = body?.contact ?? '';
    const password = body?.password ?? '';
    const token = body?.token ?? 1;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, email and password are required',
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      `INSERT INTO users (name, email, contact, password, token)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, contact, hashedPassword, token]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create account',
      },
      { status: 500 }
    );
  }
}