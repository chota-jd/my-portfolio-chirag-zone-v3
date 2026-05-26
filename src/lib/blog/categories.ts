/** Default categories for the admin blog generator (also created in Sanity if missing). */
export const BLOG_CATEGORIES = [
  'Travel',
  'Tech Industry – India',
  'Tech Industry – Global',
  'AI',
] as const;

export type BlogCategoryName = (typeof BLOG_CATEGORIES)[number];
