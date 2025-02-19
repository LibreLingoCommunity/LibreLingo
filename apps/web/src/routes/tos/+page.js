import parseMarkdown from "../../utils/parseMarkdown"

export async function load() {
  // ignored because TypeScript doesn't seem to recognize Markdown files
  // as modules
  const { markdown } = await import(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "assets/docs/website_tos.md"
  )

  return {
    readmeHTML: parseMarkdown(markdown),
  }
}