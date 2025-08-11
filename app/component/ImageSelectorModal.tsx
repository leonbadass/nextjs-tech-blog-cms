import { JSX , useState, useEffect } from 'react';
import type { Image } from '@/app/types/image';

type ImageSelectorModalProps = {
    open: boolean;
    onSelect: (image: Image) => void;
    onClose: () => void;
    };


export default function ImageSelectorModal ({open , onSelect , onClose}: ImageSelectorModalProps): JSX.Element | null {

    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
    
        const fetchImages = async ()=>{
            setLoading(true);
            try{
                const res = await fetch('http://localhost:3000/api/images');
                if (!res.ok) {
                    throw new Error('Failed to fetch images');
                
                }
                const data: Image[] = await res.json();
                setImages(data);
                setLoading(false);

            } catch (error: any) {
                setError(error.message);
            throw new Error('Error fetching images: ' + error);
            
        }
    }
        fetchImages();
        
    },[])

if (!open) {
        return null;
    }


    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Select an Image</h2>

        {loading && <p>Loading images...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading &&
            !error &&
            images.map((img) => (
              <div key={img.id} className="border rounded-lg overflow-hidden">
                <img
                  src={img.url}
                  alt={img.alt_text || "Image"}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-center">
                  <button
                    onClick={() => {
                      onSelect(img);
                      onClose();
                    }}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    )

}