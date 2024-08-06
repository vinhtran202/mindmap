"use client";
import React, { useState, useEffect } from "react";
import {
  addMindmap,
  createUserIfNotExists,
  fetchUserById,
} from "@/app/api/user.js"; // Import hàm mới

export default function Mindmap() {
  const [id, setId] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [nextMindmapNumber, setNextMindmapNumber] = useState(1); // Đếm số lượng mindmaps

  useEffect(() => {
    const login = async () => {
      const user = {
        name: "vinh tran",
        id: id,
      };

      // Tạo người dùng hoặc lấy thông tin người dùng hiện có
      const loggedInUser = await createUserIfNotExists(user);
      setLoggedInUser(loggedInUser);
      setId(loggedInUser.id);

      // Nếu có ID người dùng, lấy thông tin người dùng từ API
      if (loggedInUser && loggedInUser.id) {
        const userWithMindmaps = await fetchUserById(loggedInUser.id);
        setLoggedInUser(userWithMindmaps);
      }
    };

    login();
  }, []);

  const handleAddMindmap = async () => {
    if (!loggedInUser) return;

    const mindmap = {
      title: `mindmap no name ${nextMindmapNumber}`,
      time: new Date().toISOString(),
      completed: false,
    };

    // Thêm Mindmap cho người dùng đã đăng nhập
    const updatedUser = await addMindmap(loggedInUser.id, mindmap);
    setLoggedInUser(updatedUser);

    // Cập nhật số lượng Mindmap tiếp theo
    setNextMindmapNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="text-start">
        <h1 className="text-3xl md:text-4xl font-medium my-2">My Mindmap</h1>
        {loggedInUser && (
          <>
            <div className="py-4">
              <button
                className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                onClick={handleAddMindmap}
              >
                new
              </button>
            </div>
            <div key={loggedInUser.id} className="py-4">
              <h2 className="text-xl font-bold">{loggedInUser.name}</h2>
              {loggedInUser.mindmaps.map((mindmap, index) => (
                <div className="flex items-center py-2" key={index}>
                  <span className="w-1/2">{mindmap.title}</span>
                  <span className="w-1/4">{mindmap.time}</span>
                  <span className="w-1/4">
                    <button className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Del
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
