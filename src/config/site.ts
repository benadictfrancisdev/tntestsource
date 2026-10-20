/**
 * Single Source of Truth for Tamil Nadu Export Sourcing
 * Core brand configuration and admin access
 */

export interface SocialLink {
  platform: string;
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export const BRAND_NAME = "Connect HF";
export const TAGLINE = "Your Sourcing Partner for Products Made in India";
export const CONTACT_EMAIL = "hello@example.com";
export const SITE_URL = "https://example.com";

// Authorized administrator with full access to view, edit, and update all requests
export const ADMIN_EMAIL = "benadictfrancis.dev@gmail.com";

// Social links rendered only if non-empty
export const SOCIALS: SocialLink[] = [];

// Team section rendered only if non-empty
export const TEAM: TeamMember[] = [];
