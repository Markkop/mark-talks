export interface Talk {
  id?: string;
  created_at?: string;
  title?: string;
  subtitle?: string;
  slug: string;
  keywords: string[];
  shareable?: boolean;
  published?: boolean;
  image?: string;
  image_alt?: string;
  location?: string;
  description?: string;
  presentation_link?: string;
  feedback_link?: string;
  talk_html?: string;
  user_id?: string;
  date?: string;
}