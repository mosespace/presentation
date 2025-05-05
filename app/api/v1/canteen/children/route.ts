import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const headersList = await headers();
    const apiKey = headersList.get('x-api-key');
    const userId = headersList.get('x-user-id');

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

    // Verify user is a canteen operator
    const user = await db.user.findUnique({
      where: {
        id: userId as string,
      },
      include: {
        role: true,
      },
    });

    if (!user || user.role.name !== 'CANTEEN_OPERATOR') {
      return NextResponse.json(
        { error: 'Only canteen operators can access this data' },
        { status: 403 },
      );
    }

    // Get all children with cards
    const children = await db.childProfile.findMany({
      // include: {
      //   // card: true,
      //   parent: {
      //     select: {
      //       id: true,
      //       email: true,
      //     },
      //   },
      // },
      // orderBy: {
      //   name: 'asc',
      // },
    });

    console.log('Children ✅:', children);

    return NextResponse.json({ children });
  } catch (error) {
    console.error('Error fetching children:', error);
    return NextResponse.json(
      { error: 'Failed to fetch children' },
      { status: 500 },
    );
  }
}
