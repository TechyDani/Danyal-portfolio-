export const site = {
  name: "Danyal Khan",
  email: "kdanyal763@gmail.com",
  location: "Islamabad, Pakistan",
  behance: "https://www.behance.net/danyalkhan34",
  github: "https://github.com/TechyDani",
  instagram: "https://www.instagram.com/techydani/",
  facebook: "https://www.facebook.com/profile.php?id=61572104494743",
};

export const categories = [
  "All",
  "Creative Direction",
  "Branding & Design",
  "Motion & Video",
  "Marketing",
  "Web & Digital",
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  slug: string;
  title: string;
  category: Category;
  disciplines: Category[];
  label: string;
  number: string;
  url: string;
  artwork: string;
  image?: string;
  gallery?: string[];
  description: string;
};

export const projects: Project[] = [
  {
    slug: "fast-food-creatives",
    title: "Fast Food Creatives & Animation",
    category: "Motion & Video",
    disciplines: ["Motion & Video", "Branding & Design", "Marketing"],
    label: "Food, with a little more feeling.",
    number: "01",
    url: "https://www.behance.net/gallery/257696733/Fast-Food-Creatives-and-Animation",
    artwork: "food",
    description:
      "A collection of fast food creatives and animation. Explore the original visual work and motion pieces in the full Behance project.",
  },
  {
    slug: "brand-kit",
    title: "Brand Kit",
    category: "Branding & Design",
    disciplines: ["Branding & Design", "Creative Direction"],
    label: "An identity, brought together.",
    number: "02",
    url: "https://www.behance.net/gallery/239348297/Brand-Kit",
    artwork: "brand",
    description:
      "A brand kit exploring visual identity and brand communication. See the complete collection of identity assets in the original project.",
  },
  {
    slug: "client-showcase-02",
    title: "Client Showcase / 02",
    category: "Creative Direction",
    disciplines: ["Creative Direction", "Branding & Design", "Marketing"],
    label: "Different brands. Shared ambition.",
    number: "03",
    url: "https://www.behance.net/gallery/257696637/Client-Showcase-02",
    artwork: "showcase",
    description:
      "A curated showcase of client work, bringing different visual styles and communication needs into one collection. View the original project for the published artwork.",
  },
  {
    slug: "product-marketing-posts",
    title: "Product & Marketing Posts",
    category: "Marketing",
    disciplines: ["Marketing", "Branding & Design"],
    label: "Made to catch your attention.",
    number: "04",
    url: "https://www.behance.net/gallery/237590893/Product-Posts-Marketing-Posts",
    artwork: "product",
    description:
      "A collection of product posts and marketing visuals. Browse the full creative collection and original compositions on Behance.",
  },
  {
    slug: "client-showcase-01",
    title: "Client Work Showcase / 01",
    category: "Branding & Design",
    disciplines: ["Branding & Design", "Creative Direction"],
    label: "Creative thinking. In practice.",
    number: "05",
    url: "https://www.behance.net/gallery/257696003/Client-work-showcase-01",
    artwork: "client",
    description:
      "Selected client work in graphic design and visual communication. Explore the original published collection to see the individual creative pieces.",
  },
  {
    slug: "danyals-portfolio",
    title: "Danyal’s Portfolio",
    category: "Creative Direction",
    disciplines: ["Creative Direction", "Branding & Design"],
    label: "A wider view of the work.",
    number: "06",
    url: "https://www.behance.net/gallery/225103547/Danyals-portfolio",
    artwork: "portfolio",
    description:
      "A broader collection of my creative work, collected in one portfolio presentation. See the original project for the complete selection.",
  },
];

// Original images downloaded from Danyal's supplied Behance presentations.
const projectAssets: Record<string, { image: string; gallery: string[] }> = {
  "fast-food-creatives": {
    image: "/images/fast-food-2.webp",
    gallery: [
      "/images/fast-food-1.webp",
      "/images/fast-food-3.webp",
      "/images/fast-food-4.webp",
    ],
  },
  "brand-kit": {
    image: "/images/brand-kit-1.webp",
    gallery: [
      "/images/brand-kit-2.webp",
      "/images/brand-kit-3.webp",
      "/images/brand-kit-4.webp",
    ],
  },
  "client-showcase-02": {
    image: "/images/client-showcase-02-1.webp",
    gallery: [
      "/images/client-showcase-02-2.webp",
      "/images/client-showcase-02-3.webp",
      "/images/client-showcase-02-4.webp",
    ],
  },
  "product-marketing-posts": {
    image: "/images/product-posts-1.webp",
    gallery: [
      "/images/product-posts-2.webp",
      "/images/product-posts-3.webp",
      "/images/product-posts-4.webp",
    ],
  },
  "client-showcase-01": {
    image: "/images/client-showcase-01-1.webp",
    gallery: [],
  },
  "danyals-portfolio": {
    image: "/images/portfolio-1.webp",
    gallery: [
      "/images/portfolio-2.webp",
      "/images/portfolio-3.webp",
      "/images/portfolio-4.webp",
    ],
  },
};
for (const project of projects)
  Object.assign(project, projectAssets[project.slug]);

export const expertise = [
  {
    title: "Creative Direction",
    description:
      "Shaping concepts, visual direction, campaign narratives, and cohesive creative experiences. I connect the bigger picture with the details that make an idea feel distinctive.",
    deliverables: [
      "Art direction",
      "Concept development",
      "Campaign storytelling",
    ],
    category: "Creative Direction",
  },
  {
    title: "Branding & Visual Design",
    description:
      "Developing compelling identities, digital assets, marketing visuals, and communication systems. Thoughtful design that gives every brand touchpoint a shared visual language.",
    deliverables: [
      "Visual identity",
      "Brand guidelines",
      "Digital & print design",
    ],
    category: "Branding & Design",
  },
  {
    title: "Motion & Video",
    description:
      "Bringing stories to life through video editing, motion graphics, animation, and visual storytelling. From the first frame to the final cut, every moment has a purpose.",
    deliverables: ["Motion graphics", "Video editing", "Social content"],
    category: "Motion & Video",
  },
  {
    title: "Digital Marketing & Strategy",
    description:
      "Connecting creative communication with audience insights, digital campaigns, and growth objectives. A clear message, considered channels, and creative work with a reason to exist.",
    deliverables: [
      "Campaign concepts",
      "Content strategy",
      "Marketing creatives",
    ],
    category: "Marketing",
  },
  {
    title: "Web Design & Development",
    description:
      "Designing and building responsive websites and interactive digital experiences. Bringing visual clarity and technical execution together, with care for how people actually use the web.",
    deliverables: [
      "UI & UX design",
      "Responsive websites",
      "Front-end development",
    ],
    category: "Web & Digital",
  },
];

export const process = [
  {
    title: "Discover",
    text: "Understand your brand, audience, and the challenge ahead.",
  },
  {
    title: "Strategize",
    text: "Find the opportunities. Define a clear plan of action.",
  },
  {
    title: "Conceptualize",
    text: "Explore ideas and shape a meaningful creative direction.",
  },
  {
    title: "Create",
    text: "Bring the direction to life through design and production.",
  },
  {
    title: "Refine",
    text: "Review, test, and give every detail the care it deserves.",
  },
  {
    title: "Deliver",
    text: "Bring it all together, ready for the world to experience.",
  },
];

export const clients = [
  { name: "Shifa International Hospital", logo: "/images/clients/shifa-international-hospital.webp" },
  { name: "Derma Care", logo: "/images/clients/derma-care.webp" },
  { name: "HM Diagnostics & Clinics", logo: "/images/clients/hm-diagnostics-clinics.webp" },
  { name: "Century 23 Marketing", logo: "/images/clients/century-23-marketing.webp" },
  { name: "Dental Wellness", logo: "/images/clients/dental-wellness.webp" },
  { name: "Body Fit Gym", logo: "/images/clients/body-fit-gym.webp" },
  { name: "Pro Consulting", logo: "/images/clients/pro-consulting.webp" },
  { name: "Niku Adventures", logo: "/images/clients/niku-adventures.webp" },
  { name: "Tezz Delivery", logo: "/images/clients/tezz-delivery.webp" },
  { name: "Europe Work Visa", logo: "/images/clients/europe-work-visa.webp" },
];

export const experience = [
  {
    period: "Present",
    company: "RevBoost Marketing Agency",
    role: "Owner & Founder",
    location: "Islamabad, Pakistan",
    description:
      "Helping businesses around the world grow and acquire customers through creative strategy and digital marketing.",
  },
  {
    period: "2023 — Present",
    company: "Digi Aura 360",
    role: "Associate Creative Director · Full-time",
    logo: "/images/digi-aura-360-logo.jpg",
    companyUrl: "https://www.linkedin.com/company/105701966/",
  },
  {
    period: "2024 — 2025",
    company: "Abdullah City",
    role: "Senior Graphic Designer / Video Editor",
  },
  {
    period: "2023 — 2024",
    company: "Meta Tech",
    role: "Web Developer / Graphic Designer",
  },
  {
    period: "2022 — 2023",
    company: "Digital Crew",
    role: "Web Developer / UI Designer / Video Editor",
  },
  {
    period: "2021 — 2022",
    company: "Al-Akhtar",
    role: "Web Developer / Graphic Designer",
  },
];
