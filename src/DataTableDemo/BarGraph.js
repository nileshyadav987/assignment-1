import React from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data }) => {
  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        <Plot
          style={{ width: "30%", height: 240 }}
          data={[
            {
              type: "bar",
              x: data.map((v) => v.title),
              y: data.map((v) => v.price),
            },
          ]}
          layout={{ width: 400, height: 400, title: "Plotly graph" }}
        />
      ) : (
        <div>
          <p>Select products to view graph</p>
        </div>
      )}
    </>
  );
};
export default BarGraph;
