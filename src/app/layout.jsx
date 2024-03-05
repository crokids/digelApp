import React from 'react';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const RootLayout = ({ children }) => (
  <html lang="pt-BR" className='flex h-full w-full'>
    <ClerkProvider>
    <body className='flex h-full w-full'>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
    </ClerkProvider>
  </html>
);

export default RootLayout;
