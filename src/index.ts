import {createFaker} from './create-faker';
import {emoji, EmojiFaker, external, ExternalFaker} from './value-fakers';
import * as Database from './database';
import * as Page from './page';

export interface NotionFakerOptions {
  seedValue: number;
  locale: string;
}

export interface INotionFaker {
  icon: {
    emoji: EmojiFaker;
    external: ExternalFaker;
  };

  cover: ExternalFaker;

  database: {
    title: Database.TitleFaker;
    properties: Database.PropertyFakers;
  };

  page: {
    properties: Page.PropertyFakers;
  };
}

export default class NotionFaker implements INotionFaker {
  public icon: INotionFaker['icon'];
  public cover: INotionFaker['cover'];
  public database: INotionFaker['database'];
  public page: INotionFaker['page'];

  private readonly faker: Faker.FakerStatic;

  public constructor(options?: Partial<NotionFakerOptions>) {
    const {seedValue, locale = 'en'} = options ?? {};

    this.faker = createFaker({locale, seedValue});
    this.cover = external(this.faker);
    this.icon = {
      emoji: emoji(this.faker),
      external: external(this.faker),
    };
    this.database = {
      title: Database.title(this.faker),
      properties: Database.properties,
    };
    this.page = {
      properties: Page.properties(this.faker),
    };
  }
}
