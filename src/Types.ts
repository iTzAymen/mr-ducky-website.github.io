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
  isNew?: boolean; // Optional property to indicate if the project is new
  featured?: boolean; // Gets the hero-sized featured card in the games section
  archived?: boolean; // Moved into the compact "From the archive" list
  badge?: string; // Extra callout badge, e.g. "BIGGEST HIT"
  collab?: boolean; // Shows the "COLLAB" pill on the game card
}
