export const FAIRY_TALE_PERSONAS = {
  duo: {
    id: 'duo',
    label: 'Couples',
    coverTag: 'A Love Chronicle',
    coverSubtitle: 'Our Memory Journal',
    coverChapter: 'Chapter One',
    coverHeading: 'Our Safe Space',
    coverQuote:
      'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    coverCta: 'Open Our Story',
    jarTitle: 'Our Dream Jar',
    jarPlaceholder: 'Share a dream together...',
    jarEmpty: 'Write down your future trips, dates, and wishes together!',
    emptyHeading: 'Your love story starts here',
    emptySub: 'Capture your first photo, note, or milestone together — every fairy tale begins with a single page.',
    continuation: 'And the story continues...',
  },
  family: {
    id: 'family',
    label: 'Family',
    coverTag: 'Our Family Heirloom',
    coverSubtitle: 'Seasons & Generations',
    coverChapter: 'Volume One',
    coverHeading: 'Under One Roof',
    coverQuote:
      'A family is a story written in laughter, warm kitchens, shared journeys, and the seasons we treasure together.',
    coverCta: 'Open Family Book',
    jarTitle: 'Our Family Wish Jar',
    jarPlaceholder: 'Add a family wish or trip...',
    jarEmpty: 'Collect future family holidays, traditions, and dreams in one jar!',
    emptyHeading: 'Your family heirloom begins here',
    emptySub: 'Preserve birthdays, reunions, festivals, and quiet Sunday mornings for generations to come.',
    continuation: 'Chapter by chapter, together...',
  },
  group: {
    id: 'group',
    label: 'Friends',
    coverTag: 'The Fellowship Chronicle',
    coverSubtitle: 'Adventures & Late Nights',
    coverChapter: 'Prologue',
    coverHeading: 'The Inner Circle',
    coverQuote:
      'Here is to the nights that turned into mornings, the roads we got lost on, and the friends who became family.',
    coverCta: 'Open Chronicle',
    jarTitle: 'Our Bucket-List Jar',
    jarPlaceholder: 'Drop a group adventure...',
    jarEmpty: 'Toss in road trips, reunions, and wild bucket-list ideas for the whole crew!',
    emptyHeading: 'Your fellowship chronicle starts here',
    emptySub: 'Keep every chaotic trip, inside joke, and unforgettable night out in one shared storybook.',
    continuation: 'To the next adventure...',
  },
  solo: {
    id: 'solo',
    label: 'Solo Journey',
    coverTag: "A Wanderer's Journal",
    coverSubtitle: 'Pages of Becoming',
    coverChapter: 'Chapter One',
    coverHeading: 'My Quiet Sanctuary',
    coverQuote:
      'Not all those who wander are lost — every mile, every quiet sunrise, and every small triumph writes a page worth keeping.',
    coverCta: 'Open My Journal',
    jarTitle: 'My Future Wishes',
    jarPlaceholder: 'Write a personal dream...',
    jarEmpty: 'Keep your solo adventures, personal goals, and quiet wishes safe inside.',
    emptyHeading: 'Your personal storybook starts here',
    emptySub: 'Capture the places you wander, the lessons you learn, and the quiet moments that shape you.',
    continuation: 'The journey unfolds...',
  },
};

export const getFairyTalePersona = (memberType) =>
  FAIRY_TALE_PERSONAS[memberType] || FAIRY_TALE_PERSONAS.duo;

export const toRoman = (num) => {
  if (!num || num < 1) return 'I';
  const pairs = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let n = Math.min(num, 39);
  let out = '';
  for (const [v, s] of pairs) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
};
