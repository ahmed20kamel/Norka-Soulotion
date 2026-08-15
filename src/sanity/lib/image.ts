import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "", dataset });

// Minimal shape of a Sanity image field as returned by our GROQ
// projections (queries.ts) — narrower than the full `Image` type from the
// "sanity" package, which pulls in Studio-only types we don't need here.
export interface SanityImageRef {
  asset?: { _ref: string };
}

export function urlForImage(source: SanityImageRef | undefined) {
  if (!source?.asset?._ref) return undefined;
  return builder.image(source as Parameters<typeof builder.image>[0]).auto("format").fit("max");
}
