import {
  createTransaction,
  createWallet,
  deleteWallet,
  getWalletById,
  getWalletByUserId,
  getWalletTransactions,
  ITransaction,
  IWallet,
  IWalletUpdateDTO,
  updateWallet,
} from '@/actions/wallets';

// API client that uses server actions
export const walletApi = {
  // Get wallet by user ID
  getByUserId: async (userId: string) => {
    const response = await getWalletByUserId(userId);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch wallet');
    }

    // console.log('Response ✅;', response);
    return response.data;
  },

  // Get wallet by its ID
  getById: async (id: string) => {
    const response = await getWalletById(id);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch wallet');
    }
    return response.data;
  },

  // Create a new wallet
  create: async (data: IWallet) => {
    const response = await createWallet(data);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create wallet');
    }
    return response.data;
  },

  // Update an existing wallet
  update: async (id: string, data: IWalletUpdateDTO) => {
    const response = await updateWallet(id, data);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update wallet');
    }
    return response.data;
  },

  // Delete a wallet
  delete: async (id: string) => {
    const response = await deleteWallet(id);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete wallet');
    }
    return true;
  },

  // Get wallet transactions
  getTransactions: async (walletId: string) => {
    const response = await getWalletTransactions(walletId);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch transactions');
    }
    return response.data;
  },

  // Create a new transaction
  createTransaction: async (data: ITransaction) => {
    const response = await createTransaction(data);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create transaction');
    }
    return response.data;
  },
};
