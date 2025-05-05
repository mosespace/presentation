import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({
        data: null,
        error: 'We cannot associate this id with any user',
        success: false,
        status: 409,
      });
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      data: null,
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
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({
        data: null,
        error: 'We cannot associate this id with any user',
        success: false,
        status: 409,
      });
    }

    const updated_user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated_user,
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
