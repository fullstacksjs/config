<div align="center">

<br/>
<br/>

<img src="https://raw.githubusercontent.com/fullstacksjs/config/main/assets/logo.svg" width="200" alt="@fullstacksjs/config logo" />

<br/>
<br/>
<br/>

![download status][download-badge]
![version][version-badge]
![Code Coverage][coverage-badge]
![MIT License][license-badge]
![semantic-release][semantic-badge]

Configuration management

</div>

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
  - [NodeJS](#nodejs)
  - [Deno](#deno)
  - [Browser](#browser)
- [Contributing](#contributing)
  - [Prerequisite](#prerequisite)
  - [Pull Request](#pull-request)
- [Code of Conduct](#code-of-conduct)
- [Documentation](#documentation)

## Installation

### NodeJS

```sh
$ npm install --save-dev @fullstacksjs/config
```

### Deno

```typescript
import * as config from 'https://raw.githubusercontent.com/fullstacksjs/config/main/mod.ts'
```

### Browser

```html
<script src='https://www.unpkg.com/@fullstacksjs/config/iife/index.js'></script>
<script>
  console.log(window.Config)
</script>
```

## Contributing

Development of config happens in GitHub, and we appreciate contributions.

### Prerequisite

- [volta][volta]
- [bash][bash]

### Pull Request

The FullstacksJS team is monitoring for pull requests. We will go ahead and review your pull request as soon as possible.

Before submitting a pull request, please make sure the following is done:

- Fork the repository and create your feature branch from dev.
- Run `npm install` to have all dependencies.
- To start development run `npm run test:watch`.
- Write tests in and implementation.
- Ensure everything is ok `npm run verify`.

## Code of Conduct

[FullstacksJS Rules Page](https://fullstacksjs.com/rules)

## Documentation

Please check out the [documentation page](https://config.fullstacksjs.com)

[download-badge]: https://img.shields.io/npm/dm/@fullstacksjs/config?color=EF6969&label=DOWNLOADS&style=flat-square
[version-badge]: https://img.shields.io/npm/v/@fullstacksjs/config?color=098FAA&label=VERSION&style=flat-square
[coverage-badge]: https://raw.githubusercontent.com/fullstacksjs/config/assets/assets/coverage.svg
[license-badge]: https://img.shields.io/npm/l/@fullstacksjs/config?color=EA5F12&label=LICENSE&style=flat-square
[semantic-badge]: https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release&color=7E98F7&label=SEMANTIC&style=flat-square (https://github.com/semantic-release/semantic-release)
[volta]: https://volta.sh/
[bash]: https://www.gnu.org/software/bash/
