"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("ログアウトに失敗しました");
    } else {
      router.push("/");
    }
  };

  if (!isLoggedIn || !isClient) {
    return null;
  }

  return createPortal(
    <button
      onClick={handleLogout}
      className="fixed top-40 right-5 md:top-auto md:bottom-10 md:right-3 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-full p-2 transition-all z-50"
    >
      <Image src="/logout.png" alt="ログアウト" width={50} height={50} />
    </button>,
    document.body
  );
}
