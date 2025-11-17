
import { NextResponse } from "next/server";
import ImageUploader from "@/app/component/ImageUploader";
import type { Image } from "@/app/types/image";
import ImageModalViewer from "@/app/component/ImageModalViewer";


export default async function GalleryPage() {
   // const file = null; // Placeholder for file handling logic

   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;



    const   res = await fetch(`${baseUrl}/api/images`,  
     { cache: "no-store",
    })

   

    if(res instanceof Error || !res.ok  ) {
        
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }

    const images = await res.json();


    return (<div className="w-full" >
        <h1 className="text-2xl font-bold text-center my-8">Gallery</h1>
        <div className="w-full">
           <div className="w-full">
            
            <ImageUploader />
            <ImageModalViewer images={images.map((image: Image) => image.url)} />   
           </div>
           
           

        </div>
        

       
    </div>)
}