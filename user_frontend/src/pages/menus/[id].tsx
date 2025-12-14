import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Menu } from '@/types/menu';

export default function MenuDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/menus/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('メニューが見つかりませんでした');
          }
          throw new Error('メニューの取得に失敗しました');
        }

        const data = await response.json();
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <Layout
      title={menu ? `${menu.name} - Menu App` : 'メニュー詳細 - Menu App'}
    >
      <div>
        <Link
          href='/menus'
          className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-6'
        >
          ← メニュー一覧に戻る
        </Link>

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

        {!loading && !error && menu && (
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='p-8'>
              <div className='flex items-start justify-between mb-6'>
                <div className='flex-1'>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    {menu.name}
                  </h1>
                  <p className='text-lg text-gray-500'>
                    カテゴリー: {menu.category}
                  </p>
                </div>
                <span className='inline-flex items-center px-4 py-2 rounded-full text-2xl font-bold bg-blue-100 text-blue-800'>
                  ¥{menu.price.toLocaleString()}
                </span>
              </div>

              {menu.description && (
                <div className='mb-6'>
                  <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                    説明
                  </h2>
                  <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
                    {menu.description}
                  </p>
                </div>
              )}

              <div className='border-t pt-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>公開状態:</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      menu.is_published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {menu.is_published ? '公開中' : '非公開'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
