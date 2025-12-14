import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Menu App' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Menu application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        <header className='bg-white shadow-sm'>
          <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <div className='flex items-center justify-between'>
              <Link href='/' className='text-2xl font-bold text-gray-900'>
                Menu App
              </Link>
              <Link
                href='/menus'
                className='text-gray-600 hover:text-gray-900 font-medium'
              >
                メニュー一覧
              </Link>
            </div>
          </nav>
        </header>

        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {children}
        </main>

        <footer className='bg-white border-t mt-auto'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <p className='text-center text-gray-500 text-sm'>
              © 2025 Menu App. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
