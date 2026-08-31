import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <>
      <div className="max-w-none flex flex-col gap-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[
            rehypeRaw,
            rehypeKatex,
            [rehypeHighlight, { detect: true, ignoreMissing: true }],
          ]}
          components={{
            // Warning style for h1.
            // Used to discourage the use of h1 since the title is already h1.
            h1: ({ children }) => (
              <h1 className="text-5xl font-bold text-destructive underline-offset-4 decoration-wavy underline decoration-2 decoration-destructive">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-4xl font-bold w-full border-b pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-3xl font-bold">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-2xl font-bold">{children}</h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-xl font-bold">{children}</h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-lg font-bold">{children}</h6>
            ),
            p: ({ children }) => <p>{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-8 text-foreground">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-8 text-foreground">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-7">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="relative pl-6 text-muted-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-full before:bg-muted-foreground">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            pre: ({ children }) => (
              <pre className="overflow-x-auto rounded-(--card-radius) border border-border bg-background p-2 md:p-6 text-sm text-card-foreground">
                {children}
              </pre>
            ),
            code: ({ children, className }) => {
              const isInlineCode = !className;

              if (isInlineCode) {
                return (
                  <code className="rounded-md border border-border bg-muted px-[0.3em] py-[0.1em] text-[0.9em] box-decoration-clone">
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
                className="max-w-full rounded-(--card-radius)"
              />
            ),
            hr: () => <hr className="border-t-2 border-border" />,
            table: ({ children }) => (
              <div className="w-full overflow-x-auto rounded-(--card-radius) border border-border">
                <table className="w-full border-collapse text-left text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-muted text-muted-foreground font-semibold border-b border-border">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-border bg-card text-card-foreground">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="transition-colors">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 font-medium text-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 align-middle">{children}</td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
