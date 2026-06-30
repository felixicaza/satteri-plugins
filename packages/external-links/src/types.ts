import type { HastNode, HastPluginDefinition } from 'satteri'

export type Resolvable<T, TNode extends HastNodeLike = ElementNode> = T | undefined | ((element: TNode) => T | undefined)

export type HastNodeLike = HastNode
export type HastPluginDefinitionLike = HastPluginDefinition
export type ElementNode = Extract<HastNodeLike, { type: 'element' }>

export type Target = '_blank' | '_parent' | '_self' | '_top'
export type PrimitiveProperties = Record<string, unknown>
export type CreateContent = Resolvable<HastNodeLike | HastNodeLike[]>
export type CreateProperties = Resolvable<PrimitiveProperties>
export type CreateRel = Resolvable<string | string[]>
export type CreateTarget = Resolvable<Target>

export interface VisitContext {
  setProperty: (node: ElementNode, key: string, value: unknown) => void
  appendChild: (node: ElementNode, child: HastNodeLike) => void
}

export interface Options {
  /**
   * Extra content appended at the end of matching links.
   * Accepts a single node, multiple nodes, or a callback.
   *
   * @example { type: 'text', value: '🔗' }
   * @example [{ type: 'text', value: ' (' }, { type: 'element', tagName: 'em', properties: {}, children: [{ type: 'text', value: 'opens in a new window' }] }, { type: 'text', value: ')' }]
   * @example (element) => element.properties?.href ? { type: 'text', value: ' (external)' } : undefined
   * @default undefined
   */
  content: CreateContent;

  /**
   * Properties for the wrapper element used to render appended `content`.
   * Useful for accessibility, styling, or metadata.
   *
   * @example { className: ['sr-only'] }
   * @example (element) => ({ className: ['sr-only', 'hidden'] })
   * @default undefined
   */
  contentProperties: CreateProperties;

  /**
   * Extra properties applied directly to the `<a>` element.
   *
   * @example { className: ['external-link'] }
   * @example (element) => ({ 'data-href': element.properties?.href })
   * @default undefined
   */
  properties: CreateProperties;

  /**
   * Protocols to match for external links and processed by the plugin.
   *
   * @example ['http', 'https']
   * @example ['http', 'https', 'mailto']
   * @default ['http', 'https']
   */
  protocols: string[];

  /**
   * `rel` value for matching links.
   * Accepts a string, an array, or a callback.
   *
   * @example 'nofollow'
   * @example ['nofollow', 'noopener', 'noreferrer']
   * @example (element) => element.properties?.href === 'https://example.com' ? ['nofollow', 'noopener', 'noreferrer'] : undefined
   * @default ['nofollow']
   */
  rel: CreateRel;

  /**
   * `target` value for matching links.
   * Accepts a known target or a callback.
   *
   * @example '_blank'
   * @example (element) => element.properties?.href ? '_blank' : undefined
   * @default undefined
   */
  target: CreateTarget;
}
