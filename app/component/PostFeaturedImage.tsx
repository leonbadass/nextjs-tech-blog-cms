'use client'
import {useState , JSX } from 'react';
import ImageSelectorModal from './ImageSelectorModal';
import type {Image} from '@/app/types/image';



type PostFeaturedImageProps = {
    selectedImage: Image | null;
    setSelectedImage: (image: Image | null) => void;
}

export default function PostFeaturedImage ({selectedImage , setSelectedImage}: PostFeaturedImageProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
   


    return(
        <div className="w-full mx-auto my-8 p-6 ">
            <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
            <div className="flex flex-col gap-4 items-center mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Select Image
                </button>
                <div>
                {selectedImage && (<div>
                    <img src={selectedImage.url} alt={selectedImage.alt_text} 
                    className= "max-h-96" />

                    <p>Alt Text: {selectedImage.alt_text}</p>
                   <p className='mt-2 text-black'>Image Description: {selectedImage.description}</p>
               </div> )}
                </div>
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