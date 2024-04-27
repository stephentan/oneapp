import slugify from "slugify";
export function getSlug(name: string): string {
  return slugify(name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}
