import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "../env";

let _client: SanityClient | undefined;

/**
 * Lazily constructs the client on first use. `next-sanity`'s createClient
 * throws immediately if projectId is empty, so this must never run at
 * module-eval time — every caller checks `sanityConfigured` first and only
 * calls this once it's true.
 */
export function getClient(): SanityClient {
  if (!sanityConfigured) {
    throw new Error("getClient() called without a configured Sanity project — check sanityConfigured first.");
  }
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      // Only needed for draft/private content; public reads work without it.
      token: process.env.SANITY_API_TOKEN,
      perspective: "published",
    });
  }
  return _client;
}
