
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Faild to convert file to base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading the file"));
    };

    reader.readAsDataURL(file);
  });
};

export async function getFileUrl(file: File): Promise<string | null> {

  const maxFileSize = 2097152; // 1024 * 1024 < == > 2MB

  if(!file) return null
  try {
    
    // Check the file if greater than 2 Mb
    if(file.size > maxFileSize) {
      throw new Error("Image size must be less than 2 Mb")
    }

    const imageBase64 = await convertImageToBase64(file);
    return `data:image/png;base64,${imageBase64}`;
    
  } catch (err) {
    // Check the file if greater than 2 Mb
      throw new Error((err as Error).message)
    
  }
}


   

