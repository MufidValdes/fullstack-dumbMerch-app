import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import numeral from 'numeral';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Contoh penggunaan
export const formatToIDR = (number: number) => {
  return 'Rp ' + numeral(number).format('Rp0,0');
};

// console.log(formatToIDR(12000000)); // Output: "Rp12.000.000"
