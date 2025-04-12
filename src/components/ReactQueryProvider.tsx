'use client';

import React, { FC, ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryProvider: FC<QueryProviderProps> = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider