import React, { Suspense } from "react";
import { Router, View, NotFoundBoundary } from "react-navi";

import routes from "./routes";
import "intersection-observer";
import "./app.css";

const renderNotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
    </div>
  );
};

const App = () => (
  <Router routes={routes}>
    <NotFoundBoundary render={renderNotFound}>
      <Suspense fallback={<div>Loading...</div>}>
        <View />
      </Suspense>
    </NotFoundBoundary>
  </Router>
);

export default App;
