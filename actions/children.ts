'use server';

import { getAuthenticatedApi } from '@/utils/axios';
import { TransactionStatus, TransactionType } from '@prisma/client';

export interface IChild {
  name: string;
  class: string;
  parentId: string;
  isActive?: boolean;
}

export interface ITransaction {
  id?: string;
  amount: number;
  type: TransactionType;
  status?: TransactionStatus;
  description?: string;
  reference?: string;
  userId?: string;
  walletId: string;
  childProfileId?: string;
  canteenId?: string;
  productId?: string;
  paymentMethodId?: string;
  externalReference?: string;
}

export interface IWalletUpdateDTO {
  balance?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export async function createChild(data: IChild): Promise<ApiResponse<IChild>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.post('/children', data);

    const child = res.data.data;

    return {
      success: true,
      data: child,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to create child',
      data: null,
    };
  }
}

export async function getChildrenByParentId(
  parentId: string,
  params = {},
): Promise<ApiResponse<IChild[]>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.get(`/children/parent/${parentId}`, {
      params,
    });

    // console.log('Response ✅:', res.data);

    const children = res.data.data;

    return {
      success: true,
      data: children,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to fetch children',
      data: null,
    };
  }
}

export async function updateChild(
  childId: string,
  data: IChild,
): Promise<ApiResponse<IChild>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.patch(`/children/${childId}`, data);

    const updatedChild = res.data;

    return {
      success: true,
      data: updatedChild,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to update child',
      data: null,
    };
  }
}

export async function deleteChild(
  childId: string,
): Promise<ApiResponse<boolean>> {
  try {
    const api = await getAuthenticatedApi();

    await api.delete(`/children/${childId}`);

    return {
      success: true,
      data: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to delete child',
      data: null,
    };
  }
}
