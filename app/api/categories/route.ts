// app/api/profiles/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Category } from '@/app/types/category';

export async function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<Category[]>>
{
  const supabase = await createClient();

  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
   
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Category[]);
}


import { slugify } from '@/app/lib/slugify';

export async function POST(request: Request) {
  const supabase = await createClient()
  const { categoryName, categorySlug, description } = await request.json()

  if (!categoryName) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  // Generate slug if not provided
  let finalSlug = categorySlug ? categorySlug : slugify(categoryName)

  // Ensure slug is unique
  let counter = 1
  while (true) {
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle()

    if (!existing) break
    finalSlug = `${finalSlug}-${counter++}`
  }

  // Insert category
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name: categoryName, slug: finalSlug, description: description }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: data as Category }, { status: 201 })
}




