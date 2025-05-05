import { db } from '@/lib/db';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { siteConfig } from '@/constants/siteConfig';
import { generateToken } from '@/lib/generate-token';
import ResetPasswordEmail from '@/emails/reset-password';
import { headers } from 'next/headers';

interface IUserProps {
  email: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXTAUTH_URL;
const nodeEnvironment = process.env.NODE_ENV;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const apiKey = headersList.get('x-api-key');

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
    const { email } = receivedData;

    if (!receivedData) {
      return NextResponse.json({
        data: null,
        error: 'Please provide the needed data to continue with this request.',
        success: false,
        status: 409,
      });
    }

    // Check if user already exists
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
    const token = generateToken();

    const update = await db.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });

    const name = user.name;

    const resetPasswordLink = `${baseUrl}/reset-password?token=${token}&&email=${email}`;

    if (nodeEnvironment === 'development') {
      console.log('Reset Token ✅:', resetPasswordLink);
      return NextResponse.json(
        {
          success: true,
          data: { resetPasswordLink },
          status: 200,
          error: null,
        },
        { status: 200 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: `${siteConfig.name} <info@mosespace.com>`,
      to: email,
      subject: 'Reset Password Request',
      react: ResetPasswordEmail({
        userFirstName: name as string | undefined,
        resetPasswordLink,
      }),
    });

    if (error) {
      return NextResponse.json({
        data: null,
        error: error.message,
        success: false,
        status: 409,
      });
    }

    return NextResponse.json({
      success: true,
      data: data,
      status: 200,
      error: null,
    });
  } catch (error) {
    console.error(error);
    // Return error response
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 },
    );
  }
}
