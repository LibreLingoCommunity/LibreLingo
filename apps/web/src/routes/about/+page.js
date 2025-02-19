import parseMarkdown from "../../utils/parseMarkdown"
import { _ } from "svelte-i18n"

export async function load() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { default: rawMarkdown } = await import("../../../../README.md")

  return {
    readmeHTML: parseMarkdown(rawMarkdown).split("<h2>Tech stack</h2>")[0],
  }
}