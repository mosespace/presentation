'use client';

import React from 'react';
import { Toaster } from '@mosespace/toast';
import { SessionProvider } from 'next-auth/react';
import QueryProvider from '@/lib/query-provider';

interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        {children}
        <Toaster position="bottom-right" />
      </QueryProvider>
    </SessionProvider>
  );
}
