import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/sanity/lib/fetch-content";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";

// Deliberately no generateStaticParams here (pre-existing issue, not
// something this migration introduced): src/app/[locale]/layout.tsx calls
// next-intl's getMessages(), which reads a dynamic API for locale
// detection. Every other route under [locale] is consequently rendered
// on-demand (marked "ƒ" in the build output) — statically prerendering
// just this one leaf conflicts with that and throws
// DYNAMIC_SERVER_USAGE on any slug not in the (empty, for the same
// reason) static param set. Rendering on-demand like its siblings avoids
// the conflict entirely; per-request cost here is a single project
// lookup, not worth fighting the static/dynamic mismatch for.
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectShowcase project={project} locale={locale} />;
}
