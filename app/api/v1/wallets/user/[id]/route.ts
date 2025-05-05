import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  request: NextRequest,
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

    const wallet = await db.wallet.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: {
          include: {
            childProfiles: true, // Include child profiles associated with the user
          },
        },
        transactions: true, // Optionally include transactions for better insights
      },
    });

    return NextResponse.json({
      success: true,
      data: wallet,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: true,
      data: null,
      error: 'Failed to fetch wallet basing on the userIsd provided',
    });
  }
}
