import {emoji, EmojiFaker, EMOJIS, EmojiValue} from '@/value-fakers';
import {createFaker} from '@/create-faker';

let faker: Faker.FakerStatic;
let emojiFaker: EmojiFaker;

beforeEach(() => {
  faker = createFaker();
  emojiFaker = emoji(faker);
});

describe('EmojiFaker', () => {
  it('is function', () => {
    expect(typeof emojiFaker).toBe('function');
  });

  it('return EmojiValue', () => {
    const firstEmoji: EmojiValue = emojiFaker();

    expect(firstEmoji.type).toBe('emoji');
    expect(EMOJIS).toContain(firstEmoji.emoji);
  });

  it('return random emoji', () => {
    const firstEmoji: EmojiValue = emojiFaker();
    const secondEmoji: EmojiValue = emojiFaker();

    expect(firstEmoji.emoji).not.toBe(secondEmoji.emoji);
  });
});
