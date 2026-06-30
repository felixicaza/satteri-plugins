/**
 * Tests adapted from [`@rehypejs/rehype-external-links`](https://github.com/rehypejs/rehype-external-links)
 *
 * @see https://github.com/rehypejs/rehype-external-links/blob/main/test.js
 */

import { describe, expect, it } from 'vitest'
import { markdownToHtml } from 'satteri'

import externalLinks from '../src/index.ts'

describe('satteri external links plugin without custom config', () => {
  it('should not change a relative link', async() => {
    const input = '<a href="./example.html">Relative link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should not change a fragment link', async() => {
    const input = '<a href="#section">Fragment link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should not change a search link', async() => {
    const input = '<a href="?query=example">Search link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should not change a mailto link', async() => {
    const input = '<a href="mailto:example@example.com">Mailto link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should change a protocol-relative link', async() => {
    const input = '<a href="//example.com">Protocol-relative link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should change a http link', async() => {
    const input = '<a href="http://example.com">HTTP link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should change a https link', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should not change a www link', async() => {
    const input = '<a href="www.example.com">WWW link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })

  it('should not add a `[target]` by default', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks()] })

    expect(html).toMatchSnapshot()
  })
})

/**
 * Tests with http/https protocol are bugged
 * @see https://github.com/bruits/satteri/issues/93
 * @see https://github.com/bruits/satteri/pull/96
 */
describe('satteri external links plugin with custom config', () => {
  it('should not add a `[rel]` w/ `rel: []`', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ rel: [] })] })

    expect(html).toMatchSnapshot()
  })

  it('should add a `[target]` w/ `target` set to a known target', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ target: '_blank', rel: [] })] })

    expect(html).toMatchSnapshot()
  })

  it('should add a `[rel]` w/ `rel` set to a string', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ rel: 'nofollow' })] })

    expect(html).toMatchSnapshot()
  })

  it('should add a `[rel]` w/ `rel` set to an array', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ rel: ['nofollow', 'noopener'] })] })

    expect(html).toMatchSnapshot()
  })

  it('should support `mailto` protocols w/ `mailto` in `protocols`', async() => {
    const input = '<a href="mailto:example@example.com">Mailto link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ protocols: ['mailto'] })] })

    expect(html).toMatchSnapshot()
  })

  it('should add content at the end of the link w/ `content` as a single child', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ content: { type: 'text', value: '🔗' } })] })

    expect(html).toMatchSnapshot()
  })

  it('should add content at the end of the link w/ `content` as an array of children', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ content: [{ type: 'text', value: ' (' }, { type: 'element', tagName: 'em', properties: {}, children: [{ type: 'text', value: 'opens in a new window' }] }, { type: 'text', value: ')' }] })] })

    expect(html).toMatchSnapshot()
  })

  it('should add properties to the span at the end of the link w/ `contentProperties`', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ content: { type: 'text', value: '🔗' }, contentProperties: { className: ['sr-only'] } })] })

    expect(html).toMatchSnapshot()
  })

  it('should add dynamic `content` to links', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ content: (element) => ({ type: 'text', value: ' (opens in a new window)' }), contentProperties: { className: ['sr-only'] } })] })

    expect(html).toMatchSnapshot()
  })

  it('should add dynamic `contentProperties` to links', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ content: { type: 'text', value: ' (opens in a new window)' }, contentProperties: (element) => ({ className: ['sr-only', 'hidden'] }) })] })

    expect(html).toMatchSnapshot()
  })

  it('should add dynamic `target`, `rel` to links', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ target: (element) => '_blank', rel: (element) => ['nofollow', 'noopener', 'noreferrer'] })] })

    expect(html).toMatchSnapshot()
  })

  it('should add rel to a link that matches the test function', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ rel: (element) => element.properties?.href === 'https://example.com' ? ['nofollow', 'noopener', 'noreferrer'] : undefined })] })

    expect(html).toMatchSnapshot()
  })

  it('should not add rel to a link that does not match the test function', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ rel: (element) => element.properties?.href === 'https://not-example.com' ? ['nofollow', 'noopener', 'noreferrer'] : undefined })] })

    expect(html).toMatchSnapshot()
  })

  it('should add properties to the link w/ `properties`', async() => {
    const input = '<a href="https://example.com">HTTPS link</a>'

    const { html } = await markdownToHtml(input, { hastPlugins: [externalLinks({ properties: { className: ['external-link'] } })] })

    expect(html).toMatchSnapshot()
  })
})
