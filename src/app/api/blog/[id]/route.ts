import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { prisma } from "@/lib/prisma";


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

    const post = await prisma.post.delete({
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

