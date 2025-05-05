import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface IUserProps {
  email: string;
  passwordHash: string;
  role: string;
}
export async function POST(req: Request) {
  const userEmail = req.headers.get('x-user-email');

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

    const data: IUserProps = await req.json();

    if (!data.role) {
      data.role = 'PARENT';
    }

    // Check if user already exists
    const existingItem = await db.user.findUnique({
      where: {
        email: userEmail as string,
      },
    });

    if (existingItem) {
      return NextResponse.json({
        data: null,
        error:
          'User already exists in the database, try signin up using a different account/email',
        success: false,
        status: 409,
      });
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        ...data,
        role: { connect: { name: data.role } }, // Transform role to the expected format
      },
    });

    return NextResponse.json({
      success: true,
      data: newUser,
      status: 201,
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
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build the where clause based on filters
    const where: any = {};

    // Search by class name or slug/description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await db.wallet.count({ where });

    // Get users with pagination
    const wallet = await db.wallet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        transactions: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: wallet,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch back users' },
      { status: 500 },
    );
  }
}
export async function PATCH(req: NextRequest) {
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

    const { id, balance } = await req.json();

    if (!id || balance === undefined) {
      return NextResponse.json({
        success: false,
        data: null,
        error: 'Wallet ID and balance are required',
      });
    }

    // Check if wallet exists
    const wallet = await db.wallet.findUnique({
      where: { id },
    });

    if (!wallet) {
      return NextResponse.json({
        success: false,
        data: null,
        error: 'Wallet not found',
      });
    }

    // Update wallet balance
    const updatedWallet = await db.wallet.update({
      where: { id },
      data: { balance },
    });

    return NextResponse.json({
      success: true,
      data: updatedWallet,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update wallet' },
      { status: 500 },
    );
  }
}
