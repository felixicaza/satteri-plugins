[![satteri-external-links](https://raw.githubusercontent.com/felixicaza/satteri-plugins/HEAD/.github/assets/satteri-external-links.jpg)](https://npmx.dev/package/satteri-external-links)

# 🌐 satteri-external-links

[![npm version](https://img.shields.io/npm/v/satteri-external-links?color=161924&logo=npm&logoColor=888888&labelColor=ffffff)](https://npmx.dev/package/satteri-external-links)
[![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/satteri-plugins/tests.yml?color=161924&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)](https://github.com/felixicaza/satteri-plugins/actions/workflows/tests.yml)
[![license](https://img.shields.io/badge/license-MIT-161924?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/satteri-plugins/blob/main/LICENSE)

The [`satteri-external-links`][satteri-external-links] plugin is designed to handle external links with [Satteri][satteri].

## ✨ Features

- 🌐 Handles external links, ensuring they have appropriate attributes for security and SEO.
- 🛡️ Applies `rel` and `target` to matching links with static values or callback-based logic.
- 🧩 Supports adding custom properties directly to `<a>` elements for styling and metadata.
- ⚡ Can append static or dynamic content to links with configurable wrapper properties for accessibility.

## 📦 Installation

You can install [`satteri-external-links`][satteri-external-links] using npm:

```sh
$ npm install satteri-external-links
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add satteri-external-links
  ```

  Using yarn:
  ```sh
  $ yarn add satteri-external-links
  ```

  Using bun:
  ```sh
  $ bun add satteri-external-links
  ```
</details>

## ⚡ Usage

Add the plugin in your project.

```js
import { markdownToHtml } from "satteri";
import satteriExternalLinks from "satteri-external-links";

const input = '<a href="https://example.com">HTTPS link</a>';

const { html } = await markdownToHtml(
  input,
  {
    mdastPlugins: [satteriExternalLinks],
  },
);

console.log(html); // Output: <a href="https://example.com" rel="nofollow">HTTPS link</a>
```

### ⚙️ Options

The plugin accepts an object options:

#### `content` (CreateContent) — optional (default: undefined)

Extra content appended at the end of matching links. Accepts a single node, multiple nodes, or a callback.

#### `contentProperties` (CreateProperties) — optional (default: undefined)

Properties for the wrapper element used to render appended `content`. Useful for accessibility, styling, or metadata.

#### `properties` (CreateProperties) — optional (default: undefined)

Extra properties applied directly to the `<a>` element.

#### `protocols` (string[]) — optional (default: ['http', 'https'])

Protocols to match for external links.

#### `rel` (CreateRel) — optional (default: ['nofollow'])

`rel` value for matching links.

#### `target` (CreateTarget) — optional (default: undefined)

`target` value for matching links.

<details>
  <summary>Example</summary>
  <br/>

  ```js
  import { markdownToHtml } from 'satteri'
  import externalLinks from 'satteri-external-links'

  const input = '<a href="https://example.com">HTTPS link</a>'

  const { html } = await markdownToHtml(input, {
    hastPlugins: [
      externalLinks({
        protocols: ['http', 'https', 'mailto'],
        rel: () => ['nofollow', 'noopener', 'noreferrer'],
        target: () => '_blank',
        properties: () => ({
          className: ['external-link'],
          'data-track': 'outbound'
        }),
        content: () => ({ type: 'text', value: ' (opens in a new window)' }),
        contentProperties: () => ({ className: ['sr-only'] })
      })
    ]
  })

  console.log(html) // <a href="https://example.com" rel="nofollow noopener noreferrer" target="_blank" class="external-link" data-track="outbound">HTTPS link<span class="sr-only"> (opens in a new window)</span></a>
  ```
</details>

See more examples in [tests folder](https://github.com/felixicaza/satteri-plugins/blob/main/packages/external-links/tests).

## 🏆 Credits

This plugin is the [Satteri][satteri] port of [@rehypejs/rehype-external-links](https://github.com/rehypejs/rehype-external-links).

## 📚 Related Projects

- [`satteri-directive`][satteri-directive]: A plugin to render markdown directives with Satteri.

## 🤝 Contributing

Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request, I appreciate your help in making [satteri-external-links][satteri-external-links] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/satteri-plugins/blob/main/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/satteri-plugins/blob/main/LICENSE) file for details.

[satteri]: https://satteri.bruits.org/
[satteri-external-links]: https://npmx.dev/package/satteri-external-links
[satteri-directive]: https://npmx.dev/package/satteri-directive
