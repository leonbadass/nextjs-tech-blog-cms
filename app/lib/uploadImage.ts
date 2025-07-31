// lib/uploadImage.ts

export default async function uploadImage(file: File): Promise<{ url: string } | Error > {
  if (!file) return new Error('Error: No file provided') 

  const formData = new FormData();
  formData.append('file', file);

  try {
    


    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });
      

    const result = await res.json();
    if (!res.ok) return new Error(result.error || 'Upload failed');
    return result;
  } catch {
    return new Error ('Network error') 
  }
}
