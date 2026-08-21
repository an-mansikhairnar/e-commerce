// import { NextResponse } from 'next/server';

// export async function POST() {
//   try {
//     const response = NextResponse.json(
//       {
//         success: true,
//         message: 'Logged out successfully',
//       },
//       {
//         status: 200,
//       }
//     );

//     // Remove JWT cookie
//     response.cookies.set('token', '', {
//       httpOnly: true,
//       expires: new Date(0),
//       maxAge: 0,
//       path: '/',
//       sameSite: 'lax',
//       secure: process.env.NODE_ENV === 'production',
//     });

//     return response;
//   } catch (error) {
//     console.error('Logout error:', error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Logout failed',
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("token");

  return response;
}