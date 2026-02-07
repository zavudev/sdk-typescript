# Changelog

## 0.25.0 (2026-02-07)

Full Changelog: [v0.24.0...v0.25.0](https://github.com/zavudev/sdk-typescript/compare/v0.24.0...v0.25.0)

### Features

* **mcp:** add initial server instructions ([5018598](https://github.com/zavudev/sdk-typescript/commit/501859814b065d583f107dac3f31afce3fe085c2))


### Bug Fixes

* **client:** avoid removing abort listener too early ([dd4ee95](https://github.com/zavudev/sdk-typescript/commit/dd4ee9536c567cd02a504e511e20fd18a2b5267f))


### Chores

* **client:** restructure abort controller binding ([09455bc](https://github.com/zavudev/sdk-typescript/commit/09455bccc408f84ca22f1c0d85eff3a0ff7c5ec2))
* **internal:** add health check to MCP server when running in HTTP mode ([793f768](https://github.com/zavudev/sdk-typescript/commit/793f7687d459ce183a9b24d6bd135a8e2bc27054))
* **internal:** fix pagination internals not accepting option promises ([66d7756](https://github.com/zavudev/sdk-typescript/commit/66d7756dede366ae2acc4ecfcbcf2a10f192edf0))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([e704028](https://github.com/zavudev/sdk-typescript/commit/e704028ee8d8cfcc3cdb78e30a7d20d26555b127))
* **internal:** upgrade pnpm ([839c079](https://github.com/zavudev/sdk-typescript/commit/839c07987747c8c839be4f0b2eb3c8a6a266fee8))

## 0.24.0 (2026-02-04)

Full Changelog: [v0.23.0...v0.24.0](https://github.com/zavudev/sdk-typescript/compare/v0.23.0...v0.24.0)

### Features

* **api:** api update ([fbadff7](https://github.com/zavudev/sdk-typescript/commit/fbadff70ff321a78e095b93f7dcd48b4726e8eba))
* **api:** api update ([dc5ba67](https://github.com/zavudev/sdk-typescript/commit/dc5ba676658b08c3b3b8830b2752d583c6b61353))
* **api:** api update ([477adf0](https://github.com/zavudev/sdk-typescript/commit/477adf0473ca0095b5d5911e7e4b87083c1c5602))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([5735c02](https://github.com/zavudev/sdk-typescript/commit/5735c02f063116e52db30b0d7242756b38fb9aae))
* **docs:** fix mcp installation instructions for remote servers ([894623c](https://github.com/zavudev/sdk-typescript/commit/894623ca341ae2964f20f8703d8061ee6b5b798f))
* **mcp:** allow falling back for required env variables ([6a7a2c4](https://github.com/zavudev/sdk-typescript/commit/6a7a2c4422b996f1951a917842e197cf55a74f3a))


### Chores

* **ci:** upgrade `actions/github-script` ([ed24164](https://github.com/zavudev/sdk-typescript/commit/ed241647245ffd2914f0680961237705abd71b3c))
* **client:** do not parse responses with empty content-length ([dbf5b3e](https://github.com/zavudev/sdk-typescript/commit/dbf5b3ea13581d22cbf5d077ff3215a72ac0b2e0))
* **internal:** codegen related update ([ea82acd](https://github.com/zavudev/sdk-typescript/commit/ea82acd40d044cbac90157f7919ad201e936e63a))
* **internal:** support oauth authorization code flow for MCP servers ([2997378](https://github.com/zavudev/sdk-typescript/commit/29973783540cf9beb5a87350ab1585ac04e0a848))
* **mcp:** up tsconfig lib version to es2022 ([0c0b186](https://github.com/zavudev/sdk-typescript/commit/0c0b1869b4604fcf8829c1471db786268add9edb))

## 0.23.0 (2026-01-21)

Full Changelog: [v0.22.0...v0.23.0](https://github.com/zavudev/sdk-typescript/compare/v0.22.0...v0.23.0)

### Features

* **api:** api update ([ba0d465](https://github.com/zavudev/sdk-typescript/commit/ba0d46537614eacc625b55f7d6436c5f3a7ef3ee))

## 0.22.0 (2026-01-17)

Full Changelog: [v0.21.0...v0.22.0](https://github.com/zavudev/sdk-typescript/compare/v0.21.0...v0.22.0)

### Features

* **api:** api update ([ec22306](https://github.com/zavudev/sdk-typescript/commit/ec2230616341b95434418a5038fc3ca509c090e3))


### Bug Fixes

* flag defaults ([80f91af](https://github.com/zavudev/sdk-typescript/commit/80f91afef3f4910409724b0620ff70dad789ddc2))


### Chores

* fix typo in descriptions ([c64ad8b](https://github.com/zavudev/sdk-typescript/commit/c64ad8b2bbbadfdb26b29432f22d077a153a5d1f))
* **internal:** codegen related update ([028bc2e](https://github.com/zavudev/sdk-typescript/commit/028bc2ea1525973c34a925843622a3fc72672a4c))
* **internal:** codegen related update ([cc94bab](https://github.com/zavudev/sdk-typescript/commit/cc94babbee657fe5841940b7c0296b74590760a4))
* **internal:** codegen related update ([ce51f3d](https://github.com/zavudev/sdk-typescript/commit/ce51f3dc02b1c0ada4af74882250a3787113153e))
* **internal:** update `actions/checkout` version ([c0470b0](https://github.com/zavudev/sdk-typescript/commit/c0470b089ed5c722d96c8413397a1e537e168504))
* **internal:** update lock file ([4c0a397](https://github.com/zavudev/sdk-typescript/commit/4c0a397726f962877644776478ab998d3f828fae))
* **internal:** upgrade babel, qs, js-yaml ([7025d85](https://github.com/zavudev/sdk-typescript/commit/7025d85191f481040de053832f44dba0c3c4b18b))
* **internal:** upgrade brace-expansion and @babel/helpers ([58ff4d1](https://github.com/zavudev/sdk-typescript/commit/58ff4d1ee184ff9b0bc9bb47a8226c8f12c2a217))
* **mcp:** add intent param to execute tool ([5f197f5](https://github.com/zavudev/sdk-typescript/commit/5f197f5d127818c28a1afe3cd2f703a73e7edee4))
* **mcp:** pass intent param to execute handler ([6c441e2](https://github.com/zavudev/sdk-typescript/commit/6c441e23a32f7c1e43c14f8af8809777fff46559))
* **mcp:** upgrade dependencies ([25b78ac](https://github.com/zavudev/sdk-typescript/commit/25b78ac6b55a14b067c3e1d42f6967e89fe9dff0))

## 0.21.0 (2026-01-13)

Full Changelog: [v0.20.0...v0.21.0](https://github.com/zavudev/sdk-typescript/compare/v0.20.0...v0.21.0)

### Features

* **api:** api update ([19fc098](https://github.com/zavudev/sdk-typescript/commit/19fc09872f452ebdf8b9ea49227c4f4b9914328d))
* **api:** api update ([5b42b7c](https://github.com/zavudev/sdk-typescript/commit/5b42b7c9f03767f1a8bb657c3f2c291c76abaf75))


### Chores

* **internal:** codegen related update ([24cf55e](https://github.com/zavudev/sdk-typescript/commit/24cf55e53c1e2d689aebf59f5182ff2355b69edd))
* **internal:** codegen related update ([e0ed170](https://github.com/zavudev/sdk-typescript/commit/e0ed170bd80403db215ce8adf3dff04c53e9a219))
* **internal:** codegen related update ([ec60130](https://github.com/zavudev/sdk-typescript/commit/ec601303611ca403935bcbc4130bc4da0a85b7d8))
* **internal:** codegen related update ([0928c76](https://github.com/zavudev/sdk-typescript/commit/0928c76ee86224157f9e55aad54b979d09559e44))

## 0.20.0 (2026-01-11)

Full Changelog: [v0.19.1...v0.20.0](https://github.com/zavudev/sdk-typescript/compare/v0.19.1...v0.20.0)

### Features

* **api:** api update ([e5c3b4d](https://github.com/zavudev/sdk-typescript/commit/e5c3b4d34c23e1252d67f64de605ba7280db9ea3))
* **api:** api update ([fb1693a](https://github.com/zavudev/sdk-typescript/commit/fb1693a109927bde36b0db5c4e4bd44ff9e885de))


### Bug Fixes

* **mcp:** update code tool prompt ([c3f0620](https://github.com/zavudev/sdk-typescript/commit/c3f0620c778358811906336ca9365750ba03638e))

## 0.19.1 (2026-01-08)

Full Changelog: [v0.19.0...v0.19.1](https://github.com/zavudev/sdk-typescript/compare/v0.19.0...v0.19.1)

### Bug Fixes

* **mcp:** correct code tool api output types ([b6b9d65](https://github.com/zavudev/sdk-typescript/commit/b6b9d654eb4c2f67a1664a5d628bead608308054))
* **mcp:** fix env parsing ([2d48dae](https://github.com/zavudev/sdk-typescript/commit/2d48dae22cc865ff835c7731284bdb6e033a4940))
* **mcp:** fix options parsing ([d3b9157](https://github.com/zavudev/sdk-typescript/commit/d3b91572a8ca1ff516a814aa5508e9b2f72bdfcf))


### Chores

* break long lines in snippets into multiline ([14d1c4d](https://github.com/zavudev/sdk-typescript/commit/14d1c4dd29717421f1199c1eaf5a476b3a7d66a9))
* **internal:** fix dockerfile ([35820d8](https://github.com/zavudev/sdk-typescript/commit/35820d8c6c0b9404e62974ca5a97fb8d46b0a7a0))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([5d439e4](https://github.com/zavudev/sdk-typescript/commit/5d439e499c6aa2e169537dd50116fbd79ec72862))

## 0.19.0 (2026-01-01)

Full Changelog: [v0.18.0...v0.19.0](https://github.com/zavudev/sdk-typescript/compare/v0.18.0...v0.19.0)

### Features

* **api:** api update ([6d57fff](https://github.com/zavudev/sdk-typescript/commit/6d57fffac9d4c7fcab138fba8a73a383c43531b6))


### Chores

* configure new SDK language ([c82f8fd](https://github.com/zavudev/sdk-typescript/commit/c82f8fd9a3a787c2db972c18e21adac8ecb462fb))

## 0.18.0 (2025-12-28)

Full Changelog: [v0.17.0...v0.18.0](https://github.com/zavudev/sdk-typescript/compare/v0.17.0...v0.18.0)

### Features

* **api:** manual updates ([9cebff1](https://github.com/zavudev/sdk-typescript/commit/9cebff105b8972df22eb36990fda602fb80791c2))

## 0.17.0 (2025-12-25)

Full Changelog: [v0.16.0...v0.17.0](https://github.com/zavudev/sdk-typescript/compare/v0.16.0...v0.17.0)

### Features

* **api:** api update ([9203e11](https://github.com/zavudev/sdk-typescript/commit/9203e11ab3153581f89eb87c05e3199dfbb72dbc))

## 0.16.0 (2025-12-21)

Full Changelog: [v0.15.1...v0.16.0](https://github.com/zavudev/sdk-typescript/compare/v0.15.1...v0.16.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** api update ([8698960](https://github.com/zavudev/sdk-typescript/commit/86989608ac8890f7b8d948d4dd93c92a41b855b5))


### Chores

* **mcp:** remove deprecated tool schemes ([afc243c](https://github.com/zavudev/sdk-typescript/commit/afc243c8b7c7820bc86d417b5112a42420212603))

## 0.15.1 (2025-12-18)

Full Changelog: [v0.15.0...v0.15.1](https://github.com/zavudev/sdk-typescript/compare/v0.15.0...v0.15.1)

### Bug Fixes

* **mcp:** pass base url to code tool ([e49787d](https://github.com/zavudev/sdk-typescript/commit/e49787d3208eb9ee6bdb803457ef45a5d3b40a69))

## 0.15.0 (2025-12-17)

Full Changelog: [v0.14.0...v0.15.0](https://github.com/zavudev/sdk-typescript/compare/v0.14.0...v0.15.0)

### Features

* **api:** api update ([3723e12](https://github.com/zavudev/sdk-typescript/commit/3723e12157665af2495fd4218a160a8222786955))
* **api:** whatsapp profile ([86dd444](https://github.com/zavudev/sdk-typescript/commit/86dd4440417427868e999348aa6a14a83fb1396f))

## 0.14.0 (2025-12-16)

Full Changelog: [v0.13.0...v0.14.0](https://github.com/zavudev/sdk-typescript/compare/v0.13.0...v0.14.0)

### Features

* **api:** add submit template ([898c01f](https://github.com/zavudev/sdk-typescript/commit/898c01fa04bfd8d51a1439d4e521b02f90dd40f8))
* **api:** api update ([57d8669](https://github.com/zavudev/sdk-typescript/commit/57d86695a95475e658c4368a37efeadf4d66d6c7))
* **api:** api update ([429f973](https://github.com/zavudev/sdk-typescript/commit/429f973230d75b9dc9509a7cef172cae0b9e7c44))

## 0.13.0 (2025-12-16)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/zavudev/sdk-typescript/compare/v0.12.0...v0.13.0)

### Features

* **api:** api update ([3bf685a](https://github.com/zavudev/sdk-typescript/commit/3bf685a9b7d55c346ae6a2857bcf1ae62efabf50))
* **api:** api update ([41c88d5](https://github.com/zavudev/sdk-typescript/commit/41c88d584c7ec7cdac7b97d76bff182336330e75))
* **api:** api update ([9c11162](https://github.com/zavudev/sdk-typescript/commit/9c11162c6906beabfb43e28c946f04e8a7eb6c95))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([702068f](https://github.com/zavudev/sdk-typescript/commit/702068fe41a88d458baffb9f06dbc1dfc5bc535a))

## 0.12.0 (2025-12-10)

Full Changelog: [v0.11.2...v0.12.0](https://github.com/zavudev/sdk-typescript/compare/v0.11.2...v0.12.0)

### Features

* **api:** api update ([23ac0cd](https://github.com/zavudev/sdk-typescript/commit/23ac0cd1e0d6c13372d6d01b1ebc772c000e386f))
* **api:** manual updates ([798747b](https://github.com/zavudev/sdk-typescript/commit/798747b207400b4e9ecc95ca7dbdcb4500e2f31f))

## 0.11.2 (2025-12-09)

Full Changelog: [v0.11.1...v0.11.2](https://github.com/zavudev/sdk-typescript/compare/v0.11.1...v0.11.2)

### Chores

* **internal:** configure MCP Server hosting ([dd376af](https://github.com/zavudev/sdk-typescript/commit/dd376af9117fa01c2302ab8f2e994a03d56faa56))
* **internal:** unconfigure MCP Server hosting ([bacab00](https://github.com/zavudev/sdk-typescript/commit/bacab002ae940526ac7382c8d05676940e8634e8))

## 0.11.1 (2025-12-09)

Full Changelog: [v0.11.0...v0.11.1](https://github.com/zavudev/sdk-typescript/compare/v0.11.0...v0.11.1)

### Chores

* **internal:** escape package name in pnpm workspace file ([253f8d7](https://github.com/zavudev/sdk-typescript/commit/253f8d76669e1def0970d4ae2326808d9b3dbacd))

## 0.11.0 (2025-12-08)

Full Changelog: [v0.10.0...v0.11.0](https://github.com/zavudev/sdk-typescript/compare/v0.10.0...v0.11.0)

### Features

* **api:** phone numbers api ([87b85f0](https://github.com/zavudev/sdk-typescript/commit/87b85f07abff0354364c9b896b92c75a7141b3aa))

## 0.10.0 (2025-12-05)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/zavudev/sdk-typescript/compare/v0.9.0...v0.10.0)

### Features

* **mcp:** add typescript check to code execution tool ([96a7f31](https://github.com/zavudev/sdk-typescript/commit/96a7f31ffb3ccf64bdc23e7cccfca6d253e7ddad))


### Chores

* use latest @modelcontextprotocol/sdk ([8bc5bc1](https://github.com/zavudev/sdk-typescript/commit/8bc5bc1fd79385e8e3d7cd8526c2ac7d612ffc1e))

## 0.9.0 (2025-12-05)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/zavudev/sdk-typescript/compare/v0.8.0...v0.9.0)

### Features

* **api:** fix other issues ([5752dcc](https://github.com/zavudev/sdk-typescript/commit/5752dcc208dd17fa8fd6fe6b21b0b88e666be052))

## 0.8.0 (2025-12-05)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/zavudev/sdk-typescript/compare/v0.7.0...v0.8.0)

### Features

* **api:** manual updates ([e024219](https://github.com/zavudev/sdk-typescript/commit/e024219469be4a16fd2dbeee2a9ecfbe3e7490ff))

## 0.7.0 (2025-12-05)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/zavudev/sdk-typescript/compare/v0.6.0...v0.7.0)

### Features

* **api:** fix pagination ([fa34b2f](https://github.com/zavudev/sdk-typescript/commit/fa34b2f9c4f8ca148a630b0bb42ea57c73df587b))


### Chores

* configure new SDK language ([9f97f81](https://github.com/zavudev/sdk-typescript/commit/9f97f81d838e9360912f5a62008e476c3ff7f1e6))
* **internal:** configure MCP Server hosting ([ec1a962](https://github.com/zavudev/sdk-typescript/commit/ec1a9620360218539933a3651df5c3af86759668))

## 0.6.0 (2025-12-04)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/zavudev/sdk-typescript/compare/v0.5.0...v0.6.0)

### Features

* **api:** api update ([4e8450e](https://github.com/zavudev/sdk-typescript/commit/4e8450ed370b37b477f8e691b1e3a15babf5df9e))

## 0.5.0 (2025-12-04)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/zavudev/sdk-typescript/compare/v0.4.0...v0.5.0)

### Features

* **api:** update api docs ([870a1b2](https://github.com/zavudev/sdk-typescript/commit/870a1b2931be36ea517a8925702f786d9ca7e05e))

## 0.4.0 (2025-12-04)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/zavudev/sdk-typescript/compare/v0.3.0...v0.4.0)

### Features

* **api:** api update ([041f967](https://github.com/zavudev/sdk-typescript/commit/041f9678c27400019f67590bc9b3f3a17a9e5b1d))

## 0.3.0 (2025-12-04)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/zavudev/sdk-typescript/compare/v0.2.0...v0.3.0)

### Features

* **api:** manual updates ([a9591a3](https://github.com/zavudev/sdk-typescript/commit/a9591a3b6d8d284fe59762a194c4b2f934307e96))

## 0.2.0 (2025-12-04)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/zavudev/sdk-typescript/compare/v0.1.0...v0.2.0)

### Features

* **api:** manual updates ([c6cf7f4](https://github.com/zavudev/sdk-typescript/commit/c6cf7f4e07d6af90f555334297f2ce4fe0d8ee6f))

## 0.1.0 (2025-12-04)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/zavudev/sdk-typescript/compare/v0.0.1...v0.1.0)

### Features

* **api:** manual updates ([3475ec1](https://github.com/zavudev/sdk-typescript/commit/3475ec15d5ee7d30076322791c4a8c331c697ba4))
* fixes ([b89ce42](https://github.com/zavudev/sdk-typescript/commit/b89ce42cc31eda8493b8ac760abd23a9741dabe4))


### Chores

* sync repo ([38e00cb](https://github.com/zavudev/sdk-typescript/commit/38e00cbf7e60cbfd97a310f05503df9cdbe44ff2))
* update SDK settings ([4694bbd](https://github.com/zavudev/sdk-typescript/commit/4694bbde31526ff2cd46211c4ca0823b598ddb5d))
