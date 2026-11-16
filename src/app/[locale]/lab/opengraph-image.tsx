import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.lab.eyebrow,
  title: messages.lab.heading,
  description: messages.lab.intro,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
