import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 ">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={130}
                  height={130}
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl font-thin mb-4">About</h1>
                <p className="text-gray-600 mt-10 text-sm">
                  現在大阪にて秋と冬の匂いが好き
                  <br />
                  2019年より飲食を始める。
                  <br />
                  島根・鳥取・広島・香川・岡山・大阪・京都を経て現在大阪
                  <br />

                  <br />
                  CODで大会とかでてたりして優勝とかしてたり
                  <br />
                  FPS好きな人一緒にゲームしましょ。
                  <br />
                  キャリーできます！！
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 mt-30">
              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  勉強中
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 text-black rounded-full mr-3"></span>
                    React / Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 text-black rounded-full mr-3"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    PostgreSQL
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  趣味
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    ゲーム🎮 Valorant OW2 大好きです💜
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    旅行 🛫🛫🛫
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    温泉♨♨♨
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    音楽 🎧🎧🎧
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
