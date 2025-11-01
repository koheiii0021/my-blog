import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

// ✅ GET
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   
) => {
  try {
    const { id } = await params;                     
    await main();

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
      select: { id: true, title: true, description: true, date: true, image: true },
    });

    if (!post) return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ✅ PUT
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }    
) => {
  try {
    const { id } = await params;                     
    const { title, description, image } = await req.json();

    await main();
    const post = await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: { title, description, image },
      select: { id: true, title: true, description: true, date: true, image: true },
    });

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ✅ DELETE
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }    
) => {
  try {
    const { id } = await params;                     
    await main();

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
      select: { image: true },
    });

    await prisma.post.delete({ where: { id: parseInt(id, 10) } });

    if (post?.image) {
      try {
        const url = new URL(post.image);
        const filePath = url.pathname.split("/public-images/")[1];
        if (filePath) {
          await supabase.storage.from("public-images").remove([filePath]);
          console.log("✅ Supabase画像削除成功:", filePath);
        }
      } catch (err) {
        console.warn("⚠️ Supabase画像削除スキップ:", err);
      }
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.error("削除エラー:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
