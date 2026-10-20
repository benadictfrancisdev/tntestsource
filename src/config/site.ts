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

export const BRAND_NAME = "Tamil Nadu Export Sourcing";
export const TAGLINE = "Tamil Nadu Manufacturing. Global Opportunities.";
export const CONTACT_EMAIL = "hello@example.com";
export const SITE_URL = "https://example.com";

// Authorized administrator with full access to view, edit, and update all requests
export const ADMIN_EMAIL = "benadictfrancis.dev@gmail.com";

// Social links rendered only if non-empty
export const SOCIALS: SocialLink[] = [];

// Team section rendered only if non-empty
export const TEAM: TeamMember[] = [];
