// src/components/ResizableNode.jsx

import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const ResizableNode = ({ id, data, isConnectable, setNodes, setEdges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setLabel(e.target.value);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: e.target.value } }
          : node
      )
    );
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: 10,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 5,
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onDoubleClick={handleDoubleClick}>{label}</div>
      )}
      <button onClick={handleDelete}>Delete</button>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default ResizableNode;
