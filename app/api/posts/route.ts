// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Post } from '@/app/types/posts';

export async function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<Post[]>>
{
  const supabase = await createClient();

  const { data, error } = await supabase.from('posts').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Post[]);
}

//createpost INSERT 
