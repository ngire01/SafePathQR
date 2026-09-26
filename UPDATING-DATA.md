# Updating the information on SafePathQR

Everything people see (numbers, places, opening hours, check wording, links) is in one file:

**`src/data/hmap-data.ts`**

You can edit it straight on GitHub in your browser: open the file, click the pencil icon, make the
change, and click "Commit changes". The live site rebuilds itself within about a minute.
If the automatic checks find a mistake, the old version stays live and GitHub emails you.

## Common changes

**A phone number changes.** Find the entry and change both lines:
```ts
display: "0161 238 5249",   // how it looks on screen
tel: "01612385249",         // digits only, used by the Call button
```
(For places there is just `phone: "0161 238 5249"`.)

**Opening hours change.** Change both the words and the data:
```ts
hoursText: "Every day, 4pm to 11pm",
hours: everyDay("16:00", "23:00"),
```
Use 24-hour times. A closing time earlier than the opening time means "after midnight".
For different days, list them: `mon: ["18:30", "01:00"],` and leave out closed days.

**Add a new place.** Copy a whole `{ ... },` block, paste it below, and change every line.
Give it a new unique `id`. For `lat` and `lon`, right-click the place in Google Maps and click the
numbers at the top of the menu to copy them (the first is `lat`, the second is `lon`).

**Remove a place or helpline.** Delete its whole `{ ... },` block.

**After every check,** even if nothing changed, update:
```ts
export const LAST_CHECKED = "2026-09-26";
```

## Items still to confirm (as of 26 September 2026)

- Recovery Lounge number: Turning Point's site says 0161 238 5249, some directories say 0161 238 5149.
- No. 93 opening hours differ between NHS pages.

## Suggested routine

Every 3 months: phone or check the website of every place and helpline, update anything that changed,
update `LAST_CHECKED`. Also check straight away whenever a partner tells you about a change.
