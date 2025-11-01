"use client";

import { useEffect, useState } from "react";
import { PostType } from "@/types";
import Link from "next/link";

export default function Blog() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex justify-center py-12 px-4 transition-all duration-500">
      <main className="max-w-3xl w-full">
        <h1 className="text-3xl font-thin text-center mb-12 tracking-wide">
          Blog
        </h1>

        {/* ✅ ローディング中はスケルトン（ダミー）表示 */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-8 space-y-3"
              >
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ ローディング後に実データ表示 */}
        {!loading && (
          <div className="space-y-8 transition-all duration-300">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8"
                >
                  <p>{new Date(post.date).toDateString()}</p>
                  <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex justify-end mt-4">
                    <Link href={`/blog/edit/${post.id}`}>編集</Link>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-500">
                記事がまだありません
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
