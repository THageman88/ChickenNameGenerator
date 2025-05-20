export const Seasons = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
  'Monsoon',
  'Dry',
  'Harvest',
  'Festive',
  'Thaw',
] as const;
export type Season = typeof Seasons[number];

export const Weathers = [
  'Sunny',
  'Cloudy',
  'Heatwave',
  'Blizzard',
  'Rain',
  'Perfect',
  'Sublime',
  'Snowing',
  'Foggy',
  'Windy',
  'Thunderstorm',
  'Hail',
  'Drizzle',
] as const;
export type Weather = typeof Weathers[number];

export const TimesOfDay = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
  'Dawn',
  'Dusk',
  'Midday',
  'Twilight',
  'Midnight',
] as const;
export type TimeOfDay = typeof TimesOfDay[number];

export const Patterns = [
  'Solid',
  'Speckled',
  'Striped',
  'Mottled',
  'Barred',
  'Spotted',
  'Marbled',
  'Dotted',
  'Flecked',
  'Checkered',
] as const;
export type Pattern = typeof Patterns[number];

export const Colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
  'Pink',
  'Brown',
  'Grey',
  'Gold',
  'Turquoise',
] as const;
export type Color = typeof Colors[number];

export const Traits = [
  'Bold',
  'Shy',
  'Curious',
  'Sassy',
  'Friendly',
  'Timid',
  'Proud',
  'Energetic',
  'Quiet',
  'Playful',
  'Stubborn',
  'Clever',
] as const;
export type Trait = typeof Traits[number];

export const Treats = [
  'Corn',
  'Worm',
  'Berry',
  'Sunflower Seed',
  'Millet',
  'Worms',
  'Steak',
  'Apple',
  'Pumpkin',
  'Fish',
  'Cheese',
  'Rice',
] as const;
export type Treat = typeof Treats[number];
