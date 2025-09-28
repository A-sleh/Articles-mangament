import React from "react";
import { Range } from "../stores/Working-hours-store/WorkingHoursStore";

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
  const maxFileSize = 1048576; //   < == > 1MB

  if (!file) return null;
  try {
    // Check the file if greater than 2 Mb
    if (file.size > maxFileSize) {
      throw new Error("Image size must be less than 1 Mb");
    }
    const type = file.type.split("/")[1];

    const imageBase64 = await convertImageToBase64(file);
    return `data:image/${type};base64,${imageBase64}`;
  } catch (err) {
    // Check the file if greater than 2 Mb
    throw new Error((err as Error).message);
  }
}

export function genterateTimes(maxValue: number): string[] {
  const times = [];
  for (let time = 0; time < maxValue; time++) {
    const hourStr = time.toString().padStart(2, "0");
    times.push(`${hourStr}`);
  }
  return times;
}

export function delayChangeState(
  setFc: React.Dispatch<React.SetStateAction<boolean>>
) {
  setFc(true);
  setTimeout(() => setFc(false), 500);
}

export function isTimeRangeValid(
  firstRange: Range,
  secondRange: Range
): boolean {
  const frStart = Number(firstRange.start.hours) * 60 + Number(firstRange.start.minutes);
  const frEnd = Number(firstRange.end.hours) * 60 + Number(firstRange.end.minutes);

  const srStart = Number(secondRange.start.hours) * 60 + Number(secondRange.start.minutes);
  const srEnd = Number(secondRange.end.hours) * 60 + Number(secondRange.end.minutes);

  // Check if ranges overlap or touch
  return frStart <= srEnd && srStart <= frEnd;
}
