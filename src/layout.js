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
    Object.values(organizations).map(organization => {
      const actions = organization.actions;
      if (actions.length === 0) return [];
      const id = actions[0].organization.id;
      const submissions = actions.map(action => action.submissions);
      const locations = submissions.map(submission =>
        submission.map(({ location }) => ({
          ...location,
          size: 10000,
          fill: [255, 0, 0],
          id
        }))
      );
      setLocations(locs => locs.concat(...locations));
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
  return (
    <React.Fragment>
      <Map data={locations} vp={vp} />
      <ControlPanel
        handlers={[setLocations, setViewport]}
        locations={locations}
      >
        {organizations}
      </ControlPanel>
    </React.Fragment>
  );
};

export default Layout;
