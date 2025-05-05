import React, { Suspense } from 'react';
import { getCurrentUser } from '@/lib/session';
import ButtonLoader from '@/components/button-loader';
import ChildrenPage from './children-page';

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <ButtonLoader className="bg-red-600" />
        </div>
      }
    >
      <ChildrenPage userId={currentUser?.id as string} />
    </Suspense>
  );
}
