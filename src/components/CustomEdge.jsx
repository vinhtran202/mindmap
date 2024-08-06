import React from "react";
import { getBezierPath } from "@xyflow/react";

const CustomEdge = (props) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <g className="react-flow__edge">
      <path id={id} className="react-flow__edge-path" d={path} />
    </g>
  );
};

export default CustomEdge;
