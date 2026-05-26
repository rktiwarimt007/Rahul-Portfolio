import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dateLabel = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // ── Inline markdown renderer ────────────────────────────────
  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={i} style={{ color: "var(--fg)", fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={i}>{part.slice(1, -1)}</em>;
      if (part.startsWith("`") && part.endsWith("`"))
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded text-sm"
            style={{
              background: "var(--surface)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      return part;
    });
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // ── Code block ──────────────────────────────────────────
      if (line.startsWith("```")) {
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <div
            key={`code-${i}`}
            className="my-6 rounded-xl overflow-hidden border"
            style={{ borderColor: "var(--border)" }}
          >
            {lang && (
              <div
                className="px-4 py-2 text-xs font-mono border-b flex items-center gap-2"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-red-400 opacity-70" />
                <span className="w-2 h-2 rounded-full bg-yellow-400 opacity-70" />
                <span className="w-2 h-2 rounded-full bg-green-400 opacity-70" />
                <span className="ml-2">{lang}</span>
              </div>
            )}
            <pre
              className="p-5 overflow-x-auto text-sm leading-relaxed"
              style={{
                background: "var(--surface)",
                color: "var(--fg-soft)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        i++;
        continue;
      }

      // ── Table ───────────────────────────────────────────────
      if (line.includes("|") && lines[i + 1]?.includes("---")) {
        const headers = line
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);
        i += 2;
        const rows: string[][] = [];
        while (i < lines.length && lines[i].includes("|")) {
          rows.push(
            lines[i]
              .split("|")
              .map((s) => s.trim())
              .filter(Boolean)
          );
          i++;
        }
        elements.push(
          <div
            key={`table-${i}`}
            className="my-6 overflow-x-auto rounded-xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--surface)" }}>
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="px-4 py-3 text-left font-semibold border-b"
                      style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ background: ri % 2 === 0 ? "transparent" : "var(--surface)" }}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 border-b"
                        style={{ borderColor: "var(--border)", color: "var(--fg-soft)" }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // ── Headings ────────────────────────────────────────────
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--fg)" }}>
            {renderInline(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-2xl font-bold mt-10 mb-4"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            {renderInline(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            className="text-3xl font-black mt-10 mb-4"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            {renderInline(line.slice(2))}
          </h1>
        );
      }

      // ── Bullet list ─────────────────────────────────────────
      else if (line.startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2">
            {listItems.map((item, li) => (
              <li
                key={li}
                className="flex items-start gap-2.5 text-base"
                style={{ color: "var(--fg-soft)" }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // ── Blockquote ──────────────────────────────────────────
      else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="my-5 pl-5 py-3 rounded-r-xl border-l-4 text-base italic"
            style={{
              borderLeftColor: "var(--accent)",
              background: "var(--surface)",
              color: "var(--fg-soft)",
            }}
          >
            {renderInline(line.slice(2))}
          </blockquote>
        );
      }

      // ── HR ──────────────────────────────────────────────────
      else if (line.startsWith("---")) {
        elements.push(
          <hr key={i} className="my-8" style={{ borderColor: "var(--border)" }} />
        );
      }

      // ── Empty line ──────────────────────────────────────────
      else if (line.trim() === "") {
        elements.push(<div key={i} className="my-2" />);
      }

      // ── Paragraph ───────────────────────────────────────────
      else {
        elements.push(
          <p
            key={i}
            className="text-base leading-relaxed my-3"
            style={{ color: "var(--fg-soft)" }}
          >
            {renderInline(line)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Back */}
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Blog
        </a>

        {/* Header */}
        <div className="mb-10 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {dateLabel}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--border)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {post.readTime}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            {post.title}
          </h1>

          <p className="text-lg" style={{ color: "var(--muted)" }}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full border"
                style={{
                  color: "var(--accent)",
                  borderColor: "var(--accent-border)",
                  background: "var(--accent-bg)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-10" style={{ background: "var(--border)" }} />

        {/* Content */}
        <article>{renderContent(post.content)}</article>

        {/* Footer nav */}
        <div
          className="mt-16 pt-8 border-t flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <a
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ← All Posts
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Discuss this →
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}