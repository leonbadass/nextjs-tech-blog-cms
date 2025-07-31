// app/api/profiles/route.ts
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
   
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Profile[]);
}

//update userprofile
/*
export async function POST(request: NextRequest) {
 const supabase = await createClient();

 const { data: {user} } = await supabase.auth.getUser();
const cookies = request.headers.get('cookie')
  console.log('Cookies:', cookies)


  console.log(user)



  
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
 
  const formData = await request.formData();
  const username = formData.get('username')?.toString();
  const bio = formData.get('bio')?.toString();
  const avatar_url = formData.get('avatar')?.toString()|| null;

  const {data, error } = await supabase.from('profile')
  .update({username, bio, avatar_url})
  .eq('id', user.id)


    if (error) {
    return NextResponse.json({ message: 'Update failed', error }, { status: 500 });
  }

  return NextResponse.json({ message: 'Profile updated', profile: data?.[0] });
}
*/

