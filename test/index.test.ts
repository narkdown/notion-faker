/* eslint-disable @typescript-eslint/ban-ts-comment */
import process from 'node:process';
import dotenv from 'dotenv';
import {Client as NotionClient} from '@notionhq/client';
import {
  CreateDatabaseResponse,
  CreatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';
import NotionFaker from '@/index';
import * as Page from '@/page';
import * as Database from '@/database';
import {EmojiValue, ExternalValue} from '@/value-fakers';

dotenv.config();

let notionFakers: Record<string, NotionFaker>;
let notion: NotionClient;
let NOTION_API_KEY: string;
let ENTRY_POINT_PAGE_ID: string;
let RELATION_DATABASE_ID: string;
let TEST_PAGE_ID: string;
let TEST_DATABASE_ID: string;

beforeAll(async () => {
  const seedValue = 1;
  NOTION_API_KEY = process.env.NOTION_API_KEY!;
  ENTRY_POINT_PAGE_ID = process.env.ENTRY_POINT_PAGE_ID!;

  notion = new NotionClient({auth: NOTION_API_KEY});

  notionFakers = {
    default: new NotionFaker({seedValue}),
    en: new NotionFaker({seedValue, locale: 'en'}),
    ko: new NotionFaker({seedValue, locale: 'ko'}),
  };
});

describe('create test page', () => {
  let response: CreatePageResponse;
  let fakeTitle: Page.PropertyValueOf<'title'>;
  let fakeEmoji: EmojiValue;
  let fakeCover: ExternalValue;

  beforeAll(async () => {
    fakeTitle = notionFakers.default.page.title()()();
    fakeEmoji = notionFakers.default.icon.emoji();
    fakeCover = notionFakers.default.cover()();

    response = await notion.pages.create({
      parent: {
        page_id: ENTRY_POINT_PAGE_ID,
      },
      properties: {
        title: fakeTitle,
      },
      icon: fakeEmoji,
      cover: fakeCover,
    });

    TEST_PAGE_ID = response.id;
  });

  it('text content of title is equal to fake title value', async () => {
    expect(response.properties.title.type).toBe('title');
    expect(response.properties.title).toHaveProperty('title');

    // @ts-expect-error
    expect(response.properties.title.title[0].text.content).toEqual(
      // @ts-expect-error
      fakeTitle.title[0].text.content,
    );
  });

  it('icon is equal to fake emoji', async () => {
    expect(response.icon?.type).toBe('emoji');
    expect(response.icon).toHaveProperty('emoji');

    expect(response.icon).toEqual(fakeEmoji);
  });

  it('cover is equal to fake emoji', async () => {
    expect(response.cover?.type).toBe('external');
    expect(response.cover).toHaveProperty('external');

    expect(response.cover).toEqual(fakeCover);
  });
});

describe('create test database', () => {
  let response: CreateDatabaseResponse;
  let fakeEmoji: EmojiValue;
  let fakeCover: ExternalValue;

  beforeAll(async () => {
    const relationDatabaseResponse = await notion.databases.create({
      parent: {
        page_id: TEST_PAGE_ID,
      },
      title: notionFakers.default.database.title()()(),
      properties: {
        title: notionFakers.default.database.properties.title(),
      },
    });

    RELATION_DATABASE_ID = relationDatabaseResponse.id;

    fakeEmoji = notionFakers.default.icon.emoji();
    fakeCover = notionFakers.default.cover()();

    response = await notion.databases.create({
      parent: {
        page_id: TEST_PAGE_ID,
      },
      title: notionFakers.default.database.title()()(),
      properties: {
        title: notionFakers.default.database.properties.title(),
        rich_text: notionFakers.default.database.properties.rich_text(),
        number: notionFakers.default.database.properties.number(),
        select: notionFakers.default.database.properties.select(),
        multi_select: notionFakers.default.database.properties.multi_select(),
        date: notionFakers.default.database.properties.date(),
        files: notionFakers.default.database.properties.files(),
        checkbox: notionFakers.default.database.properties.checkbox(),
        url: notionFakers.default.database.properties.url(),
        email: notionFakers.default.database.properties.email(),
        phone_number: notionFakers.default.database.properties.phone_number(),
        formula: notionFakers.default.database.properties.formula(),
        relation: notionFakers.default.database.properties.relation({
          database_id: RELATION_DATABASE_ID,
        }),
        rollup: notionFakers.default.database.properties.rollup({
          rollup_property_name: 'title',
          relation_property_name: 'relation',
          function: 'count',
        }),
        people: notionFakers.default.database.properties.people(),
        created_by: notionFakers.default.database.properties.created_by(),
        created_time: notionFakers.default.database.properties.created_time(),
        last_edited_by:
          notionFakers.default.database.properties.last_edited_by(),
        last_edited_time:
          notionFakers.default.database.properties.last_edited_time(),
      },
      icon: fakeEmoji,
      cover: fakeCover,
    });

    TEST_DATABASE_ID = response.id;
  });

  it('has properties', async () => {
    for (const propertyKey of Database.SUPPORTED_PROPERTIES) {
      // NOTE: notion database API response does not have formula.
      if (propertyKey === 'formula') continue;

      expect(response.properties).toHaveProperty(propertyKey);
      expect(response.properties[propertyKey].type).toBe(propertyKey);
      expect(response.properties[propertyKey]).toHaveProperty(propertyKey);
    }
  });

  it('icon is equal to fake emoji', async () => {
    expect(response.icon?.type).toBe('emoji');
    expect(response.icon).toHaveProperty('emoji');

    expect(response.icon).toEqual(fakeEmoji);
  });

  it('cover is equal to fake emoji', async () => {
    expect(response.cover?.type).toBe('external');
    expect(response.cover).toHaveProperty('external');

    expect(response.cover).toEqual(fakeCover);
  });
});

describe('create pages with properties', () => {
  let response: CreatePageResponse;
  let fakeEmoji: EmojiValue;
  let fakeCover: ExternalValue;

  beforeAll(async () => {
    fakeEmoji = notionFakers.default.icon.emoji();
    fakeCover = notionFakers.default.cover()();

    const {properties: scheme} = await notion.databases.retrieve({
      database_id: TEST_DATABASE_ID,
    });

    response = await notion.pages.create({
      parent: {
        database_id: TEST_DATABASE_ID,
      },
      properties: notionFakers.default.page.propertiesByScheme(scheme),
      icon: fakeEmoji,
      cover: fakeCover,
    });
  });

  it('When given database scheme, then create page with properties', async () => {
    for (const propertyKey of Page.SUPPORTED_PROPERTIES) {
      expect(response.properties).toHaveProperty(propertyKey);
      expect(response.properties[propertyKey].type).toBe(propertyKey);
      expect(response.properties[propertyKey]).toHaveProperty(propertyKey);
    }
  });

  it('icon is equal to fake emoji', async () => {
    expect(response.icon?.type).toBe('emoji');
    expect(response.icon).toHaveProperty('emoji');

    expect(response.icon).toEqual(fakeEmoji);
  });

  it('cover is equal to fake emoji', async () => {
    expect(response.cover?.type).toBe('external');
    expect(response.cover).toHaveProperty('external');

    expect(response.cover).toEqual(fakeCover);
  });
});

afterAll(async () => {
  await notion.blocks.delete({
    block_id: TEST_PAGE_ID,
  });
});
