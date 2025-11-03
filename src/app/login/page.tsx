"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("ログインに失敗しました：" + error.message);
      return;
    }


    window.location.href = "/Blog";
  };

  const handleGuestLogin = async () => {
    setError("");

    // ゲストユーザーの認証情報
    const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL || "guest@example.com";
    const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD || "guest123456";

    const { error } = await supabase.auth.signInWithPassword({
      email: guestEmail,
      password: guestPassword,
    });

    if (error) {
      setError("ゲストログインに失敗しました：" + error.message);
      return;
    }

    window.location.href = "/Blog";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          管理者ログイン
        </h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          ログイン
        </button>
        <div className="mt-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mt-4"
        >
          ゲストでログイン
        </button>
      </form>
    </div>
  );
}
