import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MindmapList() {
  const [mindmaps, setMindmaps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/mindmaps")
      .then((res) => res.json())
      .then((data) => setMindmaps(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/mindmaps/${id}`, {
      method: "DELETE",
    });
    setMindmaps(mindmaps.filter((mindmap) => mindmap.id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/mindmap/create?id=${id}`);
  };

  return (
    <div className="py-4">
      {mindmaps.map((mindmap) => (
        <div className="flex items-center py-2" key={mindmap.id}>
          <span className="w-1/2">{mindmap.name}</span>
          <span className="w-1/4">
            {new Date(mindmap.createdAt).toLocaleString()}
          </span>
          <span className="w-1/4">
            <button
              onClick={() => handleEdit(mindmap.id)}
              className="text-blue-600 hover:underline"
            >
              Sửa
            </button>
            <button
              onClick={() => handleDelete(mindmap.id)}
              className="text-red-600 hover:underline ml-2"
            >
              Xóa
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
