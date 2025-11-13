import React, { memo } from "react";

function StatsCard({ title, value, lastUpdated }) {
  console.log("Rendered:", title);

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
      <h4>{title}</h4>
      <p>{value}</p>
      <small>Updated: {lastUpdated}</small>
    </div>
  );
}

export default memo(StatsCard);
