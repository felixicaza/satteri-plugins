import type { ContainerDirective, LeafDirective, TextDirective, HastProps, DirectiveAttributes } from './types.ts'

export function directiveAttrsToHastProps(attributes: DirectiveAttributes): HastProps {
  const props: HastProps = {}

  if (!attributes) return props

  for (const [key, value] of Object.entries(attributes)) {
    if (value === null || value === undefined) continue

    if (key === 'class' || key === 'className') {
      props.className = value.split(/\s+/).filter(Boolean)
      continue
    }

    props[key] = value
  }

  return props
}

export function setDirectiveData<T extends ContainerDirective | LeafDirective | TextDirective>(
  node: T,
  hName: string,
  hProperties: HastProps = {}
): T {
  return {
    ...node,
    data: { hName, hProperties }
  }
}
