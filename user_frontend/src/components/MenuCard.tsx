import Link from 'next/link';

import { Menu } from '@/types/menu';

interface MenuCardProps {
  menu: Menu;
}

export default function MenuCard({ menu }: MenuCardProps) {
  return (
    <Link
      href={`/menus/${menu.id}`}
      className='block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden'
    >
      <div className='p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              {menu.name}
            </h3>
            <p className='text-sm text-gray-500 mb-3'>
              カテゴリー: {menu.category}
            </p>
            {menu.description && (
              <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
                {menu.description}
              </p>
            )}
          </div>
          <div className='ml-4'>
            <span className='inline-flex items-center px-3 py-1 rounded-full text-lg font-semibold bg-blue-100 text-blue-800'>
              ¥{menu.price.toLocaleString()}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              menu.is_published
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {menu.is_published ? '公開中' : '非公開'}
          </span>
          <span className='text-sm text-blue-600 font-medium'>
            詳細を見る →
          </span>
        </div>
      </div>
    </Link>
  );
}
