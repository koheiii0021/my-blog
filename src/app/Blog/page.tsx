import { PostType } from "@/types";
import Link from "next/link";


async function fetchAllBlogs() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: "no-store",
  });

  const data = await res.json();

  return data.posts;
}

export default async function Blog() {
  const posts = await fetchAllBlogs();


  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex justify-center py-12 px-4">
      <main className="max-w-3xl w-full">
        <h1 className="text-3xl font-thin  text-center mb-12 tracking-wide">
          Blog
        </h1>
        
        <div className="space-y-8">
        
            <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
              {posts.map((post: PostType) => (
                <div
                  key={post.id}>
                    <p>{new Date(post.date).toDateString()}</p>
                    <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                    
                    <p className="text-gray-600 leading-relaxed">{post.description}</p>
                </div>))}
              <div>
                <Link 
                  href={'/blog/edit/1'}
                  className="flex justify-end">
                    編集
                </Link>
              </div>
            </article>
          
        </div>
      </main>
    </div>
  );
}