export type Character = {
  id: number;
  name: string;
  status: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  type: string;
  gender: string;
  image: string;
  url: string;
  created: string;
};

export interface SearchInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharacterResult {
  info: SearchInfo;
  results: Character[];
}

export type Location = {
  id: string;
  name: string;
  type: string;
  dimension: string;
  created: string;
};

export interface LocationResult {
  info: {
    count: number;
    pages: number;
    next: string;
  };
  results: Location[];
}

export type TTableColumn = {
  key: ETableKey;
  label: string;
};

export enum ETableKey {
  NAME = "name",
  AVATAR = "avatar",
  ORIGIN = "origin",
  GENDER = "gender",
  STATUS = "status",
}

export enum ECharacterStatus {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

export enum ESpecies {
  HUMAN = "Human",
  ROBOT = "Robot",
  UNKNOWN = "unknown",
  EMPTY = "Species",
}

export enum EErrorStatus {
  NOTFOUND = 404,
}
