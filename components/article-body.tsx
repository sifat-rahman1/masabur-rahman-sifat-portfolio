import Link from "next/link"
import type { ArticleSection } from "@/data/blogs"

/** Token colours for the syntax highlighter — no runtime dependency needed. */
type TokenType = "keyword" | "string" | "comment" | "number" | "plain"

interface Token {
    type: TokenType
    text: string
}

const KEYWORDS = new Set([
    "const", "let", "var", "function", "return", "import", "export",
    "type", "interface", "satisfies", "from", "default", "class",
    "extends", "implements", "new", "this", "as", "in", "of",
    "true", "false", "null", "undefined", "async", "await",
])

/**
 * Minimal tokeniser for a single line of TypeScript/JavaScript.
 * Covers: line comments, string literals, numbers, keywords, and plain text.
 * Good-enough for editorial code samples — no dependency required.
 */
function tokeniseLine(line: string): Token[] {
    const tokens: Token[] = []
    let i = 0
    const n = line.length

    while (i < n) {
        // Line comment
        if (line[i] === "/" && line[i + 1] === "/") {
            tokens.push({ type: "comment", text: line.slice(i) })
            break
        }

        // String literals (double-quote, single-quote, backtick)
        if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
            const q = line[i]
            let j = i + 1
            while (j < n && line[j] !== q) {
                if (line[j] === "\\" && j + 1 < n) j++ // skip escaped char
                j++
            }
            tokens.push({ type: "string", text: line.slice(i, j + 1) })
            i = j + 1
            continue
        }

        // Numbers
        if (/[0-9]/.test(line[i])) {
            let j = i
            while (j < n && /[0-9.]/.test(line[j])) j++
            tokens.push({ type: "number", text: line.slice(i, j) })
            i = j
            continue
        }

        // Words (keywords or identifiers)
        if (/[a-zA-Z_$]/.test(line[i])) {
            let j = i
            while (j < n && /[\w$]/.test(line[j])) j++
            const word = line.slice(i, j)
            tokens.push({ type: KEYWORDS.has(word) ? "keyword" : "plain", text: word })
            i = j
            continue
        }

        // Everything else: operators, punctuation
        tokens.push({ type: "plain", text: line[i] })
        i++
    }

    return tokens
}

const TOKEN_CLASS: Record<TokenType, string> = {
    keyword: "text-[#c792ea]",   // magenta / Framer pink
    string: "text-emerald-400",  // emerald for strings
    comment: "text-zinc-500 italic",
    number: "text-cyan-400",     // cyan for numbers
    plain: "text-zinc-200",
}

function CodeBlock({ language, code }: { language: string; code: string }) {
    const lines = code.split("\n")
    return (
        <div className="my-8 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                    <span className="block h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="block h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="block h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-zinc-600">
                    {language}
                </span>
            </div>
            {/* Code */}
            <pre className="overflow-x-auto p-5 text-sm leading-[1.75]">
                <code>
                    {lines.map((line, i) => (
                        <span key={i} className="block">
                            {line === "" ? (
                                "\u00a0" // preserve blank lines
                            ) : (
                                tokeniseLine(line).map((tok, j) => (
                                    <span key={j} className={TOKEN_CLASS[tok.type]}>
                                        {tok.text}
                                    </span>
                                ))
                            )}
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    )
}

function Callout({ text }: { text: string }) {
    const lines = text.split("\n")
    return (
        <div className="my-8 rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-6 py-5">
            {lines.map((line, i) => (
                <p key={i} className="text-[0.9375rem] leading-[1.8] text-zinc-300">
                    {line}
                </p>
            ))}
        </div>
    )
}

/** Renders the typed ArticleSection[] into styled JSX — no runtime Markdown parser needed. */
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
    return (
        <div className="mx-auto w-full max-w-[68ch]">
            {sections.map((section, i) => {
                switch (section.type) {
                    case "heading2":
                        return (
                            <h2
                                key={i}
                                className="mt-12 mb-5 border-l-2 border-emerald-500 pl-4 font-display text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white first:mt-0"
                            >
                                {section.text}
                            </h2>
                        )

                    case "heading3":
                        return (
                            <h3
                                key={i}
                                className="mt-8 mb-3 font-display text-lg font-semibold leading-[1.25] tracking-[-0.015em] text-zinc-100"
                            >
                                {section.text}
                            </h3>
                        )

                    case "paragraph":
                        return (
                            <p
                                key={i}
                                className="mb-5 text-[1.0625rem] leading-[1.85] text-zinc-300"
                            >
                                {section.text}
                            </p>
                        )

                    case "code":
                        return (
                            <CodeBlock key={i} language={section.language} code={section.code} />
                        )

                    case "callout":
                        return <Callout key={i} text={section.text} />

                    case "link":
                        return (
                            <p key={i} className="mb-5 text-[1.0625rem] leading-[1.85]">
                                <Link
                                    href={section.href}
                                    className="inline-flex items-center gap-1.5 font-medium text-emerald-400 underline decoration-emerald-500/40 underline-offset-4 transition-colors duration-200 hover:text-emerald-300 hover:decoration-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                                >
                                    {section.text}
                                    <span aria-hidden="true">↗</span>
                                </Link>
                            </p>
                        )

                    case "divider":
                        return (
                            <hr
                                key={i}
                                className="my-10 border-0 border-t border-zinc-800"
                            />
                        )

                    default:
                        return null
                }
            })}
        </div>
    )
}
