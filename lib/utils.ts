import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹ ${(price / 100000).toFixed(2)} L`;
  } else {
    return `₹ ${price.toLocaleString()}`;
  }
};
