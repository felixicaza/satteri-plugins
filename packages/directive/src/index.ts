import type { MdastPluginDefinitionLike, ContainerDirective, LeafDirective, TextDirective } from './types.ts'

import { defineMdastPlugin } from 'satteri'

import { directiveAttrsToHastProps, setDirectiveData } from './utils.ts'

type DirectiveNode = ContainerDirective | LeafDirective | TextDirective

function handleDirective(node: DirectiveNode) {
  return setDirectiveData(node, node.name, directiveAttrsToHastProps(node.attributes))
}

export default function satteriDirective(): MdastPluginDefinitionLike {
  return defineMdastPlugin({
    name: 'satteri-directive',
    containerDirective: handleDirective,
    leafDirective: handleDirective,
    textDirective: handleDirective
  })
}
