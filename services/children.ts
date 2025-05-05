import {
  createChild,
  deleteChild,
  getChildrenByParentId,
  IChild,
  updateChild,
} from '@/actions/children';
import {
  createTransaction,
  ITransaction
} from '@/actions/wallets';

// API client that uses server actions
export const childrenAPI = {
 // Get children by parent ID
 getChildrenByParentId: async (parentId: string) => {
  const response = await getChildrenByParentId(parentId);
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch children');
  }
  return response.data;
},

// Get child by its ID
// getById: async (id: string) => {
//   const response = await getChildById(id);
//   if (!response.success) {
//     throw new Error(response.error || 'Failed to fetch child');
//   }
//   return response.data;
// },

// Create a new child
create: async (data: IChild) => {
  const response = await createChild(data);
  if (!response.success) {
    throw new Error(response.error || 'Failed to create child');
  }
  return response.data;
},

// Update an existing child
update: async (id: string, data: IChild) => {
  const response = await updateChild(id, data);
  if (!response.success) {
    throw new Error(response.error || 'Failed to update child');
  }
  return response.data;
},

// Delete a child
delete: async (id: string) => {
  const response = await deleteChild(id);
  if (!response.success) {
    throw new Error(response.error || 'Failed to delete child');
  }
  return true;
},

// Get child transactions
// getTransactions: async (childId: string) => {
//   const response = await getChildTransactions(childId);
//   if (!response.success) {
//     throw new Error(response.error || 'Failed to fetch transactions');
//   }
//   return response.data;
// },

// Create a new transaction
createTransaction: async (data: ITransaction) => {
  const response = await createTransaction(data);
  if (!response.success) {
    throw new Error(response.error || 'Failed to create transaction');
  }
  return response.data;
},
};
