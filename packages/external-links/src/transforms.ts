import type { CreateProperties, ElementNode, Options, VisitContext } from './types.ts'

import { cloneValue, createProperties, normalizeChildren, normalizeRelTokens } from './utils.ts'

export function applyContent(context: VisitContext, node: ElementNode, options: Partial<Options>) {
  const children = normalizeChildren(createProperties(options.content, node))
  if (children.length === 0) return

  const spanProps = createProperties(options.contentProperties, node) ?? {}

  context.appendChild(node, {
    type: 'element',
    tagName: 'span',
    properties: cloneValue(spanProps),
    children: cloneValue(children)
  } as ElementNode)
}

export function applyProperties(context: VisitContext, node: ElementNode, properties: CreateProperties | undefined) {
  const props = createProperties(properties, node)
  if (!props) return

  for (const [key, value] of Object.entries(props)) {
    context.setProperty(node, key, cloneValue(value))
  }
}

export function applyRel(context: VisitContext, node: ElementNode, rel: Options['rel'], defaultRel: string[]) {
  const tokens = normalizeRelTokens(createProperties(rel, node), defaultRel)
  if (tokens.length > 0) {
    context.setProperty(node, 'rel', tokens)
  }
}

export function applyTarget(context: VisitContext, node: ElementNode, target: Options['target']) {
  const value = createProperties(target, node)
  if (value) {
    context.setProperty(node, 'target', value)
  }
}
