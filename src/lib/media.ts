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
 * The sector set is the client's own, and more realistic: a picture per sector for the reel, and
 * the pictures of the platforms themselves (JAZ Chocolate's plant, Qanif's sign, the catering
 * tables). The home page never shows one photograph twice. The brand's deep green is the ground
 * they all sit on — scrims, sections, the dark between frames — never a tint laid over the
 * pictures themselves.
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
/** Tiles cut from a contact sheet only exist at card size, so both cuts are the same file. */
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

  /** Stone heritage houses above a palm-lined bay. The coast, the mountains, the sun on the sea. */
  coast: {
    ...set('saudi-coast-heritage', 1774),
    lqip: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAADQAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JZACdMoACoGZY8zdbvwAA/j45ttSUwUavN954lYzZyzqGHHlbpBBJO9DQjQCyID5zz1IWe23UpK5tbnM/Nw+QZ3X+DlcfcUrmkhmAMaPoSkVTNfEpvCbjk0anAAAA',
    focus: '62% 50%',
    alt: {
      ar: 'بيوت حجرية تراثية تطل على خليج تحفّه النخيل عند الغروب، ورجل بالشماغ يتأمل البحر',
      en: 'Stone heritage houses above a palm-lined bay at sunset, a man in a shemagh looking out to sea',
    },
  },
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

  // --- The client's own set: a picture per sector for the reel, and the platforms' own ------------

  /** Chocolates travelling along a conveyor, an operator at the panel behind. Industry, at work. */
  chocolateConveyor: {
    ...set('chocolate-conveyor', 1774),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZQDCgCDLN1McZg52mn6gAMtKD4wDcFHf+bu0fl0hzyM13LsnhCSUhojksQrfbI79ary40VJnqSkCedZcY9zNjEFgI2F7/0vmeFNcPyMdhEMrD5hvGxKQaiYAAA==',
    focus: '56% 60%',
    alt: {
      ar: 'قطع الشوكولاتة على سير ناقل في صالة مصنع، ومشغّل عند لوحة التحكم في الخلفية',
      en: 'Chocolates travelling along a conveyor in a factory hall, an operator at the control panel behind',
    },
  },
  /** A worker lining up chocolates as they leave the enrober. The one picture shot on a real line. */
  chocolateEnrober: {
    ...set('chocolate-enrober', 1774),
    xs: '/ds/img/chocolate-enrober-xs.webp',
    lqip: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBfnA222EOq7qiE11FSgAAD9mZM+PA1i6HE8b43Z2PvtXyY+jhLAK1h1+8vSNBK73xNhPshVrwZquy/5PSVQ1m158Ubvwnk4AljJbuvNsuqdDGiJEgAA',
    focus: '40% 72%',
    alt: {
      ar: 'عاملة بكمامة وقفازين ترصّ قطع الشوكولاتة الخارجة من آلة التغليف',
      en: 'A worker in a mask and gloves lining up chocolates as they leave the enrobing machine',
    },
  },
  /** A modern food plant end to end: a chocolate line down the middle, packing on either side. */
  chocolateHall: {
    ...set('chocolate-hall', 1774),
    lqip: 'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAACQAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZwDE2Aq9fngaEQyAAOj6a37GZHJF5Nykh3Il6iHmVcg0b3a9R4bAUy0o11oXWTKfsmG99c2pfAB5bRojYIPGEbdz6QytKG/V0IsXE9xtxqUMlnAAAA==',
    focus: '50% 62%',
    alt: {
      ar: 'صالة مصنع أغذية حديثة: خط شوكولاتة في الوسط، وآلات تعبئة وعمّال بزيّهم الأبيض على الجانبين',
      en: 'A modern food plant — a chocolate line down the middle, packing machines and staff in white on either side',
    },
  },
  /** A box of dark chocolate on a table. A portrait, so it only goes where a frame can hold it. */
  chocolateBox: {
    ...img('chocolate-box', 1200),
    lqip: 'data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAABQBQCdASoUABsAPu1srFEppaQiqAqpMB2JQBbZMYiLxa3ZnEG/nmPBCwjnq+Axrw6SMAAA/ux/Q0U2pffR2V9IBi+NnJb3mPCPY818CeP1FoyTXjppjAq6CdP29feKThBtQpjiLF8C2BLLYFNUZxyXPe3X+RkDyKTaGVnVN7YcSexr/Jj1365vGCV7P2nPKGCBCSWesP0NjKdn6Bs1eMbHtj7GRP4LOgaTNyxob/h51EOnQtbEtEi4BtSvM/IJPGeCjHCKM6thQAAA',
    focus: '50% 62%',
    alt: {
      ar: 'علبة كرتونية من الشوكولاتة الداكنة: لوح وقطعتان دائريتان ولفائف وحبوب كاكاو، وفنجان قهوة خلفها',
      en: 'A kraft box of dark chocolate — a bar, two medallions, curls and cocoa beans — a cup of coffee behind it',
    },
  },
  /** An aisle between racks of cartons, the crew moving and checking the stock. */
  warehouse: {
    ...set('warehouse-aisle', 1774),
    lqip: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JZACdMoR4Lf/gIa+il+W/w4AA/qlazv1S7gqTJGF/OGC/KoA6mw5edk5ftJN5yI1wTnO/PRlHZKydlJoHsbA1llerGcEo9Nv7yPUqaosGbjzCDGglZRM3lKCQ97AAAAA=',
    focus: '52% 56%',
    alt: {
      ar: 'ممر بين رفوف الطرود في مستودع، وعمّال بخوذات وسترات عاكسة ينقلون البضائع ويراجعونها',
      en: 'An aisle between racks of cartons in a warehouse, staff in hard hats and hi-vis vests moving and checking the stock',
    },
  },
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
   * it. From the September edition: the client's sets have no picture of e-commerce, so this one
   * stands in for it.
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
   * edition, back in service for supply: the reel's window, and SEEM Supply's card.
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
  /** Qanif: a family at a stone country house, the mountains in cloud behind it. From the September edition. */
  qanifFamily: {
    ...set('qanif-family-day', 1774),
    lqip: 'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZACdABMgzRNW96CGwAD9470AGgjUKYhnuKdCfUp8xnvI4OcLtjQ48VkDNa33KzgdMyosgfg0Y+vJId8QPUoBhBAg3e8CVkOuOeCF6Cf5SMZZkPAAAA==',
    focus: '44% 60%',
    alt: {
      ar: 'عائلة عند بيت ريفي حجري تحت جبال يلفّها الضباب: أب وابنه يرصّان الحجارة، وطفل يركض بطائرته الورقية',
      en: 'A family at a stone country house below misty mountains — a father and son stacking stones, a boy running with a kite',
    },
  },

  // --- Catering, from the client's set and the SEEM Catering profile ----------------------------

  /** Two waiters serving from a buffet in a restaurant. Catering as a service, people first. */
  cateringService: {
    ...set('catering-service', 1774),
    lqip: 'data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAADQAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOgMXrMvlWRJIr/RAwA/gb3JgG4RFbOMI3xD8oDIHjp2UIojNhK7fQ8gC3miuts433xEBAhR2uxlvX2LfSIAGoPAbrUSEJF5+ANNU1d4i/OwxiDA3x6twnjA8Ah6vhcLx/qjfAbxX+JwiOuWKHQAAA=',
    focus: '40% 50%',
    alt: {
      ar: 'نادلان بقميصين أبيضين ومريلتين يقدّمان من أطباق البوفيه في مطعم',
      en: 'Two waiters in white shirts and aprons serving from a buffet of chafing dishes in a restaurant',
    },
  },
  /** A waitress carrying two plates. Ships a 400px cut for the statement's capsules. */
  cateringPlates: {
    ...img('catering-plates', 1774),
    xs: '/ds/img/catering-plates-xs.webp',
    lqip: 'data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAABwBACdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBOja/h49T7fb4eEhJzox4dNwAD9qaiF3xfqw4u3JTFgKDAwPWLweXy4WSx/tXCpbdd9mr6quq5ITAK11F7038P6fdgedSuZxgCEQVpr67YfvkA6x39/UOLlNM3Dkcpkd0i1D1H1sE92uNC7hkphJ0duUF3EiQ14AAAA',
    focus: '50% 46%',
    alt: {
      ar: 'نادلة تحمل طبقين: حلوى مزيّنة بالتوت، وسلطة',
      en: 'A waitress carrying two plates — a dessert dressed with berries, and a salad',
    },
  },
  /**
   * A banquet table laid for a function: napkins folded into cones, glassware, the hall lit warm
   * behind. Taken from SEEM Catering's profile, which only holds it at 1181px, so it ships at that.
   */
  cateringBanquet: {
    ...img('catering-banquet', 1181),
    lqip: 'data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAABQBACdASoUAA4APu1iqU2ppaOiMAgBMB2JaACdMoAloho9Fnw+pVQI/yAgAPw6ewNq51QoQIr/Y+giWvGej68Zw6/Rh/dhF6b6kaFl7mHRMaqnOrny2yyEzmA6EZnfqps4hddaFiX91I7uBy1KTpmDR7+b5n0Xc9zH6iuhkWS/IWLe/qLvz4vs7M10+mZfmuWpxNwlaQ1MZwUbe+YwxEAA',
    focus: '44% 50%',
    alt: {
      ar: 'طاولة مأدبة طويلة مُعدّة لمناسبة: مناديل كريمية مطويّة بنقوش ذهبية، وكؤوس زجاجية، والقاعة خلفها مضاءة بضوء دافئ',
      en: 'A long banquet table laid for a function — cream napkins folded into cones with a gold pattern, glassware, the hall lit warm behind',
    },
  },
  /** Chefs finishing plates of chocolate dessert with a mint leaf. */
  cateringPlating: {
    ...set('catering-plating', 1774),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZQAAP/vb1mfQ4X2lmAD+r6ek6++WUYh1DvJxvD0omCx/C3TXPTWBWZRNwRpSStyAYgNdxioalD6U8qvQralCyu72Six8Z48tcDoC0hMX7Cgppb7e6R1x3owZKuefozKgAA==',
    focus: '60% 62%',
    alt: {
      ar: 'طهاة يضعون ورقة نعناع على أطباق حلوى الشوكولاتة',
      en: 'Chefs placing a mint leaf on plates of chocolate dessert',
    },
  },

  // --- Entertainment, cut from one contact sheet ------------------------------------------------

  dining: {
    ...tile('ent-dining'),
    xs: '/ds/img/ent-dining-xs.webp',
    lqip: 'data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoUAA8APu1iqU2ppaOiMAgBMB2JaACdMoMYAE5N3Ge2Ku8qNONzzEKCAAD+o0pn2W0iDOMqYn489idcaNI/uUp48gk1TzdjQTipOLd8vc417un86KyvgddIJLiCNFn8E0L3Y0WGtphuS/JF6lUUkky5d+tVAMwQQthjl7SEX/yY23LrchmP1ztTQWSXoD3EvXWTIedlQAA=',
    focus: '36% 62%',
    alt: { ar: 'مائدة على الواجهة المائية عند الغروب، والشموع على الطاولة', en: 'Waterfront dining at dusk, candles on the table' },
  },
  promenade: {
    ...tile('ent-promenade'),
    xs: '/ds/img/ent-promenade-xs.webp',
    lqip: 'data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAACwAwCdASoUAA8APu1iqU2ppaOiMAgBMB2JagCdMoACcwBNoEA4uAD+0Ree5uy/RpM1u9V4H35OqylVsNDLY3cM/h8woAeMWkUTcK/Lae4CJlZ76ic4gtEDNMDzIn7jNuOzhU9vfbzjZXtiXrvfIuCkacrxYGuosqp2lzvRo/1s7J3M9dyJiFSw2kVwoxBfG8ocDODHXn5/NCDXxFxBAAAA',
    focus: '55% 50%',
    alt: { ar: 'عائلة تمشي في ممشى مضاء نحو عجلة دوّارة', en: 'A family walking a lit promenade toward a Ferris wheel' },
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
 * farm under it. SEEM Supply's is set on white from the logo the client sent with its notes: the
 * S wound round a globe over a truck and its load, the wordmark, and «سيم للتوريدات» beneath. It
 * stands in for now, because the client means SEEM to name the group rather than any one venture.
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
  seemSupply: {
    ...mark('logo-seem-supply'),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADQBACdASoUABkAPtFUpk2oJCOiMBgIAQAaCWMAz2QQ7/xDeFwXP0H1YdwrLpjAAAD+9gL92aUnkR1CDRXZpUbijQf9hvu1BBQ4RvKuVgJ/GeI+FXGJJXtEyJC/U3l1OjOW/Ru59gjIkWCh07sE5pc6/ilmufOmF3MacAAA',
    focus: '50% 50%',
    alt: {
      ar: 'شعار سيم للتوريدات: حرف S يلتفّ حول كرة أرضية فوق شاحنة وصناديق، وتحته SEEM SUPPLY',
      en: 'The SEEM Supply logo: an S wound round a globe above a truck and boxes, over SEEM SUPPLY',
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
 * The nine strategic sectors, in the order the copy lists them — Industry, E-commerce,
 * Logistics, Tourism, Real estate, Entertainment, Catering, Supply, Agriculture — one picture
 * each from the sector set, so the reel repeats nothing the hero has just shown. Where a sector
 * has a platform, its picture is the platform's: JAZ Chocolate's plant, Qanif's sign, the waiters
 * at the buffet. E-commerce and supply take two pictures from the September edition, the card at
 * the counter and the cargo hub. Agriculture has none yet — nothing the client has sent shows its
 * coffee or cocoa — so its window shows its empty state until a picture arrives.
 */
export const sectorFrames: (Framed | undefined)[] = [
  { photo: photos.chocolateHall, focus: '50% 62%' },
  { photo: photos.cardTap, focus: '52% 50%' },
  { photo: photos.warehouse, focus: '52% 56%' },
  { photo: photos.longtail, focus: '50% 54%' },
  { photo: photos.courtyard, focus: '50% 56%' },
  { photo: photos.qanifSign, focus: '62% 54%' },
  { photo: photos.cateringService, focus: '40% 50%' },
  { photo: photos.cargoHub, focus: '42% 60%' },
  undefined,
]

/**
 * The home page's opening sequence: one frame per sector, keyed to the sector it shows. It opens
 * on the work — logistics, then industry, with tourism third — so the first frame says investor
 * and builder rather than travel, and it closes on catering's banquet table, the one frame taken
 * from the SEEM Catering profile. Entertainment is the family at Qanif from the September edition,
 * preferred to October's roller coaster, and e-commerce is the payment going through on a phone.
 * Two of the nine sectors sit this one out: supply, whose one picture, a cargo hub, would repeat
 * the logistics hub the sequence opens on, and agriculture, which has no picture yet.
 */
export const heroFrames: { sector: number; frame: Framed }[] = [
  { sector: 2, frame: { photo: photos.logistics, focus: '56% 52%' } },
  { sector: 0, frame: { photo: photos.chocolateConveyor, focus: '56% 60%' } },
  { sector: 3, frame: { photo: photos.coast, focus: '50% 50%' } },
  { sector: 4, frame: { photo: photos.residence, focus: '58% 52%' } },
  { sector: 5, frame: { photo: photos.qanifFamily, focus: '46% 58%' } },
  { sector: 1, frame: { photo: photos.payments, focus: '60% 48%' } },
  { sector: 6, frame: { photo: photos.cateringBanquet, focus: '44% 50%' } },
]

/**
 * The three verbs of the positioning line, each with a picture of the work behind it: chocolate
 * coming off the line, a table being served, a destination that draws a crowd. The capsules are a
 * word wide, so each picture ships a 400px cut for them and card-size pictures are enough.
 */
export const verbFrames: Framed[] = [
  { photo: photos.chocolateEnrober, focus: '40% 72%' },
  { photo: photos.cateringPlates, focus: '50% 46%' },
  { photo: photos.promenade, focus: '70% 36%' },
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
  { photo: marks.zlTours },
  { photo: marks.homera },
  { photo: marks.qanif },
  { photo: marks.seemSupply },
]

/**
 * The ecosystem page's platforms, in the same order. Each opens on a full-bleed picture of the
 * work and carries a framed detail of what it leads to: the box on the table, the payment that
 * closes the last mile, an evening out, the resort, Qanif's sign lit for the evening, and, at the
 * far end of SEEM Supply's docks, a dessert being finished. The plates are also the floors of the
 * model the page pulls back to.
 */
export const ecosystemPlatforms: { plate: Framed; detail: Framed }[] = [
  { plate: { photo: photos.chocolateHall, focus: '50% 60%' }, detail: { photo: photos.chocolateBox, focus: '50% 62%' } },
  { plate: { photo: photos.logistics, focus: '62% 56%' }, detail: { photo: photos.payments, focus: '56% 44%' } },
  { plate: { photo: photos.coast, focus: '64% 50%' }, detail: { photo: photos.promenade, focus: '52% 50%' } },
  { plate: { photo: photos.residence, focus: '60% 50%' }, detail: { photo: photos.hospitality, focus: '30% 62%' } },
  { plate: { photo: photos.qanifTerrace, focus: '40% 58%' }, detail: { photo: photos.qanifSign, focus: '68% 50%' } },
  { plate: { photo: photos.cargoHub, focus: '46% 56%' }, detail: { photo: photos.cateringPlating, focus: '62% 62%' } },
]

/**
 * The masthead plate each inner page opens on. The about, strategy and ecosystem pages close on
 * moments of their own rather than on a second plate.
 */
export const pagePlates = {
  about: {
    masthead: { photo: photos.coast, focus: '30% 50%' },
  },
  strategy: {
    masthead: { photo: photos.city, focus: '58% 44%' },
  },
  ecosystem: {
    masthead: { photo: photos.leisure, focus: '56% 50%' },
  },
  contact: {
    masthead: { photo: photos.residence, focus: '56% 50%' },
  },
} as const satisfies Record<string, { masthead: Framed }>

/** The home page's last window opens onto a resort above a bay: a destination built, and running. */
export const homeClosing: Framed = { photo: photos.hospitality, focus: '34% 58%' }

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

/**
 * The roadmap's four phases, in order: Jeddah's coast for the foundation, a plant in the
 * Kingdom's interior for the expansion at home, an evening destination for the region, and
 * Riyadh at first light, in the identity's own green glass, for 2030.
 */
export const roadFrames: Framed[] = [
  { photo: photos.coast, focus: '62% 50%' },
  { photo: photos.industry, focus: '60% 50%' },
  { photo: photos.leisure, focus: '58% 50%' },
  { photo: photos.facade, focus: '34% 58%' },
]
