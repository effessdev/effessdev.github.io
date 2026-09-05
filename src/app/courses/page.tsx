import TopNav from "@/components/layout/top-nav";
import { buttonVariants } from "@/components/ui/button";
import { getAllCoursesWithLatest } from "@/lib/courses";
import Link from "next/link";
import { Metadata } from "next";

export type Category = {
  name: string;
  description?: string;
  content: string[];
};

// Page now lists Featured Courses and Other Courses using course metadata

export const metadata: Metadata = {
  title: "Courses | EffessDev",
  description: "Browse my courses on various topics.",
  openGraph: {
    title: "Courses | EffessDev",
    description: "Browse my courses on various topics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses | EffessDev",
    description: "Browse my courses on various topics.",
  },
};

export default function CoursesPage() {
  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <main className="space-y-8">
        {/* Load all courses, compute latest chapter dates, sort, and split by featured */}
        {(() => {
          const courses = getAllCoursesWithLatest().sort((a, b) => {
            const ta = a.latestUpdated ? Date.parse(a.latestUpdated) : 0;
            const tb = b.latestUpdated ? Date.parse(b.latestUpdated) : 0;
            return tb - ta;
          });

          const featured = courses.filter((c) => c.featured);
          const other = courses.filter((c) => !c.featured);

          return (
            <>
              <section className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                  Featured Courses
                </h1>
                {featured.length === 0 ? (
                  <p className="text-muted-foreground">
                    Nothing here yet. Please check back soon.
                  </p>
                ) : (
                  <div className="pt-6 flex flex-col gap-6 last:border-b last:pb-6">
                    {featured.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col gap-4 border-t w-full justify-between pt-6"
                      >
                        <h2 className="text-2xl font-semibold">
                          {course.title}
                        </h2>
                        <p className="text-base text-muted-foreground">
                          {course.description}
                        </p>
                        <Link
                          href={`/courses/${course.id}`}
                          className={
                            buttonVariants({ variant: "default" }) + " w-min"
                          }
                        >
                          View Course
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                  Other Courses
                </h1>
                {other.length === 0 ? (
                  <p className="text-muted-foreground">
                    Nothing here yet. Please check back soon.
                  </p>
                ) : (
                  <div className="pt-6 flex flex-col gap-6">
                    {other.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col gap-4 border-t w-full justify-between pt-6"
                      >
                        <h2 className="text-2xl font-semibold">
                          {course.title}
                        </h2>
                        <p className="text-base text-muted-foreground">
                          {course.description}
                        </p>
                        <Link
                          href={`/courses/${course.id}`}
                          className={
                            buttonVariants({ variant: "default" }) + " w-min"
                          }
                        >
                          View Course
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          );
        })()}
      </main>
    </>
  );
}
