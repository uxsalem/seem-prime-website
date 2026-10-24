import type { Lang } from '@/lib/site'

/**
 * The site's photography, named once.
 *
 * Each entry carries the full-bleed file, a lighter cut for cards and rails, a 20px blur-up
 * placeholder to paint under the frame while the real file arrives, the focal point a crop
 * should hold on to, and alt text in both languages. Call sites reference a `Photo`, never a
 * path, so re-shooting a subject is a one-line change here.
 *
 * There are two sets. The golden-hour set was shot at one light across every sector, so a
 * refinery, a warehouse, a coast and a cinema read as one landscape rather than a stock collage.
 * The sector set is the client's own, and more realistic: since October 18 a picture for each hour
 * of the hero's day, and since October 19 the reel, the statement, the home page's closing window,
 * the about and ecosystem mastheads and the platforms on the ecosystem page, all from the same
 * October 18 delivery, and Nefaah's detail from the brand guideline the client sent for it. The
 * home page never shows one photograph twice, and the ecosystem page shows none that the home
 * page does. The brand's deep green is the ground they all sit on — scrims, sections, the dark
 * between frames — never a tint laid over the pictures themselves.
 */
export type Photo = {
  /** Full-bleed cut — plates, mastheads, banners, the hero. */
  src: string
  /** The full cut's pixel width, for `srcset`. */
  w: number
  /** 1280px cut — framed windows up to ~1000px wide: the reel, the stage panels. */
  md?: string
  /** ~880px cut — cards, rails, gallery tiles. */
  sm: string
  /** 400px cut — frames a word or two wide, like the statement's capsules. Falls back to `sm`. */
  xs?: string
  /** A 20px WebP, inlined: the frame is never empty, even on the first paint. */
  lqip: string
  /** Default `object-position` / `background-position` for a crop. */
  focus: string
  alt: Record<Lang, string>
}

const img = (name: string, w: number) => ({ src: `/ds/img/${name}.webp`, w, sm: `/ds/img/${name}-sm.webp` })
/** The golden-hour set also ships a middle cut, for windows too large for a card cut. */
const set = (name: string, w: number) => ({ ...img(name, w), md: `/ds/img/${name}-md.webp` })
/**
 * A picture that only exists at card size — a tile cut from a contact sheet, or a detail that only
 * ever fills a framed window — uses the one file for both cuts.
 */
const tile = (name: string, w = 585) => ({ src: `/ds/img/${name}-sm.webp`, w, sm: `/ds/img/${name}-sm.webp` })
/**
 * A platform's mark ships as one 720 × 900 card, the shape of its thumbnail in the home page's
 * index on a wide screen.
 */
const mark = (name: string) => ({ src: `/ds/img/${name}.webp`, w: 720, sm: `/ds/img/${name}.webp` })

/**
 * Every cut a photograph has, as a `srcset`, so a frame the browser can size — a full-bleed
 * plate, a window with a known share of the viewport — fetches the cut it needs rather than the
 * largest one. Tiles have a single cut and get none.
 */
export const srcSet = (photo: Photo): string | undefined =>
  photo.src === photo.sm
    ? undefined
    : [photo.sm + ' 880w', photo.md ? photo.md + ' 1280w' : '', photo.src + ' ' + photo.w + 'w'].filter(Boolean).join(', ')

export const photos = {
  // --- The golden-hour set: one picture per sector --------------------------------------------

  /** An engineer on a gantry above a processing plant, the range behind it. Industry at scale. */
  industry: {
    ...set('industrial-plant-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JZACdMoADYtHjGPiNVIwYAP7HdLwzonZxGtECa0o0lRXAMMTGZESoLxn+B+ljPmH2SK+kvmsSCYzof5OW0EMJg7aYktoDVqyfSbIJttAAAA==',
    focus: '58% 50%',
    alt: {
      ar: 'مهندس يحمل جهازاً لوحياً يطل على منشأة صناعية عند الغروب، والجبال خلفها',
      en: 'An engineer with a tablet overlooking a processing plant at sunset, mountains beyond',
    },
  },
  /** Loading bays, forklifts and a line of trucks, the highway running off to the city. */
  logistics: {
    ...set('logistics-hub-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAABwBACdASoUAAoAPu1iqU2ppaOiMAgBMB2JYgCdMoGv/gPg+I5wtTzieepC0AD+x20+0TsveKmV11YYktca9oWIrcnOnfapbkhwvI9VZ5w6nDg0RCDLnIQqHWq6U7UJhPYvfRKFUqMftRQOo/JSgVhwgAr6GU8hCraQWMqcCQAAAA==',
    focus: '60% 55%',
    alt: {
      ar: 'مركز لوجستي عند الغروب: أرصفة تحميل ورافعات شوكية وصف من الشاحنات، والمدينة والجبال في الأفق',
      en: 'A logistics hub at golden hour — loading bays, forklifts and a line of trucks, the city and mountains beyond',
    },
  },
  /** A stone-and-timber residence lit at dusk. Real estate, finished and lived in. */
  residence: {
    ...set('residence-golden-hour', 1774),
    lqip: 'data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADQAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JYgCdABeW4/fGyGCGKSAA/bYATnKaHmBE6h0u8dk8pqW09hldRgDLR+IHwylGFXPIh3JaATK2dtuVerzKoENCV1+c7oQElGiW0i4AYFkN+578NhinpJsONAA=',
    focus: '62% 50%',
    alt: {
      ar: 'مسكن من الحجر والخشب مضاء عند الغروب، وأشجار الزيتون عند مدخله',
      en: 'A stone-and-timber residence lit at dusk, olive trees at the entrance',
    },
  },
  /**
   * A phone settling a payment at a contactless terminal. The source frame opens on a block
   * carrying the national emblem; the export crops it out of every cut.
   */
  payments: {
    ...set('payments-tap', 1402),
    lqip: 'data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAAAQBACdASoUAA0APu1iqU2ppaOiMAgBMB2JYgCdACLpDjh2scARd/mzAAD5S0GcZWrSV4IYtNEH3FkF67KY5QIrT7vlDm8hGQwg0sm5WI463vUWiCUPrP5SuYtmr1AcwxtjCH3Qjy80Uqd7k2TUGS3/edhNVRNf+pz80DfoO2gn/SHqD+WEOsQkIhlMYWNamuraGDIXfGd3fIuKpBN3EVwAAAA=',
    focus: '58% 46%',
    alt: {
      ar: 'هاتف يُتمّ دفعة عبر جهاز دفع لا تلامسي، وعلى شاشته «تم الدفع بنجاح»',
      en: 'A phone paying at a contactless terminal, the screen confirming the payment',
    },
  },
  /** A lounge by the fountains, a concert stage lit beyond. An evening destination. */
  leisure: {
    ...set('leisure-destination', 1774),
    lqip: 'data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAACQBACdASoUAAoAPu1iqU2ppaQiMAgBMB2JagCdMoRwDqAAMdfOIkP33sWf7QAA/rxygBzFB2WfWcBX4OGSHCcsuZHF+JYc48hRDIwVHqI5hpcDCW0WfqlxflXtRZ5+y67UL+Cry1wkcyqBqK4RweA4F94CxcGkyKruMUUCINgJOzf3iw/iFkM/yX0NN4mAAAA=',
    focus: '60% 50%',
    alt: {
      ar: 'وجهة مسائية: جلسات بجوار النوافير، ومسرح حفلات مضاء في الخلفية',
      en: 'An evening destination — a lounge by the fountains, a concert stage lit beyond',
    },
  },
  /** Code on a laptop before the Riyadh skyline, the cloud and the data drawn in the air. */
  technology: {
    ...set('riyadh-tech-horizon', 1672),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQAwCdASoUAAsAPu1iqk2ppaQiMAgBMB2JQBOgAapdWRXrHUF3KAAA/oasoR+7EWnvCLbgoi/SvaMkpoVV2h3uAcqF+nhp74gaMZ+nk8sgO/d2UPhlh3lP6GERRfqLpT+Fmt7T6CgZSDv/3ZP0l7q2cKD2Wt9ApRqAAA==',
    focus: '60% 48%',
    alt: {
      ar: 'حاسوب محمول بشيفرة برمجية أمام أفق الرياض عند الغروب، وأيقونات السحابة والبيانات تطفو فوقه',
      en: 'A laptop of code before the Riyadh skyline at golden hour, cloud and data icons in the air above it',
    },
  },
  /**
   * The same desk and skyline, with the focus pulled. `techFar` holds the skyline sharp and lets
   * the laptop and the holograms go soft; `techNear` does the reverse. Each plane is blurred
   * with only its own colours, so neither bleeds into the other. The strategy page racks
   * between the two.
   */
  techFar: {
    ...set('riyadh-tech-horizon-far', 1672),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBOgBHn5B+F0VKRb0BcAAP6GrKEftjBUEW3BRF9rNhntBIzj4blxVe4Y7NmH5CR/SkZ9NZFLhTSgwxU46Pjsu1l/oYRF0/KdM6DYj/2tsq65R7YLryJAVNvOquxw/V5L5mAA',
    focus: '60% 48%',
    alt: {
      ar: 'أفق الرياض واضحاً عند الغروب، وأمامه حاسوب محمول وأيقونات رقمية خارج نطاق التركيز',
      en: 'The Riyadh skyline in focus at golden hour, a laptop and floating data icons soft in the foreground',
    },
  },
  techNear: {
    ...set('riyadh-tech-horizon-near', 1672),
    lqip: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADQAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOgBHpriisBbZOU7gAA/oasoR+2Ht0djjKWMnaMetUphFHpx3AHKhf4cAWR1XA8SlvcikXER+9wwA6ccH4dz1p0HYqy+GRQ1vZ+OQXlteyfpL3Vs4UHslnyG/QAAAA=',
    focus: '60% 48%',
    alt: {
      ar: 'حاسوب محمول بشيفرة برمجية وأيقونات السحابة والبيانات واضحة، وأفق الرياض خلفها خارج نطاق التركيز',
      en: 'A laptop of code and floating cloud and data icons in focus, the Riyadh skyline soft behind them',
    },
  },
  /**
   * A city from a lit terrace: towers, the roads and the water running off to the sun. No one
   * sector in it, which is the point — the about page assembles it out of four others.
   */
  city: {
    ...set('skyline-golden-hour', 1672),
    lqip: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOiyAADiCRlgAAAAP7k7ZRg4O9iN79JFdpf/9jdLYk1O/UFgl06yCm0hL2VzfmPIBtNKCG3hlcFLHU7bQzwAR8R3wb90F4ImzMstBtYAAAA',
    focus: '54% 46%',
    alt: {
      ar: 'مدينة عند الغروب من شرفة مضاءة: أبراج زجاجية، وطرق تمتد نحو الماء والشمس',
      en: 'A city at golden hour from a lit terrace — glass towers, and roads running off toward the water and the sun',
    },
  },
  /**
   * An infinity pool on a cliff above a Red Sea bay, a resort's terraces stepping down to the
   * beach. The hospitality half of real estate and hospitality. It ships at full and card size.
   */
  hospitality: {
    ...img('red-sea-hospitality', 1672),
    lqip: 'data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABQBACdASoUAAsAPulgqE0pJaOiMAgBIB0JQBOmUGWUEAAeIGorn9ltxhcAAP7p310G+upF99Jp12uQ2K2UA+6bAZGLLGDPq6CP4KPDNZOIynBGqvRzqzGPQ3gGfO+kDNGVRqbUL43EuAJhxEssmLwAAAA=',
    focus: '36% 62%',
    alt: {
      ar: 'مسبح لا متناهٍ على جرف يطل على خليج في البحر الأحمر عند الغروب، ومدرّجات منتجع تنحدر نحو الشاطئ',
      en: 'An infinity pool on a cliff above a Red Sea bay at sunset, a resort’s terraces stepping down to the beach',
    },
  },

  // --- The client's September and October 7 sets, now on the ecosystem page ---------------------

  /** A traveller at the bow of a boat between limestone cliffs, the sun going down ahead. */
  longtail: {
    ...set('longtail-sunset', 1774),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JagCdMoAC2Sc9rRRmVsfAAP5OZIPfHc+QnbgwS1OziuYOxQz3IWcrpj5yJYkGWmUUCoNQwe5ETbcSDmuEEiJlN1jl7SGBxBR6mxnlcTzbgEdhUF8vveSTYpotn1Wyt1wAAA==',
    focus: '50% 52%',
    alt: {
      ar: 'مسافر يفتح ذراعيه على مقدّمة قارب بين جروف صخرية عند الغروب',
      en: 'A traveller, arms spread, at the bow of a boat between limestone cliffs at sunset',
    },
  },
  /** A residential compound around a fountain court. */
  courtyard: {
    ...set('residence-courtyard', 1774),
    lqip: 'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZQCsABtHwGPnE110MeIAAPeG1Tg1VSHyPWSMnLtei8qTTaT/XPEDm8xCO4W8oz+Yb2UkcqesdbzPOUIONX9Gvf9s1Fc54GNwXhpKEhF8Aa89UAA=',
    focus: '50% 56%',
    alt: {
      ar: 'مجمّع سكني حول ساحة تتوسطها نافورة، وممرات تحفّها النخيل عند الغروب',
      en: 'A residential compound around a fountain court, palm-lined walks at golden hour',
    },
  },
  /**
   * A card held to a handheld terminal across a marble counter, shopping bags and a laptop beside
   * it. From the September edition: the payment that closes eat.plus's last mile.
   */
  cardTap: {
    ...set('card-tap', 1774),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADwAwCdASoUAAkAPu1iqk2ppaQiMAgBMB2JQBOgA3ZQ21wCcmx0ImWAAPZGCKFovnxyYVVOUFMpvLWlNsjrs9M1wqn4/30uXWGsq9ir7KvPpy4wErzdwKmfPi70GKFfkWYELHOZ6ceHkvvjWLsevWck0E21KBdLOAAAAA==',
    focus: '50% 50%',
    alt: {
      ar: 'بطاقة تُمرَّر على جهاز دفع محمول فوق طاولة رخامية، وبجوارها أكياس تسوّق وحاسوب محمول',
      en: 'A card held to a handheld payment terminal across a marble counter, shopping bags and a laptop beside it',
    },
  },
  /**
   * A cargo hub by day, a plane climbing over the mountains beyond the docks. From the September
   * edition: Catering & Supply's card.
   */
  cargoHub: {
    ...set('cargo-hub-day', 1774),
    lqip: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAACwAwCdASoUAAkAPu1iqk2ppaQiMAgBMB2JYgCdMoACR/vQIwc+gAD5dtt892K7sH26DEOdE2YshCfbF6PAjffTFrekqokknQgeRdJchQ4FiVOtGb5V/smdhCZW5SFRM/TQ8HDRgORHANWoLLObEscPQ/BgS6LGqTCSbIbtwAAAAA==',
    focus: '44% 56%',
    alt: {
      ar: 'مركز شحن نهاراً: رافعات شوكية ومنصات بضائع، وشاحنات عند الأرصفة، وطائرة تحلّق فوق الجبال',
      en: 'A cargo hub by day — forklifts and pallets, trucks at the docks, a plane climbing over the mountains',
    },
  },
  /** Qanif's own sign, lit at dusk among the bougainvillea. The one photograph of the place itself. */
  qanifSign: {
    ...set('qanif-sign-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JaACdAB0/0OxC+tmpyvlAAMlxq7MhpYpxE76VWANaMKpCMo7+axbO4FltAg9fcDyqpHIsEbSTVYHDV0WEe1MNxA3dvumcFATa1gdoaeBlKdhaxer5lVS3l2+y5EgPS6JYgAAA',
    focus: '66% 54%',
    alt: {
      ar: 'لافتة Qanif الخشبية مضاءة بين شجيرات الجهنمية عند الغسق، وزائرة تلتقط لها صورة',
      en: 'The lit wooden sign of Qanif among the bougainvillea at dusk, a visitor taking its picture',
    },
  },
  /** Qanif: parents at a table on the deck, their children out on the grass, green mountains beyond. */
  qanifTerrace: {
    ...set('qanif-terrace', 1774),
    lqip: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOgBDV2HC721rwcYAD+sjI00fcRdOj6ARSWUzewbHkGLNcKe2IfZNIdSoe4ZbWnRz+m/9lEqWxRWRVyWf7nHxO241U19RVH7OGezTpYObhl6TVErTUOhWFQyMgA',
    focus: '38% 60%',
    alt: {
      ar: 'والدان إلى طاولة على منصة خشبية بجوار شجيرات الجهنمية، وأطفالهما يلعبون على العشب تحت جبال خضراء',
      en: 'Parents at a table on a timber deck by the bougainvillea, their children playing on the grass below green mountains',
    },
  },

  // --- The client's October 18 set: the hero's day, a picture per hour -------------------------

  /** A family on the terrace of a villa at golden hour, the garden and the house behind them. */
  familyGarden: {
    ...set('family-garden', 1774),
    lqip: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAQBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOl4AAoGWu9T9yQAGcXAAD82SPLcPSqNr8Ae1OHFzDSrQ1sMikJEJk174X7qmSjBmUc9L7Y2XPKsRsDLqO3vOcwozBiA+eE3+UwKSwrmj7tVRPI27KvuUy0JYMpyBKnaASCcavis7/yLQ4AAA==',
    focus: '44% 62%',
    alt: {
      ar: 'عائلة في جلسة خارجية أمام فيلا عند الغروب: أب وابنته وأم وابنها حول طاولة القهوة، والحديقة والبيت خلفهم',
      en: 'A family on the terrace of a villa at golden hour — a father and daughter, a mother and son around the coffee table, the garden and the house behind them',
    },
  },
  /** A man asleep in a wide bed, seen from above, the room still dark. */
  asleepDawn: {
    ...set('asleep-dawn', 1774),
    lqip: 'data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACQAwCdASoUAAsAPu1kqk4ppaQiMAgBMB2JZQC2yBgj8C4Sea+AAP7xf4CSEXKqTOEhRJnEUzb76ktKPeBtnFKjrJcR8UdZzNR86GzW7Tmx/dldyF1zk/OMRUP1gAAA',
    focus: '50% 38%',
    alt: {
      ar: 'رجل نائم في سرير واسع يُرى من الأعلى، والغرفة ما زالت معتمة',
      en: 'A man asleep in a wide bed, seen from above, the room still dark',
    },
  },
  /** A courier on a scooter, a box on the back, riding into the sunrise through Riyadh's towers. */
  riderSunrise: {
    ...set('rider-sunrise', 1717),
    lqip: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADQAwCdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBdkAzdQAE6znniVuo4A/p8ZcLZW6gOQR2xkvmOk0xb9pjn2tRM70RhFiE2tDDha4fFSIC1wsSfM1jOpGZCK12CUp84xIKxr8GD4BVwJ6oowh2N0dcNtPvfcVapS4MJN9HYV2g+kAA==',
    focus: '42% 58%',
    alt: {
      ar: 'مندوب توصيل على دراجة نارية وخلفه صندوق الطلبات، يعبر بين أبراج الرياض مع شروق الشمس',
      en: 'A courier on a scooter, a delivery box on the back, riding between Riyadh’s towers at sunrise',
    },
  },
  /** A farmer in a red shemagh picking ripe coffee cherries. */
  coffeeHarvest: {
    ...set('coffee-harvest', 1774),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAwBACdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBOgA+YuPlzj4JJDNnnmg0AA/tJeF71BW0X6NGExbbP5wZkmyZQ3D1LzjrUmTUOHLYEyZc/EmiVyIh2VwyPwgU4kbkKd8ik5DCs9fuUGlMaqC/smBvQDNHNhD9kbxh7d3rIA',
    focus: '26% 44%',
    alt: {
      ar: 'مزارع بشماغ أحمر يقطف حبات البن الناضجة من أغصانها',
      en: 'A farmer in a red shemagh picking ripe coffee cherries from the branch',
    },
  },
  /** Chocolate poured from a jug into moulds on a steel bench, the plant behind. */
  chocolatePour: {
    ...set('chocolate-pour', 1774),
    lqip: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZwBTAFwYsg31z/rsYaYAAP598GjssN4+ECtLmc2STuqfuPkCgCZHE1ISZw6Ic+D5dNb2pkiIqjd0CqeOp7ohS1yiP30omB1krfz4wtfzfY24TF3Adot48emiRyzNH7UilGPZ3nTG4dlAAJQAAA==',
    focus: '78% 46%',
    alt: {
      ar: 'شوكولاتة سائلة تُصبّ من إبريق في قوالب على طاولة من الفولاذ، والمصنع خلفها',
      en: 'Chocolate poured from a jug into moulds on a steel bench, the plant behind',
    },
  },
  /** A yacht crossing the coral shallows of the Red Sea, the mountains on the shore beyond. */
  redSeaYacht: {
    ...set('red-sea-yacht', 1774),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAABQBACdASoUAAsAPu1iqU2ppaQiMAgBMB2JbACsMoGv/gPdh/bU2za65JSOAP5V+w9wqTIPq7nvi6nedSHG2TZ61GzzB8Xx/IW6aARu5+9tug8g7bjocnbKdvbh/BY2Rcp3FZw4UW7tk0XHJNfxLT7EV8xWM7CneIAAAA==',
    focus: '46% 64%',
    alt: {
      ar: 'يخت يعبر الشعاب المرجانية في مياه البحر الأحمر الفيروزية، والجبال على الشاطئ في الأفق',
      en: 'A yacht crossing the coral shallows of the Red Sea, the mountains on the shore beyond',
    },
  },
  /** A row of trucks backed onto a distribution centre's docks as the sun goes down. */
  trucksDusk: {
    ...set('trucks-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQAwCdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBOgBEBLYjzTbVNkMYAA4mXD10C4GFKho2niS+mHdc6xQHotBNoYpqTQBtoMdcBADI9s4VaE1f4tMJs78ryEGAfU7ag84cOhohAA',
    focus: '50% 62%',
    alt: {
      ar: 'صف من الشاحنات عند أرصفة مركز توزيع مع غروب الشمس',
      en: 'A row of trucks backed onto the docks of a distribution centre as the sun goes down',
    },
  },
  /** An online shop's studio: a laptop open on the store, parcels packed, Riyadh in the window. */
  ecommerceStudio: {
    ...set('ecommerce-studio', 1774),
    lqip: 'data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JYwCdMoAlshBqQljU9Nx8VgAA995uMnPEDckE/BJXSGXOG5TIN+gZys9qv3D5PUgxB9nVLEF3vg/APmd9ewZet4y1DSWz7QCrZNf4sPOBDpsgWxbDqBfeTd8jSDBDHXBlz5xpSTFWQ7AKZJ+MIHjp+aQAAA==',
    focus: '40% 56%',
    alt: {
      ar: 'مكتب متجر إلكتروني: حاسوب محمول على صفحة المتجر وطرود جاهزة للشحن، وأفق الرياض من النافذة',
      en: 'An online shop’s studio — a laptop open on the store, parcels packed for shipping, the Riyadh skyline in the window',
    },
  },
  /** A banquet hall laid for an evening: long tables, folded napkins, chandeliers lit along the walls. */
  banquetHall: {
    ...set('banquet-hall', 1774),
    lqip: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAQBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOmUABn9ytOB3egSAw8AAD9ocNWMzJWML4iOsu3kh/AF4yjkuBCB5oagXIgRMjVFHiIEb8bx3Zn70CvaGbjXFePbA6UJEp2GKHMlV/tfPPyf+ohzxNw+pUcQNTY4D7Tc2kYYBJxJmxrNdgAAA==',
    focus: '50% 56%',
    alt: {
      ar: 'قاعة مأدبة مُعدّة لأمسية: موائد طويلة ومناديل مطويّة بنقوش ذهبية، والثريات مضاءة على الجدران',
      en: 'A banquet hall laid for an evening — long tables, napkins folded with a gold pattern, chandeliers lit along the walls',
    },
  },
  /** Cocoa pods ripening on the branch. Agriculture's window in the reel. */
  cacaoPods: {
    ...set('cacao-pods', 1774),
    lqip: 'data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JbAC7ABdjOV5v42WO0ywAAP54pec6EHvsr06po01Uo+eZAma6nRVWbPWBmnK3Q8dgNHUM8Vp36XNmdA60qX+ApSHGSwLvr9eKejU3Tv5h/5C/I9F68axpYhYpFZtjHMleRgQWmz+FPEYB8GCQq3ZYsfUc2c/LRhdUYgAA',
    focus: '56% 56%',
    alt: {
      ar: 'ثمار الكاكاو تنضج على غصنها بين الأوراق الخضراء',
      en: 'Cocoa pods ripening on the branch among green leaves',
    },
  },

  // --- The same October 18 set, second pass: the statement, the reel, the ecosystem page --------

  /** Chocolatiers in white setting pralines in rows. Ships a 400px cut for the statement's capsules. */
  chocolatiers: {
    ...img('chocolatiers', 1774),
    xs: '/ds/img/chocolatiers-xs.webp',
    lqip: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQBACdASoUAAsAPu1iqU2ppaQiMAgBMB2JZQDA3CFdEg9nfsOjinOvUAD+sQBvEHWRax58e92/AkOUUBcWvsQFmCxmM5Eg3FeHEjQaUI/68Szadx/Cl2I1D+f59IMIh+liy4GHQxhfPUAA',
    focus: '62% 64%',
    alt: {
      ar: 'صنّاع شوكولاتة بزيّ أبيض وقفازين يرصّون قطع البرالين على طاولة من الفولاذ',
      en: 'Chocolatiers in white and gloves setting pralines in rows on a steel bench',
    },
  },
  /** A gloved waiter's silver tray of canapés over a laid table. Ships a 400px cut for the capsules. */
  canapeTray: {
    ...img('canape-tray', 1774),
    xs: '/ds/img/canape-tray-xs.webp',
    lqip: 'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JZgCdMoMYADNvy2CpblOozwAA/F/x7xa13HUWrfQOPGFVgF6x0BDFNg1lHqRrP0h6zdb/O0IB8Bnw+QeQAOoGCmoCQVd+tNazsJL/n6b1T+Xvej4+687U75viCN3c94tVBn/A0UM2B76wvQ3IwPjhpd/UgAAA',
    focus: '46% 62%',
    alt: {
      ar: 'نادل ببدلة سوداء وقفاز أبيض يحمل صينية فضية من المقبّلات فوق مائدة مُعدّة',
      en: 'A waiter in a black suit and white gloves holding a silver tray of canapés over a laid table',
    },
  },
  /** An investor at a desk of trading screens, Riyadh in the window. The home page's closing window. */
  investorScreens: {
    ...set('investor-screens', 1774),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOgApVFSYmSN3yWAADc/GgxNbNLTfAvVbxkQjO8yLbRtxxT7It9AJBnw0lttgR+QuqZcn9Hpg8jb24A339zhvJPJ5Nd95NM78wgTwuBxG0f+u9tj2YGswZJMnK2rF8GLAAA',
    focus: '60% 46%',
    alt: {
      ar: 'رجل بالشماغ أمام شاشات تداول في مكتب يطل على أفق الرياض',
      en: 'A man in a shemagh at a desk of trading screens, the Riyadh skyline in the window',
    },
  },
  /** A chocolate plant end to end: steel lines down the hall, the staff in white. Industry's window. */
  plantHall: {
    ...set('plant-hall', 1774),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAQBACdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBOgAw64hm+s1QlO1E3uYADMJhEoosE04t7FDj8NJUwUdWqnYocf30b4FlJS3v6T6+28+eWWERWpMbyXv4Uhng7F+vREUzbA67dIG3d5SwSsnRwm6Lly0BggAA==',
    focus: '46% 62%',
    alt: {
      ar: 'صالة مصنع شوكولاتة واسعة: خطوط إنتاج من الفولاذ وعمّال بزيّهم الأبيض',
      en: 'A wide chocolate plant — steel production lines down the hall and staff in white',
    },
  },
  /** Hands taping an order shut on a packing bench. E-commerce's window. */
  orderPacking: {
    ...set('order-packing', 1774),
    lqip: 'data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOmUAAv3HpdX0C5I30gAM10VrBzZnWquLuzmWEyU4LKuyMl0HJUztzXXA1Lf6skbd/hndhyJmty2uspO0LnHCc8/rh9tTASYdExcutt/5FeTb+pJCDFPMLP8O2+zJ9VyUv6SUGDUVhR5BfltyIxBGTCIcfA0AA=',
    focus: '54% 56%',
    alt: {
      ar: 'يدان تُغلقان طرداً بشريط لاصق على طاولة تغليف، والميزان والطرود حولها',
      en: 'Hands taping a parcel shut on a packing bench, a scale and boxes around it',
    },
  },
  /** A courier handing over two coffees and a bag at the door. Logistics' window; a 1536px original. */
  courierHandover: {
    ...set('courier-handover', 1536),
    lqip: 'data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAADQAwCdASoUAA0APu1iqU2ppaOiMAgBMB2JQBdmUAS0whJfCJuKUEgA/XZK8Nn4hIeWsgBQd7y1LZRnfVQa0xwrZvhfshCMJAJrPrxMsI6fE31ZnbpVEe3Bp6hoD7vs24r79pvFsZtVy4tpToNBlxYUezyjYQJj/3rTeMD+fNvvkKU7jbd63u6elpBFpjQ8H0RRn1GV9B+BZiFIt4AAAA==',
    focus: '50% 46%',
    alt: {
      ar: 'مندوب توصيل بسترة خضراء يسلّم كوبين من القهوة وكيساً ورقياً عند الباب، ودراجته خلفه',
      en: 'A courier in a green jacket handing over two coffees and a paper bag at the door, his scooter behind him',
    },
  },
  /** A hiker crossing a rocky canyon beside a green pool. Tourism's window. */
  canyonHiker: {
    ...set('canyon-hiker', 1774),
    lqip: 'data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOmUGSxiXaOfaWBXSezBAAAzHHYMTB7cPS1jandt5xyY/hoR7LF9qe9qIvb1gf+IVmtyJTwR1/0nu5KIl0YBrZwmf4fG8UQe1zEZ3IjdBp7HT/cRhe1aXaF+BhYFrrW+bGAu4CiApTwAAA=',
    focus: '38% 58%',
    alt: {
      ar: 'متنزّه يحمل حقيبة ظهر يعبر وادياً صخرياً بجوار بركة خضراء',
      en: 'A hiker with a backpack crossing a rocky canyon beside a green pool',
    },
  },
  /** Apartment blocks with deep balconies at sunset, a path between the lawns. Real estate's window. */
  apartmentsSunset: {
    ...set('apartments-sunset', 1774),
    lqip: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZAC7ACFljiDYOCCTnDzgAP4mPyGpFOQJnZCgrhnwBtyu0OwUP9GSgQDOMdR61KZ1Y34DATvXW6mjbMI8nIlN9oN1xCA+3Hdg7tiP22sdL+KgHKyus1/Pa3rJ0wJ0ofC02jYAAAA=',
    focus: '40% 52%',
    alt: {
      ar: 'مبانٍ سكنية حديثة بشرفات واسعة عند الغروب، وممشى بين المساحات الخضراء',
      en: 'Modern apartment buildings with deep balconies at sunset, a path running between the lawns',
    },
  },
  /** Waiters serving a full room of guests. Catering's window. */
  restaurantService: {
    ...set('restaurant-service', 1774),
    lqip: 'data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBYdgafqSyRk4xKNAAD+rOpdd5k5o4QHuTr2hcpTOsZTmreT5VbCKzQrVhslyrwhoHIX8Lv5p9wO9KQsuW0/y+nBGVLnef6fdE/7ic1ldQJVnfAexvESmGx740etlV9K7ayTDvxuI4n4+6HU+fyiqle1FjBvR/gAAA==',
    focus: '56% 50%',
    alt: {
      ar: 'نادلون يقدّمون الأطباق لضيوف سعوديين في مطعم أنيق',
      en: 'Waiters serving a table of Saudi guests in an elegant restaurant',
    },
  },
  /** An aisle between high racks of cartons, a forklift carrying a pallet. Supply's window. */
  warehouseForklift: {
    ...set('warehouse-forklift', 1774),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JYwCdMoR8edDc05lFnZrhEYAA/ZvpzQrgpt9v4cg4lkKimUuzfPwGEJdubESRMg1qep96aPCg6v9qKNQzxDUnqEVc7Igu37i1JNzV5UrrDfv3RXZcJmoVuFwx6KysGeqoAAAA',
    focus: '50% 62%',
    alt: {
      ar: 'ممر بين رفوف عالية من الكراتين في مستودع، ورافعة شوكية تنقل منصة بضائع',
      en: 'An aisle between high racks of cartons in a warehouse, a forklift carrying a pallet',
    },
  },
  /**
   * Guests round a low table at a mountain lodge, string lights over them as the evening comes.
   * Ships a 400px cut for the statement's capsules.
   */
  lodgeEvening: {
    ...set('lodge-evening', 1774),
    xs: '/ds/img/lodge-evening-xs.webp',
    lqip: 'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOiP/wHwOQ+99Fri3Z2xeQA/kmDHUlhL8iKpAVzdaoZ6f1b4gcjDClJG6R8BIRleJuYZenqRh66oITGP0XJnQSY//53MY7Ss2bgGVgQd2jxzaeYAA==',
    focus: '50% 62%',
    alt: {
      ar: 'جلسة مسائية في نُزُل جبلي: ضيوف حول طاولة تحت حبال الإضاءة، والجبال والغيوم خلفهم',
      en: 'An evening at a mountain lodge — guests round a low table under string lights, mountains and cloud beyond',
    },
  },
  /** Dunes at sunset, four-wheel drives crossing them in a trail of dust. The about page's masthead. */
  dunesSunset: {
    ...set('dunes-sunset', 1774),
    lqip: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZgCdMoABDcRMjYteQADwkKxPFLgtbHeHV0BQbNoVseVW5FcrsspSH10BLX4dYHUMydWCsBdo7urSngyYXHa9z9SpK5MwHceMJ1W0uP4cMvAA',
    focus: '62% 50%',
    alt: {
      ar: 'كثبان رملية عند الغروب، وسيارات دفع رباعي تعبرها وتثير الغبار',
      en: 'Dunes at sunset, four-wheel drives crossing them in a trail of dust',
    },
  },
  /** A container port from the air: a ship at the quay, the stacks and the cranes. */
  portAerial: {
    ...set('port-aerial', 1774),
    lqip: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOmUABpxAuMkr/s06Y7AAD3263AMUvpLsGNuDXP2zQ4a+xPnS/gi8S3pNArnauUvkMe0AV8eeu93URG68cwwjB2IEX5Z9z/yv/NXY/LiPAA',
    focus: '44% 56%',
    alt: {
      ar: 'ميناء حاويات من الأعلى: سفينة عند الرصيف وصفوف الحاويات والرافعات',
      en: 'A container port from the air — a ship at the quay, rows of containers and the cranes',
    },
  },
  /** Staff in white setting chocolates along the line. JAZ Chocolate's plate. */
  lineCrew: {
    ...set('line-crew', 1774),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoUAAsAPu1iqU2ppaQiMAgBMB2JZwDCgCBj5BpBv/m56+CAAMtLe2bWvswnLlkdQAs4mZM0BU58DHfMhp1SUjnsJt0AX8P9/b38RrJnlHaJe+x5Zu+aaZYKjc+m7RodKe5Rsi2MLrg6KJRxY6dE0TNOEt7cAAAA',
    focus: '50% 56%',
    alt: {
      ar: 'عمّال بزيّ أبيض وأغطية شعر يرصّون الشوكولاتة على خط الإنتاج',
      en: 'Staff in white coats and hairnets setting chocolates along the production line',
    },
  },
  /** A chocolate shop: a server at the glass counter, shelves of boxes behind. JAZ Chocolate's detail. */
  chocolateShop: {
    ...set('chocolate-shop', 1774),
    lqip: 'data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JYgCdABwub7P3kuFvfdkAAP5hLg3J2dgcbn65HRd4SkeD2rPmKS9dCGza2cykLH13QF2mF6b3tm4YMp5Svb8zw1pEBGumjbxnGN9hVgpJhA1wR7w9h4kPVWFtSK/vQ7xFMP8uEPCkn3lgAAA=',
    focus: '64% 56%',
    alt: {
      ar: 'متجر شوكولاتة: بائع خلف واجهة زجاجية يخدم سيدتين، ورفوف العلب خلفه',
      en: 'A chocolate shop — a server at the glass counter attending two women, shelves of boxes behind him',
    },
  },
  /**
   * A courier handing an order over at a front door. eat.plus's plate. The bag and the jacket carry
   * «BAYT KITCHEN», a kitchen's name rather than one of the client's marks.
   */
  doorDelivery: {
    ...set('door-delivery', 1774),
    lqip: 'data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAACQAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOgAkYeoPtguBCAAP6bApjnTP8jUmB3xLjQFi3l7c454l4iH1YAX0+gNoSJyuY+DwfslaWWG9pSvuyXG0Q8/eBGIL6BraZdP/ozBsboZo+QhCN+sintxWdygAI1CXqyZY3PWkyAAkUYAAA=',
    focus: '60% 48%',
    alt: {
      ar: 'مندوب توصيل يسلّم طلباً عند باب منزل لرجل بالشماغ',
      en: 'A courier handing an order to a man in a shemagh at the door of his house',
    },
  },
  /** Two visitors photographing the green mountain terraces. ZL.TOURS' detail. */
  terraceVisitors: {
    ...set('terrace-visitors', 1774),
    lqip: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBdmUABoR2YpH+/sYI2gAAD+W2jUsNv40I5J7i5mqqqPaLXSXsL21pkmw/xnBKE4nDrMgx7cKbbEhjbFw9LHt4jMalYCt1i5zoBWohIEAAAA',
    focus: '40% 62%',
    alt: {
      ar: 'زائرتان تلتقطان صورة للمدرّجات الجبلية الخضراء من ممشى خشبي',
      en: 'Two visitors photographing the green mountain terraces from a timber walk',
    },
  },
  /** Chefs finishing plates of dessert with an edible flower. Catering & Supply's detail. */
  dessertPlating: {
    ...set('dessert-plating', 1774),
    lqip: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JYwC/OBof7Ce8KGNb/hQAAP5kzaharySrll5EWKId7tmMeHEXv3hoIDA6Gl2konmcCQ4xvewPo3TtCZX2PHJyYQpWIi5N7TLYpk1LSnIZXcQqXRQ0mzwDUp3N2q0AAAA=',
    focus: '60% 60%',
    alt: {
      ar: 'طهاة يضعون اللمسة الأخيرة على أطباق الحلوى بزهرة صالحة للأكل',
      en: 'Chefs finishing plates of dessert with an edible flower',
    },
  },
  /**
   * A waiter in a dark apron carrying two plates through a restaurant. Nefaah's plate: the
   * restaurants half of what it delivers, beside the groceries of its detail.
   */
  restaurantPlates: {
    ...set('restaurant-plates', 1774),
    lqip: 'data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAABwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JYwAD5Doveaq2V7qkMkej2yxXgAD+3gITNJtfswhQ1o+3rFYAmMfGUIIWvbmGEXGcFvi03DnU5l/9k6ZPiHkUcJbdXx2V4nTRm/2pzyc8VV3Y/3/SiwRO4ZIcO0ZlgrVOS1K39WylOv4ihXKsApAj0zDoiOIOUKKRO2wA',
    focus: '54% 50%',
    alt: {
      ar: 'نادل بمريلة داكنة يحمل طبقين في مطعم: شريحة لحم مع خضار مشوية، وإسكالوب مع الهليون',
      en: 'A waiter in a dark apron carrying two plates through a restaurant — a fillet steak with roast vegetables, and scallops with asparagus',
    },
  },

  // --- Nefaah's brand guideline ----------------------------------------------------------------

  /**
   * A canvas tote of groceries printed with Nefaah's logo, from the website page of the brand
   * guideline the client sent on October 19: cut clear of the page's interface, with the page's
   * decorative red dot lifted off the canvas. Nefaah's detail, so it ships at that size alone.
   */
  nefaahBag: {
    ...tile('nefaah-bag', 720),
    lqip: 'data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACwBACdASoUABkAPuVgp02pJaOiMAwBIByJQBdiP/wG1198Dfq4y93JRo8m+sQAAP6b3ahZgSVcn3krLLeCblAYjInL3Yy/17w63gIEAxczGf7VlLPKmwNzUI7tZT64x+WdiTC/xdkvXeoC3L1qHajSbsAIW95Efb8kmacuxzef1m4dB69PiAAAAAA=',
    focus: '50% 50%',
    alt: {
      ar: 'حقيبة قماشية عليها شعار Nefaah، وفي أعلاها خضار وأعشاب طازجة',
      en: 'A canvas tote printed with the Nefaah logo, fresh vegetables and greens at its top',
    },
  },

  // --- Cut from one contact sheet ---------------------------------------------------------------

  dining: {
    ...tile('ent-dining'),
    xs: '/ds/img/ent-dining-xs.webp',
    lqip: 'data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoUAA8APu1iqU2ppaOiMAgBMB2JaACdMoMYAE5N3Ge2Ku8qNONzzEKCAAD+o0pn2W0iDOMqYn489idcaNI/uUp48gk1TzdjQTipOLd8vc417un86KyvgddIJLiCNFn8E0L3Y0WGtphuS/JF6lUUkky5d+tVAMwQQthjl7SEX/yY23LrchmP1ztTQWSXoD3EvXWTIedlQAA=',
    focus: '36% 62%',
    alt: { ar: 'مائدة على الواجهة المائية عند الغروب، والشموع على الطاولة', en: 'Waterfront dining at dusk, candles on the table' },
  },

  // --- The first set, still in service ---------------------------------------------------------

  /** Riyadh at first light, read from the base of a green-glass curve. The brand's own palette. */
  facade: {
    ...img('riyadh-dawn-facade', 1920),
    lqip: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwAwCdASoUAAgAPulgqE0pJaOiMAgBIB0JZwDG9BuHjIn7QSAA/eKfh3Kbh17NrnhLnRDZSVu3PCOZyLgThUb8KGXBVIAA',
    focus: '38% 60%',
    alt: {
      ar: 'واجهة زجاجية منحنية بلون أخضر داكن تطل على أفق الرياض عند الفجر',
      en: 'A curved dark-green glass facade opening onto the Riyadh skyline at first light',
    },
  },
  /** A working hall: robotics, coil stock, people on the floor, the desert beyond the doors. */
  manufacturing: {
    ...img('advanced-manufacturing', 1672),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoUAAsAPulgqE0pJaOiMAgBIB0JZQAAUOWuQW7A0mvZgKqAAP7cmPWEeSwXQtEvvNsoF1fSFxUG9deSb73FjEfRHPQWAY8G/muq83BtT2/EVE6gARI/vg1QUkEawN5Et3FybgXBj+hEMq/Bl5SAAA==',
    focus: '42% 50%',
    alt: {
      ar: 'صالة تصنيع متقدمة بأذرع آلية وخطوط إنتاج وفريق تشغيل',
      en: 'An advanced manufacturing hall — robotic arms, production lines and an operating crew',
    },
  },
} as const satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

/**
 * The platforms' own marks, each set on its card the way the client supplied it. Qanif's is set
 * from its logo file on white: the Arabic name over the Latin one, the lockup with no line about a
 * farm under it. Nefaah's is its full-colour lockup on white, the Arabic name running from green
 * into blue over NEFAAH, as its brand guideline sets it. Catering & Supply's is set on white from
 * the logo the client sent with its notes: the S wound round a globe over a truck and its load,
 * with the old SEEM SUPPLY wordmark beneath. It stands in until the new one arrives, because the
 * client means SEEM to name the group rather than any one venture.
 */
export const marks = {
  jaz: {
    ...mark('logo-jaz-chocolate'),
    lqip: 'data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAwCdASoUABkAPu1aqU2ppKOiN/VYATAdiWUAAC31CrUJNcP6DygAAP7vvNOgzbBqlCHxtKH5AZwb2cqwrcovBQb9B7Gqvrnr2rLACt+ZVyMXhfTjG5sWS46STHnONgEphgAA',
    focus: '50% 50%',
    alt: { ar: 'شعار JAZ Chocolate بحروف برونزية', en: 'The JAZ Chocolate wordmark in bronze letters' },
  },
  eatPlus: {
    ...mark('logo-eat-plus'),
    lqip: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAABQBACdASoUABkAPuFeqE2opSQiMAwBEBwJQAagDnwAHkgOCcZspWaBpgNAAP7xwmAjABaEKbFBJjEQbfCPSEHiTKTP7qACiP7veb8kD8f0pX+CCViJ4yqSvxPuonBP5c2KeXf/gCwe4t7ipB7C455KKe7zCuPzAAA=',
    focus: '50% 50%',
    alt: { ar: 'شعار eat.plus باللون البرتقالي', en: 'The eat.plus logo in orange' },
  },
  nefaah: {
    ...mark('logo-nefaah'),
    lqip: 'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQBACdASoUABkAPtFcpk6oJSMiKAqpABoJZQDH5BEcz/MFmNHvL7hfgAD+9gFzrN+8V1eaBJ1RMxmAcfVZwizh1kyQnjJCjt6Si3nfOD6y37G0mRt4gzmchgAAAA==',
    focus: '50% 50%',
    alt: {
      ar: 'شعار Nefaah: الاسم بالعربية بخط متصل تنبت منه أوراق، بتدرّج من الأخضر إلى الأزرق، وتحته NEFAAH',
      en: 'The Nefaah logo: the Arabic name in one flowing line that sprouts leaves, green fading to blue, over NEFAAH',
    },
  },
  zlTours: {
    ...mark('logo-zl-tours'),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACQBACdASoUABkAPu1mpk2ppaMiMBgMATAdiUAZKbGCTfbSxhns1tQBhTWprFAA/vNr+qM9nZ9TzmU3wtcDirNzrqW7IKkRlErVv5Nr5j3YY9A+vuCfDZqBmgJXXNzzNjU0nEdPaPiTiQyGqOOIkze4iOvNIQ2/h8AAAA==',
    focus: '50% 50%',
    alt: { ar: 'شعار ZL.TOURS: حرف Z برونزي يعلو موجة', en: 'The ZL.TOURS mark: a bronze Z rising out of a wave' },
  },
  homera: {
    ...mark('logo-homera'),
    lqip: 'data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAABwAwCdASoUABkAPu1oqU8ppiOiMBgIATAdiWcAAC51lXdOPQAA/vNp3hxCRwBpgg12A1Nb/eOnYgsKmiSJrL2yb3iJvc9wFzxZMWyNHwPgcGHAAAA=',
    focus: '50% 50%',
    alt: { ar: 'شعار HOMERA: عقارات، ضيافة، مرافق', en: 'The HOMERA logo — property, hospitality, facilities' },
  },
  qanif: {
    ...mark('logo-qanif'),
    lqip: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwBACdASoUABkAPu1gp04ppSMiMBgMATAdiUAAfHgg38QrGW6BXTK1sEAA/vNqV8HdYcnkxo0f3aK7hNZe5iOw0Sid3E4HEALSDUbrdZl7Mw8ABNfhcwuKuRZFM6XOhWG7YSw4LnSgAA==',
    focus: '50% 50%',
    alt: { ar: 'شعار Qanif باللون الأخضر: الاسم بالعربية وتحته QANIF', en: 'The Qanif logo in green: the Arabic name over QANIF' },
  },
  cateringSupply: {
    ...mark('logo-seem-supply'),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADQBACdASoUABkAPtFUpk2oJCOiMBgIAQAaCWMAz2QQ7/xDeFwXP0H1YdwrLpjAAAD+9gL92aUnkR1CDRXZpUbijQf9hvu1BBQ4RvKuVgJ/GeI+FXGJJXtEyJC/U3l1OjOW/Ru59gjIkWCh07sE5pc6/ilmufOmF3MacAAA',
    focus: '50% 50%',
    alt: {
      ar: 'شعار Catering & Supply المؤقت: حرف S يلتفّ حول كرة أرضية فوق شاحنة وصناديق',
      en: 'The stand-in Catering & Supply logo: an S wound round a globe above a truck and boxes',
    },
  },
} as const satisfies Record<string, Photo>

/**
 * A photograph, framed for one slot.
 *
 * `focus` picks the base crop. `zoom` and `origin` take a detail out of the frame instead of
 * the whole picture: a close crop of a robot arm and a wide read of the hall it stands in are
 * different images to a reader, even when the file is the same.
 */
export type Framed = {
  photo: Photo
  /** `object-position` for the base crop. Defaults to the photograph's own focal point. */
  focus?: string
  /** How far into the frame to push. 1 keeps the whole photograph. */
  zoom?: number
  /** The point a zoom closes on, as a `transform-origin` pair. */
  origin?: string
}

/**
 * The eight strategic sectors, in the order the copy lists them — Industry, E-commerce,
 * Logistics, Tourism, Real estate, Catering, Supply, Agriculture — one picture each from the
 * client's October 18 set, and none of the ones the hero shows: the plant hall, an order taped
 * shut, a courier at the door, a hiker in a canyon, apartment blocks at sunset, waiters at a full
 * table, a warehouse aisle, and the cocoa ripening on the branch.
 */
export const sectorFrames: (Framed | undefined)[] = [
  { photo: photos.plantHall, focus: '46% 62%' },
  { photo: photos.orderPacking, focus: '54% 56%' },
  { photo: photos.courierHandover, focus: '50% 46%' },
  { photo: photos.canyonHiker, focus: '38% 58%' },
  { photo: photos.apartmentsSunset, focus: '40% 52%' },
  { photo: photos.restaurantService, focus: '56% 50%' },
  { photo: photos.warehouseForklift, focus: '50% 62%' },
  { photo: photos.cacaoPods, focus: '56% 56%' },
]

/**
 * The home page's opening: a day in the ecosystem, one picture per hour, in the order of `DAY`
 * in the home copy. The whole day opens on a family at home; then the bedroom before dawn, a
 * courier riding into the sunrise, the coffee harvest, chocolate poured at noon, the Red Sea in
 * the afternoon, trucks at the docks as the light goes, an online shop's studio at sunset and a
 * banquet hall laid for the evening. Every picture is from the client's October 18 set, and none
 * of them appears anywhere else on the page.
 */
export const heroFrames: Framed[] = [
  { photo: photos.familyGarden, focus: '34% 62%' },
  { photo: photos.asleepDawn, focus: '50% 38%' },
  { photo: photos.riderSunrise, focus: '42% 58%' },
  { photo: photos.coffeeHarvest, focus: '12% 44%' },
  { photo: photos.chocolatePour, focus: '54% 46%' },
  { photo: photos.redSeaYacht, focus: '46% 64%' },
  { photo: photos.trucksDusk, focus: '50% 62%' },
  { photo: photos.ecommerceStudio, focus: '40% 56%' },
  { photo: photos.banquetHall, focus: '50% 56%' },
]

/**
 * The three verbs of the positioning line, each with a picture of the work behind it: pralines
 * being made, a tray being served, a place invested in and full of guests. The capsules are a word
 * wide, so each picture ships a 400px cut for them.
 */
export const verbFrames: Framed[] = [
  { photo: photos.chocolatiers, focus: '62% 64%' },
  { photo: photos.canapeTray, focus: '46% 62%' },
  { photo: photos.lodgeEvening, focus: '46% 70%' },
]

/**
 * The four stages of the SEEM model on the home page: where we are going (the towers at first
 * light), ready (a hall fitted and waiting), done (a plant at work) and what it left (an evening
 * destination full of people).
 */
export const seemFrames: Framed[] = [
  { photo: photos.facade, focus: '24% 56%' },
  { photo: photos.manufacturing, focus: '46% 52%' },
  { photo: photos.industry, focus: '34% 50%' },
  { photo: photos.leisure, focus: '58% 50%' },
]

/**
 * The platforms on the home page's index, in the order every page lists them, shown by their own
 * marks: the index is where a reader meets them by name.
 */
export const platformFrames: Framed[] = [
  { photo: marks.jaz },
  { photo: marks.eatPlus },
  { photo: marks.nefaah },
  { photo: marks.zlTours },
  { photo: marks.homera },
  { photo: marks.qanif },
  { photo: marks.cateringSupply },
]

/**
 * The ecosystem page's platforms, in the same order. Each opens on a full-bleed picture of the
 * work and carries a framed detail of what it leads to: the shop at the end of JAZ Chocolate's
 * line, the payment that closes the last mile, the groceries Nefaah delivers beside its
 * restaurants' plates, visitors at the terraces, the resort, Qanif's sign lit for the evening,
 * and, at the far end of Catering & Supply's docks, a dessert being finished. The plates are also
 * the floors of the model the page pulls back to. None of them is on the home page.
 */
export const ecosystemPlatforms: { plate: Framed; detail: Framed }[] = [
  { plate: { photo: photos.lineCrew, focus: '50% 56%' }, detail: { photo: photos.chocolateShop, focus: '64% 56%' } },
  { plate: { photo: photos.doorDelivery, focus: '60% 48%' }, detail: { photo: photos.cardTap, focus: '52% 50%' } },
  { plate: { photo: photos.restaurantPlates, focus: '54% 50%' }, detail: { photo: photos.nefaahBag, focus: '50% 50%' } },
  { plate: { photo: photos.longtail, focus: '50% 52%' }, detail: { photo: photos.terraceVisitors, focus: '40% 62%' } },
  { plate: { photo: photos.courtyard, focus: '50% 56%' }, detail: { photo: photos.hospitality, focus: '30% 62%' } },
  { plate: { photo: photos.qanifTerrace, focus: '40% 58%' }, detail: { photo: photos.qanifSign, focus: '68% 50%' } },
  { plate: { photo: photos.cargoHub, focus: '46% 56%' }, detail: { photo: photos.dessertPlating, focus: '60% 60%' } },
]

/**
 * The masthead plate each inner page opens on. The about, strategy and ecosystem pages close on
 * moments of their own rather than on a second plate.
 */
export const pagePlates = {
  about: {
    masthead: { photo: photos.dunesSunset, focus: '62% 50%' },
  },
  strategy: {
    masthead: { photo: photos.city, focus: '58% 44%' },
  },
  ecosystem: {
    masthead: { photo: photos.portAerial, focus: '44% 56%' },
  },
  contact: {
    masthead: { photo: photos.residence, focus: '56% 50%' },
  },
} as const satisfies Record<string, { masthead: Framed }>

/** The home page's last window opens onto an investor at his screens, Riyadh beyond the glass. */
export const homeClosing: Framed = { photo: photos.investorScreens, focus: '58% 50%' }

/**
 * The about page's four strands — capital, technology, operations, strategic partnerships — in
 * the order its sentence names them. Each is a window of its own until the four meet as one
 * square and become `aboutWhole`. Partnership is the table: the place a partner sits down.
 */
export const aboutStrands: Framed[] = [
  { photo: photos.payments, focus: '60% 50%' },
  { photo: photos.technology, focus: '30% 58%' },
  { photo: photos.logistics, focus: '46% 62%' },
  { photo: photos.dining, focus: '34% 64%' },
]

/** What the four strands assemble into: one city, no single sector in charge of it. */
export const aboutWhole: Framed = { photo: photos.city, focus: '54% 46%' }

/** The values open under green glass — the identity's own material — before the type takes over. */
export const aboutCreed: Framed = { photo: photos.facade, focus: '40% 58%' }

/**
 * The strategy page's focus pull: the vision holds the horizon sharp, the mission the work in
 * hand. Both are the same frame, so they share a crop.
 */
export const strategyFocus: { far: Framed; near: Framed } = {
  far: { photo: photos.techFar, focus: '58% 46%' },
  near: { photo: photos.techNear, focus: '58% 46%' },
}

/**
 * `Develop · Operate · Invest · Monetize`, one picture per stage of the business model, seen
 * through the square the stages run around: a hall being fitted, a hub at work, a property
 * held, a payment settled.
 */
export const loopFrames: Framed[] = [
  { photo: photos.manufacturing, focus: '44% 50%' },
  { photo: photos.logistics, focus: '64% 56%' },
  { photo: photos.residence, focus: '62% 50%' },
  { photo: photos.payments, focus: '60% 48%' },
]
