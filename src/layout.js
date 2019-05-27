import React, { useState, useEffect } from "react";
import { useCurrentRoute } from "react-navi";

import Map from "./map";
import ControlPanel from "./control-panel";

const Layout = () => {
  const route = useCurrentRoute();
  const { data } = route;

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
              state.concat({ ...location, size: 20, fill: "#d0d" })
            )
          );
      }
      return org;
    });
  }, [organizations]);

  return (
    <React.Fragment>
      <Map locations={locations} />
      <ControlPanel>{organizations}</ControlPanel>
    </React.Fragment>
  );
};

export default Layout;
