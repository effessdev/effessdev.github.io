export interface Post {
  id: string;
  title: string;
  description: string;
  updated: string;
  tags: string[];
  content: string;
  slug?: string; // For future use if needed
}
