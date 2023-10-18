export function filtered<T>(arr: T[], item: keyof T): string[] {
  let items: string[] = []
  arr.forEach((e) => {
    if (e[item]) {
      //@ts-ignore
      items.push(e[item])
    }
  })
  return items
}
