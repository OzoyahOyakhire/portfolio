/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing in this site accepts a
 * `className` prop that needs to override a component's own classes, so there
 * are no conflicting utilities to resolve. If that ever changes, reach for
 * `tailwind-merge` then — not before.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
