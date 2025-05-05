'use server';

import { getAuthenticatedApi } from '@/utils/axios';
import {
  TransactionType,
  TransactionStatus,
  ChildProfile,
  User,
  Transaction,
} from '@prisma/client';

export interface IWallet {
  id?: string;
  balance: number;
  userId: string;

  transactions: Transaction[];
  user?: User & { childProfiles: ChildProfile[] };
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

export async function createWallet(
  data: IWallet,
): Promise<ApiResponse<IWallet>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.post('/wallets', data);

    const wallet = res.data.data;

    return {
      success: true,
      data: wallet,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to create wallet',
      data: null,
    };
  }
}

export async function getWalletByUserId(
  userId: string,
  params = {},
): Promise<ApiResponse<IWallet>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.get(`/wallets/user/${userId}`, {
      params,
    });

    // console.log('Response ✅:', res.data);

    const wallet = res.data.data;

    return {
      success: true,
      data: wallet,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to fetch wallet',
      data: null,
    };
  }
}

export async function getWalletById(
  walletId: string,
): Promise<ApiResponse<IWallet>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.get(`/wallets/${walletId}`);

    const wallet = res.data;

    return {
      success: true,
      data: wallet,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to fetch wallet',
      data: null,
    };
  }
}

export async function updateWallet(
  walletId: string,
  data: IWalletUpdateDTO,
): Promise<ApiResponse<IWallet>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.put(`/wallets/${walletId}`, data);

    const updatedWallet = res.data;

    return {
      success: true,
      data: updatedWallet,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to update wallet',
      data: null,
    };
  }
}

export async function deleteWallet(
  walletId: string,
): Promise<ApiResponse<boolean>> {
  try {
    const api = await getAuthenticatedApi();

    await api.delete(`/wallets/${walletId}`);

    return {
      success: true,
      data: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to delete wallet',
      data: null,
    };
  }
}

export async function getWalletTransactions(
  walletId: string,
  params = {},
): Promise<ApiResponse<ITransaction[]>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.get(`/wallets/${walletId}/transactions`, {
      params,
    });

    const transactions = res.data;

    return {
      success: true,
      data: transactions,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to fetch transactions',
      data: null,
    };
  }
}

export async function createTransaction(
  data: ITransaction,
): Promise<ApiResponse<ITransaction>> {
  try {
    const api = await getAuthenticatedApi();

    const res = await api.post('/transactions', data);

    const transaction = res.data;

    return {
      success: true,
      data: transaction,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to create transaction',
      data: null,
    };
  }
}
