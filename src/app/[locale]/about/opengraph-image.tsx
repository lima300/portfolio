import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.aboutPage.title,
  title: messages.aboutPage.heading,
  description: messages.aboutPage.description,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
