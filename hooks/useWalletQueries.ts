import { ITransaction, IWallet, IWalletUpdateDTO } from '@/actions/wallets';
import { walletApi } from '@/services/wallets';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

// Query keys for caching
export const walletKeys = {
  all: ['wallets'] as const,
  lists: () => [...walletKeys.all, 'list'] as const,
  user_wallet: (userId: string) => [...walletKeys.lists(), userId] as const,
  details: () => [...walletKeys.all, 'detail'] as const,
  detail: (id: string) => [...walletKeys.details(), id] as const,
  transactions: (walletId: string) =>
    [...walletKeys.detail(walletId), 'transactions'] as const,
};

export function useUserWallet(userId: string) {
  // Get wallet for a specific user
  const {
    data: wallet,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: walletKeys.user_wallet(userId),
    queryFn: () => walletApi.getByUserId(userId),
    enabled: !!userId,
  });

  // console.log('Wallet ✅;', wallet);

  return {
    wallet,
    refetch,
    isLoading,
    error,
  };
}

export function useSuspenseUserWallet(userId: string) {
  // Get wallet with Suspense (data is guaranteed to be defined)
  if (typeof window === 'undefined') {
    throw new Promise(() => {});
  }

  // if (typeof window === 'undefined') {
  //   // Return empty array during SSR
  //   return [] as IChild[];
  // }
  
  const { data: wallet, refetch } = useSuspenseQuery({
    queryKey: walletKeys.user_wallet(userId),
    queryFn: () => walletApi.getByUserId(userId),
  });

  return {
    wallet,
    refetch,
  };
}

export function useWalletById(walletId: string) {
  // Get wallet by ID
  const {
    data: wallet,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: walletKeys.detail(walletId),
    queryFn: () => walletApi.getById(walletId),
    enabled: !!walletId,
  });

  return {
    wallet,
    refetch,
    isLoading,
    error,
  };
}

export function useWalletTransactions(walletId: string) {
  // Get transactions for a specific wallet
  const {
    data: transactions,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: walletKeys.transactions(walletId),
    queryFn: () => walletApi.getTransactions(walletId),
    enabled: !!walletId,
  });

  return {
    transactions,
    refetch,
    isLoading,
    error,
  };
}

export function useCreateWallet() {
  const queryClient = useQueryClient();

  // Create a new wallet
  return useMutation({
    mutationFn: (data: IWallet) => walletApi.create(data),
    onSuccess: (data) => {
      toast.success('Wallet created successfully');
      // Invalidate wallet list and specific user wallet
      queryClient.invalidateQueries({ queryKey: walletKeys.lists() });
      if (data && 'userId' in data) {
        queryClient.invalidateQueries({
          queryKey: walletKeys.user_wallet(data.userId),
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to create wallet', {
        description: error.message || 'Unknown error occurred',
      });
    },
  });
}

export function useUpdateWallet() {
  const queryClient = useQueryClient();

  // Update an existing wallet
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IWalletUpdateDTO }) =>
      walletApi.update(id, data),
    onSuccess: (data, variables) => {
      toast.success('Wallet updated successfully');
      // Invalidate specific wallet detail
      queryClient.invalidateQueries({
        queryKey: walletKeys.detail(variables.id),
      });
      // Also invalidate user wallet if userId is available
      if (data && 'userId' in data) {
        queryClient.invalidateQueries({
          queryKey: walletKeys.user_wallet(data.userId),
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to update wallet', {
        description: error.message || 'Unknown error occurred',
      });
    },
  });
}

export function useDeleteWallet() {
  const queryClient = useQueryClient();

  // Delete a wallet
  return useMutation({
    mutationFn: (id: string) => walletApi.delete(id),
    onSuccess: () => {
      toast.success('Wallet deleted successfully');
      // Invalidate wallet lists query
      queryClient.invalidateQueries({ queryKey: walletKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error('Failed to delete wallet', {
        description: error.message || 'Unknown error occurred',
      });
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  // Create a new transaction
  return useMutation({
    mutationFn: (data: ITransaction) => walletApi.createTransaction(data),
    onSuccess: (_, variables) => {
      toast.success('Transaction completed successfully');
      // Invalidate wallet transactions and wallet detail to refresh balance
      queryClient.invalidateQueries({
        queryKey: walletKeys.transactions(variables.walletId),
      });
      queryClient.invalidateQueries({
        queryKey: walletKeys.detail(variables.walletId),
      });
      // Also invalidate user wallet if userId is available
      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: walletKeys.user_wallet(variables.userId),
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Transaction failed', {
        description: error.message || 'Unknown error occurred',
      });
    },
  });
}
