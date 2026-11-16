import { ogImageRoute } from "@/lib/og/image";

/** The home page's preview, and the fallback for any page without one. */
const route = ogImageRoute((messages) => ({
  eyebrow: messages.hero.availability,
  title: messages.hero.headline,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
