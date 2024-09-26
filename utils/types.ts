
export interface Talk {
  id: number;
  created_at: string;
  title: string;
  subtitle: string;
  slug: string;
  keywords: string[];
  shareable: boolean;
  published: boolean;
  image: string;
  image_alt: string;
}

