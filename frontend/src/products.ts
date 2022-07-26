import TProduct from './types/TProduct';

const products: TProduct[] = [
  {
    _id: '1',
    name: 'Fender Custom 56 Strat NOS FR GH',
    image: '/images/fender56.jpg',
    description:
      "This is a custom shop with light ash body, tinted neck AA birdseye maple, maple fretboard, 21 medium-sized jumbo frets, bone nut, 3 FAT '50s single coils. It also includes a tweed case, cable and certificate",
    brand: 'Fender',
    category: 'Stratocaster',
    price: 3885,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'ESP LTD James Hetfield Snakebyte',
    image: '/images/esphetfield.jpg',
    description:
      "Built for performance and loaded with aggressive features, the ESP LTD Snakebyte James Hetfield signature electric solidbody guitar doesn't just looks impressive, it delivers the sound that made metal what it is today.",
    brand: 'ESP',
    category: 'Signature',
    price: 1499,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Gibson Les Paul Standard 50s',
    image: '/images/gibson50.jpg',
    description:
      "Pure tone, prime playability. Two classic Burstbucker humbuckers adorn this feisty '50s guitar, giving it that vibrant vintage crunch which sails through to your soul.",
    brand: 'Gibson',
    category: 'Single-Cut',
    price: 2480,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    _id: '4',
    name: 'Ibanez AZ2204B-BK Prestige - Made in Japan',
    image: '/images/ibanezprestige.jpg',
    description:
      'Bolt-on neck, roasted maple fretboard, black dot inlays, 22 Jumbo stainless steel frets, 1 Seymour Duncan Hyperion humbucker (bridge) and 2 Seymour Duncan Hyperion single coils (middle and neck).',
    brand: 'Ibanez',
    category: 'Super Strat',
    price: 1980,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    _id: '5',
    name: 'PRS SE Custom 24 Floyd Charcoal Burst',
    image: '/images/prscustom24.jpg',
    description:
      'he PRS SE Custom 24 Floyd Violin Carve Top is a top of the range guitar that is guaranteed to take your performance to the next level. Its mahogany body, alongside its maple neck, offers smooth and rich tones, packed with power and punch that provides a perfect foundation for articulate playing.',
    brand: 'PRS Guitars',
    category: 'Double-Cut',
    price: 1153,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: '6',
    name: 'Jackson DKA-R EX - Limited Edition',
    image: '/images/jackson.jpg',
    description:
      'The bound maple neck features a scarf joint and graphite-reinforcement rods and with a laurel fretboard. Packed with modern features and great tone, the DKA-R EX may revolutionise your music making.',
    brand: 'Jackson',
    category: 'Super Strat',
    price: 700,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

export default products;
