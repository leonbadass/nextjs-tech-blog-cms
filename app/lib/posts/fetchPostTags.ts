'use server'
import { createClient } from "@/utils/supabase/server";

export default async function fetchPostTags(postId: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("post_tags")
    .select("tag_id") // select only the tag column
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching post tags", error.message, error.code);
    throw new Error(error.message);
  }

  // Map to string[]
  return data?.map(row => row.tag_id) ?? [];
}
