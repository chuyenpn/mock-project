import * as React from 'react';

import { Head } from '@/components/Head';
import { useAuthStore } from '@/stores/auth';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  pageHeader: string;
};

export const Layout = ({ children, title, pageHeader }: LayoutProps) => {
  const { logout } = useAuthStore();
  return (
    <>
      <Head title={title} />
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center space-between">
          <h1 className="text-white text-2xl text-center"> {pageHeader} </h1>
          <button
            type="button"
            onClick={logout}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow" style={{ minHeight: 'calc(100vh - 146px)' }}>
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
