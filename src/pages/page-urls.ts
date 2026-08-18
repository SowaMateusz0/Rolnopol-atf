export const PAGE_URLS = {
  home: "",
  login: "/login.html",
  registration: "/register.html",
} as const;

export type PageUrl = (typeof PAGE_URLS)[keyof typeof PAGE_URLS];