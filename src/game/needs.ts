export type NeedId = "hunger" | "energy" | "hygiene" | "fun" | "social";

export type Needs = Record<NeedId, number>;

export const defaultNeeds: Needs = {
  hunger: 82,
  energy: 90,
  hygiene: 76,
  fun: 68,
  social: 62,
};

export const needLabels: Record<NeedId, string> = {
  hunger: "Hunger",
  energy: "Energy",
  hygiene: "Hygiene",
  fun: "Fun",
  social: "Social",
};

export function clampNeed(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
