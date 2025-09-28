// app/lib/fetchImageUsingUrl.ts
"use server"

import { createClient } from "@/utils/supabase/server"

export default async function fetchImageUsingUrl(url: string) {
  const supabase = await createClient()
if(url === '') return;
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("url", url)
    .maybeSingle() // safer: returns null if no match, error only if >1

  if (error) {
    console.error("Error fetching image:", error.message, error.code)
    throw new Error(error.message)
  }

  return data // either the image row object or null
}
