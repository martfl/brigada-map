import React from "react";
import { mount, route } from "navi";

import Layout from "./layout";
import { fetchOrganizations, fetchOrganization } from "./api";

const routes = mount({
  "/": route({
    getData: () => fetchOrganizations(),
    view: <Layout />
  }),
  "/:id": route(async req => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return null;
    }
    const data = await fetchOrganization(id);
    return {
      view: <Layout data={data} />
    };
  })
});

export default routes;
