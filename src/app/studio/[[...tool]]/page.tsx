import { NextStudio } from "next-sanity/studio";
import type { Metadata } from "next";
import config from "../../../../sanity.config";
import { sanityConfigured } from "@/sanity/env";

// Admin tool, not a public marketing page — keep it out of search results
// and off the localized route tree (see the matcher comment in proxy.ts).
export const metadata: Metadata = {
  title: "Norka Solution — Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export default function StudioPage() {
  // Studio can't render at all without real Sanity credentials (its
  // internal client throws on an empty projectId) — show a plain
  // explanation instead of a raw framework error before that's set up.
  if (!sanityConfigured) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "80px auto", padding: "0 24px", color: "#0f172a" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Studio isn&apos;t configured yet</h1>
        <p style={{ lineHeight: 1.6, marginBottom: 8 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) in <code>.env.local</code>, then
          restart the app to use the content editor here.
        </p>
        <p style={{ lineHeight: 1.6 }}>See the Sanity setup steps in README.md.</p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
