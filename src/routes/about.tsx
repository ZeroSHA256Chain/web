import { createFileRoute } from "@tanstack/react-router";

import { AboutUsSection } from "@/components/features";

const About = () => {
  return <AboutUsSection />;
};

export const Route = createFileRoute("/about")({
  component: About,
});
