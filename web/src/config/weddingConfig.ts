export interface CouplePerson {
  name: string;
  role: string;
  parentsLine: string;
  vowQuote: string;
  portraitUrl: string;
  portraitAlt: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  subtitle: string;
  icon: 'arrival' | 'poruwa' | 'reception' | 'lunch' | 'celebration' | 'sendoff';
}

export interface GuestWish {
  id: string;
  quote: string;
  author: string;
  lang?: 'en' | 'si';
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface WeddingTemplateConfig {
  slug: string;
  monogram: string;
  shortPair: string;
  couple: {
    brideName: string;
    groomName: string;
    fullTitle: string;
    hashtag: string;
    establishedYear: string;
  };
  event: {
    heroBadge: string;
    displayDateUpper: string;
    displayDateCard: string;
    displayDayName: string;
    displayDateFooter: string;
    isoDateTime: string;
    endIsoDateTime: string;
    timeLabel: string;
    ceremonyTitle: string;
    venueCaption: string;
    venueName: string;
    venueCity: string;
    venuePhotoUrl: string;
    mapsUrl: string;
    rsvpDeadline: string;
  };
  media: {
    audioUrl?: string;
    audioTitle: string;
  };
  countdown: {
    heading: string;
    subtitle: string;
    calendarCta: string;
  };
  loveStory: {
    heading: string;
    paragraphs: string[];
  };
  happyCouple: {
    heading: string;
    subtitle: string;
    bride: CouplePerson;
    groom: CouplePerson;
  };
  ourPromise: {
    eyebrow: string;
    quote: string;
    leftStamp: string;
    rightStamp: string;
  };
  weddingDetails: {
    heading: string;
    subtitle: string;
    locationCta: string;
  };
  orderOfEvents: {
    heading: string;
    events: TimelineEvent[];
  };
  rsvp: {
    heading: string;
    subtitle: string;
    saveDateTitle: string;
    saveDateBody: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    submitCta: string;
    successTitle: string;
    successBody: string;
  };
  wordsOfLove: {
    heading: string;
    subtitle: string;
    wishes: GuestWish[];
  };
  closing: {
    heading: string;
    body: string;
    rsvpCta: string;
    calendarCta: string;
  };
  footer: {
    aboutText: string;
    contacts: ContactPerson[];
    copyright: string;
    creditText: string;
    creditLinkLabel: string;
    creditLinkUrl: string;
  };
}

export const weddingConfig: WeddingTemplateConfig = {
  slug: 'hansini-kavishka-2026',
  monogram: 'HK',
  shortPair: 'H & K',
  couple: {
    brideName: 'HANSINI',
    groomName: 'KAVISHKA',
    fullTitle: 'Hansini & Kavishka',
    hashtag: '#Hansini&Kavishka2026',
    establishedYear: '2026',
  },
  event: {
    heroBadge: "WE'RE GETTING MARRIED!",
    displayDateUpper: 'FRIDAY, 23 OCTOBER 2026',
    displayDateCard: '23rd October 2026',
    displayDayName: 'FRIDAY',
    displayDateFooter: '23rd October, 2026',
    isoDateTime: '2026-10-23T10:00:00+05:30',
    endIsoDateTime: '2026-10-23T16:00:00+05:30',
    timeLabel: '10.00 AM Onwards',
    ceremonyTitle: 'PORUWA CEREMONY & RECEPTION',
    venueCaption: 'The Celebration',
    venueName: 'The Marigold Hotel',
    venueCity: 'Gampola',
    venuePhotoUrl: './assets/venue-celebration.jpg',
    mapsUrl: 'https://maps.google.com/?q=The+Marigold+Hotel+Gampola+Sri+Lanka',
    rsvpDeadline: '1st October 2026',
  },
  media: {
    audioTitle: 'Wedding Ambient Melody',
  },
  countdown: {
    heading: 'COUNTING DOWN TO FOREVER',
    subtitle: 'Our special day is almost here',
    calendarCta: 'ADD TO GOOGLE CALENDAR',
  },
  loveStory: {
    heading: 'OUR LOVE STORY',
    paragraphs: [
      'In 2018, we met as friends, never imagining that a simple friendship would grow into the love of a lifetime. For eight beautiful years, we have shared endless laughter, countless memories, little disagreements, and unforgettable moments that shaped us together. Through every season, we chose each other, grew together, and watched our love become stronger with every passing day.',
      'From friendship to love, from eight beautiful years to forever, our journey has led us to this beautiful beginning of a lifetime together.',
    ],
  },
  happyCouple: {
    heading: 'THE HAPPY COUPLE',
    subtitle: 'What began as a moment became our forever',
    bride: {
      name: 'HANSINI',
      role: 'THE BRIDE',
      parentsLine: 'Beloved daughter of Mr. Jayathunga Pathirana and Mrs. Chandani Pathirana',
      vowQuote:
        '“Forever was once just a word, until he came into my life and showed me what it truly means to be loved, cherished, and chosen—every single day.”',
      portraitUrl: './assets/bride-portrait.jpg',
      portraitAlt: 'Bridal portrait of Hansini',
    },
    groom: {
      name: 'KAVISHKA',
      role: 'THE GROOM',
      parentsLine: 'Beloved son of Mr. Anil Perera and Mrs. Renuka Perera',
      vowQuote:
        '“From the moment I found her, my heart knew its forever. Today, I choose her—with all my heart, for all my tomorrows.”',
      portraitUrl: './assets/groom-portrait.jpg',
      portraitAlt: 'Groom portrait of Kavishka',
    },
  },
  ourPromise: {
    eyebrow: 'OUR PROMISE',
    quote:
      '“Two hearts, one journey, and a lifetime ahead. We promise to love deeply, stand together, grow together, and choose one another through it all.”',
    leftStamp: 'EST. 2026',
    rightStamp: 'SOULMATES',
  },
  weddingDetails: {
    heading: 'WEDDING DETAILS',
    subtitle: 'All the important information you need to celebrate our special day with us.',
    locationCta: 'VIEW LOCATION',
  },
  orderOfEvents: {
    heading: 'ORDER OF EVENTS',
    events: [
      {
        time: '9.30 AM',
        title: 'Guest arrival',
        subtitle: 'Seating and settling in',
        icon: 'arrival',
      },
      {
        time: '10.00 AM',
        title: 'Poruwa ceremony',
        subtitle: 'Tying the knot and blessings',
        icon: 'poruwa',
      },
      {
        time: '11.00 AM',
        title: 'Reception begins',
        subtitle: 'Music, drinks and photos',
        icon: 'reception',
      },
      {
        time: '12.30 PM',
        title: 'Lunch',
        subtitle: 'A feast to celebrate love',
        icon: 'lunch',
      },
      {
        time: '1.30 PM',
        title: 'Celebration',
        subtitle: 'Toasts & dancing',
        icon: 'celebration',
      },
      {
        time: '4.00 PM',
        title: 'Reception ends',
        subtitle: 'Thanks & Send off',
        icon: 'sendoff',
      },
    ],
  },
  rsvp: {
    heading: 'RSVP',
    subtitle: "Kindly let us know if you'll be joining us by 1st October 2026.",
    saveDateTitle: 'Save the Date!',
    saveDateBody: 'We cordially invite you to witness the joyous celebration.',
    namePlaceholder: 'Eg: Namal Perera',
    messagePlaceholder: 'Leave the couple a beautiful note!',
    submitCta: 'SEND RSVP WITH LOVE',
    successTitle: 'Thank You With All Our Hearts!',
    successBody: 'Your RSVP and warm wishes have been recorded. We cannot wait to celebrate with you.',
  },
  wordsOfLove: {
    heading: 'WORDS OF LOVE',
    subtitle:
      'Hear the words of our family and friends as they share the beautiful moments, memories, and heartfelt reflections that have shaped our love story.',
    wishes: [
      {
        id: 'w-1',
        quote:
          '“දයාබර අනිල් අයියේ රේණු අක්කේ, ඔබ දෙපළගේ ආදරණීය පුතුට සහ දියණියට ඔවුන් අලුතින් පියමං තබන්නට යන යුග දිවිය සාර්ථක සතුට සැනසුම දිනෙන් දින වැඩිවන ලස්සන ජීවිතයකට සුබ පතනවා.”',
        author: 'Sugath Perera and family',
        lang: 'si',
      },
      {
        id: 'w-2',
        quote:
          '“Counting down the days until you officially become a bride! Wishing you both the happiest start to this beautiful new adventure together.”',
        author: 'Nethmi & Friends',
        lang: 'en',
      },
      {
        id: 'w-3',
        quote:
          '“May your home always be filled with laughter, patience, and the gentle grace you both bring to everyone around you. Congratulations Hansini & Kavishka!”',
        author: 'Uncle Rohan & Aunt Malini',
        lang: 'en',
      },
      {
        id: 'w-4',
        quote:
          '“Eight wonderful years of friendship blossoming into forever. So grateful to witness your love story reach this unforgettable chapter.”',
        author: 'Kasun & Dilini',
        lang: 'en',
      },
    ],
  },
  closing: {
    heading: "WE CAN'T WAIT TO CELEBRATE WITH YOU!",
    body: 'Thank you for being part of our love story. Your presence will make our wedding day absolutely perfect.',
    rsvpCta: 'RSVP WITH LOVE',
    calendarCta: 'Add to Calendar',
  },
  footer: {
    aboutText:
      "Thank you for visiting our wedding website and being part of our love story. We can't wait to celebrate with you!",
    contacts: [
      { name: 'Hansini', phone: '071 306 3321' },
      { name: 'Kavishka', phone: '075 555 2095' },
    ],
    copyright: "© 2026 Hansini & Kavishka's Wedding",
    creditText: 'Crafted with timeless elegance for your special day.',
    creditLinkLabel: 'Wedding Invitation Template',
    creditLinkUrl: '#hero',
  },
};
