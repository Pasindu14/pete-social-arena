import { atom } from "jotai";

export const countAtom = atom(0);

export const incrementCount = atom(
  (get) => get(countAtom),
  (get, set, newValue: number) => set(countAtom, get(countAtom) + newValue)
);
