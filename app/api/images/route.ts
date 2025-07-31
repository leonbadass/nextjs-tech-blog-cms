
import {createClient} from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { Image } from '@/app/types/image';
import { revalidatePath } from 'next/cache';



export async function GET() {
    const supabase = await createClient();

    // Fetch images from the 'images' table
    const { data, error } = await supabase.from('images').select('*');

    if (error) {
        console.error('Error fetching images:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the fetched images
    return NextResponse.json(data, { status: 200 });  
}

export async function DELETE (request: Request): Promise<NextResponse> {
    const supabase = await createClient();
    
    const imageUrl = await request.json().then(data => data.url);

    if (!imageUrl) {
        return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Delete the image from the 'images' table
    const { data, error } = await supabase.from('images').delete().eq('url', imageUrl);

    if (error) {
        console.error('Error deleting image:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/admin/gallery");

    return NextResponse.json({ message: 'Image deleted successfully', data }, { status: 200 });
}


export async function POST(request: Request) {

const supabase = await createClient();

  const imageData: Image =  await request.json();
  



  const { data , error } = await supabase.from('images').insert({
    url: imageData.url,
    alt_text: imageData.alt_text,
    description: imageData.description,
    uploaded_by: imageData.uploaded_by,
  
    });

  if (error) {
     console.log('error:', error.message )
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
   revalidatePath("/admin/gallery")
    // Return the uploaded image data
    return NextResponse.json(
        { message: 'Image uploaded successfully', data: data },
        { status: 200 }
    );
    
 
}
