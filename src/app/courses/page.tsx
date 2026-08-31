import TopNav from "@/components/layout/top-nav";
import { buttonVariants } from "@/components/ui/button";
import { getAllCourses } from "@/lib/courses";
import Link from "next/link";
import { Metadata } from "next";

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
  const courses = getAllCourses();

  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
      <div className="pt-6 flex flex-col gap-6">
        {courses.map((course) => (
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
    </>
  );
}
