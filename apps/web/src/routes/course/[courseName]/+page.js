export async function load(page) {
  const { get_course } = await import("../../../course-client")
  const { courseName } = page.params

  return await get_course({ courseName })
}
