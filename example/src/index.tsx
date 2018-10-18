import { PerspectiveViewer } from "@jpmorganchase/react-perspective-viewer";
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <PerspectiveViewer
    style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    onApiReady={({ load }) => {
      const url =
        "https://unpkg.com/@jpmorganchase/perspective-examples/build/superstore.arrow";
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => load(xhr.response);

      xhr.send(null);
    }}
  />,
  document.getElementById("app")
);
