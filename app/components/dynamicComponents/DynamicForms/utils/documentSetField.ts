export function documentSetField(name: string, value: string) {
  if (document) {
    const elements = document.getElementsByName(name);
    if (elements.length > 0) {
      for (const element of elements) {
        element.setAttribute("value", value);
      }
    }
  }
}
