import { ImpactStat, NewsItem } from "./types";


export const newsData: NewsItem[] = [
  {
    id: 1,
    date: "26",
    monthYear: "JAN 2023",
    title: "Applications now open for ACTIMS Women in Trades Awards/Bursaries Program",
    description: "The ACTIMS Women in Trades Awards/Bursaries Program was created to recognize women who are members of the Canadian Building Trades...",
  },
  {
    id: 2,
    date: "18",
    monthYear: "JAN 2023",
    title: "LU2103 meeting on Jan. 20 is cancelled",
    description: "The regularly scheduled meeting this Thursday January 20 for members of LU2103 hosted in Calgary and Red Deer has been cancelled...",
  },
  {
    id: 3,
    date: "15",
    monthYear: "JAN 2023",
    title: "LU1325 member meeting for January cancelled",
    description: "Members, The LU1325 monthly member meeting scheduled for Wednesday, January 5 has been cancelled...",
  },
];

export const impactData: ImpactStat[] = [
  { value: 45, label: "CODING", color: "#678E1A" },
  { value: 60, label: "SEO & ADS", color: "#f87171" },
  { value: 75, label: "BRANDING", color: "#84cc16" },
  { value: 80, label: "WEB DESIGN", color: "#0a192f" },
];