import React, { useState, useEffect } from "react";
import { StaticMap, NavigationControl } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { IconLayer, ScatterplotLayer } from "@deck.gl/layers";

import Icons from "./location-icon-atlas.png";
import IconMapping from "./location-icon-mapping.json";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const TOKEN =
  "pk.eyJ1IjoibWFydGZsIiwiYSI6ImNqdnhiZDBsOTAzZTA0YWxmMjJsa2R6dmUifQ.GDquTTEtTE61pJz9cDnfzA"; // Set your mapbox token here

const Map = props => {
  const { locations } = props;
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    setViewport({
      latitude: 19.432608, // CDMX
      longitude: -99.133209,
      zoom: 5,
      bearing: 0,
      pitch: 0
    });
  }, []);

  const renderLayers = () => {
    const layerProps = {
      data: locations,
      pickable: true,
      wrapLongitude: true,
      getPosition: d => [d.lat, d.lng],
      iconAtlas: Icons,
      iconMapping: IconMapping,
      /* onHover: onHover, */
      sizeScale: 60
    };

    const size = viewport ? Math.min(1.5 ** viewport.zoom - 10, 1) : 0.1;

    const layer = new IconLayer({
      ...layerProps,
      id: "icon",
      getIcon: d => "marker",
      getSize: size
    });

    const otherLayer = new ScatterplotLayer({
      id: "bart-stations",
      data: [
        {
          name: "Colma",
          passengers: 4214,
          coordinates: [-122.466233, 37.684638]
        },
        {
          name: "Civic Center",
          passengers: 24798,
          coordinates: [-122.413756, 37.779528]
        }
      ],
      stroked: false,
      filled: true,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.passengers),
      getFillColor: [255, 200, 0]
    });
    return [layer, otherLayer];
  };

  return (
    <DeckGL
      layers={renderLayers()}
      initialViewState={viewport}
      viewState={viewport}
      controller
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        reuseMaps
        preventStyleDiffing
      >
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={vp => setViewport(vp)} />
        </div>
      </StaticMap>
    </DeckGL>
  );
};

export default Map;
