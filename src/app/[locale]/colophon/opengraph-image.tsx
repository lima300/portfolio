import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.colophon.eyebrow,
  title: messages.colophon.heading,
  description: messages.colophon.description,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
