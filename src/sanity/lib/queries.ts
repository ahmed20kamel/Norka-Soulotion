import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, _createdAt asc) {
    "slug": slug.current,
    category,
    featured,
    image,
    screenshots,
    techStack,
    title,
    description,
    fullDescription,
    challenge,
    solution,
    results,
    features,
    demoUrl,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    category,
    featured,
    image,
    screenshots,
    techStack,
    title,
    description,
    fullDescription,
    challenge,
    solution,
    results,
    features,
    demoUrl,
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    key,
    title,
    description,
    features,
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    name,
    role,
    company,
    text,
    rating,
    photo,
  }
`;
