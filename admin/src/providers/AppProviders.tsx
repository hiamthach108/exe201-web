import { useHref, useNavigate } from 'react-router-dom';
import AppRoutes from '../routes';
import { NextUIProvider } from '@nextui-org/react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@/components/Error';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/libs/tanstack-query';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './AuthProviders';

export default function AppProvider() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary fallback={<Error />}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <main className="text-foreground bg-background">
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </main>
          <Toaster
            toastOptions={{
              className: 'font-semibold text-sm',
            }}
          />
        </NextUIProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
