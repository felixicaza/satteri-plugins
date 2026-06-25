[![satteri-directive](https://raw.githubusercontent.com/felixicaza/satteri-plugins/HEAD/.github/assets/satteri-directive.jpg)](https://npmx.dev/package/satteri-directive)

# 🧩 satteri-directive

[![npm version](https://img.shields.io/npm/v/satteri-directive?color=161924&logo=npm&logoColor=888888&labelColor=ffffff)](https://npmx.dev/package/satteri-directive)
[![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/satteri-plugins/tests.yml?color=161924&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)](https://github.com/felixicaza/satteri-plugins/actions/workflows/tests.yml)
[![license](https://img.shields.io/badge/license-MIT-161924?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/satteri-plugins/blob/main/LICENSE)

The [`satteri-directive`][satteri-directive] plugin is designed to render [markdown directives](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) with [Satteri](https://satteri.bruits.org/).

## ✨ Features

- 📦 Supports container directives, useful for creating custom blocks of content.
- 🧩 Provides leaf directives, allowing for inline content customization.
- 📝 Enables text directives, enabling the addition of custom text elements.

## 📦 Installation

You can install [`satteri-directive`][satteri-directive] using npm:

```sh
$ npm install satteri-directive
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add satteri-directive
  ```

  Using yarn:
  ```sh
  $ yarn add satteri-directive
  ```

  Using bun:
  ```sh
  $ bun add satteri-directive
  ```
</details>

## ⚡ Usage

Add the plugin in your project.

```js
import { markdownToHtml } from "satteri";
import satteriDirective from "satteri-directive";

const input = `
  :::main{#readme.myClass}

  Lorem:br
  ipsum.

  ::hr{.red}

  A :i[lovely] language know as :abbr[HTML]{title="HyperText Markup Language"}.

  :::
`;

const { html } = await markdownToHtml(input,
  {
    features: { directive: true }, // Important enable the directive feature
    mdastPlugins: [satteriDirective],
  },
);

console.log(html);
```

> [!IMPORTANT]
> You must enable the `directive` feature in the [`features`](https://satteri.bruits.org/docs/features/) option when using this plugin.

## 🏆 Credits

This plugin is the [Satteri](https://satteri.bruits.org/) port of [@remarkjs/remark-directive](https://github.com/remarkjs/remark-directive/).

## 🤝 Contributing

Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request, I appreciate your help in making [satteri-directive][satteri-directive] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/satteri-plugins/blob/main/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/satteri-plugins/blob/main/LICENSE) file for details.

[satteri-directive]: https://npmx.dev/package/satteri-directive
