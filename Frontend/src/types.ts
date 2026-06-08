export type SocialLink = {
  label: string;
  url: string;
};

export type Profile = {
  founderName: string;
  companyName: string;
  role: string;
  headline: string;
  story: string;
  mission: string;
  location: string;
  email: string;
  website: string;
  availability: string;
  specialties: string[];
  socials: SocialLink[];
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  impact: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  kind: string;
  status: "online" | "draft" | "restricted";
  href?: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: "bearer";
  expires_at: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

