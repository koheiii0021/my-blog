import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase"; 

export const GET = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    await main();
    const post = await prisma.post.findFirst({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    await main();

    
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    
    if (post?.image) {
      try {
        const url = new URL(post.image);
        const filePath = url.pathname.split("/public-images/")[1]; 
        if (filePath) {
          await supabase.storage.from("public-images").remove([filePath]);
          console.log("✅ 画像削除成功:", filePath);
        }
      } catch (err) {
        console.warn("⚠️ 画像削除スキップ:", err);
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
