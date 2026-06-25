import { describe, expect, it } from 'vitest'
import { markdownToHtml } from 'satteri'
import dedent from 'dedent'

import satteriDirective from '../src/index.ts'

describe('satteri directive plugin', () => {
  it('should render a container', async() => {
    const input = dedent`
      :::section{#readme .container title="Container Directive"}

      Content here

      :::
    `
    const { html } = await markdownToHtml(input, { features: { directive: true }, mdastPlugins: [satteriDirective] })

    expect({ html }).toMatchSnapshot()
  })

  it('should render nested containers', async() => {
    const input = dedent`
      :::section{#first .container title="Container Directive"}

      First container

      :::section{#second .inner-container data-nested="true"}

      Second container

      :::

      :::
    `
    const { html } = await markdownToHtml(input, { features: { directive: true }, mdastPlugins: [satteriDirective] })

    expect({ html }).toMatchSnapshot()
  })

  it('should render a leaf directive', async() => {
    const input = dedent`
      ::input{type="text" @disabled}
    `
    const { html } = await markdownToHtml(input, { features: { directive: true }, mdastPlugins: [satteriDirective] })

    expect({ html }).toMatchSnapshot()
  })

  it('should render a text directive', async() => {
    const input = dedent`
      A :em[lovely] language know as :abbr[HTML]{title="HyperText Markup Language"}.
    `
    const { html } = await markdownToHtml(input, { features: { directive: true }, mdastPlugins: [satteriDirective] })

    expect({ html }).toMatchSnapshot()
  })

  it('should render a container, leaf and text directives', async() => {
    const input = dedent`
      :::main{#readme .test}

      Lorem:br
      ipsum.

      ::hr{.red}

      A :i[lovely] language know as :abbr[HTML]{title="HyperText Markup Language"}.

      :::
    `
    const { html } = await markdownToHtml(input, { features: { directive: true }, mdastPlugins: [satteriDirective] })

    expect({ html }).toMatchSnapshot()
  })
})
