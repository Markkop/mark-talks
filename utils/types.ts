
export interface Article {
  id: number;
  created_at: string;
  blog_html: string;
  blog_markdown: string;
  thumbnail: string;
  thumbnail_alt: string;
  image: string;
  image_alt: string;
  title: string;
  subtitle: string;
  slug: string;
  keywords: string[];
  shareable: boolean;
  published: boolean;
}

