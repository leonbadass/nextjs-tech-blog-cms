// lib/sanitize.ts
import sanitizeHtml from "sanitize-html"

export function sanitizePost(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6",
      "blockquote", "ul", "ol", "li",
      "b", "i", "strong", "em", "u",
      "a", "code", "pre", "img", "span", "br", "hr"
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: ["style"], // allow inline styles if TipTap needs them
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  })
}
