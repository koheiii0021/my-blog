import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/blog/[id]
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = parseInt(params.id);
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT /api/blog/[id]
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = parseInt(params.id);
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE /api/blog/[id]
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = parseInt(params.id);
    await main();
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
