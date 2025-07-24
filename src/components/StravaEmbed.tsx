import { useEffect, useRef } from "react";

// Tipado para evitar error de TypeScript
declare global {
  interface Window {
    StravaEmbeds?: {
      process: () => void;
    };
  }
}

interface StravaEmbedProps {
  embedId: string;
  mapHash?: string;
  style?: "standard" | "satellite" | "hybrid" | "dark" | "winter" | "light";
}

export default function StravaEmbed({
  embedId,
  mapHash = "15.01/21.50426/-104.92648",
  style = "satellite",
}: StravaEmbedProps) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStravaScript = () => {
      if (window.StravaEmbeds) {
        window.StravaEmbeds.process();
      }
    };

    const scriptId = "strava-embed-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://strava-embeds.com/embed.js";
      script.async = true;
      script.onload = loadStravaScript;
      document.body.appendChild(script);
    } else {
      // Script ya cargado, solo procesa
      loadStravaScript();
    }
  }, [embedId, mapHash]);

  return (
    <div className="container-md p-4">
      <h1 className="text-center text-xl font-bold mb-4">Ruta en Strava</h1>

      <div
        ref={embedRef}
        className="strava-embed-placeholder border-none "
        data-embed-type="route"
        data-terrain="3d"
        data-embed-id={embedId}
        data-style={style}
        data-map-hash={mapHash}
        data-from-embed="true"
        data-full-width="true"
      />

      <div
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id="12061549368"
        data-style="standard"
        data-from-embed="false"
      ></div>
      <div
        className="strava-embed-placeholder"
        data-embed-type="route"
        data-embed-id="3131824024790328850"
        data-full-width="true"
        // data-style="satellite"
        data-terrain="3d"
        // data-map-hash="12.8/21.50426/-104.92648"
        data-from-embed="true"
      ></div>
      <script src="https://strava-embeds.com/embed.js"></script>
    </div>
  );
}
