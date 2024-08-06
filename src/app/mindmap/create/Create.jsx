// src/app/mindmap/create/page.jsx

"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import CustomEdge from "@/components/CustomEdge";
import ResizableNode from "@/components/ResizableNode";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 300, y: 50 },
    data: { label: "Mind Map 1" },
    draggable: true,
  },
  {
    id: "2",
    position: { x: 50, y: 250 },
    data: { label: "Mind Map 2" },
    draggable: true,
  },
  {
    id: "3",
    position: { x: 550, y: 250 },
    data: { label: "Mind Map 3" },
    draggable: true,
  },
];

const initialEdges = [];

export default function CreatePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [textCount, setTextCount] = useState(4); // Bắt đầu từ 4 vì đã có 3 node mặc định

  const onConnect = useCallback(
    (params) => {
      const { source, target, sourceHandle, targetHandle } = params;

      if (!source || !target) {
        console.error("Invalid connection parameters:", params);
        return;
      }

      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (!sourceNode || !targetNode) {
        console.error("Source or target node not found:", params);
        return;
      }

      const newId = textCount.toString();
      const newNode = {
        id: newId,
        position: {
          x: targetNode.position.x + 100,
          y: targetNode.position.y + 100,
        },
        data: { label: `Text ${textCount}` },
        draggable: true, // Đảm bảo rằng node mới có thể di chuyển
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => addEdge({ ...params, type: "custom" }, eds));
      setTextCount((prevCount) => prevCount + 1);
    },
    [nodes, setNodes, setEdges, textCount]
  );

  const onPaneClick = useCallback(
    (event) => {
      if (nodes.length === 0) {
        const newNode = {
          id: "1",
          position: { x: event.clientX - 50, y: event.clientY - 50 },
          data: { label: "Mind Map" },
          draggable: true, // Đảm bảo rằng node có thể di chuyển
        };
        setNodes([newNode]);
      }
    },
    [nodes, setNodes]
  );

  return (
    <div style={{ width: "100%", height: "500px" }} className="py-5">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        nodeTypes={{
          resizable: (props) => (
            <ResizableNode {...props} setNodes={setNodes} setEdges={setEdges} />
          ),
        }} // Đăng ký node resizable và truyền setNodes, setEdges
        edgeTypes={{ custom: CustomEdge }} // Đăng ký edge custom
        fitView // Optional: Để tự động fit view khi thêm node
      >
        <Background
          gap={10}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
        />
      </ReactFlow>
    </div>
  );
}
