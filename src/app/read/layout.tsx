import { SiteHeader } from "@/components/layout/site-header";
import ScrollHeader from "@/components/scroll-header";

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollHeader>
        <SiteHeader />
      </ScrollHeader>

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
