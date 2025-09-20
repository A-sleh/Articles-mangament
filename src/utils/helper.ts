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
  if(!file) return null
  try {

    const imageBase64 = await convertImageToBase64(file);
    return `data:image/png;base64,${imageBase64}`;
    
  } catch (err) {
    return null
  }
}
