import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface IChildProps {
  name: string;
  class: string;
  parentId: string;
  isActive?: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headersList = await headers();
    const apiKey = headersList.get('x-api-key');

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          data: null,
          error: 'API Key is required',
          success: false,
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const validKey = await db.apiKey.findUnique({ where: { key: apiKey } });

    if (!validKey) {
      return new Response(
        JSON.stringify({
          data: null,
          error: 'Invalid API Key',
          success: false,
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const child = await db.childProfile.findUnique({
      where: {
        id,
      },
      include: {
        parent: true,
        transactions: true, // Optionally include transactions for better insights
      },
    });

    return NextResponse.json({
      success: true,
      data: child,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: true,
      data: null,
      error: 'Failed to fetch child basing on the Id provided',
    });
  }
}

export async function PATCH(
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

    const data: IChildProps = await request.json();

    const existingChild = await db.childProfile.findUnique({
      where: {
        id,
      },
    });

    // Check if child does not already exists
    if (!existingChild) {
      return NextResponse.json({
        data: null,
        error: 'No child exists in ur database with the provided ID',
        success: false,
        status: 409,
      });
    }

    // update child
    const updatedChild = await db.childProfile.update({
      data,
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedChild,
      status: 201,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update a child' },
      { status: 500 },
    );
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

    const data: IChildProps = await request.json();

    const existingChild = await db.childProfile.findUnique({
      where: {
        id,
      },
    });

    // Check if child does not already exists
    if (!existingChild) {
      return NextResponse.json({
        data: null,
        error: 'No child exists in ur database with the provided ID',
        success: false,
        status: 409,
      });
    }

    // update child
    await db.childProfile.delete({
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
      { error: 'Failed to delete a new child' },
      { status: 500 },
    );
  }
}
