import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.content.eyebrow,
  title: messages.content.heading,
  description: messages.contentPage.intro,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
