import { db } from '@/lib/db';
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

    // Get canteen for the operator
    const canteen = await db.canteen.findFirst({
      where: {
        managerId: userId as string,
      },
    });

    if (!canteen) {
      return NextResponse.json({ error: 'Canteen not found' }, { status: 404 });
    }

    // Get products for the canteen
    const products = await db.product.findMany({
      where: {
        canteenId: canteen.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
export async function POST(req: Request) {
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
        { error: 'Only canteen operators can add products' },
        { status: 403 },
      );
    }

    // Get canteen for the operator
    const canteen = await db.canteen.findFirst({
      where: {
        managerId: userId as string,
      },
    });

    if (!canteen) {
      return NextResponse.json({ error: 'Canteen not found' }, { status: 404 });
    }

    const { name, price } = await req.json();

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Invalid product name' },
        { status: 400 },
      );
    }

    if (
      !price ||
      isNaN(Number.parseFloat(price)) ||
      Number.parseFloat(price) <= 0
    ) {
      return NextResponse.json(
        { error: 'Invalid product price' },
        { status: 400 },
      );
    }

    // Create product
    const product = await db.product.create({
      data: {
        name: name.trim(),
        price: Number.parseFloat(price),
        canteenId: canteen.id,
      },
    });

    // Log activity
    // await db.activityLog.create({
    //   data: {
    //     userId: session.user.id,
    //     action: "PRODUCT_ADDED",
    //     description: `Added product: ${name} at $${Number.parseFloat(price).toFixed(2)}`,
    //     details: { productId: product.id, productName: name, price: Number.parseFloat(price) },
    //   },
    // })

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 },
    );
  }
}
