export const STORYBOOK_PROFILES = {
  duo: {
    id: 'duo',
    label: 'Couples',
    emoji: '💕',
    coverEyebrow: 'A Love Chronicle',
    coverSubtitle: 'Our Memory Journal',
    coverQuote:
      'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    coverHeading: 'Our Safe Space',
    coverLoadingTitle: 'Opening our story...',
    coverLoadingSub: 'Gathering every heartbeat and quiet moment',
    jarTitle: 'Our Dream Jar',
    jarEmptyHint: 'Write down your future trips, cozy nights, and dreams together!',
    toBeContinued: 'To be continued...',
    sampleMemory: {
      badge: '✈️ Trip Memory',
      date: 'Nov 14, 2025',
      time: '7:42 PM',
      title: 'First Rain in Udaipur',
      story:
        'We ran under the old stone archway with two cups of cutting chai while Lake Pichola turned gold in the rain. Still my favorite evening of the whole year.',
    },
    sampleWishes: [
      'Watch the Northern Lights together',
      'Stargaze in Spiti Valley',
      'Cook handmade pasta in Rome',
    ],
    presetWishes: [
      'Watch the Northern Lights',
      'Midnight drive to the coast',
      'Cook pasta together in Rome',
    ],
  },
  family: {
    id: 'family',
    label: 'Family',
    emoji: '🏡',
    coverEyebrow: 'Our Family Heirloom',
    coverSubtitle: 'Chapters of Home',
    coverQuote:
      'A family is a living storybook — written in shared tables, laughter across generations, and the warmth we carry home.',
    coverHeading: 'Under One Roof',
    coverLoadingTitle: 'Opening our heirloom...',
    coverLoadingSub: 'Gathering seasons of laughter and home',
    jarTitle: 'Our Family Wish Jar',
    jarEmptyHint: 'Save family reunions, holiday traditions, and places to explore together!',
    toBeContinued: 'Generations in the making...',
    sampleMemory: {
      badge: '🪔 Festival Night',
      date: 'Oct 20, 2025',
      time: '8:15 PM',
      title: 'Diwali on the Terrace',
      story:
        'Three generations lighting brass diyas together while Dadi told stories from 1978 and the kids chased sparklers across the warm brick terrace.',
    },
    sampleWishes: [
      'Summer reunion in the hills',
      'Bake Grandma’s recipe book together',
      'Family train trip across Kerala',
    ],
    presetWishes: [
      'Summer reunion in the hills',
      'Plant a mango tree in the yard',
      'Record Grandma’s favorite recipes',
    ],
  },
  group: {
    id: 'group',
    label: 'Friends',
    emoji: '🧭',
    coverEyebrow: 'The Fellowship Chronicle',
    coverSubtitle: 'Tales of Our Crew',
    coverQuote:
      'Here is to the nights that turned into mornings, the unplanned detours, and the friends who quietly became family.',
    coverHeading: 'The Inner Circle',
    coverLoadingTitle: 'Opening the chronicle...',
    coverLoadingSub: 'Collecting inside jokes and unforgettable nights',
    jarTitle: 'Our Bucket-List Jar',
    jarEmptyHint: 'Drop future roadtrips, concerts, and chaotic adventures for the crew!',
    toBeContinued: 'Next adventure loading...',
    sampleMemory: {
      badge: '🚗 Roadtrip',
      date: 'Mar 08, 2025',
      time: '2:10 AM',
      title: '3 AM Highway Maggi',
      story:
        'Missed the last turn to Kasol, pulled over at a tiny dhaba under a million stars, and laughed so hard we forgot we had a flat tire.',
    },
    sampleWishes: [
      'Rent a campervan in Spiti',
      'See Coldplay live together',
      'Annual Goa reunion every December',
    ],
    presetWishes: [
      'Roadtrip to Leh-Ladakh',
      'Rent a villa for New Year’s',
      'Go skydiving as a squad',
    ],
  },
  solo: {
    id: 'solo',
    label: 'Solo',
    emoji: '🌙',
    coverEyebrow: 'A Wanderer’s Grimoire',
    coverSubtitle: 'Pages of Becoming',
    coverQuote:
      'Not all those who wander are lost — every quiet morning, solo mile, and small victory writes a page worth keeping.',
    coverHeading: 'My Quiet Sanctuary',
    coverLoadingTitle: 'Opening your journal...',
    coverLoadingSub: 'Gathering the miles and quiet milestones',
    jarTitle: 'My Future Wishes',
    jarEmptyHint: 'Capture personal milestones, solo travels, and dreams for your next chapter!',
    toBeContinued: 'Still becoming...',
    sampleMemory: {
      badge: '🌱 Milestone',
      date: 'Jan 19, 2025',
      time: '6:30 AM',
      title: 'Sunrise Above Triund',
      story:
        'Woke up before dawn with a thermos of black coffee and watched the Dhauladhar peaks catch first light. Quietest, clearest morning of my life.',
    },
    sampleWishes: [
      'Solo autumn week in Kyoto',
      'Publish my first short story',
      'Learn pottery by the sea',
    ],
    presetWishes: [
      'Solo autumn week in Kyoto',
      'Run my first half-marathon',
      'Watch sunrise in Cappadocia',
    ],
  },
};

export const getStorybookProfile = (memberType) =>
  STORYBOOK_PROFILES[memberType] || STORYBOOK_PROFILES.duo;

export const toRoman = (num) => {
  const map = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let n = Math.max(1, num);
  let out = '';
  for (const [val, sym] of map) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
};
