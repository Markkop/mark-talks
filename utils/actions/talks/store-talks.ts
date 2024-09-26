"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { nanoid } from 'nanoid';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const storeTalks = async (
  title: string,
  subtitle: string,
  slug: string,
  description: string,
  keywords: string[],
  image: string,
  image_alt: string
) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

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
    const generatedSlug = `${slug || title.toLowerCase().replace(/\s+/g, '-')}-${nanoid(6)}`;

    const { data, error } = await supabase
      .from("Talk")
      .insert([
        {
          title,
          subtitle,
          slug: generatedSlug, // Use the generated slug
          description,
          keywords,
          image,
          image_alt,
          user_id: userId,
          created_at: new Date().toISOString(), // Add this line
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting talk:", error);
      return { error: error.message };
    }

    console.log("Inserted talk:", data);

    revalidatePath('/cms')

    return { data };
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
};
