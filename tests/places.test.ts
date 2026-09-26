import { describe, expect, it } from "vitest";
import { everyDay } from "@/data/hmap-data";
import { distanceMiles, getDirectionsUrl, isOpenAt } from "@/lib/places";

describe("place helpers", () => {
  it("recognises a place open during the UK evening", () => {
    expect(isOpenAt(everyDay("16:00", "23:00"), new Date("2026-09-26T18:00:00.000Z"))).toBe(true);
  });

  it("handles opening hours that run after midnight", () => {
    expect(isOpenAt(everyDay("18:00", "01:00"), new Date("2026-09-26T23:30:00.000Z"))).toBe(true);
  });

  it("calculates a sensible distance", () => {
    expect(distanceMiles({ lat: 53.4808, lon: -2.2426 }, { lat: 53.4617, lon: -2.2283 })).toBeGreaterThan(1);
  });

  it("creates a directions link", () => {
    const url = getDirectionsUrl({ id: "x", name: "A&E", kind: "ae", address: "Oxford Road", postcode: "M13", lat: 53.46, lon: -2.22, hoursText: "24 hours", hours: everyDay("00:00", "23:59") });
    expect(url).toContain("google.com/maps/dir");
    expect(url).toContain("M13");
  });
});
