# @narkdown/notion-faker

> Generate massive amounts of fake contextual data for Notion

[![codecov](https://codecov.io/gh/narkdown/notion-faker/branch/main/graph/badge.svg)](https://codecov.io/gh/narkdown/notion-faker)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![npm version](https://badge.fury.io/js/@narkdown%2Fnotion-faker.svg)](https://badge.fury.io/js/@narkdown%2Fnotion-faker)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## Demo

> [Demo Notion Page](https://narkdown.notion.site/25c28416474b4419bb57ba2e336041e7?v=f8248b338b8e44e59abb4069ff62572a)

![demo-notion-faker](https://user-images.githubusercontent.com/48426991/142585741-840b4908-4bb2-49a0-9313-acef24ece95a.gif)

## Why?

To mocking Notion API request data.

## Install

```
$ npm install @narkdown/notion-faker
```

## Usage

```typescript
const {NotionFaker} = require('@narkdown/notion-faker');

const notionFaker = new NotionFaker({
  seedValue: 100,
  locale: 'en',
});
```

## Example

### Prep Work

1. [Create a Notion API Integration](https://developers.notion.com/docs#step-1-create-an-integration)
2. Create Page in Notion to add database.
3. Create an Example Database with your own properties.
4. [Share Page with your integration](https://developers.notion.com/docs#step-1-create-an-integration)

```typescript
const {Client} = require('@notionhq/client');
const {NotionFaker} = require('@narkdown/notion-faker');

const NOTION_API_KEY = ''; // Notion API Key
const EXAMPLE_DATABASE_ID = ''; // Database for importing Property Scheme.
const PARENT_PAGE_ID = ''; // Parent page to create database.
const ROW_COUNT = 100; // ⚠️ Creating too many pages using the Notion API is a heavy task.

const notion = new Client({auth: NOTION_API_KEY});
const notionFaker = new NotionFaker();

(async () => {
  const {properties: scheme} = await notion.databases.retrieve({
    database_id: EXAMPLE_DATABASE_ID,
  });

  const {id: databaseId} = await notion.databases.create({
    parent: {
      page_id: PARENT_PAGE_ID,
    },
    title: notionFaker.database.title()()(),
    properties: notionFaker.database.properties.propertiesByScheme(scheme),
    icon: notionFaker.icon.emoji(),
    cover: notionFaker.cover()(),
  });

  for (const _ of Array.from({length: ROW_COUNT})) {
    await narkdown.pages.create({
      parent: {database_id: TEST_DATABASE_ID},
      properties: notionFaker.page.properties.propertiesByScheme(scheme),
    });
  }
})();
```

## API

### `const notionFaker = new NotionFaker(options?)`

#### `notionFaker.icon.emoji()`

#### `notionFaker.icon.external(methodPath?)(...args?)`

#### `notionFaker.cover(methodPath?)(...args?)`

#### `notionFaker.database.title(methodPath?)(...args?)(options?)`

#### `notionFaker.database.properties`

- `title(options?)`
- `rich_text(options?)`
- `number(options?)`
- `select(options?)`
- `multi_select(options?)`
- `date(options?)`
- `files(options?)`
- `checkbox(options?)`
- `url(options?)`
- `email(options?)`
- `phone_number(options?)`
- `formula(options?)`
- `relation(options)`
- `rollup(options)`
- `people(options?)`
- `created_by(options?)`
- `created_time(options?)`
- `last_edited_by(options?)`
- `last_edited_time(options?)`
- `propertiesByScheme(propertyScheme)`

#### `notionFaker.page.properties`

- `title(methodPath?)(...args)(options?)`,
- `rich_text(methodPath?)(...args)(options?)`,
- `number(methodPath?)(...args)`,
- `select(methodPath?)(...args)(options?)`,
- `multi_select(methodPath?)(...args)(options?)`,
- `date(methodPath?)(...args)(options?)`,
- `files(methodPath?)(...args)(options?)`,
- `checkbox()`,
- `url()`,
- `email(...args)`,
- `phone_number(methodPath?)(...args)(options?)`,
- `propertiesByScheme(propertyScheme)`

## Support

### [Database Object](https://developers.notion.com/reference/database)

| Property           | Supported |
| ------------------ | --------- |
| `object`           | ❌        |
| `id`               | ❌        |
| `created_time`     | ❌        |
| `last_edited_time` | ❌        |
| `title`            | ✅        |
| `icon`             | ✅        |
| `cover`            | ✅        |
| `properties`       | ✅        |
| `parent`           | ❌        |
| `url`              | ❌        |

### [Page Object](https://developers.notion.com/reference/page)

| Property           | Supported |
| ------------------ | --------- |
| `object`           | ❌        |
| `id`               | ❌        |
| `created_time`     | ❌        |
| `last_edited_time` | ❌        |
| `archived`         | ❌        |
| `icon`             | ✅        |
| `cover`            | ✅        |
| `properties`       | ⚠️        |
| `parent`           | ❌        |
| `url`              | ❌        |

#### Property Object

| Property           | Page (Child of Database) | Page (Child of Page) |
| ------------------ | ------------------------ | -------------------- |
| `title`            | ✅                       | ✅                   |
| `rich_text`        | ✅                       | ❌                   |
| `number`           | ✅                       | ❌                   |
| `select`           | ✅                       | ❌                   |
| `multi_select`     | ✅                       | ❌                   |
| `date`             | ✅                       | ❌                   |
| `files`            | ✅                       | ❌                   |
| `checkbox`         | ✅                       | ❌                   |
| `url`              | ✅                       | ❌                   |
| `email`            | ✅                       | ❌                   |
| `phone_number`     | ✅                       | ❌                   |
| `formula`          | ❌                       | ❌                   |
| `relation`         | ❌                       | ❌                   |
| `rollup`           | ❌                       | ❌                   |
| `people`           | ❌                       | ❌                   |
| `created_by`       | ❌                       | ❌                   |
| `created_time`     | ❌                       | ❌                   |
| `last_edited_by`   | ❌                       | ❌                   |
| `last_edited_time` | ❌                       | ❌                   |

## Related

- [Marak/faker.js](https://github.com/Marak/faker.js)

## License

[MIT](LICENSE)
