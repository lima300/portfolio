import { ogImageRoute } from "@/lib/og/image";
const route = ogImageRoute((messages) => ({
  eyebrow: messages.resume.title,
  title: messages.resume.role,
  description: messages.resume.description,
}));

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
