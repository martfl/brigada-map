import React, { useState, useEffect } from "react";
import { useCurrentRoute } from "react-navi";

import Map from "./map";
import ControlPanel from "./control-panel";

const Layout = props => {
  const route = useCurrentRoute();
  if (!Object.keys(route.data).length) route.data = [props.data];
  const data = route.data;

  const [vp, setVp] = useState({
    latitude: 19.432608, // CDMX
    longitude: -99.133209,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });

  const [organizations, setOrgs] = useState({});
  useEffect(() => {
    if (data && data[0]) {
      setOrgs(data);
    }
  }, [data]);

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    Object.values(organizations).map(({ actions }) => {
      const locs = actions.reduce((acc, { submissions }) => {
        return acc.concat(
          submissions.map(({ location }) => ({
            ...location,
            size: 10000,
            fill: [255, 0, 0]
          }))
        );
      }, []);

      setLocations(locs);
      return actions;
    });
  }, [organizations]);

  const setViewport = ({ lng, lat }) => {
    setVp({
      longitude: lng,
      latitude: lat,
      zoom: 7
    });
  };

  const setFill = ({ lng, lat, fill, size }) => {
    setLocations(state => {
      return state.map(point => {
        if (point.lng === lng && point.lat === lat) {
          point.fill = fill;
          point.size = size;
        }
        return point;
      });
    });
  };
  return (
    <React.Fragment>
      <Map data={locations} vp={vp} />
      <ControlPanel setFill={setFill} setVp={setViewport}>
        {organizations}
      </ControlPanel>
    </React.Fragment>
  );
};

export default Layout;
