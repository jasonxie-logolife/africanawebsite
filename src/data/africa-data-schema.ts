// Comprehensive Africa Points of Interest Data Schema
// This file contains all POI data for the Interactive Africa Map
// Schema version: 1.0.0

export type POIType = 
  | "major-city"
  | "museum"
  | "restaurant"
  | "mall"
  | "hotel"
  | "tourist-attraction"
  | "natural-resource";

export interface CountryInfo {
  name: string;
  capital: string;
  timezone: string; // IANA timezone identifier
  population: number;
  languages: string[];
  currency: string;
  colonialHistory: {
    colonizer: string;
    independenceYear: number;
    colonialImpact: string;
    currentImpacts: string[];
  };
  quickFacts: string[];
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: POIType;
  country: string;
  lat: number;
  lng: number;
  description: string;
  culturalSignificance?: string;
  
  // For museums
  artAndArtists?: {
    collections: string[];
    notableArtists: string[];
    africanArtFocus: string;
  };
  
  // For major cities
  localCulture?: {
    traditions: string[];
    languages: string[];
    cuisine: string[];
    festivals: string[];
  };
  
  // For natural resources
  resourceInfo?: {
    resourceType: "Gold" | "Diamond" | "Copper" | "Oil" | "Cobalt" | "Coltan" | "Uranium";
    productionVolume: string;
    exportDestinations: string[];
    corporateOwnership: string[];
    localBenefit: string;
    workingConditions: {
      description: string;
      issues: string[];
      reforms: string[];
    };
    colonialLegacy: string;
  };
}

// Country Data
export const COUNTRIES: Record<string, CountryInfo> = {
  Nigeria: {
    name: "Nigeria",
    capital: "Abuja",
    timezone: "Africa/Lagos",
    population: 223800000,
    languages: ["English (official)", "Hausa", "Yoruba", "Igbo", "Fulani"],
    currency: "Nigerian Naira (NGN)",
    colonialHistory: {
      colonizer: "British Empire",
      independenceYear: 1960,
      colonialImpact: "The British imposed artificial borders that grouped diverse ethnic groups together, leading to ongoing ethnic tensions. They established an extractive economy focused on palm oil, cocoa, and later petroleum exports.",
      currentImpacts: [
        "English remains the official language, creating barriers for many citizens",
        "Export-oriented economy dependent on oil revenue",
        "Ongoing ethnic and religious conflicts rooted in colonial divide-and-rule policies",
        "Educational system modeled on British curriculum"
      ]
    },
    quickFacts: [
      "Most populous country in Africa with over 223 million people",
      "Home to Nollywood, the world's second-largest film industry",
      "Over 500 indigenous languages spoken",
      "Leading oil producer in Africa"
    ]
  },
  
  Ghana: {
    name: "Ghana",
    capital: "Accra",
    timezone: "Africa/Accra",
    population: 33480000,
    languages: ["English (official)", "Akan", "Ewe", "Ga", "Dagbani"],
    currency: "Ghanaian Cedi (GHS)",
    colonialHistory: {
      colonizer: "British Empire (as Gold Coast)",
      independenceYear: 1957,
      colonialImpact: "First sub-Saharan African colony to gain independence. British exploitation focused on gold and cocoa. Slave trade through coastal forts left deep scars on communities.",
      currentImpacts: [
        "Legacy of slave trade forts now serve as historical tourism sites",
        "Cocoa economy established by colonial powers remains dominant",
        "English education system continues",
        "Democratic institutions influenced by British parliamentary model"
      ]
    },
    quickFacts: [
      "First sub-Saharan African nation to gain independence (1957)",
      "World's second-largest cocoa producer",
      "Home to Cape Coast and Elmina slave castles",
      "Known for Kente cloth and Ashanti gold weights"
    ]
  },
  
  Kenya: {
    name: "Kenya",
    capital: "Nairobi",
    timezone: "Africa/Nairobi",
    population: 54980000,
    languages: ["Swahili (national)", "English (official)", "Kikuyu", "Luo", "Luhya"],
    currency: "Kenyan Shilling (KES)",
    colonialHistory: {
      colonizer: "British Empire",
      independenceYear: 1963,
      colonialImpact: "British settlers seized fertile highlands from Kikuyu people. Brutal suppression of Mau Mau uprising (1952-1960) killed thousands. Created artificial borders dividing ethnic groups.",
      currentImpacts: [
        "Land inequality from colonial-era land seizures persists",
        "Tourism economy focuses on wildlife safaris, a colonial legacy",
        "English-language education and legal systems remain",
        "Economic ties to Britain and Western nations continue"
      ]
    },
    quickFacts: [
      "Home to the Maasai Mara and world-famous wildlife",
      "Birthplace of long-distance running champions",
      "Major tech hub known as 'Silicon Savannah'",
      "Swahili culture blends African, Arab, and Indian influences"
    ]
  },
  
  Ethiopia: {
    name: "Ethiopia",
    capital: "Addis Ababa",
    timezone: "Africa/Addis_Ababa",
    population: 123400000,
    languages: ["Amharic (official)", "Oromo", "Tigrinya", "Somali"],
    currency: "Ethiopian Birr (ETB)",
    colonialHistory: {
      colonizer: "Never colonized (except brief Italian occupation 1936-1941)",
      independenceYear: 0, // Never colonized
      colonialImpact: "Only African nation never colonized by European powers. Brief Italian occupation during WWII. Maintained sovereignty and ancient cultural traditions.",
      currentImpacts: [
        "Retained indigenous languages and writing systems",
        "Ancient Orthodox Christian tradition preserved",
        "Unique calendar system (7-8 years behind Gregorian)",
        "Independence inspired pan-African movements"
      ]
    },
    quickFacts: [
      "Only African country never colonized",
      "Home to ancient rock-hewn churches of Lalibela",
      "Birthplace of coffee",
      "Uses its own unique calendar and time system"
    ]
  },
  
  Egypt: {
    name: "Egypt",
    capital: "Cairo",
    timezone: "Africa/Cairo",
    population: 109300000,
    languages: ["Arabic (official)", "Egyptian Arabic"],
    currency: "Egyptian Pound (EGP)",
    colonialHistory: {
      colonizer: "British Empire",
      independenceYear: 1952,
      colonialImpact: "British occupation (1882-1952) exploited Suez Canal for trade. French cultural influence from Napoleon. Colonial powers appropriated ancient artifacts.",
      currentImpacts: [
        "Suez Canal remains strategic economic asset",
        "Many ancient artifacts remain in European museums",
        "Tourism economy focuses on ancient history",
        "Political borders drawn by colonial powers"
      ]
    },
    quickFacts: [
      "Home to the pyramids and ancient civilization",
      "Suez Canal connects Mediterranean and Red Sea",
      "Arabic language and Islamic culture center",
      "95% of population lives along the Nile River"
    ]
  },
  
  "South Africa": {
    name: "South Africa",
    capital: "Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)",
    timezone: "Africa/Johannesburg",
    population: 60140000,
    languages: ["11 official languages including Zulu", "Xhosa", "Afrikaans", "English"],
    currency: "South African Rand (ZAR)",
    colonialHistory: {
      colonizer: "Dutch and British",
      independenceYear: 1994, // End of apartheid
      colonialImpact: "Dutch (1652) and British colonization led to apartheid (1948-1994). Systematic racial segregation and oppression. Land dispossession and forced removals.",
      currentImpacts: [
        "Extreme wealth inequality along racial lines persists",
        "Land ownership heavily skewed toward white minority",
        "Townships and informal settlements from forced removals",
        "Ongoing reconciliation and transformation efforts"
      ]
    },
    quickFacts: [
      "Most industrialized economy in Africa",
      "11 official languages - most in Africa",
      "Home to Kruger National Park",
      "Major gold and diamond mining industry"
    ]
  },
  
  Tanzania: {
    name: "Tanzania",
    capital: "Dodoma (official), Dar es Salaam (largest city)",
    timezone: "Africa/Dar_es_Salaam",
    population: 65500000,
    languages: ["Swahili (official)", "English (official)", "Local languages"],
    currency: "Tanzanian Shilling (TZS)",
    colonialHistory: {
      colonizer: "Germany, then British",
      independenceYear: 1961,
      colonialImpact: "German East Africa (1880s-1918) brutally suppressed Maji Maji Rebellion. British mandate reorganized territory. Zanzibar slave trade center.",
      currentImpacts: [
        "Swahili emerged as unifying language post-independence",
        "Tourism economy focused on Serengeti and Zanzibar",
        "Agricultural economy structure from colonial era",
        "Border with Kenya divides Maasai people"
      ]
    },
    quickFacts: [
      "Home to Mount Kilimanjaro, Africa's highest peak",
      "Serengeti National Park and Great Migration",
      "Zanzibar spice islands with rich Swahili culture",
      "Lake Tanganyika is world's second-deepest lake"
    ]
  },
  
  DRC: {
    name: "Democratic Republic of Congo",
    capital: "Kinshasa",
    timezone: "Africa/Kinshasa",
    population: 99010000,
    languages: ["French (official)", "Lingala", "Swahili", "Kikongo", "Tshiluba"],
    currency: "Congolese Franc (CDF)",
    colonialHistory: {
      colonizer: "Belgium (personal property of King Leopold II before 1908)",
      independenceYear: 1960,
      colonialImpact: "King Leopold II's brutal exploitation (1885-1908) killed an estimated 10 million people. Rubber and ivory extraction through forced labor and mutilation.",
      currentImpacts: [
        "Ongoing conflict over mineral resources (cobalt, coltan, diamonds)",
        "Foreign corporations continue exploitative mining practices",
        "Weak governance infrastructure from colonial neglect",
        "Borders divided ethnic groups, creating conflict"
      ]
    },
    quickFacts: [
      "Second-largest country in Africa by area",
      "Contains 60% of world's cobalt reserves",
      "Congo River is world's deepest river",
      "Incredibly biodiverse with unique wildlife"
    ]
  },
  
  Morocco: {
    name: "Morocco",
    capital: "Rabat",
    timezone: "Africa/Casablanca",
    population: 37460000,
    languages: ["Arabic (official)", "Berber (official)", "French (widely used)"],
    currency: "Moroccan Dirham (MAD)",
    colonialHistory: {
      colonizer: "France and Spain",
      independenceYear: 1956,
      colonialImpact: "French protectorate (1912-1956) in north and center, Spanish in south. French language and culture deeply embedded in education and business.",
      currentImpacts: [
        "French remains language of business and higher education",
        "Economic ties to France remain strong",
        "Berber culture and language suppressed during colonial era",
        "Western Sahara dispute rooted in colonial borders"
      ]
    },
    quickFacts: [
      "Gateway between Africa and Europe",
      "Ancient medinas and Islamic architecture",
      "Major film production destination",
      "Known for Moroccan mint tea and cuisine"
    ]
  },
  
  Senegal: {
    name: "Senegal",
    capital: "Dakar",
    timezone: "Africa/Dakar",
    population: 17320000,
    languages: ["French (official)", "Wolof", "Pulaar", "Serer"],
    currency: "West African CFA Franc (XOF)",
    colonialHistory: {
      colonizer: "France",
      independenceYear: 1960,
      colonialImpact: "French West Africa headquarters. Gorée Island was major slave trade center. Assimilation policy attempted to erase African identity.",
      currentImpacts: [
        "Still uses French colonial currency (CFA Franc) controlled by France",
        "French education system predominates",
        "Gorée Island serves as slavery memorial site",
        "Economic dependency on peanut monoculture from colonial era"
      ]
    },
    quickFacts: [
      "Westernmost point of Africa",
      "Vibrant music scene (mbalax, hip-hop)",
      "Gorée Island UNESCO World Heritage site",
      "Known for Teranga (hospitality) culture"
    ]
  }
};

// Points of Interest Data
export const POINTS_OF_INTEREST: PointOfInterest[] = [
  // === NIGERIA ===
  {
    id: "ng-lagos-city",
    name: "Lagos",
    type: "major-city",
    country: "Nigeria",
    lat: 6.5244,
    lng: 3.3792,
    description: "Nigeria's largest city and economic capital, a vibrant metropolis blending traditional Yoruba culture with modern urban life.",
    localCulture: {
      traditions: ["Yoruba festivals", "Eyo masquerade", "Owambe parties"],
      languages: ["Yoruba", "English", "Pidgin English"],
      cuisine: ["Jollof rice", "Suya", "Akara", "Eba and egusi soup"],
      festivals: ["Lagos Carnival", "Eyo Festival", "Felabration"]
    }
  },
  {
    id: "ng-national-museum",
    name: "National Museum Lagos",
    type: "museum",
    country: "Nigeria",
    lat: 6.4550,
    lng: 3.3900,
    description: "Premier museum showcasing Nigeria's diverse cultural heritage and contemporary art.",
    artAndArtists: {
      collections: ["Benin Bronzes", "Nok terracotta sculptures", "Yoruba wood carvings", "Contemporary Nigerian art"],
      notableArtists: ["Ben Enwonwu", "Yusuf Grillo", "Bruce Onobrakpeya"],
      africanArtFocus: "Features extensive collection of Benin Kingdom bronzes and masks, Nok civilization artifacts, and traditional crafts from over 250 ethnic groups"
    }
  },
  {
    id: "ng-lagos-restaurant",
    name: "Terra Kulture",
    type: "restaurant",
    country: "Nigeria",
    lat: 6.4381,
    lng: 3.4301,
    description: "Cultural center and restaurant serving authentic Nigerian cuisine in an art-filled atmosphere.",
    culturalSignificance: "Promotes Nigerian arts, crafts, and culinary heritage"
  },
  {
    id: "ng-ikeja-mall",
    name: "Ikeja City Mall",
    type: "mall",
    country: "Nigeria",
    lat: 6.6109,
    lng: 3.3406,
    description: "Major shopping and entertainment destination in Lagos."
  },
  {
    id: "ng-transcorp-hotel",
    name: "Transcorp Hilton Abuja",
    type: "hotel",
    country: "Nigeria",
    lat: 9.0643,
    lng: 7.4892,
    description: "Luxury hotel in Nigeria's capital, showcasing modern African hospitality."
  },
  {
    id: "ng-yankari-park",
    name: "Yankari National Park",
    type: "tourist-attraction",
    country: "Nigeria",
    lat: 9.7500,
    lng: 10.5000,
    description: "Wildlife reserve featuring elephants, lions, and natural warm springs.",
    culturalSignificance: "One of West Africa's premier wildlife destinations"
  },
  {
    id: "ng-delta-oil",
    name: "Niger Delta Oil Fields",
    type: "natural-resource",
    country: "Nigeria",
    lat: 5.0000,
    lng: 6.0000,
    description: "Major oil-producing region providing 90% of Nigeria's export revenue.",
    resourceInfo: {
      resourceType: "Oil",
      productionVolume: "1.4 million barrels per day (2023)",
      exportDestinations: ["United States", "India", "Spain", "France", "Netherlands"],
      corporateOwnership: ["Shell", "Chevron", "ExxonMobil", "Total", "Nigerian National Petroleum Corporation (NNPC)"],
      localBenefit: "Despite being Africa's largest oil producer, local communities see minimal benefits. Oil wealth is concentrated in government and foreign corporations.",
      workingConditions: {
        description: "Oil extraction has caused severe environmental degradation in Niger Delta",
        issues: [
          "Gas flaring pollutes air and causes health problems",
          "Oil spills contaminate water and farmland",
          "Limited local employment in skilled positions",
          "Lack of basic infrastructure despite decades of oil revenue",
          "Community violence and militancy over resource control"
        ],
        reforms: [
          "Petroleum Industry Act (2021) aims to increase local content",
          "Environmental cleanup efforts in Ogoniland",
          "Calls for resource control and derivation increase"
        ]
      },
      colonialLegacy: "Oil was discovered in 1956 before independence. British companies established extractive practices that persist today, with foreign corporations maintaining control over most profitable operations."
    }
  },
  
  // === GHANA ===
  {
    id: "gh-accra-city",
    name: "Accra",
    type: "major-city",
    country: "Ghana",
    lat: 5.6037,
    lng: -0.1870,
    description: "Ghana's capital and largest city, known for vibrant markets, colonial architecture, and contemporary art scene.",
    localCulture: {
      traditions: ["Kente weaving", "Homowo Festival", "Adowa dance"],
      languages: ["Akan (Twi)", "Ga", "English"],
      cuisine: ["Waakye", "Banku and tilapia", "Red red", "Kelewele"],
      festivals: ["Homowo Festival", "Chale Wote Street Art Festival", "Aboakyir Deer Hunting Festival"]
    }
  },
  {
    id: "gh-national-museum",
    name: "Ghana National Museum",
    type: "museum",
    country: "Ghana",
    lat: 5.5519,
    lng: -0.2138,
    description: "Oldest museum in Ghana displaying ethnographic and archaeological collections.",
    artAndArtists: {
      collections: ["Ashanti gold weights", "Kente cloth", "Traditional artifacts", "Contemporary Ghanaian art"],
      notableArtists: ["El Anatsui", "Ibrahim Mahama", "Ablade Glover", "Kofi Setordji"],
      africanArtFocus: "Focuses on Ghana's rich artistic traditions including Kente weaving, brass casting, pottery, and Ashanti goldsmithing. Features works by contemporary African artists reinterpreting traditional forms."
    }
  },
  {
    id: "gh-cape-coast-castle",
    name: "Cape Coast Castle",
    type: "tourist-attraction",
    country: "Ghana",
    lat: 5.1053,
    lng: -1.2464,
    description: "UNESCO World Heritage site, one of about 40 slave castles along Ghana's coast",
    culturalSignificance: "Major site for African diaspora heritage tourism, symbol of the horrors of transatlantic slave trade"
  },
  {
    id: "gh-accra-mall",
    name: "Accra Mall",
    type: "mall",
    country: "Ghana",
    lat: 5.6519,
    lng: -0.1767,
    description: "Premier shopping destination in West Africa."
  },
  {
    id: "gh-movenpick-hotel",
    name: "Movenpick Ambassador Hotel Accra",
    type: "hotel",
    country: "Ghana",
    lat: 5.5590,
    lng: -0.1970,
    description: "Luxury hotel showcasing Ghanaian hospitality and modern amenities."
  },
  {
    id: "gh-obuasi-gold-mine",
    name: "Obuasi Gold Mine",
    type: "natural-resource",
    country: "Ghana",
    lat: 6.2000,
    lng: -1.6667,
    description: "One of the world's richest gold mines, operating since 1897.",
    resourceInfo: {
      resourceType: "Gold",
      productionVolume: "380,000 ounces per year (2023)",
      exportDestinations: ["Switzerland", "India", "United Arab Emirates", "United Kingdom"],
      corporateOwnership: ["AngloGold Ashanti (controlled by foreign investors)", "Government of Ghana (minority stake)"],
      localBenefit: "Limited benefit to local communities despite over a century of mining. Most profits flow to foreign shareholders.",
      workingConditions: {
        description: "Large-scale industrial mining with mechanization",
        issues: [
          "Underground mining hazards including tunnel collapses",
          "Mercury and cyanide contamination of water sources",
          "Land displacement without adequate compensation",
          "Low wages compared to international standards",
          "Illegal artisanal mining (galamsey) with dangerous conditions"
        ],
        reforms: [
          "Community development agreements with mining companies",
          "Efforts to formalize artisanal mining",
          "Environmental regulations strengthened"
        ]
      },
      colonialLegacy: "British Gold Coast was named for gold resources. Colonial-era mining laws favored foreign companies. Today, majority of gold mining revenue still leaves Ghana."
    }
  },
  
  // === KENYA ===
  {
    id: "ke-nairobi-city",
    name: "Nairobi",
    type: "major-city",
    country: "Kenya",
    lat: -1.2921,
    lng: 36.8219,
    description: "East Africa's economic hub, blending modern tech innovation with Maasai and Kikuyu cultures.",
    localCulture: {
      traditions: ["Maasai beadwork", "Kikuyu ceremonies", "Swahili coastal culture"],
      languages: ["Swahili", "Kikuyu", "Luo", "English"],
      cuisine: ["Nyama choma", "Ugali", "Sukuma wiki", "Githeri"],
      festivals: ["Nairobi Festival", "Lamu Cultural Festival", "Mombasa Carnival"]
    }
  },
  {
    id: "ke-national-museum",
    name: "Nairobi National Museum",
    type: "museum",
    country: "Kenya",
    lat: -1.2714,
    lng: 36.8172,
    description: "Kenya's flagship museum showcasing natural history, culture, and contemporary art.",
    artAndArtists: {
      collections: ["Traditional Kenyan crafts", "East African contemporary art", "Maasai beadwork and jewelry", "Archaeological finds"],
      notableArtists: ["Jak Katarikawe", "Elimo Njau", "Theresa Musoke", "Richard Onyango"],
      africanArtFocus: "Celebrates Kenya's diverse ethnic arts including Kikuyu woodcarving, Maasai beadwork, Kamba basketry, and contemporary urban art movements. Features galleries on human evolution with original fossils from Kenya."
    }
  },
  {
    id: "ke-maasai-mara",
    name: "Maasai Mara National Reserve",
    type: "tourist-attraction",
    country: "Kenya",
    lat: -1.5000,
    lng: 35.1500,
    description: "World-famous for the Great Migration and Big Five wildlife.",
    culturalSignificance: "Sacred land of Maasai people, showcasing Kenya's wildlife conservation efforts"
  },
  {
    id: "ke-sarova-hotel",
    name: "Sarova Stanley Hotel",
    type: "hotel",
    country: "Kenya",
    lat: -1.2833,
    lng: 36.8233,
    description: "Historic luxury hotel in Nairobi's CBD."
  },
  {
    id: "ke-westgate-mall",
    name: "Westgate Shopping Mall",
    type: "mall",
    country: "Kenya",
    lat: -1.2596,
    lng: 36.8063,
    description: "Modern shopping center in Nairobi."
  },
  {
    id: "ke-tsavo-restaurant",
    name: "Carnivore Restaurant",
    type: "restaurant",
    country: "Kenya",
    lat: -1.3380,
    lng: 36.8430,
    description: "Famous for Kenyan-style barbecue featuring various game meats.",
    culturalSignificance: "Iconic Nairobi dining experience showcasing traditional nyama choma culture"
  },
  
  // === ETHIOPIA ===
  {
    id: "et-addis-city",
    name: "Addis Ababa",
    type: "major-city",
    country: "Ethiopia",
    lat: 9.0320,
    lng: 38.7469,
    description: "Africa's diplomatic capital, seat of the African Union, known for coffee culture and ancient Orthodox Christianity.",
    localCulture: {
      traditions: ["Ethiopian Orthodox Christianity", "Coffee ceremonies", "Timkat celebrations"],
      languages: ["Amharic", "Oromo", "Tigrinya", "English"],
      cuisine: ["Injera and wat", "Kitfo", "Doro wat", "Ethiopian coffee"],
      festivals: ["Timkat (Epiphany)", "Meskel (Finding of True Cross)", "Irreecha Festival"]
    }
  },
  {
    id: "et-national-museum",
    name: "National Museum of Ethiopia",
    type: "museum",
    country: "Ethiopia",
    lat: 9.0308,
    lng: 38.7586,
    description: "Home to 'Lucy', the 3.2 million-year-old hominid fossil.",
    artAndArtists: {
      collections: ["Ancient Ethiopian artifacts", "Royal regalia", "Religious manuscripts", "Contemporary Ethiopian art"],
      notableArtists: ["Afewerk Tekle", "Gebre Kristos Desta", "Skunder Boghossian"],
      africanArtFocus: "Preserves Ethiopia's ancient artistic traditions including illuminated manuscripts, Orthodox Christian iconography, crosses, and crowns. Showcases 3.2 million years of human evolution discovered in Ethiopia."
    }
  },
  {
    id: "et-lalibela",
    name: "Lalibela Rock-Hewn Churches",
    type: "tourist-attraction",
    country: "Ethiopia",
    lat: 12.0317,
    lng: 39.0458,
    description: "UNESCO World Heritage 12th-century churches carved from solid rock.",
    culturalSignificance: "Living pilgrimage site for Ethiopian Orthodox Christians, architectural marvel"
  },
  {
    id: "et-sheraton-hotel",
    name: "Sheraton Addis",
    type: "hotel",
    country: "Ethiopia",
    lat: 9.0192,
    lng: 38.7642,
    description: "Luxury hotel in Addis Ababa with traditional Ethiopian hospitality."
  },
  {
    id: "et-edna-mall",
    name: "Edna Mall",
    type: "mall",
    country: "Ethiopia",
    lat: 9.0192,
    lng: 38.8010,
    description: "Modern shopping mall in Addis Ababa."
  },
  {
    id: "et-yod-restaurant",
    name: "Yod Abyssinia",
    type: "restaurant",
    country: "Ethiopia",
    lat: 9.0300,
    lng: 38.7467,
    description: "Traditional Ethiopian restaurant featuring cultural dance performances.",
    culturalSignificance: "Showcases Ethiopian coffee ceremony and traditional music"
  },
  
  // === EGYPT ===
  {
    id: "eg-cairo-city",
    name: "Cairo",
    type: "major-city",
    country: "Egypt",
    lat: 30.0444,
    lng: 31.2357,
    description: "The largest city in the Arab world, gateway to ancient pyramids and pharaonic civilization.",
    localCulture: {
      traditions: ["Islamic architecture", "Belly dancing", "Sufi whirling"],
      languages: ["Egyptian Arabic", "Arabic", "English", "French"],
      cuisine: ["Koshari", "Ful medames", "Ta'meya (falafel)", "Mahshi"],
      festivals: ["Ramadan celebrations", "Coptic Christmas", "Sham El-Nessim"]
    }
  },
  {
    id: "eg-egyptian-museum",
    name: "Egyptian Museum",
    type: "museum",
    country: "Egypt",
    lat: 30.0478,
    lng: 31.2336,
    description: "World's largest collection of ancient Egyptian artifacts.",
    artAndArtists: {
      collections: ["Tutankhamun treasures", "Royal mummies", "Papyrus texts", "Ancient sculptures"],
      notableArtists: ["Mahmoud Mukhtar", "Seif Wanly", "Gazbia Sirry"],
      africanArtFocus: "Preserves 5,000 years of African civilization including pharaonic art, Nubian artifacts, and African influences in ancient Egyptian culture. Over 120,000 artifacts from African antiquity."
    }
  },
  {
    id: "eg-pyramids-giza",
    name: "Pyramids of Giza",
    type: "tourist-attraction",
    country: "Egypt",
    lat: 29.9792,
    lng: 31.1342,
    description: "Last surviving Wonder of the Ancient World.",
    culturalSignificance: "Symbol of ancient African engineering and astronomical knowledge"
  },
  {
    id: "eg-mena-hotel",
    name: "Mena House Hotel",
    type: "hotel",
    country: "Egypt",
    lat: 29.9883,
    lng: 31.1283,
    description: "Historic luxury hotel with views of the pyramids."
  },
  {
    id: "eg-mall-egypt",
    name: "Mall of Egypt",
    type: "mall",
    country: "Egypt",
    lat: 29.9986,
    lng: 31.0187,
    description: "One of Africa's largest shopping malls."
  },
  {
    id: "eg-abou-shakra",
    name: "Abou Shakra",
    type: "restaurant",
    country: "Egypt",
    lat: 30.0258,
    lng: 31.2097,
    description: "Famous for traditional Egyptian grilled meats and mezze.",
    culturalSignificance: "Historic restaurant chain serving authentic Egyptian cuisine since 1947"
  },
  
  // === SOUTH AFRICA ===
  {
    id: "za-cape-town-city",
    name: "Cape Town",
    type: "major-city",
    country: "South Africa",
    lat: -33.9249,
    lng: 18.4241,
    description: "Legislative capital, known for Table Mountain, diverse cultures, and vibrant arts scene.",
    localCulture: {
      traditions: ["Kaapse Klopse carnival", "Cape Malay culture", "Township jazz"],
      languages: ["English", "Afrikaans", "Xhosa", "Zulu"],
      cuisine: ["Bobotie", "Bunny chow", "Boerewors", "Cape Malay curry"],
      festivals: ["Cape Town Jazz Festival", "Kaapse Klopse (Minstrel Carnival)", "Hermanus Whale Festival"]
    }
  },
  {
    id: "za-apartheid-museum",
    name: "Apartheid Museum",
    type: "museum",
    country: "South Africa",
    lat: -26.2353,
    lng: 27.9887,
    description: "Chronicles the rise and fall of apartheid in South Africa.",
    artAndArtists: {
      collections: ["Apartheid-era artifacts", "Resistance art", "Political posters", "Photographic documentation"],
      notableArtists: ["William Kentridge", "Jane Alexander", "Sue Williamson", "Marlene Dumas"],
      africanArtFocus: "Documents African resistance to colonialism and apartheid through art, photography, and multimedia. Features protest art, township photography, and contemporary works addressing post-apartheid transformation."
    }
  },
  {
    id: "za-kruger-park",
    name: "Kruger National Park",
    type: "tourist-attraction",
    country: "South Africa",
    lat: -23.9884,
    lng: 31.5547,
    description: "One of Africa's largest game reserves with incredible biodiversity.",
    culturalSignificance: "Traditional land of Tsonga and Northern Sotho peoples"
  },
  {
    id: "za-mount-nelson",
    name: "Belmond Mount Nelson Hotel",
    type: "hotel",
    country: "South Africa",
    lat: -33.9350,
    lng: 18.4108,
    description: "Iconic pink luxury hotel in Cape Town."
  },
  {
    id: "za-v-and-a-waterfront",
    name: "V&A Waterfront",
    type: "mall",
    country: "South Africa",
    lat: -33.9026,
    lng: 18.4192,
    description: "Luxury shopping and entertainment complex at Cape Town harbor."
  },
  {
    id: "za-gold-reef-city",
    name: "Gold Reef City",
    type: "tourist-attraction",
    country: "South Africa",
    lat: -26.2356,
    lng: 28.0089,
    description: "Theme park built on former gold mine, showcasing Johannesburg's mining history.",
    culturalSignificance: "Educational attraction about gold mining heritage"
  },
  {
    id: "za-kimberley-mine",
    name: "Kimberley Diamond Mines",
    type: "natural-resource",
    country: "South Africa",
    lat: -28.7282,
    lng: 24.7499,
    description: "Historic diamond mining area, site of the Big Hole.",
    resourceInfo: {
      resourceType: "Diamond",
      productionVolume: "7.2 million carats per year (South Africa total, 2023)",
      exportDestinations: ["United Arab Emirates", "Hong Kong", "Belgium", "India", "United States"],
      corporateOwnership: ["De Beers (Anglo American)", "Petra Diamonds", "Various smaller companies"],
      localBenefit: "Mining towns like Kimberley face economic decline as mines close. Limited black ownership despite BEE policies.",
      workingConditions: {
        description: "Mix of large-scale mining and artisanal operations",
        issues: [
          "Silicosis and tuberculosis among miners",
          "Dangerous underground working conditions",
          "Migrant labor system separates families",
          "Post-apartheid: slow transformation of ownership",
          "Mine closures leave communities without economic alternatives"
        ],
        reforms: [
          "Mining Charter requires black ownership participation",
          "Community development trusts",
          "Healthcare programs for miners with occupational diseases"
        ]
      },
      colonialLegacy: "1867 diamond discovery led to rush that transformed South Africa. Cecil Rhodes' De Beers monopoly was built on exploited African labor. Apartheid mining laws restricted African workers to dangerous low-wage positions."
    }
  },
  
  // === TANZANIA ===
  {
    id: "tz-dar-city",
    name: "Dar es Salaam",
    type: "major-city",
    country: "Tanzania",
    lat: -6.7924,
    lng: 39.2083,
    description: "Largest city and commercial capital, blending Swahili, Arab, and Indian influences.",
    localCulture: {
      traditions: ["Swahili poetry", "Taarab music", "Mwaka Kogwa festival"],
      languages: ["Swahili", "English", "Arabic", "Local languages"],
      cuisine: ["Ugali and fish", "Nyama choma", "Pilau", "Zanzibar pizza"],
      festivals: ["Sauti za Busara music festival", "Zanzibar International Film Festival", "Mwaka Kogwa New Year"]
    }
  },
  {
    id: "tz-national-museum",
    name: "National Museum of Tanzania",
    type: "museum",
    country: "Tanzania",
    lat: -6.8103,
    lng: 39.2800,
    description: "Showcases Tanzanian history from prehistory to present.",
    artAndArtists: {
      collections: ["Olduvai Gorge fossils", "Makonde carvings", "Swahili artifacts", "Contemporary Tanzanian art"],
      notableArtists: ["George Lilanga", "Augustino Malaba", "John Kilaka"],
      africanArtFocus: "Features human evolution discoveries from Olduvai Gorge, Makonde ebony sculptures, Tingatinga paintings, and Swahili coastal arts. Celebrates Tanzania's role as cradle of humanity."
    }
  },
  {
    id: "tz-serengeti",
    name: "Serengeti National Park",
    type: "tourist-attraction",
    country: "Tanzania",
    lat: -2.3333,
    lng: 34.8333,
    description: "UNESCO World Heritage site famous for annual wildebeest migration.",
    culturalSignificance: "Maasai ancestral lands, one of Africa's most important ecosystems"
  },
  {
    id: "tz-hyatt-regency",
    name: "Hyatt Regency Dar es Salaam",
    type: "hotel",
    country: "Tanzania",
    lat: -6.8083,
    lng: 39.2808,
    description: "Waterfront luxury hotel with Swahili-inspired design."
  },
  {
    id: "tz-mlimani-city",
    name: "Mlimani City",
    type: "mall",
    country: "Tanzania",
    lat: -6.7732,
    lng: 39.2469,
    description: "Major shopping mall in Dar es Salaam."
  },
  {
    id: "tz-manyara-mine",
    name: "Lake Manyara Tanzanite Mine",
    type: "natural-resource",
    country: "Tanzania",
    lat: -3.4833,
    lng: 36.2667,
    description: "Only source of tanzanite gemstones in the world, found exclusively in Tanzania.",
    resourceInfo: {
      resourceType: "Diamond", // Using Diamond as closest category
      productionVolume: "Limited annual production (tanzanite, not diamonds)",
      exportDestinations: ["India", "United States", "Thailand", "Hong Kong"],
      corporateOwnership: ["TanzaniteOne", "Small-scale miners", "Government stake"],
      localBenefit: "Government wall built around mines to prevent smuggling. Some benefit to small-scale miners, but much wealth leaves country.",
      workingConditions: {
        description: "Mix of large-scale and artisanal mining",
        issues: [
          "Artisanal miners work in dangerous unregulated shafts",
          "Child labor in some small-scale operations",
          "Mine collapses and flooding risks",
          "Price manipulation by international gem dealers",
          "Smuggling reduces government revenue"
        ],
        reforms: [
          "Government built wall around mining area (2018)",
          "Increased government stake in large operations",
          "Efforts to formalize artisanal mining",
          "TanzaniteOne promotes ethical sourcing"
        ]
      },
      colonialLegacy: "Discovered in 1967 after independence, but international gemstone market controlled by Western companies. Tanzania seeks to maximize domestic value addition and prevent undervaluation."
    }
  },
  
  // === DRC ===
  {
    id: "cd-kinshasa-city",
    name: "Kinshasa",
    type: "major-city",
    country: "DRC",
    lat: -4.4419,
    lng: 15.2663,
    description: "Capital and largest Francophone city in Africa, known for vibrant music scene and Lingala culture.",
    localCulture: {
      traditions: ["Soukous music", "Rumba dancing", "Sapeur fashion"],
      languages: ["French", "Lingala", "Kikongo", "Tshiluba", "Swahili"],
      cuisine: ["Fufu and pondu", "Moambe chicken", "Liboke", "Chikwangue"],
      festivals: ["Kinshasa Music Festival", "FESPAM (Pan-African Music Festival)", "DRC Independence celebrations"]
    }
  },
  {
    id: "cd-national-museum",
    name: "National Museum of the Democratic Republic of Congo",
    type: "museum",
    country: "DRC",
    lat: -4.3276,
    lng: 15.3136,
    description: "Showcases Congolese art and culture.",
    artAndArtists: {
      collections: ["Kongo power figures (nkisi)", "Kuba raffia textiles", "Songye masks", "Contemporary Congolese art"],
      notableArtists: ["Chéri Samba", "Bodys Isek Kingelez", "Moke", "Tshibumba Kanda-Matulu"],
      africanArtFocus: "World-renowned collection of Central African art including Kongo sculptures, Kuba royal arts, Luba stools, and Pende masks. Many DRC artworks remain in European museums due to colonial looting."
    }
  },
  {
    id: "cd-virunga-park",
    name: "Virunga National Park",
    type: "tourist-attraction",
    country: "DRC",
    lat: -0.9167,
    lng: 29.4167,
    description: "Africa's oldest national park, home to endangered mountain gorillas.",
    culturalSignificance: "UNESCO World Heritage site, conservation despite ongoing conflict"
  },
  {
    id: "cd-fleuve-hotel",
    name: "Fleuve Congo Hotel",
    type: "hotel",
    country: "DRC",
    lat: -4.3220,
    lng: 15.3060,
    description: "Riverside hotel in Kinshasa overlooking the Congo River."
  },
  {
    id: "cd-city-market",
    name: "City Market Kinshasa",
    type: "mall",
    country: "DRC",
    lat: -4.3100,
    lng: 15.2900,
    description: "Modern shopping center in Kinshasa."
  },
  {
    id: "cd-kolwezi-cobalt",
    name: "Kolwezi Cobalt Mines",
    type: "natural-resource",
    country: "DRC",
    lat: -10.7167,
    lng: 25.4667,
    description: "Heart of global cobalt production, essential for electric vehicle batteries.",
    resourceInfo: {
      resourceType: "Cobalt",
      productionVolume: "130,000 tonnes per year (70% of world supply, 2023)",
      exportDestinations: ["China (80%+)", "Finland", "Belgium", "Canada"],
      corporateOwnership: ["Glencore", "China Molybdenum", "Zijin Mining", "Ivanhoe Mines", "Various Chinese companies"],
      localBenefit: "Minimal. DRC has 60% of world's cobalt but sees little economic benefit. Chinese companies control supply chain.",
      workingConditions: {
        description: "Industrial mines and dangerous artisanal mining (creuseurs)",
        issues: [
          "Artisanal miners including children work in hand-dug pits",
          "Tunnel collapses kill dozens each year",
          "No safety equipment or health monitoring",
          "Wages as low as $1-2 per day for artisanal miners",
          "Toxic cobalt dust causes respiratory disease",
          "Sexual exploitation in mining areas",
          "Chinese companies accused of neo-colonial extraction"
        ],
        reforms: [
          "Child labor certification programs (limited success)",
          "Cooperative artisanal mining initiatives",
          "Government attempts to increase revenue share",
          "International pressure for ethical sourcing (limited impact)"
        ]
      },
      colonialLegacy: "Belgian colonial mining company Union Minière (now merged with Glencore) established extractive system. Today's exploitation echoes King Leopold II's brutal rubber trade. Chinese involvement called 'new colonialism.'"
    }
  },
  
  // === MOROCCO ===
  {
    id: "ma-marrakech-city",
    name: "Marrakech",
    type: "major-city",
    country: "Morocco",
    lat: 31.6295,
    lng: -7.9811,
    description: "Imperial city known for vibrant souks, gardens, and historic medina.",
    localCulture: {
      traditions: ["Berber culture", "Islamic architecture", "Henna art", "Gnawa music"],
      languages: ["Moroccan Arabic", "Berber (Tamazight)", "French"],
      cuisine: ["Tagine", "Couscous", "Pastilla", "Moroccan mint tea"],
      festivals: ["Marrakech Film Festival", "Gnaoua World Music Festival", "Rose Festival"]
    }
  },
  {
    id: "ma-museum-marrakech",
    name: "Museum of Marrakech",
    type: "museum",
    country: "Morocco",
    lat: 31.6295,
    lng: -7.9811,
    description: "Housed in historic palace, featuring Moroccan art and artifacts.",
    artAndArtists: {
      collections: ["Berber jewelry", "Islamic calligraphy", "Traditional textiles", "Moroccan ceramics"],
      notableArtists: ["Mohamed Melehi", "Farid Belkahia", "Ahmed Cherkaoui"],
      africanArtFocus: "Celebrates North African Islamic art, Berber crafts, and contemporary Moroccan artists. Features traditional zellige tilework, woodcarving, and leather working techniques passed down through generations."
    }
  },
  {
    id: "ma-medina-marrakech",
    name: "Jemaa el-Fnaa",
    type: "tourist-attraction",
    country: "Morocco",
    lat: 31.6258,
    lng: -7.9894,
    description: "UNESCO World Heritage market square with storytellers, musicians, and food stalls.",
    culturalSignificance: "Heart of Marrakech's cultural life for nearly 1000 years"
  },
  {
    id: "ma-mamounia-hotel",
    name: "La Mamounia",
    type: "hotel",
    country: "Morocco",
    lat: 31.6211,
    lng: -8.0050,
    description: "Legendary luxury hotel with gardens and traditional Moroccan design."
  },
  {
    id: "ma-morocco-mall",
    name: "Morocco Mall Casablanca",
    type: "mall",
    country: "Morocco",
    lat: 33.5394,
    lng: -7.6698,
    description: "One of Africa's largest shopping malls."
  },
  
  // === SENEGAL ===
  {
    id: "sn-dakar-city",
    name: "Dakar",
    type: "major-city",
    country: "Senegal",
    lat: 14.7167,
    lng: -17.4677,
    description: "Vibrant capital known for music, art, and Teranga hospitality.",
    localCulture: {
      traditions: ["Wolof culture", "Teranga hospitality", "Sabar drumming", "Wrestling (Lamb)"],
      languages: ["Wolof", "French", "Pulaar", "Serer"],
      cuisine: ["Thieboudienne (national dish)", "Yassa", "Mafé", "Bissap juice"],
      festivals: ["Dakar Biennale", "Saint Louis Jazz Festival", "Abéné Festivalo"]
    }
  },
  {
    id: "sn-ifan-museum",
    name: "IFAN Museum of African Arts",
    type: "museum",
    country: "Senegal",
    lat: 14.6728,
    lng: -17.4464,
    description: "Premier museum of West African art and culture.",
    artAndArtists: {
      collections: ["West African masks", "Traditional textiles", "Musical instruments", "Senegambian artifacts"],
      notableArtists: ["Ousmane Sow", "Issa Samb", "El Hadji Sy"],
      africanArtFocus: "Extensive collection of West African arts including masks, sculptures, textiles, and musical instruments from Senegal and across the region. Promotes understanding of African artistic heritage."
    }
  },
  {
    id: "sn-goree-island",
    name: "Gorée Island",
    type: "tourist-attraction",
    country: "Senegal",
    lat: 14.6667,
    lng: -17.4000,
    description: "UNESCO World Heritage site, former slave trading post.",
    culturalSignificance: "Symbol of African diaspora, pilgrimage site for descendants of enslaved Africans"
  },
  {
    id: "sn-radisson-hotel",
    name: "Radisson Blu Hotel Dakar",
    type: "hotel",
    country: "Senegal",
    lat: 14.7319,
    lng: -17.4572,
    description: "Beachfront hotel showcasing Senegalese hospitality."
  },
  {
    id: "sn-sea-plaza",
    name: "Sea Plaza Dakar",
    type: "mall",
    country: "Senegal",
    lat: 14.7150,
    lng: -17.4650,
    description: "Modern waterfront shopping center."
  },
  {
    id: "sn-lompoul-restaurant",
    name: "Chez Loutcha",
    type: "restaurant",
    country: "Senegal",
    lat: 14.7200,
    lng: -17.4600,
    description: "Traditional Senegalese restaurant known for thieboudienne and mafé.",
    culturalSignificance: "Family-owned restaurant preserving Senegalese culinary traditions"
  }
];

// Helper function to get country info
export function getCountryInfo(countryName: string): CountryInfo | undefined {
  return COUNTRIES[countryName];
}

// Helper function to get POIs by country
export function getPOIsByCountry(countryName: string): PointOfInterest[] {
  return POINTS_OF_INTEREST.filter(poi => poi.country === countryName);
}

// Helper function to get POIs by type
export function getPOIsByType(type: POIType): PointOfInterest[] {
  return POINTS_OF_INTEREST.filter(poi => poi.type === type);
}

// Helper function to get all country names
export function getAllCountries(): string[] {
  return Object.keys(COUNTRIES);
}

// Helper function to calculate local time for a country
export function getLocalTime(timezone: string): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  } catch (error) {
    return "Time unavailable";
  }
}
