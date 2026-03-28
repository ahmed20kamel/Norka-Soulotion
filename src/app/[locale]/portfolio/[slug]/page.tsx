import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectShowcase project={project} locale={locale} />;
}
