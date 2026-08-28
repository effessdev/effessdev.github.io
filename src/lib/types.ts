export interface Post {
  id: string;
  title: string;
  description: string;
  draft: boolean;
  updated: string;
  tags: string[];
  content: string;
  slug?: string; // For future use if needed
}
