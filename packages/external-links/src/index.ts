import type { Options, HastPluginDefinitionLike } from './types.ts'

import { defineHastPlugin } from 'satteri'

import { isExternalUrl } from './utils.ts'
import { applyContent, applyProperties, applyRel, applyTarget } from './transforms.ts'

const TAG_NAME = 'a'
const URL_PROTOCOLS = ['http', 'https']
const DEFAULT_REL = ['nofollow']

export default function externalLinks(options: Partial<Options> = {}): HastPluginDefinitionLike {
  const protocols = options.protocols ?? URL_PROTOCOLS

  return defineHastPlugin({
    name: 'satteri-external-links',
    element: {
      filter: [TAG_NAME],
      visit(node, context) {
        if (node.type !== 'element' || node.tagName !== TAG_NAME) return

        const href = node.properties?.href
        if (typeof href !== 'string' || !isExternalUrl(href, protocols)) return

        applyProperties(context, node, options.properties)
        applyRel(context, node, options.rel, DEFAULT_REL)
        applyTarget(context, node, options.target)
        applyContent(context, node, options)
      }
    }
  })
}
