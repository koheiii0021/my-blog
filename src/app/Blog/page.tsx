"use client";

import { useState, useEffect } from "react";
import { PostType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Blog() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog", { cache: "no-store" });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Supabase Storage へ画像アップロード
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `blog-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("public-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload Error:", error);
      return null;
    }

    // 公開URLを取得
    const { data: urlData } = supabase.storage
      .from("public-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image: imageUrl }),
      });

      if (!res.ok) throw new Error("投稿に失敗しました");

      const data = await res.json();
      setPosts([data.post, ...posts]);
      setTitle("");
      setDescription("");
      setImage(null);
      setPreviewUrl(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex justify-center py-12 px-4 relative">
      <main className="max-w-3xl w-full">
        <h1 className="text-3xl font-thin text-center mb-12 tracking-wide">
          Blog
        </h1>

        {/* 投稿一覧 */}
        <div className="space-y-8">
          {loading ? (
            <p className="text-center text-gray-400">読み込み中...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8"
              >
                <p className="mb-2 text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>

                {post.image && (
                  <div className="my-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    />
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed mt-2">
                  {post.description}
                </p>
                <div className="flex justify-end mt-4">
                  <Link href={`/blog/edit/${post.id}`}>編集</Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500">記事がまだありません</p>
          )}
        </div>
      </main>

      {/* 投稿ボタン */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-30 right-20 bg-white border border-gray-300/70 shadow-md hover:shadow-lg rounded-full p-2 text-gray-700 transition-all"
      >
        <Image src="/post.png" alt="投稿" width={50} height={50} />
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">新しい投稿</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトル"
                className="w-full border rounded-lg p-2"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="本文"
                className="w-full border rounded-lg p-2 h-24"
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.add(
                    "border-blue-400",
                    "bg-blue-50"
                  );
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.remove(
                    "border-blue-400",
                    "bg-blue-50"
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.remove(
                    "border-blue-400",
                    "bg-blue-50"
                  );

                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    setImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-all duration-300"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="text-gray-500 text-sm cursor-pointer select-none"
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="preview"
                      width={300}
                      height={200}
                      className="mx-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    />
                  ) : (
                    <>
                      <p className="text-gray-400">
                        クリックまたはドラッグ＆ドロップで画像を追加
                      </p>
                      <p className="text-xs text-gray-300 mt-1">(最大 5MB )</p>
                    </>
                  )}
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  投稿
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
