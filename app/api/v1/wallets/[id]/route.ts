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
        id,
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
      error: 'Failed to fetch back a wallet basing on the provided id',
    });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headersList = await headers();
    const apiKey = headersList.get('x-api-key');
    const userId = headersList.get('x-api-user-id');

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

    // find if wallet exists and also the user trying to delete is the right is attached to the wallet
    const walletExists = await db.wallet.findUnique({
      where: {
        id,
        userId: userId as string,
      },
    });

    if (!walletExists) {
      return NextResponse.json({
        success: true,
        data: null,
        error: 'You dont have access to delete the following wallet',
      });
    }

    // delete the wallet if found
    const deletedWallet = await db.wallet.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      data: deletedWallet,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        data: null,
        error: 'Failed to create item',
        success: false,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
