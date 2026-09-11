import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  href: string;
  label: string;
  tags: string[];
}

export default function ProjectList({
  heading,
  projects,
}: {
  heading: string;
  projects: Project[];
}) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground">
          {heading}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="h-full border-border/80 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="mt-2 text-base leading-7 text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge variant="secondary" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                {project.label}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
