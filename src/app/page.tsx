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
  const listings = getContentListings();

  return (
    <>
      <Hero />

      <div
        id="tutorials"
        className="mx-auto w-full max-w-6xl px-4 pt-12 pb-12 sm:px-6 lg:px-8"
      >
        <ContentList heading="Tutorials" items={listings} />
      </div>
    </>
  );
}
