import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';
import ButtonLoader from '@/components/button-loader';

export default async function page() {
  return (
    <div className="px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <ButtonLoader className="bg-red-600" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
