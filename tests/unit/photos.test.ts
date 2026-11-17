import { describe, expect, it } from "vitest";

import { featuredPosts } from "@/data/content";
import { lifePhotos, portrait, setupPhoto } from "@/data/photos";
import { locales } from "@/i18n/config";

const photos = [portrait, setupPhoto, ...lifePhotos];

describe("photos", () => {
  it("describes every photo in every locale", () => {
    for (const photo of photos) {
      for (const locale of locales) {
        // Long enough to say what is in the frame, not just "photo".
        expect(
          photo.alt[locale].trim().length,
          `${photo.id} ${locale}`,
        ).toBeGreaterThan(20);
        if (photo.caption) {
          expect(
            photo.caption[locale].trim(),
            `${photo.id} ${locale}`,
          ).toBeTruthy();
        }
      }
    }
  });

  it("has unique ids", () => {
    const ids = photos.map((photo) => photo.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every favourite post a cover", () => {
    for (const post of featuredPosts) {
      expect(post.thumbnail, post.id).toBeTruthy();
    }
  });
});
