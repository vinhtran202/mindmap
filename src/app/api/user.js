import axios from "axios";

const API_URL = "http://localhost:4000/users";

export async function createUserIfNotExists(user) {
  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const response = await axios.get(`${API_URL}?email=${user.email}`);

    if (response.data.length === 0) {
      // Người dùng chưa tồn tại, tạo mới
      const newUser = await axios.post(API_URL, {
        id: generateUniqueId(), // Hàm tạo ID duy nhất
        name: user.name,
        email: user.email,
        mindmaps: [], // Thêm trường mindmaps là một mảng rỗng
      });
      return newUser.data;
    } else {
      // Người dùng đã tồn tại, trả về dữ liệu hiện tại
      return response.data[0];
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function addMindmap(userId, mindmap) {
  try {
    // Lấy tất cả người dùng
    const response = await axios.get(API_URL);
    const users = response.data;

    // Tìm người dùng có ID trùng với userId
    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Thêm Mindmap mới vào danh sách của người dùng
    const updatedMindmaps = [...user.mindmaps, mindmap];
    const updatedUser = { ...user, mindmaps: updatedMindmaps };

    // Cập nhật người dùng trên server
    const responseUpdate = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return responseUpdate.data;
  } catch (error) {
    console.error("Error adding mindmap:", error);
  }
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Tạo ID duy nhất dài hơn
}

export async function fetchUserById(userId) {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
}
