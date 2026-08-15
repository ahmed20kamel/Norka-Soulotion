import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // "studio" is excluded — the embedded Sanity Studio at /studio is a
  // single admin tool, not a localized public page, so it lives outside
  // src/app/[locale] and shouldn't get redirected to /en/studio.
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
