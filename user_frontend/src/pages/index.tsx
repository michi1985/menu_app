import Link from 'next/link'

import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout title="Home - Menu App">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          メニューアプリへようこそ
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          レストランのメニューを閲覧できます
        </p>
        <Link
          href="/menus"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          メニュー一覧を見る
        </Link>
      </div>
    </Layout>
  )
}
