// middleware.js

import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("appSession"); // Thay đổi 'appSession' thành tên cookie bạn sử dụng để lưu token

  // Kiểm tra xem người dùng có token hay không và chỉ bảo vệ route /mindmap
  if (!token && pathname.startsWith("/mindmap")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mindmap/:path*"],
};
