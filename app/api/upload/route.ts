// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuid } from 'uuid';


export async function GET() {
  const supabase = await createClient();

  const { data , error } =  await supabase.storage
    .from('avatar')
    .list('',  {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
})
if (error|| !data) {
    console.error('Error fetching files:', error.message);
}


     const imageUrls = data?.map((element) => {
      if (!element.name) return;
    const { data } = supabase
      .storage
      .from('avatar')
      .getPublicUrl(element.name);

    return data.publicUrl;
  });

  return new Response(JSON.stringify(imageUrls), {
    status: 200,
  });
 

}




export async function POST(request: Request) {

const supabase = await createClient();

  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Optional: check file type and size
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExt = file.name.split('.').pop();
  const filename = `${uuid()}.${fileExt}`;

  // Upload to Supabase Storage (e.g., bucket: "images")
  const { data: uploadData, error } = await supabase.storage
    .from('avatar')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
     console.log('error:', error.message )
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
 

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('avatar').getPublicUrl(filename);

  return NextResponse.json({
    message: 'Upload successful',
    url: publicUrl,
  });
}
