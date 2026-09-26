export type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type OpeningHours = Partial<Record<Day, readonly [string, string]>>;

export type Helpline = {
  id: string;
  name: string;
  description: string;
  display: string;
  tel?: string;
  sms?: string;
  url?: string;
  availability: string;
  urgent?: boolean;
};

export type Place = {
  id: string;
  name: string;
  kind: "ae" | "crisis-cafe";
  address: string;
  postcode: string;
  lat: number;
  lon: number;
  phone?: string;
  website?: string;
  hoursText: string;
  hours: OpeningHours;
  note?: string;
};

export type SupportLink = {
  title: string;
  description: string;
  url: string;
};

const DAYS: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const everyDay = (open: string, close: string): OpeningHours =>
  Object.fromEntries(DAYS.map((day) => [day, [open, close] as const])) as OpeningHours;

export const LAST_CHECKED = "2026-09-26";

export const HELPLINES: Helpline[] = [
  {
    id: "999",
    name: "Emergency services",
    description: "If someone is in immediate danger, call 999 or go to A&E.",
    display: "999",
    tel: "999",
    availability: "24 hours",
    urgent: true,
  },
  {
    id: "nhs-111",
    name: "NHS 111",
    description: "Urgent mental-health support and advice. Ask for the mental-health option.",
    display: "111",
    tel: "111",
    url: "https://111.nhs.uk/",
    availability: "24 hours online and by phone",
    urgent: true,
  },
  {
    id: "samaritans",
    name: "Samaritans",
    description: "Talk to someone if you are struggling or need someone to listen.",
    display: "116 123",
    tel: "116123",
    url: "https://www.samaritans.org/how-we-can-help/contact-samaritan/",
    availability: "Free, 24 hours",
  },
  {
    id: "shout",
    name: "Shout",
    description: "Text SHOUT for free crisis support from a trained volunteer.",
    display: "Text SHOUT to 85258",
    sms: "85258",
    url: "https://giveusashout.org/",
    availability: "Free, 24 hours",
  },
];

export const PLACES: Place[] = [
  {
    id: "mri-ae",
    name: "Manchester Royal Infirmary A&E",
    kind: "ae",
    address: "Oxford Road, Manchester",
    postcode: "M13 9WL",
    lat: 53.4617,
    lon: -2.2283,
    hoursText: "Open 24 hours",
    hours: everyDay("00:00", "23:59"),
    website: "https://mft.nhs.uk/mri/",
    note: "For emergencies, call 999 rather than travelling alone.",
  },
  {
    id: "nmg-ae",
    name: "North Manchester General Hospital A&E",
    kind: "ae",
    address: "Delaunays Road, Crumpsall, Manchester",
    postcode: "M8 5RB",
    lat: 53.5155,
    lon: -2.2395,
    hoursText: "Open 24 hours",
    hours: everyDay("00:00", "23:59"),
    website: "https://mft.nhs.uk/nmgh/",
    note: "For emergencies, call 999 rather than travelling alone.",
  },
  {
    id: "wyth-ae",
    name: "Wythenshawe Hospital A&E",
    kind: "ae",
    address: "Southmoor Road, Wythenshawe, Manchester",
    postcode: "M23 9LT",
    lat: 53.3894,
    lon: -2.2927,
    hoursText: "Open 24 hours",
    hours: everyDay("00:00", "23:59"),
    website: "https://mft.nhs.uk/wythenshawe/",
    note: "For emergencies, call 999 rather than travelling alone.",
  },
  {
    id: "recovery-lounge",
    name: "Recovery Lounge",
    kind: "crisis-cafe",
    address: "Manchester city centre",
    postcode: "M1",
    lat: 53.4808,
    lon: -2.2426,
    hoursText: "Opening hours need confirmation",
    hours: everyDay("00:00", "00:01"),
    note: "Please confirm the current address, phone number and hours before launch.",
  },
];

export const SUPPORT_LINKS: SupportLink[] = [
  {
    title: "Mind",
    description: "Information about mental health, support and local services.",
    url: "https://www.mind.org.uk/",
  },
  {
    title: "NHS mental health help",
    description: "Find NHS mental-health support and advice.",
    url: "https://www.nhs.uk/mental-health/",
  },
  {
    title: "Manchester Mind",
    description: "Local information and support for people in Greater Manchester.",
    url: "https://www.manchestermind.org/",
  },
];
