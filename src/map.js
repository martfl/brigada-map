import React from "react";
import { StaticMap } from "react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";

const INITIAL_VIEW_STATE = {
  latitude: 19.432608, // CDMX
  longitude: -99.133209,
  zoom: 5,
  bearing: 0,
  pitch: 0
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onWebGLInitialized = gl => {
    this.setState({ gl });
  };

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;
    const { data, vp } = this.props;
    this.setState({ data, vp });
    map.addLayer(new MapboxLayer({ id: "my-scatterplot", deck }));
  };

  render() {
    const { gl, vp, data } = this.state;
    const viewState = vp ? vp : INITIAL_VIEW_STATE;
    const layers = [
      new ScatterplotLayer({
        id: "my-scatterplot",
        data: data || [],
        getPosition: d => [d.lng, d.lat],
        getRadius: d => d.size,
        getFillColor: d => d.fill,
        pickable: true
      })
    ];

    return (
      <DeckGL
        ref={ref => {
          // save a reference to the Deck instance
          this._deck = ref && ref.deck;
        }}
        layers={layers}
        initialViewState={viewState}
        controller={true}
        onWebGLInitialized={this._onWebGLInitialized}
      >
        {gl && (
          <StaticMap
            ref={ref => {
              // save a reference to the mapboxgl.Map instance
              this._map = ref && ref.getMap();
            }}
            gl={gl}
            mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxApiAccessToken="pk.eyJ1IjoibWFydGZsIiwiYSI6ImNqdnhiZDBsOTAzZTA0YWxmMjJsa2R6dmUifQ.GDquTTEtTE61pJz9cDnfzA"
            onLoad={this._onMapLoad}
          />
        )}
      </DeckGL>
    );
  }
}

export default Map;
