//@ts-ignore
import DeckGl from "@deck.gl/react";
import { StaticMap, _MapContext as MapContext } from "react-map-gl";
//@ts-ignore
import { MVTLayer } from "@deck.gl/geo-layers";

export default function Deck({ dataset, layers }: any) {

  const url = "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_la_bdry/{z}/{x}/{y}"

  const baseLayer = new MVTLayer({
    id: "la-boundary",
    data: url,
    filled: false,
    getLineColor: [60, 178, 208],
    getLineWidth: 10,
    lineWidthScale: 5,
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 10,
    opacity: 1,
    category: "base",
    priority: 0 
  });

  const viewState =  {
    longitude: -0.19184372319431953,
    latitude: 51.25323955649059,
    zoom: 10.5,
    minZoom: 2,
    maxZoom: 24,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <DeckGl
        layers={[baseLayer, layers]}
        initialViewState={viewState}
        controller={true}
        getCursor={({ isDragging, isHovering }: any) =>
          isDragging ? "grabbing" : isHovering ? "pointer" : "grab"
        }
        ContextProvider={MapContext.Provider}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoic2FtYWl0bCIsImEiOiJja3E3eWlndGgwMjhvMnVtc2huenR6Z3N0In0.Vdj6e5sGXIBGfOxchYk20w"
        />
      </DeckGl>
    </div>
  );
}
