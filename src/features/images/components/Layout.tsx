import * as React from 'react';

import { Head } from '@/components/Head';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  pageHeader: string;
};

export const Layout = ({ children, title, pageHeader }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl text-center"> {pageHeader} </h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-white text-center">
          &copy; 2023 Mock Project. All rights reserved.
        </div>
      </footer>
    </>
  );
};
