import { IChild } from '@/actions/children';
import { childrenAPI } from '@/services/children';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

// Query keys for caching
export const childrenKeys = {
  all: ['children'] as const,
  lists: () => [...childrenKeys.all, 'list'] as const,
  children_by_parent: (parentId: string) =>
    [...childrenKeys.lists(), parentId] as const,
  details: () => [...childrenKeys.all, 'detail'] as const,
  detail: (id: string) => [...childrenKeys.details(), id] as const,
  transactions: (childId: string) =>
    [...childrenKeys.detail(childId), 'transactions'] as const,
};

const clientSideGetChildren = async (parentId: string) => {
  // Only execute the server function in the browser
  if (typeof window === 'undefined') {
    throw new Promise(() => {});
  }

  // if (typeof window === 'undefined') {
  //   // Return empty array during SSR
  //   return [] as IChild[];
  // }

  return childrenAPI.getChildrenByParentId(parentId);
};
export function useSuspenseChildren(parentId: string) {
  // Get children with Suspense (data is guaranteed to be defined)
  if (typeof window === 'undefined') {
    throw new Promise(() => {});
  }

  // if (typeof window === 'undefined') {
  //   // Return empty array during SSR
  //   return [] as IChild[];
  // }

  const { data: children, refetch } = useSuspenseQuery({
    queryKey: childrenKeys.children_by_parent(parentId),
    queryFn: () => childrenAPI.getChildrenByParentId(parentId),
  });

  return {
    children,
    refetch,
  };
}

// export function useChildById(childId: string) {
//   // Get child by ID
//   const {
//     data: child,
//     refetch,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: childrenKeys.detail(childId),
//     queryFn: () => childrenAPI.getById(childId),
//     enabled: !!childId,
//   });

//   return {
//     child,
//     refetch,
//     isLoading,
//     error,
//   };
// }

// export function useChildTransactions(childId: string) {
//   // Get transactions for a specific child
//   const {
//     data: transactions,
//     refetch,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: childrenKeys.transactions(childId),
//     queryFn: () => childrenAPI.getTransactions(childId),
//     enabled: !!childId,
//   });

//   return {
//     transactions,
//     refetch,
//     isLoading,
//     error,
//   };
// }

export function useCreateChild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IChild) => childrenAPI.create(data),
    onSuccess: (data) => {
      // Only invalidate queries
      queryClient.invalidateQueries({ queryKey: childrenKeys.lists() });
      if (data && 'parentId' in data) {
        queryClient.invalidateQueries({
          queryKey: childrenKeys.children_by_parent(data.parentId),
        });
      }
    },
  });
}

export function useUpdateChild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IChild }) =>
      childrenAPI.update(id, data),
    onSuccess: (data, variables) => {
      // Only invalidate queries
      queryClient.invalidateQueries({
        queryKey: childrenKeys.detail(variables.id),
      });
      if (data && 'parentId' in data) {
        queryClient.invalidateQueries({
          queryKey: childrenKeys.children_by_parent(data.parentId),
        });
      }
    },
  });
}

export function useDeleteChild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => childrenAPI.delete(id),
    onSuccess: () => {
      // Only invalidate queries
      queryClient.invalidateQueries({ queryKey: childrenKeys.lists() });
    },
  });
}
