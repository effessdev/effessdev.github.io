import type { Metadata } from "next";
import { getFeaturedPosts, getOtherPosts } from "@/lib/posts";
import { getAllCoursesWithLatest } from "@/lib/courses";
import PostList from "@/components/post-list";
import TopNav from "@/components/layout/top-nav";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Read | EffessDev",
  description: "Read my posts and courses on software and embedded systems.",
  openGraph: {
    title: "Read | EffessDev",
    description: "Read my posts and courses on software and embedded systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read | EffessDev",
    description: "Read my posts and courses on software and embedded systems.",
  },
};

export default function ReadPage() {
  const featuredPosts = getFeaturedPosts();
  const otherPosts = getOtherPosts();
  const courses = getAllCoursesWithLatest().sort((a, b) => {
    const ta = a.latestUpdated ? Date.parse(a.latestUpdated) : 0;
    const tb = b.latestUpdated ? Date.parse(b.latestUpdated) : 0;
    return tb - ta;
  });

  const featuredCourses = courses.filter((course) => course.featured);
  const otherCourses = courses.filter((course) => !course.featured);

  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <main className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Featured Courses
          </h1>
          {featuredCourses.length === 0 ? (
            <p className="text-muted-foreground">
              Nothing here yet. Please check back soon.
            </p>
          ) : (
            <div className="pt-6 flex flex-col gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col gap-4 border-t w-full justify-between pt-6"
                >
                  <h2 className="text-2xl font-semibold">{course.title}</h2>
                  <p className="text-base text-muted-foreground">
                    {course.description}
                  </p>
                  <Link
                    href={`/read/${course.id}`}
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

        {otherCourses.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Other Courses</h2>
            <div className="pt-6 flex flex-col gap-6">
              {otherCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col gap-4 border-t w-full justify-between pt-6"
                >
                  <h2 className="text-2xl font-semibold">{course.title}</h2>
                  <p className="text-base text-muted-foreground">
                    {course.description}
                  </p>
                  <Link
                    href={`/read/${course.id}`}
                    className={
                      buttonVariants({ variant: "default" }) + " w-min"
                    }
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <PostList heading="Featured Posts" posts={featuredPosts} />
        </section>

        <section>
          <PostList heading="Other Posts" posts={otherPosts} />
        </section>
      </main>
    </>
  );
}
