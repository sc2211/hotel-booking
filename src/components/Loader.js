import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div style={{ marginTop: "200px" }}>
      <div className="sweet-loading text-center">
        <BeatLoader color="red" loading={loading} css="" size={80} />
      </div>
    </div>
  );
}

export default Loader;
