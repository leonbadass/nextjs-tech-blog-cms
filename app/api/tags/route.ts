// app/api/profiles/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Category } from '@/app/types/category';
import { sanitizePost } from '@/app/lib/sanitize';

export async function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<Category[]>>
{
  const supabase = await createClient();

  const { data, error } = await supabase.from('tags').select('*');

  if (error) {
   
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Category[]);
}


import { slugify } from '@/app/lib/slugify';

export async function POST(request: Request) {
  const supabase = await createClient()
  const { tagName, tagSlug, description } = await request.json()

  if (!tagName) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  // Generate slug if not provided
  let finalSlug = tagSlug ? tagSlug : slugify(tagName)

  // Ensure slug is unique
  let counter = 1
  while (true) {
    const { data: existing } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle()

    if (!existing) break
    finalSlug = `${finalSlug}-${counter++}`
  }

  // Sanitize description
  const sanitizedDescription = sanitizePost(description || "")  

  

  // Insert category
  const { data, error } = await supabase
    .from("tags")
    .insert([{ name: tagName, slug: finalSlug, description: sanitizedDescription }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: data as Category }, { status: 201 })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("tags")
    .delete()
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: data as Category }, { status: 200 })
}


//update tags
export async function PUT(request: Request) {
  const supabase = await createClient()
  const { id,name, slug, description } = await request.json()

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  // Generate slug if not provided
  let finalSlug = slug ? slug : slugify(name)

  // Ensure slug is unique
  let counter = 1
  while (true) {
    const { data: existing } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", finalSlug)
      .neq("id", id) // Exclude current category
      .maybeSingle()

    if (!existing) break
    finalSlug = `${finalSlug}-${counter++}`
  }

  // Sanitize description
  const sanitizedDescription = sanitizePost(description || "")

  // Update category
  const { data, error } = await supabase
    .from("tags")
    .update({ name: name, slug: finalSlug, description: sanitizedDescription, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: data as Category }, { status: 200 })
}



