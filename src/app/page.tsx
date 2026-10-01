import type { Metadata } from "next";
import ContentList from "@/components/content-list";
import { Hero } from "@/components/brand/hero";
import { brand } from "@/lib/brand";
import { getContentListings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Embedded Systems Tutorials",
  description: brand.description,
};

export default function Home() {
  const { featured, other, aiGenerated } = getContentListings();

  return (
    <>
      <Hero />

      <div
        id="tutorials"
        className="mx-auto w-full max-w-6xl px-4 pt-12 pb-12 sm:px-6 lg:px-8"
      >
        <ContentList heading="Featured" items={featured} />
        <div className="pt-8" id="other-posts" />
        <ContentList heading="Other" items={other} />
        <div className="pt-8" id="ai-generated" />
        <ContentList heading="AI-Generated" items={aiGenerated} />
      </div>
    </>
  );
}
