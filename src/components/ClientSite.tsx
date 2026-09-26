"use client";

import { useMemo, useState } from "react";
import { HELPLINES, PLACES, SUPPORT_LINKS, type Helpline } from "@/data/hmap-data";
import { distanceMiles, formatDistance, getDirectionsUrl, isOpenAt, sortPlacesByDistance } from "@/lib/places";
import { PlacesMap } from "@/components/PlacesMap";

type Coordinates = { lat: number; lon: number };

const AREA_CENTRES = {
  city: { label: "Manchester city centre", lat: 53.4808, lon: -2.2426 },
  north: { label: "North Manchester", lat: 53.5155, lon: -2.2395 },
  south: { label: "South Manchester", lat: 53.405, lon: -2.25 },
};

function HelplineCard({ line }: { line: Helpline }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const value = line.tel ? line.display : line.sms ? `SHOUT to ${line.sms}` : line.display;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className={`card helpline-card${line.urgent ? " urgent-card" : ""}`}>
      <div className="card-heading">
        <div>
          <h3>{line.name}</h3>
          <p className="muted">{line.availability}</p>
        </div>
        {line.urgent && <span className="pill danger-pill">Urgent</span>}
      </div>
      <p>{line.description}</p>
      <div className="action-row">
        {line.tel && <a className="button button-primary" href={`tel:${line.tel}`}>Call {line.display}</a>}
        {line.sms && <a className="button button-primary" href={`sms:${line.sms}?&body=SHOUT`}>Text SHOUT</a>}
        <button className="button button-secondary" type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
        {line.url && <a className="text-link" href={line.url} target="_blank" rel="noreferrer">Website</a>}
      </div>
    </article>
  );
}

function SeverityCheck() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [immediateDanger, setImmediateDanger] = useState<boolean | null>(null);

  const reset = () => {
    setStep(0);
    setImmediateDanger(null);
  };

  return (
    <section className="section check-section" id="check">
      <div className="section-intro">
        <p className="eyebrow">A quick signpost</p>
        <h2>Where should I go?</h2>
        <p>Answer two questions to find the safest next step. This is not a diagnosis.</p>
      </div>
      <div className="check-panel" aria-live="polite">
        {step === 0 && (
          <>
            <p className="step-count">Question 1 of 2</p>
            <h3>Is anyone in immediate danger, or likely to hurt themselves or someone else now?</h3>
            <div className="choice-row">
              <button className="button button-danger" type="button" onClick={() => { setImmediateDanger(true); setStep(2); }}>Yes, right now</button>
              <button className="button button-secondary" type="button" onClick={() => { setImmediateDanger(false); setStep(1); }}>No</button>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <p className="step-count">Question 2 of 2</p>
            <h3>Do you need urgent mental-health help today?</h3>
            <div className="choice-row">
              <button className="button button-primary" type="button" onClick={() => setStep(2)}>Yes, today</button>
              <button className="button button-secondary" type="button" onClick={() => setStep(2)}>Not sure</button>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="result-card">
            <p className="eyebrow">Your next step</p>
            <h3>{immediateDanger ? "Call 999 now" : "Contact urgent support today"}</h3>
            <p>{immediateDanger ? "Call 999 or go to the nearest A&E. If you can, stay with the person and remove anything they could use to hurt themselves." : "Call NHS 111 and ask for the mental-health option, or use one of the free helplines below. If the situation becomes immediate danger, call 999."}</p>
            <div className="action-row">
              <a className="button button-danger" href={immediateDanger ? "tel:999" : "tel:111"}>{immediateDanger ? "Call 999" : "Call NHS 111"}</a>
              <button className="button button-secondary" type="button" onClick={reset}>Start again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NearbyPlaces() {
  const [location, setLocation] = useState<Coordinates | undefined>();
  const [area, setArea] = useState<keyof typeof AREA_CENTRES>("city");
  const [locationMessage, setLocationMessage] = useState("Choose an area or use your location.");

  const origin = location ?? AREA_CENTRES[area];
  const places = useMemo(() => sortPlacesByDistance(PLACES, origin), [origin]);

  const useLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not available on this device. Choose an area instead.");
      return;
    }
    setLocationMessage("Asking for your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        setLocationMessage("Using your location. It stays on your phone.");
      },
      () => setLocationMessage("We could not access your location. Choose an area instead."),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <section className="section" id="nearby">
      <div className="section-intro split-intro">
        <div>
          <p className="eyebrow">Find somewhere nearby</p>
          <h2>A&E and support places</h2>
          <p>Location is optional and never leaves your phone.</p>
        </div>
        <div className="location-controls">
          <button className="button button-primary" type="button" onClick={useLocation}>Use my location</button>
          <label className="select-label" htmlFor="area">Or choose an area</label>
          <select id="area" value={area} onChange={(event) => { setArea(event.target.value as keyof typeof AREA_CENTRES); setLocation(undefined); setLocationMessage("Showing places near the selected area."); }}>
            {Object.entries(AREA_CENTRES).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
          <p className="muted small-text">{locationMessage}</p>
        </div>
      </div>
      <div className="nearby-layout">
        <div className="place-list">
          {places.map((place) => {
            const distance = distanceMiles(origin, place);
            const open = isOpenAt(place.hours);
            return (
              <article className="card place-card" key={place.id}>
                <div className="card-heading">
                  <div><h3>{place.name}</h3><p className="muted">{place.address}, {place.postcode}</p></div>
                  <span className={`pill ${open ? "open-pill" : "closed-pill"}`}>{open ? "Open now" : "Check first"}</span>
                </div>
                <p className="small-text"><strong>{formatDistance(distance)}</strong> · {place.hoursText}</p>
                {place.note && <p className="note">{place.note}</p>}
                <div className="action-row">
                  <a className="button button-secondary" href={getDirectionsUrl(place, location)} target="_blank" rel="noreferrer">Directions</a>
                  {place.phone && <a className="text-link" href={`tel:${place.phone.replace(/\D/g, "")}`}>Call {place.phone}</a>}
                  {place.website && <a className="text-link" href={place.website} target="_blank" rel="noreferrer">Service website</a>}
                </div>
              </article>
            );
          })}
        </div>
        <PlacesMap places={places} userLocation={location} />
      </div>
    </section>
  );
}

export function ClientSite() {
  return (
    <>
      <SeverityCheck />
      <section className="section" id="helplines">
        <div className="section-intro"><p className="eyebrow">Talk to someone</p><h2>Free helplines</h2><p>You can call or text these services. You do not need to have the right words.</p></div>
        <div className="card-grid">{HELPLINES.map((line) => <HelplineCard key={line.id} line={line} />)}</div>
      </section>
      <NearbyPlaces />
      <section className="section" id="resources">
        <div className="section-intro"><p className="eyebrow">More support</p><h2>Trusted information</h2></div>
        <div className="resource-grid">{SUPPORT_LINKS.map((link) => <a className="card resource-card" key={link.title} href={link.url} target="_blank" rel="noreferrer"><h3>{link.title} <span aria-hidden="true">↗</span></h3><p>{link.description}</p></a>)}</div>
      </section>
    </>
  );
}
