"use client";

import { buttonVariants } from "@/components/ui/button";

export default function ExploreProjectsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={buttonVariants({ variant: "default", size: "lg" })}
    >
      Explore Projects
    </button>
  );
}
