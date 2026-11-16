import type { Localized } from "./types";

/**
 * The desk, as Otávio listed it.
 *
 * Product names are written the way he gave them; `kind` is a plain
 * description of what each thing is, not a review of it. Nothing here says why
 * he chose an item until he has said so himself.
 *
 * TODO(otavio): the plan's /uses also covers software — editor, terminal,
 * fonts, browser extensions. Add a group when you have the list.
 */

export type UsesItem = {
  name: string;
  kind: Localized;
};

export type UsesGroup = {
  id: string;
  title: Localized;
  items: readonly UsesItem[];
};

export const usesGroups: readonly UsesGroup[] = [
  {
    id: "computer",
    title: { en: "Computer and screens", "pt-br": "Computador e telas" },
    items: [
      {
        name: 'MacBook Pro 16" (M5 Pro)',
        kind: { en: "Main machine", "pt-br": "Máquina principal" },
      },
      {
        name: "Lenovo ThinkVision T27h-30",
        kind: { en: "Second screen", "pt-br": "Segunda tela" },
      },
    ],
  },
  {
    id: "input",
    title: { en: "Keyboards and mouse", "pt-br": "Teclados e mouse" },
    items: [
      {
        name: "Keychron K2",
        kind: { en: "Mechanical keyboard", "pt-br": "Teclado mecânico" },
      },
      {
        name: "Logitech MX Keys S",
        kind: { en: "Keyboard", "pt-br": "Teclado" },
      },
      {
        name: "Logitech MX Master 3",
        kind: { en: "Mouse", "pt-br": "Mouse" },
      },
    ],
  },
  {
    id: "desk",
    title: { en: "Desk", "pt-br": "Mesa" },
    items: [
      {
        name: "Inpro Standard",
        kind: {
          en: "Sit-stand desk",
          "pt-br": "Mesa com regulagem de altura",
        },
      },
      {
        name: "Amazon Echo Show 5",
        kind: { en: "Smart display", "pt-br": "Smart display" },
      },
    ],
  },
] as const;
