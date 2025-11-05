import Image from "next/image";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                連絡先情報
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Image
                    className="mr-4"
                    src="/contact.png"
                    alt="Mail"
                    width={40}
                    height={40}
                    priority
                  />
                  <div>
                    <p className="font-semibold text-gray-700">メール</p>
                    <p className="text-gray-600">xxxxxxxx@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    className="mr-4"
                    src="/phone.png"
                    alt="Phone"
                    width={40}
                    height={40}
                    priority
                  />
                  <div>
                    <p className="font-semibold text-gray-700">電話</p>
                    <p className="text-gray-600">000-0000-0000</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    className="mr-4"
                    src="/addres.png"
                    alt="Addres"
                    width={40}
                    height={40}
                    priority
                  />
                  <div>
                    <p className="font-semibold text-gray-700">所在地</p>
                    <p className="text-gray-600">へのへのねこいぬ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                お問い合わせフォーム
              </h2>
              <form className="space-y-4 text-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お名前
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="お名前を入力してください"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="メールアドレスを入力してください"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージ
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="メッセージを入力してください"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  送信
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
