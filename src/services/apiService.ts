const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImageForDetection = async (imageFile: File): Promise<any> => {
  // console.log('API_URL:', API_URL);
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_URL}/detect`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image detection failed');
  }
  const data = await response.blob();
  return data;
};