import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import MenuCard from '@/components/MenuCard';
import { Menu } from '@/types/menu';

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/menus`
        );

        if (!response.ok) {
          throw new Error('メニューの取得に失敗しました');
        }

        const data = await response.json();
        setMenus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return (
    <Layout title='メニュー一覧 - Menu App'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>メニュー一覧</h1>

        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            <p className='mt-4 text-gray-600'>読み込み中...</p>
          </div>
        )}

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md'>
            <p className='font-medium'>エラー</p>
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {!loading && !error && menus.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600'>メニューが登録されていません</p>
          </div>
        )}

        {!loading && !error && menus.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
