import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const POST = async (req: NextRequest) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  await supabase.auth.signOut();
  return NextResponse.json({ message: "logged out" }, { status: 200 });
};
