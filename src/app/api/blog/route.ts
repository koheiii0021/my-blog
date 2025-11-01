import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続に失敗しました:", err);
    throw new Error("DB接続に失敗しました");
  }
}

// GET /api/blog
export const GET = async (_req: NextRequest) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// POST /api/blog
export const POST = async (req: NextRequest) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
