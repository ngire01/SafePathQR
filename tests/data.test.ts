import { describe, expect, it } from "vitest";
import { HELPLINES, LAST_CHECKED, PLACES, SUPPORT_LINKS } from "@/data/hmap-data";

describe("HMAP data", () => {
  it("has a current check date", () => {
    expect(LAST_CHECKED).toMatch(/^20\d\d-\d\d-\d\d$/);
  });

  it("keeps identifiers unique", () => {
    for (const items of [HELPLINES, PLACES]) {
      const ids = items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("puts the emergency route first", () => {
    expect(HELPLINES[0].id).toBe("999");
    expect(HELPLINES[0].tel).toBe("999");
  });

  it("contains usable links and Manchester coordinates", () => {
    for (const item of [...HELPLINES, ...SUPPORT_LINKS]) {
      if (item.url) expect(item.url).toMatch(/^https:\/\//);
    }
    for (const place of PLACES) {
      expect(place.lat).toBeGreaterThan(53.2);
      expect(place.lat).toBeLessThan(53.7);
      expect(place.lon).toBeGreaterThan(-2.7);
      expect(place.lon).toBeLessThan(-1.9);
    }
  });
});
