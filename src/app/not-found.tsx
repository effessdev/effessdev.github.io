import { ActionLink } from "@/components/ui/action-link";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <PageHeader>
      <h1 className="mb-4 text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.1] tracking-[-0.05em] text-[var(--text-color)]">
        404 - Post Not Found
      </h1>
      <p className="mb-8 text-[clamp(1.15rem,3vw,1.5rem)] text-[var(--text-color-muted)]">
        Oops! The post you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3">
        <ActionLink href="/">
          <i className="fas fa-home" aria-hidden="true"></i> Back to Home
        </ActionLink>
        <ActionLink href="/read">
          <i className="fas fa-book" aria-hidden="true"></i> View All Posts
        </ActionLink>
      </div>
    </PageHeader>
  );
}
