'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageModalViewer({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [toDelete, setToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const router = useRouter();
 
  // ...existing code...
const handleDelete = async (imgUrl: string) => {
  setIsDeleting(true);
  setToDelete(imgUrl);
  try {
    const response = await fetch('http://localhost:3000/api/images', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: imgUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    alert('Image deleted successfully');

    
  } catch (error) {
    alert('Error deleting image');
    console.error('Error deleting image:', error);
  } finally {
    setIsDeleting(false);
    router.refresh();
  }
};


  return (
    <>
      <div className="flex gap-4 flex-wrap p-4">
        {images.map((img, index) => (
          <div key={index} className="rounded-lg shadow-md ">
          
            <img src={img} className="max-w-60 h-60 w-60 " />
        
            <button
              onClick={() => setSelectedImage(img)}
               className='text-sm  text-blue-300  px-3 py-1 rounded hover:text-blue-900 hover:underline ml-2'
            >
              View Image
            </button>
            <button onClick ={()=> handleDelete(img) } 
            disabled= {isDeleting} 
            className='text-sm  text-red-600  px-3 py-1 rounded hover:text-red-900 hover:underline ml-2'>
                {toDelete=== img && isDeleting? 'Deleting..': 'Delete'}
                </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl">
            <img src={selectedImage} alt="Expanded view" className="max-w-full max-h-[80vh]" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
