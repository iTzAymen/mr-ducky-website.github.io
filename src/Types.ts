export interface ProjectData {
  universeId: string;
  placeId: string;
  name: string;
  description: string;
  created: string;
  visits: number;
  favorites: number;
  thumbnails: string[];
  playing: number;
  noFetch: boolean;
}
