import { AfricanCountry } from "./wikidata-provider";
import { PointOfInterest } from "./expanded-africa-legend";

export const FALLBACK_COUNTRIES: AfricanCountry[] = [
  {
    name: "Egypt",
    wikidataId: "Q79",
    description: "Country in North Africa",
    capital: { name: "Cairo", lat: 30.0444, lng: 31.2357, description: "Capital of Egypt", wikidataId: "Q85" },
    center: { lat: 26.8206, lng: 30.8025 }
  },
  {
    name: "South Africa",
    wikidataId: "Q258",
    description: "Country in Southern Africa",
    capital: { name: "Pretoria", lat: -25.7479, lng: 28.2293, description: "Administrative capital", wikidataId: "Q3926" },
    center: { lat: -30.5595, lng: 22.9375 }
  },
  {
    name: "Nigeria",
    wikidataId: "Q1033",
    description: "Country in West Africa",
    capital: { name: "Abuja", lat: 9.0765, lng: 7.3986, description: "Capital of Nigeria", wikidataId: "Q3787" },
    center: { lat: 9.0820, lng: 8.6753 }
  },
  {
    name: "Kenya",
    wikidataId: "Q114",
    description: "Country in East Africa",
    capital: { name: "Nairobi", lat: -1.2921, lng: 36.8219, description: "Capital of Kenya", wikidataId: "Q3870" },
    center: { lat: -0.0236, lng: 37.9062 }
  },
  {
    name: "Morocco",
    wikidataId: "Q1028",
    description: "Country in North Africa",
    capital: { name: "Rabat", lat: 34.0209, lng: -6.8416, description: "Capital of Morocco", wikidataId: "Q3551" },
    center: { lat: 31.7917, lng: -7.0926 }
  },
  {
    name: "Ethiopia",
    wikidataId: "Q115",
    description: "Country in East Africa",
    capital: { name: "Addis Ababa", lat: 9.0320, lng: 38.7469, description: "Capital of Ethiopia", wikidataId: "Q3624" },
    center: { lat: 9.1450, lng: 40.4897 }
  },
  {
    name: "Ghana",
    wikidataId: "Q117",
    description: "Country in West Africa",
    capital: { name: "Accra", lat: 5.6037, lng: -0.1870, description: "Capital of Ghana", wikidataId: "Q3761" },
    center: { lat: 7.9465, lng: -1.0232 }
  },
  {
    name: "Tanzania",
    wikidataId: "Q924",
    description: "Country in East Africa",
    capital: { name: "Dodoma", lat: -6.1630, lng: 35.7516, description: "Capital of Tanzania", wikidataId: "Q3866" },
    center: { lat: -6.3690, lng: 34.8888 }
  },
  {
    name: "Uganda",
    wikidataId: "Q1036",
    description: "Country in East Africa",
    capital: { name: "Kampala", lat: 0.3476, lng: 32.5825, description: "Capital of Uganda", wikidataId: "Q3894" },
    center: { lat: 1.3733, lng: 32.2903 }
  },
  {
    name: "Algeria",
    wikidataId: "Q262",
    description: "Country in North Africa",
    capital: { name: "Algiers", lat: 36.7538, lng: 3.0588, description: "Capital of Algeria", wikidataId: "Q3561" },
    center: { lat: 28.0339, lng: 1.6596 }
  },
  {
    name: "Tunisia",
    wikidataId: "Q948",
    description: "Country in North Africa",
    capital: { name: "Tunis", lat: 36.8065, lng: 10.1815, description: "Capital of Tunisia", wikidataId: "Q3572" },
    center: { lat: 33.8869, lng: 9.5375 }
  },
  {
    name: "Senegal",
    wikidataId: "Q1041",
    description: "Country in West Africa",
    capital: { name: "Dakar", lat: 14.6928, lng: -17.4467, description: "Capital of Senegal", wikidataId: "Q3718" },
    center: { lat: 14.4974, lng: -14.4524 }
  },
  {
    name: "Ivory Coast",
    wikidataId: "Q1008",
    description: "Country in West Africa",
    capital: { name: "Yamoussoukro", lat: 6.8270, lng: -5.2893, description: "Political capital", wikidataId: "Q3852" },
    center: { lat: 7.5400, lng: -5.5471 }
  },
  {
    name: "Cameroon",
    wikidataId: "Q1009",
    description: "Country in Central Africa",
    capital: { name: "Yaoundé", lat: 3.8480, lng: 11.5021, description: "Capital of Cameroon", wikidataId: "Q3808" },
    center: { lat: 7.3697, lng: 12.3547 }
  },
  {
    name: "Zimbabwe",
    wikidataId: "Q954",
    description: "Country in Southern Africa",
    capital: { name: "Harare", lat: -17.8252, lng: 31.0335, description: "Capital of Zimbabwe", wikidataId: "Q3921" },
    center: { lat: -19.0154, lng: 29.1549 }
  },
  {
    name: "Rwanda",
    wikidataId: "Q1037",
    description: "Country in East Africa",
    capital: { name: "Kigali", lat: -1.9536, lng: 30.0606, description: "Capital of Rwanda", wikidataId: "Q3859" },
    center: { lat: -1.9403, lng: 29.8739 }
  },
  {
    name: "Botswana",
    wikidataId: "Q963",
    description: "Country in Southern Africa",
    capital: { name: "Gaborone", lat: -24.6282, lng: 25.9231, description: "Capital of Botswana", wikidataId: "Q3919" },
    center: { lat: -22.3285, lng: 24.6849 }
  },
  {
    name: "Namibia",
    wikidataId: "Q1030",
    description: "Country in Southern Africa",
    capital: { name: "Windhoek", lat: -22.5597, lng: 17.0832, description: "Capital of Namibia", wikidataId: "Q3935" },
    center: { lat: -22.9576, lng: 18.4904 }
  },
  {
    name: "Zambia",
    wikidataId: "Q953",
    description: "Country in Southern Africa",
    capital: { name: "Lusaka", lat: -15.3875, lng: 28.3228, description: "Capital of Zambia", wikidataId: "Q3881" },
    center: { lat: -13.1339, lng: 27.8493 }
  },
  {
    name: "Mozambique",
    wikidataId: "Q1029",
    description: "Country in Southern Africa",
    capital: { name: "Maputo", lat: -25.9655, lng: 32.5832, description: "Capital of Mozambique", wikidataId: "Q3889" },
    center: { lat: -18.6657, lng: 35.5296 }
  }
];

export const FALLBACK_POIS: PointOfInterest[] = [
  // EGYPT - 30 points
  { id: "eg-1", name: "Cairo", type: "major-city", country: "Egypt", lat: 30.0444, lng: 31.2357, description: "Capital city", wikidataId: "Q85" },
  { id: "eg-2", name: "Alexandria", type: "major-city", country: "Egypt", lat: 31.2001, lng: 29.9187, description: "Mediterranean port city" },
  { id: "eg-3", name: "Giza", type: "major-city", country: "Egypt", lat: 30.0131, lng: 31.2089, description: "Home to the pyramids" },
  { id: "eg-4", name: "Luxor", type: "major-city", country: "Egypt", lat: 25.6872, lng: 32.6396, description: "Ancient Thebes" },
  { id: "eg-5", name: "Aswan", type: "major-city", country: "Egypt", lat: 24.0889, lng: 32.8998, description: "Nubian city" },
  { id: "eg-6", name: "Great Pyramid of Giza", type: "monument", country: "Egypt", lat: 29.9792, lng: 31.1342, description: "Ancient wonder of the world", wikidataId: "Q37200" },
  { id: "eg-7", name: "Egyptian Museum", type: "museum", country: "Egypt", lat: 30.0478, lng: 31.2336, description: "Ancient Egyptian artifacts", wikidataId: "Q201219" },
  { id: "eg-8", name: "Sphinx", type: "monument", country: "Egypt", lat: 29.9753, lng: 31.1376, description: "Limestone statue" },
  { id: "eg-9", name: "Valley of the Kings", type: "historical-site", country: "Egypt", lat: 25.7402, lng: 32.6014, description: "Royal tombs" },
  { id: "eg-10", name: "Karnak Temple", type: "historical-site", country: "Egypt", lat: 25.7188, lng: 32.6573, description: "Temple complex" },
  { id: "eg-11", name: "Abu Simbel", type: "monument", country: "Egypt", lat: 22.3372, lng: 31.6258, description: "Rock temples" },
  { id: "eg-12", name: "Luxor Temple", type: "historical-site", country: "Egypt", lat: 25.6995, lng: 32.6391, description: "Ancient temple" },
  { id: "eg-13", name: "Philae Temple", type: "historical-site", country: "Egypt", lat: 24.0260, lng: 32.8844, description: "Island temple" },
  { id: "eg-14", name: "Khan el-Khalili", type: "market", country: "Egypt", lat: 30.0475, lng: 31.2627, description: "Historic bazaar" },
  { id: "eg-15", name: "Saqqara", type: "historical-site", country: "Egypt", lat: 29.8714, lng: 31.2169, description: "Step Pyramid complex" },
  { id: "eg-16", name: "Red Sea Riviera", type: "beach", country: "Egypt", lat: 27.2579, lng: 33.8116, description: "Resort coastline" },
  { id: "eg-17", name: "White Desert", type: "natural-resource", country: "Egypt", lat: 27.4167, lng: 28.1000, description: "Chalk formations" },
  { id: "eg-18", name: "Siwa Oasis", type: "natural-resource", country: "Egypt", lat: 29.2028, lng: 25.5194, description: "Desert oasis" },
  { id: "eg-19", name: "Dahab", type: "beach", country: "Egypt", lat: 28.5096, lng: 34.5130, description: "Red Sea resort" },
  { id: "eg-20", name: "Sharm el-Sheikh", type: "beach", country: "Egypt", lat: 27.9158, lng: 34.3300, description: "Diving resort" },
  
  // SOUTH AFRICA - 30 points
  { id: "za-1", name: "Cape Town", type: "major-city", country: "South Africa", lat: -33.9249, lng: 18.4241, description: "Legislative capital" },
  { id: "za-2", name: "Johannesburg", type: "major-city", country: "South Africa", lat: -26.2041, lng: 28.0473, description: "Largest city" },
  { id: "za-3", name: "Durban", type: "major-city", country: "South Africa", lat: -29.8587, lng: 31.0218, description: "Coastal city" },
  { id: "za-4", name: "Pretoria", type: "major-city", country: "South Africa", lat: -25.7479, lng: 28.2293, description: "Administrative capital" },
  { id: "za-5", name: "Port Elizabeth", type: "major-city", country: "South Africa", lat: -33.9608, lng: 25.6022, description: "Coastal city" },
  { id: "za-6", name: "Table Mountain", type: "natural-resource", country: "South Africa", lat: -33.9628, lng: 18.4098, description: "Iconic flat-topped mountain", wikidataId: "Q213360" },
  { id: "za-7", name: "Robben Island", type: "historical-site", country: "South Africa", lat: -33.8067, lng: 18.3675, description: "Historic prison island", wikidataId: "Q193521" },
  { id: "za-8", name: "Kruger National Park", type: "natural-resource", country: "South Africa", lat: -23.9884, lng: 31.5547, description: "Famous safari park" },
  { id: "za-9", name: "Garden Route", type: "natural-resource", country: "South Africa", lat: -34.0000, lng: 23.0000, description: "Scenic coastal drive" },
  { id: "za-10", name: "Victoria & Alfred Waterfront", type: "cultural-center", country: "South Africa", lat: -33.9033, lng: 18.4197, description: "Shopping district" },
  { id: "za-11", name: "Apartheid Museum", type: "museum", country: "South Africa", lat: -26.2354, lng: 27.9849, description: "History museum" },
  { id: "za-12", name: "Blyde River Canyon", type: "natural-resource", country: "South Africa", lat: -24.5500, lng: 30.8167, description: "Dramatic canyon" },
  { id: "za-13", name: "Drakensberg Mountains", type: "natural-resource", country: "South Africa", lat: -29.0000, lng: 29.2500, description: "Mountain range" },
  { id: "za-14", name: "Kgalagadi Transfrontier Park", type: "natural-resource", country: "South Africa", lat: -26.0000, lng: 20.5000, description: "Desert park" },
  { id: "za-15", name: "Soweto", type: "historical-site", country: "South Africa", lat: -26.2678, lng: 27.8585, description: "Historic township" },
  { id: "za-16", name: "Cradle of Humankind", type: "historical-site", country: "South Africa", lat: -25.9167, lng: 27.7667, description: "Fossil site" },
  { id: "za-17", name: "Tsitsikamma National Park", type: "natural-resource", country: "South Africa", lat: -34.0167, lng: 23.8833, description: "Coastal park" },
  { id: "za-18", name: "iSimangaliso Wetland Park", type: "natural-resource", country: "South Africa", lat: -28.0000, lng: 32.5500, description: "UNESCO site" },
  { id: "za-19", name: "Addo Elephant Park", type: "natural-resource", country: "South Africa", lat: -33.4517, lng: 25.7500, description: "Elephant sanctuary" },
  { id: "za-20", name: "Boulders Beach", type: "beach", country: "South Africa", lat: -34.1975, lng: 18.4506, description: "Penguin colony" },

  // NIGERIA - 25 points
  { id: "ng-1", name: "Lagos", type: "major-city", country: "Nigeria", lat: 6.5244, lng: 3.3792, description: "Largest city" },
  { id: "ng-2", name: "Abuja", type: "major-city", country: "Nigeria", lat: 9.0765, lng: 7.3986, description: "Capital city" },
  { id: "ng-3", name: "Kano", type: "major-city", country: "Nigeria", lat: 12.0022, lng: 8.5919, description: "Historic city" },
  { id: "ng-4", name: "Ibadan", type: "major-city", country: "Nigeria", lat: 7.3775, lng: 3.9470, description: "Largest city in West Africa" },
  { id: "ng-5", name: "Port Harcourt", type: "major-city", country: "Nigeria", lat: 4.8156, lng: 7.0498, description: "Oil city" },
  { id: "ng-6", name: "Calabar", type: "major-city", country: "Nigeria", lat: 4.9517, lng: 8.3417, description: "Coastal city" },
  { id: "ng-7", name: "Enugu", type: "major-city", country: "Nigeria", lat: 6.4403, lng: 7.4928, description: "Coal city" },
  { id: "ng-8", name: "Zuma Rock", type: "natural-resource", country: "Nigeria", lat: 9.1800, lng: 7.2100, description: "Monolith near Abuja" },
  { id: "ng-9", name: "Nike Art Gallery", type: "cultural-center", country: "Nigeria", lat: 6.4474, lng: 3.4700, description: "Art center in Lagos" },
  { id: "ng-10", name: "Yankari National Park", type: "natural-resource", country: "Nigeria", lat: 9.7500, lng: 10.5167, description: "Wildlife park" },
  { id: "ng-11", name: "Olumo Rock", type: "historical-site", country: "Nigeria", lat: 7.1539, lng: 3.3444, description: "Historic rock" },
  { id: "ng-12", name: "Lekki Beach", type: "beach", country: "Nigeria", lat: 6.4323, lng: 3.5451, description: "Lagos beach" },
  { id: "ng-13", name: "National Museum Lagos", type: "museum", country: "Nigeria", lat: 6.4482, lng: 3.3956, description: "National museum" },
  { id: "ng-14", name: "Osun-Osogbo Grove", type: "historical-site", country: "Nigeria", lat: 7.7500, lng: 4.5500, description: "Sacred forest" },
  { id: "ng-15", name: "Idanre Hills", type: "natural-resource", country: "Nigeria", lat: 7.1167, lng: 5.1167, description: "Ancient hills" },

  // KENYA - 25 points
  { id: "ke-1", name: "Nairobi", type: "major-city", country: "Kenya", lat: -1.2921, lng: 36.8219, description: "Capital city" },
  { id: "ke-2", name: "Mombasa", type: "major-city", country: "Kenya", lat: -4.0435, lng: 39.6682, description: "Coastal city" },
  { id: "ke-3", name: "Kisumu", type: "major-city", country: "Kenya", lat: -0.0917, lng: 34.7680, description: "Lake Victoria city" },
  { id: "ke-4", name: "Nakuru", type: "major-city", country: "Kenya", lat: -0.3031, lng: 36.0800, description: "Rift Valley city" },
  { id: "ke-5", name: "Eldoret", type: "major-city", country: "Kenya", lat: 0.5143, lng: 35.2698, description: "Highland city" },
  { id: "ke-6", name: "Maasai Mara", type: "natural-resource", country: "Kenya", lat: -1.5000, lng: 35.1667, description: "Game reserve" },
  { id: "ke-7", name: "Amboseli National Park", type: "natural-resource", country: "Kenya", lat: -2.6527, lng: 37.2606, description: "Elephant park" },
  { id: "ke-8", name: "Lake Nakuru", type: "natural-resource", country: "Kenya", lat: -0.3667, lng: 36.0833, description: "Flamingo lake" },
  { id: "ke-9", name: "Mount Kenya", type: "natural-resource", country: "Kenya", lat: -0.1521, lng: 37.3084, description: "Highest mountain" },
  { id: "ke-10", name: "Diani Beach", type: "beach", country: "Kenya", lat: -4.2943, lng: 39.5758, description: "White sand beach" },
  { id: "ke-11", name: "Nairobi National Museum", type: "museum", country: "Kenya", lat: -1.2768, lng: 36.8163, description: "National museum" },
  { id: "ke-12", name: "Fort Jesus", type: "historical-site", country: "Kenya", lat: -4.0622, lng: 39.6792, description: "Portuguese fort" },
  { id: "ke-13", name: "Tsavo National Park", type: "natural-resource", country: "Kenya", lat: -3.3000, lng: 38.5167, description: "Largest park" },
  { id: "ke-14", name: "Lamu Old Town", type: "historical-site", country: "Kenya", lat: -2.2717, lng: 40.9020, description: "Swahili town" },
  { id: "ke-15", name: "Hell's Gate", type: "natural-resource", country: "Kenya", lat: -0.9167, lng: 36.3167, description: "Geothermal park" },

  // MOROCCO - 25 points
  { id: "ma-1", name: "Marrakech", type: "major-city", country: "Morocco", lat: 31.6295, lng: -7.9811, description: "Red city" },
  { id: "ma-2", name: "Casablanca", type: "major-city", country: "Morocco", lat: 33.5731, lng: -7.5898, description: "Largest city" },
  { id: "ma-3", name: "Fez", type: "major-city", country: "Morocco", lat: 34.0181, lng: -5.0078, description: "Cultural capital" },
  { id: "ma-4", name: "Rabat", type: "major-city", country: "Morocco", lat: 34.0209, lng: -6.8416, description: "Capital city" },
  { id: "ma-5", name: "Tangier", type: "major-city", country: "Morocco", lat: 35.7595, lng: -5.8340, description: "Port city" },
  { id: "ma-6", name: "Chefchaouen", type: "major-city", country: "Morocco", lat: 35.1711, lng: -5.2636, description: "Blue city" },
  { id: "ma-7", name: "Essaouira", type: "major-city", country: "Morocco", lat: 31.5085, lng: -9.7595, description: "Coastal city" },
  { id: "ma-8", name: "Jemaa el-Fnaa", type: "market", country: "Morocco", lat: 31.6259, lng: -7.9893, description: "Famous square" },
  { id: "ma-9", name: "Hassan II Mosque", type: "monument", country: "Morocco", lat: 33.6084, lng: -7.6328, description: "Grand mosque" },
  { id: "ma-10", name: "Sahara Desert", type: "natural-resource", country: "Morocco", lat: 31.0000, lng: -7.0000, description: "Desert region" },
  { id: "ma-11", name: "Atlas Mountains", type: "natural-resource", country: "Morocco", lat: 31.0500, lng: -7.9200, description: "Mountain range" },
  { id: "ma-12", name: "Ait Benhaddou", type: "historical-site", country: "Morocco", lat: 31.0473, lng: -7.1325, description: "Fortified village" },
  { id: "ma-13", name: "Fez Medina", type: "historical-site", country: "Morocco", lat: 34.0627, lng: -4.9759, description: "Ancient medina" },
  { id: "ma-14", name: "Volubilis", type: "historical-site", country: "Morocco", lat: 34.0738, lng: -5.5544, description: "Roman ruins" },
  { id: "ma-15", name: "Todra Gorge", type: "natural-resource", country: "Morocco", lat: 31.5000, lng: -5.9833, description: "Canyon" },

  // ETHIOPIA - 20 points  
  { id: "et-1", name: "Addis Ababa", type: "major-city", country: "Ethiopia", lat: 9.0320, lng: 38.7469, description: "Capital city" },
  { id: "et-2", name: "Gondar", type: "major-city", country: "Ethiopia", lat: 12.6000, lng: 37.4667, description: "Historic city" },
  { id: "et-3", name: "Lalibela", type: "major-city", country: "Ethiopia", lat: 12.0333, lng: 39.0500, description: "Rock churches" },
  { id: "et-4", name: "Axum", type: "major-city", country: "Ethiopia", lat: 14.1333, lng: 38.7167, description: "Ancient city" },
  { id: "et-5", name: "Bahir Dar", type: "major-city", country: "Ethiopia", lat: 11.5933, lng: 37.3905, description: "Lake Tana city" },
  { id: "et-6", name: "Rock-Hewn Churches", type: "historical-site", country: "Ethiopia", lat: 12.0317, lng: 39.0414, description: "UNESCO site" },
  { id: "et-7", name: "Simien Mountains", type: "natural-resource", country: "Ethiopia", lat: 13.2500, lng: 38.0000, description: "Mountain park" },
  { id: "et-8", name: "Danakil Depression", type: "natural-resource", country: "Ethiopia", lat: 14.2417, lng: 40.3000, description: "Volcanic area" },
  { id: "et-9", name: "Lake Tana", type: "natural-resource", country: "Ethiopia", lat: 12.0000, lng: 37.3000, description: "Blue Nile source" },
  { id: "et-10", name: "Blue Nile Falls", type: "natural-resource", country: "Ethiopia", lat: 11.5000, lng: 37.6000, description: "Waterfall" },
  { id: "et-11", name: "Fasil Ghebbi", type: "historical-site", country: "Ethiopia", lat: 12.6092, lng: 37.4714, description: "Royal enclosure" },
  { id: "et-12", name: "National Museum", type: "museum", country: "Ethiopia", lat: 9.0333, lng: 38.7625, description: "Lucy fossil" },
  { id: "et-13", name: "Omo Valley", type: "cultural-center", country: "Ethiopia", lat: 5.5000, lng: 36.0000, description: "Tribal region" },
  { id: "et-14", name: "Harar", type: "historical-site", country: "Ethiopia", lat: 9.3100, lng: 42.1172, description: "Walled city" },

  // GHANA - 20 points
  { id: "gh-1", name: "Accra", type: "major-city", country: "Ghana", lat: 5.6037, lng: -0.1870, description: "Capital city" },
  { id: "gh-2", name: "Kumasi", type: "major-city", country: "Ghana", lat: 6.6885, lng: -1.6244, description: "Ashanti capital" },
  { id: "gh-3", name: "Cape Coast", type: "major-city", country: "Ghana", lat: 5.1053, lng: -1.2466, description: "Coastal city" },
  { id: "gh-4", name: "Tamale", type: "major-city", country: "Ghana", lat: 9.4034, lng: -0.8393, description: "Northern city" },
  { id: "gh-5", name: "Takoradi", type: "major-city", country: "Ghana", lat: 4.8845, lng: -1.7554, description: "Port city" },
  { id: "gh-6", name: "Cape Coast Castle", type: "historical-site", country: "Ghana", lat: 5.1050, lng: -1.2460, description: "Slave fort" },
  { id: "gh-7", name: "Elmina Castle", type: "historical-site", country: "Ghana", lat: 5.0833, lng: -1.3500, description: "Portuguese fort" },
  { id: "gh-8", name: "Kakum National Park", type: "natural-resource", country: "Ghana", lat: 5.3500, lng: -1.3667, description: "Rainforest canopy walk" },
  { id: "gh-9", name: "Mole National Park", type: "natural-resource", country: "Ghana", lat: 9.3167, lng: -1.8500, description: "Safari park" },
  { id: "gh-10", name: "Lake Volta", type: "natural-resource", country: "Ghana", lat: 7.0000, lng: 0.0000, description: "Largest reservoir" },
  { id: "gh-11", name: "Manhyia Palace Museum", type: "museum", country: "Ghana", lat: 6.6967, lng: -1.6239, description: "Ashanti palace" },
  { id: "gh-12", name: "Kwame Nkrumah Memorial", type: "monument", country: "Ghana", lat: 5.5522, lng: -0.2023, description: "Independence memorial" },
  { id: "gh-13", name: "Labadi Beach", type: "beach", country: "Ghana", lat: 5.5800, lng: -0.1500, description: "Popular beach" },
  { id: "gh-14", name: "Wli Waterfalls", type: "natural-resource", country: "Ghana", lat: 7.1333, lng: 0.5833, description: "Highest waterfall" },

  // TANZANIA - 20 points
  { id: "tz-1", name: "Dar es Salaam", type: "major-city", country: "Tanzania", lat: -6.7924, lng: 39.2083, description: "Largest city" },
  { id: "tz-2", name: "Dodoma", type: "major-city", country: "Tanzania", lat: -6.1630, lng: 35.7516, description: "Capital city" },
  { id: "tz-3", name: "Arusha", type: "major-city", country: "Tanzania", lat: -3.3869, lng: 36.6830, description: "Safari hub" },
  { id: "tz-4", name: "Mwanza", type: "major-city", country: "Tanzania", lat: -2.5164, lng: 32.9175, description: "Lake Victoria city" },
  { id: "tz-5", name: "Zanzibar City", type: "major-city", country: "Tanzania", lat: -6.1659, lng: 39.2026, description: "Stone Town" },
  { id: "tz-6", name: "Serengeti", type: "natural-resource", country: "Tanzania", lat: -2.3333, lng: 34.8333, description: "Famous safari park" },
  { id: "tz-7", name: "Mount Kilimanjaro", type: "natural-resource", country: "Tanzania", lat: -3.0674, lng: 37.3556, description: "Highest peak in Africa" },
  { id: "tz-8", name: "Ngorongoro Crater", type: "natural-resource", country: "Tanzania", lat: -3.1867, lng: 35.5844, description: "Volcanic caldera" },
  { id: "tz-9", name: "Zanzibar Beaches", type: "beach", country: "Tanzania", lat: -6.1000, lng: 39.3500, description: "Tropical beaches" },
  { id: "tz-10", name: "Stone Town", type: "historical-site", country: "Tanzania", lat: -6.1639, lng: 39.1920, description: "Historic quarter" },
  { id: "tz-11", name: "Tarangire National Park", type: "natural-resource", country: "Tanzania", lat: -3.8333, lng: 36.0000, description: "Elephant park" },
  { id: "tz-12", name: "Lake Manyara", type: "natural-resource", country: "Tanzania", lat: -3.5833, lng: 35.8167, description: "Alkaline lake" },
  { id: "tz-13", name: "Selous Game Reserve", type: "natural-resource", country: "Tanzania", lat: -8.5000, lng: 37.5000, description: "Wildlife reserve" },
  { id: "tz-14", name: "Olduvai Gorge", type: "historical-site", country: "Tanzania", lat: -2.9903, lng: 35.3558, description: "Cradle of mankind" },

  // UGANDA - 20 points
  { id: "ug-1", name: "Kampala", type: "major-city", country: "Uganda", lat: 0.3476, lng: 32.5825, description: "Capital city" },
  { id: "ug-2", name: "Entebbe", type: "major-city", country: "Uganda", lat: 0.0522, lng: 32.4637, description: "Airport city" },
  { id: "ug-3", name: "Jinja", type: "major-city", country: "Uganda", lat: 0.4244, lng: 33.2041, description: "Source of Nile" },
  { id: "ug-4", name: "Mbarara", type: "major-city", country: "Uganda", lat: -0.6000, lng: 30.6500, description: "Western city" },
  { id: "ug-5", name: "Gulu", type: "major-city", country: "Uganda", lat: 2.7667, lng: 32.3000, description: "Northern city" },
  { id: "ug-6", name: "Bwindi Impenetrable Forest", type: "natural-resource", country: "Uganda", lat: -1.0667, lng: 29.6500, description: "Gorilla sanctuary" },
  { id: "ug-7", name: "Murchison Falls", type: "natural-resource", country: "Uganda", lat: 2.2500, lng: 31.7333, description: "Waterfall" },
  { id: "ug-8", name: "Queen Elizabeth National Park", type: "natural-resource", country: "Uganda", lat: -0.3500, lng: 29.9500, description: "Wildlife park" },
  { id: "ug-9", name: "Lake Victoria", type: "natural-resource", country: "Uganda", lat: -1.0000, lng: 33.0000, description: "Largest lake" },
  { id: "ug-10", name: "Rwenzori Mountains", type: "natural-resource", country: "Uganda", lat: 0.3833, lng: 29.9167, description: "Mountains of the Moon" },
  { id: "ug-11", name: "Kasubi Tombs", type: "historical-site", country: "Uganda", lat: 0.3400, lng: 32.5533, description: "Royal burial grounds" },
  { id: "ug-12", name: "Uganda Museum", type: "museum", country: "Uganda", lat: 0.3208, lng: 32.5758, description: "National museum" },
  { id: "ug-13", name: "Sipi Falls", type: "natural-resource", country: "Uganda", lat: 1.3500, lng: 34.3500, description: "Mountain waterfalls" },
  { id: "ug-14", name: "Kibale Forest", type: "natural-resource", country: "Uganda", lat: 0.5667, lng: 30.4167, description: "Chimp sanctuary" },
];
