import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.uses.eyebrow,
  title: messages.uses.heading,
  description: messages.uses.intro,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
