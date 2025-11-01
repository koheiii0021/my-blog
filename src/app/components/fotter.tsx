import Link from "next/link";
import Image from "next/image";

export default function Fotter() {
  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div>
            <p className="text-gray-600 mb-4"></p>
            <div className="flex flex-row justify-center gap-6 mt-8 mb-8 md:grid md:grid-cols-3">
              {/* ブログページへのリンク */}
              <Link href="/Blog" className="text-center group cursor-pointer">
                <div className="bg-white rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src="/blog.png"
                    alt="Blog"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  ブログ
                </h3>
                <p className="text-sm text-gray-600">日常の記録と思考</p>
              </Link>

              {/* Aboutページへのリンク */}
              <Link href="/Home" className="text-center group cursor-pointer">
                <div className="bg-white rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src="/home.png"
                    alt="Profile"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  Home
                </h3>
                <p className="text-sm text-gray-600">帰りたい人はこちら</p>
              </Link>

              {/* お問い合わせページへのリンク */}
              <Link
                href="/Contact"
                className="text-center group cursor-pointer"
              >
                <div className="bg-white rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src="/contact.png"
                    alt="Contact"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  お問い合わせ
                </h3>
                <p className="text-sm text-gray-600">ご連絡はこちらから</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <p className="text-gray-600 text-center text-xs">
        ©2025 Kohei Kamigagari
      </p>
    </div>
  );
}
