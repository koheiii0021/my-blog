import { PostType } from "@/types";
import Link from "next/link";


export const revalidate = 60;

async function fetchAllBlogs() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/blog`, {
    
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch:", res.status);
    return [];
  }

  const data = await res.json();
  return data.posts || [];
}

export default async function Blog() {
  const posts = await fetchAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex justify-center py-12 px-4">
      <main className="max-w-3xl w-full">
        <h1 className="text-3xl font-thin text-center mb-12 tracking-wide">
          Blog
        </h1>

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post: PostType) => (
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
            <p className="text-center text-gray-500">記事がまだありません</p>
          )}
        </div>
      </main>
    </div>
  );
}

