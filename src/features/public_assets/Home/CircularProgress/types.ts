export interface NewsItem {
  id: number;
  date: string;
  monthYear: string;
  title: string;
  description: string;
}

export interface ImpactStat {
  value: number;
  label: string;
  color: string;
}