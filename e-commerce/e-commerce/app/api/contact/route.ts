// import { db } from '@/app/lib/db';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     await db.query(
//       `INSERT INTO contact (name, email, message)
//    VALUES (?, ?, ?)`,
//       [name, email, message]
//     );

//     return NextResponse.json({
//       success: true,
//       message: 'Contact saved successfully',
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }
import { db } from '@/app/lib/db';
import { transporter } from '@/app/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    const { name, email, message } = await req.json();

    await db.query(
      `INSERT INTO contact (name, email, message)
       VALUES (?, ?, ?)`,
      [name, email, message]
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting us.</p>

        <p>We have received your message:</p>

        <blockquote>${message}</blockquote>

        <p>We'll get back to you as soon as possible.</p>

        <br/>

        <p>Regards,</p>
        <p>Your Company</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
