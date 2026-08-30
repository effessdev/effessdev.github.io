import TopNav from "@/components/layout/top-nav";
import PostList from "@/components/post-list";
import {
  getCourseChapters,
  getAllCourseIds,
  getCourseMeta,
} from "@/lib/courses";

interface CoursesPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllCourseIds();
  return ids.map((courseId) => ({
    courseId: courseId,
  }));
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { courseId } = await params;

  const course = getCourseMeta(courseId);
  const chapters = getCourseChapters(courseId);

  return (
    <>
      <TopNav
        backHref="/courses"
        backLabel="Courses"
        extraLinks={[{ label: "Home", href: "/" }]}
      />
      <PostList
        heading={course.title}
        description={course.description}
        posts={chapters}
      />
    </>
  );
}
