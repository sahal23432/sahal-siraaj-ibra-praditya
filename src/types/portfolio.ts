export interface PipelineStep {
  step: string;
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  index_code: string;
  year: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  status_badge: string;
  thumbnail_url: string;
  pipeline_steps: PipelineStep[];
  story_behind: string;
  role: string;
  tools: string[];
  live_url: string | null;
  repo_url: string | null;
  is_featured: boolean;
  display_order: number;
  published: boolean;
}

export interface Principle {
  index: string;
  title: string;
  headline: string;
  body: string;
  proof: string;
}

export interface Profile {
  id: number;
  full_name: string;
  headline_greeting: string;
  hero_display_title: string;
  short_bio: string;
  about_markdown: string;
  principles: Principle[];
  avatar_url: string;
  cv_url: string;
  email: string;
  phone_or_whatsapp: string;
  location: string;
  availability_status: string;
  social_links: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Journey {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
}

export interface ContactMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
