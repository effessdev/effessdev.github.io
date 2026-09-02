import TopNav from "@/components/layout/top-nav";
import { buttonVariants } from "@/components/ui/button";
import { getCourseMeta } from "@/lib/courses";
import Link from "next/link";
import { Metadata } from "next";

export type Category = {
  name: string;
  description?: string;
  content: string[];
};

export const courseCategories: Category[] = [
  {
    name: "My Courses",
    description: "",
    content: ["embedded-c"],
  },
];

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
        {courseCategories.map((cat) => {
          const metas = cat.content
            .map((id) => {
              try {
                return getCourseMeta(id);
              } catch (e) {
                console.error(`Error fetching course meta for ID: ${id}`, e);
                return null;
              }
            })
            .filter(
              (c): c is NonNullable<ReturnType<typeof getCourseMeta>> =>
                c !== null,
            );

          return (
            <section key={cat.name} className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{cat.name}</h1>
              {cat.description && (
                <p className="text-base text-muted-foreground">
                  {cat.description}
                </p>
              )}

              {metas.length === 0 ? (
                <p className="text-muted-foreground">
                  Nothing here yet. Please check back soon.
                </p>
              ) : (
                <div className="pt-6 flex flex-col gap-6">
                  {metas.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col sm:flex-row gap-4 border-t w-full justify-between pt-6"
                    >
                      <div>
                        <h2 className="text-2xl mb-2 font-semibold tracking-tight">
                          {course.title}
                        </h2>
                        <p className="text-base max-w-2xl text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        View Course
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>
    </>
  );
}
