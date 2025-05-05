'use server';
import { getUserKey } from '@/actions/apiKeys';
import { getCurrentUser } from '@/lib/session';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Create a base axios instance without authentication
const baseApi = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a function that returns an authenticated API instance
export async function getAuthenticatedApi() {
  const user = await getCurrentUser();
  const orgId = user?.id ?? '';
  const apiKey = await getUserKey(orgId);

  // Return a new instance with the API key
  return axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey || '',
      'x-user-id': user?.id || '',
    },
  });
}

// Use this for unauthenticated requests
export { baseApi as api };
