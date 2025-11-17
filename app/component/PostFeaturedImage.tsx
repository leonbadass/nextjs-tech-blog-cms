'use client'
import {useState , JSX } from 'react';
import ImageSelectorModal from './ImageSelectorModal';
import type {Image} from '@/app/types/image';



type PostFeaturedImageProps = {
    selectedImage: Image | undefined;
    setSelectedImage: (image: Image | undefined) => void;
    featuredImageAlt: string| undefined;
    setFeaturedImageAlt: (alt: string) => void;
}

export default function PostFeaturedImage (
    {selectedImage , setSelectedImage,featuredImageAlt , setFeaturedImageAlt}
    : PostFeaturedImageProps): JSX.Element {

    const [isModalOpen, setIsModalOpen] = useState(false);
   


    return(
        <div className="w-full p-2 bg-gray-300 rounded-sm">
           <div className='flex gap-2 mb-2'>
             <p className="text-lg font-semibold ">Featured Image:</p>
            <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-green-600 hover:underline"
                    type='button'
                >
                    {selectedImage ? 'Change Image' : 'Select Image'}
                </button>
                { selectedImage && <button
                    onClick={() => setSelectedImage(undefined)}
                    className="text-red-600 hover:underline"
                    type='button'
                >
                    Remove Image
                </button>}
           </div>
            
                
                <div >
                {selectedImage && (<div className='flex gap-2'>

                    <img src={selectedImage.url} alt={selectedImage.alt_text} 
                    className= "max-h-96 w-2/3" />
                    <div className='w-1/3'>
                    <label className="block text-sm font-medium mb-2">
        SEO Image Alt text:
        <input
          value={featuredImageAlt}
          maxLength={160}
          onChange={e => setFeaturedImageAlt(e.target.value)}
         className="mt-1 block max-h-4 w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        
        />
      </label>
                   
                    </div>

               </div> 
                )}
                </div>
            
            {isModalOpen && (
                <ImageSelectorModal
                    open ={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect ={(image: Image) => {
                        setSelectedImage(image);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    
    
    
    )



}