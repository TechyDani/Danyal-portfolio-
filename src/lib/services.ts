export const services = [
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    category: "BUILD YOUR PRESENCE",
    description:
      "Give your brand a clear voice and a consistent presence. We bring strategy and creative together to help you connect with the people who matter to your business.",
    deliverables: ["Content strategy & planning", "Branded posts & creative", "Social publishing & consistency"],
    icon: "social",
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    category: "REACH THE RIGHT PEOPLE",
    description:
      "Put your offer in front of the right audience on Facebook and Instagram. We connect campaign strategy, ad creative, and a clear next step for your potential customers.",
    deliverables: ["Audience & campaign planning", "Ad creative & campaign setup", "Testing & performance reviews"],
    icon: "ads",
  },
  {
    id: "website-development",
    title: "Website Development",
    category: "TURN INTEREST INTO ACTION",
    description:
      "Build a digital home that earns trust and makes your offer clear. Thoughtful design, responsive development, and an easy path from first visit to enquiry.",
    deliverables: ["Website design & development", "Responsive user experiences", "Landing pages & enquiry journeys"],
    icon: "web",
    workUrl: "/work?category=Web%20%26%20Digital",
  },
  {
    id: "seo-aeo",
    title: "SEO / AEO",
    category: "MAKE YOUR BUSINESS DISCOVERABLE",
    description:
      "Help people find and understand your business. We bring search engine optimization and answer engine optimization together through clear content and a sound website structure.",
    deliverables: ["SEO foundations & site structure", "Search-focused content", "Answer-ready pages & FAQs"],
    icon: "search",
  },
  {
    id: "app-development",
    title: "App Development",
    category: "BUILD A DIGITAL PRODUCT",
    description:
      "Turn your idea into an application built around your users and business needs. Clear interfaces, practical features, and a thoughtful experience from the first screen onward.",
    deliverables: ["App interfaces & user journeys", "Application design & development", "Testing & launch support"],
    icon: "app",
  },
  {
    id: "point-of-sale-website",
    title: "Point of Sale Website",
    category: "CONNECT SALES & OPERATIONS",
    description:
      "Bring products, orders, and sales together in a web-based point of sale solution. We create practical tools around the way your business operates, so everyday workflows feel simpler.",
    deliverables: ["Product & inventory management", "Sales & order workflows", "Reporting & admin dashboards"],
    icon: "pos",
  },
  {
    id: "product-catalog",
    title: "Product Catalog",
    category: "SHOWCASE YOUR RANGE",
    description:
      "Give customers a clear, organized way to explore your products. Digital catalogs that bring product information and imagery together, with an easy route to an enquiry.",
    deliverables: ["Product categories & collections", "Product details & imagery", "Search, filters & enquiry flows"],
    icon: "catalog",
  },
  {
    id: "shopify-website",
    title: "Shopify Website",
    category: "LAUNCH YOUR ONLINE STORE",
    description:
      "Create a Shopify store that feels like your brand and makes it easy to browse and shop. From storefront design to product organization, we help bring your online store together.",
    deliverables: ["Shopify storefront setup", "Product & collection organization", "Store design & shopping experience"],
    icon: "shopify",
  },
  {
    id: "custom-website",
    title: "Custom Website",
    category: "BUILT AROUND YOUR BUSINESS",
    description:
      "For briefs that need more than a template. We build websites around your goals, with tailored layouts, functionality, and an experience shaped around your business.",
    deliverables: ["Bespoke interfaces & page design", "Custom features & integrations", "Responsive development & testing"],
    icon: "custom",
  },
] as const;

export function serviceInquiryHref(title: string) {
  return `/contact?service=${encodeURIComponent(title)}`;
}
