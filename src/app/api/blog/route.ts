import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: NextRequest) => {
    try {
      await main();
      const posts = await prisma.post.findMany({
        orderBy: { date: "desc" }, 
      });
      return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (err) {
      console.error("GETエラー:", err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };

// POST /api/blog
export const POST = async (req: NextRequest) => {
  try {
    const { title, description, image } = await req.json(); 
    await main();
    const post = await prisma.post.create({
      data: { title, description, image },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

