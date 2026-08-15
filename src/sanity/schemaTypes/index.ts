import { type SchemaTypeDefinition } from "sanity";

import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import localeStringList from "./objects/localeStringList";
import project from "./project";
import service from "./service";
import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, localeStringList, project, service, testimonial],
};
