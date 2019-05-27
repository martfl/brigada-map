import React, { useState, useEffect } from "react";
import { useCurrentRoute } from "react-navi";

import Map from "./map";
import ControlPanel from "./control-panel";

const Layout = () => {
  const route = useCurrentRoute();
  const { data } = route;
  console.log(route);

  const [vp, setVp] = useState({
    latitude: 19.432608, // CDMX
    longitude: -99.133209,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });

  const [organizations, setOrgs] = useState([]);
  useEffect(() => {
    if (data) {
      setOrgs(data);
    }
  }, [data]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    Object.values(organizations).map(org => {
      if (org.actions) {
        const submissions = org.actions.reduce(
          (acc, v) => acc.concat(v.submissions),
          []
        );
        if (submissions.length !== 0)
          submissions.map(({ location }) =>
            setLocations(state =>
              state.concat({ ...location, size: 10000, fill: [255, 0, 0] })
            )
          );
      }
      return org;
    });
  }, [organizations]);

  const setViewport = ({ lng, lat }) => {
    setVp(vp => ({
      latitude: lat,
      longitude: lng,
      zoom: 5,
      bearing: 0,
      pitch: 0
    }));
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
