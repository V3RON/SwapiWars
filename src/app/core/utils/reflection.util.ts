export function getGetters(inst: unknown): string[] {
  return Object.keys(inst).filter(name => {
    return typeof Object.getOwnPropertyDescriptor(inst, name)["get"] === "function"
  });
}
