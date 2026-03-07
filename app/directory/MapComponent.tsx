"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Resource {
  id: number;
  title: string;
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface MapComponentProps {
  resources: Resource[];
  hoveredResourceId: number | null;
}

export default function MapComponent({ resources, hoveredResourceId }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: maplibregl.Marker }>({});

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    // Initialize Map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [-122.0355, 47.6062],
      zoom: 13,
      pitch: 50,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // 1. SAFE CLEANING
      // We wrap this in a try/catch so if one layer fails, the map doesn't vanish
      try {
        const style = map.getStyle();
        if (style && style.layers) {
          style.layers.forEach((layer) => {
            const id = layer.id.toLowerCase();
            // Target specific clutter: businesses, POIs, and transit icons
            if (id.includes("poi") || id.includes("business") || id.includes("restaurant") || id.includes("tree")) {
              map.setLayoutProperty(layer.id, "visibility", "none");
            }
          });
        }
      } catch (e) {
        console.warn("Could not clean all layers, but map is still loading.");
      }

      // 2. 3D BUILDINGS
      const sources = map.getStyle().sources;
      const sourceId = Object.keys(sources).find(s => s.includes("openmaptiles") || s.includes("openfreemap")) || "openmaptiles";

      if (!map.getLayer("3d-buildings")) {
        map.addLayer({
          id: "3d-buildings",
          source: sourceId,
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 13,
          paint: {
            "fill-extrusion-color": "#ffffff",
            "fill-extrusion-height": ["get", "render_height"],
            "fill-extrusion-base": ["get", "render_min_height"],
            "fill-extrusion-opacity": 0.8
          }
        });
      }

      map.setLight({
        anchor: "viewport",
        color: "#ffffff",
        intensity: 0.4,
        position: [1.15, 210, 30]
      });
    });

    mapRef.current = map;
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // MARKERS LOGIC
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    resources.forEach((resource) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.backgroundColor = "#244747";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([resource.longitude, resource.latitude])
        .setPopup(new maplibregl.Popup({ offset: 10, closeButton: false }).setHTML(`<b>${resource.title}</b>`))
        .addTo(mapRef.current!);

      markersRef.current[resource.id] = marker;
    });
  }, [resources]);

  // HOVER LOGIC
  useEffect(() => {
    if (!mapRef.current || hoveredResourceId === null) return;
    const res = resources.find(r => r.id === hoveredResourceId);
    if (res) {
      mapRef.current.flyTo({
        center: [res.longitude, res.latitude],
        zoom: 17,
        pitch: 60,
        duration: 3000,
        essential: true
      });
    }
  }, [hoveredResourceId, resources]);

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
}