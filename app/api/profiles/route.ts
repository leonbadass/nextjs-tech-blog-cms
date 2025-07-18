// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Profile } from '@/app/types/profiles';

export async function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<Profile[]>>
{
  const supabase = await createClient();

  const { data, error } = await supabase.from('profile').select('*');

  if (error) {
    console.error("🔥 Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Profile[]);
}
