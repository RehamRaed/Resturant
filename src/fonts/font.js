import { Merienda } from "next/font/google";
import { IBM_Plex_Sans } from 'next/font/google';

export const merienda = Merienda({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});