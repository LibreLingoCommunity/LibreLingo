import parseMarkdown from "../../utils/parseMarkdown"

export async function load() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { markdown } = await import("assets/docs/LICENSE.md")

    return {
        readmeHTML: parseMarkdown(markdown),
    }
}
