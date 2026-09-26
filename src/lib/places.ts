import type { OpeningHours, Place } from "@/data/hmap-data";

const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
const UK_TIME_ZONE = "Europe/London";

const toMinutes = (value: string): number => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

const ukParts = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: UK_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value.toLowerCase().slice(0, 3);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const dayIndex = Math.max(0, DAY_NAMES.indexOf(weekday as (typeof DAY_NAMES)[number]));

  return { dayIndex, minutes: hour * 60 + minute };
};

export const isOpenAt = (hours: OpeningHours, date = new Date()): boolean => {
  const { dayIndex, minutes } = ukParts(date);
  const today = hours[DAY_NAMES[dayIndex]];
  const yesterday = hours[DAY_NAMES[(dayIndex + 6) % 7]];

  if (today) {
    const [open, close] = today.map(toMinutes);
    if (close > open && minutes >= open && minutes < close) return true;
    if (close <= open && minutes >= open) return true;
  }

  if (yesterday) {
    const [open, close] = yesterday.map(toMinutes);
    if (close <= open && minutes < close) return true;
  }

  return false;
};

export const distanceMiles = (from: { lat: number; lon: number }, to: { lat: number; lon: number }) => {
  const earthRadiusMiles = 3958.8;
  const latitudeDelta = ((to.lat - from.lat) * Math.PI) / 180;
  const longitudeDelta = ((to.lon - from.lon) * Math.PI) / 180;
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const sortPlacesByDistance = (places: Place[], origin?: { lat: number; lon: number }) => {
  if (!origin) return [...places];
  return [...places].sort((a, b) => distanceMiles(origin, a) - distanceMiles(origin, b));
};

export const getDirectionsUrl = (place: Place, origin?: { lat: number; lon: number }) => {
  const destination = encodeURIComponent(`${place.name}, ${place.address}, ${place.postcode}`);
  const start = origin ? `&origin=${origin.lat},${origin.lon}` : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}${start}`;
};

export const formatDistance = (miles: number) =>
  miles < 0.1 ? "less than 0.1 mi" : `${miles.toFixed(1)} mi`;
