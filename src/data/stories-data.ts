// src/data/stories-data.ts
//
// ─────────────────────────────────────────────────────────────────────────────
// CHERECHI — YOUR ONLY JOBS IN THIS FILE:
//
//   1. Find one image URL for each phase (12 total, marked TODO below).
//      Use Wikimedia Commons (commons.wikimedia.org) — search the topic,
//      click the image, then click "Download" → copy the direct .jpg URL.
//      Paste it where it says imageUrl: "TODO: ...".
//
//   2. Review the body text in each phase. If anything is wrong or you want
//      to add a sentence, edit directly. Keep each body under ~5 sentences.
//
//   3. For each diasporaDestination, check the 1-2 sentence description
//      is accurate. Edit if needed.
//
// Everything else is already done. Do not change any field names or structure.
// ─────────────────────────────────────────────────────────────────────────────

import yorubaPrecolonial       from "@/assets/stories/yoruba-precolonial.png";
import yorubaDiaspora          from "@/assets/stories/yoruba-diaspora.avif";
import yorubaModernday         from "@/assets/stories/yoruba-modernday.jpg";
import agriculturePrecolonial  from "@/assets/stories/agriculture-precolonial.jpg";
import agricultureDiaspora     from "@/assets/stories/agriculture-diaspora.png";
import agricultureModernday    from "@/assets/stories/agriculture-modernday.jpg";
import scholarshipPrecolonial  from "@/assets/stories/scholarship-precolonial.jpg";
import scholarshipDiaspora     from "@/assets/stories/scholarship-diaspora.jpg";
import scholarshipModernday    from "@/assets/stories/scholarship-modernday.jpg";
import medicinePrecolonial     from "@/assets/stories/medicine-precolonial.png";
import medicineDiaspora        from "@/assets/stories/medicine-diaspora.jpg";
import medicineModernday       from "@/assets/stories/medicine-modernday.jpg";

export type StoryCategory = "music" | "agriculture" | "scholarship" | "medicine";

export interface DiasporaDestination {
  countryName: string;
  lat: number;
  lng: number;
  /** 1–2 sentences: what specifically was brought here and how it lives on today */
  description: string;
}

export interface StoryPhase {
  label: "Pre-Colonial" | "Diaspora" | "Modern Day";
  headline: string;   // one punchy sentence shown as the card title
  body: string;       // 3–5 sentences of detail
  imageUrl: string;   // paste a direct image URL here (Wikimedia Commons preferred)
  imageCaption: string; // short credit / description of the image
}

export interface Story {
  id: string;
  category: StoryCategory;
  title: string;
  originCountry: string;
  originLat: number;
  originLng: number;
  phases: [StoryPhase, StoryPhase, StoryPhase];
  diasporaDestinations: DiasporaDestination[];
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY 1 — YORUBA MUSIC  (category: music, origin: Nigeria)
// ─────────────────────────────────────────────────────────────────────────────
const yorubaMusic: Story = {
  id: "yoruba-music",
  category: "music",
  title: "Yoruba Music & the Talking Drum",
  originCountry: "Nigeria",
  originLat: 9.082,
  originLng: 8.675,
  phases: [
    {
      label: "Pre-Colonial",
      headline: "Drums that could speak across villages",
      body:
        "Traditional Yoruba music from Nigeria was built around the talking drum (dùndún). " +
        "Because the Yoruba language is tonal, skilled drummers could tighten or loosen the drum strings to imitate speech patterns, " +
        "literally sending messages or praise poems through rhythm. " +
        "Music was central to religious ceremonies honoring the Orishas (Yoruba deities), to royal courts, " +
        "and to community events like festivals and funerals. " +
        "Drumming was not entertainment — it was communication, history, and spiritual practice all at once.",
      imageUrl: yorubaPrecolonial,
      imageCaption: "A traditional Yoruba talking drum (dùndún), used to send messages and lead ceremonies.",
    },
    {
      label: "Diaspora",
      headline: "Banned but never silenced",
      body:
        "During the Transatlantic Slave Trade, many Yoruba people were taken to the Caribbean and Brazil. " +
        "Slave owners often banned drums because they feared enslaved Africans would use them to communicate and organize. " +
        "In response, Africans preserved their rhythmic traditions through body percussion, clapping, and call-and-response singing. " +
        "In Cuba, Yoruba religious drumming became the foundation of Santería music. " +
        "In Brazil, these rhythms shaped Afro-Brazilian religious ceremonies known as Candomblé.",
      imageUrl: yorubaDiaspora,
      imageCaption: "An Afro-Brazilian Candomblé ceremony — Yoruba rhythms preserved across the Atlantic.",
    },
    {
      label: "Modern Day",
      headline: "From Lagos to global stages",
      body:
        "Today Yoruba musical traditions influence genres heard across the world. " +
        "The rhythmic layering and call-and-response structure that started in West African villages " +
        "became foundational to Jazz, Blues, Hip-Hop, and modern Afrobeats. " +
        "Nigerian artists like Fela Kuti, Wizkid, and Burna Boy incorporate traditional Yoruba drum patterns, " +
        "Yoruba language, and praise-singing techniques into music that now charts globally. " +
        "A cultural practice that began in pre-colonial Nigeria still shapes what you hear on the radio today.",
      imageUrl: yorubaModernday,
      imageCaption: "Modern Afrobeats carries forward centuries of Yoruba musical tradition.",
    },
  ],
  diasporaDestinations: [
    {
      countryName: "Cuba",
      lat: 21.521757,
      lng: -77.781167,
      description:
        "Yoruba religious drumming became the backbone of Santería (Lucumí) music in Cuba. " +
        "Traditional bata drums are still used in religious ceremonies there today.",
    },
    {
      countryName: "Brazil",
      lat: -14.235004,
      lng: -51.92528,
      description:
        "Yoruba rhythms and spiritual practices blended into Candomblé, " +
        "an Afro-Brazilian religion whose music preserves West African drum patterns passed down for centuries.",
    },
    {
      countryName: "Haiti",
      lat: 18.971187,
      lng: -72.285215,
      description:
        "Yoruba spiritual practices blended with local traditions to form Haitian Vodou drumming, " +
        "which remains a living ceremonial tradition in Haiti today.",
    },
    {
      countryName: "United States",
      lat: 37.09024,
      lng: -95.712891,
      description:
        "African musical traits — especially the call-and-response structure and complex polyrhythms — " +
        "became the foundation of Blues and Jazz in the American South, " +
        "which then gave rise to Rock, Soul, and Hip-Hop.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 2 — AFRICAN AGRICULTURAL KNOWLEDGE  (category: agriculture)
// ─────────────────────────────────────────────────────────────────────────────
const africanAgriculture: Story = {
  id: "african-agriculture",
  category: "agriculture",
  title: "African Agricultural Knowledge",
  originCountry: "Sierra Leone",
  originLat: 8.460555,
  originLng: -11.779889,
  phases: [
    {
      label: "Pre-Colonial",
      headline: "Advanced farming long before colonization",
      body:
        "A common myth used to justify slavery was that it 'taught Africans how to farm.' This is false. " +
        "West African farmers developed advanced agricultural systems centuries before European colonization. " +
        "People from the rice-growing regions of Sierra Leone and surrounding areas were experts in wetland rice cultivation, " +
        "using sophisticated irrigation and flood management techniques. " +
        "Other West African farmers cultivated yams, okra, black-eyed peas, and a wide range of vegetables " +
        "that formed the dietary foundation of entire civilizations.",
      imageUrl: agriculturePrecolonial,
      imageCaption: "Traditional West African wetland rice farming — a technique that predates European contact.",
    },
    {
      label: "Diaspora",
      headline: "Enslaved Africans taught America to grow rice",
      body:
        "When Africans were enslaved and brought to North America, plantation owners in South Carolina and Georgia " +
        "specifically sought people from rice-growing regions of West Africa because of their knowledge. " +
        "It was enslaved Africans — not European colonizers — who built the rice industry that made those colonies wealthy. " +
        "Their expertise in cultivating rice in wetland environments was essential to its success. " +
        "The people who were enslaved held the knowledge that their enslavers lacked.",
      imageUrl: agricultureDiaspora,
      imageCaption: "Rice plantations in South Carolina were built on the agricultural expertise of enslaved Africans. Here are enslaved Africans carrying rice in South Carolina, U.S.A.",
    },
    {
      label: "Modern Day",
      headline: "African foods at the center of American cuisine",
      body:
        "Many foods considered staples of American and Caribbean cuisine trace directly to African agricultural traditions. " +
        "Rice, okra, black-eyed peas, yams, and collard greens were all brought or influenced by African diaspora communities. " +
        "Dishes like gumbo, Hoppin' John, and red beans and rice are direct descendants of West African cooking. " +
        "This is not coincidence — it is the result of the agricultural expertise that enslaved Africans carried with them " +
        "and preserved across generations despite every effort to erase it.",
      imageUrl: agricultureModernday,
      imageCaption: "Gumbo and okra dishes — African agricultural heritage alive in American Southern cuisine.",
    },
  ],
  diasporaDestinations: [
    {
      countryName: "United States",
      lat: 37.09024,
      lng: -95.712891,
      description:
        "Enslaved Africans from rice-growing regions built the rice industry of South Carolina and Georgia. " +
        "Their food traditions gave rise to the entire canon of American Southern cuisine.",
    },
    {
      countryName: "Haiti",
      lat: 18.971187,
      lng: -72.285215,
      description:
        "West African farming knowledge shaped Haitian cuisine and agricultural practices, " +
        "with staple crops like yams and okra central to Haitian food culture today.",
    },
    {
      countryName: "Jamaica",
      lat: 18.109581,
      lng: -77.297508,
      description:
        "African agricultural traditions, including the cultivation of yams, ackee, and plantain, " +
        "form the backbone of Jamaican food culture.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 3 — AFRICAN UNIVERSITIES & SCHOLARSHIP  (category: scholarship)
// ─────────────────────────────────────────────────────────────────────────────
const africanScholarship: Story = {
  id: "african-scholarship",
  category: "scholarship",
  title: "Timbuktu & the African University",
  originCountry: "Mali",
  originLat: 17.570692,
  originLng: -3.996166,
  phases: [
    {
      label: "Pre-Colonial",
      headline: "Timbuktu had one of the world's great universities",
      body:
        "Long before European colonization, major centers of learning existed in West Africa. " +
        "The most famous was in Timbuktu, in present-day Mali, home to institutions including the Sankore Madrasah. " +
        "These were not simple schools — they functioned like modern universities, where students studied " +
        "mathematics, astronomy, medicine, law, theology, and literature. " +
        "The city housed hundreds of thousands of manuscripts written in Arabic and African languages, " +
        "preserving centuries of scientific and religious knowledge. " +
        "At its peak, Timbuktu attracted scholars from across Africa and the Islamic world.",
      imageUrl: scholarshipPrecolonial,
      imageCaption: "The Sankore Madrasah in Timbuktu — one of the centers of learning in medieval West Africa.",
    },
    {
      label: "Diaspora",
      headline: "Literacy survived the Middle Passage",
      body:
        "During the Transatlantic Slave Trade, some enslaved Africans were literate scholars or educated Muslims " +
        "from regions connected to Timbuktu's intellectual traditions. " +
        "Although slavery severely restricted education and made it illegal to teach enslaved people to read in many areas, " +
        "intellectual traditions survived through oral knowledge, religious education, and secret teaching within communities. " +
        "Several enslaved Africans who escaped or were freed wrote memoirs in Arabic — " +
        "evidence that literacy and scholarship were not erased, only suppressed.",
      imageUrl: scholarshipDiaspora,
      imageCaption: "Original Timbuktu manuscripts (13th–16th century) — written evidence of advanced African scholarship.",
    },
    {
      label: "Modern Day",
      headline: "Hundreds of thousands of manuscripts being rediscovered",
      body:
        "Today the rediscovery and preservation of the Timbuktu manuscripts is rewriting history. " +
        "Researchers have identified over 300,000 manuscripts covering mathematics, astronomy, medicine, and law — " +
        "many still untranslated. " +
        "This directly challenges the colonial-era myth that Africa had no written history before Europeans arrived. " +
        "Institutions like the Ahmed Baba Institute in Mali are now digitizing these texts to share them with the world. " +
        "The story of Timbuktu is not ancient history — it is an active, ongoing recovery of what was deliberately hidden.",
      imageUrl: scholarshipModernday,
      imageCaption: "Scholars preserving Timbuktu manuscripts today — recovering centuries of suppressed African knowledge.",
    },
  ],
  diasporaDestinations: [
    {
      countryName: "Morocco",
      lat: 31.791702,
      lng: -7.09262,
      description:
        "Timbuktu scholars influenced Islamic scholarship across North Africa, " +
        "and trade routes connected Mali's intellectual centers to universities in Fez and Marrakech.",
    },
    {
      countryName: "Egypt",
      lat: 26.820553,
      lng: 30.802498,
      description:
        "Al-Azhar University in Cairo was deeply connected to the broader Islamic scholarly network " +
        "that included Timbuktu, with students and texts moving across the trans-Saharan trade routes.",
    },
    {
      countryName: "United States",
      lat: 37.09024,
      lng: -95.712891,
      description:
        "The tradition of education as liberation — kept alive secretly under slavery — " +
        "contributed to the founding of Historically Black Colleges and Universities (HBCUs) after emancipation.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 4 — AFRICAN MEDICINE  (category: medicine)
// ─────────────────────────────────────────────────────────────────────────────
const africanMedicine: Story = {
  id: "african-medicine",
  category: "medicine",
  title: "African Medicine & Imhotep",
  originCountry: "Egypt",
  originLat: 26.820553,
  originLng: 30.802498,
  phases: [
    {
      label: "Pre-Colonial",
      headline: "Imhotep: the first physician in recorded history",
      body:
        "Modern physicians take the Hippocratic Oath in honor of the Greek physician Hippocrates — " +
        "but Hippocrates himself credited Imhotep of ancient Egypt as his source of medical knowledge. " +
        "Imhotep lived around 2600 BCE and is considered one of the first known physicians in history. " +
        "African healers developed extensive knowledge of plant-based medicines, bone-setting techniques, and surgical procedures, " +
        "recorded in texts like the Ebers Papyrus (1550 BCE), which contains over 842 medical remedies. " +
        "This was not primitive folk medicine — it was a systematic, documented science that predated European medicine by thousands of years.",
      imageUrl: medicinePrecolonial,
      imageCaption: "The Ebers Papyrus (c. 1550 BCE) — one of the oldest medical texts in human history, from ancient Egypt.",
    },
    {
      label: "Diaspora",
      headline: "Enslaved healers kept plantations alive",
      body:
        "Enslaved Africans brought deep knowledge of medicinal plants and healing practices to the Americas. " +
        "Many plantations depended entirely on enslaved healers to treat illness, " +
        "because these healers understood how to use local plants to treat fevers, wounds, and infections. " +
        "Traditional African remedies often worked better than European treatments of the time, " +
        "which still relied on practices like bloodletting. " +
        "African healing traditions also blended with spiritual practices to form diaspora religions like Vodou and Candomblé, " +
        "where herbalism and healing remain central to this day.",
      imageUrl: medicineDiaspora,
      imageCaption: "Traditional African herbal medicine — knowledge brought to the Americas by enslaved Africans.",
    },
    {
      label: "Modern Day",
      headline: "Modern drugs traced back to African plant knowledge",
      body:
        "Many medicines used today to treat malaria, pain, and even certain cancers originate from plants " +
        "that African traditional healers have used for centuries. " +
        "Artemisinin — the most effective anti-malaria drug in the world — was derived from a plant used in traditional medicine. " +
        "Researchers are now actively studying African traditional remedies to find new treatments, " +
        "a field called ethnopharmacology. " +
        "Traditional healers remain an important part of healthcare in many African communities today, " +
        "and the WHO now formally recognizes traditional medicine as part of global healthcare strategy.",
      imageUrl: medicineModernday,
      imageCaption: "Traditional African healers continue to practice medicine rooted in thousands of years of knowledge.",
    },
  ],
  diasporaDestinations: [
    {
      countryName: "United States",
      lat: 37.09024,
      lng: -95.712891,
      description:
        "Enslaved African healers were the primary medical practitioners on many plantations. " +
        "Their herbal knowledge influenced American folk medicine and contributed to modern pharmacology.",
    },
    {
      countryName: "Haiti",
      lat: 18.971187,
      lng: -72.285215,
      description:
        "Haitian Vodou preserved African healing traditions, blending herbalism with spiritual practice. " +
        "Vodou priests and priestesses (houngans and mambos) remain important healers in Haitian communities.",
    },
    {
      countryName: "Brazil",
      lat: -14.235004,
      lng: -51.92528,
      description:
        "Afro-Brazilian religions like Candomblé preserved African healing knowledge, " +
        "with herbal remedies (ervas) remaining central to spiritual and physical healing practices.",
    },
    {
      countryName: "Greece",
      lat: 39.074208,
      lng: 21.824312,
      description:
        "Hippocrates — credited as the 'father of medicine' in the Western tradition — " +
        "explicitly acknowledged learning from Egyptian (African) medical knowledge, " +
        "making ancient Egypt the true origin point of Western medicine.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const STORIES: Story[] = [
  yorubaMusic,
  africanAgriculture,
  africanScholarship,
  africanMedicine,
];

/** Which countries should highlight on the map when each category is active */
export const CATEGORY_COUNTRIES: Record<StoryCategory, string[]> = {
  music:       ["Nigeria", "Cuba", "Brazil", "Haiti", "United States"],
  agriculture: ["Nigeria", "Ghana", "Sierra Leone", "United States", "Haiti", "Jamaica"],
  scholarship: ["Mali", "Egypt", "Morocco", "United States"],
  medicine:    ["Egypt", "Nigeria", "Ethiopia", "United States", "Haiti", "Brazil", "Greece"],
};

/** Display label and accent color for each category button */
export const CATEGORY_META: Record<
  StoryCategory,
  { label: string; color: string; hoverColor: string }
> = {
  music:       { label: "Music",       color: "#C85530", hoverColor: "#B04828" },
  agriculture: { label: "Agriculture", color: "#1A6B3C", hoverColor: "#155c32" },
  scholarship: { label: "Scholarship", color: "#1A4A8A", hoverColor: "#153d73" },
  medicine:    { label: "Medicine",    color: "#D4860A", hoverColor: "#b87208" },
};

/** Lat/lng coordinates for every diaspora country used across all stories */
export const DIASPORA_COUNTRY_COORDS: Record<string, { lat: number; lng: number }> = {
  "Cuba":          { lat: 21.521757,  lng: -77.781167 },
  "Brazil":        { lat: -14.235004, lng: -51.92528  },
  "Haiti":         { lat: 18.971187,  lng: -72.285215 },
  "United States": { lat: 37.09024,   lng: -95.712891 },
  "Jamaica":       { lat: 18.109581,  lng: -77.297508 },
  "Morocco":       { lat: 31.791702,  lng: -7.09262   },
  "Egypt":         { lat: 26.820553,  lng: 30.802498  },
  "Mali":          { lat: 17.570692,  lng: -3.996166  },
  "Nigeria":       { lat: 9.082,      lng: 8.675      },
  "Ghana":         { lat: 7.946527,   lng: -1.023194  },
  "Sierra Leone":  { lat: 8.460555,   lng: -11.779889 },
  "Ethiopia":      { lat: 9.145,      lng: 40.489673  },
  "Greece":        { lat: 39.074208,  lng: 21.824312  },
};
