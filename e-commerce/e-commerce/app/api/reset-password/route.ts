import { db } from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  try {
    const { email, password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    const users = rows as User[];

    if (!users.length) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const user = users[0];

    // Compare new password with old password
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a new password. It cannot be the same as your previous password.',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
