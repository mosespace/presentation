import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IChildProps {
  name: string;
  class: string;
  parentId: string;
  isActive?: boolean;
}
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

    const data: IChildProps = await req.json();

    // const existingItem = await db.childProfile.findUnique({
    //   where: {
    //     id: childId as string,
    //   },
    // });

    // Check if child already exists
    // if (existingItem) {
    //   return NextResponse.json({
    //     data: null,
    //     error: 'Child already exists in the database',
    //     success: false,
    //     status: 409,
    //   });
    // }

    // Create child
    const newStudent = await db.childProfile.create({
      data,
    });

    return NextResponse.json({
      success: true,
      data: newStudent,
      status: 201,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create a new child' },
      { status: 500 },
    );
  }
}
