import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <>
      <div className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeHighlight, { detect: true, ignoreMissing: true }],
          ]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-6 text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.1] tracking-tighter text-foreground">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-6 mt-10 inline-block border-b-[3px] border-accent pb-2 text-[clamp(2rem,6vw,3rem)] font-bold tracking-[-0.01em] text-foreground">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-4 mt-8 text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-6 text-foreground">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-6 list-disc space-y-2 pl-8 text-foreground">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-6 list-decimal space-y-2 pl-8 text-foreground">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="leading-7">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="my-6 border-l-4 border-accent pl-6 text-muted-foreground">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-foreground underline decoration-accent underline-offset-4 hover:text-muted-foreground dark:hover:text-foreground"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            pre: ({ children }) => (
              <pre className="mb-6 overflow-x-auto rounded-(--card-radius) border border-border bg-background p-6 text-sm text-card-foreground">
                {children}
              </pre>
            ),
            code: ({ children, className }) => {
              const isInlineCode = !className;

              if (isInlineCode) {
                return (
                  <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
                    {children}
                  </code>
                );
              }

              return <code className={className}>{children}</code>;
            },
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="my-6 max-w-full rounded-(--card-radius)"
              />
            ),
            hr: () => <hr className="my-8 border-t-2 border-border" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
