type StringOrNull = string | null;
type NumberOrNull = number | null;

type AmountType = {
  value: NumberOrNull;
  unit: string;
};

type MaltType = {
  name: string;
  amount: AmountType;
};

type HopsType = {
  name: string;
  amount: AmountType;
  add: string;
  attribute: string;
};

export default interface BeerInterface {
  id: number;
  name: string;
  tagline: StringOrNull;
  first_brewed: StringOrNull;
  description: string;
  image_url: StringOrNull;
  abv: NumberOrNull;
  ibu: NumberOrNull;
  target_fg: NumberOrNull;
  target_og: NumberOrNull;
  ebc: NumberOrNull;
  srm: NumberOrNull;
  ph: NumberOrNull;
  attenuation_level: NumberOrNull;
  volume: { value: NumberOrNull; unit: string };
  boil_volume: { value: NumberOrNull; unit: string };
  method: {
    mash_temp: [
      {
        temp: { value: NumberOrNull; unit: StringOrNull };
        duration: NumberOrNull;
      },
    ];
    fermentation: { temp: { value: NumberOrNull; unit: string } };
    twist: StringOrNull;
  };
  ingredients: {
    malt: MaltType[];
    hops: HopsType[];
    yeast: StringOrNull;
  };
  food_pairing: string[];
  brewers_tips: StringOrNull;
  contributed_by: string;
}
