import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View, NotFoundBoundary } from "react-navi";

import routes from "./routes";
import "intersection-observer";
import "./app.css";

function renderNotFound() {
  return (
    <div className="Layout-error">
      <h1>404 - Not Found</h1>
    </div>
  );
}

const App = () => (
  <Router routes={routes}>
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundBoundary render={renderNotFound}>
        <View />
      </NotFoundBoundary>
    </Suspense>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
