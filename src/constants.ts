import { ETableKey, TTableColumn } from "./type";
import Left from "./assets/left.svg";
import Right from "./assets/right.svg";

export const ServerURL = "https://rickandmortyapi.com/api/";
export const CharacterTableHeaders: TTableColumn[] = [
  { key: ETableKey.NAME, label: "Name" },
  { key: ETableKey.AVATAR, label: "Avatar" },
  { key: ETableKey.ORIGIN, label: "Origin" },
  { key: ETableKey.GENDER, label: "Gender" },
  { key: ETableKey.STATUS, label: "Status" },
];

export const images = {
  left: Left,
  right: Right,
};
