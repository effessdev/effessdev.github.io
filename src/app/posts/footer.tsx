export default function Footer() {
  return (
    <footer className="border-t py-8 w-full">
      <div className="max-w-6xl px-4 mx-auto flex flex-col items-center justify-between gap-4 text-center text-muted-foreground sm:flex-row sm:text-left">
        <p className="text-base">
          © 2026 Faseeh Zaman F. S. All Rights Reserved.
        </p>
        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://github.com/effessdev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/effessdev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a href="https://effessdev.itch.io" className="hover:text-foreground">
            Itch.io
          </a>
        </div>
      </div>
    </footer>
  );
}
