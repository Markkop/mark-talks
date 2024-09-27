"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getAllPublishedTalks = async () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("Talk")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true });
    if (error?.code) return [];

    return data || [];
  } catch (error: any) {
    console.error("Error fetching published talks:", error);
    return [];
  }
};