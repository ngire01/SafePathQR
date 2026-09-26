"use client";

import { useEffect, useRef } from "react";
import type { Place } from "@/data/hmap-data";

type Coordinates = { lat: number; lon: number };

export function PlacesMap({ places, userLocation }: { places: Place[]; userLocation?: Coordinates }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    void import("leaflet").then((leaflet) => {
      if (cancelled || !elementRef.current) return;

      map = leaflet.map(elementRef.current, { scrollWheelZoom: false }).setView(
        userLocation ? [userLocation.lat, userLocation.lon] : [53.4808, -2.2426],
        userLocation ? 12 : 11,
      );

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        })
        .addTo(map);

      // Recalculate after the first paint so grid/sticky layouts cannot leave
      // Leaflet with a stale or zero-sized viewport.
      window.requestAnimationFrame(() => map?.invalidateSize());

      places.forEach((place) => {
        leaflet
          .circleMarker([place.lat, place.lon], {
            radius: place.kind === "ae" ? 9 : 8,
            color: place.kind === "ae" ? "#b42318" : "#0f766e",
            fillColor: place.kind === "ae" ? "#ef6a5b" : "#55b7a9",
            fillOpacity: 0.9,
            weight: 2,
          })
          .bindPopup(`<strong>${place.name}</strong><br>${place.postcode}`)
          .addTo(map!);
      });

      if (userLocation) {
        leaflet
          .circleMarker([userLocation.lat, userLocation.lon], {
            radius: 7,
            color: "#12304a",
            fillColor: "#3b82f6",
            fillOpacity: 1,
            weight: 3,
          })
          .bindPopup("Your location")
          .addTo(map);
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [places, userLocation]);

  return <div className="map" ref={elementRef} aria-label="Map of nearby support places" />;
}
