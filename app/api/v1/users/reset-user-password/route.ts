import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface IUserProps {
  email: string;
  token: string;
  newPassword: string;
}
export async function POST(req: Request) {
  const headersList = await headers();
  const apiKey = headersList.get('x-api-key');
  try {
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        data: null,
        status: 401,
        error: 'API-Key Is Required',
      });
    }

    const validKey = await db.apiKey.findUnique({ where: { key: apiKey } });

    if (!validKey) {
      return NextResponse.json({
        success: false,
        data: null,
        status: 404,
        error: 'Invalid API-Key',
      });
    }

    const receivedData: IUserProps = await req.json();
    const { email, newPassword, token } = receivedData;

    if (!receivedData) {
      return NextResponse.json({
        data: null,
        error: 'Please provide the needed data to continue with this request.',
        success: false,
        status: 409,
      });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({
        data: null,
        error: 'We cannot associate this email with any user',
        success: false,
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await db.user.update({
      where: {
        email,
        token,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      status: 201,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 },
    );
  }
}
