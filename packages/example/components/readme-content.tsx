"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ReadmeContentProps {
	content: string;
}

/**
 * Renders README.md with GitHub-flavored markdown and syntax-highlighted code.
 */
export function ReadmeContent({ content }: ReadmeContentProps) {
	return (
		<div className="prose prose-invert max-w-none text-zinc-300 prose-headings:text-zinc-50 prose-h1:border-b prose-h1:border-white/6 prose-h1:pb-3 prose-h1:first:hidden prose-h2:border-b prose-h2:border-white/4 prose-h2:pb-2 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:rounded-md prose-code:border prose-code:border-white/6 prose-code:bg-white/6 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-200 prose-code:before:content-[''] prose-code:after:content-[''] prose-blockquote:border-blue-500/30 prose-blockquote:bg-blue-500/4 prose-blockquote:rounded-r-lg prose-th:text-zinc-400 prose-td:border-white/4 prose-th:border-white/8">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						const codeString = String(children).replace(/\n$/, "");

						if (match) {
							return (
								<SyntaxHighlighter
									style={oneDark}
									language={match[1]}
									PreTag="div"
									customStyle={{
										borderRadius: "0.75rem",
										fontSize: "0.8125rem",
										margin: "0",
										border: "1px solid rgba(255,255,255,0.06)"
									}}
								>
									{codeString}
								</SyntaxHighlighter>
							);
						}

						return (
							<code className={className} {...props}>
								{children}
							</code>
						);
					}
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
