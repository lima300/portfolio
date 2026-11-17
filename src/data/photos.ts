import type { StaticImageData } from "next/image";

import deskImage from "@/assets/photos/desk.jpg";
import portraitImage from "@/assets/photos/portrait.jpg";
import runningImage from "@/assets/photos/running.jpg";
import setupImage from "@/assets/photos/setup.jpg";
import travelImage from "@/assets/photos/travel.jpg";

import type { Localized } from "./types";

/**
 * Photographs of Otávio, and of the desk.
 *
 * Statically imported, so `next/image` knows each one's size before it loads
 * (no layout shift) and gets a blur placeholder for free. The sources under
 * `src/assets/photos` are already cropped to 4:5, resized and stripped of
 * EXIF — phone photos carry GPS coordinates, and those stay off the site.
 *
 * Alt text says what is in the frame, not what it is meant to suggest.
 */
export type Photo = {
  id: string;
  src: StaticImageData;
  alt: Localized;
  /** A short label under the photo. Leave out where the alt says it all. */
  caption?: Localized;
};

export const portrait: Photo = {
  id: "portrait",
  src: portraitImage,
  alt: {
    en: "Otávio Lima smiling, arms crossed, in a black T-shirt in front of his desk and monitors.",
    "pt-br":
      "Otávio Lima sorrindo, de braços cruzados, de camiseta preta em frente à mesa e aos monitores.",
  },
};

/** The about page's "away from the keyboard" row, in reading order. */
export const lifePhotos: readonly Photo[] = [
  {
    id: "running",
    src: runningImage,
    alt: {
      en: "Otávio mid-race on a sunny road, wearing a race bib and sunglasses, waving at the camera.",
      "pt-br":
        "Otávio no meio de uma corrida, numa estrada ensolarada, de número de peito e óculos escuros, acenando para a câmera.",
    },
    caption: { en: "Race day", "pt-br": "Dia de prova" },
  },
  {
    id: "desk",
    src: deskImage,
    alt: {
      en: "Otávio at his desk, photographed from above, smiling up at the camera in front of his monitor and laptop.",
      "pt-br":
        "Otávio na mesa de trabalho, fotografado de cima, sorrindo para a câmera em frente ao monitor e ao notebook.",
    },
    caption: {
      en: "Where the work happens",
      "pt-br": "Onde o trabalho acontece",
    },
  },
  {
    id: "travel",
    src: travelImage,
    alt: {
      en: "Otávio in a red jacket in front of a snow-capped mountain under a clear blue sky.",
      "pt-br":
        "Otávio de jaqueta vermelha em frente a uma montanha com neve, sob um céu azul.",
    },
    caption: { en: "Travelling when I can", "pt-br": "Viajando quando dá" },
  },
];

/** The /uses page's photo: the desk itself, nobody at it. */
export const setupPhoto: Photo = {
  id: "setup",
  src: setupImage,
  alt: {
    en: "The desk at night: an external monitor and a laptop on a stand, a second laptop closed beside them, a keyboard and mouse on a dark desk mat.",
    "pt-br":
      "A mesa à noite: um monitor externo e um notebook num suporte, um segundo notebook fechado ao lado, teclado e mouse sobre um desk mat escuro.",
  },
};
