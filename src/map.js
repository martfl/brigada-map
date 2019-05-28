import React from "react";
import ReactMapGL from "react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.vp = {
      latitude: 19.432608, // CDMX
      longitude: -99.133209,
      zoom: 5,
      bearing: 0,
      pitch: 0
    };

    this._onWebGLInitialized = this._onWebGLInitialized.bind(this);
    this._onMapLoad = this._onMapLoad.bind(this);
    this._onViewStateChange = this._onViewStateChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.vp !== prevProps.vp) {
      this.setState({ vp: this.props.vp });
    }
  }

  _onWebGLInitialized = gl => {
    this.setState({ gl });
  };

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;
    map.addLayer(new MapboxLayer({ id: "my-scatterplot", deck }));
  };

  _onViewStateChange({ viewState }) {
    this.setState({ vp: viewState });
  }

  render() {
    const { gl, vp } = this.state;
    const layers = [
      new ScatterplotLayer({
        id: "my-scatterplot",
        data: this.props.data,
        getPosition: d => [d.lng, d.lat],
        getRadius: d => d.size,
        getFillColor: d => d.fill,
        pickable: true
      })
    ];

    return (
      <DeckGL
        ref={ref => (this._deck = ref && ref.deck)}
        layers={layers}
        viewState={vp}
        controller={true}
        onWebGLInitialized={this._onWebGLInitialized}
        onViewStateChange={this._onViewStateChange}
      >
        {gl && (
          <ReactMapGL
            ref={ref => (this._map = ref && ref.getMap())}
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
