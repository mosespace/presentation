import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: any = await req.json();

    if (!data) {
      return NextResponse.json({
        data: null,
        error: 'There required data to perfom this action is needed.',
        success: false,
        status: 409,
      });
    }

    // Create new user
    const newTransactio = await db.transaction.create({
      data,
    });

    return NextResponse.json({
      success: true,
      data: newTransactio,
      status: 201,
      error: null,
    });
  } catch (error) {
    console.error(error);
    // Return error response
    return NextResponse.json(
      { error: 'Failed to create a new transaction' },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
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
    const walletId = searchParams.get('walletId');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!walletId) {
      return NextResponse.json(
        { error: 'Wallet ID is required' },
        { status: 400 },
      );
    }

    // Build the where clause based on filters
    const where: any = {};

    // Search by class name or slug/description
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { amount: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await db.transaction.count({ where });

    const transactions = await db.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: true,
        childProfile: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch transactions',
      },
      {
        status: 500,
      },
    );
  }
}
