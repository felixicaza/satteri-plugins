import type { HastNodeLike, Resolvable } from './types.ts'

function splitRelTokens(tokens: string): string[] {
  return tokens.trim().split(/\s+/).filter(Boolean)
}

export function cloneValue<T>(value: T): T {
  return structuredClone(value)
}

export function createProperties<T, TNode extends HastNodeLike>(value: Resolvable<T, TNode>, element: TNode): T | undefined {
  if (typeof value === 'function') {
    return (value as (element: TNode) => T | undefined)(element)
  }

  return value
}

export function isExternalUrl(href: string, protocols: string[]): boolean {
  // treat protocol-relative URLs as external
  if (href.startsWith('//')) return true

  const match = href.match(/^([a-zA-Z][a-zA-Z\d+.-]*):/)
  if (!match) return false

  return protocols.includes(match[1])
}

export function normalizeChildren(value: HastNodeLike | HastNodeLike[] | undefined): HastNodeLike[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

export function normalizeRelTokens(rel: string | string[] | undefined, defaultRel: string[]): string[] {
  if (rel === undefined) {
    return [...defaultRel]
  }

  if (typeof rel === 'string') {
    return splitRelTokens(rel)
  }

  return rel
}
