import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// One radius for every markdown surface (code blocks, images, tables).
const RADIUS = "rounded-xl";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="flex max-w-none flex-col gap-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeRaw,
          rehypeKatex,
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
        components={{
          // h1 gets a warning style — it's discouraged because the title is already h1.
          h1: ({ children }) => (
            <h1 className="text-5xl font-bold text-destructive underline decoration-wavy decoration-2 decoration-destructive underline-offset-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="w-full border-b pb-2 text-4xl font-bold">
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
          ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,
          ol: ({ children }) => (
            <ol className="list-decimal pl-8">{children}</ol>
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
              className="underline underline-offset-2 hover:text-muted-foreground"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <pre
              className={`${RADIUS} overflow-x-auto border border-border bg-background p-2 text-sm font-mono md:p-6`}
            >
              {children}
            </pre>
          ),
          code: ({ children, className }) =>
            className ? (
              // Block code — hljs classes carry the colors; `pre` styles it.
              <code className={className}>{children}</code>
            ) : (
              <code className="rounded-md border border-border bg-muted px-[0.3em] py-[0.1em] font-mono text-[0.9em] box-decoration-clone">
                {children}
              </code>
            ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className={`max-w-full ${RADIUS}`} />
          ),
          hr: () => <hr className="border-t-2" />,
          table: ({ children }) => (
            <div
              className={`w-full overflow-x-auto border border-border ${RADIUS}`}
            >
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b bg-muted font-semibold text-muted-foreground">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y bg-card">{children}</tbody>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-medium">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 align-middle">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
