export type Background = "nepo" | "lapo";

export type TraitId =
  | "hustler"
  | "tech_bro"
  | "street_smart"
  | "charismatic"
  | "brave"
  | "creative"
  | "bookworm"
  | "fitness_freak";

export type SkillId =
  | "fitness"
  | "charisma"
  | "technology"
  | "cooking"
  | "driving"
  | "streetCred";

export interface Character {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  skinTone: string;
  hair: string;
  outfit: string;
  background: Background;
  traits: TraitId[];
  skills: Record<SkillId, number>;
  money: number;
  district: "Yaba" | "Surulere" | "Ikeja" | "Mushin";
}

export const defaultCharacter: Character = {
  name: "Goodness",
  age: 20,
  gender: "male",
  skinTone: "deep",
  hair: "low-cut",
  outfit: "street",
  background: "lapo",
  traits: ["hustler", "street_smart"],
  skills: {
    fitness: 45,
    charisma: 40,
    technology: 35,
    cooking: 30,
    driving: 25,
    streetCred: 50,
  },
  money: 15000,
  district: "Yaba",
};

export const traitOptions: { id: TraitId; name: string; description: string }[] = [
  { id: "hustler", name: "Hustler", description: "Finds opportunities when money is tight." },
  { id: "tech_bro", name: "Tech Bro", description: "Learns technology faster and loves startups." },
  { id: "street_smart", name: "Street Smart", description: "Handles risky situations and local connections better." },
  { id: "charismatic", name: "Charismatic", description: "Builds relationships and influence quickly." },
  { id: "brave", name: "Brave", description: "Keeps calm when situations become difficult." },
  { id: "creative", name: "Creative", description: "Excels at content, fashion, music and design." },
  { id: "bookworm", name: "Bookworm", description: "Gains knowledge and technology skill efficiently." },
  { id: "fitness_freak", name: "Fitness Freak", description: "Builds fitness and stamina faster." },
];

export const backgroundData = {
  nepo: {
    name: "Nepo",
    description: "You start with connections, comfort and expectations.",
    money: 150000,
    home: "Serviced Apartment",
    reputation: 25,
  },
  lapo: {
    name: "Lapo",
    description: "You start with little, but every opportunity can change your story.",
    money: 15000,
    home: "Small Room",
    reputation: 8,
  },
} as const;
