import type { Metadata } from "next";
import ContentList from "@/components/content-list";
import { Hero } from "@/components/brand/hero";
import { brand } from "@/lib/brand";
import { getContentListings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tutorials",
  description: brand.description,
};

export default function Home() {
  const { featured, other, aiGenerated } = getContentListings();

  return (
    <>
      <Hero />

      <div id="tutorials" className="pt-12 scroll-mt-24">
        <ContentList heading="Featured" items={featured} />
        <div className="pt-8" id="other-posts" />
        <ContentList heading="Other" items={other} />
        <div className="pt-8" id="ai-generated" />
        <ContentList heading="AI-Generated" items={aiGenerated} />
      </div>
    </>
  );
}
