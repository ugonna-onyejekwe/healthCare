import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(dateString);

  // Default options for a common format
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Merge default options with custom options
  const mergedOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat("en-US", mergedOptions).format(date);
};
