"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "@/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Vision lets editors run raw GROQ queries from within Studio — handy
    // for debugging, harmless to leave in for a small marketing site.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
