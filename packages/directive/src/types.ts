import type { MdastPluginDefinition } from 'satteri'

export type MdastPluginDefinitionLike = MdastPluginDefinition
export type ContainerDirective = Parameters<NonNullable<MdastPluginDefinition['containerDirective']>>[0]
export type LeafDirective = Parameters<NonNullable<MdastPluginDefinition['leafDirective']>>[0]
export type TextDirective = Parameters<NonNullable<MdastPluginDefinition['textDirective']>>[0]
export type HastProps = Record<string, unknown>
export type DirectiveAttributes = Record<string, string | null | undefined> | null | undefined
