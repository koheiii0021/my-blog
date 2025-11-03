"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { PostType } from "@/types";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { createPortal } from "react-dom";
import LogoutButton from "../components/LogoutButton";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 定数
const HEADER_HEIGHT = 320;
const OVERLAP = HEADER_HEIGHT * 1;

export default function Blog() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // 投稿モーダル
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 編集モーダル
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    (async () => {
      const { data } = await client.auth.getSession();
      setIsAdmin(!!data.session);
    })();
  }, []);

  
  const [windowInfo, setWindowInfo] = useState({
    scrollY: 0,
    innerHeight: 0,
  });
  useEffect(() => {
    const update = () =>
      setWindowInfo({
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
      });
    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);


    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // 投稿取得
  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  // Supabase 画像アップロード
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `blog-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("public-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) return console.error("Upload Error:", error), null;
    const { data: urlData } = supabase.storage
      .from("public-images")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    let imageUrl = null;
    if (image) imageUrl = await uploadImage(image);

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

  // 編集保存
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    let imageUrl = editingPost.image;
    if (image) imageUrl = await uploadImage(image);

    try {
      const res = await fetch(`/api/blog/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingPost.title,
          description: editingPost.description,
          image: imageUrl,
        }),
      });
      if (!res.ok) throw new Error("更新に失敗しました");

      const updated = await res.json();
      setPosts((p) =>
        p.map((post) =>
          String(post.id) === String(updated.post.id) ? updated.post : post
        )
      );
      setIsEditModalOpen(false);
      setEditingPost(null);
    } catch (err) {
      console.error(err);
      alert("更新時にエラーが発生しました");
    }
  };

  // 削除
  const handleDelete = async (id: string | number) => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("削除に失敗しました");
      setPosts((p) => p.filter((post) => String(post.id) !== String(id)));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  };

  // ファイルアップロード
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const { scrollY, innerHeight } = windowInfo;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex justify-center py-12 px-4 relative">
      <LogoutButton />
      <main className="max-w-3xl w-full">
        <h1 className="text-3xl font-thin text-center mb-12 tracking-wide">
          Blog
        </h1>

        {/* 投稿リスト */}
        <div className="space-y-8">
          {loading ? (
            <p className="text-center text-gray-400">読み込み中...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8"
              >
                <p className="mb-4 text-sm text-gray-500">
                  {isClient ? new Date(post.date).toLocaleDateString() : ""}
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
                <p className="text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">
                  {post.description}
                </p>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-gray-100 active:scale-95"
                    >
                      <Image
                        src="/edit.png"
                        alt="編集"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                )}
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500">記事がまだありません</p>
          )}
        </div>
      </main>

      {/* 投稿ボタン */}
      {isClient &&
        isAdmin &&
        createPortal(
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed top-20 right-5 md:top-auto md:bottom-10 md:right-20 bg-white border border-gray-300/70 shadow-md hover:shadow-lg rounded-full p-2 text-gray-700 transition-all z-50"
          >
            <Image src="/post.png" alt="投稿" width={50} height={50} />
          </button>,
          document.body
        )}

      {/* 編集モーダル */}
      {isEditModalOpen && editingPost && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div
            className="absolute left-1/2 bg-white rounded-xl p-6 w-96 max-h-[90vh] overflow-y-auto shadow-lg"
            style={{
              top: innerHeight / 2 + scrollY - OVERLAP,
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2 className="text-xl font-semibold mb-4">記事を編集</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
              <textarea
                value={editingPost.description}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2 h-24"
              />
              {editingPost.image && (
                <Image
                  src={editingPost.image}
                  alt="preview"
                  width={300}
                  height={200}
                  className="mx-auto rounded-lg shadow-sm"
                />
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => handleDelete(String(editingPost.id))}
                  className="px-4 py-2 text-red-500 hover:text-red-700"
                >
                  削除
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 投稿モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div
            className="absolute left-1/2 bg-white rounded-xl p-6 w-96 max-h-[90vh] overflow-y-auto shadow-lg"
            style={{
              top: innerHeight / 2 + scrollY - OVERLAP,
              transform: "translate(-50%, -50%)",
            }}
          >
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
                  e.currentTarget.classList.add(
                    "border-blue-400",
                    "bg-blue-50"
                  );
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-blue-400",
                    "bg-blue-50"
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file?.type.startsWith("image/")) {
                    setImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                  e.currentTarget.classList.remove(
                    "border-blue-400",
                    "bg-blue-50"
                  );
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
