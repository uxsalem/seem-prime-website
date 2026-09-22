import type { CSSProperties } from 'react'

/**
 * The design of this site is authored as CSS declaration strings — the same strings the
 * original `.dc.html` templates carried in their `style` attributes, and the same strings the
 * style builders in `src/lib/content` still assemble. React wants an object, so `css()` parses
 * one into `CSSProperties` and memoises the result: the strings are constant per render path,
 * so after the first pass every lookup is a Map hit.
 */
const cache = new Map<string, CSSProperties>()

/** Split on top-level `;` only — semicolons inside `url()`, quotes or nested parens stay put. */
function declarations(input: string): string[] {
  const out: string[] = []
  let depth = 0
  let quote: string | null = null
  let start = 0
  for (let i = 0; i < input.length; i++) {
    const c = input[i]
    if (quote) {
      if (c === quote && input[i - 1] !== '\\') quote = null
      continue
    }
    if (c === '"' || c === "'") quote = c
    else if (c === '(') depth++
    else if (c === ')') depth = Math.max(0, depth - 1)
    else if (c === ';' && depth === 0) {
      out.push(input.slice(start, i))
      start = i + 1
    }
  }
  out.push(input.slice(start))
  return out
}

/** `background-image` → `backgroundImage`, `-webkit-text-stroke` → `WebkitTextStroke`. */
function camel(prop: string): string {
  if (prop.startsWith('--')) return prop
  const parts = prop.replace(/^-ms-/, 'ms-').split('-')
  return parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

export function css(decl: string | undefined | null): CSSProperties {
  if (!decl) return {}
  const hit = cache.get(decl)
  if (hit) return hit

  const style: Record<string, string> = {}
  for (const chunk of declarations(decl)) {
    const colon = chunk.indexOf(':')
    if (colon < 0) continue
    const prop = chunk.slice(0, colon).trim()
    const value = chunk.slice(colon + 1).trim()
    if (!prop || !value) continue
    style[camel(prop)] = value
  }

  const frozen = style as CSSProperties
  cache.set(decl, frozen)
  return frozen
}

/** Merge a declaration string with extra properties, e.g. a `--i` stagger index. */
export function cssWith(decl: string | undefined | null, extra: CSSProperties): CSSProperties {
  return { ...css(decl), ...extra }
}

/** `--i` custom properties are legal in a style object but not in React's typings. */
export function vars(record: Record<string, string | number>): CSSProperties {
  return record as CSSProperties
}
